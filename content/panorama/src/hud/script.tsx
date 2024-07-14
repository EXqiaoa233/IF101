import { useEffect, useMemo, useState } from "react"
import { render, useGameEvent } from "react-panorama-x"

const DOTAHUD = $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.GetParent()!

export const HUD = () => {

    useGameEvent('click_shop_button', () => {
        console.log('click');

    }, [])

    useEffect(() => {

    }, [])

    return <>
        <Panel style={{ marginLeft: '120px', marginTop: '12px' }}>

        </Panel>
    </>
}

export const Buttons = () => {
    console.log('111');

    return <>

    </>
}

export const Shop = (props: { index: number }) => {
    const [s, ss] = useState(props.index)
    return <>
        {
            s != 0 && <Panel style={{ width: '1600px', height: '900px', align: 'center center', backgroundColor: '#80745C', borderRadius: '50px', border: '3px solid #2F2120', boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                <Panel style={{ marginLeft: '1512.5px', marginTop: '62.5px' }} onactivate={() => ss(0)}>
                    <Panel className="closeImg" />
                </Panel>
                <Panel style={{ marginLeft: '1211px', marginTop: '50px', backgroundColor: '#433736', width: '240px', height: '50px', borderRadius: '1000px', border: '3px solid #433736', boxShadow: '0px 0px 6px 6px rgba(0, 0, 0, 0.15)' }}>
                    <Panel className="shellfishImg" style={{ marginLeft: '10px', verticalAlign: 'center' }} />
                    <Label className="shellfishText" text={7396} style={{ marginLeft: '100px', verticalAlign: 'center' }} />
                    <Panel className="shellfishPlusImg" style={{ marginLeft: '205px', verticalAlign: 'center' }} />
                </Panel>

                <Panel style={{ marginTop: '40px', marginLeft: '40px', height: '70px', width: '1100px' }}>
                    <Panel style={{ width: '100%', height: '50px', verticalAlign: 'center', borderRadius: '1000px', border: '3px solid #2F2120', backgroundColor: '#80745C', boxShadow: '0px 0px 6px 6px rgba(0, 0, 0, 0.15)' }} />
                    <Panel style={{ flowChildren: 'right' }}>
                        {
                            ['shellfish', 'member', 'signin'].map((v, i) => (
                                <Panel style={{ width: '250px', marginLeft: '100px', height: '70px' }} className={s == i + 1 ? 'barBri' : ''} onactivate={() => {
                                    ss(i + 1)
                                }}>
                                    <Label text={$.Localize(`#${v}`)} style={{ align: 'center center' }} className={s == i + 1 ? 'barTextBri' : 'barTextNor'} />
                                    {
                                        s == i + 1 ?
                                            <Panel className="circle" style={{ color: 'white', verticalAlign: 'center', marginLeft: '10px', height: '60px', width: '60px' }} >
                                                <Panel className={v} style={{ height: '40px', width: '40px', align: 'center center' }} />
                                            </Panel>
                                            : <Panel className={v + 'Dark'} style={{ height: '40px', width: '40px', color: 'white', verticalAlign: 'center', marginLeft: '40px' }} />
                                    }
                                </Panel>
                            ))
                        }
                    </Panel>
                </Panel>
            </Panel>
        }
    </>
}

render(<HUD />, $.GetContextPanel())
render(<Buttons />, DOTAHUD.FindChildTraverse('ButtonBar')!)
render(<Shop index={1} />, $.GetContextPanel())

