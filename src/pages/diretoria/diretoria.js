import React, { Fragment } from 'react';
import './diretoria.css';

import ContainerPages from '../components/containerPages/containerPages';

class Diretoria extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Diretoria" />
        );
    }

    renderMain(){
        return(
            <Fragment>
                <h3>Coordenação Geral do Sindipetro Bahia</h3>
                <p><strong>Jairo Batista</strong></p>
                <h3>Composição da Diretoria Executiva do Sindipetro Bahia</h3>
                <p><strong>André Araújo e Elizabete Sacramento</strong><br/> <em>Administrativo/Financeiro</em></p>
                <p><strong>David Leal e Agnaldo dos Anjos</strong><br/> <em>Secretaria/Jurídico</em></p>
                <p><strong>Paulo Cesar Martin e Francisco Ramos</strong><br/> <em>Seguridade</em></p>
                <p><strong>Luciomar Machado e Radiovaldo Costa&nbsp;<span>(licenciado)</span></strong><br/> <em>Comunicação/ Formação</em></p>
                <p><strong>Adson Conceição e Luiz Matos</strong><br/> <em>Setor Privado</em></p>
                <p><strong>João Marcos e Gilberto Silva</strong><br/> <em>SMS/Esporte, Cultura e Lazer</em></p>
                <p><strong>Jorge Braga e Christiane Petersen Barroso</strong><br/> <em>Relações Intersindicais/Políticas Específicas</em></p>
            </Fragment>
        );
    }

}

export default Diretoria;