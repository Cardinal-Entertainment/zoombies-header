import './App.css';
import Header from './components/Header';
import Cookies from 'js-cookie';
import {Client,Session} from "@heroiclabs/nakama-js"
import {GetNakamaSession} from './components/nakama';

let session = GetNakamaSession();

function App() {

  return (
    <div className="App">
      <Header loggedIn={session}></Header>
    </div>
  );
}

export default App;
