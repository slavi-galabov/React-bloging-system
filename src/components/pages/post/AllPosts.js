import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import config from '../../../config'
import ActionButtons from '../../common/ActionButtons'

class AllPosts extends Component {
    constructor(props) {
        super(props)
        if (!window.sessionStorage.getItem('username')) {
            this.props.history.push('/')
        }
        this.state = {
            posts: JSON.parse(window.localStorage.getItem('posts'))
        }
        this.updatePosts = this.updatePosts.bind(this)
        document.title = `All Posts | ${config.siteName}`;
    }

    updatePosts() {
        this.setState({posts: JSON.parse(window.localStorage.getItem('posts'))})
    }

    render() {
        let posts
        if (this.state.posts) {
            posts = this.state.posts.map((post, i) => (

                <div key={i.toString()} className={"col-sm-4"}>
                    <div className="well">
                        <h3 key={post.id}>
                            <Link to={`/post/${post.id}`}>
                                {post.title}
                            </Link>
                        </h3>
                        {post.description.substring(0, 95) + (post.description.length > 95 ? '...' : '')}
                        <div className="clearfix"></div>

                        <div className="row">
                            <Link to={`/post/${post.id}`} className="btn btn-link" title="Read more"> Read
                                more &raquo; </Link>
                            <ActionButtons additionalClass="btn-sm" updatePosts={this.updatePosts} post={post}
                                           post_index={i} history={this.props.history}/>
                        </div>
                    </div>
                </div>
            ));
        } else {
            posts = <div>There's no posts published yet.</div>
        }

        return (
            <div>
                <h1>All posts </h1> <Link to={'/new-post'} className="btn btn-default"><span
                className="glyphicon glyphicon-plus"></span> New post</Link>
                <hr/>
                <section>
                    <div className="row">
                        {posts}
                    </div>
                </section>
            </div>
        );
    }
}

export default AllPosts