import ActionType from "../actions/action_type";
import Constants from '../constants';

const initialState = {
    display: Constants.DISPLAY_JPY,
    list: [],
    order: 'asc',
    orderBy: '',
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.SET_COINS: {
            return {
                ...state,
                list: action.list,
            }
        }
        case ActionType.SORT_CONDITION: {
            return {
                ...state,
                order: action.order,
                orderBy: action.orderBy,
            }
        }
        case ActionType.CHANGE_DISPLAY: {
            return {
                ...state,
                display: action.display,
            }
        }
        default: // フォールバック処理
            return state
    }
}

export default reducer;