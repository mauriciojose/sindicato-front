import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
    ButtonToggle
} from 'reactstrap';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateFromHTML } from "draft-js-import-html";

import api from '../../services/api';

import Container from '../components/container/container';
import Upload from '../components/upload/upload';

import Nav from '../components/navNew/navNew';

import '../components/css/align.css'

import '../components/css/editor.css'

class PrestacaoNews extends React.Component{
    constructor(props) {
        super(props);
        this.photos = React.createRef();
        
        this.state = {
            titulo: '',
            id: this.props.match.params.id || null,
            path: null,
            file: null,
            mes: new Date().getMonth() + 1
        };

        this.container = React.createRef();
    
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);

        this.meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
        this.mesAtual = this.state.mes != null ? this.state.mes : new Date().getMonth() + 1;
    }

    componentDidMount() {
        if (this.state.id) {
            api.get(`/prestacao/${this.state.id}`)
            .then(({ data: gallery }) => {
                this.setState({
                    titulo: gallery.name,
                    id: gallery._id,
                    path: gallery.path,
                    file: gallery.file,
                    mes: gallery.mes,
                    fileExt: gallery.fileExt
                });
            }).catch((error) => {
                if (error.response.status == 401 || error.response.status == 403) {
                    window.location = "/auth";
                } else{
                    this.container.current.alertDanger();  
                }
            });
        }
        console.log(this.state);
      }

      handleChange(event) {
        event.preventDefault();
        let change = {};
        // console.log(event.target.name, event.target.value);
        change[event.target.name] = event.target.value;
        this.setState(change);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.state.id ? this.handleSubmitUpdate() : this.handleSubmitCreate();
      }

      handleSubmitCreate() {

        const formData = new FormData();

        formData.append('name', this.state.titulo);
        formData.append('mes', this.state.mes);

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }

        api.post(`/prestacao`, formData, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({titulo: ''});
            this.photos.current.resetFiles();

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                this.container.current.alertDanger();  
            }
        });
      }

      validateAddForm(formData,title,item, regra=true){
        if ( item && regra ) {
            formData.append(title, item);
        }
      }

      handleSubmitUpdate() {

        const formData = new FormData();

        formData.append('name', this.state.titulo);
        formData.append('mes', this.state.mes);
        this.validateAddForm(formData,'path',this.state.path);
        this.validateAddForm(formData,'file',this.state.file);

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }


        api.put(`/prestacao/${this.state.id}`, formData, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({titulo: ''});
            this.photos.current.resetFiles();
            setTimeout(() => {
                window.location = '/prestacao';
            }, 1500);

        }).catch((error) => {
            // console.log(error, error.response);
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                this.container.current.alertDanger();  
            }
        });
      }

      deleteFile(){
        api.delete(`/prestacao/image/${this.state.id}/${this.state.file}/${this.state.fileExt}`, {}, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({file: undefined});

        }).catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                window.location = "/auth";
            } else{
                this.container.current.alertDanger();  
            }
        });
      }
    

    render(){
        console.log(this.meses);
            let form = <Form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="id" value={this.state.id}/>
                            <Row>
                                <Col>
                                    <Label for="email">Título</Label>
                                    <Input value={this.state.titulo} onChange={this.handleChange} type="text" name="titulo" id="titulo" placeholder="Digite o Título do Prestação" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input value={this.state.mes} onChange={this.handleChange} type="select" name="mes" id="mes">
                                        {
                                            this.meses.map( ( value,index ) => {
                                                let mes = this.state.mes != null ? this.state.mes : this.mesAtual;
                                                const selected = index+1 == mes;
                                                return <option selected={selected} value={index+1}>{value}</option>
                                            })
                                        }
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <Upload deleteFile={this.deleteFile.bind(this)} type="simple" ref={this.photos} img={this.state.id ? `${this.state.path}/${this.state.file}` : ''} key={Math.random()} />
                                </Col>
                                <Col sm={4} className='align-end-right'>
                                    <ButtonToggle type='submit' color="success">{this.state.id ? 'Atualizar' : 'Salvar'} Prestação</ButtonToggle>
                                </Col>
                            </Row>
                        </Form>;
        return  ( 
            <Fragment>
                <Nav/>
                <Container ref={this.container}  title="Criar Prestação de Contas" main={form}/>
            </Fragment>
        );
    }
}

export default PrestacaoNews;