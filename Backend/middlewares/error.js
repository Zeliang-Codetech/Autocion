
export const errorMiddleware = (error, req, res, next) => {
    error.message ||= "Internal Server Error";
    error.statusCode ||= 500;

    if (error.name === "CastError") error.message = "Invalid ID";

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });

}
