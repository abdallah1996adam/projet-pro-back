const db = require("../db");

exports.findOne = async (email) => {
  return await db.execute(`SELECT * FROM users WHERE emailId = (?);`, [email]);
};

exports.addOne = async (user) => {
  const { firstName, lastName, email, password } = user;
  return await db.execute(
    `INSERT INTO users (firstName, latstName, emailId, password) VALUES(?,?,?,?);`,
    [firstName, lastName, email, password]
  );
};

exports.getOne = async(id)=>{
  return await db.execute(`select * from users where id = ?;`, [id])
}

exports.addImg = async(imgData, id)=>{
  const queryData = `UPDATE users SET userImage = '${imgData}' WHERE id = '${id}';`
 
  return await db.execute(queryData)
}


