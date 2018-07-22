import React from 'react';
import Constants from '../constants';

// コンポーネント作成
class ReduxTest extends React.Component {

    convertJsx() {
        const display = this.props.display;
        if (typeof this.props.list !== 'undefined') {
            // JSXに変換
            return this.props.list.map((coin) =>
                <li>{coin.rank}：{coin.name}, [price: {display === Constants.DISPLAY_JPY ? coin.price_jpy : coin.price_usd}], [market_cap: {display === Constants.DISPLAY_JPY ? coin.market_cap_jpy : coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
            )
        }
    }

    createHeader() {
        const name = <button onClick={() => this.props.sortName()}>name</button>
        const price = <button onClick={() => this.props.sortPrice()}>price</button>
        const marketCap = <button onClick={() => this.props.sortMarketCap()}>market_cap</button>
        const percentChange24h = <button onClick={() => this.props.sortPercentChange24h()}>percent_change_24h</button>
        const display_btn = <button onClick={() => this.props.changeDisplay()}>{this.props.display}</button>
        return <li>#：{name}, {price}, {marketCap}, {percentChange24h}, {display_btn}</li>
    }

    constructor(props) {
        super(props);
        props.setCoins();
    }

    render() {
        return (
            <ul>
                {this.createHeader()}
                {this.convertJsx()}
            </ul>
        )
    }
}

export default ReduxTest