import React,{Component} from 'react';
import './App.css';
import AppContainer from '../Containers/AppContainer.js'

class App extends Component{
  
  render(){
    return (
    <div className="App">
      <header className="App-header">
      <header>       
        <p className='p1' align='center'>
            <b>MUSIQUE</b>
        </p>
        <p className='p3'>
          <b>LISTEN MUSIC ONLINE FOR FREE</b>
        </p>
        </header>
          <AppContainer />
      </header>
    </div>
  );
  }
  
}

export default App;
