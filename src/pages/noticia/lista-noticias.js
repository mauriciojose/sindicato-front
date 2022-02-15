import React, { Fragment } from 'react';
import './lista-noticias.css';
import '../css/bootstrap.css';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

import api from '../../services/api';

import Spin from '../components/spin/spin';

import ContainerPages from '../components/containerPages/containerPages';

import { formatDateWithNameMes } from "../../services/formatDate";


class ListaNoticias extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            progressNews: true,
            limit: 6,
            quantidadeNoticias: 6, 
            page: 0,
            pages: 0
        }
    }

    componentDidMount() {
        this.getNews();
    }

    getNews(){
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get(`/news?limit=${this.state.limit}&offset=${this.state.page}`,{headers}).then(res => {
            this.setState({pages: Math.ceil(res.headers['x-total-count'] / this.state.offset ), quantidadeNoticias: res.headers['x-total-count'],news: res.data ? res.data : [], progressNews: false });

        }).catch((error) => {
            this.setState({ news: [], progressNews: false });
        });
    }

    render(){

        let img = this.state.progressNews ? '' : `${window._env_.storage}/news/${this.state.news.path}/${this.state.news.file}`;

        return(
            this.state.progressNews ? <Spin type='container'/> : <ContainerPages innerMain={this.renderMain()} img="noticias.png" titulo="Notícias" />
        );
    }

    renderNotice( key, value, img){
        return <div class="col-lg-6 col-sm-6 col-xs-12">
            <div class="news-post-widget" onClick={()=>{window.location=`/noticia/${value._id}`}}>
            <img loading="lazy" class="img-responsive" src={img} alt=""/>
            <div class="news-post-detail">
                <span class="date">{formatDateWithNameMes(value.createdAt)}</span>
                <h2><a>{value.name.length > 53 ? value.name.substring(0, 53) +'...' : value.name}</a></h2>
                <p dangerouslySetInnerHTML={{ __html: value.description }}></p>
            </div>
            </div>
        </div>
    }

    renderNoticeRow( array ){
        return (
            <div class="row">
                {array}                        
            </div>
        );
    }

    renderMain(){
        let arrayItens = [];
        return(
            <Fragment>
                
                <section id="contant" class="contant">
                    <div class="container">
                        <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="news-post-holder">

                            { this.state.news.map( (value, key) => {
                                
                                let img = this.state.progressNews ? '' : `${window._env_.storage}/news/${value.path}/${value.file}`;
                                arrayItens.push( this.renderNotice( key, value, img ) )

                                return arrayItens.length == 2 ? <div class="row">
                                    {this.renderNoticeRow(arrayItens)}
                                </div> : <></>
                            })}

                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            
                <div className="container">
                    <ul className="botoes">
                        <li id="anteriores" onClick={this.nextPage()}><a> &#10096; Noticias Anteriores</a></li>
                        <li id="proximas" onClick={this.nextPage()}><a>Proximas Noticias &#10097;</a></li>
                    </ul>
                </div>
            </Fragment>
        );
    }

    previewPage(){
        if ( this.state.page < this.state.page ) {
            let newPage = this.state.page - 1;
            this.setState({page: newPage});
            this.getNews();
        }
    }
    nextPage(){
        if (this.state.page > 0) {
            let newPage = this.state.page + 1;
            this.setState({page: newPage});
            this.getNews();
        }
    }
}

export default ListaNoticias;