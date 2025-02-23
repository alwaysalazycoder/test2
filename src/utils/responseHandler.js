const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({ success: true, ...data });
};

export default sendResponse;
