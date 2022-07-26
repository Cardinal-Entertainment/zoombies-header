import React, {useState} from 'react';
import { GetNakamaSession } from './nakama';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderNotLogged from './HeaderNotLogged';

let session = GetNakamaSession();
console.log("APP session",session);

const Header = (props) => {

    console.log("Header props:",props, session);

    const [nakamaLoggedIn, setNakamaLoggedIn] = useState(session);

    return (
        <div>
            <div id="main-box" className="mt-1 position-absolute top-0 start-50 translate-middle-x">
                {nakamaLoggedIn && <HeaderLoggedIn session={session} />}
                {nakamaLoggedIn ? null : <HeaderNotLogged />}
            </div>
      </div>
    );
};

export default Header;