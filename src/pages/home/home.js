import React from 'react';
import './home.css';

import Menu from '../components/menu/menu';
import Slide from '../components/slide/slide';
import Footer from '../components/footer/footer';
import Articles from '../components/articles/articles';
import Card from '../components/card/card';

import Spin from '../components/spin/spin';

import axios from 'axios';

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
        axios.get(`${window._env_.api}/news?limit=6`,{headers}).then(res => {
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0939472287455!2d-38.796724885632834!3d-11.031577926847643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x712250f49c33bf3%3A0xf6195d057993d8d!2sR.%20Domingos%20Carlos%20dos%20R%C3%A9is%2C%20255-71%2C%20Tucano%20-%20BA%2C%2048790-000!5e0!3m2!1spt-BR!2sbr!4v1614972225405!5m2!1spt-BR!2sbr"
            allowfullscreen="" loading="lazy"></iframe>
        );
    }
}

export default Home;