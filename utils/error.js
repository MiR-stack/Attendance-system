function error(msg = "something went wrong", status = 400) {
  const e = new Error(msg);
  e.status = status;
  e.msg = msg;
  return e;
}

module.exports = error;
