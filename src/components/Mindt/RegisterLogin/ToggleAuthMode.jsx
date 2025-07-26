import React from 'react';
import { Link } from 'react-router-dom';

const ToggleAuthMode = ({ text, linkText, to }) => {
  return (
    <p className="mt-4 text-sm text-center text-gray-600">
      {text}{' '}
      <Link to={to} className="text-orange-500 font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default ToggleAuthMode;
