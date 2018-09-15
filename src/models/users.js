const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../../database/userCollection.json');

const getUsers = () => {
    return users = JSON.parse(fs.readFileSync(usersPath)).users;
}

const findUser = (email) => {
    const users = getUsers();
    for (user of users) {
        if (user.email === email) {
            return user;
        }
    }
    return false;
}

const addUser = (user, cb) => {
    const users = getUsers();
    users.push(user);
    if (fs.existsSync(usersPath)) {
        fs.writeFile(usersPath, JSON.stringify({ users }), 'utf-8', err => {
            cb(err);
        })
    }
}

module.exports = {
    findUser,
    addUser
}