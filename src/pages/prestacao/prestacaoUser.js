import React, { Fragment } from 'react';

import api from '../../services/api';

import Container from '../components/container/container';
import Nav from '../components/navNew/navNew';
import './prestacao.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';

import SweetAlert from 'react-bootstrap-sweetalert';
import ContainerPages from '../components/containerPages/containerPages';

class Prestacao extends React.Component{
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
        this.meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get(`/prestacao`,{headers}).then(res => {
            this.setState({ news: res.data ? res.data : [], progressNews: false });

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/login";
            } else{
                this.setState({ news: [], progressNews: false });
                this.container.current.alertDanger();    
            }
        });
    }

    render(){
        let news = <Fragment></Fragment>;
        return (
            <Fragment>
                {/* <Nav/> */}
                {this.state.message ? this.onMessageDeleteFile() : <Fragment></Fragment>}
                <ContainerPages ref={this.container}  title="Prestação de Contas" footer={this.returnFooter()} notBanner={true} innerMain={this.returnList()}/>
            </Fragment>
        );
    }

    returnFooter(){
        return(
            <Fragment></Fragment>
        );
    }

    onClickNew(){
        window.location = "/prestacao/create";
    }

    returnList(){
        return (
        <>
            <h2>Prestação de Contas</h2>
            <hr />
            <div className="listSystem">
                {this.returnListHeader()}
                { this.state.news.map( (value, key) => 
                    this.returnListMain(value)
                )}
            </div>
        </>);
    }

    onClickVisualizarItem(item){
        const url = `${window._env_.storage}/prestacao/${item.path}/${item.file}`;
        let a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.click();
    }
    onClickEditItem(item){
        const url = `${window._env_.storage}/prestacao/${item.path}/${item.file}`;
        let a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.download = 'download.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    returnListMain(item){
        let data = new Date(item.createdAt);
        return(
            <div className="itensSystem">
                <div className="itemSystem" style={{width: '30%'}}>
                    {data.toLocaleDateString('pt-br')}
                </div>
                <div className="itemSystem">
                    {this.meses[item.mes-1]}
                </div>
                <div className="itemSystem">
                    {item.name}
                </div>
                <div className="itemSystem acoes" style={{width: '30%'}}>
                    <div title="Visualizar" onClick={ ()=>{this.onClickVisualizarItem(item)} } style={{ background: "#ca540f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faEye} /></div>
                    {/* <div title="Download" onClick={ ()=>{this.onClickEditItem(item)} } style={{ background: "#31708f" }} className="acao"><FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faDownload} /></div> */}
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
        
        api.delete(`/prestacao/${this.state.idRemove}`, {}, {
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
                        Mês
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

export default Prestacao;