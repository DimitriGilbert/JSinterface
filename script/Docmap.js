
var Docmap=function()
{
	var t=this;
	t.d=docel;
	
	t.create=function(str)
	{
		return document.createElement(str);
	}
	
	t.append=function(elt,node)
	{
		return node.appendChild(elt);
	}
	
	t.copy=function(elt,node,childs)
	{
		if(child!=false)
		{
			childs=true;
		}
		var elt2=elt.cloneNode(childs);
		return t.append(elt2,node);
	}
	
	t.move=function(elt,node,childs)
	{
		var elt2=t.copy(elt,node,childs);
		t.d.destroy(elt);
		return elt2;
	}
	
	t.append_before=function(elt,node)
	{
		return node.parentNode.insertBefore(elt,node);
	}
	
	t.copy_before=function(elt,node,childs)
	{
		if(child!=false)
		{
			childs=true;
		}
		var elt2=elt.cloneNode(childs);
		return t.append_before(elt2,node);
	}
	
	t.move_before=function(elt,node,childs)
	{
		var elt2=t.copy_before(elt,node,childs);
		t.d.destroy(elt);
		return elt2;

	}
	
	t.append_after=function(elt,node)
	{
		return node.parentNode.insertBefore(elt,node);
	}
	
	t.copy_after=function(elt,node,childs)
	{
		if(child!=false)
		{
			childs=true;
		}
		var elt2=elt.cloneNode(childs);
		return t.append_after(elt2,node);
	}
	
	t.move_after=function(elt,node,childs)
	{
		var elt2=t.copy_after(elt,node,childs);
		t.d.destroy(elt);
		return elt2;

	}
	
	t.copy_attributes=function(elt,n_elt,specif)
	{
		if(specif!=true)
		{
			specif=false;
		}
		var a=elt.attributes;
		var x=0;
		var y=a.lentgh;
		while(x<y)
		{
			if(specif==true)
			{
				if(a[x].specified==true)
				{
					n_elt.setAttribute(a[x].nodeName,a[x].nodeValue);
				}
			}
			else
			{
				n_elt.setAttribute(a[x].nodeName,a[x].nodeValue);
			}
			x++;
		}
	}
	
	t.to_element=function(elt_type,elt)
	{
		var c=elt.childNodes;
		var x=0;
		var y=c.lentgh;
		var nelt=t.create(elt_type);
		t.copy_attributes(elt,nelt);
		while(x<y)
		{
			t.copy(c[x],nelt);
			x++;
		}
		nelt=t.append(nelt,elt.parentNode);
		t.d.destroy(elt);
		return nelt;		
	}
	
	t.offset=function(elt)
	{
		var curleft = curtop = 0;
		if (elt.offsetParent)
		{
			while (elt = elt.offsetParent)
			{
				curleft += elt.offsetLeft;
				curtop += elt.offsetTop;
			}
		}
		else
		{
			if(elt.x)
			{
				curleft=elt.x;
				curtop=elt.y;
			}
			else
			{
				curleft='unavialable';
				curtop='unavialable';
			}
		}
		return [curleft,curtop];
	}
	
	t.position=function(elt)
	{
		if (elt.style.left=='' || elt.style.left=='undefined' || !elt.style.left)
		{
			var l=t.offset(elt)[0];
		}
		else
		{
			var l=parseInt(elt.style.left);
		}
		if(elt.style.top=='' || elt.style.top=='undefined' || !elt.style.top)
		{
			var top=t.offset(elt)[0];
		}
		else
		{
			var top=parseInt(elt.style.top);
		}
		return [l,top];
	}
	
	t.width=function(elt)
	{
		if (elt.style.width=='' || elt.style.width=='undefined' || !elt.style.width)
		{
			return parseInt(elt.offsetWidth);
		}
		else
		{
			return parseInt(elt.style.width);
		}
	}
	
	t.height=function(elt)
	{
		if (elt.style.height=='' || elt.style.height=='undefined' || !elt.style.height)
		{
			return parseInt(elt.offsetHeight);
		}
		else
		{
			return parseInt(elt.style.height);
		}
	}
}

var docmap=new Docmap;
