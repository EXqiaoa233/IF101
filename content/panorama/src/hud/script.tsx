import { useEffect, useMemo, useState } from 'react';
import { render, useGameEvent } from 'react-panorama-x';

const DOTAHUD = $.GetContextPanel().GetParent()!.GetParent()!.GetParent()!.GetParent()!;

enum GoodsType {
    Shellfish = 0,
    Vip = 1,
}

interface goods {
    name: string;
    goodsType: GoodsType;
    goodsNumber: number;
    price: number;
    description: string;
}

// 测试数据
const superShellfish: goods = {
    name: '贝壳',
    goodsType: GoodsType.Shellfish,
    goodsNumber: 6480,
    price: 648,
    description: '超级大堆',
};
const goodslist: goods[] = [
    {
        name: '贝壳',
        goodsType: GoodsType.Shellfish,
        goodsNumber: 60,
        price: 6,
        description: '一小堆',
    },
    {
        name: '贝壳',
        goodsType: GoodsType.Shellfish,
        goodsNumber: 680,
        price: 68,
        description: '一中堆',
    },
    {
        name: '贝壳',
        goodsType: GoodsType.Shellfish,
        goodsNumber: 1980,
        price: 198,
        description: '一大堆',
    },
];

const viplist: goods[] = [
    {
        name: '会员',
        goodsType: GoodsType.Vip,
        goodsNumber: 1,
        price: 20,
        description: '一个月',
    },
    {
        name: '会员',
        goodsType: GoodsType.Vip,
        goodsNumber: 6,
        price: 108,
        description: '六个月',
    },
    {
        name: '会员',
        goodsType: GoodsType.Vip,
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

    useEffect(() => { }, []);

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
    //签到状态
    const [isc, sisc] = useState(0); //是否签到
    const [cday, scday] = useState(1); //第几天签到
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
                        <Panel style={{}}>
                            {['shellfish', 'member', 'signin', 'activity'].map((v, i) => (
                                <Panel
                                    style={{ ...{ flowChildren: 'right', marginLeft: `${50 + i * 250}px`, height: '70px', transitionProperty: 'width', transitionDuration: '0.2s' }, ...s == i + 1 ? { borderRadius: '100px', backgroundColor: '#433736', boxShadow: '0px 0px 6px 6px rgba(0, 0, 0, 0.15)', width: '230px' } : { width: '180px' } }}
                                    onactivate={() => {
                                        ss(i + 1);
                                    }}
                                >
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
                                    <Label
                                        text={$.Localize(`#${v}`)}
                                        style={{ marginLeft: s == i + 1 ? '30px' : '10px', verticalAlign: 'center'}}
                                        className={s == i + 1 ? 'barTextBri' : 'barTextNor'}
                                    />
                                </Panel>
                            ))}
                        </Panel>
                    </Panel>
                    <Panel>{[<Goods />, <Vip />, <Checkin checkinDay={cday} ischecked={isc} />].find((v, i) => i + 1 == s)}</Panel>
                </Panel>
            )}
        </>
    );
};

export const Goods = () => {
    const [gds, sgds] = useState<goods[]>(goodslist);
    const [spg, sspg] = useState<goods>(superShellfish);
    return (
        <>
            <SuperGoods
                item={spg}
                style={{
                    marginLeft: '40px',
                    marginTop: '150px',
                }}
            />
            <Panel
                style={{
                    width: '750px',
                    height: '900px',
                    marginLeft: '800px',
                    marginTop: '150px',
                    flowChildren: 'down',
                }}
            >
                {gds.map(v => (
                    <NormalGoods item={v} />
                ))}
            </Panel>
        </>
    );
};

export const SuperGoods = (props: { item: goods; style?: Partial<VCSSStyleDeclaration> }) => {
    const { item, style } = props;
    let tag, icon, unit;
    if (item.goodsType == GoodsType.Shellfish) {
        icon = 'coin-icon';
        tag = '贝壳购买';
        unit = '';
    } else if (item.goodsType == GoodsType.Vip) {
        icon = 'vip-icon';
        tag = '会员充值';
        unit = '个月';
    } else {
        icon = 'hh,sb';
        tag = 'hh,sb';
        unit = '';
    }

    return (
        <>
            <Panel
                className="super-coins"
                style={{
                    ...{
                        width: '700px',
                        height: '700px',
                    },
                    ...style,
                }}
                hittest={false}
            >
                <Panel
                    className={icon}
                    style={{
                        marginLeft: '30px',
                        marginTop: '30px',
                    }}
                />
                <Label
                    text={`${tag}`}
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
                        text={`${item.name} × ${item.goodsNumber}${unit}`}
                        style={{ color: '#fff', fontSize: '23px', marginLeft: '30px', marginTop: '511px' }}
                    />
                    <Button className="super-coins-buyButton" style={{ width: '297px', height: '62px', marginLeft: '313px', marginTop: '466px' }}>
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
                    </Button>
                </Panel>
            </Panel>
        </>
    );
};

export const NormalGoods = (props: { item: goods; style?: Partial<VCSSStyleDeclaration> }) => {
    const { item, style } = props;
    let tag, icon, unit;
    if (item.goodsType == GoodsType.Shellfish) {
        icon = 'coin-icon';
        tag = '贝壳购买';
        unit = '';
    } else if (item.goodsType == GoodsType.Vip) {
        icon = 'vip-icon';
        tag = '会员充值';
        unit = '个月';
    } else {
        icon = 'hh,sb';
        tag = 'hh,sb';
        unit = '';
    }
    return (
        <>
            <Panel className="other-coins" hittest={false}>
                <Panel
                    className={icon}
                    style={{
                        marginLeft: '30px',
                        marginTop: '30px',
                    }}
                />
                <Label
                    text={`${tag}`}
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
                    <Panel className="super-coins-text2" style={{ width: '119px', height: '35px', marginLeft: '327px', marginTop: '30px' }}>
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
                        text={`${item.name} × ${item.goodsNumber}${unit}`}
                        style={{ color: '#fff', fontSize: '23px', marginLeft: '327px', marginTop: '85px' }}
                    />
                    <Button className="other-coins-buybutton">
                        <Label
                            text="购买"
                            style={{
                                fontSize: '22px',
                                marginLeft: '10px',
                                marginTop: '6.5px',
                            }}
                            className="text"
                        />
                        <Label
                            text={`¥ ${item.price}`}
                            style={{
                                fontSize: '22px',
                                marginLeft: '85px',
                                marginTop: '6px',
                            }}
                            className="text"
                        />
                    </Button>
                </Panel>
            </Panel>
            {/* </Panel> */}
        </>
    );
};

export const Vip = () => {
    const [member, smember] = useState<goods[]>(viplist);
    return (
        <>
            <Panel className="vip-description" hittest={false}>
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
                        <NormalGoods item={v} />
                    ))}
                </Panel>
            </Panel>
        </>
    );
};

export const Checkin = (props: { checkinDay: number; ischecked: number }) => {
    return (
        <>
            <Panel>
                <Image className="checkinImg" src={`file://{images}/hud/signinImg/signin_${props.checkinDay}_${props.ischecked}.png`} />
            </Panel>
            <Panel className="checkin-description">
                <Panel className="checkin-description-content"></Panel>
            </Panel>
        </>
    );
};

render(<HUD />, $.GetContextPanel());
render(<Buttons />, DOTAHUD.FindChildTraverse('ButtonBar')!);
render(<Shop index={1} />, $.GetContextPanel());
