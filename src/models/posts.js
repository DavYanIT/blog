const fs = require('fs');
const path = require('path');
const postsPath = path.join(__dirname, '../../database/postCollection.json');

const getPosts = () => {
    return posts = JSON.parse(fs.readFileSync(postsPath)).posts;
}

const findPost = (id) => {
    const posts = getPosts();
    for (post of posts) {
        if (post.id == id) {
            return post;
        }
    }
    return false;
}

const addPost = (post, cb) => {
    const posts = getPosts();
    posts.push(post);
    if (fs.existsSync(postsPath)) {
        fs.writeFile(postsPath, JSON.stringify({ posts }), 'utf-8', err => {
            cb(err);
        })
    }
}

module.exports = {
    getPosts,
    findPost,
    addPost
}