import React from 'react';
import ReactDOM , { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.css';

import Home from './pages//home/home';
import Gallery from './pages/gallery/gallery';
import Diretoria from './pages/diretoria/diretoria';
import Servicos from './pages/servicos/servicos';
import Contato from './pages/contato/contato';

import News from './pages/news/news';

import FormGallery from './pages/gallery/formGallery';
import FormNews from './pages/news/newsForm';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />

      <Route path="/diretoria" exact={true} component={Diretoria} />
      <Route path="/servicos" exact={true} component={Servicos} />
      <Route path="/contato" exact={true} component={Contato}/>

      <Route path="/gallery" exact={true} component={Gallery} />
      <Route path="/gallery/create" component={FormGallery} />

      <Route path="/news" exact={true} component={News} />
      <Route path="/news/create" exact={true} component={FormNews} />
      <Route path="/news/edit/:id" exact={true} component={FormNews} />
    </Switch>
  </BrowserRouter>
  ,document.getElementById('root')
);

