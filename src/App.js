import './App.css';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div id="main-box" className="mt-5">
        <Container fluid="lg">
          <Row className="align-items-center">
            <Col className="col-1">
              <img src="https://zoombies.world/images/avatars/frog.png" alt="" width="100%" />
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
              <img src="https://zoombies.world/images/zoombies_coin.svg" alt="" width="16%" />
              <span className="all-text"> 45,000,455</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/mr-icon.png" alt="" width="16%" />
              <span className="all-text"> 100.345</span>
            </Col>
            <Col className="col-1">
              <span className="all-text">Chat</span>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
