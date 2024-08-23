function formatDate(date) {
    const newDate = new Date(date);
  
    const day = newDate.getDate();
    const month = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ][newDate.getMonth()];
    const year = newDate.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  export default formatDate;
  