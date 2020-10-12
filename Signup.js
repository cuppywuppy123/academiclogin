import React, { Component, component } from 'react'
import axios from 'axios'
import './App.css';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            role: '',
            name: '',
            password: '',
            email: '',
            phonenumber: '',
            about: '',
            city: '',
            country: '',
            company: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/users', this.state)
            .then(response =>
                console.log(response)
                //window.location = '/AcademicPage'
            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                alert("Wrong Details")
            });
    }

    render() {
        const { role, name, password, email, phonenumber, about, city, country, company } = this.state
        return (
            <div>
                <h3>Signup</h3>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="role" placeholder="Enter your designation" value={role} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Enter your name" value={name} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Enter your password" value={password} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="Enter your email" value={email} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="phonenumber" placeholder="Enter your phone number" value={phonenumber} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="about" placeholder="Enter your introduction" value={about} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="city" placeholder="Enter your city" value={city} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="country" placeholder="Enter your country" value={country} onChange={this.changeHandler} />
                    </div>
                    <div>
                        <input type="text" name="company" placeholder="Enter your company" value={company} onChange={this.changeHandler} />
                    </div>
                    <br></br>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <Link to='/'>
                    <button >Back To Login</button>
                </Link>
            </div>
        )
    }
}

export default Signup;