const Ticket = require('../models/Ticket');

class MyDB {
    constructor() {
        this.tickets = []
    }

    /**
     * create and save a new ticket
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a ticket object
     */
    create(username, price) {
        const ticket = new Ticket(username, price)
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * create multiple ticket for single user
     * @param {string} username
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>}
     */
    bulkCreate(username, price, quantity) {
        const result = [];

        for(let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price);
            result.push(ticket);
        }

        return result;

    }

    /**
     * return all available tickets
     */
    find() {
        return this.tickets;
    }

    /**
     * find ticket by ticket id
     * @param {string} ticketId 
     * @param {Ticket}
     */
    findById(ticketId) {
        const ticket = this.tickets.find(
            /**
             * @param {Ticket} ticket 
             */
            ticket => ticket.id = ticketId
            
        )

        return ticket;
    }


    /**
     * find all tickets for a given user
     * @param {string} username 
     * @param {Array<Ticket>}
     */
    findByUsername(username) {
        const tickets = this.tickets.filter(
            /**
             * 
             * @param {Ticket} ticket 
             */
            ticket => ticket.username === username
        )

        return tickets;
    }

    /**
     * update ticket info
     * @param {string} ticketId 
     * @param {{username: string, price: number}} ticketBody 
     * @returns {Ticket}
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username
        ticket.price = ticketBody.price ?? ticket.price
        ticket.createdAt = new Date();

        return ticket;

    }

    /**
     * update ticket by username
     * @param {string} username
     * @param {{username:string, price: number}} ticketBody
     * @returns {Array<Ticket>}
     */
    updateByUserName(username, ticketBody) {
        const tickets = this.findByUserName(username);
        tickets.forEach((ticket) => {
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updatedAt = new Date();
        });
        return tickets;
    }

    /**
     * delete ticket by id
     * @param {string} ticketId 
     */
    deleteById(ticketId) {
        const index = this.tickets.findIndex(
             /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        );

        if(index !== -1) {
            this.tickets.splice(index, 1)
            return true;
        } else {
            return false;
        }
    }

   /**
     * delete ticket by username
     * @param {string} username
     * @returns {Array<Ticket>}
     */
   deleteByUserName(username) {
     const tickets = this.findByUserName(username);
     tickets.forEach((ticket) => {
       this.deleteById(ticket.id);
     });
     return tickets;
   }


    /**
     * find winners
     * @param {number} winnerCount 
     * @returns {Array<Ticket>}
     */
    draw(winnerCount) {
        let winnerIndexes = new Array(winnerCount);

        let index = 0;

        while(index < winnerCount) {
            let winnerIndex = Math.floor(Math.random() * this.tickets.length)

            if(!winnerIndexes.includes(winnerIndex)) {
                winnerIndexes[index++] = winnerIndex;
                continue;
            }
        }

        const winners = winnerIndexes.map(index => this.tickets[index]);
        return winners;
    }

}

const myDB = new MyDB();

module.exports = myDB;