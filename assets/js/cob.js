//		CoblerJS 0.2.0
//		(c) 2011-2016 Adam Smallcomb
//		Licensed under the MIT license.
//		For all details and documentation:
//		https://github.com/Cloverstone/Cobler

function Cobler(options) {
  var topics = {};

	this.options = options
	this.options.active = this.options.active || 'widget_active';
	//simple event bus with the topics object bound
  this.subscribe = function(topic, listener) {
    if(!topics[topic]) topics[topic] = [];
    topics[topic].push(listener);
  }.bind({topics: topics})
  this.publish = function(topic, data) {
    if(!topics[topic] || topics[topic].length < 1) return;
    topics[topic].forEach(function(listener) {
      listener(data || {});
    });
  }.bind({topics: topics})

  //initialize collections array and then create a collection for each target
	var collections = [];
	for(var i in options.targets){
		addCollection.call(this, options.targets[i], options.items[i]);
	}

	function collection(target, items, cob){
		if(!cob.options.disabled) {
			target.addEventListener('click', instanceManager);
			sortable = Sortable.create(target, {
				group: 'cb',
				animation: 150,
				onAdd: function (evt) {
					var A = evt.item;
					//handle if dragged over target and put back in original
					if(A.parentNode === target) {
						var newItem = Cobler.types[A.dataset.type]();
					 	var a = A.parentNode.replaceChild(renderItem(newItem), A);
						items.splice(evt.newIndex, 0 , newItem);
					}
				}, onEnd: function (evt) {
					items.splice(getNodeIndex(evt.item), 0 , items.splice(evt.item.dataset.start, 1)[0]);
					evt.item.removeAttribute('data-start');
					cob.publish('change');
				}, onStart: function (evt) {
	        evt.item.dataset.start = getNodeIndex(evt.item);  // element index within parent
	    	}
			});
		}

		load(items);
		function reset(items) {
			target.innerHTML = '';
			items = items || [];
		}
		function instanceManager(e) {
			var referenceNode = e.target.parentElement.parentElement;
			var classList = e.target.className.split(' ');
			if(classList.indexOf('remove-item') >= 0){
				items.splice(getNodeIndex(referenceNode), 1);
				target.removeChild(referenceNode);
			 	cob.publish('change');
			}else if(classList.indexOf('duplicate-item') >= 0){
				deactivate();
				var index = getNodeIndex(referenceNode);
				addItem(items[index].toJSON(), index+1);
			}else if(classList.indexOf('edit-item') >= 0){
				activate(referenceNode);
			}else if(e.target.tagName === 'LI') {
				activate(e.target);
			}
		}
		function activate(targetEL) {
			// if(typeof myBerry !== 'undefined'){
			// 	myBerry.trigger('cancel');
			// }
			deactivate();
			targetEL.className += ' ' + cob.options.active;
			active = getNodeIndex(targetEL);
			activeEl = targetEL;
			cob.publish('activate');
			var formConfig = {
				renderer: 'tabs', 
				attributes: items[active].toJSON(), 
				fields: items[active].fields,
				autoDestroy: true,
				legend: 'Edit '+ items[active].toJSON()['widgetType']
			}
			var events = 'save';
			if(typeof cob.options.formTarget !== 'undefined'){
				formConfig.actions = false;
				events = 'change';
			}

			myBerry = new Berry(formConfig, cob.options.formTarget || $(activeEl));
			myBerry.on(events, function(){
			 	update(this.toJSON());
			 	this.trigger('saved');
			});
			myBerry.on('cancel',function(){
				var temp = renderItem(items[active]);
				temp.className += ' ' + cob.options.active;
			 	var a = activeEl.parentNode.replaceChild(temp, activeEl);
			 	activeEl = temp;
			})
		}
		function update(data){
			items[active].set(data)
			var temp = renderItem(items[active]);
			temp.className += ' ' + cob.options.active;
		 	var a = activeEl.parentNode.replaceChild(temp, activeEl);
		 	activeEl = temp;
		 	cob.publish('change')
		}
		
		function deactivate() {
			if(typeof myBerry !== 'undefined'){
				myBerry.destroy();
				myBerry = undefined;
			}
			active = null;
			activeEl = null;
			var elems = target.getElementsByClassName(cob.options.active);
			[].forEach.call(elems, function(el) {
			    el.className = el.className.replace(cob.options.active, '');
			});
		}
		function load(obj) {
			deactivate();
			reset(obj);
			items = [];
			for(var i in obj) {
				addItem(obj[i], false, true);
			}
		}
		function addItem(widgetType, index, silent) {
			if(typeof Cobler.types[widgetType.widgetType || widgetType] === 'undefined'){
				return false;
			}
			index = index || items.length;
			var newItem = new Cobler.types[widgetType.widgetType || widgetType](this)
			if(typeof widgetType !== 'string'){
				newItem.set(widgetType);
			}
			items.splice(index, 0, newItem);
			var renderedItem = renderItem(newItem);
			target.insertBefore(renderedItem, target.getElementsByTagName('LI')[index]);
			if(!silent){
				activate(renderedItem);
				cob.publish('change')
			}
		}
		function toJSON() {
			var json = [];
			for(var i in items){
				json.push(items[i].toJSON());
			}
			return json;
		}
		function toHTML() {
			var temp = '';
			for(var i in items){
				temp += Cobler.types[items[i].widgetType].render(items[i]);
			}
			return temp;
		}
		function destroy(){
			reset();
			if(typeof sortable !== 'undefined') { sortable.destroy(); }
			target.removeEventListener('click', instanceManager);
		}
		return {
			addItem: addItem,
			toJSON: toJSON,
			toHTML: toHTML,
			deactivate: deactivate,
			clear: reset,
			load: load,
			update: update.bind(this),
			destroy: destroy
		}
	}

	function renderItem(item){
		var EL;
		if(options.disabled){
			EL = document.createElement('DIV');
			EL.innerHTML = item.render();
		} else {
			EL = document.createElement('LI');
			EL.innerHTML = templates.itemContainer.render();
			EL.getElementsByClassName('cobler-li-content')[0].innerHTML = item.render();
		}
		return EL;
	}
	function getNodeIndex(node) {
	  var index = 0;
	  while (node = node.previousSibling) {
	    if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
	      index++;
	    }
	  }
	  return index;
	}
	function addCollection(target, item){
		collections.push(new collection(target, item, this));
	}
	function addSource(element){
		Sortable.create(element, {group: {name: 'cb', pull: 'clone', put: false}, sort: false });
	}
	function applyToEach(func){
		return function(){
			var temp = [];
			for(var i in collections) {
				temp.push(collections[i][func]());
			}
			this.publish(func);
			return temp;
		}.bind(this)
	}

	return {
		collections: collections,
		addCollection: addCollection,
		addSource: addSource,
		toJSON: applyToEach.call(this, 'toJSON'),
		toHTML: applyToEach.call(this, 'toHTML'),
		clear: applyToEach.call(this, 'clear'),
		deactivate: applyToEach.call(this, 'deactivate'),
		destroy: applyToEach.call(this, 'destroy'),
		on: this.subscribe//,
		//trigger: this.publish.bind(this)
	};
}

Cobler.types = {};