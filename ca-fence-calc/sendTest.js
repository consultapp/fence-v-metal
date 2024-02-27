function(e) {
    e.preventDefault();
    var form = $(this),
      data = new FormData(this),
      fileInputs = this.elements['files[]'];
  
    data.append('action', 'client_ajax');

  
    $.ajax({
      url: '/wp-admin/admin-ajax.php',
      data: data,
      type: 'post',
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      success: function(response) {
        $('#message .modal__body').html(response.message);
        if (response.status) {
          form[0].reset();
          if (form.is('#basket-form')) {
            afterOrder();
          }
        } else {
          captchaReload();
        }
      },
      error: function() {
        $('#message .modal__body').html('<h3>Ошибка</h3>');
      },
      complete: function() {
        form.removeClass('busy');
        $.fancybox.close();
        $.fancybox.open({
          src: '#message'
        });
      }
    })
  }