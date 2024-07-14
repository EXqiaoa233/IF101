import { Herolist } from "../data/herolist"
import { ASpawn, EffAdditionAbi, GetAllPlayers, GetPlayerHero } from "../function"


export class StrategyController {
    heropool: string[] = []
    players: {
        pid: PlayerID
        sid: string
        hero: string
        abihero: {
            hero: string
            abi: string[]
        }[]
        abi: string[]
    }[] = []
    data = LoadKeyValues('scripts/npc/npc_heroes.txt')
    dis = false

    constructor() {
        ListenToGameEvent('dota_game_state_change', (e) => this.dota_game_state_change(e), undefined)
        ListenToGameEvent('player_connect_full', (e: PlayerConnectFullEvent) => this.render(e.PlayerID), undefined)
        CustomGameEventManager.RegisterListener('selectabi_c2s', (_, e) => this.selectabi_c2s(e))
        CustomGameEventManager.RegisterListener('cabi_c2s', (_, e) => this.cabi_c2s(e))
        CustomGameEventManager.RegisterListener('refreshabi_c2s', (_, e) => this.refreshabi_c2s(e))
    }

    refreshabi_c2s(event: {
        PlayerID: PlayerID;
    }) {
        const { PlayerID } = event

        this.players[this.players.indexOf(this.players.find(v => v.pid == PlayerID))] = this.refreshPlayer(PlayerID)
        this.Sync()
    }

    effAbi() {
        GetAllPlayers().forEach(v => {
            const hero = GetPlayerHero(v)
            if (hero == undefined || hero.IsNull()) return
            for (let i = 0; i < 35; i++) {
                const abi = hero.GetAbilityByIndex(i)
                if (abi != undefined && !['special_bonus_attributes', 'obsidian_destroyer_sanity_eclipse'].includes(abi.GetAbilityName())) {
                    hero.RemoveAbilityByHandle(abi)
                }
            }

            const uabi = []
            this.players.find(vv => vv.pid == v).abi = this.players.find(vv => vv.pid == v).abi.map((vvv, ai) => {
                if (vvv == 'rubick_empty1') {
                    let abis: string[] = []
                    this.players.find(vv => vv.pid == v).abihero.forEach(v => {
                        abis = [...abis, ...v.abi.filter((_, ahi) => ai == 3 ? ahi == 3 : ahi < 3)]
                    })
                    abis = abis.filter(vvv => this.players.find(vv => vv.pid == v).abi.includes(vvv) == false && uabi.includes(vvv) == false)
                    const abi = abis[RandomInt(0, abis.length - 1)]
                    uabi.push(abi)
                    return abi
                } else {
                    return vvv
                }
            })

            this.players.find(vv => vv.pid == v).abi.forEach((v, i) => {
                if (i == 3) {
                    hero.AddAbility("generic_hidden")
                    hero.AddAbility("generic_hidden")

                }
                hero.AddAbility(v)
            })
            EffAdditionAbi(hero, this.players.find(vv => vv.pid == v).abi)
            for (let i = 0; i < 8; i++) {
                hero.AddAbility(`special_bonus_unique_none${i + 1}`)
            }
            if (v != 0) return
            for (let i = 0; i < 35; i++) {
                const abi = hero.GetAbilityByIndex(i)
                if (abi != undefined) {
                    print(abi.GetAbilityName())
                }
            }
        })
    }

    cabi_c2s(e: {
        PlayerID: PlayerID;
        i: number;
        a: number;
    }) {
        const pd = this.players.find(v => v.pid == e.PlayerID)
        if (e.a == 3 || e.i == 3) return
        const ia = pd.abi[e.i]
        const aa = pd.abi[e.a]
        DeepPrintTable([e.i, ia, e.a, aa])
        if (e.i == e.a) return
        pd.abi = pd.abi.map((v, i) => {
            if (i == e.i) {
                print(v + ' ' + aa)
                return aa
            }
            if (i == e.a) {
                print(v + ' ' + ia)
                return ia
            }
            return v
        })
        DeepPrintTable(pd.abi)
        this.Sync()
    }

    selectabi_c2s(e: {
        PlayerID: PlayerID;
        abi: string;
    }) {
        const pd = this.players.find(v => v.pid == e.PlayerID)
        if (e.abi == 'rubick_empty1') return
        if (pd.abi.find(v => v == e.abi)) {
            pd.abi = pd.abi.map(v => v == e.abi ? 'rubick_empty1' : v)
        } else {
            const ai = pd.abihero.find(v => v.abi.find(v => v == e.abi)).abi.indexOf(e.abi)
            if (ai == 3) {
                pd.abi[3] = e.abi
            } else {
                const i = pd.abi.indexOf('rubick_empty1')
                if (i == -1 || i == 3 || i == undefined) return
                pd.abi[i] = e.abi
            }
        }
        this.Sync()
    }

    dota_game_state_change(e: DotaGameStateChangeEvent) {
        const state = GameRules.State_Get()
        if (state == GameState.HERO_SELECTION) {
            GameRules.BotPopulate()
            this.init()
        }
        if (state == GameState.STRATEGY_TIME) {
            GetAllPlayers().forEach(v => this.render(v))
        }
        if (state >= GameState.TEAM_SHOWCASE && this.dis == false) {
            this.destroy()
            this.dis = true
        }
        if (state == GameState.PRE_GAME) {
            (async () => {
                await ASpawn()
                this.effAbi()
                GameRules.TelentCTR.init()
            })()
        }
    }

    render(pid: PlayerID) {
        if (GameRules.State_Get() == GameState.STRATEGY_TIME) {
            CustomUI.DynamicHud_Create(pid, 'ArenaStragetyTime', 'file://{resources}/layout/custom_game/strategy_time.xml', {})
        }
    }

    destroy() {
        print('des')
        for (let pid of GetAllPlayers()) {
            if (PlayerResource.GetConnectionState(pid) == ConnectionState.CONNECTED) {
                CustomUI.DynamicHud_Destroy(pid, 'ArenaStragetyTime')
                // CustomUI.DynamicHud_Destroy(pid, 'StragetyBusiness')
            }

        }
        GameRules.SetShowcaseTime(-1)
    }

    init() {
        GetAllPlayers().forEach(v => {
            this.players.push(this.refreshPlayer(v))
        })
        this.Sync()
    }

    //@ts-ignore
    parseAbilities(hero: string): string[] {
        const data = this.data[hero]
        if (data != undefined) {
            return [data['Ability1'], data['Ability2'], data['Ability3'], data['Ability6']]
        } else {
            return []
        }
    }

    refreshPlayer(v: PlayerID): {
        pid: PlayerID
        sid: string
        hero: string
        abihero: {
            hero: string
            abi: string[]
        }[]
        abi: string[]
    } {
        PlayerResource.GetPlayer(v)?.MakeRandomHeroSelection()
        const hero = PlayerResource.GetSelectedHeroName(v)
        if (v == undefined) return
        const abihero: {
            hero: string
            abi: string[]
        }[] = [{
            hero: hero,
            abi: this.parseAbilities(hero)
        }]
        while (abihero.length < 5) {
            const l = Herolist.filter(v => v != hero && !abihero.find(h => h.hero == v))
            const r = RandomInt(0, l.length - 1)
            abihero.push({
                hero: l[r],
                abi: this.parseAbilities(l[r])
            })
        }
        return {
            pid: v,
            sid: tostring(PlayerResource.GetSteamID(v)),
            hero: hero,
            abi: ['rubick_empty1', 'rubick_empty1', 'rubick_empty1', 'rubick_empty1'],
            abihero: abihero,
        }
    }

    Sync() {
        CustomNetTables.SetTableValue('strategy_abi', 'player', this.players)
    }
} 