import React, {Component} from 'react';
import {NotificationManager} from 'react-notifications'

class NewPost extends Component {

    constructor(props) {
        super(props)
        if (!window.sessionStorage.getItem('username')) {
            this.props.history.push('/')
        }
        this.state = {
            form: {}
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        if (!form.title || !form.description) {
            NotificationManager.error('Title and description are required!', 'Error')
        } else {
            let username = window.sessionStorage.getItem('username')
            let id = Math.random().toString(36).substr(2, 9)
            let today = new Date().toJSON().slice(0, 10)
            let posts = JSON.parse(window.localStorage.getItem('posts'))
            let newPost = {
                "id": id,
                "title": form.title,
                "description": form.description,
                "author": username,
                "likes": [],
                "date": today,
                "comments": []
            }
            posts.unshift(newPost);

            window.localStorage.setItem('posts', JSON.stringify(posts))
            NotificationManager.success(`Post "${form.title}" created successfully!`)
            this.props.history.push('/all-posts')
        }
    }

    render() {
        return (
            <div>
                <h1>New post </h1>
                <hr/>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" autoFocus name="title" onChange={this.handleChange} className="form-control"
                               id="title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" rows="10" onChange={this.handleChange}
                                  className="form-control"></textarea>
                    </div>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-default">Save</button>
                </form>
            </div>
        )
    }
}

export default NewPost;