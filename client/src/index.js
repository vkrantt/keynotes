import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// React toast
import 'react-toastify/dist/ReactToastify.css';
import NoteState from './context/notes/NoteState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NoteState>
    <App />
</NoteState>);