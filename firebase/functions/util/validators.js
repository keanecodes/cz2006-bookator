const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

exports.validateSignupData = user => {
  let errors = {};

  if (isEmpty(user.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(user.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(user.password)) errors.password = 'Must not be empty';
  if (user.password !== user.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(user.username)) errors.username = 'Must not be empty';
  if (isEmpty(user.name)) errors.name = 'Must not be empty';
  if (!parseInt(user.mobile)) errors.mobile = 'Invalid mobile number';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = user => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.name.trim())) userDetails.name = data.name;
  if (parseInt(data.mobile)) userDetails.mobile = data.mobile;

  return userDetails;
};