<?php
include_once 'jsi_generator.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>jsi_generator example</title>
</head>
<body>
<?php

$html = '
<template function_name="dummy_tpl" function_args="hello, world">
	<div id="parent_div" class="plop">
		<div id="first_child">
			<div id="first_first_child" class="plip">
				<p>
					<span><a href="http://google.com" target="_blank">google</a></span>
				</p>
			</div>
			<div id="first_second_child" class="ploup %%world%%">
				<p>
					<span><a href="http://google.com"></a></span>
					<span onclick="%%func%%alert(\'plop\');%%/func%%">%%hello%%</span>
				</p>
			</div>
		</div>
	</div>
</template>
';


$j = new Jsi_Generator();

?>
<section id="container"></section>
<script type="text/javascript" src="jsinterface.js"></script>
<script type="text/javascript">
	<?php echo $j->generate_js($html); ?>
	Jsi.append('container', dummy_tpl('hi', 'everyone'));	
</script>
<script type="text/javascript">
</script>
</body>
</html>