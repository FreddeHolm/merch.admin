// utils/formatDate.js
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
  
    // Define options for formatting
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'Europe/Stockholm', // Adjust to your desired timezone
    };
  
    // Format the date
    const formattedDate = date.toLocaleString('sv-SE', options).replace(',', ' kl');
  
    return formattedDate;
  };
  