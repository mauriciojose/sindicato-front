import React from 'react';
import './menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/fontawesome-free-brands';

import Nav from '../navNew/navNew';

class Menu extends React.Component{
    render(){
        return(
            <section>
                <header className="menu">
                    <div className="menu-logo">
                    <div className="imoge">
                            <a href="https://wa.me/5575991561905" target="_blank"> <FontAwesomeIcon style={{ color: "#25D366" }} className ='font-awesome' icon={faWhatsapp} /> </a>
                            <a href="https://www.facebook.com/sindsmut" target="_blank"> <FontAwesomeIcon style={{ color: "#3b5998" }} className ='font-awesome' icon={faFacebook} /> </a>
                            <a href=""> <FontAwesomeIcon style={{ color: "red" }} className ='font-awesome' icon={faYoutube} /> </a>
                            {/* <a href=""> <FontAwesomeIcon style={{ color: "#00acee" }} className ='font-awesome' icon={faTwitter} /> </a> */}
                            <a href="instagram://user?username=sindsmut" target="_blank"> {this.getInstagram()} </a>
                            
                        </div>
                        <img className="img-menu" onClick={()=>{ window.location='/' }} src={process.env.PUBLIC_URL + "/logo-SINDSMUT.png"} alt=""></img>
                        <div className="filie">
                            <a className="filie-a" href=""><img className="img-filie" src={process.env.PUBLIC_URL + '/botao_filiacao.png'} alt="" /></a>
                            <a className="filie-a" href=""><img className="img-filie" src={process.env.PUBLIC_URL + '/botao_pesquisar.png'} alt="" /></a>
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