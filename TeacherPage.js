import React, { Component, component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

class TeacherPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            courseid: '',
            coursename: '',
            coursedept: '',
            coursedesc: '',
            courseroom: '',
            coursenames: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/createcourse', this.state)
            .then(response =>
                console.log("done")
            )
            .catch(error => {
                alert("Error in Course Creation! Try Again Please!")
            });
        alert("Created!")
        this.setState({ show: false })

    }

    getCourses = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/readcourses', this.state)
            .then(response =>
                //console.log(response.data)
                this.setState({ coursenames: response.data })
            )
    }


    render() {
        const { courseid, coursename, coursedept, coursedesc, courseroom, coursenames } = this.state
        var a = '0'
        return (
            <div>
                <div>
                    {
                        this.state.show ?
                            <form onSubmit={this.submitHandler} >
                                <div>
                                    <input type="text" placeholder="Enter Course ID" name="courseid" value={courseid} onChange={this.changeHandler} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Enter Course Name" name="coursename" value={coursename} onChange={this.changeHandler} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Enter Course Department" name="coursedept" value={coursedept} onChange={this.changeHandler} />
                                </div>
                                <div>
                                    <textarea type="text" rows="4" cols="23" placeholder="Enter Course Description" name="coursedesc" value={coursedesc} onChange={this.changeHandler} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Enter Course Room" name="courseroom" value={courseroom} onChange={this.changeHandler} />
                                </div>
                                <button type="submit">Create</button>
                                <br></br>
                            </form>
                            : null
                    }
                    <button onClick={() => { this.setState({ show: !this.state.show }) }}>Create New Course</button>
                </div>
                <div>
                    <form onSubmit={this.getCourses}>
                        <h4>Your Courses</h4>
                        <button type="submit">Refresh Course List</button>
                        <div>
                            <textarea type="text" rows="4" cols="23" placeholder="Your Created Courses Appear Here" name="coursenames" value={coursenames} onChange={this.changeHandler} />
                        </div>
                    </form>
                    <br></br>
                    <Link to='/AcademicPage'>
                        <button>Back</button>
                    </Link>
                </div>
            </div>
        );
    }

}

export default TeacherPage;