var Jsi = {};

/**
* element already created as cloning is faster than creating
*/
Jsi.created = {};

/**
* document.getElementById shorcut
* @param id string the element id
* @return object DOMElement
*/
Jsi.docelid = function (id) {
	return document.getElementById(id);
}

/**
* append an element to a parent
* @param parent mixed the element to append to or its id
* @param elt mixed DOMElement or template object to append to parent
* @return object DOMElement
*/
Jsi.append = function (parent, elt) {
	if (elt.tag != undefined) {
		elt = this.elt(elt);
	}
	if (typeof parent != 'object') {
		parent = this.docelid(parent);
	}

	parent.appendChild(elt);

	elt = null;

	return parent;
}

/**
* append an element to a parent as its first child
* @param parent mixed the element to append to or its id
* @param elt mixed DOMElement or template object to append to parent
* @return object DOMElement
*/
Jsi.prepend = function (parent, elt) {
	if (elt.tag != undefined) {
		elt = this.elt(elt);
	}
	if (typeof parent != 'object') {
		parent = this.docelid(parent);
	}

	if (parent.childNodes.length == 0) {
		this.append(parent, elt);
	}
	else{
		parent.insertBefore(elt, parent.firstChild);
	}

	return parent;
}

/**
* create a text node
* @param content string the content of the text node
*/
Jsi.textNode = function(content){
	return document.createTextNode(content);
};

/**
* create an element from a template object
* @param c object the template object to be created
* @return object DOMElement
*<exemple>
*{
*	"tag":"type of element",
*	"attr":{
*		"attribute1":"value of attr 1",
*		"...":"..."
*	},
*	"inner":"the text content of the node"
*}
*</exemple>
*/
Jsi.elt = function(c) {
	// check if the element tag has already been created to clone it
	if (this.created[c.tag] == undefined) {
		this.created[c.tag] = document.createElement(c.tag);
		var elt = this.created[c.tag].cloneNode();
	}
	else {
		var elt=this.created[c.tag].cloneNode();		
	}
	// create element attribute
	if(c.attr !== undefined)
	{
		for(var key in c.attr)
		{
			// handle element event or certain specific attribute
			switch(key){
				case 'onclick':
					elt.addEventListener('click', c.attr[key]);
					break;
				case 'onchange':
					elt.addEventListener('change', c.attr[key]);
					break;
				case 'onfocus':
					elt.addEventListener('focus', c.attr[key]);
					break;
				case 'onkeyup':
					elt.addEventListener('keyup', c.attr[key]);
					break;
				case 'onkeypress':
					elt.addEventListener('keypress', c.attr[key]);
					break;
				case 'onsubmit':
					elt.addEventListener('submit', c.attr[key]);
					break;
				case 'checked':
					elt.checked = c.attr[key];
					break;
				case 'className':
					elt.setAttribute('class',c.attr[key]);
					break;
				default:
					elt.setAttribute(key,c.attr[key]);
					break;
			}
		}
	}

	// in some case you want to be able to force innerHTML value, 
	// /!\ THIS IS BAAAAAAD !
	if (c.innerForce !== undefined) {

		elt.innerHTML = c.innerForce;
	};

	// append elements if there are some 
	if (c.append !== undefined) {
		for (var ap in c.append) {
			if (c.append[ap].tag !== undefined) {
				elt = this.append(elt, this.elt(c.append[ap]));
			}
			else{
				elt = this.append(c.append[ap]);
			}
		}
	}

	// prepend elements
	if (c.prepend !== undefined) {
		for (var ap in c.prepend) {
			if (c.prepend[ap].tag !== undefined) {
				elt = this.prepend(elt, this.elt(c.prepend[ap]));
			}
			else{
				elt = this.prepend(c.prepend[ap]);
			}
		}
	}
	
	// create inner text content node and append it
	if (c.inner !== undefined){
		elt.appendChild(this.textNode(c.inner));
	}
	return elt;
};

Jsi.remove = function (elt) {
	if (typeof elt != 'object') {
		elt = this.docelid(elt);
	}

	return elt.parentNode.removeChild(elt);
}

Jsi.empty = function (elt) {
	if (typeof elt != 'object') {
		elt = this.docelid(elt);
	}

	while(elt.lastChild){
		elt.removeChild(elt.lastChild);
	}

	return elt;
}