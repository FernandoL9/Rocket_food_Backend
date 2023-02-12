class UsersController {
  create(request, response) {
    const {name, email, password} = request.body
    response.status(200).json({name, email, password})
  }
}

module.exports = UsersController