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
            is_send: false,
            loading: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.setObject = this.setObject.bind(this); 

        this.form = React.createRef();

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
            <ContainerPages innerMain={this.renderMain()} titulo="20 ANOS DE HISTÓRIA" subtitle="+ DE 1000 ASSOCIADOS" img="filiese/filiese.png" />
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
        let form = this.state.is_send ? <Fragment></Fragment> : <Form ref={ this.form } onSubmit={this.handleSubmit} lang="pt-br">
                            <Row>
                                <Col>
                                    <Label for="nome">Nome</Label>
                                    <Input 
                                        value={this.state.nome} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="nome" 
                                        id="nome" 
                                        placeholder="Digite seu Nome" 
                                        required 
                                        maxLength="800" 
                                        data-message={'Digite um Nome Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                            <Col sm={7}>
                                    <Label for="cpf">CPF</Label>
                                    <Input 
                                        required 
                                        maxLength="14" 
                                        mask="###.###.###-##" 
                                        number="true" 
                                        value={this.state.cpf} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="cpf" 
                                        id="cpf" 
                                        placeholder="Digite seu CPF"
                                        data-message={'Digite um CPF Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={5}>
                                    <Label for="matricula">Matrícula</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.matricula} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="matricula" 
                                        id="matricula" 
                                        placeholder="Digite sua Matrícula"  
                                        data-message={'Digite uma Matrícula Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className='align-end-righti'>
                                    <ButtonToggle type='submit' onClick={this.handleSubmit} color="success"> { this.state.loading ? <div className="spin-login"></div>: "Filie-se" }</ButtonToggle>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col sm={12} className='align-end-righti'>
                                    <ButtonToggle type='button' onClick={this.setObject} color="info">{'PREENCHER'}</ButtonToggle>
                                </Col>
                            </Row> */}
                        </Form>;
        return  ( 
            <Fragment>
                {
                    !this.state.is_send ? 
                    <div className="title-filiese">
                        <h1>FILIE-SE!</h1>
                        <h6>BASTA PREENCHER A FICHA DE INSCRIÇÃO <br/> E LEVAREMOS OS DOCUMENTOS A ASSINAR ATÉ VOCÊ</h6>
                        <div id="triangulo-para-baixo"></div>
                    </div>
                    :
                    <div className="title-filiese send">
                        <h1>ENVIADO</h1>
                        <h6>O SINDICATO AGRADECE O INTERESSE <br/> EM SE UNIR A LUTA PELOS DIREITOS <br/> DO SERVIDOR PÚBLICO MUNICIPAL </h6>
                        <h6 className="retorno">RETORNAREMOS O CONTATO EM BREVE</h6>
                        <div className="message-retorno">
                            SINDICATO FORTE SE FAZ <br/>
                            COM PARTICIPAÇÃO POPULAR 
                        </div>
                    </div>
                }
                {form}
            </Fragment>
        );
    }

}

export default FilieSe;