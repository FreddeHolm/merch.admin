// components/CountrySelect.jsx

import React from 'react';
import Select from 'react-select';
import Flag from 'react-world-flags';
import PropTypes from 'prop-types';

// Custom Option Component with Flag
const CustomOption = (props) => {
  const { innerRef, innerProps, data, isSelected } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isSelected ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
        padding: '8px 12px',
        cursor: 'pointer',
      }}
    >
      <Flag code={data.value} height="16" style={{ marginRight: '8px' }} />
      <span>{data.label}</span>
    </div>
  );
};

// Custom SingleValue Component with Flag
const CustomSingleValue = (props) => {
  const { data } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: "-20px" }}>
      <Flag code={data.value} height="16" style={{ marginRight: '8px' }} />
      <span>{data.label}</span>
    </div>
  );
};

const CountrySelect = ({
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  required,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <Select
      id="country-select"
      options={options}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      isSearchable
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: 'none',
          borderBottom: `2px solid ${primaryColor}`,
          boxShadow: 'none',
          '&:hover': {
            borderBottom: `2px solid ${primaryColor}`,
          },
          backgroundColor: 'transparent',
          minHeight: '40px',
        }),
        input: (provided) => ({
          ...provided,
          margin: '0px',
          
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: '40px',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999, // Ensure the dropdown menu appears above other elements
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
          color: state.isSelected ? '#000' : '#000',
          cursor: 'pointer',
        }),
        singleValue: (provided) => ({
          ...provided,
          display: 'flex',
          alignItems: 'center',
        }),
      }}
      required={required}
    />
  );
};

// Define PropTypes for better type checking
CountrySelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

CountrySelect.defaultProps = {
  value: null,
  onFocus: () => {},
  onBlur: () => {},
  required: false,
  primaryColor: '#0070f3', // Default primary color
  secondaryColor: '#333', // Default secondary color
};

export default CountrySelect;