$(function(){
  cobler.register({
    type: 'Content',
    category: 'content',
    icon: 'align-justify',
    display: 'Editable Content',
    defaults: {
      text: 'Add some text here...',
      width: 12,
      type: 'text',
      required: false,
      help: ''
    },
    createEL: function() {
      if(cb.options.editable){
        this.$el = $(Berry.render('cobler_element', this));
      }else{
        this.$el = $(Berry.render('cobler_element_noedit', this));
      }
      this.$el.find('.cobler-li-content').append(this.toHTML());
      return this.$el;
    },
    fields: [
      {type: 'contenteditable', label: false, name: 'text', fieldset: 'selected .cobler-li-content', unstyled: true},
      //{type: 'fieldset',name:'choices_c', legend: '<i class="fa fa-th-list"></i> Choices', inline: true, fields:[
        {type: 'select', label: 'Width', name: 'width', force: true, choices:[
          {name: 'Quarter', value: 3},
          {name: 'Half', value: 6},
          {name: 'Full', value: 12}
        ]},
        
     // ]}
    ],
    blur: function() {
      if(this.attributes.text.length === 0 && this.attributes.text !== '<br>' && this.attributes.text !== 'Add some text here...') {
        this.owner.remove(this.id);
      }
      $('.pen-menu').remove();
    },
    toHTML:  function() {
      return $('<div>').html(this.attributes.text);
    },
    contentFields: true,
    editView:  function() {
      return '';
    }
  });
});