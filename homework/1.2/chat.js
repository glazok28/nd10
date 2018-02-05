const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

//ДЗ часть 1 - создаем отдельную функцию для обработчика события
let prepareAnswer = () => {
  console.log('Готовлюсь к ответу');
}

webinarChat.on('message', chatOnMessage);

//ДЗ часть 1 - добавляем обработчик события, который выводит 'Готовлюсь к ответу'
webinarChat.on('message', prepareAnswer);

facebookChat.on('message', chatOnMessage);

//ДЗ часть 1 - устанавливаем максимальное количество обработчиков событий, равное 2
vkChat.setMaxListeners(2);
vkChat.on('message', chatOnMessage);

//ДЗ часть 1 - добавляем обработчик события, который выводит 'Готовлюсь к ответу'
vkChat.on('message', prepareAnswer);

// vkChat.on('message', chatOnMessage);
// vkChat.on('message', chatOnMessage);
// vkChat.on('message', chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );