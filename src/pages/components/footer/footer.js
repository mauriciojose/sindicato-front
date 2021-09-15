import React from 'react';
import './footer.css';
import {  } from "../../css/fontawesome/fontawesome-free-5.15.4-web/css/all.min.css";

class Footer extends React.Component{
    render(){
        return(
            <section className="footer">
                <div className="element-bigger info-sindicato">
                    <img className="footer-img" loading="lazy" src={process.env.PUBLIC_URL + "/footer_menor.png"} alt="" />
                    <div className="endereco">
                        <p>Av. Pres. Kenedy, 417<br/>Tucano - BA<br/>48.793-000
                        <br/>
                        (75) 3272-2247
                        <br/>
                        (75) 9 9156-1905
                        </p>
                    </div>
                    {/* <p>&copy;Copyright Sindismut Tucano, 2021</p> */}
                </div>
                <div className="element-smaller">
                    <a href="/"><b>O SINDICATO</b></a>
                    <a href="/servicos"><b>SERVIÇOS</b></a>
                    <a href="/noticias"><b>NOTÍCIAS</b></a>
                    <a href="/gallery"><b>GALERIA</b></a>
                    <a href="/contato"><b>CONTATO</b></a>
                </div>
                <div className="element-bigger footer-contacts">
                    <div>
                        Redes Sociais
                    </div>
                    <div className="footer-images">
                        <i class="fab fa-whatsapp-square"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-youtube-square"></i>
                    </div>
                    <div className="footer-filiese">
                        <a href="/login">
                            <b>ÁREA DO FILIADO</b>
                        </a>
                        <a href="/filiese">
                            <b>FILIESE</b>
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;