import React from 'react';
import { Link } from "react-router-dom";

// コンポーネント作成
class Detail extends React.Component {

    render() {
        return (
            <div>
                <p><Link to="/">back</Link></p>
                <div>
                    <h2>選択したコイン情報</h2>
                    <div id="plot"></div>
                </div>
                {this.props.plot(this.props.match.params.id)}
            </div>
        )
    }
}

export default Detail