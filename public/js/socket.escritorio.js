var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
console.log(searchParams.has('escritorio'));

var escritorio = searchParams.get('escritorio');
var label = $('small');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            label.text('No hay tickets');
            return;
        }

        label.text('Tickets : ' + resp.numero.toString());
        console.log(resp);
        console.log(resp.numero);

    });
})