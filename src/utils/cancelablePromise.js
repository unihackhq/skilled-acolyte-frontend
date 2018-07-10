export default (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val) => {
        if (hasCanceled) {
          reject({ isCanceled: true });
        } else {
          resolve(val);
        }
      },
      (error) => {
        if (hasCanceled) {
          reject({ isCanceled: true });
        } else {
          reject(error);
        }
      },
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};
