import fetch from 'isomorphic-fetch';
import ActionType from './action_type';
import Constants from '../constants';

// const DISPLAY_JPY = "JPY";
// const DISPLAY_USD = "USD";

const Actions = {

    // TODO
    // dispatchここで使うの？
    // dispatchはコンテナのmapDispatchToPropsでやる。
    // dispatchでstateを更新する。
    // なのでactionsでのreturnは要素まで。

    /*
    checkDisplay(display) {
        return typeof display === 'undefined' ? this.state.display : display;
    },
    */

    /*
    convertJsx(list, display) {
        display = this.checkDisplay(display);
        // TODO JSXはactionsで使えないので、componentsに移行する。
        // state.jsxListは廃止、state.listのみ返すようにする。

        // JSXに変換
        return list.map((coin) =>
            <li>{coin.rank}：{coin.name}, [price: {display === DISPLAY_JPY ? coin.price_jpy : coin.price_usd}], [market_cap: {display === DISPLAY_JPY ? coin.market_cap_jpy : coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
        )
    },
    */

    sortName() {
        this.sortCondition(this.state.list, 'name');
    },

    sortPrice() {
        this.sortCondition(this.state.list, 'price');
    },

    sortMarketCap() {
        this.sortCondition(this.state.list, 'market_cap');
    },

    sortPercentChange24h() {
        this.sortCondition(this.state.list, 'percent_change_24h');
    },

    sortCondition(list, condition) {
        // ソート
        list.sort((a, b) => {
            return a[condition] < b[condition] ? -1 : 1;
        });
        //let jsxList = this.convertJsx(list);
        //jsxList.unshift(this.createHeader())
        //this.setState({ jsxList: jsxList });

        // TODO setState禁止
        return {
            type: ActionType.SORT_CONDITION,
            list: list,
        }
    },

    changeDisplay() {
        // stateのdisplayをUSD ⇔ JPYに変換して、ヘッダー、金額の表示も更新
        const display = this.state.display === Constants.DISPLAY_JPY ? Constants.DISPLAY_USD : Constants.DISPLAY_JPY
        //const jsxList = this.convertJsx(this.state.list, display);
        //jsxList.unshift(this.createHeader(display))
        //this.setState({
        //    display: display,
        //    jsxList: jsxList
        //});

        // TODO setState禁止
        return {
            type: ActionType.CHANGE_DISPLAY,
            display: display,
        }
    },

    /*
    createHeader(display) {
        const name = <button onClick={() => this.sortName()}>name</button>
        const price = <button onClick={() => this.sortPrice()}>price</button>
        const marketCap = <button onClick={() => this.sortMarketCap()}>market_cap</button>
        const percentChange24h = <button onClick={() => this.sortPercentChange24h()}>percent_change_24h</button>
        const display_btn = <button onClick={() => this.changeDisplay()}>{this.checkDisplay(display)}</button>
        return <li>#：{name}, {price}, {marketCap}, {percentChange24h}, {display_btn}</li>
    },
    */

    setCoins() {
        // coinmarketcapから上位10位の銘柄取得api
        let endpoint = "https://api.coinmarketcap.com/v2/ticker/?convert=JPY&limit=10&sort=rank"
        // fetchでリクエストを投げる。非同期処理でPromiseのオブジェクトが返却される。
        let dict = {};
        fetch(endpoint).then((response) => {
            let json = response.json();
            json.then((value) => {
                let data = value.data;
                for (let key in data) {
                    let coin = data[key];
                    let quotes_jpy = coin['quotes']['JPY'];
                    let quotes_usd = coin['quotes']['USD'];
                    // レスポンスを連想配列に詰める。
                    dict[coin.rank] = {
                        rank: coin['rank'],
                        name: coin['name'],
                        price_jpy: quotes_jpy['price'],
                        market_cap_jpy: quotes_jpy['market_cap'],
                        price_usd: quotes_usd['price'],
                        market_cap_usd: quotes_usd['market_cap'],
                        percent_change_24h: quotes_usd['percent_change_24h'],
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
                //let jsxList = this.convertJsx(list);
                // ヘッダーを追加
                //jsxList.unshift(this.createHeader());
                /*
                // stateが更新されたら、render()が自動的に実行される。
                this.setState({
                    list: list,
                    jsxList: jsxList
                });
                */
                return {
                    type: ActionType.SET_COINS,
                    list: list,
                    //jsxList: jsxList
                }
            }, 100)
        })
    }
}

export default Actions