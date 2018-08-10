import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function TitleAppBar(props) {
    const { classes, title } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TitleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleAppBar);