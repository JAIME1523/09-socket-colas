const TicketContro = require("../models/ticket-control");

const ticketContro = new TicketContro();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketContro.ultimo);
    socket.emit('estado-actual', ticketContro.ultimos4);

    socket.on('siguiente-ticket', (payload, callback) => {



        // socket.broadcast.emit('enviar-mensaje', payload );

        const siguiente = ticketContro.siguiente();
        callback(siguiente);
        //TODO: notificar que hay un nuevo ticket de asignar

    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        console.log(escritorio);
        socket.emit('estado-actual', ticketContro.ultimos4);

        if (!escritorio) {
            return callback(
                {
                    ok: false,
                    msg: 'El escritorio es obligatorio'
                }
            )
        }
        const ticket = ticketContro.atender(escritorio);
        if (!ticket) {
            callback({
                ok: false,
                msg: 'ya no hay ticket'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

