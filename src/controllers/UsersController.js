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

  async update(resquest, response) {
    const {name, email} = resquest.body
    const {id}          = resquest.params

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)",[id])

    if(!user){
      throw new AppError("User not found")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Email already another user!")
    }

    user.name = name
    user.email = email

    database.run(`
      UPDATE users SET
      name =        ?,
      email =       ?,
      updated_at =  ?
      WHERE id =    ?`,
      [user.name, user.email, new Date(), id])
      return response.status(201).json()
   
  }
}
  

module.exports = UsersController