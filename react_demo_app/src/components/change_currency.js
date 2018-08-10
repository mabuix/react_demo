import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Constants from "../constants";


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class ChangeCurrency extends React.Component {

    render() {
        const { classes, display, changeDisplay } = this.props;

        return (
            <div className={classes.root}>
                <Button variant="outlined" className={classes.button} onClick={() => changeDisplay(display)}>
                    {display === Constants.DISPLAY_JPY ? Constants.DISPLAY_JPY : Constants.DISPLAY_USD}
                </Button>
            </div>
        );
    }
}

ChangeCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
    display: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChangeCurrency);