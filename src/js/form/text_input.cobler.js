$(function(){
	cobler.register({
		type: 'textbox',
		category: 'form',
		icon: 'font',
		display: 'Text',
		defaults: {
			label: 'Label',
			type: 'text',
			required: false,
			help: '',
			columns: 12
		},
		toJSON: function(){
			cobler.slice.prototype.toJSON.call(this);
			this.attributes.name = this.attributes.name || this.attributes.label;
			return this.attributes;
		},
		fields: [
			{type: 'text', label: 'Field Label', name: 'label', value: 'Label'},
			{type: 'text', label: 'Name', name: 'name'},
			{type: 'select', label: 'Display', name: 'type', value: 'dropdown', 'choices': [
				{label: 'Single Line', value: 'text'},
				{label: 'Multi-line', value: 'textarea'},
				{label: 'Phone', value: 'phone'},
				{label: 'Email', value: 'email'},
				{label: 'Date', value: 'date'},
				{label: 'Number', value: 'number'}
			]},
			{type: 'text', label: 'Placeholder', name: 'placeholder'},
			{type: 'text', label: 'Default value', name: 'value'},
			{type: 'textarea', label: 'Instructions', name: 'help'},
			{type: 'checkbox', label: 'Required', name: 'required', inline: false},
			{type: 'select', label: 'Size', name: 'columns', choices: [
				3,4,6,8,9,12
			]},
		],
		template:  function(){
			return 'berry_' + this.attributes.type;
		}
	});
});