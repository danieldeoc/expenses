import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Tabs from './components/tabs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <div className='boxApp'>
        <Tabs tabsNames="Registro, Histórico" />
      </div>
    </>
);

