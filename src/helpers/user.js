import config from '../config'

const user_helper = {
    getRole: (username) => {
        if (typeof username !== "string") {
            console.warn("username must be a string")
            return
        }
        let user = config.users.find(user => user.username === username)
        return user.role
    },
    getFullName: (username) => {
        if (typeof username !== "string") {
            console.warn("username must be a string")
            return
        }
        let user = config.users.find(user => user.username === username)
        return user.full_name
    }
}
export default user_helper;