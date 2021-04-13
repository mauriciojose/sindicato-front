import React, { Fragment } from "react";
import './login.css';

import api from '../../services/api';

import { login } from "./auth";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            celular: "",
            loading: false,
            messageErros: {
                email: [],
                password: [],
                name: [],
                celular: []
            },
            errorMessage: ''
        }

        this.rules = new Map();
        this.rules.set('email', {
            name: "Email",
            empty: ()=>{return this.validateTesteEmpty('email')},
            pattern: ()=>{return this.validateTestePattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email")}
        });
        this.rules.set('password', {
            name: "Senha",
            empty: ()=>{return this.validateTesteEmpty('password')},
            pattern: false
        });
        this.rules.set('name', {
            name: "Nome",
            empty: ()=>{return this.validateTesteEmpty('name')},
            pattern: false
        });
        this.rules.set('celular', {
            name: "Celular",
            empty: ()=>{return this.validateTesteEmpty('celular')},
            pattern: false
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.form = React.createRef();
        this.validate = this.validate.bind(this);
    }

    handleChange(value,event) {
        let item = {};
        item[value] = event.target.value;
        this.setState(item);
    }
    validate() {
        let estado = this.state;
        estado.messageErros = {
            email: [],
            password: [],
            name: [],
            celular: []
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
    
    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            // this.setState({loading: true, errorMessage: ''});
            // api.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            // api.post('/auth/authenticate',{
            //     email: this.state.email,
            //     password: this.state.password
            // }).then(result => {
            //     this.setState({loading: false});
            //     login(result.data.token);
            //     window.location = "/";
                
            // }).catch(error => {
            //     this.setState({loading: false});
            //     if (error.response.status === 400) {
            //         this.setState({errorMessage: '* Login ou senha incorreta.'});
            //     }
            // });    
        } 
    }
    componentDidMount(){

    }

    renderSpan(msg){
        return(
            <span className='login-msg'>{msg}</span>
        );
    }
    render(){
        return(
            <form>
                <div className="container-background-login">
                    <div className="container-login container-register">
                        <header>
                            <img src={process.env.PUBLIC_URL + '/logo192.png'} alt=""/>
                            <h2>Olá! Criei uma conta em nossa plataforma.</h2>
                            { this.state.errorMessage !== '' ? <div style={{marginBottom:'4px'}}>{this.renderSpan(this.state.errorMessage)}</div> : <Fragment></Fragment> }
                        </header>

                        <div className="row-login">
                            <input type="text" required value={this.state.name} onChange={ (e)=>{this.handleChange('name',e)} } placeholder="Nome"/>
                            { this.state.messageErros['name'].map(this.renderSpan) }
                        </div>
                        <div className="row-login">
                            <input type="text" required value={this.state.celular} onChange={ (e)=>{this.handleChange('celular',e)} } placeholder="Celular"/>
                            { this.state.messageErros['celular'].map(this.renderSpan) }
                        </div>
                        <div className="row-login">
                            <input type="email" required value={this.state.email} onChange={ (e)=>{this.handleChange('email',e)} } placeholder="Email"/>
                            { this.state.messageErros['email'].map(this.renderSpan) }
                        </div>
                        <div className="row-login">
                            <input type="password" autoComplete="new-password" placeholder="Senha"  value={this.state.password} onChange={ (e)=>{this.handleChange('password',e)} }/>
                            { this.state.messageErros['password'].map(this.renderSpan) }
                        </div>
                        
                        <button onClick={ this.state.loading ? ()=>{} : this.handleSubmit } className="btn-login">
                            { this.state.loading ? <div className="spin-login"></div>: "Cadastrar" }
                        </button>
                        <div className="divider">
                            <div className="line"></div>
                            <span>OU</span>
                            <div className="line"></div>
                        </div>
                        <button className="btn-cadastrar" onClick={()=>{window.location="/login"}}>Entrar</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Register;