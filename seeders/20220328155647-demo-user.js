'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users',[
      {name: "Gonzalo", username: "Gonzalo", mail: "gonzalo@mail.com", password: "1234"},
      {name: "Amorcito", username: "Amorcito", mail: "amorcito@mail.com", password: "1234"},
      {name: "Franco", username: "Franco", mail: "franco@mail.com", password: "1234"},
      {name: "Gimena", username: "Gimena", mail: "gimena@mail.com", password: "1234"}
    ])

    await queryInterface.bulkInsert('Conversations',[
      {idUser1: 1, idUser2: 2},
      {idUser1: 3, idUser2: 4},
      {idUser1: 1, idUser2: 4},
      {idUser1: 1, idUser2: 3}
    ])

    await queryInterface.bulkInsert('Messages', [
      {content: "Hola Amorcito de parte de Gonzalo", conversationId: 1, senderId: 1},
      {content: "Hola Gonzalo de parte de Amorcito", conversationId: 1, senderId: 2},
      {content: "Hola Franco de parte de Gimena ", conversationId: 2, senderId: 4},
      {content: "Hola Gime de parte de Franco", conversationId: 2, senderId: 3},
      {content: "Hola Gimena de parte de Gonzalo", conversationId: 3, senderId: 1},
      {content: "Hola Gonzalo de parte de Gimena", conversationId: 3, senderId: 4},
      {content: "Hola Franco de parte de Gonzalo", conversationId: 4, senderId: 1},
      {content: "Hola Gonzalo de parte de Franco", conversationId: 4, senderId: 3}
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};