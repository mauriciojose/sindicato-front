import React from 'react';
import ReactDOM , { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css';

import Home from './pages//home/home';
import Gallery from './pages/gallery/gallery';
import FormGallery from './pages/gallery/formGallery';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/gallery" exact={true} component={Gallery} />
      <Route path="/gallery/create" component={FormGallery} />
    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);

