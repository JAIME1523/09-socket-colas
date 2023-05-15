//referencias html
lblTicket1
lblEscritorio1
lblTicket2
lblEscritorio2
const socket = io();


socket.on('estado-actual', (payload) => {
    const [ticket1, ticket2,ticket3,ticket4] = payload;
});

