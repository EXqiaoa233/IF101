import { bindabiList, bindabiType } from "./data/bindabi"


export function GetAllPlayers(): PlayerID[] {
    const l = []
    let i = 0
    while (PlayerResource.IsValidPlayer(i)) {
        l.push(i)
        i++
    }
    return l
}

export async function AInit() {
    return new Promise(r => {
        Timers.CreateTimer(() => {
            if (GetAllPlayers().length == 0) {
                return 0.03
            } else {
                r('')
            }
        })
    })
}

export function ASpawn() {
    return new Promise(r => {
        Timers.CreateTimer(() => {
            if (GetAllPlayers().find(v => {
                const hero = GetPlayerHero(v)
                return hero == undefined || hero.IsNull() || hero.IsAlive() == false
            }) == undefined) {
                r('')
                return
            } else {
                return 0.03
            }
        })
    })
}

export function GetPlayerHero(pid: PlayerID): CDOTA_BaseNPC_Hero | undefined {
    const h = Entities.FindAllByClassname(PlayerResource.GetSelectedHeroName(pid)).filter((x: CDOTA_BaseNPC_Hero) => x.IsRealHero())
    if (h.length == 0) return undefined
    return h[0] as CDOTA_BaseNPC_Hero
}

export const GetConnAndBonus = (abi: string[]): { conn: string[], bonus: string[] } => {
    let resp = {
        conn: [],
        bonus: []
    }

    abi.forEach(v => {
        const d = bindabiList[v]
        if (d == undefined || d.length == 0) return
        d.forEach(va => {
            if (va.type == bindabiType.bonus)
                resp.bonus.push(va.abi)
            if (va.type == bindabiType.conn)
                resp.bonus.push(va.abi)
        })
    })
    return resp
}

export const RmAbi = (p: CDOTA_BaseNPC_Hero, abi: string) => {
    const d = bindabiList[abi]
    for (let i = 0; i < 35; i++) {
        const a = p.GetAbilityByIndex(i)
        if (a == undefined || a.IsNull()) continue
        if (a.GetAbilityName() != abi) continue
        p.RemoveAbilityByHandle(a)
        p.AddAbility('generic_hidden')
        break
    }
    if (d == undefined || d.length == 0) return
    d.forEach(va => {
        for (let i = 0; i < 35; i++) {
            const a = p.GetAbilityByIndex(i)
            if (a == undefined || a.IsNull()) continue
            if (a.GetAbilityName() != va.abi) continue
            p.RemoveAbilityByHandle(a)
            p.AddAbility('generic_hidden')
            break
        }
    })
}

export const EffAdditionAbi = (p: CDOTA_BaseNPC_Hero, abi: string[]) => {
    (() => {
        const d = GetConnAndBonus(abi)
        return [d.bonus, d.conn]
    })().forEach((v, ind) => {
        v.forEach(va => {
            print('deal ' + va)
            for (let i = 0; i < 35; i++) {
                const abi = p.GetAbilityByIndex(i)
                if (abi == undefined || abi.IsNull()) continue
                if (ind != 0 && i < 5) continue
                if (abi.GetAbilityName() != 'generic_hidden') continue
                print(`remove ${abi.GetAbilityName()} bonus ${v} slot ${i}`)
                p.RemoveAbilityByHandle(abi)
                p.AddAbility(va)
                return
            }
            p.AddAbility(va)
            print('add abi ' + va)
            return
        })
    })
    p.FindAllModifiers().filter(v => v.GetName().includes('scepter')).forEach(v => {
        const duration = v.GetDuration()
        const abi = v.GetAbility()
        const modi = v.GetName()
        p.RemoveModifierByName(modi)
        p.AddNewModifier(p, abi, modi, { duration: duration })
    })
    // RemoveUselessAbi(p)
}

export const RemoveUselessAbi = (p: CDOTA_BaseNPC_Hero) => {
    for (let i = 0; i < 35; i++) {
        const abi = p.GetAbilityByIndex(i)
        if (abi == undefined || abi.IsNull()) continue
        if (abi.GetAbilityName() == 'generic_hidden') continue
        for (let j = i + 1; j < 35; j++) {
            const nabi = p.GetAbilityByIndex(j)
            if (nabi == undefined || nabi.IsNull()) continue
            if (nabi.GetAbilityName() == abi.GetAbilityName()) {
                p.RemoveAbilityByHandle(nabi)
                p.AddAbility('generic_hidden')
            }
        }
    }
}

export const ckAbi = (p: CDOTA_BaseNPC_Hero) => {
    print('===========================')
    print('ckabi start')
    for (let i = 0; i < 35; i++) {
        const abi = p.GetAbilityByIndex(i)
        if (abi == undefined || abi.IsNull()) {
            print(`undefined slot ${i}`)
            continue
        }
        print(`${abi.GetAbilityName()} slot ${i}`)
    }
    print('ckabi end')
    print('===========================')


}