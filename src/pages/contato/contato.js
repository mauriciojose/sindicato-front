import React, { Fragment } from 'react';
import './contato.css';

import ContainerPages from '../components/containerPages/containerPages';

class Contato extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Contato" />
        );
    }

    renderMain(){
        return(
            <Fragment>
                <p><strong>Endereço:</strong> Rua Boulevard América, 55, Jardim Baiano – Salvador-BA</p>
                <p><strong>CEP:</strong> 40050-320</p>
                <p><strong>Telefone:</strong> (71) 3034-9313</p>
                <p><strong>E-mail:</strong>&nbsp;secretaria@sindipetroba.org.br</p>
                <p>&nbsp;</p>
                <h4><strong>ASSESSORIA DE IMPRENSA</strong></h4>
                <p><strong>E-mail:</strong> imprensa@sindipetroba.org.br</p>
            </Fragment>
        );
    }

}

export default Contato;