$(function(){
	cobler.register({
		type: 'heading',
		category: 'content',
		icon: 'bold',
		display: 'Heading',
		defaults: {
			text: 'Heading',
			level: 'h1'
		},
		fields: [
			{type: 'custom_radio', force: true, label: 'Level', name: 'level', fieldset: 'alt-form', choices:[
				{name: 'H1', value: 'h1'},
				{name: 'H2', value: 'h2'},
				{name: 'H3', value: 'h3'}
			]},
			{label: false, name: 'text', fieldset: 'selected .cobler-li-content div',},
		],
		toHTML:  function(){
			return $('<' + this.attributes.level + '>').html(this.attributes.text);
		},
		contentFields: true,
		editView:  function(){
			return '<div class="text' + this.attributes.level + '"></div>';
		}
	});
});