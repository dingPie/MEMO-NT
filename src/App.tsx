import React from 'react';
import Popup from './components/Popup';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
        <Popup 
          title='테스트 팝업'
        >
        </Popup>
    </div>
  );
}

export default App;
