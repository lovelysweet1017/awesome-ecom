module.exports = {
    errorHandler: require("./dbErrorHandler").errorHandler,
    uploadAdminPhoto: require("./multer").uploadAdminPhoto,
    uploadUserPhoto: require("./multer").uploadUserPhoto,
    uploadAdminDoc: require("./multer").uploadAdminDoc,
    uploadCheque: require("./multer").uploadCheque,
    uploadProductImages: require("./multer").uploadProductImages,
    uploadBannerPhotos: require("./multer").uploadBannerPhotos,
    sendEmail: require("./mailer").sendEmail,
    dbConnection: require("./dbConnection"),
    calculateDistance: require("./geoDistance")
}