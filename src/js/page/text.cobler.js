$(function(){
  cobler.register({
    type: 'text',
    category: 'none',
    icon: 'align-justify',
    display: 'Content',
    defaults: {
      text: 'Add some text here...',
      width: '12',
      type: 'text',
      required: false,
      help: ''
    },
    fields: [
      {type: 'textarea', advanced: true, label: '', name: 'text', fieldset: 'selected .cobler-li-content'},
      {type: 'custom_radio', label: 'Alignment', name: 'align', choices: [
        {label: 'Left', value: 'left'},
        {label: 'Center', value: 'center'},
        {label: 'Justify', value: 'justify'},
        {label: 'Right', value: 'right'}
      ]},
      {type: 'custom_radio', label: 'Float', name: 'float', choices: [
        {label: 'Left', value: 'left'},
        {label: 'Right', value: 'right'}
      ]}
    ],
    blur: function() {
      if(this.attributes.text.length === 0) {
        this.owner.remove(this.id);
      }
    },
    toHTML:  function(){
      return $('<div>').html(this.attributes.text);
    },
    contentFields: true,
    editView:  function(){
      return '';
    }
  });
});