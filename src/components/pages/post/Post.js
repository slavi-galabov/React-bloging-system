import React, {Component} from 'react';
import {NotificationManager} from 'react-notifications'
import config from '../../../config'
import user_helper from '../../../helpers/user'
import ActionButtons from '../../common/ActionButtons'

class Post extends Component {

    constructor(props) {
        super(props)

        let post_id = this.props.match.params.id
        let posts = JSON.parse(window.localStorage.getItem('posts'))
        let post_index = posts.findIndex((post => post.id === post_id));
        let post = posts[post_index]
        if (!window.sessionStorage.getItem('username') || !post) {
            this.props.history.push('/')
        }
        this.state = {
            form: {},
            posts,
            post,
            post_index,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        document.title = `${post.title} | ${config.siteName}`
    }

    clearForm = () => {
        document.getElementById("comment-form").reset();
        this.setState({
            form: {}
        })
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
        if (!form.description) {
            NotificationManager.error('Comment description is required!', 'Error')
        } else {
            let today = new Date().toJSON().slice(0, 10)
            let comment = {
                "username": window.sessionStorage.getItem('username'),
                "description": form.description,
                "date": today
            }

            this.state.posts[this.state.post_index].comments.unshift(comment);
            window.localStorage.setItem('posts', JSON.stringify(this.state.posts))
            this.clearForm()
            NotificationManager.success('', `Comment created successfully!`)
            this.props.history.push(`/post/${this.state.post.id}`)
        }
    }

    render() {
        let comments = this.state.post.comments.map((comment, i) => (
            <div key={i.toString()} className="col-sm-12">
                <div className="well">
                    <p>{comment.description}</p>
                    {user_helper.getFullName(comment.username)} 
                    <time dateTime={comment.date}> {comment.date}</time>
                </div>
            </div>
        ));

        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <hr/>
                <p>{this.state.post.description}</p>
                {user_helper.getFullName(this.state.post.author)} 
                <time dateTime={this.state.post.date}> {this.state.post.date}</time>
                <div className="clearfix"></div>
                <ActionButtons post={this.state.post} post_index={this.state.post_index} editText="Edit"
                               deleteText="Delete" history={this.props.history}/>
                <br/>
                <form id="comment-form">
                    <div className="form-group">
                        <label htmlFor="description">Enter your comment below:</label>
                        <textarea name="description" id="description" rows="5" onChange={this.handleChange}
                                  className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-default">Send</button>
                    </div>
                </form>
                <div className="row">
                    <br/>
                    {comments}
                </div>
            </div>
        );
    }
}

export default Post;