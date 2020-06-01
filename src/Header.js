import React from 'react';
import './App.css';

const Header = (props) => {
    return (
        <nav style={{ textAlign: "center" }}>
            <div>
                <a href="/" className="size">To Do List</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><button className="margin" onClick={props.toggleThemeDefault}>THEME DEFAULT</button></li>
                    <li><button className="margin" onClick={props.toggleThemeLight}>THEME LIGHT</button></li>
                    <li><button className="margin" onClick={props.toggleThemeDark}>THEME DARK</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;