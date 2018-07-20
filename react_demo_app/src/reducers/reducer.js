import ActionType from "../actions/action_type";
import Constants from '../constants';

const initialState = {
    display: Constants.DISPLAY_JPY,
    list: []
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case ActionType.SET_COINS: {
            return {
                list: state.list,
                jsxList: state.jsxList,
            }
        }
        case ActionType.SORT_CONDITION: {
            return {
                list: state.list,
            }
        }
        case ActionType.CHANGE_DISPLAY: {
            return {
                display: state.display,
            }
        }
    }
}

export default reducer;