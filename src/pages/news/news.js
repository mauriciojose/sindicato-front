import React, { Fragment } from 'react';

import axios from 'axios';

import Container from '../components/container/container';
import Nav from '../components/navNew/navNew';
import './news.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

class News extends React.Component{
    constructor(props) {
        super(props);
        this.container = React.createRef();

        this.state = {
            news: [],
            progressNews: true
        }
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'text/json'
        };
        axios.get("/news",{headers}).then(res => {
            this.setState({ news: res.data ? res.data : [], progressNews: false });

        }).catch((error) => {
            this.container.current.alertDanger();    
        });
    }

    render(){
        let news = <Fragment></Fragment>;
        return (
            <Fragment>
                <Nav/>
                <Container ref={this.container}  title="Notícias" main={this.returnList()}/>
            </Fragment>
        );
    }

    returnList(){
        return (<div className="listSystem">
            {this.returnListHeader()}
            { this.state.news.map( (value, key) => 
                this.returnListMain(value)
            )}
        </div>);
    }

    onClickEditItem(id){
        window.location = `/news/edit/${id}`;

    }

    returnListMain(item){
        let data = new Date(item.createdAt);
        let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
        return(
            <div className="itensSystem">
                <div className="itemSystem" style={{width: '30%'}}>
                    {data.toLocaleDateString()}
                </div>
                <div className="itemSystem">
                    {item.name}
                </div>
                <div className="itemSystem acoes" style={{width: '30%'}}>
                    <div onClick={ ()=>{this.onClickEditItem(item._id)} } style={{ background: "#31708f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faEdit} /></div>
                    <div style={{ background: "#a94442" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faTrash} /></div>
                </div>
            </div>
        );
    }

    returnListHeader(){
        return(
            <div className="headerSystem">
                    <div className="thSystem" style={{width: '30%'}}>
                        Data
                    </div>
                    <div className="thSystem">
                        Título
                    </div>
                    <div className="thSystem" style={{width: '30%'}}>
                        Ações
                    </div>
            </div>
        );
    }
}

export default News;