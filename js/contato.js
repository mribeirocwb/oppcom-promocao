$(document).ready(function(){
    $('#formContato').validate({
            rules: {
                nome: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                telefone: {
                    required: true,
                    minlength: 3
                },
                mensagem: {
                    required: true,
                    minlength: 3
                }
            },
            messages: {
                nome: {required: "Campo Obrigatório!", minlength: "Campo deve ser maior que 3 caracteres"},
                email: {required: "Campo Obrigatório!", email: "E-mail inválido!"},
                telefone: {required: "Campo Obrigatório!", minlength: "Campo deve ser maior que 3 caracteres"},
                mensagem: {required: "Campo Obrigatório!", minlength: "Campo deve ser maior que 3 caracteres"},
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function () {
                var dados = $('#formContato').serialize();
                $.getJSON('/email.php?action=contato',dados,function(json){
                    if(json === true){
                        window.location.hash = '#contato-sucesso';
                        bootstrap_alert('#mensagensFormlarioContato', 'E-mail Enviado com sucesso!', 50000, 'alert-success', 'contato-sucesso', 'Contato Sucesso');
                        $('#formContato').fadeOut('slow');
                    }else{
                        bootstrap_alert('#mensagensFormlarioContato', json['mensagem'], 5000, 'alert-danger');
                    }
                });
            }
        });
});