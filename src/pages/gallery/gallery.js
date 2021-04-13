import React from 'react';
import './gallery.css';

import Container from '../components/container/container';

import api from '../../services/api';

class Gallery extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            gallerys: []
        };
        this.getAlbuns();
    }

    render(){
        let gallery = <div className="gallery">
            {this.state.gallerys.map((album) =>
                <figure className={ this.state.gallerys.length < 2 ? 'gallery__item width' : 'gallery__item' }>
                    <img src={`${window._env_.api}/gallery/`+album.path+ "/" +album.files[0]} className="gallery__img" alt="Image 1"/>
                    <span className="description">{ album.name }</span>
                </figure>
            )}
        </div>;

        return  ( 
            <Container  title="Álbuns" main={gallery}/>
        );
    }

    async getAlbuns(){
        const headers = {
            'Content-Type': 'text/json'
        };
        api.get("/gallery",{headers}).then(res => {
            this.setState({ gallerys: res.data });

        }).catch((error) => {
            // this.container.current.alertDanger();    
        });
    }
}

export default Gallery;