const AppError = require("../ultis/AppError")
const {hash, compare} = require("bcryptjs")
const sqliteConnection = require("../database/sqlite")


class UsersController {

  //create users
  async  create(request, response) {
    const {name, email, password} = request.body

    const database = await sqliteConnection() // starting database

    const checkIsExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //checking the user in database

    if(checkIsExists){
      throw new AppError("User exists in system")
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?) ", [name, email, hashedPassword])


    return response.status(201).json();

    // if(!name) {
    //   throw new AppError("Name is require")
    // }

    // response.status(200).json({name, email, password})
  }
  
  async update(request, response) {
    const {name, email, password, old_Password} = request.body
    const {id}          = request.params

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if(!user) {
      throw new AppError("User not found!")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email already another user!")
    }

    user.name = name
    user.email = email

    if(password && !old_Password) {
      throw new AppError("Old password not informed")
    }

    if(password && old_Password) {
      const checkOldPassord = await compare(old_Password, user.password )

      if(!checkOldPassord) {
        throw new AppError("The old password is not corect")
      }

      user.password = await hash(old_Password, 8)
    }

    database.run(`UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = ?
      WHERE id = ?`, [user.name, user.email, user.password, new Date(), id])

    return response.status(201).json()
  }
  
}
  

module.exports = UsersController