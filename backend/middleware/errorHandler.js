const errorHandler = (err, res) => {
  let ERROR_CODE;
  if (err.name === 'CastError') {
    ERROR_CODE = 400;
    res.status(ERROR_CODE).send({ message: err.message });
  } else if (err.statusCode === 403) {
    ERROR_CODE = 403;
    res.status(ERROR_CODE).send({ message: 'Request forbidden, unauthorized' });
  } else if (err.statusCode === 404) {
    ERROR_CODE = 404;
    res.status(ERROR_CODE).send({ message: 'Requested resource not found' });
  } else if (err.statusCode === 409) {
    ERROR_CODE = 409;
    res.status(ERROR_CODE).send({ message: 'This email is already registered' });
  } else {
    ERROR_CODE = 500;
    res.status(ERROR_CODE).send({ message: 'An error has occurred on the server' });
  }
  // console.log(err.name, err.message);
};

module.exports = errorHandler;
