import React from 'react';
import './App.css';
import NetworkGraph from "./components/Chart1";

// NOTE: CSS styling using 'className' needs to be in react elements, not components
// NOTE: each time I write a method using setState(), I need to bind it to the class inside constructor!!
//          like this: this.handleIncreaseClick = this.handleIncreaseClick.bind(this);


// NOTE: Formik library - complete forms for React

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

/*
    class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            isFriendly: false,
            gender: "",
            favouriteColor: "Red"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // To avoid some nasty bugs we use this
        const {type, checked, name, value} = event.target;
        // If I want to use string from variable as a key, I need to wrap it in square brackets
        (type === "checkbox") ? this.setState({[name]: checked}) : this.setState({[name]: value});
    }

    render() {
        return (
            <form className="forms">
                <input
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    value={this.state.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                />
                <textarea
                    className="inputWindow"
                    placeholder="Some placeholder"
                    onChange={this.handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        name={"isFriendly"}
                        checked={this.state.isFriendly}
                        onChange={this.handleChange}
                    />
                    Is friendly?
                </label>

                <br/>
                <label>
                    <input
                        type="radio"
                        name={"gender"}
                        value={"male"}
                        checked={this.state.gender === "male"}
                        onChange={this.handleChange}
                    />
                    male
                </label>
                <br/>
                <label>
                    <input
                        type="radio"
                        name={"gender"}
                        value={"female"}
                        checked={this.state.gender === "female"}
                        onChange={this.handleChange}
                    />
                    female
                </label>

                <select
                    value={this.state.favouriteColor}
                    name={"favouriteColor"}
                    onChange={this.handleChange}
                >
                    <option value={"Red"}>Red</option>
                    <option value={"Gay"}>Gay</option>
                    <option value={"Green"}>Green</option>
                </select>

                <h2>{this.state.favouriteColor}</h2>
            </form>
        )
    }
}
 */