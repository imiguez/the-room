export const formatMessageDate = (date: Date) => {
  date = new Date(date);

  // Extract the components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

  // Format the date string
  return `${formattedHours}:${formattedMinutes} ${ampm}  - ${day}/${month}/${year}`;
}

export const formatChatDate = (date: Date) => {
  date = new Date(date);

  if (date.getDate() === new Date().getDate()) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    return `${day}/${month}/${year}`;
  }
}