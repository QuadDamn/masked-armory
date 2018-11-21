$(function() {

    if(Modernizr.history){

    var newHash      = "",
        $mainContent = $("#main-content"),
        $el;
        
    $(".side-nav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);
		$(".side-nav li").removeClass("active");
		$(this).parent().addClass("active");
        return false;
    });

    function loadContent(ss){
        $mainContent
                .find("#content")
                .fadeOut(200, function() {
                    $mainContent.hide().load(ss + " #content", function() {
                        $mainContent.fadeIn(200);
                       
                    });
                });
    }
    
    $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
    });

} // otherwise, history is not supported, so nothing fancy here.

    
});