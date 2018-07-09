import fetch from 'isomorphic-fetch';
import React from 'react';
import './index.css';

// TODO 表示金額をUSD、JPY、BTCに変換するボタン(余裕あれば)。

// コンポーネント作成
class ChangeStateOnlyReact extends React.Component {

    convertJsx(list) {
        // JSXに変換
        return list.map((coin) =>
            <li>{coin.rank}：{coin.name}, [price_usd: {coin.price_usd}], [market_cap_usd: {coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
        )
    }

    sortName() {
        this.sortCondition(this.state.list, 'name');
    };

    sortPrice() {
        this.sortCondition(this.state.list, 'price');
    };

    sortMarketCap() {
        this.sortCondition(this.state.list, 'market_cap');
    };

    sortPercentChange24h() {
        this.sortCondition(this.state.list, 'percent_change_24h');
    };

    sortCondition(list, condition) {
        // ソート
        list.sort((a, b) => {
            return a[condition] < b[condition] ? -1 : 1;
        });
        let jsxList = this.convertJsx(list);
        // ヘッダーの再利用
        jsxList.unshift(this.state.jsxList[0])
        this.setState({ jsxList: jsxList });
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
                let jsxList = this.convertJsx(list);
                const name = <button onClick={() => this.sortName()}>name</button>
                const price = <button onClick={() => this.sortPrice()}>price</button>
                const marketCap = <button onClick={() => this.sortMarketCap()}>market_cap</button>
                const percentChange24h = <button onClick={() => this.sortPercentChange24h()}>percent_change_24h</button>
                // ヘッダーを追加
                jsxList.unshift(<li>#：{name}, {price}, {marketCap}, {percentChange24h}</li>)
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