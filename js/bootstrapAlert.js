function bootstrap_alert(elem, message, timeout, type, linkId, titleID) {
    $(elem).show().html('<div id="'+linkId+'" data-title="'+titleID+'" class="alert ' + type + ' fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>' + message + '</span></div>');

    if (timeout || timeout === 0) {
        setTimeout(function () {
            $(elem).find('.alert').alert('close');
        }, timeout);
    }
}
;