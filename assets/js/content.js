
$('#cobler').on('click', function(e) {
  $(e.target).siblings().removeClass('active');
  $(e.target).addClass('active');
  $('.view, .target').addClass('hidden');
  $('.view_result, .view_source, #editor').removeClass('hidden');

    if(typeof cb === 'undefined'){
      // cb = new cobler({target: '#editor', types: ['form']});

      cb = new Cobler({disabled: false, targets: [document.getElementById('editor')],items:[[]]})
      list = document.getElementById('sortableList');
      cb.addSource(list);     
      list.addEventListener('click', function(e) {
        cb.collections[0].addItem(e.target.dataset.type);
      })
      // cb.on('activate', function(){
      //   if(list.className.indexOf('hidden') == -1){
      //     list.className += ' hidden';
      //   }
      // })
      // cb.on('deactivate', function(){
      //   list.className = list.className.replace('hidden', '');
      // })
 
      // cb.on("change", function(){
      //   if(typeof forms[form] !== 'undefined' && form !== 'builder'){
      //     $.extend(forms[form], {fields: cb.toJSON()[0]});
      //   }else{
      //     $.extend(forms[form], {fields: cb.toJSON()[0]});
      //     $.jStorage.set('form', JSON.stringify(forms[form], undefined, "\t"));
      //   }
      // })

    }

    if(typeof forms[form] !== 'undefined'){
      var temp = $.extend(true, {}, forms[form]);
      // for(var i in temp.fields){

      //   temp.fields[i] = Berry.normalizeItem(Berry.processOpts(temp.fields[i]), i);
      //   switch(temp.fields[i].type) {
      //     case "select":
      //     case "radio":
      //       temp.fields[i].widgetType = 'select';
      //       break;
      //     case "checkbox":
      //       temp.fields[i].widgetType = 'checkbox';
      //       break;
      //     default:
      //       temp.fields[i].widgetType = 'textbox';
      //   }

      // }

      
      list.className = list.className.replace('hidden', '');
      cb.collections[0].load(temp.fields);
    }else{
      // cb.load(JSON.parse(($.jStorage.get('form') || "{}")));
      debugger;

      cb.collections[0].load(JSON.parse(($.jStorage.get('form') || "{}")));
    }

});




document.addEventListener('DOMContentLoaded', function(){

  form = (urlParams['demo'] || 'example');
    $('#cobler').click();

  forms['builder'] = JSON.parse(($.jStorage.get('form') || "{}"));
  for(var i in forms['builder']){
    delete forms['builder'][i].widgetType;
  }

  form = (urlParams['demo'] || 'example');

  setSchema(forms[form])
});


function setSchema(obj){
  forms[form] = obj;
  for(var i in forms[form].fields){
    delete forms[form].fields[i].widgetType;
  }
}

//data
forms = {
  "auto": {
    "fields": {
      "Text": {},
      "Text 2": "",
      "Color": "color",
      "Options 1": ["hello"],
      "Options 2": ["hello","goodbye"],
      "Options 3": ["hello", "more","Another", "dasdf"],
      "Options 5": ["hello", "more","Another", "final","past"],
      "Is?": {"type": "checkbox"}
    }
  },
  "nonfields": {
    "attributes":{"name": "John Doe", "candy": "Other"},
    "inline": true,
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {
        "label": "Favorite Candy",
        "name": "candy",
        "type": "select",
        "value": "",
        "choices": [
          "Lolipops",
          "Chocolate",
          "Other"
        ]
      }
    ]
  },
  "duplicate": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {"name": "fc_container", "legend": "Favorite Candies", "fields": {
        "fc": {"label":false, "multiple": {"duplicate": true, "max": 4, "min": 2}, "fields": {
          "Candy Type": {}
        }
      }}}
    ]
  },
  "conditional": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Title"
      },
      {
        "label": "Favorite Candy",
        "name": "candy",
        "choices": [
          "Lolipops",
          "Chocolate",
          "Other"
        ]
      },
      {"label": "Reason", "type": "textarea", "show": {"matches": {"name": "candy", "value": "Chocolate"}}}  
    ]
  },
  "basic": {
    "fields": [
      {
        "label": "Name"
      },
      {
        "label": "Job Title",
        "name": "title"
      },
      {
        "label": "Favorite State",
        "choices": "data/states.json"
      }
    ]
  },
  "example": {      
    "attributes": {"first_name": "John", "name_last": "Doe"},
    "fields":[
      {"label": "First Name"}, 
      {"label": "Last Name", "name": "name_last"},
      {"label": "Age", "type": "number"},
      {"label": "Favorite Color", "type": "color"}
    ]
  }
}

/*utils*/

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();


var QueryStringToHash = function QueryStringToHash  (query) {
  var query_string = {};
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    pair[0] = decodeURIComponent(pair[0]);
    pair[1] = decodeURIComponent((pair[1] || "").split('+').join(' '));
      // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
  return query_string;
};
