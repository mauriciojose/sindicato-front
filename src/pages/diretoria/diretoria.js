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
            <div className="informations-pages">
                <h3>DIRETORIA EXECUTIVA DO SINDSMUT</h3>
                <p>
                    <strong>GALTIERE CAVALCANTE DA SILVA</strong>
                    <br/>
                    <em>PRESIDENTE</em>
                </p>
                <p>
                    <strong>GREGÓRIO LUIS DE JESUS</strong>
                    <br/>
                    <em>VICE-PRESIDENTE</em>
                </p>
                <p>
                    <strong>ADRIANA APARECIDA LIMA SILVA</strong>
                    <br/>
                    <em>1º DIRETOR DE ADMINISTRAÇÃO E PLANEJAMENTO</em>
                </p>
                <p>
                    <strong>JOSE DARCIO SILVA DE SOUZA</strong>
                    <br/>
                    <em>2º DIRETOR DE ADMINISTRAÇÃO E PLANEJAMENTO</em>
                </p>
                <p>
                    <strong>CARLOS SERGIO MEIRELES DA SILVA</strong>
                    <br/>
                    <em>1º DIRETOR DE FINANÇAS E PATRIMÔNIO</em>
                </p>
                <p>
                    <strong>ADAILTON PEREIRA DOS SANTOS</strong>
                    <br/>
                    <em>2º DIRETOR DE FINANÇAS E PATRIMÔNIO</em>
                </p>
                <p>
                    <strong>ANDREA DE JESUS MEIRELES</strong>
                    <br/>
                    <em>DIRETOR DE COMUNICAÇÃO SOCIAL, DESPORTOS, CULTURA, RAÇA E GÊNERO</em>
                </p>
                <p>
                    <strong>ZANONI LOPES DO CARMO CARVALHO</strong>
                    <br/>
                    <em>DIRETOR DE ASSUNTOS PREVIDENCIÁRIOS, JURÍDICOS, FORMAÇÃO SINDICAL E RELAÇÕES DO TRABALHO</em>
                </p>
                <h3>CONSELHO FISCAL</h3>
                <p>
                    <strong>TITULARES</strong>
                    <br/>
                    <span>José Jandilson Marques</span>
                    <br/>
                    <span>Reinaldo Macedo Nascimento</span>
                    <br/>
                    <span>Suely Mercês de Santana</span>

                    <br/>
                    <br/>

                    <strong>SUPLENTE</strong>
                    <br/>
                    <span>José Jackson Cerqueira dos Santos</span>
                </p>
                
            </div>
        );
    }

}

export default Diretoria;