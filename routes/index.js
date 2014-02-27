exports.index = function(req, res){
  res.render('index', { 
    keywords: 'seo, sample, spa', 
    description: 'show the way to solve seo issue in single page application'
  });
};

exports.indexSpider = function(req, res){
	// console.log('indexSpider : ');
	// console.dir(req.query);
  res.render('spider/index', { 
    title: 'seo sample',
    keywords: 'seo, sample, spa', 
    description: 'show the way to solve seo issue in single page application'
  });
};