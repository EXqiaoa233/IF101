declare interface CustomGameEventDeclarations {
    /** 
     * 在前后端之间（UI的ts代码和游戏逻辑的ts代码之间）传递的事件，需要在此处声明事件的参数类型
     *  events and it's parameters between ui and game mode typescript code should be declared here
     */
    c2s_test_event: {};
    c2s_test_event_with_params: {
        foo: number;
        bar: string;
    };
    selectabi_c2s: {
        PlayerID: PlayerID
        abi: string
    }
    cabi_c2s: {
        PlayerID: PlayerID
        i: number
        a: number
    }
    refreshabi_c2s: {
        PlayerID: PlayerID
    }
    random_telent_c2s: {
        PlayerID: PlayerID
        Level: number
    }
    click_shop_button: {
        button: number
    }
}
