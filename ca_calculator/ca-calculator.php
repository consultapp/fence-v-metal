<?php
/**
 *  Calculator Plugin React
 * 
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_shortcode( 'ca_calculator', 'ca_calculator_func' );

function ca_calculator_func( $atts ){
	 return "foo = ". $atts['foo'];
}