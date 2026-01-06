const fs = require("fs");
const randomstring = require("randomstring");

module.exports.uploadMaterialToLocal = async (fileData, path) => {
  return new Promise(async (resolve) => {
    path = "uploadImages/" + path;
    var dir = "./" + path;
    if (!fs.existsSync(dir))
      await fs.mkdir(dir, { recursive: true }, (err) => {});
    const fileName =
      randomstring.generate({ length: 20, charset: "numeric" }) +
      "." +
      fileData.name.split(" ").join("-");
    await fileData.mv(dir + fileName, function (err, data) {
      if (err)
        return resolve({
          status: false,
          message: "Error uploading image on local.",
        });
      return resolve({ status: true, data: path + fileName });
    });
  });
};
module.exports.uploadMultipleMaterialToLocal = (fileData, path) => {
  return new Promise(async (resolve) => {
    console.log(fileData[0].name);
    // path = "uploadImages/" + path;
    path = "uploadImages/";
    var dir = "./" + path;
    console.log(fileData[0]);
    let ImageArray = Array();
    for (i = 0; i < fileData.length; i++) {
      if (!fs.existsSync(dir))
        await fs.mkdir(dir, { recursive: true }, (err) => {});
      const fileName =
        randomstring.generate({ length: 20, charset: "numeric" }) +
        "." +
        fileData[i].name.split(" ").join("-");
      ImageArray.push(path + fileName);
      await fileData[i].mv(dir + fileName, function (err, data) {
        if (err)
          return resolve({
            status: false,
            message: "Error uploading image on local.",
          });
        return resolve({ status: true, data: ImageArray });
      });
    }
  });
};
module.exports.deleteFile = (filePath) => {
  console.log("filePath : ", filePath);
  return new Promise((resolve) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return resolve({ status: false, message: "Error deleting file." });
      }
      console.log("File deleted:", filePath);
      return resolve({ status: true, message: "File deleted successfully." });
    });
  });
};
module.exports.deleteMultipleFiles = (filePaths) => {
  console.log("filePaths:", filePaths);
  return Promise.all(
    filePaths?.map((filePath) => {
      return new Promise((resolve) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return resolve({ status: false, message: "Error deleting file." });
          }
          console.log("File deleted:", filePath);
          return resolve({
            status: true,
            message: "File deleted successfully.",
          });
        });
      });
    })
  );
};
