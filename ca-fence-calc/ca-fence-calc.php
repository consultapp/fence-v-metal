<?php
/*
Plugin Name: Fence Calc
Author: Dmitry Egorov
Author URI: https://consultapp.ru
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_shortcode( 'ca_calculator', 'ca_calculator_func' );
function ca_calculator_func($atts){
	$template = file_get_contents(plugin_dir_path( __FILE__ ).'/template.html');
	$url = get_site_url();

	return str_replace('THEMPLATE_SITE_URL', $url, $template);;
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

  	//акции, привязанные к данному товару
	$promotions = get_the_terms($post_id, 'promotion'); 
	if($promotions){
		$product_promo_discount = get_field('discount', $promotions[0]); //скидка на товар по акции (%)
		
		if($product_promo_discount and $product_promo_discount > 0){
			$post_meta["currentPromotion"] = $product_promo_discount;
		}
	}
					
	//акции, привязанные к категории
	$product_cat = get_the_terms($post_id, 'product_cat'); 
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

		//COLOR
		$colors = get_the_terms($post_id, 'color'); 
		if($colors){
			$post_meta["colors"]=$colors;
			$i=0;
			foreach ($colors as &$color) {
				$c = get_term_meta( $color->term_id, 'color', false );
				$post_meta["colors"][$i++]->color=$c[0];
			}
		}

  return $post_meta;
}

//отправка форм ajax-ом
function send_fence_form(){
	
	if($_REQUEST["honey"] != "not_a_robot"){
		echo json_encode([
			'status'=>false,
			'message'=>"<h3>Система распознала ваше сообщение как спам.</h3><p>Попробуйте отправить письмо ещё раз. Используйте клавиатуру при заполнении полей</p>"
		]);
		wp_die();
	}
	
	$project_name = get_bloginfo('name');
	
	$mail_to = get_field('emails','options');
	if(trim($mail_to)){
		$mail_to = preg_split("/\s*,\s*/",trim($mail_to));
	}else{
		$mail_to = [get_bloginfo('admin_email')];
	}
	
	
	$form_subject = trim($_REQUEST["form_subject"]);
	
	$reply_to = 'noreply@v-metal.by';
	
	if($_REQUEST["E-mail"]) $reply_to = $_REQUEST["E-mail"];
	if($_REQUEST["Почта"]) $reply_to = $_REQUEST["Почта"];
	
	
	//убираем технические ключи из письма
	$tech_keys = ['form_subject','action','response','honey','basket','price'];
	$form_data = array_diff_key($_REQUEST,array_flip($tech_keys));
	
	
	$message = get_html_table($form_data);
	
	$success_message = "<h3>Ваше сообщение успешно отправлено!</h3>".$_REQUEST["calculations"];
	

	// TEST
	$mail_to = ['info@consultapp.ru'];
	
	
		
	function adopt($text) {
		return '=?UTF-8?B?'.Base64_encode($text).'?=';
	}
	
	$headers = "MIME-Version: 1.0" . PHP_EOL .
	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
	'From: '.adopt($project_name).' <noreply@v-metal.by>' . PHP_EOL .
	'Reply-To: '.$reply_to.'' . PHP_EOL;
	
	//Отправка
	if(wp_mail($mail_to, $form_subject, $message, $headers, $attachments)){
		
		echo json_encode([
			'status'=>true,
			'message'=>$success_message
		]);
		
	}else{
		
		echo json_encode([
			'status'=>false,
			'message'=>"<h3>Произошла ошибка при отправке формы</h3><p>Пожалуйста, свяжитесь с администрацией по контактам, указанным на сайте</p>"
		]);
		
	}

	wp_die();
}
add_action( 'wp_ajax_calc_fence', 'send_fence_form' );
add_action( 'wp_ajax_nopriv_calc_fence', 'send_fence_form' );