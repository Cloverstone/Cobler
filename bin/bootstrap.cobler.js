if (!!!templates) var templates = {};
templates["conditional"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div>");t.b("\n" + i);t.b("<div class=\"col-md-6\" style=\"padding-right: 5px;\">");t.b("\n" + i);t.b("	<div class=\"well arrow_box arrow_box_bottom\">");t.b("\n" + i);t.b("		<h4>If <span style=\"font-size:55%;color:#888\">Lead Search meets the following criteria</span></h4>");t.b("\n" + i);if(t.s(t.f("conditions",c,p,1),c,p,0,222,294,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		 <div class=\"condition-item\"><b>");t.b(t.v(t.f("condition",c,p,0)));t.b(":</b> ");t.b(t.v(t.f("value",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}t.b("	</div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\"col-md-6\">");t.b("\n" + i);t.b("	<div class=\"well arrow_box arrow_box_left\">");t.b("\n" + i);t.b("		<h4>Then</h4>");t.b("\n" + i);if(t.s(t.f("actions",c,p,1),c,p,0,423,494,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		 <div class=\"condition-item\"><b>");t.b(t.v(t.f("action",c,p,0)));t.b(":</b> ");t.b(t.v(t.f("subject",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}t.b("	</div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<style>");t.b("\n" + i);t.b(".condition-item{");t.b("\n" + i);t.b("	line-height: 25px;");t.b("\n" + i);t.b("	border-top:dashed 1px #eee;");t.b("\n" + i);t.b("}");t.b("\n" + i);t.b(".arrow_box {");t.b("\n" + i);t.b("	position: relative;");t.b("\n" + i);t.b("	background: #fff;");t.b("\n" + i);t.b("	border: 4px solid #ccc;");t.b("\n" + i);t.b("	color:#666;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n" + i);t.b(".arrow_box h4{");t.b("\n" + i);t.b("color: #999;");t.b("\n" + i);t.b("font-size: 20px;");t.b("\n" + i);t.b("line-height: 20px;");t.b("\n" + i);t.b("font-weight: bold;");t.b("\n");t.b("\n" + i);t.b("}");t.b("\n" + i);t.b(".arrow_box:after, .arrow_box:before {");t.b("\n" + i);t.b("	border: solid transparent;");t.b("\n" + i);t.b("	content: \" \";");t.b("\n" + i);t.b("	height: 0;");t.b("\n" + i);t.b("	width: 0;");t.b("\n" + i);t.b("	position: absolute;");t.b("\n" + i);t.b("	pointer-events: none;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n");t.b("\n" + i);t.b(".arrow_box_bottom:after, .arrow_box_bottom:before {");t.b("\n" + i);t.b("	top: 100%;");t.b("\n" + i);t.b("	left: 50%;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n" + i);t.b(".arrow_box_bottom:after {");t.b("\n" + i);t.b("	border-color: rgba(136, 183, 213, 0);");t.b("\n" + i);t.b("	border-top-color: #fff;");t.b("\n" + i);t.b("	border-width: 18px;");t.b("\n" + i);t.b("	margin-left: -18px;");t.b("\n" + i);t.b("}");t.b("\n" + i);t.b(".arrow_box_bottom:before {");t.b("\n" + i);t.b("	border-color: rgba(194, 225, 245, 0);");t.b("\n" + i);t.b("	border-top-color: #ccc;");t.b("\n" + i);t.b("	border-width: 24px;");t.b("\n" + i);t.b("	margin-left: -24px;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n" + i);t.b(".arrow_box_left:after, .arrow_box_left:before {");t.b("\n" + i);t.b("	left: -28px;");t.b("\n" + i);t.b("	top: 55px;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n" + i);t.b(".arrow_box_left:after {");t.b("\n" + i);t.b("	border-color: rgba(136, 183, 213, 0);");t.b("\n" + i);t.b("	border-left-color: #fff;");t.b("\n" + i);t.b("	border-width: 18px;");t.b("\n" + i);t.b("	margin-top: -18px;");t.b("\n" + i);t.b("}");t.b("\n" + i);t.b(".arrow_box_left:before {");t.b("\n" + i);t.b("	border-color: rgba(194, 225, 245, 0);");t.b("\n" + i);t.b("	border-left-color: #aec;");t.b("\n" + i);t.b("	border-width: 24px;");t.b("\n" + i);t.b("	margin-top: -24px;");t.b("\n" + i);t.b("}");t.b("\n");t.b("\n" + i);t.b("</style>");t.b("\n");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["controls"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<!--a class=\"btn btn-danger\" id=\"removeactive\" href=\"javascript:void(0)\" style=\"display:inline-block;float:right;margin-bottom:5px;margin-top:-10px\" <i class=\"fa fa-times\"></i> Remove</a-->");t.b("\n" + i);t.b("<a class=\"btn btn-primary tooltips\" id=\"showwidgets\" href=\"javascript:void(0)\" style=\"margin-bottom:5px;margin-top:-10px\" data-original-title=\"Add Field\"><i class=\"fa fa-th\"></i></a>");t.b("\n" + i);t.b("<ul id=\"cb-source\" class=\"ui-sortable list-group\" style=\"display: block;\">");t.b("\n" + i);t.b("</ul>");t.b("\n" + i);t.b("<header class=\"panel-heading bg-white\" style=\"overflow:hidden;display:none\">");t.b("\n" + i);t.b("</header>");t.b("\n" + i);t.b("<div class=\"panel-body\" style=\"padding:0\">");t.b("\n" + i);t.b("	<div id=\"cb-form\" style=\"overflow-y: scroll;overflow-x: hidden;position: absolute;left: 15px;right: 15px;bottom: 0;top: 85px;\"></div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
templates["element"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li data-name=\"");t.b(t.v(t.f("type",c,p,0)));t.b("\" class=\"");if(t.s(t.f("contentFields",c,p,1),c,p,0,50,56,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("noveil");});c.pop();}t.b(" pull-");t.b(t.v(t.d("attributes.width",c,p,0)));if(t.s(t.d("attributes.width",c,p,1),c,p,0,121,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("left");});c.pop();}t.b(" width");t.b(t.v(t.d("attributes.width",c,p,0)));t.b("\" style=\"position: relative; display: block;\" id=\"");t.b(t.v(t.f("uuid",c,p,0)));t.b("\">");t.b("\n" + i);t.b("	<div class=\"cobler-li-content\"></div>");t.b("\n" + i);t.b("	<div class=\"btn-group actions\" style=\"opacity:.6\">");t.b("\n" + i);t.b("		<span class=\"remove-item btn btn-danger fa fa-trash-o\" data-title=\"Remove\"></span>");t.b("\n" + i);t.b("		<span class=\"duplicate-item btn btn-default fa fa-copy\" data-title=\"Duplicate\"></span>");t.b("\n" + i);t.b("	</div>");t.b("\n" + i);t.b("</li>");return t.fl(); },partials: {}, subs: {  }});
templates["groups"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"row clearfix ");t.b(t.v(t.f("modifiers",c,p,0)));t.b(" ");if(t.s(t.d("multiple.duplicate",c,p,1),c,p,0,62,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("dupable\" data-min=\"");t.b(t.v(t.d("multiple.min",c,p,0)));t.b("\" data-max=\"");t.b(t.v(t.d("multiple.max",c,p,0)));});c.pop();}t.b("\" name=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-type=\"");t.b(t.v(t.f("type",c,p,0)));t.b("\">");t.b("\n" + i);t.b(t.rp("<berry__label0",c,p,"	"));if(t.s(t.d("multiple.duplicate",c,p,1),c,p,0,231,381,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("	<div class=\"duplicate add btn btn-default\"><i class=\"fa fa-plus\"></i></div>");t.b("\n" + i);t.b("	<div class=\"btn btn-default remove\"><i class=\"fa fa-minus\"></i></div>");t.b("\n" + i);});c.pop();}t.b("	<div class=\"item-content\" style=\"clear:both\">");t.b("\n" + i);t.b("		");t.b(t.v(t.f("content",c,p,0)));t.b("\n" + i);t.b(t.rp("<berry__addons1",c,p,"		"));t.b("	</div>");t.b("\n" + i);t.b(t.rp("<berry__popins2",c,p,"		"));t.b("</div>");return t.fl(); },partials: {"<berry__label0":{name:"berry__label", partials: {}, subs: {  }},"<berry__addons1":{name:"berry__addons", partials: {}, subs: {  }},"<berry__popins2":{name:"berry__popins", partials: {}, subs: {  }}}, subs: {  }});
templates["init"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"cb-starter\">");t.b("\n" + i);t.b("	To Begin click on or drag a WIDGET from the right and drop it on ME! <i class=\"fa fa-arrow-right\"></i> ");t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div id=\"cb-content\" class=\"form-horizontal\"></div>");return t.fl(); },partials: {}, subs: {  }});
templates["widget"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li data-name=\"");t.b(t.v(t.f("type",c,p,0)));t.b("\" class=\"list-group-item\" style=\"position: relative;\">");t.b("\n" + i);t.b("	");if(t.s(t.f("icon",c,p,1),c,p,0,88,129,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<i class=\"fa fa-");t.b(t.v(t.f("icon",c,p,0)));t.b(" icon-muted\"></i>");});c.pop();}t.b("&nbsp;");t.b(t.t(t.f("display",c,p,0)));t.b("\n" + i);t.b("</li>");return t.fl(); },partials: {}, subs: {  }});
