//homepage data inputs
$(document).ready(function(){
    $(".usa").click(function(event){
		event.preventDefault();
		$(".data2").hide();
        $(".data1").fadeIn();
    });
	$(".euro").click(function(event){
		event.preventDefault();
		$(".data1").hide();
        $(".data2").fadeIn();
    });
});


//Friendly menu
function openNav() {
    document.getElementById("mynav").classList.add('mynav2');
}

function closeNav() {
    document.getElementById("mynav").classList.remove('mynav2');
}

//Awesomplete server name
var input = document.getElementById("usaservers");
new Awesomplete(input, {
	list: ["mod_jk", "mod_lisp", "mod_mono", "mod_parrot", "mod_perl", "mod_php", "mod_proxy"]
});

var input2 = document.getElementById("euroservers");
new Awesomplete(input2, {
	list: ["mod_jk", "mod_lisp", "mod_mono", "mod_parrot", "mod_perl", "mod_php", "mod_proxy"]
});


