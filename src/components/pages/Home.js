import React, {Component} from 'react'
import config from '../../config'

class Home extends Component {
    constructor() {
        super()
        document.title = config.siteName
    }

    render() {
        return (
            <div>
                <div id="website-title">
                    <h1>{config.siteName}</h1>
                    <h2>{config.siteDescription}</h2>
                </div>
                <section>
                    <div className="row">
                        <div className="col-sm-12">
                            <div dangerouslySetInnerHTML={{__html: config.welcomeText}}/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home