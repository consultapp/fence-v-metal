<?php
/*
Plugin Name: Fence Calc
Author: Dmitry
Author URI: https://consultapp.ru
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_shortcode( 'ca_calculator', 'ca_calculator_func' );
function ca_calculator_func($atts){
	 return file_get_contents(plugin_dir_path( __FILE__ ).'/template.html');
}


// подключить стили и скрипты
add_action( 'wp_enqueue_scripts', 'fence_calc_name_scripts' );
function fence_calc_name_scripts() {
	wp_enqueue_style( 'style-name', '/wp-content/plugins/ca-fence-calc/assets/index.css' );
	// wp_enqueue_script( 'script-name',  '/wp-content/plugins/ca-fence-calc/assets/index-0xo68vUk.js', array(), '1.0.0', true );
}



// WP REST API 
add_action( 'rest_api_init', 'create_api_products_meta_field' );

function create_api_products_meta_field() {
	register_rest_field( 'product', 'meta', array(
	       'get_callback'    => 'get_product_meta_for_api',
	       'schema'          => null,
	    )
	);
}

function get_product_meta_for_api( $object ) {
	$post_id = $object['id'];

  $post_meta = get_post_meta( $post_id );
  $post_image = get_post_thumbnail_id( $post_id );      
  $post_meta["group_image"] = wp_get_attachment_image_src($post_image)[0];

	$promotions = get_the_terms($post_id, 'promotion'); //акции, привязанные к данному товару
	if($promotions){
		$product_promo_discount = get_field('discount', $promotions[0]); //скидка на товар по акции (%)
		
		if($product_promo_discount and $product_promo_discount > 0){
			$post_meta["currentPromotion"] = $product_promo_discount;
		}
	}
							
	$product_cat = get_the_terms($post_id, 'product_cat'); //акции, привязанные к данному товару
	if($product_cat){
		$term = get_term( $product_cat[0]->term_id  );
		
		if($term && $term->slug == 'profile-pipe'){
			$post_meta["productCat"] = $term->slug ;
			$discounts = get_term_meta( 8, 'discounts', false )[0];
			$post_meta["profilePipeDiscount"] = '';
			for ($i = 0; $i < $discounts; $i++) {
				$d = get_term_meta( 8, 'discounts_'.$i.'_discount', false )[0];
				$a = get_term_meta( 8, 'discounts_'.$i.'_amount', false )[0];
				$post_meta["profilePipeDiscount"].=$a.'-'.$d.';';
			}
		}
	}

  return $post_meta;
}