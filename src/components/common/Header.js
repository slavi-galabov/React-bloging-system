import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import config from '../../config'
import user_helper from '../../helpers/user'

class Header extends Component {

    render() {
        const {loggedIn, onLogout} = this.props
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to={'/'} className="navbar-brand">{config.siteName}</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={'/'}><span className="glyphicon glyphicon-home"></span> Home</Link>
                        </li>
                    </ul>
                    {loggedIn &&
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={'/all-posts'}><span className="glyphicon glyphicon-list"></span> All posts</Link>
                        </li>
                    </ul>
                    }
                    {loggedIn &&
                    <ul className="nav navbar-nav navbar-right">
                        <li id="welcome-user">Welcome {user_helper.getFullName(window.sessionStorage.getItem('username'))}</li>
                        <li>
                            <a href="javascript:void(0);" onClick={onLogout}><span
                                className="glyphicon glyphicon-log-out"></span> Logout</a>
                        </li>
                    </ul>
                    }
                    {!loggedIn && <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to={'/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link>
                        </li>
                    </ul>
                    }
                </div>
            </nav>
        )
    }
}

export default Header