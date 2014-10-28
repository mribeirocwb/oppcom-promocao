$(document).ready(function () {
    var apiToken = '7F9D0B018BD0427B8B2B4D6C4DAE4379';
    var emailVendedor = 'marcos@oppcom.com.br';

    $('.comparPagSeguro').click(function (e) {
        e.preventDefault();
        if ($('#contCompra').length) {
            $('div').removeClass('activeCompra');
        }
        $(this).parents('.plano-item').addClass('activeCompra');
        $('#formularioCompra').show('blind', 1000);
        window.location.hash = '#finalizarPedido';
    });

    $('div').delegate('.finalizarPgseguro', 'click', function (e) {
        finalizarCompra('pagSeguro');
    });

    $('div').delegate('.finalizarDireto', 'click', function (e) {
        finalizarCompra('direto');
    });

    var finalizarCompra = function (modo) {
        $('#formCompra').validate({
            rules: {
                nomeCompra: {
                    required: true,
                    minlength: 3
                },
                emailCompra: {
                    required: true,
                    email: true
                },
                telefoneCompra: {
                    required: true,
                    minlength: 3
                }
            },
            messages: {
                nomeCompra: {required: "Campo Obrigatório!", minlength: "Campo deve ser maior que 3 caracteres"},
                emailCompra: {required: "Campo Obrigatório!", email: "E-mail inválido!"},
                telefoneCompra: {required: "Campo Obrigatório!", minlength: "Campo deve ser maior que 3 caracteres"},
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
                var item = $('.activeCompra');

                var preco = item.find('.preco').attr('data-preco');
                var code = item.find('h3').attr('data-code');

                var dados = {
                    nomeCompra: $('#nomeCompra').val(),
                    emailCompra: $('#emailCompra').val(),
                    telefoneCompra: $('#telefoneCompra').val(),
                    pacoteCompra: code,
                    action: 'cadastro',
                    modo: modo
                };
                $.getJSON('/email.php', dados, function (json) {
                    if (json === false) {
                        window.location.hash = '#pedido-erro';
                        bootstrap_alert('#mensagensFormlario', 'Ocorreu um erro durante o processo! Tente mais tarde', 5000, 'alert-danger', 'pedido-erro', 'Pedido Erro');
                    } else {
                        if (modo === 'direto') {
                            window.location.hash = '#pedido-sucesso';
                            bootstrap_alert('#mensagensFormlario', 'Compra realizada com sucesso! Logo um de nossos consultores vai entrar em contato com você.', 50000, 'alert-success','pedido-sucesso', 'Pedido Concluído');
                            $('#formCompra').fadeOut('slow');
                        } else {
                            var isOpen = PagSeguroLightbox({
                                receiverEmail: emailVendedor,
                                email: emailVendedor,
                                token: apiToken,
                                charset: 'UTF-8',
                                currency: 'BRL',
                                itemId1: code,
                                itemDescription1: code,
                                itemAmount1: preco,
                                itemQuantity1: 1
                            },
                            {
                                success : function(transactionCode) {
                                    window.location.hash = '#pedido-sucesso';
                                    bootstrap_alert('#mensagensFormlario', 'Compra realizada com sucesso! Logo um de nossos consultores vai entrar em contato com você.', 50000, 'alert-success', 'pedido-sucesso', 'Pedido Concluído');
                                    $('#formCompra').fadeOut('slow');
                                }
                            }
                            );
                        }
                    }
                });
            }
        });

    };
});


