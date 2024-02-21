const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

bot.on('message', (message) => {
    let chatId = message.chat.id;

    bot.sendMessage(chatId, 'Hola! Bienvenido a Tato Cumples Reminder Bot!');
});

const birthdayReminders = [
    { name: "INVENTED PERSON", birthday: "2024-02-21" },
    { name: "Moni Castillo Poll", birthday: "2024-01-01" },
    { name: "Agustina Peri", birthday: "2024-01-15" },
    { name: "Mariela Rivas", birthday: "2024-01-16" },
    { name: "Santiago Souberbielle", birthday: "2024-01-14" },
    { name: "Tía Paulette", birthday: "2024-02-14" },
    { name: "Tío Chiche", birthday: "2024-02-15" },
    { name: "Tío Juan Pablo", birthday: "2024-02-19" },
    { name: "Fabiana Serdio", birthday: "2024-02-12" },
    { name: "Nubar Navadián", birthday: "2024-02-25" },
    { name: "Manu Blanco", birthday: "2024-03-02" },
    { name: "Marcela Fuentes Aguerre", birthday: "2024-03-09" },
    { name: "Santiago Fuentes", birthday: "2024-03-13" },
    { name: "Joe Hard", birthday: "2024-05-07" },
    { name: "Tato", birthday: "2024-06-28" },
    { name: "Gerard Souberbielle", birthday: "2024-07-28" },
    { name: "Annabella Suarez", birthday: "2024-08-03" },
    { name: "Dora Fuentes", birthday: "2024-08-14" },
    { name: "Roberto Santiago Souberbielle Fuentes", birthday: "2024-08-14" },
    { name: "Joaquin Souberbielle", birthday: "2024-08-16" },
    { name: "Fer de León", birthday: "2024-09-02" },
    { name: "Ernesto Massia", birthday: "2024-09-05" },
    { name: "Ricardo Yamandú Ferraro Fuentes", birthday: "2024-09-16" },
    { name: "Seba Gonzalez", birthday: "2024-09-17" },
    { name: "Geraldine Polatian", birthday: "2024-09-19" },
    { name: "Marti Puglisi", birthday: "2024-10-20" },
    { name: "James Ulises Souberbielle", birthday: "2024-10-20" },
    { name: "André Souberbielle", birthday: "2024-10-20" },
    { name: "Adriana Rivas", birthday: "2024-11-04" },
    { name: "Pablo Massia", birthday: "2024-11-07" },
    { name: "Laura Serdio", birthday: "2024-27-07" },
    { name: "Marcela Massia", birthday: "2024-11-09" },
    { name: "Francesco Scuoteguazza", birthday: "2024-11-15" },
    { name: "Javier Mendez", birthday: "2024-11-20" },
    { name: "Leandro Fuentes", birthday: "2024-11-20" },
    { name: "Maria Noel Maneiro", birthday: "2024-11-27" },
    { name: "Marcel Souberbielle", birthday: "2024-11-29" },
    { name: "Mamá", birthday: "2024-12-01" },
    { name: "Juli Peri", birthday: "2024-12-16" },
    { name: "Julia Fuentes", birthday: "2024-12-16" }
    // Puedes agregar más nombres y fechas de cumpleaños aquí
];

function sendBirthdayReminders() {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // Sumamos 1 porque getMonth devuelve valores de 0 a 11
    const todayDay = today.getDate();
    
    birthdayReminders.forEach((person) => {
        const birthdayMonth = parseInt(person.birthday.slice(5, 7));
        const birthdayDay = parseInt(person.birthday.slice(8));
        
        if (person.name === "Tato" && birthdayMonth === todayMonth && birthdayDay === todayDay) {
            bot.sendMessage(chatId, `¡Hoy es tu cumpleaños Tato! 🎉`);
        } else if (birthdayMonth === todayMonth && birthdayDay === todayDay) {
            bot.sendMessage(chatId, `¡Hoy es el cumpleaños de ${person.name}! 🎉\n Escribile un mensaje por Whatsapp!`);
        }
    });
}

// Establecer la hora para la verificación de cumpleaños (en este caso, a las 9:00 AM)
const birthdayReminderInterval = setInterval(sendBirthdayReminders, 24 * 60 * 60 * 1000);

// Calcular la cantidad de milisegundos hasta las 9:00 AM
const now = new Date();
let msUntil9AM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 45, 0, 0) - now;

// Si ya pasó la hora, sumar 24 horas para establecer la próxima ejecución a las 9:00 AM del próximo día
if (msUntil9AM < 0) {
    msUntil9AM += 24 * 60 * 60 * 1000;
}

// Establecer el intervalo para ejecutar la verificación a las 9:00 AM
setTimeout(() => {
    sendBirthdayReminders(); // Ejecutar la función una vez para el día actual
    setInterval(sendBirthdayReminders, 24 * 60 * 60 * 1000); // Establecer intervalo diario
}, msUntil9AM);

