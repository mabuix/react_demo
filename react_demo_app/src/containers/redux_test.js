import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import ReduxTest from './../components/redux_test.js'
import ReduxTestActions from './../actions/redux_test.js'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    //console.log('mapDispatchToProps');
    //console.log(ReduxTestActions);
    //console.log(dispatch);
    return {
        //setCoins() {
        //    dispatch(ReduxTestActions.setCoins());
        //},
        ...bindActionCreators(ReduxTestActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)