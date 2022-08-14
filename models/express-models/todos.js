let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    return Object.keys(tasks)
  },

  add: function (name, task) {
    if (tasks.hasOwnProperty([name])) {
      tasks[name].push(task)
    } else {
      tasks[name] = [task]
    }
    tasks[name].map((element) => {
      console.log(element)
      if (!element.hasOwnProperty('complete')) {
        element.complete = false
      }
    })
  },

  list: function (name) {
    //returns a list of tasks
    return tasks[name]
  },

  complete: function (name, idx) {
    // marks a task complete
    tasks[name][idx].complete = true
  },

  remove: function (name, idx) {
    // removes a tasks
    tasks[name].splice(idx, 1)
  },
};
