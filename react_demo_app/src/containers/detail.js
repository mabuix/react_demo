import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Detail from './../components/detail.js'
import DetailActions from './../actions/detail.js'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // ActionCreatorの関数をdispatchせずに実行できる
        ...bindActionCreators(DetailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)