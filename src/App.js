import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {NotificationContainer} from 'react-notifications'
import config from './config'
import seeder from './seeders/seeder'
import observer from './observer/observer'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

import Home from './components/pages/Home'
import LoginForm from './components/pages/LoginForm'
import AllPosts from './components/pages/post/AllPosts'
import NewPost from './components/pages/post/NewPost'
import EditPost from './components/pages/post/EditPost'
import Post from './components/pages/post/Post'
import NotFound from './components/pages/NotFound'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css'


class App extends Component {

    constructor(props) {
        super(props)
        if (!window.localStorage.getItem('posts')) {
            window.localStorage.setItem('posts', JSON.stringify([]))
            seeder.postSeeder()
        }

        this.state = {
            loggedIn: false,
        };
        observer.onLogin = this.onLogin.bind(this)
        this.onLogout = this.onLogout.bind(this)
        document.title = config.siteName
    }

    onLogin() {
        if (!window.sessionStorage.getItem('username')) {
            return
        }
        this.setState = {
            loggedIn: true,
        }
    }

    onLogout() {
        this.setState = {
            loggedIn: false,
        }
        window.sessionStorage.removeItem('username')
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Header loggedIn={window.sessionStorage.getItem('username') !== null} onLogout={this.onLogout}/>
                <NotificationContainer/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={LoginForm}/>

                        <Route path="/all-posts" component={AllPosts}/>
                        <Route path="/new-post" component={NewPost}/>
                        <Route path="/post/:id" component={Post}/>
                        <Route path="/edit/:id" component={EditPost}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default  withRouter(App); 
