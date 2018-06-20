import fetch from 'isomorphic-fetch';
import React from 'react';

const COINS_JSON = [
    {
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "rank": "1",
        "price_usd": "6657.78",
        "price_btc": "1.0",
        "24h_volume_usd": "4188580000.0",
        "market_cap_usd": "113875334898",
        "available_supply": "17104100.0",
        "total_supply": "17104100.0",
        "max_supply": "21000000.0",
        "percent_change_1h": "0.21",
        "percent_change_24h": "-1.06",
        "percent_change_7d": "1.66",
        "last_updated": "1529481276"
    },
    {
        "id": "ethereum",
        "name": "Ethereum",
        "symbol": "ETH",
        "rank": "2",
        "price_usd": "525.359",
        "price_btc": "0.0793648",
        "24h_volume_usd": "1839380000.0",
        "market_cap_usd": "52634555508.0",
        "available_supply": "100187787.0",
        "total_supply": "100187787.0",
        "max_supply": null,
        "percent_change_1h": "0.19",
        "percent_change_24h": "1.03",
        "percent_change_7d": "7.46",
        "last_updated": "1529481262"
    },
    {
        "id": "ripple",
        "name": "Ripple",
        "symbol": "XRP",
        "rank": "3",
        "price_usd": "0.533029",
        "price_btc": "0.00008043",
        "24h_volume_usd": "295972000.0",
        "market_cap_usd": "20918885507.0",
        "available_supply": "39245304677.0",
        "total_supply": "99991944394.0",
        "max_supply": "100000000000",
        "percent_change_1h": "0.37",
        "percent_change_24h": "-1.01",
        "percent_change_7d": "-3.18",
        "last_updated": "1529481542"
    },
    {
        "id": "bitcoin-cash",
        "name": "Bitcoin Cash",
        "symbol": "BCH",
        "rank": "4",
        "price_usd": "875.395",
        "price_btc": "0.132244",
        "24h_volume_usd": "439221000.0",
        "market_cap_usd": "15050917911.0",
        "available_supply": "17193288.0",
        "total_supply": "17193288.0",
        "max_supply": "21000000.0",
        "percent_change_1h": "0.06",
        "percent_change_24h": "-0.7",
        "percent_change_7d": "1.64",
        "last_updated": "1529481263"
    },
    {
        "id": "eos",
        "name": "EOS",
        "symbol": "EOS",
        "rank": "5",
        "price_usd": "10.4237",
        "price_btc": "0.00157468",
        "24h_volume_usd": "935914000.0",
        "market_cap_usd": "9341193461.0",
        "available_supply": "896149492.0",
        "total_supply": "900000000.0",
        "max_supply": "1000000000.0",
        "percent_change_1h": "1.16",
        "percent_change_24h": "-1.07",
        "percent_change_7d": "3.56",
        "last_updated": "1529481261"
    },
    {
        "id": "litecoin",
        "name": "Litecoin",
        "symbol": "LTC",
        "rank": "6",
        "price_usd": "96.349",
        "price_btc": "0.0145378",
        "24h_volume_usd": "292539000.0",
        "market_cap_usd": "5497426098.0",
        "available_supply": "57057428.0",
        "total_supply": "57057428.0",
        "max_supply": "84000000.0",
        "percent_change_1h": "-0.36",
        "percent_change_24h": "-1.69",
        "percent_change_7d": "-2.04",
        "last_updated": "1529481541"
    },
    {
        "id": "stellar",
        "name": "Stellar",
        "symbol": "XLM",
        "rank": "7",
        "price_usd": "0.229865",
        "price_btc": "0.00003468",
        "24h_volume_usd": "38692800.0",
        "market_cap_usd": "4277546072.0",
        "available_supply": "18608949046.0",
        "total_supply": "104045664101",
        "max_supply": null,
        "percent_change_1h": "0.05",
        "percent_change_24h": "-1.92",
        "percent_change_7d": "0.58",
        "last_updated": "1529481545"
    },
    {
        "id": "cardano",
        "name": "Cardano",
        "symbol": "ADA",
        "rank": "8",
        "price_usd": "0.160787",
        "price_btc": "0.00002429",
        "24h_volume_usd": "95779800.0",
        "market_cap_usd": "4168735891.0",
        "available_supply": "25927070538.0",
        "total_supply": "31112483745.0",
        "max_supply": "45000000000.0",
        "percent_change_1h": "1.45",
        "percent_change_24h": "-1.26",
        "percent_change_7d": "-0.29",
        "last_updated": "1529481267"
    },
    {
        "id": "iota",
        "name": "IOTA",
        "symbol": "MIOTA",
        "rank": "9",
        "price_usd": "1.13784",
        "price_btc": "0.00017189",
        "24h_volume_usd": "76359100.0",
        "market_cap_usd": "3162660737.0",
        "available_supply": "2779530283.0",
        "total_supply": "2779530283.0",
        "max_supply": "2779530283.0",
        "percent_change_1h": "-0.22",
        "percent_change_24h": "-2.94",
        "percent_change_7d": "-8.79",
        "last_updated": "1529481260"
    },
    {
        "id": "tron",
        "name": "TRON",
        "symbol": "TRX",
        "rank": "10",
        "price_usd": "0.0480027",
        "price_btc": "0.00000725",
        "24h_volume_usd": "485337000.0",
        "market_cap_usd": "3156086879.0",
        "available_supply": "65748111645.0",
        "total_supply": "100000000000",
        "max_supply": null,
        "percent_change_1h": "3.79",
        "percent_change_24h": "6.1",
        "percent_change_7d": "12.98",
        "last_updated": "1529481266"
    }
];

// Appコンポーネント作成
class JsonTest extends React.Component {

    renderCoins() {
        return COINS_JSON
    };

    render() {
        const coins = this.renderCoins();
        for (let key in coins) {
            console.log(coins[key]);
        }

       return <div></div>
    }
}

export default JsonTest