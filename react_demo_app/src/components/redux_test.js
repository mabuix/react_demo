import React from 'react';
import Constants from '../constants';

// コンポーネント作成
class ReduxTest extends React.Component {

    // TODO
    // renderCoinsをactionに移行する。
    // ヘッダーをstate.jsxListから分離させて、各ボタンをコンポーネントにする。

    convertJsx() {
        console.log(this);
        // const display = this.props.checkDisplay(this.props.display);
        const display = this.props.display;
        // JSXに変換
        return this.props.list.map((coin) =>
            <li>{coin.rank}：{coin.name}, [price: {display === Constants.DISPLAY_JPY ? coin.price_jpy : coin.price_usd}], [market_cap: {display === Constants.DISPLAY_JPY ? coin.market_cap_jpy : coin.market_cap_usd}], [percent_change_24h: {coin.percent_change_24h}]</li>
        )
    }

    createHeader() {
        // TODO displayをpropsから取得できるようにする。
        // TODO それぞれのメソッドをmapDispatchToPropsに入れて呼び出せるようにする。
        const name = <button onClick={() => this.props.sortName()}>name</button>
        const price = <button onClick={() => this.props.sortPrice()}>price</button>
        const marketCap = <button onClick={() => this.props.sortMarketCap()}>market_cap</button>
        const percentChange24h = <button onClick={() => this.props.sortPercentChange24h()}>percent_change_24h</button>
        //const display_btn = <button onClick={() => this.props.changeDisplay()}>{this.props.checkDisplay(this.props.display)}</button>
        const display_btn = <button onClick={() => this.props.changeDisplay()}>{this.props.display}</button>
        return <li>#：{name}, {price}, {marketCap}, {percentChange24h}, {display_btn}</li>
    }

    constructor(props) {
        super(props);
        console.log(this);
        // TODO Actions must be plain objects. Use custom middleware for async actions.
        this.props.setCoins();
    }

    render() {
        // TODO jsxList廃止。state.listを使ってごにょごにょやる。
        let list = this.props.list;
        console.log(list);
        // ボタン機能付きのヘッダー配置

        return (
            <ul>
                {this.createHeader()}
                <li>{this.convertJsx(list)}</li>
            </ul>,
            {/* <ul>{this.props.jsxList}</ul> */}
        )
    }
}

export default ReduxTest