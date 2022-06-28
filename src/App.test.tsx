import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App'
import { FbAuth } from './firebase/firebase_auth_service';
import { firebaseAuth, fireStoreDB } from './firebase/firebase_config';
import { FbMemo } from './firebase/firestore_memo_service';
import { FbTag } from './firebase/firestore_tag_service';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';



describe('App', () => {
  let fbAuth: FbAuth;
  let fbTag: FbTag;
  let fbMemo: FbMemo;

  beforeEach(() => {
    // fbAuth = new FbAuth(firebaseAuth, fireStoreDB)
  })

  it("App 첫 테스트", () => {
    // render(
    //   <MemoryRouter>
    //     <ThemeProvider theme={theme}>
    //       <App fbAuth={fbAuth} fbTag={fbTag} fbMemo={fbMemo} />
    //     </ThemeProvider>
    //   </MemoryRouter>
    // );
  })
});