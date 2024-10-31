// components/InputLabel.js
import React from 'react';

const InputLabel = ({ htmlFor, required, labelText, primaryColor, secondaryColor, isFocused }) => {
  const labelStyle = {
    position: 'absolute',
    top: '12px',
    left: '0',
    fontSize: '16px',
    color: required ? secondaryColor : '#aaa',
    transition: '0.2s',
    pointerEvents: 'none',
    ...(isFocused ? { top: '-20px', fontSize: '12px', color: primaryColor } : {}),
  };

  return (
    <label htmlFor={htmlFor} style={labelStyle}>
      {required ? <span style={{ color: secondaryColor }}>*</span> : <span >&nbsp;</span>}
      <span style={{ color: primaryColor }}>{labelText}</span>
    </label>
  );
};

export default InputLabel;