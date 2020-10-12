import React, { Component, component } from 'react'
import axios from 'axios'
import './App.css';
import AcademicPage from './AcademicPage';


class EditDetails extends Component {
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
            company: '',
            school: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/update', this.state)
            .then(response =>
                console.log(response)
            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.log(this.state)
            });
        window.location = "/"
    }
    componentDidMount() {
        axios.post('http://localhost:8080/retrieve', this.state)
            .then(response =>
                //this.state.role.value = JSON.parse(response.data.role)
                //console.log(response.data)
                this.setState({
                    role: JSON.parse(response.data.role),
                    name: JSON.parse(response.data.name),
                    password: JSON.parse(response.data.password),
                    email: JSON.parse(response.data.email),
                    phonenumber: JSON.parse(response.data.phonenumber),
                    about: JSON.parse(response.data.about),
                    city: JSON.parse(response.data.city),
                    country: JSON.parse(response.data.country),
                    company: JSON.parse(response.data.company)
                })

            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.log("Error")
            });
    }

    render() {
        var { role, name, password, email, phonenumber, about, city, country, company } = this.state
        return (
            <div>
                <h3>Update Account</h3>
                <form onSubmit={this.submitHandler} >
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
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditDetails;