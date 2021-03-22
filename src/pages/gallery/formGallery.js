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

import axios from 'axios';

import Container from '../components/container/container';
import Upload from '../components/upload/upload';

import '../components/css/align.css'

class FormGallery extends React.Component{
    constructor(props) {
        super(props);
        this.photos = React.createRef();
        this.state = {
            titulo: ''
        };

        this.container = React.createRef();
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
      
        // axios.get(`/api/users/${params.userId}`)
        //   .then(({ data: user }) => {
        //     console.log('user', user);
      
        //     this.setState({ user });
        //   });
      }
      

      handleChange(event) {
        this.setState({titulo: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', this.state.titulo);

        let files = this.photos.current.state.files;
        for (const key of Object.keys(files)) {
            formData.append('photos', files[key]);
        }

        axios.post(`${window._env_.api}/gallery`, formData, {
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
                                    <Label for="email">Álbum</Label>
                                    <Input value={this.state.titulo} onChange={this.handleChange} type="text" name="titulo" id="titulo" placeholder="Digite o Nome do Álbum" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <Upload  ref={this.photos}  key={Math.random()} />
                                </Col>
                                <Col sm={4} className='align-end-right'>
                                    <ButtonToggle type='submit' color="success">Salvar Álbum</ButtonToggle>
                                </Col>
                            </Row>
                        </Form>;
        return  ( 
            <Container ref={this.container}  title="Criar Álbum" main={form}/>
        );
    }
}

export default FormGallery;