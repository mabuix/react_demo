import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import JsonTest from './display_json_test.js';
// import ChangeStateOnlyReact from './change_state_only_react.js';

// container
import ReduxTest from './containers/redux_test.js';

import reducer from './reducers/reducer'

const store = createStore(reducer);

ReactDOM.render(
    // Appコンポーネントをレンダリング
    <Provider store={store}>
        {/* <JsonTest /> */}
        {/* <ChangeStateOnlyReact /> */}
        <ReduxTest />
    </Provider>,
    document.getElementById('root')
)

// ブログ用にやった事メモ
// redux, react-redux導入
// container, component, reducer, actionの作成
// ヘッダーをapiのレスポンスを格納したリストに混ぜるのをやめて、独立したコンポーネントに変更。
// ビジネスロジックを移動。JSXを作成するものはcomponentsに、それ以外はactionに。
// containerでbindActionCreatorsを使用してactionsにあるビジネスロジックをまとめてpropsから取得できるようにした。
// setState()の廃止。全てpropsから取得できるようにした。
// 非同期処理するためにredux-trunk導入