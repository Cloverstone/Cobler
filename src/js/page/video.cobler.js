$(function(){
	cobler.register({
		type: 'video',
    category: 'content',
		icon: 'video-camera',
		display: 'Video',
		defaults: {
			url: '',
			id: ''
		},
		fields: [
			{label: 'URL', name: 'url', fieldset: 'alt-form'},
		],
		blur: function() {
			if(this.attributes.id.length === 0) {
				this.owner.remove(this.id);
			}
		},
		toJSON: function() {
			this.attributes = $.extend(this.attributes, this.owner.form.toJSON());
			if(this.attributes.url.length>0){
				this.attributes.provider = this.attributes.url.match(/https?:\/\/(:?www.)?(\w*)/)[2];

				if(this.attributes.provider == "youtube") {
					this.attributes.id = this.attributes.url.replace(/^[^v]+v.(.{11}).*/,"$1");
					this.attributes.target = 'http://www.youtube.com/v/'+this.attributes.id+'?version=3';//'?fs=1&hl=en_US';
				} else if (this.attributes.provider == "vimeo") {
						this.attributes.id = this.attributes.url.match(/http:\/\/(?:www.)?(\w*).com\/(\d*)/)[2];
						this.attributes.target = 'http://player.vimeo.com/video/'+this.attributes.id+'?title=0&amp;byline=0&amp;portrait=0';
				} else {
		//        throw new Error("parseVideoURL() takes a YouTube or Vimeo URL");    
				}
			}
			return this.attributes;
		},
		toHTML:  function() {
			var div = $('<div/>');
			if(this.attributes.id.length>0) {
				if(this.attributes.provider == "youtube") {
					div.html(Mustache.render('<div style="text-align:center"><object style="height: 390px; width: 640px"><param name="wmode" value="transparent" /><param name="movie" value="{{target}}&rel=0"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="{{target}}&rel=0" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390" wmode="transparent"></object></div>', this.attributes));
				}else if (this.attributes.provider == "vimeo") {
					div.html(Mustache.render('<center><div style="text-align:center;width:400px;"><iframe src="{{target}}" style="width:400px;" width="400" height="300" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></center>', this.attributes));
				}
			}
			return div;
		}
	});
});