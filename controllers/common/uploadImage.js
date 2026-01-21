const commonUploadFunction = require("../../helpers/fileUpload.helper");
const uploads = require("../../helpers/fileUpload.helper");
const { cloudinary } = require("../../helpers/cloudinaryConfig");

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const image = req.files?.image;
      const path = "uploads/";
      if (!image) {
        return res.json({
          status: false,
          message: "A images required. Please try again.",
        });
      }

      const uploadToLocal = await commonUploadFunction.uploadMaterialToLocal(
        image,
        path,
      );

      if (uploadToLocal.status) {
        return res.json({
          status: true,
          message: "An Image added successfully.",
          data: uploadToLocal.data,
        });
      } else {
        return res.json({
          status: false,
          message: uploadToAWS.message,
        });
      }
    } catch (Err) {
      console.log(Err);
      return res.json({
        status: false,
        message: "Something is wrong in upload Image.Please try again.",
        error: Err,
      });
    }
  },
  uploadMultipleImage: async (req, res) => {
    try {
      const image = req.files?.image;
      const path = "galleryImage/";
      if (!image) {
        return res.json({
          status: false,
          message: "A images required. Please try again.",
        });
      }

      const uploadToLocal =
        await commonUploadFunction.uploadMultipleMaterialToLocal(image, path);

      if (uploadToLocal.status) {
        return res.json({
          status: true,
          message: "An Image added successfully.",
          data: uploadToLocal.data,
        });
      } else {
        return res.json({
          status: false,
          message: uploadToAWS.message,
        });
      }
    } catch (Err) {
      console.log(Err);
      return res.json({
        status: false,
        message: "Something is wrong in upload Image.Please try again.",
        error: Err,
      });
    }
  },
  multipleImageUpload: (images, path, deleteUrl, imagesArrayDb) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (images) {
          const movetoAWS = await uploads.uploadMultipleMaterialToLocal(
            images?.length ? images : [images],
            path,
          );
          if (!movetoAWS.status)
            return reject({ status: false, error: movetoAWS.message });
          if (movetoAWS.data) {
            if (imagesArrayDb?.length > 0) {
              if (deleteUrl?.length > 0) {
                await uploads.deleteMultipleFiles(deleteUrl);
                const uploadArray = imagesArrayDb?.filter(
                  (info) => !deleteUrl.includes(info),
                );
                return resolve({
                  status: true,
                  data: [...uploadArray, ...movetoAWS.data],
                });
              } else {
                return resolve({
                  status: true,
                  data: imagesArrayDb.concat(movetoAWS.data),
                });
              }
            } else {
              return resolve({ status: true, data: movetoAWS.data });
            }
          }
        } else {
          if (deleteUrl?.length && imagesArrayDb?.length) {
            await uploads.deleteMultipleFiles(deleteUrl);
            return resolve({
              status: true,
              data: await imagesArrayDb?.filter(
                (info) => !deleteUrl.includes(info),
              ),
            });
          } else {
            return resolve({ status: true, data: imagesArrayDb });
          }
        }
      } catch (error) {
        console.log("multipleImageUpload error : ", error);
        return reject({ status: false, error: error });
      }
    });
  },
  singleImageUpload: (images, path, deleteUrl, imagesArrayDb) => {
    // console.log("deleteUrl ::::: ", deleteUrl);
    return new Promise(async (resolve, reject) => {
      try {
        if (images) {
          const movetoAWS = await uploads.uploadMaterialToLocal(images, path);
          if (!movetoAWS.status)
            return reject({ status: false, error: movetoAWS.message });
          if (movetoAWS.data) {
            if (imagesArrayDb?.length) {
              if (deleteUrl?.length) {
                await uploads.deleteFile(deleteUrl);
                return resolve({
                  status: true,
                  data: movetoAWS.data,
                });
              } else {
                return resolve({
                  status: true,
                  data: imagesArrayDb.concat(movetoAWS.data),
                });
              }
            } else {
              return resolve({ status: true, data: movetoAWS.data });
            }
          }
        } else {
          if (deleteUrl?.length && imagesArrayDb?.length) {
            await uploads.deleteFile(deleteUrl);
            return resolve({
              status: true,
              // data: await imagesArrayDb?.filter(
              //   (info) => !deleteUrl.includes(info)
              // ),
              data: imagesArrayDb,
            });
          } else {
            return resolve({ status: true, data: imagesArrayDb });
          }
        }
      } catch (error) {
        console.log("multipleImageUpload error : ", error);
        return reject({ status: false, error: error });
      }
    });
  },
  multipleImageUploadOnCloudinary: async (files) => {
    try {
      if (!files || !files.length) return { status: true, data: [] };

      const uploadedImages = [];

      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "uploads",
        });
        uploadedImages.push(result.secure_url);
      }

      return { status: true, data: uploadedImages };
    } catch (error) {
      console.log("Cloudinary upload error:", error);
      return { status: false, error };
    }
  },
};
