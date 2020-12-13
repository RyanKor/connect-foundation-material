const Todo = require("../schemas/todo");

exports.postTodo = async (req, res, next) => {
  console.log(req.body);
  Todo.create({ content: req.body.posts })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

/*

exports.postTodo = async (req, res, next) => {
    try {
      let content = new Todo({
        content: req.body.posts,
      });
      await content.save();
      return res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
};
*/

// https://stackoverflow.com/questions/38382825/mongoose-findbyidandupdate-method-to-toggle-and-update-a-boolean-value-in-databa
exports.checkTodo = async (req, res, next) => {
  console.log(req);
  await Todo.findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      result.lineThrough = !result.lineThrough;
      result.save();
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

exports.checkTodo = async (req, res, next) => {
  console.log(req);
  const toggling = req.body.lineCheck;
  await Todo.findOneAndUpdate({ _id: req.params.id }, { $set: toggling })
    .then((result) => {
      console.log(result);
      return res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};
