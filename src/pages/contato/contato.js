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
                <p><strong>Endereço:</strong> Av. Pres. Kenedy, 417, Tucano - BA</p>
                <p><strong>CEP:</strong> 48790-000</p>
                <p><strong>Telefone:</strong> (75) 3272-2247</p>
                {/* <p><strong>E-mail:</strong>&nbsp;secretaria@sindipetroba.org.br</p> */}
                <p>&nbsp;</p>
                {/* <h4><strong>ASSESSORIA DE IMPRENSA</strong></h4> */}
                {/* <p><strong>E-mail:</strong> imprensa@sindipetroba.org.br</p> */}
            </Fragment>
        );
    }

}

export default Contato;