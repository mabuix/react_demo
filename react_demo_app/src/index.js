import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { BrowserRouter as Router, Route } from 'react-router-dom'

// import JsonTest from './display_json_test.js';
// import ChangeStateOnlyReact from './change_state_only_react.js';

// container
import ReduxTest from './containers/redux_test.js';
import Detail from './containers/detail.js';

// reducer
import reducer from './reducers/reducer';

const store = createStore(
    reducer,
    applyMiddleware(thunk),
);

ReactDOM.render(
    // Appコンポーネントをレンダリング
    <Provider store={store}>
        {/* <JsonTest /> */}
        {/* <ChangeStateOnlyReact /> */}
        {/* <ReduxTest /> */}

        <Router>
            <Fragment>
                <Route exact path="/" component={ReduxTest} />
                <Route path="/detail/:id" component={Detail} />
            </Fragment>
        </Router>
    </Provider>,
    document.getElementById('root')
)