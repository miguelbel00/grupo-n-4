const createHttpError = require("http-errors");
const { catchAsync } = require("../../helpers/catchAsync");
const { endpointResponse } = require("../../helpers/success");

module.exports = {
  imageUpload: catchAsync(async (req, res, next) => {
    try {
      endpointResponse({
        res,
        message: "Uploaded File Path",
        body: req.file.path,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error Obtaining File Path] - [ImageUploadControllers - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
