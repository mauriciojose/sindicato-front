import React from 'react';
import './home.css';

import Menu from '../components/menu/menu';
import Slide from '../components/slide/slide';
import Footer from '../components/footer/footer';
import Articles from '../components/articles/articles';
import Card from '../components/card/card';

import Spin from '../components/spin/spin';

import api from '../../services/api';

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            progressNews: true
        };
        this.getNews();
    }

    async getNews(){
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get(`/news?limit=6`,{headers}).then(res => {
            this.setState({ news: res.data ? res.data : [], progressNews: false });

        }).catch((error) => {
            // this.container.current.alertDanger();    
        });
    }

    render(){
        let ulNotices = this.state.progressNews ? <Spin type='container'/> : <Card itens={this.state.news} />;

        return(
            <div>
                <Menu/>
                <Slide/>
                <Articles titulo={"Ú\ltimas Notícias"} component={ulNotices} />
                <Articles style={{display: "flex"}} titulo={"YouTube do Sindsmut"} component={this.getComponentVideo()} />
                <Footer/>
            </div>
        );
    }

    getComponentVideo(){
        return(
            <div className="youtube-container">
                <iframe width="75%" height="350vh" src="https://www.youtube.com/embed/ERrcNyQtNng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }
}

export default Home;