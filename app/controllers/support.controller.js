const db = require("../models");
const Support = db.supports;

// Create and Save a new Support Ticket
exports.create = (req, res) => {
  if (!req.body.message) {
    res.status(400).send({
      message: "Message can not be empty!"
    });
    return;
  }

  const support = new Support({
    user: req.body.userId,
    issueType: req.body.issueType,
    message: req.body.message,
    status: "Open",
    reply: ""
  });

  support
    .save(support)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Support Ticket."
      });
    });
};

// Retrieve all Support Tickets
exports.findAll = (req, res) => {
  Support.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDetails"
      }
    }
  ])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Support Tickets."
      });
    });
};

// Find Support Tickets by User
exports.findByUser = (req, res) => {
  const userId = req.params.userId;

  Support.find({ user: userId })
    .sort({ createdAt: -1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Support Tickets."
      });
    });
};

// Find a single Support Ticket
exports.findOne = (req, res) => {
  const id = req.params.id;

  Support.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Support Ticket with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Support Ticket with id=" + id
      });
    });
};

// Update Support Ticket
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Support.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Support Ticket with id=${id}. Maybe it was not found!`
        });
      } else {
        res.send({
          message: "Support Ticket was updated successfully."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Support Ticket with id=" + id
      });
    });
};

// Reply to Ticket & Mark Resolved
exports.reply = (req, res) => {
  const id = req.params.id;

  Support.findByIdAndUpdate(
    id,
    {
      reply: req.body.reply,
      status: "Resolved"
    },
    { useFindAndModify: false, new: true }
  )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Support Ticket with id=${id}`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error replying to Support Ticket with id=" + id
      });
    });
};

// Delete a Support Ticket
exports.delete = (req, res) => {
  const id = req.params.id;

  Support.findByIdAndRemove(id, {
    useFindAndModify: false
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Support Ticket with id=${id}.`
        });
      } else {
        res.send({
          message: "Support Ticket was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Support Ticket with id=" + id
      });
    });
};

// Delete all Support Tickets
exports.deleteAll = (req, res) => {
  Support.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Support Tickets were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Support Tickets."
      });
    });
};

// Find all Open Tickets
exports.findAllOpen = (req, res) => {
  Support.find({ status: "Open" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Open Tickets."
      });
    });
};