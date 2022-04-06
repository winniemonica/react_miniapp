import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ onNewGame }) => (
    <navbar>
        <li><h3>Memory Game</h3></li>
        <li><a onClick={onNewGame}>New Game</a></li>
    </navbar>
)

Navbar.propTypes = {
    onNewGame: PropTypes.func.isRequired
}

export default Navbar;