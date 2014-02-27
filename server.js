var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var post = require('./routes/post');
var sm = require('sitemap');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/* RESTful API */
app.get('/api/posts', post.getAllPosts);
app.put('/api/posts/:post_id', post.editPost);
app.post('/api/posts', post.addPost);
app.delete('/api/posts/:post_id', post.deletePost);

app.get('/sitemap.xml', function(req, res) {
  var fullURL = req.protocol + "://" + req.get('host');

  var sitemap = sm.createSitemap ({
    hostname: fullURL,
    cacheTime: 600000,
    urls: [
      { url: '',  changefreq: 'daily'},
      { url: '/#!/posts',  changefreq: 'daily'}
    ]
  });

  sitemap.toXML( function (xml) {
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});


/* zombie for crawler */
var browserOpts = {
  debug: true,
  waitFor: 2000,
  loadCSS: true,
  runScripts: true
};

var Browser = require("zombie");

app.get('/', function(req, res) {
  if (typeof(req.query._escaped_fragment_) !== 'undefined') {
    // this solution only works when hashbang is used
    var fullURL = req.protocol + "://" + req.get('host') + '/#!' + req.query._escaped_fragment_;
    Browser.visit(fullURL, browserOpts, function(e, browser, status){
      var html = browser.html('body');

      // remove scripts
      var scripts = 
      [
        '<script src="/dist/vendor.min.js"></script>',
        '<script src="/dist/app.min.js"></script>',
        '<script src="/dist/templates.js"></script>',
        '<script src="http://localhost:35729/livereload.js"></script>'
      ];
      scripts.map(function(script){
        html = html.replace(script, '');
      });
      
      // browser.close();
      res.send(html);
    });
  }else{
    res.render('index');
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

