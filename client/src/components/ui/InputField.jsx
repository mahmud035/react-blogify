import React from 'react';

const InputField = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id} className="block mb-2">
          {label}
        </label>
      )}

      {children}

      {error && (
        <p role="alert" className="pt-1 text-red-500 ">
          {error.message}
        </p>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ('id' in child.props) {
    return child.props.id;
  }
};

export default InputField;
