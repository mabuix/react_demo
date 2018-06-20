import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import JsonTest from './display_json_test.js';

// Appコンポーネント作成
class App extends React.Component {

    renderCoins() {
        // coinmarketcapから上位10位の銘柄取得api
        let endpoint = "https://api.coinmarketcap.com/v1/ticker/?limit=10"
        var list = [];
        // fetchでリクエストを投げる。非同期処理でPromiseのオブジェクトが返却される。
        fetch(endpoint).then((response) => {
            let json = response.json();
            json.then((value) => {
                value.map((res) => {
                    // レスポンスを配列に詰める。
                    list.push(
                        <li>
                            {res['rank']} : {res['name']}, [price_usd: {res['price_usd']}], [market_cap_usd: {res['market_cap_usd']}], [percent_change_24h: {res['percent_change_24h']}]
                        </li>

                    );
                }, (error) => {
                    console.error(error);
                })
            })
        }, (error) => {
            console.error(error);
        }).then(() => {
            // setTimeoutで非同期処理の結果(list)が帰ってくるのを待つ。
            setTimeout(() => {
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
        <App />
        {/* <JsonTest /> */}
    </div>,
    document.getElementById('root')
)