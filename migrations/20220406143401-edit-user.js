'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    
     await queryInterface.changeColumn("Users", "username", {
       type: Sequelize.DataTypes.STRING,
       allowNull: false
     })

     await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    })

    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    })

    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
     await queryInterface.changeColumn("Users", "username", {
      type: Sequelize.DataTypes.STRING
    })

    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.DataTypes.STRING
    })

    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.DataTypes.STRING
    })

    await queryInterface.removeColumn('Users', 'role')
  }
};
