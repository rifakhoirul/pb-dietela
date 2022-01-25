import React, { Component } from 'react';

export default class Wave extends Component {
    render() {
        return (
            <div style={{ position: "absolute", top:0, zIndex:-1 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,288L48,266.7C96,245,192,203,288,192C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,197.3C1248,203,1344,245,1392,266.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>);
    }
}
