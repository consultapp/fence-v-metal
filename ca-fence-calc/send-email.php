<?php 
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
	
	$success_message = "<h3>Ваше сообщение успешно отправлено!</h3>";
	

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
add_action('wp_ajax_calc_fence', 'send_fence_form' );