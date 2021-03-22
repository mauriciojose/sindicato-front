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

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from "draft-js-export-html";
// import { stateFromHTML } from "draft-js-import-html";

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
            editorState: EditorState.createEmpty(),
            id: this.props.match.params.id || null,
            path: null,
            file: null
        };

        this.container = React.createRef();
    
        this.handleChange = this.handleChange.bind(this); 
        this.handleChangeEditor = this.handleChangeEditor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id) {
            axios.get(`${window._env_.api}/news/${this.state.id}`)
            .then(({ data: gallery }) => {
                console.log(gallery);
                const blocksFromHTML = convertFromHTML(gallery.description);
                const content = ContentState.createFromBlockArray(blocksFromHTML);
                this.setState({
                    titulo: gallery.name,
                    editorState: EditorState.createWithContent(content),
                    id: gallery._id,
                    path: gallery.path,
                    file: gallery.file,
                    fileExt: gallery.fileExt
                });
            });
        }
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
        this.state.id ? this.handleSubmitUpdate() : this.handleSubmitCreate();
      }

      handleSubmitCreate() {

        const formData = new FormData();

        formData.append('name', this.state.titulo);

        formData.append('description', stateToHTML(this.state.editorState.getCurrentContent()));

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }

        // console.log(this.state.titulo,this.photos.current.state.files);

        axios.post(`${window._env_.api}/news`, formData, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({titulo: '',editorState: EditorState.createEmpty()});
            this.photos.current.resetFiles();

        }).catch((error) => {
            this.container.current.alertDanger();    
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
        formData.append('description', stateToHTML(this.state.editorState.getCurrentContent()));
        this.validateAddForm(formData,'path',this.state.path);
        this.validateAddForm(formData,'file',this.state.file);

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }


        axios.put(`${window._env_.api}/news/${this.state.id}`, formData, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({titulo: ''});
            this.photos.current.resetFiles();
            setTimeout(() => {
                window.location = '/news';
            }, 1500);

        }).catch((error) => {
            this.container.current.alertDanger();    
        });
      }

      deleteFile(){
        axios.delete(`${window._env_.api}/news/image/${this.state.id}/${this.state.file}/${this.state.fileExt}`, {}, {
        }).then(res => {

            this.container.current.alertSucces();
            this.setState({file: undefined});

        }).catch((error) => {
            this.container.current.alertDanger();    
        });
      }
    

    render(){
            let form = <Form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="id" value={this.state.id}/>
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
                                    <Upload deleteFile={this.deleteFile.bind(this)} type="simple" ref={this.photos} img={this.state.id ? `${this.state.path}/${this.state.file}` : ''} key={Math.random()} />
                                </Col>
                                <Col sm={4} className='align-end-right'>
                                    <ButtonToggle type='submit' color="success">{this.state.id ? 'Atualizar' : 'Salvar'} Notícia</ButtonToggle>
                                </Col>
                            </Row>
                        </Form>;
        return  ( 
            <Container ref={this.container}  title="Criar Notícia" main={form}/>
        );
    }
}

export default FormNews;