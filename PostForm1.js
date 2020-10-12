import React, { Component, component } from 'react'
import axios from 'axios'
import './App.css';
import { Link } from 'react-router-dom';

class PostForm1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/login', this.state)
            .then(response =>
                (this.state.name == JSON.parse(response.data.name) && this.state.password === JSON.parse(response.data.password) ? window.location = "/AcademicPage" : alert("Wrong"))
                //console.log(this.state.name,"->",JSON.parse(response.data.name))
            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                alert("Wrong Details")
            });
    }

    render() {
        const { name, password } = this.state
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="name" placeholder="Enter your name" value={name} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.changeHandler} />
                    </div>
                    <br></br>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <br></br>
                    <div>
                        <Link to='/Signup'>
                            <button>Signup</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm1;