import React, { Fragment } from 'react';
import './gallery.css';
import './css/bootstrap.min.css';
import './css/style.css';

import Container from '../components/container/container';

import api from '../../services/api';

import Nav from '../components/navNew/navNew';

import ContainerPages from '../components/containerPages/containerPages';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
class Gallery extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            gallerys: [],
            gallerysImages: [],
            open: false
        };
        this.getAlbuns();
    }

    renderGallery(key,path,itens){
        let rows = [];
        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];
            if (index > 2) {
                break;
            }
            rows.push(<div className="gallery-item" onClick={()=>this.onClickOpenGalleryModal(key, path)}>
                <div className="content"><img loading="lazy" src={path+element} alt=""/></div>
            </div>);
        }
        return rows;
    }

    onClickOpenGalleryModal(id, path){
        let itens = []
        for (let index = 0; index < this.state.gallerys[id].files.length; index++) {
            const element = this.state.gallerys[id].files[index];
            itens.push({
                original: `${path}${element}`,
                thumbnail: `${path}${element}`
            });
        }
        this.setState({ gallerysImages: itens, open: true });
    }

    onclickCloseGalleryModal(){
        this.setState({ open: false });
    }

    renderFlexAlbuns(itens){
        let rows = [];
        for (const key in itens) {
            if (Object.hasOwnProperty.call(itens, key)) {
                const album = itens[key];
                if (album.files.length == 0) {
                    continue;
                }
                rows.push(<Fragment>
                    <div>
                        <h5 style={{textTransform:"uppercase",margin: "30px 0px 10px 0",color:"#474a51"}}>{album.name}</h5>
                        <div className="gallery" id="gallery">
    
                            {this.renderGallery(key,album.path,album.files)}
    
                        </div>
                    </div>
    
                    <div className="separetor"></div>
                </Fragment>);
            }
        }
        return rows;
    }

    render(){

        let gallery = <div style={{width: '91%', display: "flex", alignItems: "center", flexDirection: "column"}}>
            {this.renderFlexAlbuns(this.state.gallerys)}
            {!this.state.open ? <Fragment></Fragment> : 
                
                <div className="container-gallery">
                    <div className="close-gallery" onClick={this.onclickCloseGalleryModal.bind(this)}>
                        &#10005;
                    </div>
                    <ImageGallery items={this.state.gallerysImages} />
                </div>
                
            }
        </div>  
        return  ( 
            <ContainerPages innerMain={gallery} titulo="Galerias"  img="galerias.png" />
            
        );
    }

    async getAlbuns(){
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get("/gallery",{headers}).then(res => {
            var gallery = [];
            res.data.map((album) => {
                gallery[album._id] = {
                    path:`${window._env_.storage}/gallery/`+album.path+ "/",
                    files: album.files,
                    name: album.name
                };
            })
            this.setState({ gallerys: gallery });

        }).catch((error) => {
            // this.container.current.alertDanger();    
        });
    }
}

export default Gallery;