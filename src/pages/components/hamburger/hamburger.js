import React from 'react';
import './hamburger.css';

class Hamburger extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="content-hamburger">
                <input type="checkbox" id="hamburger"/>
                <label htmlFor="hamburger">
                    <div className="hamburger">
                    </div>
                </label>
            </div>
        );
    }
}

export default Hamburger;