export class GameConfig {
    constructor() {
        SendToServerConsole('dota_max_physical_items_purchase_limit 9999'); // 用来解决物品数量限制问题

        GameRules.SetTimeOfDay(0.25)
        GameRules.SetHeroSelectionTime(-1)
        GameRules.SetHeroSelectPenaltyTime(-1)
        GameRules.SetStrategyTime(3)
        GameRules.SetEnableAlternateHeroGrids(false)
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 10)
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 10)
        GameRules.SetUseBaseGoldBountyOnHeroes(true)
        GameRules.SetHeroRespawnEnabled(false)
        GameRules.SetUseUniversalShopMode(true)
        GameRules.SetShowcaseTime(1)
        GameRules.SetCustomGameSetupTimeout(-1)
        const Gamemode = GameRules.GetGameModeEntity();
        Gamemode.SetBuybackEnabled(false)
        Gamemode.SetLoseGoldOnDeath(false)
        Gamemode.SetDraftingBanningTimeOverride(-1)
        Gamemode.SetDraftingHeroPickSelectTimeOverride(-1)
        Gamemode.SetDaynightCycleDisabled(false)
        if (IsInToolsMode()) return
        Gamemode.SetBotThinkingEnabled(true)
    }
}