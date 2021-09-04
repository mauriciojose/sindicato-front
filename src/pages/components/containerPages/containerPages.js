import React, { Fragment } from 'react';
import './containerPages.css';

import Menu from '../menu/menu';
import Footer from '../footer/footer';

class ContainerPages extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){
        let subtitle = this.props.subtitle ? <Fragment><br/>{this.props.subtitle}</Fragment> : <Fragment></Fragment>;
        return(
            <div>
                <Menu/>
                <div className="containerPages">
                    <header>
                        <img loading="lazy" src={this.props.img ? process.env.PUBLIC_URL +"/"+ this.props.img : process.env.PUBLIC_URL + "/sp_banner.jpg"} alt=""/>
                        <span>{this.props.titulo}{subtitle}</span>
                    </header>
                    <main>
                        {this.props.innerMain}
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default ContainerPages;