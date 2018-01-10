/* ============================================= */
/*                      CARTAS                   */
/* ============================================= */

var aleatorio=1;
var max=21;
var min=1;
var baraja = new Array("major0.jpg","major1.jpg","major2.jpg","major3.jpg","major4.jpg","major5.jpg","major6.jpg","major7.jpg","major8.jpg","major9.jpg","major10.jpg","major11.jpg","major12.jpg","major13.jpg","major14.jpg","major15.jpg","major16.jpg","major17.jpg","major18.jpg","major19.jpg","major20.jpg","major21.jpg");
var posicionMax = 2;
var topegenerados = 3;
var posicion = 0;
var cartas_tiradas="";
var c1,c2,c3;
var cantidad=0;
var estado1=0;
var estado2=0; 
var ultimaid=0;
//funcion para obtener una carta
function darCarta(posicion_carta,id,salta){
	if(posicionMax >=posicion){
		cartas_tiradas+=id+",";
		var imagensrc = "img/cartas/" + baraja[id];
		$("#carta" + posicion_carta).css("opacity", 0.00);
		$("#carta" + posicion_carta).css("visibility", "visible");
		$("#carta" + posicion_carta).fadeTo(500, 0.85);
		$("#carta" + posicion_carta).html("<img src=\"" + imagensrc + "\" width=\"71\" height=\"133\" class=\"cartaTirada\" alt=\"tarot carta "+posicion+1+"\"/>");
		$("#carta" + posicion_carta).css("top", calcularAltura()+"px");
		$("#carta" + posicion_carta).css("opacity", 0.00);
		$("#carta" + posicion_carta).css("visibility", "visible");
		$("#carta" + posicion_carta).fadeTo(500, 1.00);
		posicion++;
	}
	if(posicion==3 && salta==1) //Si tiro las tres hago redirect con las tres cartas tiradas
	{
		window.location = "tirada-tarot-email-gratis.php?cartas="+cartas_tiradas;
	}
}
<!-- funcion para hacer aparecer el revalite mail  -->
function calcularAltura(){
	altura = $(window).height()/2 + $(window).scrollTop() - 120;
	return altura;
}
//funcion fadeToIn
function fadeIn(){
	//para #supercapa
	$("#superCapa").css("opacity", 0.00);
	$("#superCapa").css("visibility", "visible");
	$("#superCapa").fadeTo(500, 0.85);
	//para #cajaRevalidate
	//calcularAltura
	$("#cajaRevalidate").css("top", calcularAltura()+"px");
	$("#cajaRevalidate").css("opacity", 0.00);
	$("#cajaRevalidate").css("visibility", "visible");
	$("#cajaRevalidate").fadeTo(500, 1.00);
}
//funcion fadeToOut
function fadeOut(){
	//para #supercapa
	$("#superCapa").fadeTo(500, 0.00, function ocultar() { $("#superCapa").css("visibility", "hidden"); });
	//para #cajaRevalidate
	$("#cajaRevalidate").fadeTo(500, 0.00, function ocultar() { $("#cajaRevalidate").css("visibility", "hidden"); });
	
}


function numeroAleatorio()
{
  var aleatorio=Math.floor(Math.random()*(max-(min-1))) + min;  
  return aleatorio;
};





/* ============================================= */
/*                 FORMULARIO                    */
/* ============================================= */


function valid(tipo)
{
	//Tipo 1 CHAT
	//Tipo 2 TIRADA
	//Tipo 3 AGENDA 

	var nom = $("#nom").val(); 
	var prenom = $("#prenom").val();
	var tel = $("#tel_portable").val();
	var email = $("#email").val();
	var message = $("#message").val();
	var sex = $("#sex").val();
	var jour = $("#jour").val();
	var mois = $("#mois").val();
	var annee = $("#annee").val();
	var pays = $("#pays").val();

	var validform= new ajx();
	var chaine="";

	if(tipo==2)
	{
		if($("#carta0 img").hasClass("cartaTirada") == true && $("#carta1 img").hasClass("cartaTirada") == true && $("#carta2 img").hasClass("cartaTirada") == true)
		{
			if(prenom == "" || prenom == "Nombre"){
			alert("El campo nombre es obligatorio");
			$("#prenom").focus();
			return false;	
			}
			if(email == "" || email == "Email"){
			alert("El campo email es obligatorio");
			mail_format(1,1);
			$("#email").focus();
			return false;	
			}

			if(message == "" || message == "Tu consulta"){
			alert("El campo consulta es obligatorio");
			$("#messsage").focus();
			return false;	
			}


			if(tel == "" || tel == "Teléfono")
			{
				format_tel();
				$("#tel").focus();
				return false;	
			}

			if(isNaN(tel))
			{
				format_tel();
				$("#tel").focus();
				return false;		
			}

			//Comprobamos si se ha marcado el check de privacidad.
		    if (document.forms[0].cbx_privacidad.checked===false)
		    {
		        alert("Error. Es necesario que aceptes la política de privacidad.");
		        return false;
		    }

		}
		else
		{
			alert("Debe de tirar todas las cartas");
			return false;
		}
	}
	else if(tipo==1)
	{
		
			$('#form').submit();

		
		   

	}
	else if(tipo==3)
	{
		
		if(prenom == "" || prenom == "Nombre"){
			alert("El campo nombre es obligatorio");
			$("#prenom").focus();
			return false;	
			}
			if(email == "" || email == "Email"){
			alert("El campo email es obligatorio");
			mail_format(1,1);
			$("#email").focus();
			return false;	
			}


			if(tel == "" || tel == "Teléfono")
			{
				format_tel();
				$("#tel").focus();
				return false;	
			}

			if(isNaN(tel))
			{
				format_tel();
				$("#tel").focus();
				return false;		
			}

			//Comprobamos si se ha marcado el check de privacidad.
		    if (document.forms[0].cbx_privacidad.checked===false)
		    {
		        alert("Error. Es necesario que aceptes la política de privacidad.");
		        return false;
		    }
	}



	chaine="?nom="+nom+"&prenom="+prenom+"&tel="+tel+"&email="+email+"&sex="+sex+"&pays="+pays+"&jour="+jour+"&mois="+mois+"&annee="+annee+"&message="+message;
	
	validform.open("GET", "library/php/verif_form.php"+chaine, false);
	//validform.open("GET", "/library/php/verif_form.php"+chaine, false);
    validform.send(null);
	
    if(validform.readyState == 4) {
		if(validform.responseText!=''){
			eval(validform.responseText);
			return false;
		}else{
			fadeIn();
			$("#email_vrf").focus();
		}
	}else{
		return(false);
	}
	return false;
}


//funcion fadeToIn
function fadeIn(){
	//para #supercapa
	$("#superCapa").css("opacity", 0.00);
	$("#superCapa").css("visibility", "visible");
	$("#superCapa").fadeTo(500, 0.85);
	//para #cajaRevalidate
	document.location = "#";
	$("#cajaRevalidate").css("top", "40%");
	$("#cajaRevalidate").css("opacity", 0.00);
	$("#cajaRevalidate").css("visibility", "visible");
	$("#cajaRevalidate").fadeTo(500, 1.00);
}
//funcion fadeToOut
function fadeOut(){
	//para #supercapa
	$("#superCapa").fadeTo(500, 0.00, function ocultar() { $("#superCapa").css("visibility", "hidden"); });
	//para #cajaRevalidate
	$("#cajaRevalidate").fadeTo(500, 0.00, function ocultar() { $("#cajaRevalidate").css("visibility", "hidden"); });
	
}


/* CREAMOS EL OBJETO DE ENVIO AJAX */
function ajx(){
	var ajax;
	
	if(window.XMLHttpRequest){
          ajax = new XMLHttpRequest();
	}else if(window.ActiveXObject){ 
          ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
    	return(false);
	}
    return ajax;      
}

/*VALIDADOR DEL FORM SOLO EMAIL*/
function validEmail(){
	var email2 = $("#email2").val();
	
	var validform= new ajx();
	
	var chaine="";
	
	initcntr();
	
	if(email2 == ""){
		mail_format(1,2);
		$("#email2").focus();
		return false;		
	}

	chaine="?&email="+email2+"&forma=2";
	
	//alert(chaine);
	
	 validform.open("GET", "/library/php/verif_form.php"+chaine, false);
     validform.send(null);
	
     if(validform.readyState == 4) {
	     
     		if(validform.responseText!='')
     		{
	     		
	     		
	     		eval(validform.responseText);
	     		return false;
	     		
     		}else{
				$("#form").submit();	
     		}
		 }else return(false);
		 
	
return false;
}
function format_tel(){
	$("#tel_portable").addClass("errorColorCampo");
	alert("Rellena el campo Móvil");
	$("#tel_portable").focus();
	return false;
}

function anniv(){
	$("#annee").addClass("errorColorCampo");
	alert("Tienes que ser mayor de edad para poder hacer una consulta");
	$("#annee").focus();
	return false;
}

function mail_format(i,idMail){
	if(idMail == 2){
		if(i==1) {
			$("#muestraError2").html("<div class=\"errorForm\">Rellena el campo Email");
		}else if(i==2){
			$("#muestraError2").html("<div class=\"errorForm\">Correo electrónico incorrecto");
		}else{
			$("#muestraError2").html("<div class=\"errorForm\">Confirmación del Email incorrecta");
		}
		$("#email2").addClass("errorColorCampo");
		$("#email2").focus();
	}else{
		if(i==1) {
			alert("Rellena el campo Email");
		}else if(i==2){
			alert("Correo electrónico incorrecto");
		}else{
			alert("Correo electrónico incorrecto");
		}
		$("#email").addClass("errorColorCampo");
		$("#email").focus();
	}
}

function initcntr(){
	$(".errorForm").remove();
	$('.errorColorCampo').removeClass('errorColorCampo');
}


/* DESACTIVADO */
function verifmail(){
	if($("#email").val() != $("#email_vrf").val()){
			fadeOut();
			mail_format(3);
	}else{	
		$("#form").submit();			
	}
}








/* ============================================= */
/*                     CHAT                      */
/* ============================================= */

function chatear()
{
	$('#escribiendo').html('La tarotista está escribiendo... <img src="img/escribir_anime.gif" alt="Chat"/>');
	setTimeout(function () {mostrar_mensaje(0);}, 5000);
	setTimeout(function () {mostrar_mensaje(1);}, 6000);
	setTimeout(function () {mostrar_mensaje(2);}, 14000);
	setTimeout(function () {mostrar_mensaje(3);}, 25000);
	setTimeout(function () {mostrar_mensaje(4);}, 28000);
	setTimeout(function () {mostrar_mensaje(5);}, 28000);
}



function mostrar_mensaje(posicion)
{
	$('.atiende').hide();
	desplazar();
	if(posicion==0)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Hola cielo, cómo estás?<br>');
	}
	if(posicion==1)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Antes de nada, quiero darte la bienvenida y transmitirte toda mi energía<br>');
	}
	else if(posicion==2)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Voy a necesitar que te concentres unos pocos segundos…<br>');
	}
	else if(posicion==3)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>no cruces brazos ni piernas, e intenta dejar la mente en blanco un segundo<br>');
	}
	else if(posicion==4)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Ahora que tus energías y las mías están conectadas, podemos continuar!<br>');
	}
	else if(posicion==5)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Dime cielo, ¿cuál es tu nombre?<br>');
		desplazar();
		$('#chat_panel').append('<div class="opcion"><input size="20" name="nombre" class="input_text"  placeholder="Nombre" id="nombre"  type="text" /> <input size="20" placeholder="Apellidos" name="apellidos" class="input_text"  id="apellidos"  type="text" /> <a href="#" class="btn btn-thumbnail" onClick="chat_nombre();">Enviar</a></div>');
		$('#escribiendo').hide();
	}
	else if(posicion==6)
	{
		
		setTimeout(function(){$('#escribiendo').show();}, 1);
		
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Que bonito nombre '+$("#nombre").val()+' ! <br>');
		desplazar();
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>Ahora necesitaré tu fecha de nacimiento <br>');}, 4000);
		setTimeout(function(){desplazar();}, 4000);
	}
	else if(posicion==7)
	{

		var txt="";
		var jour="";
		var mois="";
		var annee="";

		for(var i=1;i<=31;i++)
		{
			(i<=9) ? txt="0"+i : txt = i ;
			jour+="<option value='"+txt+"'>"+txt+"</option>";     
		}

		for(var i=1;i<=12;i++)
		{
			(i<=9) ? txt="0"+i : txt = i ;
			mois+="<option value='"+txt+"'>"+txt+"</option>";     
		}

		var fecha = new Date();
		var ano = fecha.getFullYear();


		for(var i=ano;i>=ano-120;i--)
		{
			(i<=9) ? txt="0"+i : txt = i ;
			annee+="<option value='"+txt+"'>"+txt+"</option>";     
		}

		$('#escribiendo').show();
		setTimeout(function(){$('#chat_panel').append('<div class="opcion"><select name="dia" id="dia" class="input_text" style="width:60px;">'+jour+'</select> &nbsp; <select name="mes" id="mes" class="input_text" style="width:60px;">'+mois+'</select> &nbsp; <select  name="anyo" id="anyo" class="input_text" style="width:100px;">'+annee+'</select> &nbsp; <a href="#" class="btn btn-thumbnail" onClick="chat_fecha();"> Enviar</a></div>');  }, 12000);
		setTimeout(function(){desplazar();}, 12000);
		setTimeout(function(){$('#escribiendo').hide();}, 12000);
	}
	else if(posicion==8)
	{
		$('#escribiendo').show();
		
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>Muchas gracias '+$("#nombre").val()+', ahora dime brevemente lo que te preocupa,<br>');}, 15000);
		setTimeout(function(){desplazar();}, 15000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>el tarot es más preciso cuanto más concreto es uno <br>');}, 25000);
		setTimeout(function(){desplazar();}, 25000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>así que aprovecha que esta tirada es gratis y concéntrate en lo que más te preocupa, cariño.<br>');}, 32000);
		setTimeout(function(){desplazar();}, 32000);
		setTimeout(function(){$('#chat_panel').append('<div class="opcion"><input size="20" name="tipo" placeholder="Mensaje" class="input_text tipo_largo"  id="tipo"  type="text" /> <a href="#" class="btn btn-thumbnail" onClick="chat_tipo();">Enviar</a></div>')}, 38000);
		setTimeout(function(){desplazar();}, 38000);
		setTimeout(function(){$('#escribiendo').hide();}, 38000);

	

	}
	else if(posicion==9)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>de acuerdo, estoy barajando<br>');
		desplazar();
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>elige un montón, ¿izquierda o derecha?<br>');}, 5000);
		setTimeout(function(){$('#escribiendo').hide();}, 5000);
		setTimeout(function(){$('#chat_panel').append('<img onClick="chat_carta();" src="img/cartas/backcard.png" class="card" alt="carta">&nbsp;<img onClick="chat_carta();"  class="card" src="img/cartas/backcard.png" alt="carta"><br>');}, 6000);
		
		setTimeout(function(){$('#escribiendo').hide();}, 6000);
		setTimeout(function(){desplazar();}, 6000);
		setTimeout(function(){$('#chat_panel').append('');}, 5000);
		setTimeout(function(){$('#escribiendo').hide();}, 5000);
	}
	else if(posicion==10)
	{
		$('#escribiendo').hide();
		var ruta="img/cartas/backcard.png";
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>ahora elige tres cartas<br><div class="baraja"><ul><li><a href="javascript:chat_carta_sele();" id="card1" class="card" src="'+ruta+'"></a></li><li><a href="javascript:chat_carta_sele();" id="card2" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card3" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card4" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card5" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card6" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card7" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card8" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card9" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card10" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card11" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card12" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card13" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card14" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card15" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card16" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card17" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card18" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card19" class="card"></a></li><li><a href="javascript:chat_carta_sele();" id="card20" class="card"></a></li></ul></div>  <div class="cartas"><span class="carta0"><img id="carta0" class="card" src="'+ruta+'" alt="Carta"></span><span class="carta1">&nbsp;<img id="carta1" class="card" src="'+ruta+'" alt="Carta"></span><span class="carta2">&nbsp;<img id="carta2" class="card" src="'+ruta+'" alt="Carta"></span></div></div><br>');
		$('#escribiendo').hide();
	}
	else if(posicion==11)
	{
		$('#chat_panel').append('<span class="titulo">Luciana: </span>waw! menudas cartas...<br>');
		$('#escribiendo').show();
		setTimeout(function(){$('#escribiendo').show();}, 9000);
		setTimeout(function(){desplazar();}, 2);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>mira '+$("#nombre").val()+' me gustaría dedicarle unos minutos más a tus cartas<br>');}, 9000);
		setTimeout(function(){desplazar();}, 9000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>me dan unas vibraciones muy extrañas<br>');}, 16000);
		setTimeout(function(){desplazar();}, 16000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>y no quiero dejarme ningún detalle importante… asi que… <br>');}, 20000);
		setTimeout(function(){desplazar();}, 20000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>¿te importa si te mando la lectura por email?<br>');}, 24000);
		setTimeout(function(){desplazar();}, 24000);
		setTimeout(function(){$('#chat_panel').append('<div class="opcion"><input size="40" name="mail"  id="mail"  placeholder="Email" type="text" /> <a href="#" class="btn btn-thumbnail" onClick="chat_mail();">Enviar</a></div>');}, 28000);	
		setTimeout(function(){desplazar();}, 28000);
		setTimeout(function(){$('#escribiendo').hide();}, 28000);
	}
	else if(posicion==12)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Muchas gracias no tardaré mucho<br>');
		setTimeout(function(){desplazar();}, 5000);
		setTimeout(function(){$('#chat_panel').append('<span class="titulo">Luciana: </span>para que no estés esperando, anótame tu móvil y te mando un SMS en cuanto esté tu lectura (no te preocupes, que el coste del mensaje lo asumo yo, lo hago para asegurarme de que te llega mi respuesta y que no esperes tontamente)<br>');}, 5000);
		setTimeout(function(){desplazar();}, 5000);
		setTimeout(function(){$('#chat_panel').append('<div class="opcion"><input size="40" name="telefono"  id="telefono"  placeholder="Teléfono" type="text" /> <a href="#" class="btn btn-thumbnail" onClick="chat_telefono();">Enviar</a></div>');}, 8000);
		setTimeout(function(){desplazar();}, 8000);
		setTimeout(function(){$('#escribiendo').hide();}, 8000);
		
	}
	else if(posicion==13)
	{
		$('#escribiendo').show();
		$('#chat_panel').append('<span class="titulo">Luciana: </span>Para confirmar que quieres recibir tu lectura por email sólo necesito que confirmes aquí abajo.<br>');
		$('#chat_panel').append('<div class="opcion"><input type="checkbox" value="1" name="cbx_privacidad" class="cbx_privacidad"  />He leído y acepto la <a href="#" title="Politica de privacidad" class="defecto" onclick="javascript:window.open(\'politica-privacidad.php\',\'POLITICA_PRIVACIDAD\',\'width=517,height=500,scrollbars=1,top=50,left=50\');" rel="nofollow">pol&iacute;tica de privacidad</a> <a href="#" class="btn btn-thumbnail" onClick="chat_envio();">Aceptar </a></div>');
		$('#escribiendo').hide();
		
	}


}

function chat_envio()
{
	desplazar();
	$('#escribiendo').hide();

	if($('.cbx_privacidad').is(':checked') )
    {
        $("#chat_panel").scrollTop($('#chat_panel').height()+1200);
    	$('#chat_panel').append('<span class="titulo">Luciana: </span>Muchas gracias '+$("#nombre").val()+' , te prometo ser lo más breve posible para que recibas cuanto antes tu lectura.<br>');
    	$('#chat_panel').append('<span class="titulo">Luciana: </span>Presta atención a la bandeja de correo no deseado de tu email, a veces mi mensaje se esconde ahí. Un abrazo<br>');
    	$('#escribiendo').hide();
    	valid(1);
    }
    else
    {
    	alert("Error. Es necesario que aceptes la política de privacidad.");
    }
	
}



function chat_carta_sele()
{

	var aleatorio=Math.floor(Math.random() * (20-1+1)) + 1;
	if(cantidad==0)
	{
		cantidad++;
		c1=aleatorio;
		$('#carta0').attr('src','img/cartas/major'+aleatorio+'.jpg');
	}
	else if(cantidad==1)
	{
		cantidad++;
		do{
			aleatorio=Math.floor(Math.random() * (20-1+1)) + 1;
		}while(aleatorio==c1);
		c2=aleatorio;
		$('#carta1').attr('src','img/cartas/major'+aleatorio+'.jpg');
	}
	else if(cantidad==2)
	{
		cantidad++;
		do{
			aleatorio=Math.floor(Math.random() * (20-1+1)) + 1;
		}while(aleatorio==c1 || aleatorio==c2);
		c3=aleatorio;
		$('#carta2').attr('src','img/cartas/major'+aleatorio+'.jpg');
		$('#escribiendo').show();
		t= setTimeout(function(){mostrar_mensaje(11);},6000);

	}
}

function desplazar()
{
	if(screen.width > 767)
	{
		var alto=$('#chat_panel').offset().top;
		var alto_scroll=$('#chat_panel')[0].scrollHeight;

		if(alto_scroll>=220)
		{
			alto=alto+1000;
			$('#chat_panel').animate({ scrollTop: alto }, 'slow');
		}

		$('.chat_gratis').animate({ scrollTop: alto }, 'slow');
		//$('#chat_panel').animate({ scrollTop: alto }, 'slow');
	}
	else
	{
		var alto=$('.chat_gratis').offset().top;
		var alto_scroll=$('#chat_panel')[0].scrollHeight;

		$('.chat_gratis').animate({ scrollTop: alto }, 'slow');
		$('#chat_panel').animate({ scrollTop: alto_scroll }, 'slow');
		
		//$(window).scrollTop($('.conversacion').offset().top);

		$('html,body').animate({ scrollTop: alto }, 'slow');
		//$('#chat_panel').animate({ scrollTop: alto }, 'slow');
	}


}

function chat_carta()
{
	desplazar();
	$('#escribiendo').show();
	setTimeout(function(){mostrar_mensaje(10);},5000);
}

function chat_tipo()
{
	desplazar();

	if($("#tipo").val() == "")
	{
		alert("El campo mensaje es obligatorio");
		$("#tipo").focus();

	}
	else
	{
		$('#question').val($("#tipo").val());
		message=$("#question").val();

		$('#escribiendo').show();$('.opcion').hide();
		$('#chat_panel').append('<span class="usuario">Yo: </span> '+ message + '<br>');

		$("#chat_panel").scrollTop($('#chat_panel').height()+1200);
		t= setTimeout(function(){mostrar_mensaje(9);},8000);
	}


}

function chat_mail()
{
	desplazar();

	if($("#mail").val() == "" || $("#mail").val() == "Email")
	{
		alert("El campo email es obligatorio");
	}
	else
	{
		$('#email').val($("#mail").val());
		email=$("#email").val();
		$('#escribiendo').show();$('.opcion').hide();
		$('#chat_panel').append('<span class="usuario">Yo: </span> Mi email es el  '+ email + '<br>');
		$('#escribiendo').show();
		$("#chat_panel").scrollTop($('#chat_panel').height()+1200);
		t= setTimeout(function(){mostrar_mensaje(12);},5000);
	}


	
}

function chat_telefono()
{
	desplazar();

	if($("#telefono").val() == "" || $("#telefono").val() == "Teléfono")
	{
		alert("El campo telefono es obligatorio");
	}
	else
	{
		$('#mobile').val($("#telefono").val());
		var telefono=$("#telefono").val();
		$('#escribiendo').show();$('.opcion').hide();
		$('#chat_panel').append('<span class="usuario">Yo: </span> Mi teléfono es el  '+ telefono + '<br>');
		$('#escribiendo').show();
		$("#chat_panel").scrollTop($('#chat_panel').height()+1200);
		t= setTimeout(function(){mostrar_mensaje(13);},5000);
	}


	
}

function chat_fecha()
{
	desplazar();

	$('#day').val($("#dia").val());
	$('#month').val($("#mes").val());
	$('#year').val($("#anyo").val());
	dia=$("#day").val();
	mes=$("#month").val();
	anyo=$("#year").val();

	$('#escribiendo').show();$('.opcion').hide();
	$('#chat_panel').append('<span class="usuario">Yo: </span> Mi fecha de nacimiento es el  ' + dia + '/' + mes + '/' + anyo +'<br>');
	$("#chat_panel").scrollTop($('#chat_panel').height()+1200);

	setTimeout(function(){mostrar_mensaje(8);},5000);
	
}


function chat_nombre()
{
	desplazar();

	$('#name').val($("#nombre").val());
	$('#surname').val($("#apellidos").val());


	if($("#name").val() == "" || $("#surname").val() == "")
	{
		alert("El campo nombre y apellidos es obligatorio");
		$("#prenom").focus();

	}
	else
	{
		nombre=$("#name").val();
		apellidos=$("#surname").val();

		$('.opcion').hide();
		$('#chat_panel').append('<span class="usuario">Yo: </span> Me llamo ' + nombre + ' ' + apellidos  +'<br>');
		$('#escribiendo').show();$('.opcion').hide();

		$("#chat_panel").scrollTop($('#chat_panel').height()+1200);
		setTimeout(function () {mostrar_mensaje(6);}, 3000);
		setTimeout(function () {mostrar_mensaje(7);}, 3000);
	}
}





/* ============================================= */
/*              BUSCADOR Y DATOS                 */
/* ============================================= */


$(document).ready(function () {

	//Carga de las dos tarotistas del mes de septiembre
	$.getJSON('data/tarotistas.json',function(data)
	{
		var primero="";var segundo="";var ultimo="";var resto="";var cantidad=0;//Variables para el ranking
		var primero_lista="";ultimo_lista="";centrado_lista="";
		$.each(data.tarotistas.tarotista, function (index, tarotista) 
		{
			/* LAS DOS TAROTISTAS PRINCIPALES */
			if(tarotista.id==1 || tarotista.id==2)
			{
				$('.nombre_destacado'+tarotista.id).html(tarotista.nombre);
				$('.numero_destacado'+tarotista.id).html(tarotista.telefono);

				var telefono_click=tarotista.telefono.replace(/ /g,'');

				$('.llamada_destacado'+tarotista.id).attr("href", "tel:"+telefono_click);

				$('.url'+tarotista.id).attr("href",tarotista.url);

				if(tarotista.amor==1){$('.temas_destacado'+tarotista.id).append(" Amor/Desamor ");}
				if(tarotista.trabajo==1){$('.temas_destacado'+tarotista.id).append(" Trabajo/Carrera ");}
				if(tarotista.dinero==1){$('.temas_destacado'+tarotista.id).append(" Dinero/Azar/Suerte ");}
				if(tarotista.camino==1){$('.temas_destacado'+tarotista.id).append(" Camino Vital/Destino ");}
				if(tarotista.vidas==1){$('.temas_destacado'+tarotista.id).append(" Vidas Pasadas/Espíritus ");}

				if(tarotista.tarot==1){$('.herramientas_destacado'+tarotista.id).append(" Tarot ");}
				if(tarotista.pendulo==1){$('.herramientas_destacado'+tarotista.id).append(" Péndulo ");}
				if(tarotista.astrologia==1){$('.herramientas_destacado'+tarotista.id).append(" Astrología ");}
				if(tarotista.magia==1){$('.herramientas_destacado'+tarotista.id).append(" Mágia Blanca ");}
				if(tarotista.numerologia==1){$('.herramientas_destacado'+tarotista.id).append(" Numerología ");}
				if(tarotista.runas==1){$('.herramientas_destacado'+tarotista.id).append(" Runas ");}

				if(tarotista.videncia==1){$('.habilidades_destacado'+tarotista.id).append(" Videncia ");}
				if(tarotista.medium==1){$('.habilidades_destacado'+tarotista.id).append(" Medium ");}
				if(tarotista.significado==1){$('.habilidades_destacado'+tarotista.id).append(" Significado sueños");}
				if(tarotista.telepatia==1){$('.habilidades_destacado'+tarotista.id).append(" Telepatía ");}

				$('.precio_destacado'+tarotista.id).html("1.21 €/min");

				if(tarotista.tirada==1){$('.oferta_destacado'+tarotista.id).append(" Tirada Mail Gratis ");}
				if(tarotista.agenda==1){$('.oferta_destacado'+tarotista.id).append(" Agenda Gratis ");}
				if(tarotista.chat==1){$('.oferta_destacado'+tarotista.id).append(" Chat Gratis ");}
	
			}

			cantidad++;

			/* GENERACIÓN DE LA TABLA DE RANKING */
			if(tarotista.id==1)
			{
				primero='<span class="list-group-item inicio"><a href="'+tarotista.url+'"><img class="foto_ranking" src="img/tarotistas/'+tarotista.id+'.jpg"></a><span class="posicion"><img src="img/estrella.png"></span></span>';
			}
			else if(tarotista.id==9)
			{
				ultimo='<span class="list-group-item fin"><a href="'+tarotista.url+'"><img class="foto_ranking" src="img/tarotistas/'+tarotista.id+'.jpg"></a><span class="posicion">'+tarotista.id+'º</span></span>';
			}
			else if(tarotista.id==2)
			{
				segundo+='<span class="list-group-item"><a href="'+tarotista.url+'"><img class="foto_ranking" src="img/tarotistas/'+tarotista.id+'.jpg"></a><span class="posicion rojo">'+tarotista.id+'º</span></span>';
			}
			else if(tarotista.id==3)
			{
				resto+='<span class="list-group-item"><a href="'+tarotista.url+'"><img class="foto_ranking" src="img/tarotistas/'+tarotista.id+'.jpg"></a><span class="posicion rojo">'+tarotista.id+'º</span></span>';
			}
			else
			{
				resto+='<span class="list-group-item"><a href="'+tarotista.url+'"><img class="foto_ranking" src="img/tarotistas/'+tarotista.id+'.jpg"></a><span class="posicion">'+tarotista.id+'º</span></span>';
			}


			var estrellas=calcularEstrellas(tarotista.total);

			/* GENERACIÓN DE LAS FILAS CON CADA UNA DE LAS TAROTISTAS */

			var temas_lista="";var herramientas_lista="";var habilidades_lista="";

			if(tarotista.amor==1){temas_lista+=" Amor/Desamor "};
			if(tarotista.trabajo==1){temas_lista+=" Trabajo/Carrera "};
			if(tarotista.dinero==1){temas_lista+=" Dinero/Azar/Suerte "};       
			if(tarotista.camino==1){temas_lista+=" Camino Vital/Destino "};     
			if(tarotista.vidas==1){temas_lista+=" Vidas Pasadas/Espíritus "};


			if(tarotista.tarot==1){herramientas_lista+=" Tarot "};
			if(tarotista.pendulo==1){herramientas_lista+=" Péndulo "};
			if(tarotista.astrologia==1){herramientas_lista+=" Astrología "};       
			if(tarotista.magia==1){herramientas_lista+=" Mágia Blanca "};     
			if(tarotista.numerologia==1){herramientas_lista+=" Numerología "};
			if(tarotista.runas==1){herramientas_lista+=" Runas "};

			if(tarotista.videncia==1){habilidades_lista+=" Videncia "};
			if(tarotista.medium==1){habilidades_lista+=" Medium "};
			if(tarotista.significado==1){habilidades_lista+=" Significado sueños"};       
			if(tarotista.telepatia==1){habilidades_lista+=" Telepatía "};     

			var temas='<span class="destacado">Temas:</span> <span class="lista_filtro temas_lista'+tarotista.id+'">'+temas_lista+'</span>';
			var herramientas='<span class="destacado">Herramientas:</span> <span class="lista_filtro herramientas_lista'+tarotista.id+'">'+herramientas_lista+'</span>';
			var habilidades='<span class="destacado">Habilidades:</span> <span class="lista_filtro habilidades_lista'+tarotista.id+'">'+habilidades_lista+'</span>';

			var mensaje=personalizaMensajePrincipal(tarotista.mensaje,tarotista.url);
			var mensaje_pc=personalizaMensajePrincipal("",tarotista.url);

			var estado="";
			if(tarotista.disponible==1)
				estado=" <img class='telefono_estado' alt='telefono' src='img/disponible.png'> <span class='disponible lista_filtro'>Estoy disponible</span>";
			else
				estado=" <img class='telefono_estado' alt='telefono' src='img/no_disponible.png'> <span class='no_disponible lista_filtro'>Ahora mismo no estoy/</span><span class='disponible'>Consulta por mail</span>";

			var oferta="";
			if(tarotista.tirada==1)
			{
				oferta="tirada-tarot-email-gratis.php";
			}
			else if(tarotista.agenda==1)
			{
				oferta="tirada-tarot-telefono-gratis.php";
			}
			else if(tarotista.chat==1)
			{
				oferta="tirada-tarot-chat-gratis.php";
			}

			var color="claro";

			if(cantidad%2==0)
			{
				color="oscuro";
			}

			var telefono_click=tarotista.telefono.replace(/ /g,'');

			if(tarotista.id==1 || tarotista.id==2)
			{
				primero_lista+='<div class="row '+color+' rosa telefono_mov2 tarotista_fila estre'+Math.round(tarotista.total)+'" id="tarotista'+tarotista.id+'"><div class="col-xs-2 col-lg-2"><a href="'+tarotista.url+'"><img class="foto_tabla" src="img/tarotistas/'+tarotista.id+'.jpg"></a></div><div class="col-xs-8 col-lg-8"><span class="nombre_tarotista"><a href="'+tarotista.url+'">Tarotista '+tarotista.nombre+'</a></span><span class="estado">'+estado+'</span><br>'+estrellas+'<br><span class="mensaje">'+mensaje+'</span><span class="telefono_pc"><br>'+temas+'<br>'+herramientas+'<br>'+habilidades+'</span><span class="telefono_mov"><span class="destacado">1ª Consulta gratis </span> '+mensaje_pc+'</span></div><div class="col-xs-2 col-lg-2 centrado"><span class="telefono_pc"><a href="tel:'+telefono_click+'" class="btn btn-call">'+tarotista.telefono+'</a><br><span class="tarifa_tabla">1.21€/min(r.fija)<br>1.57€/min(r.mov)</span><br><a href="tel:966538216" class="btn btn-call">966 538 216</a><br><span class="tarifa_tabla">VISA: 5€/5min</span><br></span><span class="telefono_mov"><a class="btn btn-call-ya" href="tel:'+telefono_click+'">¡Llama ya!</a><br><span class="tarifa_tabla"><span class="telefono_pc">1.21€/min(r.fija)<br></span>1.57€/min(r.mov)</span><br></span></div></div>';
				ultimo_lista+='<div class="row '+color+'  telefono_pc2 tarotista_fila estre'+Math.round(tarotista.total)+'" id="tarotista'+tarotista.id+'"><div class="col-xs-2 col-lg-2"><a href="'+tarotista.url+'"><img class="foto_tabla" src="img/tarotistas/'+tarotista.id+'.jpg"></a></div><div class="col-xs-8 col-lg-8"><span class="nombre_tarotista"><a href="'+tarotista.url+'">Tarotista '+tarotista.nombre+'</a></span><span class="estado">'+estado+'</span><br>'+estrellas+'<br><span class="mensaje">'+mensaje+'</span><span class="telefono_pc"><br>'+temas+'<br>'+herramientas+'<br>'+habilidades+'</span><span class="telefono_mov"><span class="destacado">1ª Consulta gratis </span> '+mensaje_pc+'</span></div><div class="col-xs-2 col-lg-2 centrado"><span class="telefono_pc"><a href="tel:'+telefono_click+'" class="btn btn-call">'+tarotista.telefono+'</a><br><span class="tarifa_tabla">1.21€/min(r.fija)<br>1.57€/min(r.mov)</span><br><a href="tel:966538216" class="btn btn-call">966 538 216</a><br><span class="tarifa_tabla">VISA: 5€/5min</span><br></span><span class="telefono_mov"><a class="btn btn-call-ya" href="tel:'+telefono_click+'">¡Llama ya!</a><br><span class="tarifa_tabla"><span class="telefono_pc">1.21€/min(r.fija)<br></span>1.57€/min(r.mov)</span><br></span></div></div>';

			}
			else
			{
				//Genera la tabla del listado
				centrado_lista+='<div class="row '+color+' tarotista_fila estre'+Math.round(tarotista.total)+'" id="tarotista'+tarotista.id+'"><div class="col-xs-2 col-lg-2"><a href="'+tarotista.url+'"><img class="foto_tabla" src="img/tarotistas/'+tarotista.id+'.jpg"></a></div><div class="col-xs-8 col-lg-8"><span class="nombre_tarotista"><a href="'+tarotista.url+'">Tarotista '+tarotista.nombre+'</a></span><span class="estado">'+estado+'</span><br>'+estrellas+'<br><span class="mensaje">'+mensaje+'</span><span class="telefono_pc"><br>'+temas+'<br>'+herramientas+'<br>'+habilidades+'</span><span class="telefono_mov"><span class="destacado">1ª Consulta gratis </span> '+mensaje_pc+'</span></div><div class="col-xs-2 col-lg-2 centrado"><span class="telefono_pc"><a href="tel:'+telefono_click+'" class="btn btn-call">'+tarotista.telefono+'</a><br><span class="tarifa_tabla">1.21€/min(r.fija)<br>1.57€/min(r.mov)</span><br><a href="tel:966538216" class="btn btn-call">966 538 216</a><br><span class="tarifa_tabla">VISA: 5€/5min</span><br></span><span class="telefono_mov"><a class="btn btn-call-ya" href="tel:'+telefono_click+'">¡Llama ya!</a><br><span class="tarifa_tabla"><span class="telefono_pc">1.21€/min(r.fija)<br></span>1.57€/min(r.mov)</span><br></span></div></div>';

			}

			

		});

		$('.listado_especialistas').append(primero_lista+centrado_lista+ultimo_lista);

		$('.ranking').append(primero+segundo+resto+ultimo);
	});

	//Imagenes de las dos tarotistas del mes
	$( ".rita" ).mouseover(function() {
	  $('#rita_text').show();
	});

	$( "#rita_text" ).mouseover(function() {
	  $('#rita_text').show();
	});

	$( ".rita" ).mouseleave(function() {
	  $('#rita_text').hide();
	});

	$( "#rita_text" ).mouseleave(function() {
	  $('#rita_text').hide();
	});

	$( ".selena" ).mouseover(function() {
	  $('#selena_text').show();
	});

	$( "#selena_text" ).mouseover(function() {
	  $('#selena_text').show();
	});

	$( ".selena" ).mouseleave(function() {
	  $('#selena_text').hide();
	});

	$( "#selena_text" ).mouseleave(function() {
	  $('#selena_text').hide();
	});




});

function disponibilidad(tipo)
{
	//tipo 1 disponible
	//tipo 0 no disponible
	if(tipo==0)
	{
		$('.tarotista_fila').css("display","none");
		$('#tarotista4').css("display","block");
	}
	else if(tipo==1)
	{
		$('.tarotista_fila').css("display","block");
		$('#tarotista4').css("display","none");
	}
}


function personalizaMensajePrincipal(mensaje,url)
{
	mensaje = mensaje.slice(0,80);
	mensaje+="... <a href='"+url+"'> Leer más</a>";
	return mensaje;
}

function calcularEstrellas(puntuacion)
{
	var estrellas= Math.round(puntuacion);
	var estrellas_imagen="";
	if(estrellas==1)
		estrellas_imagen="<span class='est1'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'></span>";
	else if(estrellas==2)
		estrellas_imagen="<span class='est2'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'></span>";
	else if(estrellas==3)
		estrellas_imagen="<span class='est3'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'></span>";
	else if(estrellas==4)
		estrellas_imagen="<span class='est4'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_0.png' alt='estrella' class='estrella'></span>";
	else
		estrellas_imagen="<span class='est5'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'><img src='img/estrella_1.png' alt='estrella' class='estrella'></span>";

	return estrellas_imagen;
}



$('.input_busqueda').click(function() {

   	//Muestro todas
   	$('.tarotista_fila').show();
   
   	var es_estrella=$(this).val();
   	if(es_estrella=="") //Es estrella
  	{
  		if('#'+$(this).attr('id')=="#estrella_busqueda1"){$('.estre2').hide();$('.estre3').hide();$('.estre4').hide();$('.estre5').hide();}
  		else if('#'+$(this).attr('id')=="#estrella_busqueda2"){$('.estre1').hide();$('.estre3').hide();$('.estre4').hide();$('.estre5').hide();}
  		else if('#'+$(this).attr('id')=="#estrella_busqueda3"){$('.estre1').hide();$('.estre2').hide();$('.estre4').hide();$('.estre5').hide();}
  		else if('#'+$(this).attr('id')=="#estrella_busqueda4"){$('.estre1').hide();$('.estre2').hide();$('.estre3').hide();$('.estre5').hide();}
  		else if('#'+$(this).attr('id')=="#estrella_busqueda5"){$('.estre1').hide();$('.estre2').hide();$('.estre3').hide();$('.estre4').hide();};

  	}
  	else
  	{

	   	var cantidad_estrellas=0;
	   	$( ".estrella_busqueda" ).each(function( index ) {
	   	
	   		var estrella='#'+$(this).attr('id');
	   		if($(estrella).attr('src')=="img/estrella_1.png")
	   		{
	   			cantidad_estrellas+=1;
	   		}
	  	});

	  	if(cantidad_estrellas==1){$('.estre2').hide();$('.estre3').hide();$('.estre4').hide();$('.estre5').hide();}
	  	else if(cantidad_estrellas==2){$('.estre1').hide();$('.estre3').hide();$('.estre4').hide();$('.estre5').hide();}
	  	else if(cantidad_estrellas==3){$('.estre1').hide();$('.estre2').hide();$('.estre4').hide();$('.estre5').hide();}
	  	else if(cantidad_estrellas==4){$('.estre1').hide();$('.estre2').hide();$('.estre3').hide();$('.estre5').hide();}
	  	else if(cantidad_estrellas==5){$('.estre1').hide();$('.estre2').hide();$('.estre3').hide();$('.estre4').hide();};

  	}


   	//Recorro todas ocultando aquellas que no tienen los filtros

   	$( ".input_busqueda" ).each(function( index ) {
  		var seleccionada=$(this).val();

  		if(seleccionada!="") //No son estrellas
  		{

		   	if($('#input_'+seleccionada).is(':checked'))
		   	{	
			   	$( ".tarotista_fila" ).each(function( index ) 
			   	{	
			   		if($('#'+$(this).attr('id')+" .lista_filtro:contains('"+seleccionada+"')" ).length==0)
			   		{
			   			$('#'+$(this).attr('id')).hide();
			   			$(this).prop('checked', true);
			   		}

			   	});
		   }

		   	$( ".telefono_mov2" ).hide();

		  
		}
	});



	

});


$( ".estrella_busqueda" ).click(function() {
  	
  	if($(this).attr('id')=="estrella_busqueda1")
  	{
  		$('#estrella_busqueda1').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda2').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda3').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda4').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda5').attr('src','img/estrella_0.png');
  	}
  	else if($(this).attr('id')=="estrella_busqueda2")
  	{
  		$('#estrella_busqueda1').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda2').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda3').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda4').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda5').attr('src','img/estrella_0.png');
  	}
  	else if($(this).attr('id')=="estrella_busqueda3")
  	{
  		$('#estrella_busqueda1').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda2').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda3').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda4').attr('src','img/estrella_0.png');
  		$('#estrella_busqueda5').attr('src','img/estrella_0.png');
  	}
  	else if($(this).attr('id')=="estrella_busqueda4")
  	{
  		$('#estrella_busqueda1').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda2').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda3').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda4').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda5').attr('src','img/estrella_0.png');
  	}
  	else if($(this).attr('id')=="estrella_busqueda5")
  	{
  		$('#estrella_busqueda1').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda2').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda3').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda4').attr('src','img/estrella_1.png');
  		$('#estrella_busqueda5').attr('src','img/estrella_1.png');
  	}
})


function generaContenidoTarotista(id_persona)
{
	$.getJSON('data/tarotistas.json',function(data)
	{
		$.each(data.tarotistas.tarotista, function (index, tarotista) 
		{
			if(tarotista.id==id_persona)
			{
				if(tarotista.tirada==1){$('#perfil-tirada').css('display','block');}
				else if(tarotista.agenda==1){$('#perfil-agenda').css('display','block');}
				else if(tarotista.chat==1){$('#perfil-chat').css('display','block');}

				$('.tarotista_circle').attr('src', tarotista.foto);
				$('.nombre_tarotista h1').html("Tarotista "+ tarotista.nombre);

				var estado="";
				if(tarotista.disponible==1)
					estado=" <img class='telefono_estado' alt='telefono' src='img/disponible.png'> <span class='disponible lista_filtro'>Estoy disponible</span>";
				else
					estado=" <img class='telefono_estado' alt='telefono' src='img/no_disponible.png'> <span class='no_disponible lista_filtro'>Ahora no estoy</span>";

				$('.tarot-per').append(estado);

				var estrellas=calcularEstrellas(tarotista.total);
				$('.estrellitas').append(estrellas);

				$('.numero_destacado').html(tarotista.telefono);

				var telefono_click=tarotista.telefono.replace(/ /g,'');

				$('.llamada_destacado').attr("href", "tel:"+telefono_click);

				var oferta="";
				if(tarotista.tirada==1)
				{
					oferta="tirada-tarot-email-gratis.php";
				}
				else if(tarotista.agenda==1)
				{
					oferta="tirada-tarot-telefono-gratis.php";
				}
				else if(tarotista.chat==1)
				{
					oferta="tirada-tarot-chat-gratis.php";
				}

				$('.ofertita').attr("href", oferta);

				if(tarotista.amor==1){$('.temas_destacado').append(" Amor/Desamor ");}
				if(tarotista.trabajo==1){$('.temas_destacado').append(" Trabajo/Carrera ");}
				if(tarotista.dinero==1){$('.temas_destacado').append(" Dinero/Azar/Suerte ");}
				if(tarotista.camino==1){$('.temas_destacado').append(" Camino Vital/Destino ");}
				if(tarotista.vidas==1){$('.temas_destacado').append(" Vidas Pasadas/Espíritus ");}

				if(tarotista.tarot==1){$('.herramientas_destacado').append(" Tarot ");}
				if(tarotista.pendulo==1){$('.herramientas_destacado').append(" Péndulo ");}
				if(tarotista.astrologia==1){$('.herramientas_destacado').append(" Astrología ");}
				if(tarotista.magia==1){$('.herramientas_destacado').append(" Mágia Blanca ");}
				if(tarotista.numerologia==1){$('.herramientas_destacado').append(" Numerología ");}
				if(tarotista.runas==1){$('.herramientas_destacado').append(" Runas ");}

				if(tarotista.videncia==1){$('.habilidades_destacado').append(" Videncia ");}
				if(tarotista.medium==1){$('.habilidades_destacado').append(" Medium ");}
				if(tarotista.significado==1){$('.habilidades_destacado').append(" Significado sueños");}
				if(tarotista.telepatia==1){$('.habilidades_destacado').append(" Telepatía ");}

				var estrellas=calcularEstrellas(tarotista.total);
				$('.estrellitas0').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.precisión);
				$('.estrellitas1').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.precio);
				$('.estrellitas2').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.atención);
				$('.estrellitas3').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.escucha);
				$('.estrellitas4').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.resolutivo);
				$('.estrellitas5').append(estrellas);
				var estrellas=calcularEstrellas(tarotista.total);
				$('.estrellitas6').append(estrellas);


				
			}
		});
	});
	
}


$( "#button-perfil-descripcion" ).click(function() {

	if(estado1==0)
	{
		$(".perfil-descripcion").css('height','auto');
		estado1=1;
	}
	else
	{
		$(".perfil-descripcion").css('height','200px');
	}
})

$( "#button-perfil-articulos" ).click(function() {

	if(estado2==0)
	{
		$(".perfil-articulos").css('height','auto');
		estado2=1;
	}	
	else
	{
		$(".perfil-articulos").css('height','200px');
	}
		
})


function recetario(id)
{
	if(ultimaid==id)
	{
		$(".perfil-articulos").css('height','200px');	
	}
	else
	{
		ultimaid=id
		$(".perfil-articulos").css('height','200px');
		$("#recetario"+id).css('height','auto');

	}

	
}

$( ".categoria" ).click(function() {

	var seleccion=$(this).text();
	$('#recetari1').hide();$('#recetari2').hide();$('#recetari3').hide();$('#recetari4').hide();$('#recetari5').hide();
	$('#recetari6').hide();$('#recetari7').hide();$('#recetari8').hide();$('#recetari9').hide();

	//Carga de las dos tarotistas del mes de septiembre
	$.getJSON('data/tarotistas.json',function(data)
	{
		$.each(data.tarotistas.tarotista, function (index, tarotista) 
		{
			if(seleccion=="Tarot")
			{
				if(tarotista.receta_tarot==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Tarot Gratis")
			{
				if(tarotista.receta_tarotg==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Videncia")
			{
				if(tarotista.receta_videncia==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Astrología y Horóscopos")
			{
				if(tarotista.receta_astro==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Péndulo")
			{

				if(tarotista.receta_pen==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Numerología")
			{
				if(tarotista.receta_numer==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Si o No")
			{
				if(tarotista.receta_si==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Amor")
			{
				if(tarotista.receta_amor==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}
			else if(seleccion=="Trabajo y Dinero")
			{
				if(tarotista.receta_dinero==1)
				{
					$('#recetari'+tarotista.id).show();
				}
			}


			

		});
	});

})

function generaRecetario()
{
	//Carga de las dos tarotistas del mes de septiembre
	$.getJSON('data/tarotistas.json',function(data)
	{
		$.each(data.tarotistas.tarotista, function (index, tarotista) 
		{
			$("#recetario"+tarotista.id+" .numero_destacado").html(tarotista.telefono);

			var telefono_click=tarotista.telefono.replace(/ /g,'');

			$("#recetario"+tarotista.id+" .llamada_destacado").attr("href", "tel:"+telefono_click);

			$('.url'+tarotista.id).attr("href",tarotista.url);

			$('#recetario'+tarotista.id+' .tarotista_circle_recetario').attr('src', tarotista.foto);
			$('#recetario'+tarotista.id+' .subtitulo_recetario').html("Por "+ tarotista.nombre);

			
			if(tarotista.id=="2")
			{
				$(".tipo1").attr("href", "tel:"+telefono_click);
				$(".tipo1 .texto1").html(tarotista.telefono);
				$(".tipourl1").attr("href", tarotista.url);

				$(".tipo3").attr("href", "tel:"+telefono_click);
				$(".tipourl3").attr("href", tarotista.url);
			}
			else if(tarotista.id=="5")
			{
				$(".tipo2").attr("href", "tel:"+telefono_click);
				$(".tipo2 .texto2").html(tarotista.telefono);
				$(".tipourl2").attr("href", tarotista.url);

				$(".tipo4").attr("href", "tel:"+telefono_click);
				$(".tipourl4").attr("href", tarotista.url);
			}
		

		});
	});
}

function generaTelefonoColumnaFormulario()
{
	//Carga de las dos tarotistas del mes de septiembre
	$.getJSON('data/tarotistas.json',function(data)
	{
		$.each(data.tarotistas.tarotista, function (index, tarotista) 
		{
			var telefono_click=tarotista.telefono.replace(/ /g,'');

			if(tarotista.id=="2")
			{
				$(".tipo1").attr("href", "tel:"+telefono_click);
				$(".tipo1 .texto1").html(tarotista.telefono);
				$(".tipourl1").attr("href", tarotista.url);

				$(".tipo3").attr("href", "tel:"+telefono_click);
				$(".tipourl3").attr("href", tarotista.url);
			}
			else if(tarotista.id=="5")
			{
				$(".tipo2").attr("href", "tel:"+telefono_click);
				$(".tipo2 .texto2").html(tarotista.telefono);
				$(".tipourl2").attr("href", tarotista.url);

				$(".tipo4").attr("href", "tel:"+telefono_click);
				$(".tipourl4").attr("href", tarotista.url);
			}

		});
	});
}



