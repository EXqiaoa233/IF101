import { useEffect, useMemo, useState } from "react"
import { render, useGameEvent, useNetTableValues } from "react-panorama-x"

const DOTAHUD = $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.GetParent()!

const lvls = [25, 20, 15, 10]

const GetFitWidth = (num: number) => {
    return `${num / 1920 * 100}%`
}

const GetFitHeight = (num: number) => {
    return `${num / 1080 * 100}%`
}


export const TelentPanel = (props: { lvl: number, k: string, isSelected: number, isLocked: boolean, style?: Partial<VCSSStyleDeclaration> }) => {
    const { lvl, k, isSelected, isLocked } = props
    let butcolor
    if (lvl == 0) butcolor = 'rgba(177, 196, 217, 1)'
    if (lvl == 1) butcolor = 'rgba(70, 97, 234, 1)'
    if (lvl == 2) butcolor = 'rgba(211, 45, 230, 1)'
    if (lvl == 3) butcolor = 'rgba(222, 170, 57, 1)'
    if (isLocked) {
        return <Panel style={props.style}>
            <Panel style={{ width: '212px', height: '44px' }}>
                <Panel style={{ width: '200px', height: '32px', marginLeft: '12px', marginTop: '12px' }}>
                    <Panel style={{ width: '200px', height: '29px', backgroundColor: 'rgba(51, 51, 51, 1)' }}>
                        <Label text={$.Localize(`#DOTA_Tooltip_ability_${k}`)} style={{ color: 'rgb(128,128,128)', align: 'center center', fontSize: '13px', textOverflow: 'shrink', textAlign: 'center' }} />
                    </Panel>
                    <Panel style={{ backgroundColor: butcolor, marginTop: '29px', width: '200px', height: '3px' }} />
                </Panel>
            </Panel>
        </Panel>
    } else {
        return <Panel style={props.style}>
            <Panel style={{ width: '212px', height: '44px' }}>
                <Panel style={{ width: '200px', height: '32px', marginLeft: '12px', marginTop: '12px' }}>
                    <Panel style={{ width: '200px', height: isSelected != 0 ? '32px' : '29px' }} className={isSelected != 0 ? 'telentPanelBg1' : 'telentPanelBg2'}>
                        <Label text={$.Localize(`#DOTA_Tooltip_ability_${k}`)} className="text" style={{ align: 'center center', fontSize: '13px', textOverflow: 'shrink', textAlign: 'center' }} />
                        <Panel className="delta" style={{ width: '12px', height: '12px', marginLeft: '183px' }} />
                    </Panel>
                    {
                        isSelected == 0 && <Panel style={{ backgroundColor: butcolor, marginTop: '29px', width: '200px', height: '3px' }} />
                    }

                </Panel>
                {
                    isSelected != 0 && <Panel style={{ width: '24px', height: '24px' }} className="telentEllipseImg">
                        <Label text={isSelected} className="telentEllipseText" style={{ align: 'center center', marginTop: '1px' }} />
                    </Panel>
                }
            </Panel>
        </Panel>
    }
}

export const Telent = () => {

    // useEffect(() => {
    //     const DOTAHUD = $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.GetParent()!
    //     if (!tdata || !tdata.players || !tdata.players[`${Players.GetLocalPlayer()}`]) return
    //     console.log(tdata.players[`${Players.GetLocalPlayer()}`]);
    //     if (Object.entries(tdata.players[`${Players.GetLocalPlayer()}`][10]).length > 0) {
    //         (DOTAHUD.FindChildTraverse('UpgradeName1') as LabelPanel)!.text = (tdata.players[`${Players.GetLocalPlayer()}`][10][1]['key']);
    //         (DOTAHUD.FindChildTraverse('UpgradeName2') as LabelPanel)!.text = (tdata.players[`${Players.GetLocalPlayer()}`][10][2]['key']);
    //     }

    // }, [tdata])
    

    // $.RegisterEventHandler('')

    const td = useNetTableValues('telent')
    const [plvl, splvl] = useState<10 | 15 | 20 | 25 | 30>(10)
    useEffect(() => {
        if (!td || !td.players || Object.entries(td.players).length == 0) return
        const pd = Object.entries(td.players).find(v => v[1].pid == Players.GetLocalPlayer())
        if (pd && pd[1] != undefined) {
            splvl(pd[1].lvl)
        }
    }, [td])

    const [s, ss] = useState(false)

    useEffect(() => {
        $.RegisterEventHandler('DOTAHUDStatBranchClicked', DOTAHUD.FindChildTraverse('StatBranch')!, () => {
            console.log('ss');
            if (Players.GetLocalPlayerPortraitUnit() == Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())) {
                ss(true)
            }
        })

        GameUI.SetMouseCallback((e, v) => {
            if (v == 0) {
                console.log('sf');
                ss(false)
            }
            return false
        })
    }, [])


    return useMemo(() => (<>
        {
            <Panel style={{ marginTop: `424px`, marginLeft: GetFitWidth(973), width: '900px', height: '452px' }}>
                <Label text={'天赋抽取'} style={{}} className="telentText" />
                <Panel style={{ width: '900px', height: '350px', marginTop: '50px', border: '1px solid rgba(255, 255, 255, 0.50)', backgroundColor: 'rgba(0, 0, 0, 0.50)' }}>
                    {/* <TelentPanel lvl={0} k={'antimage_mana_overload_Description'} isSelected={0} isLocked={true} style={{ marginTop: '20px', marginLeft: '20px' }} />
                    <TelentPanel lvl={1} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={true} style={{ marginTop: '80px', marginLeft: '20px' }} />
                    <TelentPanel lvl={2} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={true} style={{ marginTop: '140px', marginLeft: '20px' }} />
                    <TelentPanel lvl={3} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={true} style={{ marginTop: '200px', marginLeft: '20px' }} />
                    <TelentPanel lvl={0} k={'special_bonus_unique_clinkz_2'} isSelected={1} isLocked={false} style={{ marginTop: '20px', marginLeft: '260px' }} />
                    <TelentPanel lvl={1} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={false} style={{ marginTop: '80px', marginLeft: '260px' }} />
                    <TelentPanel lvl={2} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={false} style={{ marginTop: '140px', marginLeft: '260px' }} />
                    <TelentPanel lvl={3} k={'special_bonus_unique_clinkz_2'} isSelected={0} isLocked={false} style={{ marginTop: '200px', marginLeft: '260px' }} /> */}
                    <Label text={'<b><i>N</i></b> 普通天赋'} html={true} className="telentPanelText" style={{ color: '#B1C4D9', marginLeft: '42px', marginTop: '20px' }} />
                    <Label text={'<b><i>R</i></b> 稀有天赋'} html={true} className="telentPanelText" style={{ color: '#4661EA', marginLeft: '42px', marginTop: '102px' }} />
                    <Label text={'<b><i>SR</i></b> 传说天赋'} html={true} className="telentPanelText" style={{ color: '#D32DE6', marginLeft: '42px', marginTop: '184px' }} />
                    <Label text={'<b><i>SSR</i></b> 不朽天赋'} html={true} className="telentPanelText" style={{ color: '#DEAA39', marginLeft: '42px', marginTop: '266px' }} />
                </Panel>
                <Panel className="telentRandomImg" style={{ width: '200px', height: '32px', marginLeft: '243px', marginTop: '420px' }} >
                    <Label text={'抽取四个天赋'} className="telentRandomText" />
                </Panel>
                <Panel className="telentDetermineImg" style={{ width: '200px', height: '32px', marginLeft: '460px', marginTop: '420px', backgroundColor: true ? 'gradient( linear, 0% 0%, 0% 100%, from( #5A615Ecc ), to( #879695cc ) )' : 'gradient(linear, 0% 0%, 0% 100%, from(#5Aa15E), to(#87d695))' }}>
                    <Label text={`已选中 <b>0/2</b> 个天赋`} html={true} className="telentRandomText" />
                </Panel>
            </Panel>
        }

    </>), [s, plvl])
}

render(<Telent />, $.GetContextPanel())