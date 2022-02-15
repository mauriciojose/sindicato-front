import React from 'react';
import './footer.css';
import {  } from "../../css/fontawesome/fontawesome-free-5.15.4-web/css/all.min.css";

class Footer extends React.Component{
    render(){
        return(
            <section className="footer">
                <div className="element-bigger info-sindicato">
                    <div className='clickable' onClick={() => {window.location="/"}}>
                        <object className="footer-img" data={process.env.PUBLIC_URL + "/sindicato.svg"} type=""></object>
                    </div>
                    {/* <img onClick={() => {window.location="/"}} style={{objectFit: "contain"}} className="footer-img" loading="lazy" src={process.env.PUBLIC_URL + "/footer_menor.png"} alt="" /> */}
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
                    <a href="/diretoria"><b>O SINDICATO</b></a>
                    {/* <a href="/servicos"><b>SERVIÇOS</b></a> */}
                    <a href="/noticias"><b>NOTÍCIAS</b></a>
                    <a href="/gallery/list"><b>GALERIA</b></a>
                    <a href="/contacts"><b>CONTATO</b></a>
                </div>
                <div className="element-bigger footer-contacts">
                    <div>
                        Redes Sociais
                    </div>
                    <div className="footer-images">
                        <a style={{color:"white"}} href="https://wa.me/5575991561905" target="_blank"> 
                            <i class="fab fa-whatsapp-square"></i>
                        </a>
                        <a style={{color:"white"}} href="https://www.instagram.com/sindsmut/" target="_blank"> 
                        <i class="fab fa-instagram-square"></i>
                        </a>
                        <a style={{color:"white"}} href="https://www.facebook.com/sindsmut" target="_blank"> 
                        <i class="fab fa-facebook-square"></i>
                        </a>
                        <a style={{color:"white"}} href="https://www.youtube.com/c/sindsmut" target="_blank"> 
                        <i class="fab fa-youtube-square"></i>
                        </a>
                        
                    </div>
                    <div className="footer-filiese">
                        <a href="/login">
                            <b>ÁREA DO FILIADO</b>
                        </a>
                        <a href="/filiese">
                            <b>FILIE-SE</b>
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;