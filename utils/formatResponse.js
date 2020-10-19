const formatResponse = (res, status, data) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.json(data);
};

module.exports = formatResponse;
