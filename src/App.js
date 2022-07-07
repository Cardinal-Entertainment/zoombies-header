import './App.css';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div id="main-box" className="mt-5">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col>
              <span>Priceman614</span><br/>
              0x343...3434
            </Col>
            <Col>
              <img src="https://zoombies.world/images/gold_vip.svg" alt="" width="16%" />
              <span> 12</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/mr-icon.png" alt="" width="16%" />
              <span> Moonriver Network<br/>465 PLAYERS ONLINE</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/zoombies_coin.svg" alt="" width="16%" />
              <span> 45,000,455</span>
            </Col>
            <Col>
              <img src="https://zoombies.world/images/mr-icon.png" alt="" width="16%" />
              <span> 1.345</span>
            </Col>
            <Col>
              <span>Chat</span>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
