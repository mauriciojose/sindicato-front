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

import Spin from '../components/spin/spin';

import ContainerPages from '../components/containerPages/containerPages';

import api from '../../services/api';

import './filieseView.css';

class FilieseView extends React.Component{
    constructor(props) {
        super(props);

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
            loading: false,
            id: this.props.match.params.id || null,
            _id: null
        };
        
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this); 
        // this.setObject = this.setObject.bind(this); 

        this.form = React.createRef();

    }

    componentDidMount() {
        if (this.state.id) {
            api.get(`/filiese/${this.state.id}`)
            .then(({ data: filiese }) => {
                console.log(filiese);
                this.setState(filiese);
            }).catch((error) => {
                // this.setState({ news: [], progressNews: false });
                // this.container.current.alertDanger();    
                if (error.response.status === 403) {
                    window.location = "/auth";
                }
            });
        }
      }


    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="20 ANOS DE HIST??RIA" subtitle="+ DE 1000 ASSOCIADOS" img="filiese/filiese.png" />
        );
    }
   
    renderMain(){
        let form = this.state.is_send ? <Fragment></Fragment> : <Form ref={ this.form } onSubmit={this.handleSubmit} lang="pt-br">
                            <Row>
                                <Col>
                                    <Label for="nome">Nome</Label>
                                    <Input readOnly={true} 
                                        value={this.state.nome} 
                                     
                                        type="text" 
                                        name="nome" 
                                        id="nome" 
                                        placeholder="Digite seu Nome" 
                                        required 
                                        maxLength="800" 
                                        data-message={'Digite um Nome V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label for="cargo">Cargo/Fun????o</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.cargo} 
                                     
                                        type="text" 
                                        name="cargo" 
                                        id="cargo" 
                                        placeholder="Digite seu Cargo/Fun????o" 
                                        data-message={'Digite um Cargo/Fun????o V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Label for="local">Local de Trabalho</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.local} 
                                     
                                        type="text" 
                                        name="local" 
                                        id="local" 
                                        placeholder="Digite seu Local de Trabalho"  
                                        data-message={'Digite um Local de Trabalho V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="secretaria">Secretaria</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.secretaria} 
                                     
                                        type="text" 
                                        name="secretaria" 
                                        id="secretaria" 
                                        placeholder="Digite sua Secretaria"   
                                        data-message={'Digite uma Secretaria V??lida'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="matricula">Matr??cula</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.matricula} 
                                     
                                        type="text" 
                                        name="matricula" 
                                        id="matricula" 
                                        placeholder="Digite sua Matr??cula"  
                                        data-message={'Digite uma Matr??cula V??lida'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="data_admissao">Data de Admiss??o</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="10" 
                                        minLength="10" 
                                        mask="##/##/####" 
                                        number="true" 
                                        value={this.state.data_admissao} 
                                     
                                        type="text" 
                                        name="data_admissao" 
                                        id="data_admissao" 
                                        placeholder="Digite sua Data de Admiss??o"
                                        data-message={'Digite uma Data de Admiss??o V??lida'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="rg">RG</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="17" 
                                        value={this.state.rg} 
                                     
                                        type="text" 
                                        name="rg" 
                                        id="rg" 
                                        placeholder="Digite seu RG"
                                        data-message={'Digite um RG V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={2}>
                                    <Label for="orgao_emissor">??rg??o Emissor</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="12" 
                                        value={this.state.orgao_emissor} 
                                     
                                        type="text" 
                                        name="orgao_emissor" 
                                        id="orgao_emissor" 
                                        placeholder="Digite o ??rg??o Emissor" 
                                        data-message={'Digite um ??rg??o Emissor V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Label for="cpf">CPF</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="14" 
                                        mask="###.###.###-##" 
                                        number="true" 
                                        value={this.state.cpf} 
                                     
                                        type="text" 
                                        name="cpf" 
                                        id="cpf" 
                                        placeholder="Digite seu CPF"
                                        data-message={'Digite um CPF V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="estado_civil">Estado Civil</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="90" 
                                        value={this.state.estado_civil} 
                                     
                                        type="text" 
                                        name="estado_civil" 
                                        id="estado_civil" 
                                        placeholder="Digite seu Estado Civil"
                                        data-message={'Digite um Estado Civil V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="naturalidade">Naturalidade</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="100" 
                                        value={this.state.naturalidade} 
                                     
                                        type="text" 
                                        name="naturalidade" 
                                        id="naturalidade" 
                                        placeholder="Digite sua Naturalidade"
                                        data-message={'Digite uma Naturalidade V??lida'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="data_nascimento">Data de Nascimento</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="10" 
                                        minLength="10" 
                                        mask="##/##/####" 
                                        number="true" 
                                        value={this.state.data_nascimento} 
                                     
                                        type="text" 
                                        name="data_nascimento" 
                                        id="data_nascimento" 
                                        placeholder="Digite sua Data de Nascimento"
                                        data-message={'Digite uma Data de Nascimento V??lida'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label for="logradouro">Logradouro</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.logradouro} 
                                     
                                        type="text" 
                                        name="logradouro" 
                                        id="logradouro" 
                                        placeholder="Digite seu Logradouro"
                                        data-message={'Digite um Logradouro V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Label for="numero">N??mero</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="8" 
                                        mask="########" 
                                        number="true" 
                                        value={this.state.numero} 
                                     
                                        type="text" 
                                        name="numero" 
                                        id="numero" 
                                        placeholder="Digite seu N??mero"
                                        data-message={'Digite um N??mero V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Label for="cep">CEP</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="10" 
                                        mask="##.###-###" 
                                        number="true" 
                                        value={this.state.cep} 
                                     
                                        type="text" 
                                        name="cep" 
                                        id="cep" 
                                        placeholder="Digite seu CEP"
                                        data-message={'Digite um CEP V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <Label for="bairro">Bairro / Povoado</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="500" 
                                        value={this.state.bairro} 
                                     
                                        type="text" 
                                        name="bairro" 
                                        id="bairro" 
                                        placeholder="Digite seu Bairro / Povoado" 
                                        data-message={'Digite um Bairro/Povoado V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="cidade">Cidade</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="400" 
                                        value={this.state.cidade} 
                                     
                                        type="text" 
                                        name="cidade" 
                                        id="cidade" 
                                        placeholder="Digite sua Cidade" 
                                        data-message={'Digite uma Cidade V??lida'}
                                    
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Label for="estado">Estado</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="300" 
                                        value={this.state.estado} 
                                     
                                        type="text" 
                                        name="estado" 
                                        id="estado" 
                                        placeholder="Digite seu Estado" 
                                        data-message={'Digite um Estado V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Label for="telefone">Telefone</Label>
                                    <Input readOnly={true} 
                                        required 
                                        maxLength="13" 
                                        minLength="13" 
                                        mask="## #####-####" 
                                        number="true" 
                                        value={this.state.telefone} 
                                     
                                        type="text" 
                                        name="telefone" 
                                        id="telefone" 
                                        placeholder="Digite seu Telefone" 
                                        data-message={'Digite um Telefone V??lido'}
                                    
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Label for="email">E-mail</Label>
                                    <Input readOnly={true} 
                                        value={this.state.email} 
                                     
                                        type="email" 
                                        required 
                                        name="email" 
                                        id="email" 
                                        placeholder="Digite seu E-mail" 
                                        data-message={'Digite um E-Mail V??lido'}
                                    
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Label for="observacao">Observa????o</Label>
                                    <Input readOnly={true} value={this.state.observacao} type="textarea" name="observacao" id="observacao" placeholder="Digite seu Observa????o" />
                                </Col>
                            </Row>
                        </Form>;
        return  ( 
            <Fragment>
                {form}
            </Fragment>
        );
    }

}

export default FilieseView;