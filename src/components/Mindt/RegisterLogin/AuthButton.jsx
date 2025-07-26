import React from 'react';

const AuthButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition duration-200"
    >
      {text}
    </button>
  );
};

export default AuthButton;
