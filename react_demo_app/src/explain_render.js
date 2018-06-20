// ローカルで動かせないので、codesandboxで動作確認すること。

import React from "react";
import ReactDOM from "react-dom";

// stateを更新するためのデータ
const COINS = [
    { name: "Bitcoin", symbol: "BTC", rank: "1" },
    { name: "Ethereum", symbol: "ETH", rank: "2" },
    { name: "Ripple", symbol: "XRP", rank: "3" }
];

// Reactコンポーネント作成
class ExplainRender extends React.Component {
    renderCoins() {
        var list = [];
        for (let key in COINS) {
            let coin = COINS[key];
            // データをJSXで変換して配列に詰める。
            list.push(
                <li>
                    rank: {coin["rank"]}, name: {coin["name"]}, symbol: {coin["symbol"]}
                </li>
            );
        }

        // setTimeoutで待たないとsetStateとrenderが同時に走るため、2回目のrenderが走らない。
        setTimeout(() => {
            // stateが更新されたら、render()が自動的に実行される。
            this.setState({ list: list });
        }, 100);
    }

    constructor() {
        console.log("処理順1");
        super();
        // コンストラクタでrenderCoins実行。
        this.renderCoins();
        this.state = {
            list: []
        };
    }

    render() {
        console.log("処理順2");
        return <ul>{this.state.list}</ul>;
    }
}

ReactDOM.render(
    // Reactコンポーネントをレンダリング
    <ExplainRender />,
    document.getElementById("root")
);