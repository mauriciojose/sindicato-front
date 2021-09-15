import React, { Fragment } from 'react';
import './noticia.css';
import Menu from '../components/menu/menu';
import Footer from '../components/footer/footer';

import api from '../../services/api';

import Spin from '../components/spin/spin';

import { formatDateWithNameMes } from "../../services/formatDate";

class Noticia extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            progressNews: true,
            id: this.props.match.params.id || null
        }
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get(`/news/${this.state.id}`,{headers}).then(res => {
            this.setState({ news: res.data ? res.data : null, progressNews: false });

        }).catch((error) => {
            this.setState({ news: [], progressNews: false });
            this.container.current.alertDanger();    
        });
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
            this.state.progressNews ? <Spin type='container'/> : <Fragment>
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