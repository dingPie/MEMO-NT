import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import { FbAuth } from './firebase/firebase_auth_service';
import { FbTag } from './firebase/firestore_tag_service';
import { FbMemo } from './firebase/firestore_memo_service';
import { firebaseAuth, fireStoreDB } from './firebase/firebase_config';

const fbAuth = new FbAuth(firebaseAuth, fireStoreDB);
const fbTag = new FbTag(firebaseAuth, fireStoreDB);
const fbMemo = new FbMemo(firebaseAuth, fireStoreDB);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme ={theme} >
        <App 
          fbAuth={fbAuth}
          fbTag={fbTag}
          fbMemo={fbMemo}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
