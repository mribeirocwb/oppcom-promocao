<?php
require_once './EnviarEmail.class.php';

switch ($action) {
    case 'cadastro':
        $nome = filter_input(INPUT_GET, 'nomeCompra', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_GET, 'emailCompra', FILTER_SANITIZE_EMAIL);
        $telefone = filter_input(INPUT_GET, 'telefoneCompra', FILTER_SANITIZE_STRING);
        $pacote = filter_input(INPUT_GET, 'pacoteCompra', FILTER_SANITIZE_STRING);
        $modo = filter_input(INPUT_GET, 'modo', FILTER_SANITIZE_STRING);


        $interno = new EnviarEmail();


        ob_start();

        include( 'email_header.php' );
        ?>
        <h1><strong>Pacote:</strong><?php echo $pacote; ?></h1>
        <p><strong>Modo de Pagamento:</strong><?php echo $modo; ?></p>
        <p><strong>Nome:</strong><?php echo $nome; ?></p>
        <p><strong>E-mail:</strong><?php echo $email; ?></p>
        <p><strong>Telefone:</strong><?php echo $telefone; ?></p>


        <?php
        include( 'email_footer.php' );

        $msgInterno = ob_get_contents();
        ob_end_clean();

        if (!$interno->send(array('marcos@oppcom.com.br', 'marcos@oppmais.com.br'), 'Cliente Realizou uma Compra no site', $msgInterno)) {
            echo json_encode(false);
            exit();
        } else {
            $cliente = new EnviarEmail();
            ob_start();

            include( 'email_header.php' );
            ?>
            <h1>Seja Bem Vindo, <?php echo $nome;?></h1>
            <p>Obrigado por comprar um de nossos produtos! Em breve um de nossos consultores vai entrar em contato através dos contatos abaixo:</p>
            <p><strong>E-mail:</strong><?php echo $email; ?></p>
            <p><strong>Telefone:</strong><?php echo $telefone; ?></p>
            <?php
            include( 'email_footer.php' );

            $msgCliente = ob_get_contents();
            ob_end_clean();
            
            if (!$cliente->send(array($email), 'Confirmação de compra no site OPP.COM', $msgCliente)) {
                echo json_encode(false);
            }else{
                echo json_encode(true);
            }
        }
        break;
    case 'contato':
        
        $nome = filter_input(INPUT_GET, 'nome', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_GET, 'email', FILTER_SANITIZE_EMAIL);
        $telefone = filter_input(INPUT_GET, 'telefone', FILTER_SANITIZE_STRING);
        $mensagem = filter_input(INPUT_GET, 'mensagem', FILTER_SANITIZE_STRING);


        $mail = new EnviarEmail();


        ob_start();

        include( 'email_header.php' );
        ?>
        
        <p><strong>Nome: </strong><?php echo $nome; ?></p>
        <p><strong>E-mail: </strong><?php echo $email; ?></p>
        <p><strong>Telefone: </strong><?php echo $telefone; ?></p>
        <hr>
        <p><strong>Mensagem: </strong><?php echo $mensagem; ?></p>


        <?php
        include( 'email_footer.php' );

        $msgInterno = ob_get_contents();
        ob_end_clean();

        if (!$mail->send(array('marcos@oppcom.com.br', 'marcos@oppmais.com.br'), 'Contato Urgente Promoção site', $msgInterno)) {
            echo json_encode(false);
            exit();
        } else {
            echo json_encode(true);
        }
        break;

    default:
        break;
}

