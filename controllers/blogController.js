const Blog = require('../models/blog');


const blog_home = (req, res) => {
    res.render('blogHome', { title: 'Home' })
}


const all_blogs = (req, res) => {
    Blog.find().sort({ createdAt: 1 })
        .then(result => {
            res.render('AllBloges', { blogs: result, title: 'Stories' });
        })
        .catch(err => {
            console.log(err);
        });
}


const blog_create_get = (req, res) => {
    res.render('create', { title: 'Story Telling' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(() => Blog.find().sort({ createdAt: -1 }))
        .then(blogs => {
            // Directly render the "all blogs" page instead of redirecting
            res.render('AllBloges', { title: 'Stories', blogs });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Something went wrong while creating the blog.');
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Details' });
        })
        .catch(err => {
            console.log(err);
        });
}


const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_home,
    all_blogs,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}