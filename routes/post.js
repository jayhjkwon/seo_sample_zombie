var _ = require('lodash');

var posts = [
{ 
  id : 1,
  title : 'Why Discourse uses Ember.js', 
  contents : 'This week, I was delighted to finally reveal Discourse, the app I’ve been working on for most of the last year in secrecy with awesome people. The launch got a lot of attention - we were featured on Hacker News, Slashdot, Wired, Reddit, Techcrunch and countless other places. Personally I’ve been floored with the amount of feedback so far. It’s going to take quite some time to get through it all! One question people keep asking me is “Why did you choose Ember.js?”. It’s a good one, and one that I think can be considered in two ways: “Why use a a client side MVC Framework?” and “Why Ember out of all the frameworks?” Here’s my answer to both of those questions.',
  image_url : ''
},
{ 
  id : 2,
  title : 'Introducing node.js Tools for Visual Studio', 
  contents : 'Just when you thought it could not be crazier in Redmond, today they are introducing node.js Tools for Visual Studio! NTVS runs inside VS2012 or VS2013. Some node.js enthusiasts had forked PTVS and begun some spikes of node tools for VS. At the same time the PTVS team was also working on node.js integration, so they all joined forces and made NTVS a community project. NTVS was developed by the same team that brought you PTVS with help from friends like Bart Read from Red Gate (he did the npm GUI), and Dmitry Tretyakov from Clickberry for several debugger fixes & features. NTVS is open source from the start, and has taken contributions from the very start. It supports Editing, Intellisense, Profiling, npm, Debugging both locally and remotely (while running the server on Windows/MacOS/Linux), as well publishing to Azure Web Sites and Cloud Service. It is actually pretty freaking amazing how they did it, so I encourage you to [download](https://nodejstools.codeplex.com/) it and give it a try because some of the stuff (even given this is an alpha) is very very clever.',
  image_url : 'http://www.hanselman.com/blog/content/binary/Windows-Live-Writer/733b36a7f64d_ED6F/image_c45fe255-b64f-4d8e-af8b-052b48439c89.png'
}
];

exports.getAllPosts = function(req, res){
  res.send(posts);
};

exports.editPost = function(req, res) {
  var post = _.find(posts, function(post){ return post.id == req.params.post_id; });

  post.title = req.body.title;
  post.contents = req.body.contents;
  post.image_url = req.body.image_url;

  res.send(post);
};

exports.addPost = function(req, res) {
  var post = {};

  post.title = req.body.title;
  post.contents = req.body.contents;
  post.image_url = req.body.image_url;
  var maxPost = _.max(posts, function(post) { return post.id; });
  post.id = maxPost.id + 1;

  posts.push(post);

  res.send(post);
};

exports.deletePost = function(req, res) {
  _.remove(posts, function(post){ return post.id == req.params.post_id; });

  res.send(200);
};

exports.renderPostList = function(req, res) {
  res.render('spider/post_list', { 
    title : 'show the way to solve seo issue in single page application',
    keywords: 'seo, sample, spa', 
    description: 'show the way to solve seo issue in single page application',
    posts: posts
  });
};

exports.renderPostDetail =  function(req, res, options) {
  console.log('renderPostDetail : ' + req);
  var post = _.find(posts, function(post) { return post.id == options.post_id || req.params.post_id; });
  res.render('spider/post_detail', { 
    title: post.title,
    keywords: 'seo, sample',  
    description: 'show the way to solve seo issue in single page application',
    post: post
  });
};


