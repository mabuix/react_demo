import React, {Fragment} from 'react';
import ChangeCurrency from './change_currency.js';
import CurrencyTable from './currency_table';


// コンポーネント作成
class ReduxTest extends React.Component {

    constructor(props) {
        super(props);
        props.setCoins();
    }

    render() {
        const { list, display, changeDisplay, handleRequestSort, order, orderBy } = this.props;
        return (
            <Fragment>
                <ChangeCurrency display={display} changeDisplay={changeDisplay} />
                <CurrencyTable list={list}
                               display={display}
                               handleRequestSort={handleRequestSort}
                               order={order}
                               orderBy={orderBy} />
            </Fragment>
        )
    }
}

export default ReduxTest