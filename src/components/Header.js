import React, {useState} from 'react';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderNotLogged from './HeaderNotLogged';



const Header = (props) => {

   console.log("Header got props:", props);
    const [nakamaLoggedIn, setNakamaLoggedIn] = useState(props.loggedIn);

    return (
        <div>
            <div id="main-box" className="mt-1 position-absolute top-0 start-50 translate-middle-x">
                {nakamaLoggedIn && <HeaderLoggedIn session={props.loggedIn} />}
                {nakamaLoggedIn ? null : <HeaderNotLogged />}
            </div>
      </div>
    );
};

export default Header;