const AppError = require("../ultis/AppError")
const {hash, compare} = require("bcryptjs")
const sqliteConnection = require("../database/sqlite")


class UsersController {

  //create user
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
  
  //update user
 async update(request, response) {
  // data user
  const {name, email, password, old_Password} = request.body
  const {id}                                  = request.params

  // Starting connection with database
  const database = await sqliteConnection() 

  // Search user 
  const user = await database.get("SELECT * FROM users WHERE id = (?)",[id]) 

  //catch error user not registered 
  if(!user) {
    throw new AppError("User not found") 
  }

  // Search email
  const userWithUpdatedEmail = await database
  .get("SELECT * FROM users WHERE email = (?)", [email])

  //Checking if exist email already user
  if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    throw new AppError("Email already another user!")
  }

  //associating variables
  user.name  = name  ?? user.name 
  user.email = email ?? user.email

  //checking if exist old password
  if(password && !old_Password) {
    throw new AppError("The old password not informed")
  }

  //checking of new password and old password
  if(password && old_Password) {
    const checkOldPassword = await compare(old_Password, user.password)

    if(!checkOldPassword) {
      throw new AppError("The old password is incorect")
    }

    user.password = await hash(old_Password, 8)

  }

  //updated data for database
  database.run(`UPDATE users SET
  name = ?,
  email = ?,
  password = ?,
  updated_at = DATETIME("now")
  WHERE id = ?`, [user.name, user.email, user.password, new Date(), id])

  //Status of upload data
  return response.status(201).json()
  
}

}
  

module.exports = UsersController