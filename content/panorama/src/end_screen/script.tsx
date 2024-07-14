import { useMemo, useState } from "react"
import { render } from "react-panorama-x"

const GetFitWidth = (num: number) => {
    return `${num / 1920 * 100}%`
}

const GetFitHeight = (num: number) => {
    return `${num / 1080 * 100}%`
}

const titles = ['abi', 'kill', 'death', 'assist', 'gold', 'items', 'bagitems', 'lh', 'gpm', 'xpm', 'herodmg', 'towerkill', 'takedmg']

const Item = (props: { title: string, items: string[] }) => {
    const { title, items } = props
    console.log(items);
    console.log(title);
    console.log($.Localize(`#${title}`));


    if (title == 'abi') {
        return <Panel style={{ marginLeft: '12px', height: '100%' }}>
            <Panel style={{ height: '70px' }}>
                <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center', fontWeight: 'bold' }} className="titleText" />
            </Panel>
            <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
                {
                    items.map(v => <Panel style={{ height: '66px', marginTop: '4px', flowChildren: 'right' }}>
                        {
                            'puck_ethereal_jaunt|naga_siren_reel_in|earth_spirit_petrify|phoenix_launch_fire_spirit'.split('|').map(v => (
                                <DOTAAbilityImage abilityname={v} showtooltip={true} style={{ width: '39px', height: '39px', marginLeft: '4px', verticalAlign: 'center', backgroundColor: '#00000066', border: '1px solid black' }} />
                            ))
                        }
                    </Panel>)
                }
            </Panel>
        </Panel>
    }
    if (title == 'kill') {
        return <Panel style={{ marginLeft: '12px', height: '100%' }}>
            <Panel style={{ height: '70px' }}>
                <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center', fontWeight: 'bold' }} className="titleText" />
            </Panel>
            <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
                {
                    items.map(v => <Panel style={{ height: '66px', marginTop: '4px' }}>
                        <Label text={v} style={{ align: 'center center', color: 'white', fontWeight: 'bold' }} />
                    </Panel>)
                }
            </Panel>
        </Panel>
    }
    if (title == 'gold' || title == 'gpm') {

        return <Panel style={{ marginLeft: '12px', height: '100%' }}>
            <Panel style={{ height: '70px' }}>
                <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center', color: '#E7BA01FF', fontWeight: 'bold' }} className="titleText" />
            </Panel>
            <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
                {
                    items.map(v => <Panel style={{ height: '66px', marginTop: '4px' }}>
                        <Label text={v} style={{ align: 'center center', color: '#E7BA01FF', fontWeight: 'bold' }} />
                    </Panel>)
                }
            </Panel>
        </Panel>
    }
    if (title == 'items') {
        return <Panel style={{ marginLeft: '12px', height: '100%' }}>
            <Panel style={{ height: '70px' }}>
                <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center', fontWeight: 'bold' }} className="titleText" />
            </Panel>
            <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
                {
                    items.map(v => <Panel style={{ height: '66px', marginTop: '4px', flowChildren: 'right' }}>
                        {
                            'item_blink|item_blink|item_blink|item_blink|nil|nil'.split('|').map(v => (
                                <DOTAItemImage itemname={v} showtooltip={true} style={{ width: '53px', height: '39px', marginLeft: '4px', verticalAlign: 'center', backgroundColor: '#00000066', border: '1px solid black' }} />
                            ))
                        }
                    </Panel>)
                }
            </Panel>
        </Panel>
    }
    if (title == 'bagitems') {
        return <Panel style={{ marginLeft: '12px', height: '100%' }}>
            <Panel style={{ height: '70px' }}>
                <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center' }} className="titleText" />
            </Panel>
            <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
                {
                    items.map(v => <Panel style={{ height: '66px', marginTop: '4px', flowChildren: 'right' }}>
                        {
                            'item_blink|nil|item_blink'.split('|').map(v => (
                                <DOTAItemImage itemname={v} showtooltip={true} style={{ width: '53px', height: '39px', marginLeft: '4px', verticalAlign: 'center', backgroundColor: '#00000066', border: '1px solid black' }} />
                            ))
                        }
                    </Panel>)
                }
            </Panel>
        </Panel>
    }

    return <Panel style={{ marginLeft: '12px', height: '100%' }}>
        <Panel style={{ height: '70px' }}>
            <Label text={$.Localize(`#${title}`)} html={true} style={{ align: 'center center' }} className="titleText" />
        </Panel>
        <Panel style={{ marginTop: '70px', flowChildren: 'down' }}>
            {
                items.map(v => <Panel style={{ height: '66px', marginTop: '4px' }}>
                    <Label text={v} style={{ align: 'center center', fontWeight: 'bold' }} />
                </Panel>)
            }
        </Panel>
    </Panel>
}

export const EndScreen = () => {

    const [team, setteam] = useState(0)

    return useMemo(() => <>
        <Panel style={{ width: GetFitWidth(1920), height: GetFitHeight(770), backgroundColor: '#000000B7', marginTop: GetFitHeight(180) }}>
            <Panel style={{ width: '318px', marginLeft: '32px', height: '100%', backgroundColor: 'gradient( linear, 0% 0%, 0% 100%, from( #222424 ), to( #121A1F ) )' }}>
                <Label text={`点击切换${team == 0 ? `夜魇` : `天辉`}`} style={{ fontSize: '20px', marginLeft: '180px', marginTop: '23px', textShadow: '0px 0px 4px 1.0 #BDB76B' }} className="exText" />
                <Panel style={{ marginLeft: '20px', marginTop: '5px' }} onactivate={() => {
                    setteam(team == 0 ? 1 : 0)
                }} >
                    <Panel className={`${team == 0 ? `dire` : `radiant`}Img`} style={{ opacity: '0.1', marginTop: '10px', marginLeft: '6px' }} />
                    <Panel className={`${team == 0 ? `radiant` : `dire`}Img`} />
                    <Label text={team == 0 ? `天辉` : `夜魇`} className="teamText" style={{ textShadow: team == 0 ? '0px 0px 6px 1.0 #9BE40C8F' : '0px 0px 6px 1.0 #E74D088F' }} />
                    <Label text={`人头数： <font color="white"><b>${12}</b></font>`} style={{ fontSize: '18px', marginLeft: '60px', marginTop: '30px' }} html={true} />
                </Panel>
            </Panel>
            <Panel style={{ width: '260px', marginLeft: '1620px', height: '100%', backgroundColor: 'gradient( linear, 0% 0%, 0% 100%, from( #222424 ), to( #121A1F ) )' }}></Panel>
            <Panel style={{ marginTop: '70px', height: '700px', marginLeft: '32px', width: '100%', flowChildren: 'down' }}>
                {
                    new Array(10).fill(1).map(v => <Panel style={{ width: '100%', height: '70px' }}>
                        <Panel style={{ width: '318px', height: '66px', marginTop: '4px', backgroundColor: '#00000077' }}>
                            <DOTAHeroImage style={{ width: '74px', height: '42px', marginLeft: '8px', border: '1px solid black', verticalAlign: 'center' }} heroname="npc_dota_hero_axe" heroimagestyle="landscape" />
                            <DOTAUserName steamid="76561198364387387" style={{ marginLeft: '88px', marginTop: '10px' }} />
                            <Label text={$.Localize(`#${'npc_dota_hero_axe'}`)} style={{ marginLeft: '88px', marginTop: '32px',fontSize:'16px' }} />
                        </Panel>
                        <Panel style={{ width: '1270px', marginLeft: '318px', height: '66px', marginTop: '4px', borderTop: '1px solid black', borderBottom: '1px solid black', backgroundColor: '#00000077' }}>
                        </Panel>
                        <Panel style={{ width: '260px', marginLeft: '1588px', height: '66px', marginTop: '4px', backgroundColor: '#00000077' }}>

                        </Panel>
                    </Panel>)
                }
            </Panel>
            <Panel style={{ width: '260px', marginLeft: '1620px', height: '100%' }}>
                <Label text={'称号'} className="titleText" style={{ marginLeft: '16px', marginTop: '20px' }} />
            </Panel>
            <Panel style={{ width: '1270px', marginLeft: '350px', height: '100%', flowChildren: 'right', overflow: 'scroll squish' }}>
                {
                    titles.map(v => (<Item title={v} items={new Array(10).fill('1000000')} />))
                }
            </Panel>
        </Panel>
    </>, [team])
}

render(<EndScreen />, $.GetContextPanel())