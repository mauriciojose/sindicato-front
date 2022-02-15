import React, { Fragment } from 'react';
import './noticia.css';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

import api from '../../services/api';

import Spin from '../components/spin/spin';

import { formatDateWithNameMes } from "../../services/formatDate";

import MetaTags from 'react-meta-tags';

class Noticia extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            progressNews: true,
            id: this.props.match.params.id || null
        }

        this.authUser();
    }

    async authUser() {
        const headers = {
            'Content-Type': 'text/json'
        };
        let news = await api.get(`/news/${this.state.id}`,{headers});
        console.log(news);
        this.setState({ news: news.data ? news.data : [], progressNews: false });
     }

    componentDidMount() {
        
        
        
    }

    render(){
        let img = this.state.progressNews ? '' : `${window._env_.storage}/news/${this.state.news.path}/${this.state.news.file}`;
        
        var divStyle = {
            backgroundImage: this.state.progressNews ? '' : `url("${img}")`,
            backgroundRepeat: 'no-repeat',
            width: '100%', 
            margin: 'auto',
            height: '100%',
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "#000000",
            paddingTop: "180px",
            paddingBottom: "180px"
          };
        return(
            this.state.progressNews ? null : <Fragment>

            <MetaTags>
                <title>{this.state.news.name}</title>

                <meta property="og:title" content={this.state.news.name}/>
                <meta property="og:description" content={this.state.news.name} />
                <meta
                name="description"
                content={this.state.news.name}
                />
                <meta property="og:site_name" content="Sindsmut"/>
                <meta property="og:url" content={window.location.href+"/"}/>
                <meta property="og:image" content={`${window._env_.storage}/news/${this.state.news.path}/${this.state.news.file}`}></meta>
                <meta property="og:type" content="website" />

            </MetaTags>

                <Menu/>
            <div className="page">
                <div className="conteudo-page">
                    <section className="itens-noticias">
                        <h1 className="titulo-principal">
                            {this.state.news.name}
                        </h1>
                        <p className="date">{formatDateWithNameMes(this.state.news.createdAt)}</p>
                        <br />
                        <section className="header-site" style={divStyle}></section>
                        <div style={{marginTop:"5%", marginBottom:"2%"}} dangerouslySetInnerHTML={{ __html: this.state.news.description }}></div>

                        <p className="conteudo1 fonte">Fonte – Sindsmut</p>
                    </section>
                    {/* <div className="tag conteudo1">
                        <p>tag:
                            <a href="">professores</a>,<a href="">sindicato</a>
                        </p>
                        <br/>
                    </div> */}
                </div>
            </div>
            <Footer/>
            </Fragment>
        );
    }
}

export default Noticia;