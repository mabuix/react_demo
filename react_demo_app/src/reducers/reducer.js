const DISPLAY_JPY = "JPY";

const initialState = {
    display: DISPLAY_JPY,
    list: []
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_COINS': {

            return {
                list: state.list,
                jsxList: state.jsxList,
            }
        }
    }
}

export default reducer;