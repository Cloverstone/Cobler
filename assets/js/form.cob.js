Cobler.types.textbox = function(owner) {
	function render(){
		if(item.type == 'textarea'){
			return templates['berry_textarea'].render(toJSON(), templates);
		}
		return templates['berry_text'].render(toJSON(), templates);
	}
	function toJSON(clean) {
		if(!clean){
			item.widgetType = 'textbox';
			item.isEnabled = true;
		}
		return item;
	}
	function set(newItem){
		item = newItem;
	}
	var item = {
		widgetType: 'textbox',
		type: 'text',
		label: 'Label',
		isEnabled: true
	}
	var fields = [
		{type: 'text', required: true, label: 'Field Label', name: 'label'},
		{type: 'text', label: 'Name', name: 'name'},
		{type: 'select', label: 'Display', name: 'type', value: 'dropdown', 'choices': [
			{label: 'Single Line', value: 'text'},
			{label: 'Multi-line', value: 'textarea'},
			{label: 'Phone', value: 'phone'},
			{label: 'Email', value: 'email'},
			{label: 'Date', value: 'date'},
			{label: 'Number', value: 'number'},
			{label: 'Color', value: 'color'}
		]},
		{type: 'text', label: 'Placeholder', name: 'placeholder'},
		{type: 'text', label: 'Default value', name: 'value'},
		{type: 'textarea', label: 'Instructions', name: 'help'},
		{type: 'checkbox', label: 'Required', name: 'required'},
	]
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		set: set
	}
}

Cobler.types.select = function(owner) {
	function render() {
		return templates['berry_' + item.type].render(toJSON(), templates);
	}
	function toJSON(clean) {		
		if(!clean){
			item.widgetType = 'select';
			item.isEnabled = true;
		}
		return item;
	}
	function set(newItem) {
		item = newItem;
	}
	var item = {
		widgetType: 'select',
		type: 'select',
		label: 'Label',
		isEnabled: true
	}
	var fields = [
		{type: 'fieldset', name:'basics', legend: '<i class="fa fa-th"></i> Basics', hideLabel: true, inline: true, fields:[
			{type: 'text', required: true, label: 'Field Label', name: 'label'},
			{type: 'text', label: 'Name', name: 'name'},
			{type: 'select', label: 'Display', name: 'type', value: 'dropdown', choices: [
				{name: 'Dropdown', value: 'select'},
				{name: 'Radio', value: 'radio'},
				{name: 'Range', value: 'range'}
			]},
			{type: 'text', label: 'External List', name: 'choices'},

			{type: 'text', label: 'Label-key', name: 'label_key'},
			{type: 'text', label: 'Value-key', name: 'value_key'},

			{type: 'text', label: 'Default Value', name: 'value'},
			{type: 'number', label: 'Max', name: 'max'},
			{type: 'number', label: 'Min', name: 'min'},
			{type: 'number', label: 'Step', name: 'step'},
			{type: 'textarea', label: 'Instructions', name: 'help'},
			{type: 'checkbox', label: 'Required', name: 'required'},
		]},
		{type: 'fieldset', name:'choices_c', legend: '<i class="fa fa-th-list"></i> Choices', hideLabel: true,  inline: true, fields:[
			{type: 'fieldset', label: false, multiple: {duplicate: true}, name: 'options', fields: [
				{label: 'Label'},
				{label: 'Value'}
			]}
		]}
	]
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		set: set
	}
}

Cobler.types.checkbox = function(owner) {
	function render() {
		item.container = 'span';
		return templates['berry_checkbox'].render(toJSON(), templates);
	}
	function toJSON(clean) {
		if(!clean){
			item.widgetType = 'checkbox';
			item.isEnabled = true;
		}
		item.type = 'checkbox';
		return item;
	}
	function set(newItem) {
		item = newItem;
	}
	var item = {
		widgetType: 'checkbox',
		type: 'checkbox',
		label: 'Label',
		isEnabled: true
	}
	var fields = [
		{type: 'text', required: true, label: 'Field Label', name: 'label'},
		{type: 'text', label: 'Name', name: 'name'},
		{type: 'checkbox', label: 'Default Value', name: 'value'},
		{type: 'textarea', label: 'Instructions', name: 'help'},
		{type: 'checkbox', label: 'Required', name: 'required'},
	]
	return {
		fields: fields,
		render: render,
		toJSON: toJSON,
		set: set,
	}
}






Cobler.types.rss = function(owner) {

	// this.owner = owner;
		debugger;
	function render() {
		item.container = 'span';
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
				    	set(temp);
				    	// debugger;
				    	// render();
				    	this.owner.reload(temp);
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
		// item.type = 'rss';
		return item;
	}
	function set(newItem) {
		$.extend(item, newItem);
		// item = newItem;
	}
	var item = {
		widgetType: 'rss'
	}
	var fields = 
			{
				'Title': {},
				'Url': {value: 'http://www.binghamton.edu/photos/index.php/feed/'},
				'Count': {value: 5, type: 'number'},
			}
	
	return {
		fields: fields,
		render: render.bind({owner:owner}),
		toJSON: toJSON,
		set: set,
	}
}