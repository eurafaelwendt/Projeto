import React from 'react';
import './App.css';

const Header = () => {
    return (
        <nav style={{textAlign:"center"}}>
            <div>
                <a href="/" className="size">To Do List</a>
            </div>
        </nav>
    );
}

export default Header;