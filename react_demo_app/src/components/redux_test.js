import React, {Fragment} from 'react';
import Constants from '../constants';
import { Link } from "react-router-dom";
import ChangeCurrency from './change_currency.js';
import CurrencyTable from './currency_table';


// コンポーネント作成
class ReduxTest extends React.Component {

    convertJsx() {
        const display = this.props.display;
        if (typeof this.props.list !== 'undefined') {
            // JSXに変換
            return this.props.list.map((coin) =>
                <li>{coin.rank}：<Link to={`/detail/${coin.website_slug}`}>{coin.name}</Link>, [price: {display === Constants.DISPLAY_JPY ? coin.price_jpy : coin.price_usd}], [market_cap: {display === Constants.DISPLAY_JPY ? coin.market_cap_jpy : coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
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
        const { list, display, changeDisplay } = this.props;
        return (
            <Fragment>
                <ChangeCurrency display={display} changeDisplay={changeDisplay} />
                <CurrencyTable list={list} display={display} />
            </Fragment>
        )
    }
}

export default ReduxTest