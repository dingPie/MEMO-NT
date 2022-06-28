import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage'
import { FbAuth } from '../../../firebase/firebase_auth_service';
import { User } from 'firebase/auth';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import Text from '../../../components/Text';


describe('Login Page Testing', () => {
  let fbAuth: FbAuth;
  let user: User | null;
  let setUser: () => void;

  beforeEach( () => {
    setUser = jest.fn();
    // user = {
    //   email: "cpie1216@gmail.com",
    //   name: "chan ha",
    //   provider: "firebase",
    //   uid: "W9uvSpetLrX4nL2rBop3vqM85lA2"
    // }
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <LoginPage
            fbAuth={fbAuth}
            user={user}
            setUser={setUser} 
          />
        </ThemeProvider>
      </MemoryRouter>
    )
  })


  it("Login Page 랜더링 테스트", () => {
  })
  
  it("Login Page Ui Check", () => {
    const title = screen.getByText("LOGIN");
    expect(title).toBeInTheDocument();
    
    const subTitle = screen.getByText("소셜 로그인으로 이용하기");
    expect(subTitle).toBeInTheDocument()
  
    const googleBtn = screen.getByText("Login With Google");
    expect(googleBtn).toBeInTheDocument();
    const githubBtn = screen.getByText("Login With Github");
    expect(githubBtn).toBeInTheDocument();

    const desc = screen.getByText(/메모 정보는Google의 Firebase에 저장됩니다. 유저 정보 또한 Firebase에 암호화되어 저장됩니다./i);
    expect(desc).toBeInTheDocument();
  })
});