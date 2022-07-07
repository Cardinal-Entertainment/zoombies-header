import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import ChatPanel from './components/ChatPanel';
import {nakamaClient} from './utils/nakama';

function App() {
  return (
    <div className="App">
      <div id="main-box" className="mt-1 position-absolute top-0 start-50 translate-middle-x">
        <Container>
          <Row className="align-items-center">
            <Col className="col-1">
              <img src="/assets/skull1_avatar_head.svg" alt="" width="100%" />
            </Col>
            <Col className="">
              <span className="all-text">
                Priceman614<br/></span>
                <span className="player-wallet">0x343...3434</span>
            </Col>
            <Col className="col-2">
              <img src="https://zoombies.world/images/gold_vip.svg" alt="" width="40%" />
              <span className="player-level"> 12</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/mr-icon.png" alt="" width="16%" />
              <span className="all-text">465 PLAYERS</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/zoombies_coin.svg" alt="" width="26%" />
              <span className="all-text">45,000,455</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/mr-icon.png" alt="" width="26%" />
              <span className="all-text">100.345</span>
            </Col>
            <Col className="col-1">
              <span className="all-text">Chat</span>
            </Col>
          </Row>
        </Container>
      </div>
      <ChatPanel></ChatPanel>
    </div>
  );
}

export default App;
