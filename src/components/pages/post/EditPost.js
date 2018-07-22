import React, {Component} from 'react';
import {NotificationManager} from 'react-notifications'
import config from '../../../config'

class NewPost extends Component {

    constructor(props) {
        super(props)
        let post_id = this.props.match.params.id
        let posts = JSON.parse(window.localStorage.getItem('posts'))
        let post = posts.find(post => post.id === post_id)
        let username = window.sessionStorage.getItem('username')

        if (username !== post.author) {
            this.props.history.push('/')
        }
        this.state = {
            form: {
                title: post.title,
                description: post.description
            },
            post
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        document.title = `Edit | ${config.siteName}`;
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
            let posts = JSON.parse(window.localStorage.getItem('posts'))
            let post_index = posts.findIndex((post => post.id === this.state.post.id));

            posts[post_index].title = form.title
            posts[post_index].description = form.description

            window.localStorage.setItem('posts', JSON.stringify(posts))
            this.props.history.push(`/post/${this.state.post.id}`)
            NotificationManager.success('', `Post "${form.title}" updated successfully!`)
        }
    }

    render() {
        return (
            <div>
                <h1>Edit post </h1>
                <hr/>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" onChange={this.handleChange} className="form-control" id="title"
                               defaultValue={this.state.post.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" rows="10" onChange={this.handleChange}
                                  className="form-control" defaultValue={this.state.post.description}></textarea>
                    </div>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-default">Save</button>
                </form>
            </div>
        )
    }
}

export default NewPost;