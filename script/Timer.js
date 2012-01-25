var Timer=function(id)
{
	var t=this;
	//variable pour decelenchement d'action a interval regulier
	t.to_read=[];
	t.reading=false;
	t.current=0;
	t.out='';
	t.interval='';
	
	//variable pour mesurer un interval
	t.start_time='';
	t.snap_times=[];
	
	
	if(!id || id=='')
	{
		t.id='timer';
	}
	else
	{
		t.id=id;
	}
	
	t.add_read=function(f,interval)
	{
		var a=[];
		a['f']=f;
		a['i']=interval;
		t.to_read.push(a);
		return t.to_read.length;
	}
	
	t.read=function()
	{
		t.reading=true;
		t.to_read[t.current]['f']();
		t.current++;
		if(t.current==t.to_read.length)
		{
			t.reading=false;
			clearTimeout(t.out);
			return false;
		}
		t.out=setTimeout(function(){t.read();},t.to_read[t.current]['i']);
	}
}

var timer=new Timer;
