var Docel=function()
{
	var t=this;
	
	/*****************************selection d'elements**********************************/
	
	t.id=function(str)
	{
		return document.getElementById(str);
	}
	
	t.class_name=function(str)
	{
		try
		{
			return document.getElementsByClassName(str);	
		}
		catch(e)
		{
			var elements = document.getElementsByTagName("*");
			var result = [];
			for(z=0;z<elements.length;z++)
			{
				if(elements[z].getAttribute("class") == n)
				{
					result.push(elements[z]);
				}
			}
			return result;
		}
	}
	
	t.nth_child=function(elt,nth)
	{
		if(Is.string(elt))
		{
			elt=t.id(elt);
		}
		var c=elt.childNodes;
		var l=c.length;
		if(l>nth)
		{
			return c[l-1];
		}
		else
		{
			return c[nth];
		}
	}
	
	t.sibling=function(elt)
	{
		if(Is.string(elt))
		{
			elt=t.id(elt);
		}
		
		return elt.parentNode.childNodes;
	}
	
	/***************************************modification d'element*******************************/
	
	t.destroy=function(elts)
	{
		if(Is.array(elts))
		{}
		else
		{
			elts=[elts];
		}
		var x=0;
		var y=elts.length;
		while(x<y)
		{
			if(Is.string(elts[x]))
			{
				elts[x]=t.id(elts[x]);
			}
			
			elts[x].parentNode.removeChild(elts[x]);
				
			x++;
		}

	}
	
	t.empty=function(elts)
	{
		if(Is.array(elts))
		{}
		else
		{
			elts=[elts];
		}
		var x=0;
		var y=elts.lentgh;
		var c="";
		var z=0;
		var w=0;
		while(x<y)
		{
			if(Is.string(elts[x]))
			{
				elts[x]=t.id(elts[x]);
			}
			c=elts[x].childNodes;
			w=c.lentgh;
			while(z<w)
			{
				elts[x].removeChild(c[z]);
				z++;
			}
			z=0;
			x++;
		}
	}
	
}

var docel=new Docel;

