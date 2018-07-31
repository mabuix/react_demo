import React from 'react';
import { Link } from "react-router-dom";

// コンポーネント作成
class Detail extends React.Component {

    render() {
        return (
            <div>
                <h1>TODO コインの詳細ページ作成</h1>
                <p><Link to="/">back</Link></p>
            </div>
        )
    }
}

export default Detail