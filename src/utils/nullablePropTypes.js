const allowNull = wrappedPropTypes =>
  (props, propName, ...rest) => {
    if (props[propName] === null) {
      return null;
    }
    return wrappedPropTypes(props, propName, ...rest);
  };

export default allowNull;
