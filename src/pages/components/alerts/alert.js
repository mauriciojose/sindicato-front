import React from 'react';
import './alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faExclamation, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class Alert extends React.Component{
    constructor(props) {
        super(props);
        this.propiedades = {
            'success': {
                classes: "Alert alertSuccess alert-white rounded",
                simbolo: <FontAwesomeIcon icon={faCheck} />,
                titulo: "Sucesso",
                msg: "Solicitação processada com sucesso"
            },
            'danger': {
                classes: "Alert alert-danger alert-white rounded",
                simbolo: <FontAwesomeIcon icon={faTimes} />,
                titulo: "Erro",
                msg: "Erro ao processar solicitação"
            },
            'warning': {
                classes: "Alert alert-warning alert-white rounded",
                simbolo: <FontAwesomeIcon icon={faExclamation} />,
                titulo: "Atenção",
                msg: "Aguarde..."
            },
            'info': {
                classes: "Alert alert-info alert-white rounded",
                simbolo: <FontAwesomeIcon icon={faInfo} />,
                titulo: "Info",
                msg: "Por favor espere a conclusão da operação"
            } 
        }
        this.addAlert = this.addAlert;
        this.state = {
            count: 0,
            alerts: [],
            interval: null,
            removed: false,
            msg: null
        };
    }

    componentDidMount () {
    } 

    addAlert(tipo, msg=null){
        let id = this.getId();
        this.state.alerts.push({
            id: id,
            component: this.renderAlert(tipo,id)
        });
        if (this.state.alerts.length == 1) {
            this.interval = setInterval(this.removeAlertPop.bind(this), 5000);
        }
        this.setState({ alerts: this.state.alerts, msg: msg});
    }
    removeAlertPop(){
        if (!this.state.removed) {
            this.state.alerts.shift();
        }
        if (this.state.alerts.length == 0) {
            clearInterval(this.interval);
        }
        if (!this.state.removed) {
            this.setState({ alerts: this.state.alerts});
        }else{
            this.setState({ removed: false ,alerts: this.state.alerts});
        }
    }

    getId(){
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    removeAlert(index){
        let alert = this.state.alerts.findIndex( item => item.id === index );
        if (alert !== -1) {
            this.state.alerts.splice(alert,1) ;
        }
        this.setState({ removed: true, alerts: this.state.alerts});
    }

    setTime(maxProgress=100){
        let index = maxProgress;
        let time = setTimeout(() => {
            
            if (index==0) {
                clearTimeout(time);
                return;
            }
            this.setTime(maxProgress-2);
        }, 110); 
    }

    render(){
        return (
            <div className='content-alert'>
                { this.state.alerts.map( (value, key) => 
                    value.component
                )}
            </div>
        );
    }

    renderAlert(tipo,id){
        return (
            <div className='container-alert'>
                    <div className={this.propiedades[tipo].classes}>
                        <button type="button" className="Close" data-dismiss="alert" onClick={ () => this.removeAlert(id) } aria-hidden="true">x</button>
                        <div className="icon">
                            {this.propiedades[tipo].simbolo}
                        </div><strong>{this.propiedades[tipo].titulo}!</strong> <span>{this.state.msg ? this.state.msg : this.propiedades[tipo].msg}!</span>
                    </div>
            </div>
        );
    }
}
export default Alert;