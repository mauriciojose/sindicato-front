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

        this.container = React.createRef();

        this.state = {
            nome: '',
            cargo: '',
            local: '',
            secretaria: '',
            matricula: '',
            data_admissao: '',
            rg: '',
            orgao_emissor: '',
            cpf: '',
            estado_civil: '',
            naturalidade: '',
            data_nascimento: '',
            bairro: '',
            cidade: '',
            estado: '',
            logradouro: '',
            numero: '',
            cep: '',
            telefone: '',
            email: '',
            observacao: '',
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

        api.post(`/filiese`, filiado, {
        }).then(res => {

            this.setState({
                loading: false,
                is_send: true
            });

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                error = error.response.data;
                console.log(error);
                this.container.current.alertDanger(error.error);  
                this.setState({
                    loading: false
                    // is_send: true
                });
            }
        });

        // this.setState({is_send: true});
        console.log(this.state);
    }
    

    setObject(){
        this.setState(
            {
                nome: "MAURICIO JOSE MIRANDA GUIMARAES",
                cargo: "professor",
                local: "caldas do jorro",
                secretaria: "teste ",
                matricula: "1010",
                data_admissao: "01/01/2019",
                rg: "14934355",
                orgao_emissor: "ssp",
                cpf: "06515065508",
                estado_civil: "solteiro",
                naturalidade: "brasileira",
                data_nascimento: "11/11/1993",
                bairro: "Caldas do Jorro",
                cidade: "Tucano",
                estado: "Bahia",
                logradouro: "casa",
                numero: "0",
                cep: "48793000",
                telefone: "79999999999",
                email: "mauriciojosemirandaguimaraes@gmail.com",
                observacao: "dfsdfsdfsdfsdfsdf"
            }
        );
    }

    

    render(){

        return(
            <ContainerPages ref={this.container} innerMain={this.renderMain()} titulo="20 ANOS DE HISTÓRIA" subtitle="+ DE 1000 ASSOCIADOS" img="filiese/filiese.png" />
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
                                <Col sm={6}>
                                    <Label for="cargo">Cargo/Função</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.cargo} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="cargo" 
                                        id="cargo" 
                                        placeholder="Digite seu Cargo/Função" 
                                        data-message={'Digite um Cargo/Função Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Label for="local">Local de Trabalho</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.local} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="local" 
                                        id="local" 
                                        placeholder="Digite seu Local de Trabalho"  
                                        data-message={'Digite um Local de Trabalho Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="secretaria">Secretaria</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.secretaria} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="secretaria" 
                                        id="secretaria" 
                                        placeholder="Digite sua Secretaria"   
                                        data-message={'Digite uma Secretaria Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={4}>
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
                                <Col sm={4}>
                                    <Label for="data_admissao">Data de Admissão</Label>
                                    <Input 
                                        required 
                                        maxLength="10" 
                                        minLength="10" 
                                        mask="##/##/####" 
                                        number="true" 
                                        value={this.state.data_admissao} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="data_admissao" 
                                        id="data_admissao" 
                                        placeholder="Digite sua Data de Admissão"
                                        data-message={'Digite uma Data de Admissão Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="rg">RG</Label>
                                    <Input 
                                        required 
                                        maxLength="17" 
                                        value={this.state.rg} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="rg" 
                                        id="rg" 
                                        placeholder="Digite seu RG"
                                        data-message={'Digite um RG Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label for="orgao_emissor">Órgão Emissor</Label>
                                    <Input 
                                        required 
                                        maxLength="12" 
                                        value={this.state.orgao_emissor} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="orgao_emissor" 
                                        id="orgao_emissor" 
                                        placeholder="Digite o Órgão Emissor" 
                                        data-message={'Digite um Órgão Emissor Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={6}>
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
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="estado_civil">Estado Civil</Label>
                                    <Input 
                                        required 
                                        maxLength="90" 
                                        value={this.state.estado_civil} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="estado_civil" 
                                        id="estado_civil" 
                                        placeholder="Digite seu Estado Civil"
                                        data-message={'Digite um Estado Civil Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="naturalidade">Naturalidade</Label>
                                    <Input 
                                        required 
                                        maxLength="100" 
                                        value={this.state.naturalidade} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="naturalidade" 
                                        id="naturalidade" 
                                        placeholder="Digite sua Naturalidade"
                                        data-message={'Digite uma Naturalidade Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="data_nascimento">Data de Nascimento</Label>
                                    <Input 
                                        required 
                                        maxLength="10" 
                                        minLength="10" 
                                        mask="##/##/####" 
                                        number="true" 
                                        value={this.state.data_nascimento} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="data_nascimento" 
                                        id="data_nascimento" 
                                        placeholder="Digite sua Data de Nascimento"
                                        data-message={'Digite uma Data de Nascimento Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label for="logradouro">Logradouro</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.logradouro} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="logradouro" 
                                        id="logradouro" 
                                        placeholder="Digite seu Logradouro"
                                        data-message={'Digite um Logradouro Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Label for="numero">Número</Label>
                                    <Input 
                                        required 
                                        maxLength="8" 
                                        mask="########" 
                                        number="true" 
                                        value={this.state.numero} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="numero" 
                                        id="numero" 
                                        placeholder="Digite seu Número"
                                        data-message={'Digite um Número Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Label for="cep">CEP</Label>
                                    <Input 
                                        required 
                                        maxLength="10" 
                                        mask="##.###-###" 
                                        number="true" 
                                        value={this.state.cep} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="cep" 
                                        id="cep" 
                                        placeholder="Digite seu CEP"
                                        data-message={'Digite um CEP Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="bairro">Bairro / Povoado</Label>
                                    <Input 
                                        required 
                                        maxLength="500" 
                                        value={this.state.bairro} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="bairro" 
                                        id="bairro" 
                                        placeholder="Digite seu Bairro / Povoado" 
                                        data-message={'Digite um Bairro/Povoado Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="cidade">Cidade</Label>
                                    <Input 
                                        required 
                                        maxLength="400" 
                                        value={this.state.cidade} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="cidade" 
                                        id="cidade" 
                                        placeholder="Digite sua Cidade" 
                                        data-message={'Digite uma Cidade Válida'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="estado">Estado</Label>
                                    <Input 
                                        required 
                                        maxLength="300" 
                                        value={this.state.estado} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="estado" 
                                        id="estado" 
                                        placeholder="Digite seu Estado" 
                                        data-message={'Digite um Estado Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label for="telefone">Telefone</Label>
                                    <Input 
                                        required 
                                        maxLength="13" 
                                        minLength="13" 
                                        mask="## #####-####" 
                                        number="true" 
                                        value={this.state.telefone} 
                                        onChange={this.handleChange} 
                                        type="text" 
                                        name="telefone" 
                                        id="telefone" 
                                        placeholder="Digite seu Telefone" 
                                        data-message={'Digite um Telefone Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Label for="email">E-mail</Label>
                                    <Input 
                                        value={this.state.email} 
                                        onChange={this.handleChange} 
                                        type="email" 
                                        required 
                                        name="email" 
                                        id="email" 
                                        placeholder="Digite seu E-mail" 
                                        data-message={'Digite um E-Mail Válido'}
                                        onInvalid={this.handleValidity}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Label for="observacao">Observação</Label>
                                    <Input value={this.state.observacao} onChange={this.handleChange} type="textarea" name="observacao" id="observacao" placeholder="Digite seu Observação" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className='align-end-righti'>
                                    <ButtonToggle type='submit' onClick={this.handleSubmit} color="success"> { this.state.loading ? <div className="spin-login"></div>: "Filie-se" }</ButtonToggle>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className='align-end-righti'>
                                    <ButtonToggle type='button' onClick={this.setObject} color="info">{'PREENCHER'}</ButtonToggle>
                                </Col>
                            </Row>
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