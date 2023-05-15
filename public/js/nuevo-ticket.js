
const lblNuevoTicket =  document.querySelector('#lblNuevoTicket');

const btnCrear =  document.querySelector('button');
// const io = require('socket.io');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    // lblOffline.style.display = 'none';
    // lblOnline.style.display  = '';
    
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;

});
socket.on( 'ultimo-ticket', ( ulrimoTicket ) => {
    lblNuevoTicket.innerText = 'Ticket '+ulrimoTicket;
});

// socket.on('enviar-mensaje', (payload) => {
//     console.log( payload )
// })


btnCrear.addEventListener( 'click', () => {

   
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});