import Plotly from "plotly.js-dist";

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function getData(x, open, close, high, low) {
    const trace1 = {
        x: x,
        close: close,
        decreasing: { line: { color: '#7F7F7F' } },
        high: high,
        increasing: { line: { color: '#17BECF' } },
        line: { color: 'rgba(31,119,180,1)' },
        low: low,
        open: open,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };
    return [trace1];
}

function getLayout(id, x, low, high) {
    const layout = {
        title: id,
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            domain: [0, 1],
            range: [x[0], x[x.length - 1]],
            rangeslider: { range: [x[0], x[x.length - 1]] },
            title: 'Date',
            type: 'date'
        },
        yaxis: {
            autorange: true,
            domain: [0, 1],
            range: [Math.min(...low), Math.max(...high)],
            type: 'linear'
        }
    };
    return layout;
}

const Actions = {

    plot(id) {
        return function (dispatch) {
            // 換算する通貨
            const vsCurrency = 'jpy';
            // チャート取得日数
            const days = 30;
            // coingeckoのapiから対象銘柄(id)のチャート情報取得
            const endpoint = "https://api.coingecko.com/api/v3/coins/" + id + "/market_chart?vs_currency=" + vsCurrency + "&days=" + days;
            const list = [];
            const x = [];
            const open = [];
            const close = [];
            const high = [];
            const low = [];
            fetch(endpoint).then((response) => {
                const json = response.json();
                json.then((value) => {
                    const prices = value.prices;
                    // const marketCaps = value.market_caps;
                    // const totalVolumes = value.total_volumes;
                    for (const key in prices) {
                        const price = prices[key];
                        const datetime = new Date(price[0]);
                        const ymd = datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDate()
                        list.push({'date': ymd, 'price': price[1]});
                    }
                });
            }).then(() => {
                setTimeout(() => {
                    // 日付でグルーピングして、日足情報に変換
                    const grouped = groupBy(list, price => price.date);
                    for (const entity of grouped) {
                        const list = [];
                        for (const price of entity[1]) {
                            list.push(price.price);
                        }
                        // 日付とohlcをそれぞれ取得
                        x.push(entity[0]);
                        open.push(list[0]);
                        close.push(list[list.length - 1]);
                        high.push(Math.max(...list));
                        low.push(Math.min(...list));
                    }

                    const data = getData(x, open, close, high, low);
                    const layout = getLayout(id, x, low, high);

                    // HTMLのdiv要素のグラフ生成
                    Plotly.newPlot(document.getElementById('plot'), data, layout);
                }, 100);
            });
        }
    }
}

export default Actions