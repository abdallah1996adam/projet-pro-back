
const convertImages = async (image) => {
  //converting images to base 64 and save it in database
  const avatar = image;
  const img = avatar.data;
  const data = img.toString("base64");
  await avatar.mv("../../public/tours/" + avatar.name);
  return data;
};

module.exports = convertImages;
