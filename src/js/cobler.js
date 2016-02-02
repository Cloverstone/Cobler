//		CoblerJS 0.2.0
//		(c) 2011-2016 Adam Smallcomb
//		Licensed under the MIT license.
//		For all details and documentation:
//		https://github.com/Cloverstone/Cobler

function cobler(options){
		function renderItem(item){
			var LI = document.createElement('LI');
			LI.dataset.type = item.type;
			LI.innerHTML = templates.itemContainer.render();
			LI.getElementsByClassName('cobler-li-content')[0].innerHTML = templates['berry_' + item.type].render(item, templates);
			return LI;
		}
		function getNodeIndex(node) {
		  var index = 0;
		  while ( (node = node.previousSibling) ) {
		    if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
		      index++;
		    }
		  }
		  return index;
		}
		function collection(target, items){
			var active;
			var myBerry;
			target.addEventListener('click', instanceManager);
			Sortable.create(target, {
				group: 'sortableGroup',
				animation: 150,
				onAdd: function (evt){
					var A = evt.item; // the current dragged HTMLElement
					//handle if dragged over target and put back in original
					if(A.parentNode === target) {
					 	var a = A.parentNode.replaceChild(renderItem(types[A.dataset.type].default), A);
					}
					items.splice(evt.newIndex, 0 , types[A.dataset.type].default);
				}, onEnd: function (evt) {
					items.splice(evt.newIndex, 0 , items.splice(evt.oldIndex, 1)[0]);
				}
			});
			load(items);
			function instanceManager(e) {
				var referenceNode = e.target.parentElement.parentElement;
				var container = referenceNode.parentElement;
				var classList = e.target.className.split(' ');

				if(classList.indexOf('remove-item') >= 0){
					items.splice(getNodeIndex(referenceNode), 1);
					container.removeChild(referenceNode);
				}else if(classList.indexOf('duplicate-item') >= 0){
					container.insertBefore(referenceNode.cloneNode(true), referenceNode.nextSibling);
					//neds to be extended -currently references same item
					items.splice(getNodeIndex(referenceNode) + 1, 0 , items[getNodeIndex(referenceNode)] );
				}else if(e.target.tagName === 'LI') {
					activate(e.target);
				}
			}
			function activate(targetEL){
				deactivate();
				targetEL.className += ' widget_active';
				active = getNodeIndex(targetEL);
				activeEl = targetEL;
				myBerry = new Berry({renderer: 'tabs', actions: false, attributes: items[active], fields: types[items[active].type].fields}, $(document.getElementById('form'))).on('change', function(){

					//needs to be more comprehensive
					var type = items[active].type;
					items[active] = this.toJSON();
					items[active].type = type;

					var temp = renderItem(items[active]);
					temp.className += ' widget_active';
				 	var a = activeEl.parentNode.replaceChild(temp, activeEl);
				 	activeEl = temp;
				});
			}
			function deactivate(){
				debugger;
				if(typeof myBerry !== 'undefined'){
					myBerry.destroy();
					myBerry = undefined;
				}
				active = null;
				activeEl = null;
				var elems = target.getElementsByClassName('widget_active');
				[].forEach.call(elems, function(el) {
				    el.className = el.className.replace('widget_active', '');
				});
			}
			function load(obj){
				for(var i in obj){
					target.appendChild(renderItem(obj[i]));
				}
			}
			function addItem(type){
				var renderedItem = renderItem(types[type].default);
				target.appendChild(renderedItem);
				items.splice(items.length, 0 , types[type].default);
				activate(renderedItem);
			}
			function toJSON(){
				return items;
			}
			return {
				addItem: addItem,
				toJSON: toJSON,
				deactivate: deactivate
			}
		}
		// Sortable.create(options.source, {group: {name: 'sortableGroup', pull: 'clone', put: false}, sort: false });
		var c = [];
		for(var i in options.targets){
			c.push(new collection(document.getElementById(options.targets[i]), options.items[i]));
		}
		function applyToEach(func){
			for(var i in c) {
				temp.push(c[i].toJSON());
			}
		}
		function toJSON() {
			var temp = [];
			for(var i in c) {
				temp.push(c[i].toJSON());
			}
			return temp;
		}
		return {
			collections: c,
			toJSON: toJSON
		};
}



var items = [
	[
		{
			type: 'select',
			label: 'Name',
			name: 'name',
			options:[
			{label: 'First',value: '1'}
			]
		},			
		{
			type: 'text',
			label: 'Name',
			name: 'name'
		},			
		{
			type: 'checkbox'
		}
	],
	[]
]
var types = {
	text: {
		default: {
				type: 'text',
				label: 'Name',
				name: 'name'
			},
		fields: [
			{type: 'text', required: true, label: 'Field Label', name: 'label', value: 'Label'},
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
	},
	select: {
		default: {
				type: 'select',
				label: 'Name',
				name: 'name',
				options:[
				{label: 'First',value: '1'}
				]
			},
		fields: [
			{type: 'fieldset', name:'basics', legend: '<i class="fa fa-th"></i> Basics', hideLabel: true, inline: true, fields:[
				{type: 'text', required: true, label: 'Field Label', name: 'label', value: 'Label'},
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
			{type: 'fieldset', name:'choices_c', legend: '<i class="fa fa-th-list"></i> Choices', inline: true, fields:[
				{"type": "fieldset", "label": false, "multiple": {"duplicate": true}, "name": "options", "fields": [
					{"label": "Label"},
					{"label": "Value"}
				]}
			]},
		]
	},
	checkbox: {
		default: {
				type: 'checkbox',
				label: 'choice'
			},
		fields: [
			{type: 'text', required: true, label: 'Field Label', name: 'label'},
			{type: 'text', label: 'Name', name: 'name'},
			{type: 'checkbox', label: 'Default Value', name: 'value'},
			{type: 'textarea', label: 'Instructions', name: 'help'},
			{type: 'checkbox', label: 'Required', name: 'required'},
		]
	}
}


var cb = new cobler({
	// source: document.getElementById('sortableList'), 
	targets: ['sortableList2', 'sortableList3'],
	items: items}
	)

Sortable.create(document.getElementById('sortableList'), {group: {name: 'sortableGroup', pull: 'clone', put: false}, sort: false });
document.getElementById('sortableList').addEventListener('click', function(e) {
	cb.collections[0].addItem(e.target.dataset.type);
})

$('body').keydown(function(event) {
	switch(event.keyCode) {
		case 27://escape

				cb.collections[0].deactivate();
			break;
	}
});
