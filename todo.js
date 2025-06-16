// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      overdueTodos.forEach(todo => {
      console.log(`${todo.id}. ${todo.title} (Due: ${todo.dueDate})`);
      console.log("\n");
      } ;

      console.log("Due Today");
      dueTodayTodos.forEach(todo => {
      console.log(`${todo.id}. ${todo.title} (Due: ${todo.dueDate})`);
      console.log("\n");
      } ;

      console.log("Due Later");
      dueTodayTodos.forEach(todo => {
      console.log(`${todo.id}. ${todo.title} (Due: ${todo.dueDate})`);
      console.log("\n");
      } ;

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.lt]: today
          }
        },
        order: [['dueDate', 'DESC']]
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE TODAY
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: today
        },
        order: [['dueDate', 'DESC']]
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.gt]: today
          }
        },
        order: [['dueDate', 'ASC']]
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK A TODO AS COMPLETE
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      } else {
        throw new Error(`Todo with id ${id} not found`);
      }

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};