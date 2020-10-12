import React from 'react';
import './App.css';
import Signup from './Signup';
import PostForm1 from './PostForm1';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AcademicPage from './AcademicPage';
import Home from './Home';
import EditDetails from './EditDetails';
import StudentPage from './StudentPage';
import TeacherPage from './TeacherPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Home />
                <Switch>
                    <Route path="/" exact component={PostForm1} />
                    <Route path="/Signup" exact component={Signup} />
                    <Route path="/AcademicPage" exact component={AcademicPage} />
                    <Route path="/EditDetails" exact component={EditDetails} />
                    <Route path="/StudentPage" exact component={StudentPage} />
                    <Route path="/TeacherPage" exact component={TeacherPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
