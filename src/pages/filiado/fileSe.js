import React, { Fragment } from 'react';
import './filieSe.css';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Button,
    ButtonToggle,
    InputGroup
} from 'reactstrap';

import ContainerPages from '../components/containerPages/containerPages';

import api from '../../services/api';

class FilieSe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            matricula: '',
            cpf: '',
            email: '',
            is_send: false,
            loading: false,
            messageErros: {
                cpf: [],
                matricula: [],
                nome: [],
                email: []
            },
            errorMessage: ''
        };

        this.rules = new Map();
        this.rules.set('email', {
            name: "E-mail",
            empty: ()=>{return this.validateTesteEmpty('email')},
            pattern: ()=>{return this.validateTestePattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email")}
        });
        this.rules.set('matricula', {
            name: "Matrícula",
            empty: ()=>{return this.validateTesteEmpty('matricula')},
            pattern: false
        });
        this.rules.set('nome', {
            name: "Nome",
            empty: ()=>{return this.validateTesteEmpty('nome')},
            pattern: false
        });
        this.rules.set('cpf', {
            name: "CPF",
            empty: ()=>{return this.validateTesteEmpty('cpf')},
            pattern: false
        });
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.setObject = this.setObject.bind(this); 

        this.form = React.createRef();

        this.validate = this.validate.bind(this);

    }

    validate() {
        let estado = this.state;
        estado.messageErros = {
            cpf: [],
            matricula: [],
            nome: [],
            email: []
        };
        this.setState(estado);
        let retorno = true;
        for (var [keyMap, value] of this.rules) {
            for (const key in value) {
                if (Object.hasOwnProperty.call(value, key)) {
                    if (typeof value[key] === 'function') {
                        let teste = value[key]();
                        if (teste) {
                            retorno = false;
                            break;
                        }
                    }
                }
            }
        }
        return retorno;
    }

    validateTesteEmpty(campo){
        let result = !this.state[campo].trim().length > 0;
        if (result) {
            let messages = this.state.messageErros;
            messages[campo].push("* Preencha o campo");
            this.setState({messageErros: messages});
        }
        return result;
    }
    validateTestePattern(pattern,campo){
        let result = !pattern.test(this.state[campo]);
        if (result) {
            let messages = this.state.messageErros;
            messages[campo].push("* Formato inválido");
            this.setState({messageErros: messages});
        }
        return result;
    }
    

    removeItens(value, mascara){
        for (let index = 0; index < mascara.length; index++) {
            const element = mascara[index].toString();
            // console.log(typeof element, element, element.length, element != "#");
            if (element != "#") {
                // console.log("aquiiiiiii");
                let re = new RegExp(element, 'g');
                value = value.replace(element,"");
            }
        }
        return value;
    }
    
    existeItem(value, mascara){
        for (let index = 0; index < mascara.length; index++) {
            const element = mascara[index];
            if (value[value.length-1] == element && element != "#") {
                return value.substring(0, value.length-1);
            }
        }
        return value;
    }

    mascara(id, mask){
        id = this.removeItens(id, mask);
        console.log(id);
        let mascara = mask;
        for (let index = 0; index < id.length; index++) {
            mask = mask.replace("#",id[index]);
        }
        let retorno = '';
        for (let index = 0; index < mask.length; index++) {
            const element = mask[index];
            if (element != "#") {
                retorno += ""+element;
            }else{
                break;
            }
        }
        retorno = this.existeItem(retorno, mascara);
        return retorno;
    }

    setNumber(value){
        return value.replace(/[^0-9\.]/g,'');
    }


    handleChange(event) {
        event.preventDefault();
        let change = {};

        let isNumber = event.target.attributes.number;

        let mask = event.target.attributes.mask;
        let value = event.target.value;

        console.log(isNumber);

        value = isNumber ? this.setNumber(value) : value;

        let valueMask =  !mask ? value :  this.mascara( value, mask.value.toString() );

        change[event.target.name] = valueMask;
        this.setState(change);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            // this.setState({loading: true, errorMessage: ''});
            this.setState({loading: true});
            
            let filiado = this.state;
            filiado.is_send = undefined;
            filiado.loading = undefined;
    
            api.post(`/filiado`, filiado, {
            }).then(res => {
    
                this.setState({
                    loading: false,
                    is_send: true
                });
    
            }).catch((error) => {
                if (error.response.status == 401 || error.response.status == 403) {
                    window.location = "/auth";
                } else{
                    // this.container.current.alertDanger();  
                }
            });
    
            // this.setState({is_send: true});
            console.log(this.state);
        }

    }
    

    setObject(){
        this.setState(
            {
                nome: "MAURICIO JOSE MIRANDA GUIMARAES",
                matricula: "1010",
                cpf: "06515065508"
            }
        );
    }

    

    render(){

        return(
            this.renderMain()
        );
    }

    handleValidity({target}) {
        
        let validLength = !target.required ? true : !target.value.length == 0;
        let validOther = !target.maxLength ? true : target.value.length <= Number(target.maxLength);

        validOther = validOther ? !target.minLength ? true : target.value.length >= Number(target.minLength) : validOther;


        
        let valid = validLength == false || validOther == false ? true : false;
        
        console.log(validLength, validOther, valid);

        let messageItem = "";

        if (valid) {
            messageItem = !validLength ? target.placeholder : target.dataset.message;
        }

        const message = messageItem;
        target.setCustomValidity(message);
    }
   
    renderMain(){
        let form = this.state.is_send ? <Fragment></Fragment> : 
            <form ref={ this.form } onSubmit={this.handleSubmit} lang="pt-br">
                <div className="container-background-login">
                    <div className="container-login">
                        <header>
                            <img src={process.env.PUBLIC_URL + "/logo-SINDSMUT.png"} alt=""/>
                            <h2>Novo cadastro <br/> de filiado.</h2>
                            { this.state.errorMessage !== '' ? <div style={{marginBottom:'4px'}}>{this.renderSpan(this.state.errorMessage)}</div> : <Fragment></Fragment> }
                        </header>

                        <div className="row-login">
                            <input type="text" autoComplete="new-nome" placeholder="Nome"  value={this.state.nome} name="nome" onChange={ this.handleChange }/>
                            { this.state.messageErros['nome'].map(this.renderSpan) }
                        </div>

                        <div className="row-login">
                            <input type="text" 
                            required 
                            mask="###.###.###-##" 
                            number="true"
                            name="cpf"
                            value={this.state.cpf} 
                            onChange={ this.handleChange } 
                            placeholder="CPF"/>
                            { this.state.messageErros['cpf'].map(this.renderSpan) }
                        </div>
                        <div className="row-login">
                            <input number="true" type="text" autoComplete="new-password" placeholder="Matrícula"  value={this.state.matricula} name="matricula" onChange={ this.handleChange }/>
                            { this.state.messageErros['matricula'].map(this.renderSpan) }
                        </div>
                        <div className="row-login">
                            <input type="email" autoComplete="new-email" placeholder="E-mail"  value={this.state.email} name="email" onChange={ this.handleChange }/>
                            { this.state.messageErros['email'].map(this.renderSpan) }
                        </div>
                        
                        <button onClick={ this.state.loading ? ()=>{} : this.handleSubmit } className="btn-login">
                            { this.state.loading ? <div className="spin-login"></div>: "Cadastrar" }
                        </button>
                        {/* <div className="esqueceu-senha">
                            <span>Esqueceu sua senha?</span>
                        </div> */}
                        <div className="divider">
                            <div className="line"></div>
                            <span>OU</span>
                            <div className="line"></div>
                        </div>
                        <button className="btn-cadastrar" onClick={ ()=>{window.location="/login"} }>Entrar</button>
                    </div>
                </div>
            </form>;
        return  ( 
            <Fragment>
                {
                    !this.state.is_send ? 
                    form
                    :
                    <form>
                        <div className="container-background-login">
                            <div className="container-login">
                                <header>
                                    <img src={process.env.PUBLIC_URL + "/logo-SINDSMUT.png"} alt=""/>
                                    <h2>Solicitação Enviada!</h2>
                                    <h5 style={{textAlign: "center", margin: "10px 0 30px 0"}}>Você receberá um e-mail com os dados para login</h5>
                                    { this.state.errorMessage !== '' ? <div style={{marginBottom:'4px'}}>{this.renderSpan(this.state.errorMessage)}</div> : <Fragment></Fragment> }
                                </header>
                                <div className="row-login">
                                <button type='button' className="btn-cadastrar" onClick={ ()=>{window.location="/"} }>Voltar</button>
                                </div>
                            </div>
                        </div>
                    </form>

                }
                
            </Fragment>
        );
    }

    renderSpan(msg){
        return(
            <span className='login-msg'>{msg}</span>
        );
    }

}

export default FilieSe;