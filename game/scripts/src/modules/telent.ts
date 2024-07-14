import { DrawRules, FirstRules } from "../data/telent"
import { GetPlayerHero } from "../function"

interface IFTelent {
    key: string
    level: number
}

export class TelentController {

    levels: {
        pid: PlayerID
        lvl: number
        unlocklvl: number
        telent: {
            N: string
            R: string
            SR: string
            SSR: string
        }[]
    }[] = []

    players: {
        [key: string]: {
            10: IFTelent[]
            15: IFTelent[]
            20: IFTelent[]
            25: IFTelent[]
        }
    } = {}
    playerTelentPool: {
        [key: string]: {
            level: 10 | 15 | 20 | 25
            key: string
        }[]
    } = {}

    constructor() {
        ListenToGameEvent('dota_player_learned_ability', (e) => this.dota_player_learned_ability(e), undefined)
        ListenToGameEvent('dota_player_gained_level', (e) => this.dota_player_gained_level(e), undefined)
        CustomGameEventManager.RegisterListener('random_telent_c2s', (_, e) => this.randomTelent(e.PlayerID, e.Level))
    }


    Sync() {
        CustomNetTables.SetTableValue('telent', 'players', this.levels)
    }

    dota_player_gained_level(e: DotaPlayerGainedLevelEvent) {
        const { PlayerID } = e
        const hero = GetPlayerHero(PlayerID)
        print(PlayerID)
    }

    dota_player_learned_ability(e: DotaPlayerLearnedAbilityEvent) {
        if (e.abilityname.startsWith('special_bonus_unique_none')) {
            const hero = GetPlayerHero(e.PlayerID)
            const abi = hero.FindAbilityByName(e.abilityname)
            hero.RemoveAbilityByHandle(abi)
            hero.AddAbility(e.abilityname)
            GetPlayerHero(e.PlayerID).SetAbilityPoints(GetPlayerHero(e.PlayerID).GetAbilityPoints() + 1)
        } else {
            const d = Object.entries(Object.entries(this.players).find(v => v[0] == `${e.PlayerID}`)[1]).find(v => v[1].find(v => v.key == e.abilityname))
            if (d != undefined) {
                const lvl = tonumber(d[0])
                if (this.levels.find(v => v.pid == e.PlayerID).lvl > lvl) return
                this.levels.find(v => v.pid == e.PlayerID).lvl = lvl + 5 as 10 | 15 | 20 | 25 | 30
                this.Sync()
            }
        }
    }

    init() {
        let c = 0
        const data = GameRules.StrategyCTR.data
        const pdata = GameRules.StrategyCTR.players
        pdata.forEach(p => {
            this.playerTelentPool[`${p.pid}`] = []
            this.players[`${p.pid}`] = {
                10: [{ key: 'special_bonus_unique_none1', level: 10 }, { key: 'special_bonus_unique_none2', level: 10 }],
                15: [{ key: 'special_bonus_unique_none3', level: 15 }, { key: 'special_bonus_unique_none4', level: 15 }],
                20: [{ key: 'special_bonus_unique_none5', level: 20 }, { key: 'special_bonus_unique_none6', level: 20 }],
                25: [{ key: 'special_bonus_unique_none7', level: 25 }, { key: 'special_bonus_unique_none8', level: 25 }]
            }
            p.abihero.forEach(v => {
                let t: {
                    level: 10 | 15 | 20 | 25 | any
                    key: string
                }[] = []
                for (let i = 8; i < 20; i++) {
                    print(i)
                    if (data[v.hero][`Ability${i}`] != undefined && (data[v.hero][`Ability${i}`] as string).startsWith('special_bonus')) {
                        t.push({
                            level: math.floor(t.length / 2) * 5 + 10,
                            key: (data[v.hero][`Ability${i}`] as string)
                        })
                        if (t.length == 8) break
                    }
                }
                this.playerTelentPool[tostring(p.pid)] = [...this.playerTelentPool[tostring(p.pid)], ...t]
            })
            this.levels.push({ pid: p.pid, lvl: 10, unlocklvl: 0, telent: [] })
        })
        this.Sync()
    }

    randomTelent(pid: PlayerID, lvl: number) {
        const r = this.rollRule(pid, lvl)
        //@ts-ignore 去除已固定天赋
        const pt = Object.entries(this.players[`${pid}`]).filter(v => v[0] < lvl).reduce((a, b) => {
            if (b.length > 0) {
                return a.concat(b[1].map(v => v.key))
            } else {
                return a
            }
        }, [] as string[])


        DeepPrintTable(pt)

        const cr: IFTelent[] = []

        r.forEach((va, i) => {
            //@ts-ignore
            const cp = this.playerTelentPool[`${pid}`].filter(v => v.level == va).filter(v => (!pt.includes(v.key) && !cr.map(v => v.key).includes(v.key)))
            cr.push(cp[RandomInt(0, cp.length - 1)])
        })

        const hero = GetPlayerHero(pid);

        const dl = (this.players[`${pid}`][lvl] as IFTelent[]).filter(v => !cr.map(v => v.key).includes(v.key));
        const dcr = cr.filter(v => !(this.players[`${pid}`][lvl] as IFTelent[]).map(v => v.key).includes(v.key));

        print('dl:')
        DeepPrintTable(dl)
        print('dcr:')
        DeepPrintTable(dcr)

        dl.forEach((v, i) => {
            hero.AddAbility(dcr[i].key)
            hero.SwapAbilities(v.key, dcr[i].key, false, true)
            hero.RemoveAbility(v.key)
        })
        this.players[`${pid}`][lvl] = cr
    }

    rollRule(pid: PlayerID, lvl: number): number[] {
        if (this.players[`${pid}`][lvl].length == 0) {
            return FirstRules[lvl]
        }
        const rule = DrawRules[lvl]
        //@ts-ignore
        const d = Object.entries(rule) as [number, number][]
        const pool = d.reduce((a, b) => a + b[1], 0)
        const result = []
        while (result.length < 2) {
            const ri = RandomInt(0, pool - 1)
            if (IsInTelentRange(d, ri, 25)) {
                result.push(25)
                continue
            } if (IsInTelentRange(d, ri, 20)) {
                result.push(20)
                continue
            } if (IsInTelentRange(d, ri, 15)) {
                result.push(15)
                continue
            }
            result.push(10)
            continue
        }
        return result
    }
}

const IsInTelentRange = (d: [number, number][], ri: number, lvl: number) => {
    return (d.reduce((a, b) => {
        if (b[0] < lvl) {
            return a + b[1]
        }
        return a
    }, 0) < ri)
}   