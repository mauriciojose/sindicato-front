import React, { Fragment } from 'react';
import './container.css';

import Alert from '../alerts/alert';

class Container extends React.Component{
    constructor(props) {
        super(props);
        this.alerts = React.createRef();
        this.alertSucces  = this.alertSucces;
        this.alertWarning = this.alertWarning;
        this.alertDanger  = this.alertDanger;
        this.alertInfo    = this.alertInfo;
    }
    render(){
        // let news = this.props.data;
        return  ( 
            <div className="container-syndicate">
                <Alert  ref={this.alerts} />
                <div className="inner-cointener">
                    <header>
                        <h1>{ this.props.title }</h1>
                    </header>
                    <main>
                        { this.props.main }
                    </main>
                    {
                        this.props.footer ? <footer>{this.props.footer}</footer> : <Fragment></Fragment>
                    }
                </div>
            </div>
        );
    }
    alertSucces(){
        this.alerts.current.addAlert('success');
    }
    alertWarning(){
        this.alerts.current.addAlert('warning');
    }
    alertDanger(){
        this.alerts.current.addAlert('danger');
    }
    alertInfo(){
        this.alerts.current.addAlert('info');
    }
}

export default Container;