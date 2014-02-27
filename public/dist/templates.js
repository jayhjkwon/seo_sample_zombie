Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<div class=\"navbar navbar-inverse navbar-fixed-top\">\r\n  <div class=\"navbar-inner\">\r\n    <div class=\"container-fluid\">\r\n      <button type=\"button\" class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <a class=\"brand\" href=\"#\">Super Simple Blog</a>\r\n      <div class=\"nav-collapse collapse\">\r\n        <ul class=\"nav\">\r\n          <li>{{#link-to 'index'}}Home{{/link-to}}</li>\r\n          <li>{{#link-to 'posts'}}Posts{{/link-to}}</li>\r\n          <li>{{#link-to 'posts.new'}}New Post{{/link-to}}</li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n{{outlet}}");

Ember.TEMPLATES["index"] = Ember.Handlebars.compile("<div class=\"hero-unit\"><h1>Sample app shows how to solove SEO issue in single page application</h1></div>");

Ember.TEMPLATES["posts"] = Ember.Handlebars.compile("<div class=\"container-fluid\">\r\n  <div class=\"row-fluid\">\r\n    <div class=\"span4\">        \r\n      <table class=\"table\">\r\n        {{#each post in model}}\r\n          <tr><td>\r\n            {{#link-to 'posts.detail' post}}\r\n              {{post.title}}\r\n            {{/link-to}}\r\n            {{#link-to 'posts.edit' post class=\"btn pull-right\"}}Edit{{/link-to}}  \r\n            <button class=\"btn pull-right\" {{action 'deletePost' post}}>Delete</button>\r\n          </td></tr>\r\n        {{/each}}\r\n      </table>\r\n    </div>      \r\n    <div class=\"span8 well\">\r\n      {{outlet}}\r\n    </div>\r\n  </div>\r\n</div>");

Ember.TEMPLATES["posts/_form"] = Ember.Handlebars.compile("<p><label for=\"title\">Title</label> {{input type=\"text\" value=title}}</p>\r\n<p><label for=\"contents\">Contents</label> {{textarea type=\"text\" value=contents}}</p>\r\n");

Ember.TEMPLATES["posts/detail"] = Ember.Handlebars.compile("<h2>{{title}}</h2>\r\n<div>\r\n  {{markdown contents}}\r\n</div>\r\n<img {{bind-attr src=image_url}}></img>");

Ember.TEMPLATES["posts/edit"] = Ember.Handlebars.compile("{{partial 'posts/form'}}\r\n<button class=\"btn\" {{action 'editPost' this}}>Save</button>\r\n<h2>{{model.title}}</h2>\r\n<div>\r\n  {{markdown contents}}\r\n</div>  ");

Ember.TEMPLATES["posts/index"] = Ember.Handlebars.compile("<div><h1>Select an article</h1></div>");

Ember.TEMPLATES["posts/new"] = Ember.Handlebars.compile("{{partial 'posts/form'}}\r\n<button class=\"btn\" {{action 'addPost'}}>Save</button>\r\n<div class=\"well\">\r\n\t<h5>Preview</h5>\r\n\t<div>{{title}}</div>\r\n\t<div>{{contents}}</div>\r\n</div>");