import React from 'react';
import './containerPages.css';

import Menu from '../menu/menu';
import Footer from '../footer/footer';

class ContainerPages extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render(){

        return(
            <div>
                <Menu/>
                <div className="containerPages">
                    <header>
                        <img src={process.env.PUBLIC_URL + "/sp_banner.jpg"} alt=""/>
                        <span>{this.props.titulo}</span>
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