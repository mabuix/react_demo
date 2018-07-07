import fetch from 'isomorphic-fetch';
import React from 'react';
import './index.css';

// TODO 表の各項目(コイン名、値段、時価総額、出来高)でソートできるボタンつける。
// TODO 表示金額をUSD、JPY、BTCに変換するボタン(余裕あれば)。

// コンポーネント作成
class ChangeStateOnlyReact extends React.Component {

    sortName() {
        console.log("name");
        console.log(this.state.list);
        // TODO 名前でソート
        // this.state.listをソートしてjsxListを作り直す
        // jsxListの先頭行はheaderなので再利用する
        this.setState({ jsxList: [<li>dummy!</li>] });
    };

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
                    dict[coin.rank] = {
                        rank: coin['rank'],
                        name: coin['name'],
                        price_usd: quotes_usd['price'],
                        market_cap_usd: quotes_usd['market_cap'],
                        percent_change_24h: quotes_usd['percent_change_24h']
                    }
                }
            })
        }, (error) => {
            console.error(error);
        }).then(() => {
            // setTimeoutで非同期処理の結果(dict)が帰ってくるのを待つ。
            setTimeout(() => {
                let list = [];
                // rank順に並び替え
                for (let rank in dict) {
                    list.push(dict[rank]);
                }
                // JSXに変換
                let jsxList = list.map((coin) => 
                    <li>{coin.rank}：{coin.name}, [price_usd: {coin.price_usd}], [market_cap_usd: {coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
                )
                const name = <button onClick={() => this.sortName()}>name</button>
                // TODO ヘッダーを追加
                jsxList.unshift(<li>#：{name}, price, market_cap, percent_change_24h</li>)
                // stateが更新されたら、render()が自動的に実行される。
                this.setState({ 
                    list: list,
                    jsxList: jsxList 
                });
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
        return <ul>{this.state.jsxList}</ul>
    }
}

export default ChangeStateOnlyReact