import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inicial from './Inicial';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Inicial />,
  document.getElementById('root')
);

serviceWorker.unregister();
