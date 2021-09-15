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
            matricula: '',
            cpf: '',
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
            <ContainerPages innerMain={this.renderMain()} titulo="20 ANOS DE HISTÓRIA" subtitle="+ DE 1000 ASSOCIADOS" img="filiese/filiese.png" />
        );
    }
   
    renderMain(){
        let form = this.state.is_send ? <Fragment></Fragment> : <Form ref={ this.form } onSubmit={this.handleSubmit} lang="pt-br">
            <Row>
                                <Col>
                                    <Label for="nome">Nome</Label>
                                    <Input
                                        readOnly={true} 
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
                                        readOnly={true} 
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
                                        readOnly={true} 
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
        </Form>;
        return  ( 
            <Fragment>
                {form}
            </Fragment>
        );
    }

}

export default FilieseView;