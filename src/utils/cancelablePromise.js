export default (promise) => {
  let cancel = () => null;

  const wrappedPromise = new Promise((resolve, reject) => {
    // reject the promise and drop all references
    cancel = () => {
      reject({ isCanceled: true });
      resolve = null; // eslint-disable-line no-param-reassign
      reject = null; // eslint-disable-line no-param-reassign
    };

    promise.then(
      (val) => {
        if (resolve) {
          resolve(val);
        }
      },
      (error) => {
        if (reject) {
          reject(error);
        }
      },
    );
  });

  return {
    promise: wrappedPromise,
    cancel,
  };
};
