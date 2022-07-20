let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
     
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.alex.reminders.push('hello')
    database.cindy.reminders.push(reminder);
    console.log(database.cindy.reminders)
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    console.log(database.cindy.reminders)
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
     database.cindy.reminders.forEach(ele => {

      if(ele.id === Number(req.params.id)){
        ele.completed =  req.body.completed == 'true' ? Boolean(req.body.completed) : !Boolean(req.body.completed)
        ele. title = req.body.title
        ele.description = req.body.description
       
        return  database.cindy.reminders.splice(req.params.id - 1, 1 , ele)
      }
    })

    res.redirect('/reminders')
    
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id
    database.cindy.reminders.splice(reminderToDelete -1 ,1)
    res.redirect('/reminders')
    
  },
};

module.exports = remindersController;