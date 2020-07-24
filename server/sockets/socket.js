const { io } = require('../server');
const { TicketControl } = require("../classes/ticket-control")

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })
    console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }
    });

    client.on('nuevoTicket', (data, callback) => {
        let nextTicket = ticketControl.siguiente();
        console.log('Recibido');
        callback(nextTicket)
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "el escritorio es necesario"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        notificarAtodos();

        callback(atenderTicket)
    })

    function notificarAtodos() {

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() })
    }

});