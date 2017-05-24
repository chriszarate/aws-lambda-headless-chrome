function delay(timeout) {
  return value => new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, timeout);
  });
}

function loading(func, timeout, startTime = Date.now()) {
  const loop = (resolve, reject) => {
    if (Date.now() - startTime > timeout) {
      reject();
      return;
    }

    func().then(resolve).catch(() => {
      setTimeout(() => {
        loop(resolve, reject);
      }, 100);
    });
  };

  return new Promise(loop);
}

module.exports = {
  delay,
  loading,
};
