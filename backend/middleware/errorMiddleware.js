const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
