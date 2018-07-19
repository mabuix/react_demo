import React from 'react';

// コンポーネント作成
class ReduxTest extends React.Component {

    // TODO
    // renderCoinsをactionに移行する。
    // ヘッダーをstate.jsxListから分離させて、各ボタンをコンポーネントにする。

    render() {
        return <ul>{this.props.jsxList}</ul>
    }
}

export default ReduxTest