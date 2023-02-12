const AppError = require("../ultis/AppError")

class UsersController {
  create(request, response) {
    const {name, email, password} = request.body

    if(!name) {
      throw new AppError("Name is require")
    }

    response.status(200).json({name, email, password})
  }
}

module.exports = UsersController