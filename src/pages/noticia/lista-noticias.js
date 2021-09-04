import React, { Fragment } from 'react';
import './lista-noticias.css';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

import api from '../../services/api';

import Spin from '../components/spin/spin';

import ContainerPages from '../components/containerPages/containerPages';


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
            this.state.progressNews ? <Spin type='container'/> : <ContainerPages innerMain={this.renderMain()} titulo="Notícias" />
        );
    }

    renderMain(){
        return(
            <Fragment>
                <section className="itens-noticias">
                    <ul className="list_noticias">
                    { this.state.news.map( (value, key) => {
                        let img = this.state.progressNews ? '' : `${window._env_.storage}/news/${value.path}/${value.file}`;
                        var divStyle = {
                            backgroundImage: this.state.progressNews ? '' : `url("${img}")`,
                            backgroundRepeat: 'no-repeat',
                            width: '100%', 
                            margin: 'auto',
                            height: '100%',
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundAttachment: "fixed",
                            color: "#000000",
                            paddingTop: "180px",
                            paddingBottom: "180px"
                          };
                        return(
                            <li onClick={()=>{window.location=`/noticia/${value._id}`}}>
                                <a>
                                    <h1 className="titulo-noticia">
                                        {value.name}
                                    </h1>
                                    <section className="header-site" style={divStyle}></section>
                                    <p>Abril 22,2021 | Categoria: Noticia</p>
                                    <p className="conteudo-noticia" dangerouslySetInnerHTML={{ __html: value.description }}/>
                                    
                                </a>
                            </li> 
                        );
                    })}                     

                    </ul>
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