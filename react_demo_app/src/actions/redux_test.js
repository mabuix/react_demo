import fetch from 'isomorphic-fetch';
import ActionType from './action_type';
import Constants from '../constants';

function returnCoins(list) {
    return {
        type: ActionType.SET_COINS,
        list: list,
    }
}

const Actions = {

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

    handleRequestSort (event, property, order, orderBy) {
        const changedOrderBy = property;
        let changedOrder = 'desc';

        if (orderBy === property && order === 'desc') {
            changedOrder = 'asc';
        }

        return {
            type: ActionType.SORT_CONDITION,
            order: changedOrder,
            orderBy: changedOrderBy,
        }
    },
}

export default Actions