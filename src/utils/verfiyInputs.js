const verfiyInputs = (inputs) => {
  // constants
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
  const NAME_REGEX = /^([a-zA-Z ]+)$/;

  const { email, firstName, lastName, password } = inputs;

  if (email == "" || firstName == "" || lastName == "" || lastName == "") {
    return {
      Status: 400,
      Msg: "missing parameters",
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      Status: 400,
      Msg: "invalid email",
    };
  }

  if (!NAME_REGEX.test(firstName)) {
    return {
      Status: 400,
      Msg: "firstName invalid (must be a string)",
    };
  }
  if (!NAME_REGEX.test(lastName)) {
    return {
      Status: 400,
      Msg: "lastName invalid (must be a string)",
    };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      Status: 400,
      Msg: "invalid password (must length 4 - 12 and include 1 number at least)",
    };
  }
  return false;
};

module.exports = verfiyInputs;
