//Email Validator is a function to check email address formatting

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function emailValidator(testEmail) {
  if (!testEmail) {
    return false;
  }

  if (testEmail.length > 100) {
    return false;
  }

  if (emailRegex.test(testEmail)) {
    return true;
  }

  return false;
}

module.exports = emailValidator;
