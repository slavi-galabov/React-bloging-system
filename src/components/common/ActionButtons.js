import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications'
import Modal from 'react-modal';
import user_helper from '../../helpers/user'
import config from '../../config'

class ActionButtons extends Component {
    constructor(props) {
        super(props)

        let posts = JSON.parse(window.localStorage.getItem('posts'))
        let post = this.props.post
        let username = window.sessionStorage.getItem('username')
        let isAuthor = username === this.props.post.author ? true : false
        let likeText = this.props.post.likes.indexOf(username) !== -1 ? "Remove Like" : "Like"
        let disableLikeButton = isAuthor ? 'disabled' : ''

        this.state = {
            posts,
            post,
            modalIsOpen: false,
            isAuthor,
            postDeletedEvent: false,
            disableLikeButton,
            likeText: likeText,
            likeCount: this.props.post.likes.length,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.like = this.like.bind(this)
    }

    deletePost() {
        this.state.posts.splice(this.state.post_index, 1);
        window.localStorage.setItem('posts', JSON.stringify(this.state.posts))
        NotificationManager.success(`Deleted successfully!`)
        this.setState({
            modalIsOpen: false,
        })

        if (this.props.updatePosts) {
            this.props.updatePosts();
        } else {
            this.props.history.push('/all-posts')
        }
    }

    like() {
        let username = window.sessionStorage.getItem('username')
        let posts = this.state.posts
        if (this.state.isAuthor) {
            NotificationManager.error('You can not like you own post!')
            return
        }

        if (posts[this.props.post_index].likes.indexOf(username) === -1) {
            posts[this.props.post_index].likes.push(username)
        } else {
            posts[this.props.post_index].likes = posts[this.props.post_index].likes.filter(un => un !== username);
        }
        this.setState({
            likeCount: posts[this.props.post_index].likes.length,
            likeText: posts[this.props.post_index].likes.indexOf(username) !== -1 ? "Remove Like" : "Like"
        })
        window.localStorage.setItem('posts', JSON.stringify(posts))
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    render() {
        let username = window.sessionStorage.getItem('username'), editLink, deleteButton

        if (this.state.isAuthor) {
            editLink =
                <Link to={`/edit/${this.props.post.id}`} className={`btn btn-default ${this.props.additionalClass}`}
                      title="Edit post">
                    <span className="glyphicon glyphicon-pencil"></span> {this.props.editText}
                </Link>
        }

        if (user_helper.getRole(username) === 'admin') {
            deleteButton = <button onClick={this.openModal} type="button"
                                   className={`btn btn-default ${this.props.additionalClass}`} title="Delete post">
                <span className="glyphicon glyphicon-remove"></span> {this.props.deleteText}
            </button>
        }
        return (
            <div className="btn-group pull-right">
                <button type="button"
                        className={`btn btn-default ${this.props.additionalClass} ${this.state.disableLikeButton}`}
                        onClick={this.like}>
                    <span className="glyphicon glyphicon-thumbs-up"
                          title="Likes number"></span> {this.state.likeText} ({this.state.likeCount})
                </button>
                {editLink}
                {deleteButton}
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}
                       style={config.modalStyle} contentLabel="Delete post">
                    <h2>Delete "{this.props.post.title}"</h2>
                    <div>Are you sure you want to delete this item?</div>
                    <hr/>
                    <div className="btn-group">
                        <button onClick={this.closeModal} className="btn btn-default">
                            Close
                        </button>
                        <button onClick={this.deletePost} className="btn btn-default">
                            Yes, delete it
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ActionButtons

