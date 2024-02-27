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
	
	$attachments = [];
	$blocked_attachments = [];
	$allowed_file_extensions = ['jpg','jpeg','png','svg','gif','heif','webp','doc','docx','xls','xlsx','pdf','zip'];
	
	foreach($_FILES['files']['error'] as $file_index=>$error) {
		if ($error!=0) continue;
		$filename=ABSPATH.'tmp/'.$_FILES['files']['name'][$file_index];
		
		$extenstion = pathinfo($filename,PATHINFO_EXTENSION);
		if(!in_array($extenstion, $allowed_file_extensions)){
			$blocked_attachments[]= $_FILES['files']['name'][$file_index];
			continue;
		} 
		
		move_uploaded_file($_FILES['files']['tmp_name'][$file_index],$filename);
		$attachments[]=$filename;
	}

	if($blocked_attachments){
		$message.= '<p><b>Заблокированные файлы:</b></p><ul>';
		foreach($blocked_attachments as $file) $message.= '<li>'.$file.'</li>';
		$message.= '</ul>';
	}
	
	$success_message = "<h3>Ваше сообщение успешно отправлено!</h3>";
	
	
	if($_REQUEST['basket']){
		$total_weight = 0;
		
		if($_REQUEST['Имя'] == 'test'){
			$mail_to = ['zhuroff92@gmail.com'];
		}
		
		$message.= '<table style="width:100%;margin-top: 52px"><thead><tr><td><b>Товар</b></td><td><b>Количество</b></td><td><b>Вес, т.</b></td><td><b>Цена</b></td></tr></thead>';	
		
		
		foreach($_REQUEST['basket'] as $item){			
			$message .= "<tr><td><b>".$item['title']."</b></td><td>".$item['amount']." ".$item['unit']."</td><td>".$item['weight']."</td><td>".$item['price']." руб.</td></tr>";
			
			if($item['weight']){
				$total_weight += $item['weight'];
			}
		}
		$message.= '</tbody>';
		
		$total_weight = $total_weight > 0 ? $total_weight : "";
		
		$message.= '<tfoot><tr><td colspan="2"><b>Итого</b></td><td><b>'.$total_weight.'</b></td><td><b>'.$_REQUEST["price"].' руб.</b></td></tr></tfoot><tbody>';
		$message.= '</table>';
		$success_message = "<h3>Ваш заказ принят!</h3>";
	}
	
	
		
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
	//удаляем загруженные файлы после отправки
	foreach($attachments as $filename){
		unlink($filename);
	};
	wp_die();
}
add_action('wp_ajax_fencec_form', 'send_fence_form' );