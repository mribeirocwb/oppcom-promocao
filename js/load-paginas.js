$(document).ready(function(){
   $('.load-paginas a').click(function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      $("#conteudo-load").load( href +" #conteudo-load", function(resp, status, xhr ){
          var stateObj = { };
            var response = $( '<div>'+resp+'</div>' );
            var title = response.find('title').text();
            
            document.title = title;
            
            history.pushState(stateObj, title, href);
      });
   });
});