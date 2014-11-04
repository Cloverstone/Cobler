$(function(){
  cobler.register({
    type: 'gallery',
    category: 'none',
    icon: 'camera',
    display: 'Gallery',
    defaults: {
      name: ''
    },
    fields: [
      {type: 'select', label: 'Gallery', name: 'name',reference:'name', fieldset: 'alt-form', choices: '/galleries?list'},
    ],
    blur: function() {
      if(this.attributes.name.length === 0) {
        this.owner.remove(this.id);
      }
    },
    toHTML:  function(){
      return $('<div>').html(this.attributes.name);
    }
  });
});