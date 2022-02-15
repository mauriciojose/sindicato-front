import React from 'react';
import './nav.css';

import DropDown from '../dropdown/dropdown';
import Hamburger from '../hamburger/hamburger';

class Nav extends React.Component{
    render(){
        return(
            <section className="menu">
            <nav className="menu-container">
                <a href="#" className="menu-btn">
                    <Hamburger />
                </a>
                <div className="menu-slide">
                    <ul>
                        <li className="menu-item"> <DropDown title="O Sindicato" itensLinks={this.getItensSindicato()} /> </li>
                        <li className="menu-item"><a href="">Noticias</a></li>
                        {/* <li className="menu-item"><a href="/servicos"> Serviços</a></li> */}
                        <li className="menu-item"><a href="/gallery/"> Galeria</a></li>
                        {/* <li className="menu-item"><a href=""> Parceiros</a></li> */}
                        <li className="menu-item"><a href="/contato/"> Contato</a></li>
    
                    </ul>
                </div>
            </nav>
        </section>
        );
    }

    getItensSindicato(){
        return [
            {
                title: "Diretoria",
                href: "/diretoria"
            },
            {
                title: "Estatuto",
                href: "/diretoria"
            },
            // {
            //     title: "Regime Interno",
            //     href: "/diretoria"
            // }
        ];
    }
}

export default Nav;