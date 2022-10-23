const user = {
  email: "valid@email.com",
  name: "name",
  password: "password",
};
const invalidEmail = {
  email: "invalidEmail",
  name: "name",
  password: "password",
};
const invalidPassword = {
  email: "valid@email.com",
  name: "name",
  password: "",
};
const invalidName = {
  email: "valid@email.com",
  name: "n",
  password: "password",
};
const credentials = {
  email: "valid@email.com",
  password: "password",
};

const invalidEmailCredential = {
  email: "invalid@email.com",
  password: "password",
};
const invalidPasswordCredential = {
  email: "valid@email.com",
  password: "invalidPassword",
};

export {
  user,
  invalidEmail,
  invalidPassword,
  invalidName,
  credentials,
  invalidEmailCredential,
  invalidPasswordCredential,
};
