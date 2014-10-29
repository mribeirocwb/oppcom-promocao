
//----jquery-plagins----
include('jquery-2.1.1.min.js');
includeFora('https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js');
include('../inc/jasny-bootstrap/js/jasny-bootstrap.min.js');
includeFora('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js');
include('../inc/light-box-bootstrap/ekko-lightbox-min.js');
include('jquery-ui.min.js');
include('jquery.validate.min.js');
include('bootstrapAlert.js');

//-----Pliguns personalizados
include('rolarPagina.js');
include('lightbox.js');
include('pagseguro.js');
include('contato.js');

//----Include-Function----
function include(url){ 
  document.write('<script type="text/javascript" src="js/'+ url + '"></script>'); 
  return false ;
}

function includeFora(url){ 
  document.write('<script type="text/javascript" src="'+ url + '"></script>'); 
  return false ;
}