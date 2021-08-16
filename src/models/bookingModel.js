const db = require('../db')


exports.addOne = async (userId, tourId)=>{
    return await db.execute(`INSERT INTO booking (user_id , tour_id) VALUES (?,?);`, [userId, tourId])
}