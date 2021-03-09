import React from 'react';
import './articles.css';

class Articles extends React.Component{
    render(){
        
        return(
            <section class="noticias">
                <h3 class="titulo-principal"> {this.props.titulo} </h3>
                { this.props.component }
            </section>
        );
    }

}

export default Articles;