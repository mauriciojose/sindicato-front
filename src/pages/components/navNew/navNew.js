import React, { Fragment } from 'react';
import './navNew.css';
import '../hamburger/hamburger.css';

import DropDown from '../dropdown/dropdown';
// import Hamburger from '../hamburger/hamburger';

class navNew extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Fragment>
                <input type="checkbox" id="hamburger"/>
                <label htmlFor="hamburger" className="hamburger-label">
                    <div className="hamburger">
                    </div>
                </label>
                <header className="menu-nav">
                    <nav>
                        <ul>
                            <DropDown title="O&nbsp;SINDICATO" itensLinks={this.getItensSindicato()} />
                            <li> <a href="">NOTÍCIAS</a> </li>
                            <li> <a href="/servicos">SERVIÇOS</a> </li>
                            <li> <a href="/gallery">GALERIA</a> </li>
                            <li> <a href="">PARCEIROS</a> </li>
                            <li> <a href="/contato">CONTATOS</a> </li>
                        </ul>
                    </nav>
            </header>
            </Fragment>
            
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
            {
                title: "Regime Interno",
                href: "/diretoria"
            }
        ];
    }
}

export default navNew;