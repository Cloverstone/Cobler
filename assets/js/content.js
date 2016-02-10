//cb = new Cobler({ disabled: false, targets: [document.getElementById('editor'),document.getElementById('editor2')],items:[[]]})

cb = new Cobler({ disabled: false, targets: document.getElementsByClassName('widget_container'),items:[[]]})

list = document.getElementById('sortableList');
cb.addSource(list);
list.addEventListener('click', function(e) {
$(e.target).closest('li')
  cb.collections[0].addItem($(e.target).closest('li').data('type'));
})