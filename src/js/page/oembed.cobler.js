$(function() {
	cobler.register({
		type: 'oembed',
    category: 'none',
		icon: 'circle-o',
		display: 'Embed',
		defaults: {
			url: '',
			id: ''
		},
		fields: [
			{label: 'URL', name: 'url', fieldset: 'alt-form'},
		],
		blur: function() {
			if(this.attributes.url.length === 0) {
				this.owner.remove(this.id);
			}
		},
		// toJSON: function() {
		// 	this.attributes = $.extend(this.attributes, this.owner.form.toJSON());
		// 	if(this.attributes.url.length>0){
		// 		this.attributes.provider = this.attributes.url.match(/https?:\/\/(:?www.)?(\w*)/)[2];

		// 		if(this.attributes.provider == "youtube") {
		// 			this.attributes.id = this.attributes.url.replace(/^[^v]+v.(.{11}).*/,"$1");
		// 			this.attributes.target = 'http://www.youtube.com/v/'+this.attributes.id+'?version=3';//'?fs=1&hl=en_US';
		// 		} else if (this.attributes.provider == "vimeo") {
		// 				this.attributes.id = this.attributes.url.match(/http:\/\/(?:www.)?(\w*).com\/(\d*)/)[2];
		// 				this.attributes.target = 'http://player.vimeo.com/video/'+this.attributes.id+'?title=0&amp;byline=0&amp;portrait=0';
		// 		} else {
		// //        throw new Error("parseVideoURL() takes a YouTube or Vimeo URL");    
		// 		}
		// 	}
		// 	return this.attributes;
		// },
		toHTML: function() {
			return $('<center/>').html($('<a/>').attr('href', this.attributes.url).addClass('embed'));
		},
		callback: function() {
			this.$el.find('a.embed').oembed(null, {includeHandle: false});
		}
	});
});