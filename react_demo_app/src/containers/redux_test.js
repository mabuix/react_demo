import { connect } from 'react-redux'

import ReduxTest from './../components/redux_test.js'
import ReduxTestActions from './../actions/redux_test.js'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCoins() {
            dispatch(ReduxTestActions.setCoins());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)