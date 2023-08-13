import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserRoleProvider } from './components/UserRoleContext/UserRoleContext';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserRoleProvider>
        <App />
        <ToastContainer />
    </UserRoleProvider>
);