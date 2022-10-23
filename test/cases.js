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

const article = {
  keyword: "bitcoin",
  title:
    "Former Uber security chief found guilty of covering up massive 2016 data breach",
  text: "Uber paid two hackers $100,000 in Bitcoin to keep a 2016 data breach quiet, and now a jury has convicted former chief security officer Joe Sullivan on two charges for not reporting the incident to authorities.",
  date: "2022-10-06T00:25:32Z",
  source: "The Verge",
  link: "https://www.theverge.com/2022/10/5/23390063/uber-security-chief-convicted-hack-cover-up-bounty-payment",
  image:
    "https://cdn.vox-cdn.com/thumbor/lh2YBh8cWvn3ARrenXxjolBte4o=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23932655/acastro_STK106__01.jpg",
};

export {
  user,
  invalidEmail,
  invalidPassword,
  invalidName,
  credentials,
  invalidEmailCredential,
  invalidPasswordCredential,
  article,
};
