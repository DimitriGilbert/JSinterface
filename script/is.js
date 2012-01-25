var IS=function()
{
	var t=this;
	
	t.of=function(str,obj)
	{
		if (obj.constructor.toString().indexOf(str) == -1)
		{
			return false;
		}
		else
		{
			return true; 
		}
	}
	
	t.array=function(obj)
	{
		return t.of("Array",obj);
	}
	
	t.string=function(obj)
	{
		return t.of("String",obj);
	}
	
	t.num_int=function(obj)
	{
		return t.of("Int",obj);
	}
	
	t.num_float=function(obj)
	{
		return t.of("Float",obj);
	}
}

var Is=new IS;

