Cobler.types.content = function(container){
	function render() {
		return templates['widgets_content'].render(get(), templates);
	}
	function get() {
		item.widgetType = 'content';
		return item;
	}
	function toJSON(){
		return get();
	}
	function set(newItem) {
		$.extend(item, newItem);
	}
	var item = {
		title: 'This is the title',
		text: 'Here is some text'
	}
	var fields = {
		Title: {},
		Text: {type: 'contenteditable', label: false}
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set,
	}
}

Cobler.types.rss = function(container) {

	function render() {	
		var temp = get()
		if(typeof temp.loaded === 'undefined' && temp.count > 0 && temp.url){
				$.ajax({
				  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+temp.count+'&callback=?&q=' + encodeURIComponent(temp.url),
				  dataType : 'json',
				  success  : $.proxy(function (data) {
				  	var feed = data.responseData.feed
				    if (feed && feed.entries) {
				    	for(var i in feed.entries){
								feed.entries[i].contentSnippet = feed.entries[i].contentSnippet.replace(/&lt;/,"<").replace(/&gt;/,">").replace(/&amp;/,"&");
				    	}
				    	debugger;
				    	var temp = get();
				    	temp.loaded = feed;
				    	container.update(temp, this);
				    }
				  }, this)
				});
			}
		return templates['widgets_rss'].render(temp, templates);
	}
	function get() {
		item.widgetType = 'rss';
		return item;
	}
	function toJSON(){
		var temp = get();
		delete temp.loaded;
		return temp;
	}
	function set(newItem) {
		item = newItem;
	}
	var item = {

	};
	var fields = {
		Title: {},
		Url: {value: 'http://www.binghamton.edu/photos/index.php/feed/'},
		Count: {value: 5, type: 'number'},
	}
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		edit: berryEditor.call(this, container),
		get: get,
		set: set
	}
}