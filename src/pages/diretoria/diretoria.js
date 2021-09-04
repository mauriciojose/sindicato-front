import React, { Fragment } from 'react';
import './diretoria.css';

import ContainerPages from '../components/containerPages/containerPages';
import CardPessoa from '../components/card_diretoria/card_diretoria';

class Diretoria extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Diretoria" img="diretoria-banner.png" />
        );
    }

    renderMain(){
        return(
            <CardPessoa></CardPessoa>
        );
    }

}

export default Diretoria;