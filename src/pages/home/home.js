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
                <Articles titulo={"Ultimas Notícias"} component={ulNotices} />
                <Articles titulo={"Nossa Localização"} component={this.getComponentLocalizacao()} />
                <Footer/>
            </div>
        );
    }

    getComponentLocalizacao(){
        return(
            <iframe src="https://maps.google.com/maps?q=Av.%20Pres.%20Kenedy,%20417,%20Tucano%20-%20BA,%2048790-000&t=&z=17&ie=UTF8&iwloc=&output=embed"
            allowfullscreen="" loading="lazy"></iframe>
        );
    }
}

export default Home;