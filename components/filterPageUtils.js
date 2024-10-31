


export const customStyles = {
    
  /* ALT 1
  option: (provided, state) => {
      const colors = {
        all: 'blue', // Change 'blue' to your desired color for the 'all' option
        festen: 'green', // Change 'green' to your desired color for the 'festen' option
        'bra-att-ha': 'red', // Change 'red' to your desired color for the 'bra-att-ha' option
        patches: 'purple', // Change 'purple' to your desired color for the 'patches' option
        ovven: 'orange', // Change 'orange' to your desired color for the 'ovven' option
        featured: 'pink', // Change 'pink' to your desired color for the 'featured' option
      };
      const color = colors[state.data.value] || 'black';

      
  
      return {
        ...provided,
        backgroundColor: state.isSelected || state.isFocused ? color : 'white',
        color: state.isSelected || state.isFocused ? 'white' : "black",//color: state.isSelected || state.isFocused ? 'white' : color,
      };
    },
*/


/* ALT 2 */
  option: (provided, state) => {

  
      return {
        ...provided,
        color: state.isSelected || state.isFocused ? 'white' : "black",//color: state.isSelected || state.isFocused ? 'white' : color,
      };
    },
/* ALT 2 end*/


    control: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? 'none' : provided.outline,
      boxShadow: state.isFocused ? 'none' : provided.boxShadow,
      borderColor: state.isFocused ? 'var(--primarycolor)' : provided.borderColor,
      '&:hover': {
        borderColor: state.isFocused ? 'var(--primarycolor)' : provided.borderColor,
      },
    }),
    /*singleValue: (provided, state) => {
      const colors = {
        all: 'blue', // Change 'blue' to your desired color for the 'all' option
        festen: 'green', // Change 'green' to your desired color for the 'festen' option
        'bra-att-ha': 'red', // Change 'red' to your desired color for the 'bra-att-ha' option
        patches: 'purple', // Change 'purple' to your desired color for the 'patches' option
        ovven: 'orange', // Change 'orange' to your desired color for the 'ovven' option
        featured: 'pink', // Change 'pink' to your desired color for the 'featured' option
      };
      const color = colors[state.data.value] || 'black';
  
      return {
        ...provided,
        color: color,
      };
    },*/
  };
  

  