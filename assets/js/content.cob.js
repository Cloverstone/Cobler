Cobler.types.content = function(owner){
	function render() {
		return templates['widgets_content'].render(toJSON(), templates);
	}
	function toJSON(clean) {
		if(!clean){
			item.widgetType = 'content';
		}
		return item;
	}
	function set(newItem) {
		$.extend(item, newItem);
	}
	var item = {
		// widgetType: 'content',
		title: 'This is the title',
		text: 'Here is some text'
	}
	var fields = {
		Title: {},
		Text: {type: 'contenteditable', label: false}
	}
	return {
		fields: fields,
		render: render.bind({owner: owner}),
		toJSON: toJSON,
		set: set,
	}
}

Cobler.types.rss = function(owner) {
	function render() {
		var temp = toJSON()
		if(typeof temp.loaded === 'undefined' && temp.count > 0 && temp.url){
				$.ajax({
				  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+temp.count+'&callback=?&q=' + encodeURIComponent(temp.url),
				  dataType : 'json',
				  success  : $.proxy(function (data) {
				    if (data.responseData.feed && data.responseData.feed.entries) {
				    	for(var i in data.responseData.feed.entries){
								data.responseData.feed.entries[i].contentSnippet = data.responseData.feed.entries[i].contentSnippet.replace(/&lt;/,"<").replace(/&gt;/,">").replace(/&amp;/,"&");
				    	}
				    	var temp = toJSON();
				    	temp.loaded = data.responseData.feed;
				    	this.owner.update(temp);
				    }
				  }, this)
				});
			}
		
		return templates['widgets_rss'].render(temp, templates);
	}
	function toJSON(clean) {
		if(!clean){
			item.widgetType = 'rss';
		}
		return item;
	}
	function set(newItem) {
		// $.extend(item, newItem);

		item = newItem;
	}
	var item = {};
	var fields = {
		Title: {},
		Url: {value: 'http://www.binghamton.edu/photos/index.php/feed/'},
		Count: {value: 5, type: 'number'},
	}
	return {
		fields: fields,
		render: render.bind({owner: owner}),
		toJSON: toJSON,
		set: set,
	}
}