 var socket = io();

 var label = $('#lblNuevoTicket')

 socket.on("connect", function() {
     console.log("conectado al servidor");
 });

 socket.on("estadoActual", function(data) {
     label.text(data.actual);;
 });

 socket.on("disconnect", function() {
     console.log("desconectado al servidor");

 });

 $('button').on('click', function() {
     socket.emit('nuevoTicket', null,
         function(resp) {
             label.text(resp);
             console.log("respuesta sever:", resp);
         });
 });