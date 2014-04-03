<?php


/**
* 
*/
class Jsi_Generator
{
	
	function __construct()
	{
		
	}

	/**
	* load the html template in a DOM object
	* @param $html mixed either DOM object or file path or html string
	* @return DOMDocument
	*/
	public function load_template($html)
	{
		// don't do anything if it is an object
		if (!is_object($html))
		{
			$dom = new DOMDocument();
			// get the content if it is a file
			if (is_file($html))
			{
				$html = file_get_contents($html);
			}

			// trim of tabs and whitespace for DOM processor
			$html = str_replace(array("\r\n", "\r", "\n", "\t"), '', $html);

			$dom->loadXML($html);
		}
		else
		{
			$dom = $html;
		}

		return $dom;
	}

	/**
	* return the root element of the template
	* @param $dom object the DOMDocument
	* @param $root_elt string the tag name of the root element
	* @return DOMNode
	*/
	public function get_root_elt($dom, $root_elt = 'template')
	{
		$root = $dom->getElementsByTagName($root_elt);
		$root = $root->item(0);
		return $root;
	}

	/**
	* generate the javascript template function string
	* @param $dom object the DOMDocument
	* @param $root_elt string the tag name of the root element
	* @return string
	*/
	public function generate_js($dom, $root_elt = 'template')
	{
		$dom = $this->load_template($dom);
		$tpl = $this->generate($dom, $root_elt);
		$root = $this->get_root_elt($dom, $root_elt);

		// set the function name
		$fn_str = 'var '.$root->getAttribute('function_name').' = function(';

		// set function args if needed
		if ($root->hasAttribute('function_args'))
		{
			$fn_str.=$root->getAttribute('function_args');
		}

		$fn_str.=') {
	var tpl = '.$this->json_encode($tpl, $root).';
	return tpl;
};';
		return $fn_str;
	}

	/**
	* generate the array translating the template
	* @param $dom object the DOMDocument
	* @param $root_elt string the tag name of the root element
	* @return array
	*/
	public function generate($dom, $root_elt = 'template')
	{
		$dom = $this->load_template($dom);
		$root = $this->get_root_elt($dom, $root_elt);
		$tpl = $this->parse_child($root->firstChild);

		return $tpl;
	}

	/**
	* parse the element to an array
	* @param $child DOMNode the node to parse
	* @return array 
	*/
	public function parse_child($child)
	{
		$tpl = array();
		$tpl['tag'] = $child->tagName;

		// feed attr array if element has attributes
		if ($child->hasAttributes())
		{
			$tpl['attr'] = $this->parse_attr($child);
		}

		// feed append array if element has child nodes
		if ($child->hasChildNodes())
		{
			$append = array();
			$inner = '';
			foreach ($child->childNodes as $child_node)
			{
				// check if child is a text node
				if (get_class($child_node) !== 'DOMText')
				{
					array_push($append, $this->parse_child($child_node));
				}
				else
				{
					$inner.=$child_node->textContent;
				}
			}

			//
			if (!empty($append))
			{
				$tpl['append'] = $append;
			}

			//
			if ($inner != '')
			{
				$tpl['inner'] = $inner;
			}
		}
		return $tpl;
	}

	/**
	* parse the element attributes to feed the array
	* @param $node DOMNode the node you want to parse the attributes
	* @return array
	*/
	public function parse_attr($node)
	{
		$attr=array();
		foreach ($node->attributes as $a)
		{
			$attr[$a->name] = $a->value;
		}
		return $attr;
	}

	/**
	* encode the template array to a json replacing argument for the js function
	* @param $tpl array the template array
	* @param $root the root node of the template
	* @return string
	*/
	public function json_encode($tpl, $root)
	{
		// encode the template to json
		$json = json_encode($tpl, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

		// if the genrated funciton has arguments, replace them in the json string
		if ($root->hasAttribute('function_args'))
		{
			// get all arguments
			$args=explode(',', $root->getAttribute('function_args'));
			foreach ($args as $a)
			{
				$a = trim($a);
				// to have a parsed argument it must be surrounded by %%
				$json = str_replace('%%'.$a.'%%', '"+'.$a.'+"', $json);
				// %%_ does the same without concatenation
				$json = str_replace('%%_'.$a.'_%%', ''.$a.'', $json);
			}
			// remove unusefull concatenation
			$json = str_replace(array('""+','+""'), '', $json);
		}
		$json = $this->json_parse($json);
		return $json;
	}

	/**
	* parse the json string for special %% tags
	* @param $json string the json to be parsed
	* @return string
	*/
	public function json_parse($json)
	{
		$json = str_replace('"%%func%%', 'function(){', $json);
		$json = str_replace('%%/func%%"', '}', $json);
		return $json;
	}
}

