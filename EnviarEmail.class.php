<?php
require_once './Zend/Mail/Transport/Smtp.php';
require_once './Zend/Mail.php';

class EnviarEmail{
    private $_mail;
    private $_transport;
    
    public function __construct() {
        
        $this->_transport = new Zend_Mail_Transport_Smtp('mail.oppcom.com.br', array(
            'auth'     => 'login',
            'username' => 'site@oppcom.com.br',
            'password' => 'OeziK4re8DXQ',
            'port' => 587
        ));
                
    }
    
    public function send(array $para, $assunto, $body){
        
        $this->_mail = new Zend_Mail('UTF-8');
        $this->_mail->setFrom('site@oppcom.com.br', 'OPP.com site e sistemas');
        
        foreach ($para as $email){
            $this->_mail->addTo($email);   // Add a recipient
        }
        $this->_mail->setBodyHtml($body, 'UTF-8');
        $this->_mail->setSubject($assunto);
        $this->_mail->Body = $body;
        
        if (!$this->_mail->send($this->_transport)) {
            return false;
        } else {
            return true;
        }
    }
}


$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING);

