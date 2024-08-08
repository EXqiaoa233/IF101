import { useEffect, useMemo, useState } from 'react';
import { render, useNetTableValues } from 'react-panorama-x';

const GetFitWidth = (num: number) => {
    return `${(num / 1920) * 100}%`;
};

const GetFitHeight = (num: number) => {
    return `${(num / 1080) * 100}%`;
};

interface HeroList {
    hero: string;
    abi: string[];
}

interface TeammateList {
    pid: PlayerID;
    sid: string;
    name: string;
    hero: string;
    abi: string[];
}

export const Strategy = () => {
    useEffect(() => {
        const DotaHUD = $.GetContextPanel().GetParent()?.GetParent()?.GetParent()?.GetParent();
        if (!DotaHUD) return;
        if (DotaHUD.FindChildTraverse('RightContainer')) DotaHUD.FindChildTraverse('RightContainer')!.visible = false;
        if (DotaHUD.FindChildTraverse('BacktoHeroGrid')) DotaHUD.FindChildTraverse('BacktoHeroGrid')!.visible = false;
        if (DotaHUD.FindChildTraverse('HeroRelicsContainer')) DotaHUD.FindChildTraverse('HeroRelicsContainer')!.visible = false;
        if (DotaHUD.FindChildTraverse('StrategyHeroBadge')) DotaHUD.FindChildTraverse('StrategyHeroBadge')!.visible = false;
        if (DotaHUD.FindChildTraverse('SelectedHeroAbilities')) DotaHUD.FindChildTraverse('SelectedHeroAbilities')!.visible = false;
        if (DotaHUD.FindChildTraverse('SelectedHeroAbilitiesHitTargets'))
            DotaHUD.FindChildTraverse('SelectedHeroAbilitiesHitTargets')!.visible = false;
        if (DotaHUD.FindChildTraverse('RadiantTeamPlayers')) DotaHUD.FindChildTraverse('RadiantTeamPlayers')!.visible = false;
        if (DotaHUD.FindChildTraverse('DireTeamPlayers')) DotaHUD.FindChildTraverse('DireTeamPlayers')!.visible = false;
        if (DotaHUD.FindChildTraverse('HeaderCenter')) DotaHUD.FindChildTraverse('HeaderCenter')!.visible = false;
        if (DotaHUD.FindChildTraverse('Chat')) DotaHUD.FindChildTraverse('Chat')!.style.marginRight = GetFitWidth(518);
        if (DotaHUD.FindChildTraverse('Chat')) DotaHUD.FindChildTraverse('Chat')!.style.marginBottom = GetFitHeight(55);
    }, []);

    const strategy_data = useNetTableValues('strategy_abi');

    // todo 网表解析入该钩子
    const [hl, shl] = useState<HeroList[]>([]);
    useEffect(() => {
        if (!strategy_data || !strategy_data.player || !Object.entries(strategy_data.player).find(v => v[1].pid == Players.GetLocalPlayer())) return;
        shl(
            Object.entries(Object.entries(strategy_data.player).find(v => v[1].pid == Players.GetLocalPlayer())![1].abihero).map(v => {
                return { abi: Object.entries(v[1].abi).map(v => v[1]), hero: v[1].hero };
            })
        );
    }, [strategy_data]);

    // todo 网表解析入该钩子
    const [tm, stm] = useState<TeammateList[]>([]);
    useEffect(() => {
        if (!strategy_data || !strategy_data.player) return;
        const data = Object.entries(strategy_data.player).map(v => v[1]);
        const tm: TeammateList[] = [];
        data.filter(v => Players.GetLocalPlayer() != v.pid && Players.GetTeam(v.pid) == Players.GetTeam(Players.GetLocalPlayer())).forEach(v => {
            tm.push({
                pid: v.pid,
                name: Players.GetPlayerName(v.pid),
                hero: v.hero,
                sid: v.sid,
                abi: Object.entries(v.abi).map(v => v[1]),
            });
        });
        stm(tm);
    }, [strategy_data]);

    const [pd, spd] = useState<string[]>([]);
    useEffect(() => {
        if (!strategy_data || !strategy_data.player || !Object.entries(strategy_data.player).find(v => v[1].pid == Players.GetLocalPlayer())) return;
        spd(Object.entries(Object.entries(strategy_data.player).find(v => v[1].pid == Players.GetLocalPlayer())![1].abi).map(v => v[1]));
    }, [strategy_data]);

    const [t, st] = useState<number>(90);

    return useMemo(
        () => (
            <>
                <Panel className="top" hittest={false}>
                    <Panel
                        style={{
                            backgroundImage: "url('file://{images}/strategy/tbg.png')",
                            width: '60px',
                            height: '60px',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            marginLeft: GetFitWidth(1780),
                            marginTop: '23px',
                        }}
                    >
                        <Label text={t} style={{ align: 'center center', fontSize: '30px' }} />
                    </Panel>
                </Panel>
                <Label style={{ marginLeft: GetFitWidth(770), marginTop: GetFitHeight(126) }} text={`技能选择`} className="abiText" />
                <Panel
                    style={{
                        marginLeft: GetFitWidth(770),
                        marginTop: GetFitHeight(172),
                        width: GetFitWidth(559),
                        height: GetFitHeight(496),
                        backgroundColor: ' rgba(0, 0, 0, 0.40)',
                        flowChildren: 'down',
                    }}
                >
                    {hl.map(v => (
                        <Panel style={{ marginTop: '16px', marginLeft: '16px', width: '527px', height: '80px' }}>
                            <DOTAHeroImage style={{ width: '142px', height: '80px' }} heroname={v.hero} heroimagestyle="landscape" />
                            {v.abi.map((v, i) => (
                                <DOTAAbilityImage
                                    className="playerabiHover"
                                    style={{ marginLeft: `${142 + 16 + 96 * i}px`, width: '80px', height: '80px' }}
                                    abilityname={v}
                                    showtooltip={true}
                                    onactivate={e => {
                                        if (e.abilityname != 'rubick_empty1') {
                                            sabi(e.abilityname);
                                        }
                                    }}
                                >
                                    {(i != 3
                                        ? pd.includes(v) || pd.find((v, i) => v == 'rubick_empty1' && i != 3) == undefined
                                        : pd.indexOf(v) != -1) && (
                                        <Panel style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)' }} className="easingAai">
                                            {pd.indexOf(v) != -1 && (
                                                <Label
                                                    text={pd.indexOf(v) + 1}
                                                    style={{ fontSize: '45px', align: 'center center', color: 'white' }}
                                                    className="easingText"
                                                />
                                            )}
                                        </Panel>
                                    )}
                                </DOTAAbilityImage>
                            ))}
                        </Panel>
                    ))}
                </Panel>
                <Panel
                    style={{
                        width: GetFitWidth(402),
                        height: GetFitHeight(899),
                        marginLeft: GetFitWidth(1518),
                        marginTop: GetFitHeight(126),
                        backgroundColor: ' rgba(0, 0, 0, 0.40)',
                    }}
                >
                    <Panel style={{ width: '100%', height: '30px', backgroundColor: '#000' }}>
                        <Label text={'队友阵容'} style={{ marginTop: '6px', marginLeft: '15px' }} className="teammateText" />
                    </Panel>
                    <Panel style={{ marginTop: '30px', width: '100%', flowChildren: 'down', overflow: 'squish scroll' }}>
                        {tm.map(v => (
                            <Panel
                                style={{
                                    width: '372px',
                                    height: '163px',
                                    marginTop: '15px',
                                    marginLeft: '20px',
                                    backgroundImage: "url('file://{images}/strategy/pbg.png')",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <DOTAAvatarImage
                                    steamid={v.sid == '0' ? '76561198364387387' : v.sid}
                                    style={{ width: '60px', height: '60px', marginLeft: '15px', marginTop: '13px' }}
                                />
                                <DOTAHeroImage
                                    style={{ width: '106px', height: '60px', marginLeft: '90px', marginTop: '13px' }}
                                    heroname={v.hero}
                                    heroimagestyle="landscape"
                                />
                                <Label text={v.name} style={{ marginLeft: '212px', marginTop: '20px' }} className="teammateName" />
                                <Label
                                    text={$.Localize(`#${v.hero}`)}
                                    style={{ marginLeft: '212px', marginTop: '46px' }}
                                    className="teammateHeroName"
                                />
                                {v.abi.map((v, i) => (
                                    <DOTAAbilityImage
                                        style={{ width: '60px', height: '60px', marginLeft: `${15 + 75 * i}px`, marginTop: '88px' }}
                                        abilityname={v}
                                        showtooltip={true}
                                    />
                                ))}
                            </Panel>
                        ))}
                    </Panel>
                </Panel>

                {pd.map((v, i) => (
                    <DOTAAbilityImage
                        className="playerabiHover"
                        style={{ width: '64px', height: '64px', marginLeft: GetFitWidth(190 + i * 76), marginTop: GetFitHeight(222) }}
                        showtooltip={true}
                        abilityname={v}
                        onactivate={e => {
                            if (e.abilityname != 'rubick_empty1') {
                                sabi(e.abilityname);
                            }
                        }}
                        draggable={true}
                        on-ui-DragStart={(e: Panel, s: any) => {
                            $.DispatchEvent('DOTAHideAbilityTooltip', e!);
                            s.displayPanel = $.CreatePanel('DOTAAbilityImage', e!, 'DragAbility');
                            (s.displayPanel as AbilityImage).abilityname = v;
                            //@ts-ignore
                            (s.displayPanel as AbilityImage).Data().i = i;
                            s.displayPanel.style.height = '100px';
                            s.displayPanel.style.width = '100px';
                        }}
                        on-ui-DragDrop={(p: Panel, a: Panel) => {
                            if (p.paneltype == 'DOTAAbilityImage') {
                                if (p.paneltype != 'DOTAAbilityImage' || a.paneltype != 'DOTAAbilityImage') a.DeleteAsync(0);
                                //@ts-ignore
                                const pi = (p as AbilityImage).Data().i;
                                //@ts-ignore
                                const ai = (a as AbilityImage).Data().i;

                                cabi(pi, ai);
                            }
                            a.DeleteAsync(0);
                        }}
                        on-ui-DragEnd={(p: Panel, a: Panel) => {
                            a.DeleteAsync(0);
                        }}
                        ref={e => {
                            if (!!!e) return;
                            //@ts-ignore
                            e.Data().i = i;
                        }}
                    />
                ))}
                <Button
                    className="refreshButton"
                    style={{
                        width: GetFitWidth(200),
                        height: GetFitHeight(60),
                        marginLeft: GetFitWidth(950),
                        marginTop: GetFitHeight(688),
                        backgroundColor: 'gradient( linear, 0% 0%, 0% 100%, from( #DAC480 ), to( #5B3E0D ) )',
                        borderRadius: '5px',
                    }}
                    onactivate={() => {
                        GameEvents.SendCustomGameEventToServer('refreshabi_c2s', { PlayerID: Players.GetLocalPlayer() });
                    }}
                >
                    <Label text={'全部重置'} className="refreshText" style={{ align: 'center center' }} />
                </Button>
            </>
        ),
        [hl, tm, pd, t]
    );
};

const sabi = (a: string) => {
    GameEvents.SendCustomGameEventToServer('selectabi_c2s', {
        PlayerID: Players.GetLocalPlayer(),
        abi: a,
    });
};

const cabi = (i: number, a: number) => {
    GameEvents.SendCustomGameEventToServer('cabi_c2s', {
        PlayerID: Players.GetLocalPlayer(),
        i: i,
        a: a,
    });
};

render(<Strategy />, $.GetContextPanel());
