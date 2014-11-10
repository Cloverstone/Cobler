$(function(){
  cobler.register({
    type: 'form',
    category: 'content',
    icon: 'check-square-o',
    display: 'form',
    defaults: {
      //text: 'Form',
      form: ''
    },
    fields: [
      //{label: false, name: 'text', fieldset: 'selected .cobler-li-content',},
      {type: 'select', label: 'Form', name: 'form',reference: '_id', choices:'/forms'},
    ],
    //template: '<form name="input" action="/custom_form/submit/{{_id}}" method="get">{{{content}}}<button type="submit" class="btn btn-default">Submit</button></form>',
    toHTML:  function(){

    if(this.attributes._id !== this.attributes.form){
      $.ajax({
          url: '/forms/'+this.attributes.form,
          success: $.proxy(function(response){
            this.attributes._id = response._id;
            this.attributes.content = response.content;
            //$.extendthis.attributes
            this.attributes.title = response.title;
            this.attributes.content =  Hogan.compile('<form id="{{_id}}" method="post" action="/records"><legend>{{title}}</legend>{{{content}}}<input type="hidden" name="form" value="{{_id}}"/><button type="submit" class="btn btn-default">Submit</button></form>').render(this.attributes, templates);

//return Mustache.render('<form name="input" action="/custom_form/submit/{{_id}}" method="get">{{{content}}}<button type="submit" class="btn btn-default">Submit</button></form>', this.attributes);
 
            this.$el.html(this.attributes.content);
          }, this),error:function(){
            alert('Bad Response');
          }
        });
    }else{
      return this.attributes.content;
    }
    },
    //contentFields: true,
  });
});