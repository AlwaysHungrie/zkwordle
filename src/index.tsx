import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter } from 'react-router-dom';

function withBaseFix(HashRouter: any) {
  return class extends React.Component {
    baseElement: HTMLBaseElement;
    baseHref: string | null;
    constructor() {
      super({});
      this.baseHref = null;
      this.baseElement = document.querySelector('base') as HTMLBaseElement;
      if (this.baseElement) {
        this.baseHref = this.baseElement.getAttribute('href');
        this.baseElement.setAttribute('href', '');
      }
    }

    render() {
      return <HashRouter {...this.props}>{this.props.children}</HashRouter>;
    }

    componentDidMount() {
      if (this.baseElement && this.baseHref) {
        this.baseElement.setAttribute('href', this.baseHref);
      }
    }
  };
}

const FixedHashRouter = withBaseFix(HashRouter);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
