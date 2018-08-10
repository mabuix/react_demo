import fetch from 'isomorphic-fetch';
import ActionType from './action_type';
import Constants from '../constants';

function returnCoins(list) {
    return {
        type: ActionType.SET_COINS,
        list: list,
    }
}

function sortCondition(list, condition) {
    // 同じオブジェクトをreducerに渡してもstateが更新されず、レンダリングが走らないので、参照渡しで更新用のオブジェクト生成
    const newList = list.slice();
    // ソート
    newList.sort((a, b) => {
        return a[condition] < b[condition] ? -1 : 1;
    });
    return {
        type: ActionType.SORT_CONDITION,
        list: newList,
    }
}

const Actions = {

    sortName() {
        const list = this.list;
        // redux-thunkを使用しているので、関数を返却しないとエラーになる
        return function (dispatch) {
            dispatch(sortCondition(list, 'name'));
        }
    },

    sortPrice() {
        const list = this.list;
        return function (dispatch) {
            dispatch(sortCondition(list, 'price'));
        }
    },

    sortMarketCap() {
        const list = this.list;
        return function (dispatch) {
            dispatch(sortCondition(list, 'market_cap'));
        }
    },

    sortPercentChange24h() {
        const list = this.list;
        return function (dispatch) {
            dispatch(sortCondition(list, 'percent_change_24h'));
        }
    },

    changeDisplay(display) {
        // stateのdisplayをUSD ⇔ JPYに変換して、ヘッダー、金額の表示も更新
        const changedDisplay = display === Constants.DISPLAY_JPY ? Constants.DISPLAY_USD : Constants.DISPLAY_JPY
        return {
            type: ActionType.CHANGE_DISPLAY,
            display: changedDisplay,
        }
    },

    setCoins() {
        // redux-thunkを使う場合、非同期通信処理は関数として返す必要がある。
        // storeのdispatchを引数として取得できるので、それを使って返り値をreducerに渡す。
        return function (dispatch) {
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
                            website_slug: coin['website_slug'],
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
                    dispatch(returnCoins(list));
                }, 100)
            })
        }
    },
}

export default Actions