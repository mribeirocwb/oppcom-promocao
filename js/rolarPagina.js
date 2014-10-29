$(document).ready(function(){
    $('.navigate-pages').click(function(e){
       e.preventDefault();
       var link = $(this).attr('href');
       var linkLimpo = $(this).attr('href').split('#').pop();
       var vaiPara = $('#'+linkLimpo).offset().top;  
       
       var width = $( window ).width();
       
       if(width < 993){
           $('#menuMovel').offcanvas('hide');
       }
       
       var title = $(link).attr('data-title');
       
       document.title = title + ' | OPP Ponto Com';
       
       var alturaTop = $('header').height();
       $('html,body').stop().animate({scrollTop: vaiPara - alturaTop}, 2000);
       window.location.hash = link;
       
       return false;
    });
    
    var hashAtualizar = function () {
        var hashfull = document.location.hash;
        if(hashfull.length == 0){
            hashfull = '#home';
        }
        
        var title = $(hashfull).attr('data-title');
        document.title = title + ' | OPP Ponto Com';
        
        ga('send', 'pageview',{
           page: location.pathname + location.search + hashfull,
           title: document.title
       });
    };

    hashAtualizar();

    $(window).bind('hashchange', function () {
        hashAtualizar();
        return false;
    });
});