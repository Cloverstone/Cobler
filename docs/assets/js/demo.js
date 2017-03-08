Cobler.types.Content = function(target){
  function render() {
    return templates['widgets_content'].render(get(), templates);
  }
  function get() {
    item.widgetType = 'Content';
    return item;
  }
  function set(newItem) {
    $.extend(item, newItem);
  }
  var item = {
    title: 'This is the title',
    text: 'Here is some text'
  }

  return {
    render: render,
    toJSON: get,
    edit: function(target) {

      return function() {

        $(target.elementOf(this)).find('.panel-body').html(
          '<form><div>Title: <input class="form-control" name="title" value="'+this.get().title+'"><br> Text: <textarea class="form-control" name="text">'+this.get().text+'</textarea></div><br> <button class="btn btn-success pull-right">Save</button><button class="btn btn-default" type="button">Cancel</button></form>'
          ).find('form').on('submit', function(e){
            var temp = $(e.currentTarget).serializeArray()
            var old = this.get();
            for(var i in temp){
              old[temp[i].name] = temp[i].value;
            }
            target.update(old, this);
            return false;
          }.bind(this)).find('.btn-default').on('click', function(e){
            target.update(this.get(), this);
            target.deactivate();
          }.bind(this));
      }

    }.call(this, target),
    get: get,
    set: set,
  }
}


//cb = new Cobler({ disabled: false, targets: [document.getElementById('editor'),document.getElementById('editor2')],items:[[]]})

var data = JSON.parse('[[{"title":"This is the title","text":"Here is some text","widgetType":"Content"}],[],[]]');

cb = new Cobler({ disabled: false, targets: document.getElementsByClassName('widget_container'), items:data})
// list = document.getElementById('sortableList');
// cb.addSource(document.getElementById('sortableList'));
// list.addEventListener('click', function(e) {
//   cb.collections[0].addItem($(e.target).closest('li').data('type'));
// })

// cbMain = new Cobler({ disabled: false,group:'fieldsets', targets: [$('.row')[0]],items:[[]]})

// document.getElementById('addFieldset').addEventListener('click', function(e) {
//   cbMain.collections[0].addItem('fieldset');
//   cbMain.on('change',function(s){
//     // debugger;
//     var temp = $('<div>').addClass('widget_target')
//     $('[name='+s.get().name+']').append(temp);
//     cb.addCollection(temp[0], [])
//   })
//   // cb.addCollection()
// })
// mysortable = Sortable.create($('.row')[0])
// function getOrdered() {
//   var items = cb.toJSON({editor:true});
//   return _.map(mysortable.toArray(), function(item){
//     debugger;
//     return _.findWhere(items, {target: item})['items']
//   })
// }



cb.on('change',function(){
          $('.result').html("<pre>"+JSON.stringify(cb.toJSON({editor:true}), undefined, "  ")+"</pre>");
})
cb.on('moved',function(){
          $('.result').html("<pre>"+JSON.stringify(cb.toJSON({editor:true}), undefined, "  ")+"</pre>");
})
cb.trigger('change');

