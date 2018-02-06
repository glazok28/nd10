// Доп. задание 2 - разбить на модули
// сделаю после проверки частей 1,2 оснновного задания и ч.1 доп. задания

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

//ДЗ часть 2 - добавляем метод close
  close(){
    this.emit('close', {});
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

let handleClose = () => {
  console.log('Чат вконтакте закрылся :(');
}

webinarChat.on('message', chatOnMessage);

//ДЗ часть 1 - добавляем обработчик события, который выводит 'Готовлюсь к ответу' к webinarChat
webinarChat.on('message', prepareAnswer);

facebookChat.on('message', chatOnMessage);

//ДЗ часть 1 - устанавливаем максимальное количество обработчиков событий, равное 2
vkChat.setMaxListeners(2);

vkChat.on('message', chatOnMessage);

//ДЗ часть 1 - добавляем обработчик события, который выводит 'Готовлюсь к ответу' к vkChat
vkChat.on('message', prepareAnswer);

//ДЗ часть 2 - добавляем обработчик close
vkChat.on('close', handleClose);

//ДЗ часть 2 - вызываем метод close
vkChat.close();

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


// ДЗ доп - отписать  chatOnMessage от вебинара webinarChat через 30 сек
// это имелось ввиду ?
setTimeout( ()=> {
  console.log('Закрываю вебинар...');
webinarChat.removeListener('message', chatOnMessage);
webinarChat.removeListener('message', prepareAnswer);
}, 30000 );