import React from 'react';
import './menu.css';

import Nav from '../navNew/navNew';
import "../../css/fontawesome/fontawesome-free-5.15.4-web/css/all.min.css";

class Menu extends React.Component{
    render(){
        return(
            <section>
                <header className="menu">
                    <div className="menu-logo">
                    <div className="imoge">
                            <a href="https://www.facebook.com/sindsmut" target="_blank"> 
                                {/* <img src={process.env.PUBLIC_URL + "/icons/2.png"} alt="" /> */}
                                <i class="fab fa-facebook-square"></i>
                            </a>
                            <a href="https://wa.me/5575991561905" target="_blank"> 
                                {/* <img src={process.env.PUBLIC_URL + "/icons/4.png"} alt="" /> */}
                                <i class="fab fa-whatsapp-square"></i>
                                
                            </a>
                            <a href="https://www.youtube.com/c/sindsmut" target="_blank">
                            {/* <img src={process.env.PUBLIC_URL + "/icons/1.png"} alt="" /> */}
                                <i class="fab fa-youtube-square diminuir"></i>
                            </a>
                            <a href="https://www.instagram.com/sindsmut/" target="_blank">
                                {/* <img src={process.env.PUBLIC_URL + "/icons/3.png"} alt="" /> */}
                                <i class="fab fa-instagram-square"></i>
                            </a>
                            
                        </div>
                        <div className="img-menu">
                            <img className="img-menu-img" onClick={()=>{ window.location='/' }} src={process.env.PUBLIC_URL + "/logo-SINDSMUT.png"} alt=""></img>
                        </div>
                        <div className="filie">
                            <a className="filie-a" href="/login">ÁREA DO FILIADO</a>
                            <a className="filie-a" href="/filieses">FILIE-SE</a>
                        </div>
                    </div>
                </header>
                <Nav />
            </section>
        );
    }

    getInstagram(){
        return(
            <svg style={{ fontSize: '2em' }} className="svg-inline--fa fa-w-14 font-awesome" width="100%" height="100%" viewBox="0 0 200 200">
        <defs>
            <linearGradient id="gradient1" x1=".8" y1=".8" x2="0">
                <stop offset="0" stop-color="#c92bb7"/>
                <stop offset="1" stop-color="#3051f1"/>
            </linearGradient>
            <radialGradient id="gradient2" cx=".2" cy="1" r="1.2">
                <stop offset="0" stop-color="#fcdf8f"/>
                <stop offset=".1" stop-color="#fbd377"/>
                <stop offset=".25" stop-color="#fa8e37"/>
                <stop offset=".35" stop-color="#f73344"/>
                <stop offset=".65" stop-color="#f73344" stop-opacity="0" />
            </radialGradient>
            <rect id="logoContainer" x="0" y="0" width="200" height="200" rx="50" ry="50" />
        </defs>

        <use xlinkHref="#logoContainer" fill="url(#gradient1)" />
        <use xlinkHref="#logoContainer" fill="url(#gradient2)" />

        <rect x="35" y="35" width="130" height="130" rx="30" ry="30"
              fill="none" stroke="#fff" stroke-width="13" />
        <circle cx="100" cy="100" r="32"
                fill="none" stroke="#fff" stroke-width="13" />
        <circle cx="140" cy="62" r="9" fill="#fff"/>
    </svg>
        );
    }
}

export default Menu;