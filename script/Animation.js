var Animation=function(tm)
{
	var t=this;
	t.animated=[];
	t.return_mode=false;
	t.ie=false;
	if(!tm)
	{
		t.timer=timer;
	}
	else
	{
		t.timer=tm;
	}
	
	
	t.move=function(id,x,y)
	{
		var elt=docel.id(id);
		var cur=docmap.position(elt);
		var _x=parseInt(cur[0])+x;
		var _y=parseInt(cur[1])+y;
//		alert(cur+' '+x+' '+_x+' '+y+' '+_y)
		elt.style.position='relative';
		elt.style.top=_y+'px';
		elt.style.left=_x+'px';
	}
	
	t.opacify=function(id,o)
	{
		var elt=docel.id(id);
		var n_o=elt.style.opacity;
		if(n_o=='')
		{
			n_o=1;
		}
		else
		{
			n_o=parseFloat(n_o);
		}
		n_o*=1000;
		n_o=(n_o+o)/1000;
		elt.style.opacity=n_o;
	}
	
	t.width=function(id,o)
	{
		var elt=docel.id(id);
		var cur=docmap.width(elt);
		var _x=cur+o;
		elt.style.width=_x+'px';
	}
	
	t.translation=function(id,left,top,time,fps)
	{
		if(t.animated[id]==undefined)
		{
			var anim_info=[];
			anim_info['id']=id;
			anim_info['names']=['translation'];		
			anim_info['animation']=[];
			anim_info['animation']['f']=[];
			anim_info['animation']['i']=[];
		}
		else
		{
			t.animated[id]['names'].push('translation');
			var anim_info=t.animated[id];
		}
		
		
		if(!time)
		{
			var time=1;
		}
		if(!fps)
		{
			var fps=25;
		}
		var nb_frame=parseInt(time*fps);
		if((top<nb_frame && top>0) || (top>(-nb_frame) && top<0))
		{			
			if(top>0)
			{
				var top_per_frame=1;
				var plus_top=nb_frame-top;
			}
			else
			{
				var top_per_frame=-1;
				var plus_top=(-nb_frame)+top;
			}			
		}
		else
		{
			var top_per_frame=top/nb_frame;
			var plus_top=top%nb_frame;
		}
		if((left<nb_frame && left>0) || (left>(-nb_frame) && left<0))
		{
			var left_per_frame=1;
			if(left>0)
			{
				var left_per_frame=1;
				var plus_left=nb_frame-left;
			}
			else
			{
				var left_per_frame=-1;
				var plus_left=(-nb_frame)+left;
			}			
		}
		else
		{
			var left_per_frame=left/nb_frame;
			var plus_left=left%nb_frame;
		}
		
		var x=0;
		var time_per_frame=(time*1000)/nb_frame;
		var elt=docel.id(id);
		
		if(anim_info['start_position']==undefined)
		{			
			var cur=docmap.position(elt);
			anim_info['start_position']=cur;
		}
		
		top_per_frame=parseInt(top_per_frame);
		left_per_frame=parseInt(left_per_frame);
//		alert(time_per_frame+'ms x : '+left_per_frame+'px y : '+top_per_frame+'px');
		while(x<nb_frame)
		{	
			if(x+1==nb_frame)
			{
				if(!t.return_mode)
				{
					t.timer.add_read(function(){t.move(id,left_per_frame+plus_left,top_per_frame+plus_top);},time_per_frame);
				}
				anim_info['animation']['f'].push(function(){t.move(id,left_per_frame+plus_left,top_per_frame+plus_top);});
				anim_info['animation']['i'].push(time_per_frame);
				
			}
			else
			{
				if(!t.return_mode)
				{
					t.timer.add_read(function(){t.move(id,left_per_frame,top_per_frame);},time_per_frame);
					
				}
				anim_info['animation']['f'].push(function(){t.move(id,left_per_frame,top_per_frame);});
				anim_info['animation']['i'].push(time_per_frame);
				
			}
			
			x++;
		}		
		t.animated[id]=anim_info;
		if(t.timer.reading)
		{
			return anim_info['animation'];
		}
		else
		{
			t.timer.read();
			return anim_info['animation'];
		}
	}
	
	t.opacification=function(id,o,time,fps,start_o)
	{
		o*=1000;
		if(t.animated[id]==undefined)
		{
			var anim_info=[];
			anim_info['id']=id;
			anim_info['names']=['opacification'];
			anim_info['animation']=[];
			anim_info['animation']['f']=[];
			anim_info['animation']['i']=[];
		}
		else
		{
			t.animated[id]['names'].push('opacification');
			var anim_info=t.animated[id];			
		}		
		
		if(!time)
		{
			var time=1;
		}
		if(!fps)
		{
			var fps=25;
		}
		var nb_frame=parseInt(time*fps);		
		
		var x=0;
		var time_per_frame=(time*1000)/nb_frame;
		var elt=docel.id(id);
		
		if(start_o)
		{
			var cur=start_o*1000;
		}
		else
		{
			var cur=elt.style.opacity;
		}
		
		if(cur=='')
		{
			cur=1000;
		}
		else
		{
			cur*=1000;
		}
		
		if(anim_info['start_opacity']==undefined)
		{
			anim_info['start_opacity']=cur;
		}
		
		var opacity_per_frame=(o-cur)/nb_frame;
		
		while(x<nb_frame)
		{
			if(!t.return_mode)
			{
				t.timer.add_read(function(){t.opacify(id,opacity_per_frame);},time_per_frame);
				
			}
			anim_info['animation']['f'].push(function(){t.opacify(id,opacity_per_frame);});
			anim_info['animation']['i'].push(time_per_frame);
			x++;
		}		
		t.animated[id]=anim_info;
		if(t.timer.reading)
		{
			return anim_info['animation'];
		}
		else
		{
			t.timer.read();
			return anim_info['animation'];
		}
	}
	
	t.widen=function(id,o,time,fps,start_o)
	{
		if(t.animated[id]==undefined)
		{
			var anim_info=[];
			anim_info['id']=id;
			anim_info['names']=['widen'];
			anim_info['animation']=[];
			anim_info['animation']['f']=[];
			anim_info['animation']['i']=[];
		}
		else
		{
			t.animated[id]['names'].push('widen');
			var anim_info=t.animated[id];			
		}		
		
		if(!time)
		{
			var time=1;
		}
		if(!fps)
		{
			var fps=25;
		}
		var nb_frame=parseInt(time*fps);		
		
		var x=0;
		var time_per_frame=(time*1000)/nb_frame;
		var elt=docel.id(id);
		
		if(start_o)
		{
			var cur=start_o;
		}
		else
		{
			var cur=docmap.width(elt);
		}
		
		if(cur=='')
		{
			cur=0;
		}
		
		if(anim_info['start_width']==undefined)
		{
			anim_info['start_width']=cur;
		}
		
		if(o>=cur)
		{
			var width_per_frame=(o-cur)/nb_frame;
		}
		else
		{
			var width_per_frame=-((cur-o)/nb_frame);
		}		
		
		while(x<nb_frame)
		{
			if(!t.return_mode)
			{
				t.timer.add_read(function(){t.width(id,width_per_frame);},time_per_frame);
				
			}
			anim_info['animation']['f'].push(function(){t.width(id,width_per_frame);});
			anim_info['animation']['i'].push(time_per_frame);
			x++;
		}		
		t.animated[id]=anim_info;
		if(t.timer.reading)
		{
			return anim_info['animation'];
		}
		else
		{
			if(!return_mode)
			{
				t.timer.read();
			}
			
			return anim_info['animation'];
		}
	}
	
	t.combine=function(combined)
	{
		var old_r_mode=t.return_mode;
		t.return_mode=true;
		var x=0;
		var y=combined.length;
		var z=0;
		var animz=[];
		var maxi=0;
		var anim_array=[];
		animz['f']=[];
		animz['i']=[];
		while(x<y)
		{
			combined[x]=combined[x]();
			if(combined[x].length>maxi)
			{
				maxi=combined[x].length;
			}
			x++;
		}
		while(z<maxi)
		{
			x=0;
			while(x<y)
			{
				if(combined[x]['f'][y]!=undefined)
				{
					if(!old_r_mode)
					{
						t.timer.add_read(combined[x]['f'][y],combined[x]['i'][y]);
					}					
					animz['f'].push(combined[x]['f'][y]);
					animz['i'].push(combined[x]['i'][y]);
				}
				x++;
			}
			z++;
		}
		if(t.timer.reading)
		{
			t.return_mode=old_r_mode;
			return animz;
		}
		else
		{
			if(!old_r_mode)
			{
//				t.timer.read();
			}
			t.return_mode=old_r_mode;
			return animz;
		}
	}
	
	t.replay=function(start_index)
	{
		if(!t.timer.reading)
		{
			if(!start_index)
			{
				t.timer.current=0;
			}
			else
			{
				t.timer.current=start_index;
			}
			t.timer.read();
		}
	}
}

var animation=new Animation;
