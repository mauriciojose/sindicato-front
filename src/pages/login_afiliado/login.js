import React, { Fragment } from "react";
import './login.css';

import api from '../../services/api';

import { login } from "./auth";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpf: "",
            password: "",
            loading: false,
            messageErros: {
                cpf: [],
                password: []
            },
            errorMessage: ''
        }

        

        this.rules = new Map();
        this.rules.set('cpf', {
            name: "CPF",
            empty: ()=>{return this.validateTesteEmpty('cpf')},
            pattern: ()=>{return this.validateTestePattern(/[\d]+/g,"cpf")}
        });
        this.rules.set('password', {
            name: "Senha",
            empty: ()=>{return this.validateTesteEmpty('password')},
            pattern: false
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.form = React.createRef();
        this.validate = this.validate.bind(this);
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
        let change = {};

        let isNumber = event.target.attributes.number;

        let mask = event.target.attributes.mask;
        let value = event.target.value;

        // item[value] = event.target.value;

        value = isNumber ? this.setNumber(value) : value;

        let valueMask =  !mask ? value :  this.mascara( value, mask.value.toString() );

        change[event.target.name] = valueMask;

        this.setState(change);
    }
    validate() {
        let estado = this.state;
        estado.messageErros = {
            cpf: [],
            password: []
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
            this.setState({loading: true, errorMessage: ''});
            api.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            api.post('/auth/authenticate/filiado',{
                cpf: this.state.cpf,
                password: this.state.password
            }).then(result => {
                this.setState({loading: false});
                login(result.data.token, result.data.type);
                window.location = "/";
                
            }).catch(error => {
                this.setState({loading: false});
                if (error.response.status === 400 || error.response.status === 500) {
                    this.setState({errorMessage: '* Login ou senha incorreta.'});
                }
                if (error.response.status === 403) {
                    this.setState({errorMessage: '* Você não tem permissão de acesso!'});
                }
            });    
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
                    <div className="container-login">
                        <header>
                            <img src={process.env.PUBLIC_URL + "/logo-SINDSMUT.png"} alt=""/>
                            <h2>Olá! Faça login para continuar.</h2>
                            { this.state.errorMessage !== '' ? <div style={{marginBottom:'4px'}}>{this.renderSpan(this.state.errorMessage)}</div> : <Fragment></Fragment> }
                        </header>

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
                            <input type="password" autoComplete="new-password" placeholder="Senha"  value={this.state.password} name="password" onChange={ this.handleChange }/>
                            { this.state.messageErros['password'].map(this.renderSpan) }
                        </div>
                        
                        <button onClick={ this.state.loading ? ()=>{} : this.handleSubmit } className="btn-login">
                            { this.state.loading ? <div className="spin-login"></div>: "Entrar" }
                        </button>
                        {/* <div className="esqueceu-senha">
                            <span>Esqueceu sua senha?</span>
                        </div> */}
                        <div className="divider">
                            <div className="line"></div>
                            <span>OU</span>
                            <div className="line"></div>
                        </div>
                        <button className="btn-cadastrar" onClick={ ()=>{window.location="/filiado"} }>Cadastre-se</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;