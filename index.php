<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" href="" type="text/css" media="all" />
		<title></title>
	</head>
	<body>
		<?php
		function concat($files=false)
		{
			$str='';
			if(!$files)
			{
				$files=scandir('script');
			}
			foreach($files as $f)
			{
				if($f!='.' and $f!='..')
				{
					$str.=file_get_contents('script/'.$f);
				}
			}
			
			return $str;
		}
		//compress js and css script
		
		?>
		<a href="?a=concat">Creer jsinterface en mode decompressé</a><br />
		<a href="?a=mini" id='truc'>Creer jsinterface en mode minifié</a><br />
		<?php
		if(!isset($_GET))
		{
		
		}
		else
		{
			switch($_GET['a'])
			{
				case 'concat';
					file_put_contents('jsinterface.js',concat(array('is.js','Docel.js','Docmap.js','Timer.js','Animation.js','jsi.js')));
					break;
				case 'mini';
					include_once('jsmin.php');
					file_put_contents('jsinterface.js',jsmin::minify(concat(array('is.js','Docel.js','Docmap.js','Timer.js','Animation.js','jsi.js'))));
					break;
			}
		}
		
		?>
		<script type="text/javascript" src="jsinterface.js"></script>
	</body>
</html>
