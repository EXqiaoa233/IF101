import { GetAllPlayers, GetPlayerHero } from "../function"
import { modifier_infinite_power } from "../modifier/infinite_power"


export class ProgressController {
    constructor() {
        ListenToGameEvent('dota_game_state_change', (e) => this.dota_game_state_change(e), undefined)
    }

    dota_game_state_change(e) {
        const state = GameRules.State_Get()
        switch (state) {
            case GameState.PRE_GAME:
                Timers.CreateTimer(() => {
                    if (GetAllPlayers().find(v => {
                        return !GetPlayerHero(v) || GetPlayerHero(v).IsNull() || !GetPlayerHero(v).IsAlive()
                    })) {
                        return 0.03
                    } else {
                        GetAllPlayers().forEach(v => {
                            GetPlayerHero(v).AddNewModifier(GetPlayerHero(v), undefined, modifier_infinite_power.name, { duration: -1 })
                        })
                    }
                })
        }
    }
}