const db = require("../db");

exports.addImage = async (id_tour, img1, img2, img3, img4) => {
  await db.execute(`insert into images (image, tour_id) values (?,?);`, [
    img1,
    id_tour,
  ]);
  await db.execute(`insert into images (image, tour_id) values (?,?);`, [
    img2,
    id_tour,
  ]);
  await db.execute(`insert into images (image, tour_id) values (?,?);`, [
    img3,
    id_tour,
  ]);
  return await db.execute(`insert into images (image, tour_id) values (?,?);`, [
    img4,
    id_tour,
  ]);
};

exports.getAll = async () => {
  return await db.execute(`SELECT * from images`);
};
exports.getByTourId = async (id) => {
  return await db.execute(`select * from images where tour_id = ?`, [id]);
};
