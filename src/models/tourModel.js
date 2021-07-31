const db = require("../db");

exports.addOne = async (tour) => {
  return await db.execute(
    `INSERT INTO tour (id, tour_name ,guide_name, price, rating, description, duration, max_people, location, tour_date, user_id) VALUES(?,?,?,?,?,?,?,?,?,?,?);`,
    [
      tour.id,
      tour.name,
      tour.guide,
      tour.price,
      tour.rating,
      tour.description,
      tour.duration,
      tour.maxPeople,
      tour.location,
      tour.date,
      tour.user_id,
    ]
  );
};

exports.findAll = async () => {
  return await db.execute(`select * from tour`);
};



exports.findOne = async(id)=>{
 
  return await db.execute(`SELECT * FROM tour WHERE id = ?`, [id])
}

