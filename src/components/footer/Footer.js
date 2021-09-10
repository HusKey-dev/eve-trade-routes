import React from 'react';
import './Footer.scss'

function Footer(props) {
    return (
        <div className='Footer'>
            <p>{props.text}</p>
        </div>
    )
}

export default Footer;
