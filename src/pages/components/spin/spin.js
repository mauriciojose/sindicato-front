import React from 'react';
import './spin.css';

class Spin extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            this.props.type === 'container' ? this.renderContainer() : <div class="spinning-loader"></div>
        );
    }

    renderContainer(){
        return(
            <div className="container-spinning">
                <div class="spinning-loader"></div>
            </div>
        );
    }
}

export default Spin;