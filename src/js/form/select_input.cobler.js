$(function(){
	cobler.register({
		type: 'select',
    category: 'form',
		icon: 'sort',
		display: 'Multiple Choice',
		defaults: {
			label: 'Label',
			type: 'select',
			required : false,
			help: '',
			useName : true,
			columns: '12'
		},
		toJSON: function(){
			cobler.slice.prototype.toJSON.call(this);
			//this.attributes = Berry.processOpts(this.attributes);
			this.attributes.name = this.attributes.name || this.attributes.label;
			return this.attributes;
		},
		fields: [
			{type: 'fieldset',name:'basics', legend: '<i class="fa fa-th"></i> Basics',inline: true, fields:[
				{type: 'text', label: 'Field Label', name: 'label', value: 'Label'},
				{type: 'text', label: 'Name', name: 'name'},
				{type: 'select', label: 'Display', name: 'type', value: 'dropdown', choices: [
					{name: 'Dropdown', value: 'select'},
					{name: 'Radio', value: 'radio'},
					{name: 'Range', value: 'range'}
				]},
				{type: 'text', label: 'Default Value', name: 'value'},
				{type: 'number', label: 'Max', name: 'max'},
				{type: 'number', label: 'Min', name: 'min'},
				{type: 'number', label: 'Step', name: 'step'},
				{type: 'textarea', label: 'Instructions', name: 'help'},
				{type: 'checkbox', label: 'Required', name: 'required', inline: false},
				{type: 'select', label: 'Size', name: 'columns', choices: [
					'3','4','6','8','9','12'
				]},
			]},
			{type: 'fieldset', name:'choices_c', legend: '<i class="fa fa-th-list"></i> Choices', inline: true, fields:[
				{"type": "fieldset", "label": false, "multiple": {"duplicate": true}, "name": "choices", "fields": [
					{"label": "Label"},
					{"label": "Value"}
				]}
			]},		



			// {type: 'fieldset',name:'choices_c', legend: '<i class="fa fa-th-list"></i> Choices', inline: true, fields:[
			// 	{type: 'fieldset', label: false, legend: '<i class="fa fa-square"></i> Choices', multiple: {duplicate: true}, name: 'choices_list', toArray: true, fields: [
			// 		{type: 'text', label: 'Choice', name: 'choices', toArray: true},
			// 	]},
			// ]}
		],
		// template: function(){
		// 	return 'berry_' + this.attributes.type;
		// }
		toHTML: function(publishing) {
			return Berry.render('berry_' + this.attributes.type, Berry.processOpts($.extend(true, {}, this.attributes)));
		}
	});
});