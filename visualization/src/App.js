import React from 'react';
import './App.css';
import NetworkGraph from "./components/NetworkGraph";

function App(props) {
    return(
        <div className={"App"}>
            <header className={"App-header"}>
                <NetworkGraph />
            </header>
        </div>
    )
}

export default App;
