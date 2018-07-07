import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import JsonTest from './display_json_test.js';
import ChangeStateOnlyReact from './change_state_only_react.js';

// Appコンポーネント作成
class App extends React.Component {

    renderCoins() {
        // coinmarketcapから上位10位の銘柄取得api
        let endpoint = "https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=rank"
        // fetchでリクエストを投げる。非同期処理でPromiseのオブジェクトが返却される。
        let dict = {};
        fetch(endpoint).then((response) => {
            let json = response.json();
            json.then((value) => {
                let data = value.data;
                for (let key in data) {
                    let coin = data[key];
                    let quotes_usd = coin['quotes']['USD'];
                    // レスポンスを連想配列に詰める。
                    dict[coin.rank] = <li>{coin['rank']} : {coin['name']}, [price_usd: {quotes_usd['price']}], [market_cap_usd: {quotes_usd['market_cap']}], [percent_change_24h: {quotes_usd['percent_change_24h']}]</li>
                }
            })
        }, (error) => {
            console.error(error);
        }).then(() => {
            // setTimeoutで非同期処理の結果(dict)が帰ってくるのを待つ。
            setTimeout(() => {
                let list = [];
                // rank順に並び替え
                for(let rank in dict) {
                    list.push(dict[rank]);
                }
                // stateが更新されたら、render()が自動的に実行される。
                this.setState({ list: list });
            }, 100)
        })
    };

    constructor() {
        super();
        // Promiseは結果をそのまま返せないので、stateを用意して結果を格納しておく
        this.renderCoins();
        this.state = {
            list: []
        }
    }

    render() {
        return <ul>{this.state.list}</ul>
    }
}

ReactDOM.render(
    // Appコンポーネントをレンダリング
    <div>
        {/* <App /> */}
        {/* <JsonTest /> */}
        <ChangeStateOnlyReact />
    </div>,
    document.getElementById('root')
)