import React, { Fragment } from 'react';
import './navNew.css';
import '../hamburger/hamburger.css';

import DropDown from '../dropdown/dropdown';
import {getRole, isAuthenticated, logout} from '../../login/auth';
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
                            <li> <a href="/">INÍCIO</a> </li>
                            { isAuthenticated() ? 
                            
                                getRole() == 'ADMIN' ? 
                                    <DropDown title="PAINEL" itensLinks={this.getItensPainel()} /> 
                                    : <li> <a href="/prestacoes">PRESTAÇÕES</a> </li>
                                : <Fragment></Fragment> 
                            
                            }
                            <DropDown title="O&nbsp;SINDICATO" itensLinks={this.getItensSindicato()} />
                            <li> <a href="/noticias">NOTÍCIAS</a> </li>
                            <li> <a href="/servicos">SERVIÇOS</a> </li>
                            <li> <a href="/gallery">GALERIA</a> </li>
                            {/* <li> <a href="">PARCEIROS</a> </li> */}
                            <li> <a href="/contato">CONTATO</a> </li>
                            <li className='right-item'>
                                {
                                   isAuthenticated() ? <a onClick={this.sair.bind(this)}> {'Sair'} </a> : <a href="/auth">Entrar</a>
                                }
                            </li>
                        </ul>
                    </nav>
            </header>
            </Fragment>
            
        );
    }

    sair(){
        logout();
        window.location = "/";
    }

    getItensSindicato(){
        return [
            {
                title: "Diretoria",
                href: "/diretoria"
            },
            {
                title: "Estatuto",
                href: "/regime/1"
            },
            {
                title: "Regime Interno",
                href: "/regime/2"
            },
            {
                title: "História",
                href: "/historia"
            }
        ];
    }

    getItensPainel(){
        return [
            {
                title: "Notícias",
                href: "/news"
            },
            {
                title: "Galeria",
                href: "/galeria"
            },
            {
                title: "Filiados",
                href: "/filiados"
            },
            {
                title: "Novos Filiados",
                href: "/filiados/novos"
            },
            {
                title: "Prestações",
                href: "/prestacao"
            }
        ];
    }
}

export default navNew;