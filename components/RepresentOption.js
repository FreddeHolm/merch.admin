import React, { useState, useEffect } from 'react';

const RepresentOption = ({
  id,
  name,
  value,
  checked,
  onChange,
  imageSrc,
  labelText,
  primaryColor,
}) => {
  const isSelected = checked;


  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Define styles based on selection state
  const buttonStyle = {
    width: screenWidth < 600 ? '80px' : "120px", // Set width to 60px
    height: 'auto',
    padding: '5px 0', // Adjust padding for vertical spacing
    borderRadius: '10px',
    cursor: 'pointer',
    border: '3px solid var(--primarycolor)', // Border always present
    backgroundColor: isSelected ? 'var(--primarycolor)' : 'transparent', // Background changes on selection
    color: isSelected ? 'white' : 'var(--primarycolor)', // Text color changes on selection
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
  };

  const imgStyle = {
    width:  '42px',


    //height: '53px',
    marginBottom: '10px',
    filter: isSelected 
      ? 'invert(100%) sepia(7%) saturate(990%) hue-rotate(277deg) brightness(118%) contrast(88%)' 
      : 'brightness(0) saturate(100%) invert(76%) sepia(74%) saturate(2808%) hue-rotate(346deg) brightness(96%) contrast(82%)',
  };

  const labelStyle = {
    fontSize: '12px',
    textAlign: 'center',
    marginTop: "-10px",
    marginBottom: "7px",
  };

  return (
    <div style={{ textAlign: 'center',  }}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }} // Hide the default radio button
      />
      <label htmlFor={id} style={buttonStyle}>
        <img src={imageSrc} alt={labelText} style={imgStyle} />
        <span style={labelStyle}>{labelText}</span>
      </label>
    </div>
  );
};

export default RepresentOption;