import { useEffect, useMemo, useState } from 'react';
import { render, useGameEvent } from 'react-panorama-x';

const DOTAHUD = $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.GetParent()!;

interface goods {
    goodsType: string;
    goodsNumber: number;
    price: number;
    description: string;
}

// 测试数据
const superShellfish: goods = {
    goodsType: '贝壳',
    goodsNumber: 6480,
    price: 648,
    description: '超级大堆',
};
const goodslist: goods[] = [
    {
        goodsType: '贝壳',
        goodsNumber: 60,
        price: 6,
        description: '一小堆',
    },
    {
        goodsType: '贝壳',
        goodsNumber: 680,
        price: 68,
        description: '一中堆',
    },
    {
        goodsType: '贝壳',
        goodsNumber: 1980,
        price: 198,
        description: '一大堆',
    },
];

const viplist: goods[] = [
    {
        goodsType: '会员',
        goodsNumber: 1,
        price: 20,
        description: '一个月',
    },
    {
        goodsType: '会员',
        goodsNumber: 6,
        price: 108,
        description: '六个月',
    },
    {
        goodsType: '会员',
        goodsNumber: 12,
        price: 198,
        description: '十二个月',
    },
];

export const HUD = () => {
    useGameEvent(
        'click_shop_button',
        () => {
            console.log('click');
        },
        []
    );

    useEffect(() => {}, []);

    return (
        <>
            <Panel style={{ marginLeft: '120px', marginTop: '12px' }}></Panel>
        </>
    );
};

export const Buttons = () => {
    console.log('111');

    return <></>;
};

export const Shop = (props: { index: number }) => {
    const [s, ss] = useState(props.index);
    return (
        <>
            {s != 0 && (
                <Panel
                    style={{
                        width: '1600px',
                        height: '900px',
                        align: 'center center',
                        backgroundColor: '#80745C',
                        borderRadius: '50px',
                        border: '3px solid #2F2120',
                        boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {/* 氪金界面 */}
                    {/* <Buy1 item={superShellfish} />
                    <Buy2 /> */}
                    <Vip />

                    <Panel style={{ marginLeft: '1512.5px', marginTop: '62.5px' }} onactivate={() => ss(0)}>
                        <Panel className="closeImg" />
                    </Panel>
                    <Panel
                        style={{
                            marginLeft: '1211px',
                            marginTop: '50px',
                            backgroundColor: '#433736',
                            width: '240px',
                            height: '50px',
                            borderRadius: '1000px',
                            border: '3px solid #433736',
                            boxShadow: '0px 0px 6px 6px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <Panel className="shellfishImg" style={{ marginLeft: '10px', verticalAlign: 'center' }} />
                        <Label className="shellfishText" text={7396} style={{ marginLeft: '100px', verticalAlign: 'center' }} />
                        <Panel className="shellfishPlusImg" style={{ marginLeft: '205px', verticalAlign: 'center' }} />
                    </Panel>

                    <Panel style={{ marginTop: '40px', marginLeft: '40px', height: '70px', width: '1100px' }}>
                        <Panel
                            style={{
                                width: '100%',
                                height: '50px',
                                verticalAlign: 'center',
                                borderRadius: '1000px',
                                border: '3px solid #2F2120',
                                backgroundColor: '#80745C',
                                boxShadow: '0px 0px 6px 6px rgba(0, 0, 0, 0.15)',
                            }}
                        />
                        <Panel style={{ flowChildren: 'right' }}>
                            {['shellfish', 'member', 'signin'].map((v, i) => (
                                <Panel
                                    style={{ width: '250px', marginLeft: '100px', height: '70px' }}
                                    className={s == i + 1 ? 'barBri' : ''}
                                    onactivate={() => {
                                        ss(i + 1);
                                    }}
                                >
                                    <Label
                                        text={$.Localize(`#${v}`)}
                                        style={{ align: 'center center' }}
                                        className={s == i + 1 ? 'barTextBri' : 'barTextNor'}
                                    />
                                    {s == i + 1 ? (
                                        <Panel
                                            className="circle"
                                            style={{ color: 'white', verticalAlign: 'center', marginLeft: '10px', height: '60px', width: '60px' }}
                                        >
                                            <Panel className={v} style={{ height: '40px', width: '40px', align: 'center center' }} />
                                        </Panel>
                                    ) : (
                                        <Panel
                                            className={v + 'Dark'}
                                            style={{ height: '40px', width: '40px', color: 'white', verticalAlign: 'center', marginLeft: '40px' }}
                                        />
                                    )}
                                </Panel>
                            ))}
                        </Panel>
                    </Panel>
                </Panel>
            )}
        </>
    );
};

export const Buy1 = (props: { item: goods }) => {
    const { item } = props;
    return (
        <>
            {item.goodsNumber != 0 && (
                <Panel>
                    <Panel
                        className="super-coins"
                        style={{
                            width: '700px',
                            height: '700px',
                            marginLeft: '40px',
                            marginTop: '150px',
                        }}
                    >
                        <Panel
                            className="coin-icon"
                            style={{
                                marginLeft: '30px',
                                marginTop: '30px',
                            }}
                        />
                        <Label
                            text={`${item.goodsType}购买`}
                            style={{
                                color: '#2F2120',
                                fontSize: '30px',
                                marginLeft: '83.4px',
                                marginTop: '30px',
                            }}
                        />
                        <Panel className="super-coins-content" style={{ width: '640px', height: '568px', marginLeft: '30px', marginTop: '102px' }}>
                            <Panel className="super-coins-text" style={{ width: '640px', height: '436px' }}>
                                <Label style={{ align: 'center center' }}></Label>
                            </Panel>
                            <Panel className="super-coins-text2" style={{ width: '119px', height: '35px', marginLeft: '30px', marginTop: '456px' }}>
                                <Label
                                    text="常驻商品"
                                    style={{
                                        color: '#2F2120',
                                        fontSize: '25px',
                                        marginLeft: '10px',
                                        marginTop: '5px',
                                    }}
                                />
                            </Panel>
                            <Label
                                text={`${item.goodsType} × ${item.goodsNumber}`}
                                style={{ color: '#fff', fontSize: '23px', marginLeft: '30px', marginTop: '511px' }}
                            />
                            <Panel
                                className="super-coins-buyButton"
                                style={{ width: '297px', height: '62px', marginLeft: '313px', marginTop: '466px' }}
                            >
                                <Label
                                    text="购买"
                                    style={{
                                        color: '#2F2120',
                                        fontSize: '30px',
                                        marginLeft: '30px',
                                        marginTop: '10px',
                                    }}
                                />
                                <Label
                                    text={`¥${item.price}`}
                                    style={{
                                        color: '#2F2120',
                                        fontSize: '30px',
                                        marginLeft: '190px',
                                        marginTop: '10px',
                                    }}
                                />
                            </Panel>
                        </Panel>
                    </Panel>
                </Panel>
            )}
        </>
    );
};

export const Buy2 = () => {
    const [gd, sgd] = useState<goods[]>(goodslist);
    return (
        <>
            <Panel
                style={{
                    width: '750px',
                    height: '900px',
                    marginLeft: '800px',
                    marginTop: '150px',
                }}
            >
                <Panel style={{ flowChildren: 'down' }}>
                    {gd.map((v, i) => (
                        <Panel className="other-coins">
                            <Panel
                                className="coin-icon"
                                style={{
                                    marginLeft: '30px',
                                    marginTop: '30px',
                                }}
                            />
                            <Label
                                text={`${v.goodsType}购买`}
                                style={{
                                    color: '#2F2120',
                                    fontSize: '30px',
                                    marginLeft: '83.4px',
                                    marginTop: '30px',
                                }}
                            />
                            <Panel className="other-coin-content">
                                <Panel className="other-coin-text">
                                    <Label style={{ align: 'center center' }}></Label>
                                </Panel>
                                <Panel
                                    className="super-coins-text2"
                                    style={{ width: '119px', height: '35px', marginLeft: '327px', marginTop: '30px' }}
                                >
                                    <Label
                                        text="常驻商品"
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '25px',
                                            marginLeft: '10px',
                                            marginTop: '5px',
                                        }}
                                    />
                                </Panel>
                                <Label
                                    text={`${v.goodsType} × ${v.goodsNumber}`}
                                    style={{ color: '#fff', fontSize: '23px', marginLeft: '327px', marginTop: '85px' }}
                                />
                                <Panel className="other-coins-buybutton">
                                    <Label
                                        text="购买"
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '22px',
                                            marginLeft: '10px',
                                            marginTop: '6.5px',
                                        }}
                                    />
                                    <Label
                                        text={`¥ ${v.price}`}
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '22px',
                                            marginLeft: '85px',
                                            marginTop: '6px',
                                        }}
                                    />
                                </Panel>
                            </Panel>
                        </Panel>
                    ))}
                </Panel>
            </Panel>
        </>
    );
};

export const Vip = () => {
    const [member, smember] = useState<goods[]>(viplist);
    return (
        <>
            <Panel className="vip-description">
                <Panel className="vip-description-background" style={{ zIndex: -1 }} />
            </Panel>
            <Panel
                style={{
                    width: '750px',
                    height: '900px',
                    marginLeft: '800px',
                    marginTop: '150px',
                }}
            >
                <Panel style={{ flowChildren: 'down' }}>
                    {member.map((v, i) => (
                        <Panel className="other-coins">
                            <Panel className="vip-icon-background" style={{ marginLeft: '30px', marginTop: '30px' }}>
                                <Panel className="vip-icon" style={{ marginLeft: '8px', marginTop: '8px' }} />
                            </Panel>
                            <Label
                                text={`${v.goodsType}充值`}
                                style={{
                                    color: '#2F2120',
                                    fontSize: '30px',
                                    marginLeft: '83.4px',
                                    marginTop: '30px',
                                }}
                            />
                            <Panel className="other-coin-content">
                                <Panel className="other-coin-text">
                                    <Label style={{ align: 'center center' }}></Label>
                                </Panel>
                                <Panel
                                    className="super-coins-text2"
                                    style={{ width: '119px', height: '35px', marginLeft: '327px', marginTop: '30px' }}
                                >
                                    <Label
                                        text="常驻商品"
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '25px',
                                            marginLeft: '10px',
                                            marginTop: '5px',
                                        }}
                                    />
                                </Panel>
                                <Label
                                    text={`${v.goodsType} × ${v.goodsNumber}个月`}
                                    style={{ color: '#fff', fontSize: '23px', marginLeft: '327px', marginTop: '85px' }}
                                />
                                <Panel className="other-coins-buybutton">
                                    <Label
                                        text="购买"
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '22px',
                                            marginLeft: '10px',
                                            marginTop: '6.5px',
                                        }}
                                    />
                                    <Label
                                        text={`¥ ${v.price}`}
                                        style={{
                                            color: '#2F2120',
                                            fontSize: '22px',
                                            marginLeft: '85px',
                                            marginTop: '6px',
                                        }}
                                    />
                                </Panel>
                            </Panel>
                        </Panel>
                    ))}
                </Panel>
            </Panel>
        </>
    );
};

render(<HUD />, $.GetContextPanel());
render(<Buttons />, DOTAHUD.FindChildTraverse('ButtonBar')!);
render(<Shop index={1} />, $.GetContextPanel());
