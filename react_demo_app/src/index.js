import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Appコンポーネント作成
class App extends React.Component {

    renderCoins() {
        // coinmarketcapから上位10位の銘柄取得api
        let endpoint = "https://api.coinmarketcap.com/v1/ticker/?limit=10"
        var list = [];
        fetch(endpoint).then((response) => {
            let json = response.json();
            json.then((value) => {
                value.map((res) => {
                    list.push(<li>{res}</li>);
                }, (error) => {
                    console.error(error);
                })
            })/*.then(() => {
                return new Promise(((resolve, reject) => {
                    console.log(list);
                    resolve(list);
                }))
            })*/
        }, (error) => {
            console.error(error);
        }).then(() => {
            console.log(list);
            this.setState({ list: list });    
        })
    }

    render() {
        // Promiseは結果をそのまま返せないので、結果をstateに格納しておく
        this.renderCoins();
        console.log(this);
        return (
            <div>
                <ul>{this.state.list}</ul>
            </div>
        )
    }
}

ReactDOM.render(
    // Appコンポーネントをレンダリング
    <App />,
    document.getElementById('root')
)