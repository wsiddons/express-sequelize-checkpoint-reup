const db = require('./database');
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);


Task.clearCompleted = async function () {
  await Task.destroy({
    where: {
      complete: true
    }
  })
}

Task.completeAll = async function () {
  await Task.update({
    complete: true
  },
    {
      where: {
        complete: false
      }
    })
}

Task.prototype.getTimeRemaining = function () {
  if (this.due === undefined) {
    return Infinity
  } else {
    const today = new Date().getTime()
    return this.due.getTime() - today
  }
}

Task.prototype.isOverdue = function () {
  const today = new Date('8/14/2022').getTime()
  let time = this.due.getTime() - today
  if (time > 0 || this.complete === true) {
    return false
  } else {
    return true
  }
}

Task.prototype.assignOwner = function (owner) {
  return this.setOwner(owner)
}

Owner.getOwnersAndTasks = async function () {
  let ownersAndTasks = await Owner.findAll({
    include: Task
  })
  return ownersAndTasks
}

Owner.prototype.getIncompleteTasks = async function () {
  let incomplete = await Task.findAll({
    where: {
      complete: false
    },
    include: Owner
  })
  return incomplete
}

Owner.beforeDestroy((owner) => {
  if (owner.name === 'Grace Hopper') {
    throw new Error
  }
})


//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
