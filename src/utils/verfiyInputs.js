const verfiyInputs = (inputs) => {
  // constants
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
  const NAME_REGEX = /^([a-zA-Z ]+)$/;

  const { email, firstName, lastName, password } = inputs;

  if (email == "" || firstName == "" || lastName == "" || password == "") {
    return {
      Status: 400,
      Msg: "les champs ne peuvent pas être vides",
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
      Msg: "prénom invalide (doit être une chaîne de caractères)",
    };
  }
  if (!NAME_REGEX.test(lastName)) {
    return {
      Status: 400,
      Msg: "nom invalide (doit être une chaîne de caractères)",
    };
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      Status: 400,
      Msg: "mot de passe invalide (doit être de 4 à 12 et inclure au moins 1 chiffre)",
    };
  }
  return false;
};

module.exports = verfiyInputs;
