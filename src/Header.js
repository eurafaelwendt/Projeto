import React from 'react';
import './App.css';

const Header = (props) => {
    return (
        <nav className="center">
            <div>
                <a href="/" className="size">ToDo List</a>
                <button onClick={props.changeTheme}>mudar tema</button>
            </div>
        </nav>
    );
}

export default Header;