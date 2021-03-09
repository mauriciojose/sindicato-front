import React from 'react';
import './nav.css';

class Nav extends React.Component{
    render(){
        return(
            <section className="menu">
            <nav className="menu-container">
                <a href="#" className="menu-btn"><i className="fa fa-bars fa-lg"></i></a>
                <div className="menu-slide">
                    <ul>
                        <li className="menu-item"><a href=""> O sindicato</a></li>
                        <li className="menu-item"><a href="">Noticias</a></li>
                        <li className="menu-item"><a href=""> Serviços</a></li>
                        <li className="menu-item"><a href="/gallery"> Galeria</a></li>
                        <li className="menu-item"><a href=""> Parceiros</a></li>
                        <li className="menu-item"><a href=""> Contato</a></li>
    
                    </ul>
                </div>
            </nav>
        </section>
        );
    }
}

export default Nav;