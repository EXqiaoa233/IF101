import { BaseModifier, registerModifier } from "../utils/dota_ts_adapter";


@registerModifier()
export class modifier_infinite_power extends BaseModifier {
    IsHidden(): boolean {
        return false
    }

    IsDebuff(): boolean {
        return false
    }
    
    IsPurgable(): boolean {
        return false
    }

    IsPurgeException(): boolean {
        return false
    }

    RemoveOnDeath(): boolean {
        return false
    }

    DeclareFunctions(): ModifierFunction[] {
        return [
            ModifierFunction.MOVESPEED_BONUS_CONSTANT,
            ModifierFunction.ATTACKSPEED_BONUS_CONSTANT,
            ModifierFunction.COOLDOWN_PERCENTAGE,
            ModifierFunction.MANA_REGEN_CONSTANT
        ]
    }

    GetModifierMoveSpeedBonus_Constant() {
        return 50
    }

    GetModifierAttackSpeedBonus_Constant() {
        return 100
    }

    GetModifierPercentageCooldown() {
        return 40
    }

    GetModifierConstantManaRegen() {
        return 50
    }
}