import React, { Component, component } from 'react';
import './App.css';
import axios from 'axios'
import { Link } from 'react-router-dom';

class AcademicPage extends Component {
    constructor(props) {
        super(props)
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/retrieve', this.state)
            .then(response =>
                (JSON.parse(response.data.role) === 'Student' ? window.location = "/StudentPage" : window.location = "/TeacherPage")
            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.log("Error")
            });
    }

    render() {
        return (
            <div>
                <Link to='/'>
                    <button>Logout</button>
                </Link>
                <Link to='/EditDetails'>
                    <button>Update Account</button>
                </Link>
                <form onSubmit={this.submitHandler}>
                    <button type="submit">Manage Account</button>
                </form>
            </div>
        )
    }
}

export default AcademicPage;