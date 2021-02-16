// Enables using JSX
// NOTE: Wherewer we are using JSX, we need to import this
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing an external file
//import MyInfo from "./components/MyInfo";

// We can wrap JSX inside a Component (function), inside JSX we can input this function as <SomeFunction/>
// NOTE: Each function can return only 1 JSX element! (possible workaround is to wrap it into <div> block)


// The first argument is "what do I want to render", second tells "where I want it to render"
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
