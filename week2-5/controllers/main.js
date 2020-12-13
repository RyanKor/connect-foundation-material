const Todo = require("../schemas/todo");
exports.mainPage = async (req, res, next) => {
  try {
    const allPosts = await Todo.find({});
    return res.render("todo", { allPosts });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteTodo = (req, res, next) => {
  Todo.findByIdAndRemove({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.json(result); // JSON으로 결과 값을 만들어서 보내주지 않으면 삭제할 수 없다.
    })
    .catch((err) => {
      console.err(err);
      next(err);
    });
};
exports.deleteAllTodo = (req, res, next) => {
  Todo.remove({})
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.err(err);
      next(err);
    });
};

// exports.mainPage = (req, res, next) => {
//   Todo.find({})
//     .then((result) => {
//       console.log(result);
//       res.render("todo", { allPosts: result });
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// };
