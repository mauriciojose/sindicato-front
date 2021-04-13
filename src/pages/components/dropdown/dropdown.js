import React from 'react';
// import './dropdown.css';

class DropDown extends React.Component{
    constructor(props) {
        super(props);
        this.id = this.getId();
    }
    getId(){
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }
    render(){
        return(
            <li className="dropdown"> 
            <input type="checkbox" className="dropdown-check" id={`dropdown_${this.id}`} />
            <label htmlFor={`dropdown_${this.id}`}>

                <a className="title">{this.props.title}</a> 
                <span className="triangulo triangulo-para-baixo"></span> 
                <div className="dropdown-container">
                    {this.props.itensLinks.map((link) =>
                        <div className="drop-item">
                            <a href={link.href}>{link.title}</a>
                        </div>
                    )}
                </div>

            </label>
        </li>
        );
    }
}

export default DropDown;