import React, {Component} from 'react'
import {NotificationManager} from 'react-notifications'
import config from '../../config'
import observer from '../../observer/observer'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        if (window.sessionStorage.getItem('username')) {
            this.props.history.push('/')
        }
        this.state = {
            form: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        document.title = `Login | ${config.siteName}`;
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {}
        newObj[name] = value
        this.setState({
            form: Object.assign(this.state.form, newObj)
        })
    }

    handleSubmit() {
        let form = this.state.form
        let user = config.users.find(user => user.username === form.username && user.password === form.password)

        if (user) {
            observer.onLogin()
            window.sessionStorage.setItem('username', user.username)
            NotificationManager.success('Welcome ' + user.full_name, 'You are logged in!')
            this.props.history.push('/all-posts')
        } else {
            NotificationManager.error('invalid username or password!', 'Error')
        }
    }

    render() {
        return (
            <form>
                <h1>Log in</h1>
                <hr/>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} className="form-control"
                           id="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} className="form-control"
                           id="password"/>
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
            </form>
        )
    }
}

export default LoginForm