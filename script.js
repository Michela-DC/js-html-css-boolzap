const app = new Vue ({
    el: '#app',
    data: {
        searched: '',
        newText: '',
        activeContact: null,  // ci memorizzo contatto attivo
        activeIndex: 0,
        searchText: '',

        contacts: [
            {
                name: 'Michele',
                avatar: 'img/taya-dianna-elMQ400zvpc-unsplash.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'img/christopher-alvarenga-3osGqRRtQBE-unsplash.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                    ],
            },
            {
                name: 'Samuele',
                avatar: 'img/nick-reynolds-8fqL_g50ypc-unsplash.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: 'img/zoe-gayah-jonker-G7kUPmzi80E-unsplash.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
    },

    methods: {
        selectContact: function (contact,index) {
            this.activeIndex = index;
            this.activeContact = contact;
            console.log(this.activeContact,this.activeIndex);
        },

        getHour: function ( date ) {
            const hour = date.split(' ')[1]; //con split prendo l'elemento con posizione 1 dentro a date
            // The split() method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array.

            return hour.substring(0,5); //escludo i secondi dalla stringa
            // The substring() method returns the part of the string between the start and end indexes, or to the end of the string.
        },

        getDate: function (date) {
            return date.split(' ')[0]; 
        },

        createMessage: function(text, status) {
            //creo una nuova data usando il costrutto js Date() --> Creates a JavaScript Date instance that represents a single moment in time in a platform-independent format.Date objects contain a Number that represents milliseconds since 1 January 1970 UTC.
            const newDate = new Date();

            // nell'array di oggetti contact devo aggiungere un nuovo oggetto che come proprietà ha:
            let newMessage = {
                text,
                status,
                date: `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
                // getMonth inizia a contare i mesi da zero quindi gli devo aggiungere + 1 per vedere stampato il mese corretto
            }
            return newMessage;
        },

        sendMessage: function() {

            if(this.newText){ //è la stessa cosa di scrivere this.newText !== ''
                console.log('la stringa non è vuota')
                // per creare il nuovo messaggio richiamo la funzione createMessage e gli passo sent e this.newText come parametri
                let message = this.createMessage(this.newText, 'sent');
                console.log(message);

                // il nuovo messaggio lo devo pushare dentro contatto attivo che è un array di oggetti
                this.activeContact.messages.push(message);
                console.log(this.activeContact);

                //resetto l'input della chat
                this.newText = '';

                //dopo 1 secondo deve comparire la risposta quindi uso il setTimeout passsandogli come parametri la funzione che crea la risposta e il tempo dopo quanto deve attivarsi
                setTimeout(this.replyMessage,1000);

            }else{
                console.log('la stringa è vuota');
            }
        },

        replyMessage: function() {

            let reply = this.createMessage('Ok', 'received');
            console.log(reply);

            this.activeContact.messages.push(reply);
            console.log(this.activeContact);
        },

        
    },

    computed: {
        lastSeen: function () {
            return this.activeContact.messages.slice(-1)[0];
            // If beginIndex is negative, slice() begins extraction from str.length + beginIndex.
            // con slice(-1) mi ritorna un array con dentro solo l'ultimo elemento dell'array
            // poi con [0] vado a prendere l'elemento nella posizione 0 dell'array e dato che con l'uso di slice é rimasto solo l'ultimo elemento allora viene preso quello
        },

        filteredContacts: function() {
            // deve ritornarmi un array con dentro i nomi che vengono filtrati a seconda di quello che viene scritto in this.searchText, quindi:
            // - prendo l'array di oggetti contacts e gli applico il metodo .filter --> The filter() method creates a new array with all elements that pass the test implemented by the provided function.
            // - a filter devo passare un valore (io l'ho chiamto item) che è l'elemento corrente che deve essere filtrato e una funzione dentro cui specifico cosa deve essere filtrato
            // - dentro la funzione devo prendere la proprietà name dell'elemento corrente, ovveri item.name, e gli appilico il metodo .match (The match() method retrieves the result of matching a string against a regular expression)
            const filterResult = this.contacts.filter((item) => {
                return item.name.toLowerCase().match(this.searchText.toLowerCase());
                // it's important to notice that match is case sensitive.
            })
            console.log(filterResult);

            return filterResult;
        },
    },

    // prima che l'applicativo venga montato prendo uno degli hook per imposare il prima contatto attivo
    created() {
        this.selectContact(this.contacts[0],this.activeIndex);
        // in questo modo il primo elemento active nella contact sections é Michele e líndice di default é 0
    }
})

