const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketContro{
    constructor(){
        this.ultimo  = 0;
        this.hoy     = new Date().getDate();//12
        this.tickets   = [];
        this. ultimos4=[];
        this.init();
    }
    get toJson(){
        return {
            "ultimo": this.ultimo,
            "hoy" : this.hoy,
            "tickets":this.tickets,
            "ultimos4": this.ultimos4
        }
    }

    init(){
        const {hoy, ultimo, ultimos4, tickets} = require("../db/data.json");
        if(hoy === this.hoy){
            this.tickets = tickets,
            this.ultimo = ultimo,
            this.ultimos4= ultimos4
        }else{
            this.gurardarDB()
        }
    }
    gurardarDB(){
        const dbpath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbpath,JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo +=1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.gurardarDB();
        return 'Tickt' + ticket.numero;
    };

    atender(escritorio){
        //no tenemos tickets

        if(this.tickets == 0){
            return null;
        }

        const ticket = this.tickets.shift(); //this.tickets[0];
        ticket.escritorio = escritorio;
        this.ultimos4.unshift(ticket);
        if(this.ultimos4.length >4){
            this.ultimos4.splice(-1,1);
        }
        this.gurardarDB();

        return ticket;
    }


}

module.exports =TicketContro;