import React, { Fragment } from 'react';
import './contato.css';

import ContainerPages from '../components/containerPages/containerPages';

class Contato extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo="Contato" img={"Contato.png"}/>
        );
    }

    renderMain(){
        return(
            <div className="container-contatos">
                <div className="informations-contact">
                    <div className="list-card">
                        <div className="list-card-icon">
                            <object data={process.env.PUBLIC_URL + "/icons/location.svg"} type=""></object>
                        </div>
                        <div className="list-card-informations">
                            <div className="title">ENDEREÇO</div>
                            <div className="subtitle">Av. Pres. Kenedy, 417, Tucano - BA
                                <br/>
                                CEP: 48.793-000
                            </div>
                        </div>
                    </div>
                    <div className="list-card">
                        <div className="list-card-icon">
                            <object className="invert-object" data={process.env.PUBLIC_URL + "/icons/fone.svg"} type=""></object>
                        </div>
                        <div className="list-card-informations">
                            <div className="title">TELEFONE</div>
                            <div className="subtitle">(75) 3272-2247 / (75) 9 9156-1905</div>
                        </div>
                    </div>
                    <div className="list-card">
                        <div className="list-card-icon">
                        <object data={process.env.PUBLIC_URL + "/icons/mail.svg"} type=""></object>
                        </div>
                        <div className="list-card-informations">
                            <div className="title">E-MAIL</div>
                            <div className="subtitle">sindsmut@sindsmut.org.com</div>
                        </div>
                    </div>
                    <iframe src="https://maps.google.com/maps?q=Av.%20Pres.%20Kenedy,%20417,%20Tucano%20-%20BA,%2048790-000&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="form-contact">
                    <h2>ENTRE EM CONTATO</h2>
                    <form>
                        <div className="form-row-contact">
                            <input type="text" id="name" placeholder="Seu Nome" />
                            <input type="text" id="email" placeholder="Seu E-mail" />
                        </div>
                        <div className="form-row-contact">
                            <input type="text" id="telefone"  placeholder="Seu Telefone"/>
                            <input type="text" id="cidade"  placeholder="Sua Cidade"/>
                        </div>
                        <div className="form-row-contact">
                            <input type="text" id="assunto"  placeholder="Assunto"/>
                        </div>
                        <div className="form-row-contact">
                            <textarea name="" id="msg" rows="5" placeholder="Mensagem"></textarea>
                        </div>
                        <div className="form-row-contact">
                            <button type="button"> Enviar </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Contato;