import React, { Fragment } from 'react';
import './regime.css';

import ContainerPages from '../components/containerPages/containerPages';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

class Regime extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <ContainerPages innerMain={this.renderMain()} titulo={this.props.match.params.tipo == 2 ? "Regime Interno" : "Estatuto"}  img="diretoria-banner.png" />
        );
    }

    renderMain(){
        return(
            <div className="informations-pages">
                <p> Clique aqui e faça o download do {this.props.match.params.tipo == 2 ? "Regime Interno" : "Estatuto"}. </p>
                <br/>
                {/* <br/> */}
                <a className="regime" download href={process.env.PUBLIC_URL + '/ESTATUTO.pdf'} style={{display:'flex', alignItems:'center', cursor:'pointer'}}> 
                    <div>
                        <FontAwesomeIcon style={{ color: "#cdcdcd", fontSize:'2.2em' }} className ='font-awesome' icon={faFileDownload} />
                    </div>
                    <h5 style={{display:'flex', alignItems:'center', marginBottom:'0'}}>&nbsp;&nbsp;Estatuto&nbsp;</h5>
                    <p style={{display:'flex', alignItems:'center', marginBottom:'0',color:'#cecece',fontSize:'.7em'}}>(* clique para fazer o download)</p>
                </a>
            </div>
        );
    }

}

export default Regime;