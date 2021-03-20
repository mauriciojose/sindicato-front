import React, { Fragment } from 'react';
import './upload.css'

import Dropzone from '../dropzone/dropzone'

import Progress from '../progress/progress'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import SweetAlert from 'react-bootstrap-sweetalert';

class Upload extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgress: {},
          successfullUploaded: false,
          modal: false,
          imageAtual: '',
          message: false
        };
    
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.resetFiles = this.resetFiles.bind(this);
      }

      resetFiles(){
        this.setState({ files: [] });
      }
    
      onFilesAdded(files) {
        if (this.props.type=='simple') {
          let filesNew = [];
          filesNew.push(files[0]);
          this.setState(prevState => ({
            files: filesNew
          }));
        } else {
          this.setState(prevState => ({
            files: prevState.files.concat(files)
          }));
        }
        
      }
    
      async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
          promises.push(this.sendRequest(file));
        });
        try {
          await Promise.all(promises);
    
          this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
          // Not Production ready! Do some error handling here instead...
          this.setState({ successfullUploaded: true, uploading: false });
        }
      }
    
      sendRequest(file) {
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
    
          req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
              const copy = { ...this.state.uploadProgress };
              copy[file.name] = {
                state: "pending",
                percentage: (event.loaded / event.total) * 100
              };
              this.setState({ uploadProgress: copy });
            }
          });
    
          req.upload.addEventListener("load", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy });
            resolve(req.response);
          });
    
          req.upload.addEventListener("error", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "error", percentage: 0 };
            this.setState({ uploadProgress: copy });
            reject(req.response);
          });
    
          const formData = new FormData();
          formData.append("file", file, file.name);
    
          req.open("POST", "http://localhost:8000/upload");
          req.send(formData);
        });
      }
    
      renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
          return (
            <div className="ProgressWrapper">
              <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
              <img
                className="CheckIcon"
                alt="done"
                src="baseline-check_circle_outline-24px.svg"
                style={{
                  opacity:
                    uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }}
              />
            </div>
          );
        }
      }

    render(){
        return (
            <div className="Upload">
                <div className="titleUpload">
                  <span className="Title">Selecione as Fotos</span>
                  <a className="visualizar" onClick={this.toggle}>Visualizar as Fotos</a>
                </div>
                <div className="Content">
                  <div>
                      <Dropzone type={this.props.type}
                      onFilesAdded={this.onFilesAdded}
                      disabled={this.state.uploading || this.state.successfullUploaded}
                      />
                  </div>
                  <div className="Files">
                      {this.state.files.map(file => {
                      return (
                          <div key={file.name} className="Row">
                          <span className="Filename">{file.name}</span>
                          {this.renderProgress(file)}
                          </div>
                      );
                      })}
                  </div>
                </div>

                {this.state.message ? this.onMessageDeleteFile() : <Fragment></Fragment>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} className='modalFotos'>
                  <ModalHeader toggle={this.toggle}>Fotos</ModalHeader>
                  <ModalBody>
                    <div style={{width: '100%',height: '68%', position: 'relative'}}>
                      <div onClick={this.setMessageState.bind(this)} title="Remover Imagem" className="btn-lixeira" style={{display: 'flex',alignItems:'center', justifyContent:'center', width: '50px',height: '50px', position: 'absolute',background:'red',right:'-8px',top:'-8px', borderRadius: '40px'}}>
                        <FontAwesomeIcon style={{ color: "#fff" }} className ='font-awesome' icon={faTrash} />
                      </div>
                      <img style={{width: '100%',height: '68%'}} src={`http://localhost:3333/news/${this.props.img}`} alt=""/>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button color="danger" onClick={this.toggle}>Fechar</Button>
                  </ModalFooter>
                </Modal>

            </div>
          ); 
    }

    setMessageState(){
      this.setState({message: true});
    }
    onCancel(){
      this.setState({message: false});
    }

    onMessageDeleteFile(){
      return (
        <SweetAlert
        warning
        showCancel
        confirmBtnText="Sim, Remover!"
        confirmBtnBsStyle="danger"
        title="Deseja Realmente Remover a Imagem?"
        onConfirm={this.props.deleteFile}
        onCancel={this.onCancel.bind(this)}
        focusCancelBtn
      >
        A imagem será removida permanentemente do sistema!
      </SweetAlert>
      );
    }

    toggle = () => this.setState({ modal: !this.state.modal });
}

export default Upload;