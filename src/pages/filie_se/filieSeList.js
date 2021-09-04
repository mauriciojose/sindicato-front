import React, { Fragment } from 'react';

import api from '../../services/api';

import Container from '../components/container/container';
import Nav from '../components/navNew/navNew';
import '../news/news.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

import SweetAlert from 'react-bootstrap-sweetalert';

class FilieseList extends React.Component{
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
        api.get(`/filiese`,{headers}).then(res => {
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
                <Container ref={this.container}  title="Filiados" footer={this.returnFooter()} main={this.returnList()}/>
            </Fragment>
        );
    }

    returnFooter(){
        return(
            <div className="bg clearfix" style={{ padding: '.5rem' }}>
                {/* <button onClick={this.onClickNew} className="btn btn-info float-right"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faPlus} /> Nova Notícia</button> */}
            </div>
        );
    }

    onClickNew(){
        window.location = "/news/create";
    }

    onClickView(id){
        window.location = `/filiados/${id}`;
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
                    {item.nome}
                </div>
                <div className="itemSystem acoes" style={{width: '30%'}}>
                    {
                    
                    item.is_valid 
                        ? <Fragment></Fragment> 
                        : <div title="Validar" onClick={ ()=>{this.onClickValidItem(item._id)} } style={{ background: "#2ECC40" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faCheck} /></div>
                    }
                    {/* <div title="Editar" onClick={ ()=>{this.onClickEditItem(item._id)} } style={{ background: "#31708f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faEdit} /></div> */}
                    <div title="Visualizar" onClick={ ()=>this.onClickView(item._id) } style={{ background: "#ca540f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faEye} /></div>
                    <div title="Excluir" onClick={ ()=>this.setMessageState(item._id) } style={{ background: "#a94442" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faTrash} /></div>
                </div>
            </div>
        );
    }

    onClickValidItem(id){
        
        api.put(`/filiese/valid/${id}`, {}, {
        }).then(res => {
            
            this.container.current.alertSucces();
            let index = this.state.news.findIndex( item => item._id == id );
            this.state.news[index].is_valid = true;
            this.setState({ news: this.state.news, message: false });

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                this.container.current.alertDanger();  
            }   
        });
    }

    setMessageState(id){
        this.setState({idRemove: id});
        this.setState({message: true});
    }
    onCancel(){
        this.setState({message: false});
    }

    deleteNews(){
        
        api.delete(`/filiese/${this.state.idRemove}`, {}, {
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
          title="Deseja Realmente Remover?"
          onConfirm={this.deleteNews.bind(this)}
          onCancel={this.onCancel.bind(this)}
          focusCancelBtn
        >
          será removida permanentemente do sistema!
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
                        Nome
                    </div>
                    <div className="thSystem" style={{width: '30%'}}>
                        Ações
                    </div>
            </div>
        );
    }
}

export default FilieseList;