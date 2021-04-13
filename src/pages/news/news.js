import React, { Fragment } from 'react';

import api from '../../services/api';

import Container from '../components/container/container';
import Nav from '../components/navNew/navNew';
import './news.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import SweetAlert from 'react-bootstrap-sweetalert';

class News extends React.Component{
    constructor(props) {
        super(props);
        this.container = React.createRef();

        this.state = {
            news: [],
            progressNews: true,
            message: false,
            idRemove: null
        }

        this.setMessageState = this.setMessageState.bind(this);
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get(`/news`,{headers}).then(res => {
            this.setState({ news: res.data ? res.data : [], progressNews: false });

        }).catch((error) => {
            this.setState({ news: [], progressNews: false });
            this.container.current.alertDanger();    
        });
    }

    render(){
        let news = <Fragment></Fragment>;
        return (
            <Fragment>
                <Nav/>
                {this.state.message ? this.onMessageDeleteFile() : <Fragment></Fragment>}
                <Container ref={this.container}  title="Notícias" footer={this.returnFooter()} main={this.returnList()}/>
            </Fragment>
        );
    }

    returnFooter(){
        return(
            <div className="bg clearfix" style={{ padding: '.5rem' }}>
                <button onClick={this.onClickNew} className="btn btn-info float-right"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faPlus} /> Nova Notícia</button>
            </div>
        );
    }

    onClickNew(){
        window.location = "/news/create";
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
        return(
            <div className="itensSystem">
                <div className="itemSystem" style={{width: '30%'}}>
                    {data.toLocaleDateString()}
                </div>
                <div className="itemSystem">
                    {item.name}
                </div>
                <div className="itemSystem acoes" style={{width: '30%'}}>
                    <div title="Editar" onClick={ ()=>{this.onClickEditItem(item._id)} } style={{ background: "#31708f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faEdit} /></div>
                    <div title="Excluir" onClick={ ()=>this.setMessageState(item._id) } style={{ background: "#a94442" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faTrash} /></div>
                </div>
            </div>
        );
    }

    setMessageState(id){
        this.setState({idRemove: id});
        this.setState({message: true});
    }
    onCancel(){
        this.setState({message: false});
    }

    deleteNews(){
        
        api.delete(`/news/${this.state.idRemove}`, {}, {
        }).then(res => {
            
            this.container.current.alertSucces();
            let newsMap = this.state.news.filter((value)=>{
                return value._id != this.state.idRemove;
            });
            this.setState({ news: newsMap, message: false });

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                this.container.current.alertDanger();  
            }   
        });
    }

    onMessageDeleteFile(){
        return (
          <SweetAlert
          warning
          showCancel
          confirmBtnText="Sim, Remover!"
          confirmBtnBsStyle="danger"
          title="Deseja Realmente Remover a Notícia?"
          onConfirm={this.deleteNews.bind(this)}
          onCancel={this.onCancel.bind(this)}
          focusCancelBtn
        >
          A notícia será removida permanentemente do sistema!
        </SweetAlert>
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