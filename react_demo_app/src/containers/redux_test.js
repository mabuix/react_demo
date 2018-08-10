import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import ReduxTest from '../components/redux_test.js'
import ReduxTestActions from './../actions/redux_test.js'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // ActionCreatorの関数をdispatchせずに実行できる
        ...bindActionCreators(ReduxTestActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)