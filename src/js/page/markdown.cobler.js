var markdownConverter = new Showdown.converter();
//var wMarkdown = new widget({type:"Markdown",display:'<i class="fa fa-arrow-down"></i> Markdown',text:"",width:"12"});

$(function(){
	cobler.register({
		type: 'markdown',
    category: 'none',
		icon: 'arrow-down',
		display: 'Markdown',
		defaults: {
			label: 'Label',
			type: 'text',
			placeholder: '',
			help: ''
		},
		fields: [
			{type: 'textarea', label: false, name: 'text'},
		],
		blur: function() {
			if(this.attributes.markdown.length === 0) {
				this.owner.remove(this.id);
			}
		},
		toHTML: function() {
			var div = $('<div>').html(this.attributes.markdown);
			return div.addClass("pull-"+this.attributes.float+" width"+this.attributes.width).css({'text-align': this.attributes.align});
		},
		toJSON: function() {
			this.attributes = $.extend(this.attributes, this.owner.form.toJSON());
			this.attributes.markdown = markdownConverter.makeHtml(this.attributes.text);
			return this.attributes;
		}
	});
});