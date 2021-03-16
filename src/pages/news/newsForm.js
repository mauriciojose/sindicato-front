import React from 'react';
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

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from "draft-js-export-html";

import axios from 'axios';

import Container from '../components/container/container';
import Upload from '../components/upload/upload';

import '../components/css/align.css'

import '../components/css/editor.css'

class FormNews extends React.Component{
    constructor(props) {
        super(props);
        this.photos = React.createRef();
        
        this.state = {
            titulo: '',
            editorState: EditorState.createEmpty()
        };

        this.container = React.createRef();
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEditor = this.handleChangeEditor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      handleChangeEditor(editorState) {
        this.setState({ editorState });
        // console.log(stateToHTML(editorState.getCurrentContent()));
      }

      handleChange(event) {
        event.preventDefault();
        this.setState({titulo: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', this.state.titulo);

        formData.append('description', stateToHTML(this.state.editorState.getCurrentContent()));

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }

        // console.log(this.state.titulo,this.photos.current.state.files);

        axios.post("http://localhost:3333/news", formData, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({titulo: ''});
            this.photos.current.resetFiles();

        }).catch((error) => {
            this.container.current.alertDanger();    
        });
      }
    

    render(){
            let form = <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Label for="email">Título</Label>
                                    <Input value={this.state.titulo} onChange={this.handleChange} type="text" name="titulo" id="titulo" placeholder="Digite o Título do Notícia" />
                                </Col>
                            </Row>
                            <Row style={{marginTop:5}}>
                                <Col>
                                    <Label for="">Conteúdo</Label>
                                    <Editor editorState={this.state.editorState} onEditorStateChange={this.handleChangeEditor} editorClassName="editor-class" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <Upload type="simple" ref={this.photos}  key={Math.random()} />
                                </Col>
                                <Col sm={4} className='align-end-right'>
                                    <ButtonToggle type='submit' color="success">Salvar Notícia</ButtonToggle>
                                </Col>
                            </Row>
                        </Form>;
        return  ( 
            <Container ref={this.container}  title="Criar Notícia" main={form}/>
        );
    }
}

export default FormNews;