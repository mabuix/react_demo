import React from 'react';
import { Link } from "react-router-dom";
import TitleAppBar from './title_app_bar';

// コンポーネント作成
class Detail extends React.Component {

    render() {
        return (
            <div>
                <TitleAppBar title='Cryptocurrency Chart'/>
                <p><Link to="/">back</Link></p>
                <div>
                    <div id="plot"></div>
                </div>
                {this.props.plot(this.props.match.params.id)}
            </div>
        )
    }
}

export default Detail