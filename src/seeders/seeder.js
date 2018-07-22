const seeders = {
    postSeeder: function () {
        let today = new Date().toJSON().slice(0, 10)
        let posts = [{
            "id": "demo-post",
            "title": 'Hello world',
            "description": 'Simple page',
            "author": 'admin',
            "likes": [{"username": "john_doe"}],
            "date": today,
            "comments": [
                {
                    "username": "admin",
                    "description": "This is my best.",
                    "date": today
                },
                {
                    "username": "john_doe",
                    "description": "Very nice post. Thanks",
                    "date": today
                }
            ],
        },
            {
                "id": "chuck-norris-facts",
                "title": "Some 'Chuck Norris Facts' You Probably Didn't Know",
                "description": "If there is one celebrity out there whom everyone knows, but not many people actually know anything about, then Chuck Norris might just be that person. It's not that his life is a mystery, in fact, it's quite the opposite: we're deluged in so many Chuck Norris facts that nobody knows what is true about him. Chuck Norris facts have been a favoured meme for years. The premise, if you've been living in North Korea for the last decade or so, is that Chuck Norris is really hard. Like really, really hard.",
                "author": 'john_doe',
                "likes": [],
                "date": today,
                "comments": [],
            }]
        window.localStorage.setItem('posts', JSON.stringify(posts))
    },

}

export default seeders;