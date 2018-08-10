import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Constants from "../constants";
import {Link} from "react-router-dom";

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
    { id: 'name', numeric: false, disablePadding: false, label: 'name' },
    { id: 'price', numeric: true, disablePadding: false, label: 'price' },
    { id: 'market_cap', numeric: true, disablePadding: false, label: 'market cap' },
    { id: 'percent_change_24h', numeric: true, disablePadding: false, label: 'percent change 24h' },
];

class CurrencyTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

CurrencyTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);

        // TODO actionsに寄せる
        this.state = {
            order: 'asc',
            orderBy: '',
            //selected: [],
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    render() {
        const { classes, list, display } = this.props;
        const { order, orderBy } = this.state;

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <CurrencyTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                        />
                        <TableBody>
                            {list
                                .sort(getSorting(order, orderBy))
                                .map(coin => {
                                    // テーブルヘッダのidと合わせてソートできるようにするため、変数を追加
                                    coin.price = display === Constants.DISPLAY_JPY ? coin.price_jpy : coin.price_usd;
                                    coin.market_cap = display === Constants.DISPLAY_JPY ? coin.market_cap_jpy : coin.market_cap_usd;
                                    return coin
                                })
                                .map(coin => {
                                    return (
                                        <TableRow hover>
                                            <TableCell><Link to={`/detail/${coin.website_slug}`}>{coin.name}</Link></TableCell>
                                            <TableCell numeric>{coin.price}</TableCell>
                                            <TableCell numeric>{coin.market_cap}</TableCell>
                                            <TableCell numeric>{coin.percent_change_24h}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CurrencyTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencyTable);