import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ChatPanel from './ChatPanel';
import {InitNakamaClient} from './../utils/nakama';
import {JoinChatRoom} from './ChatPanel';

function showChat() {
    document.getElementById('chat-panel').style.display = "block";
    JoinChatRoom();
  }

const HeaderLoggedIn = (props) => {

    console.log("HeaderLoggedIn props:", props);

    return (
        <div>
            <Container>
                <Row className="align-items-center">
                    <Col className="col-1">
                    <img src="/assets/skull1_avatar_head.svg" alt="" width="100%" />
                    </Col>
                    <Col className="">
                    <span className="all-text">
                        {props.session.username}<br/></span>
                        <span className="player-wallet">0x343...3434</span>
                    </Col>
                    <Col className="col-2">
                    <img src="https://zoombies.world/images/gold_vip.svg" alt="" width="40%" />
                    <span className="player-level"> 12</span>
                    </Col>
                    <Col>
                    <img src="https://zoombies.world/images/mr-icon.png" alt="" width="16%" />
                    <span className="all-text">36,565 PLAYERS</span>
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
                    <span className="all-text" onClick={showChat}>Chat</span>
                    </Col>
                </Row>
            </Container>
            <ChatPanel></ChatPanel>
        </div>
    )
}

export default HeaderLoggedIn;