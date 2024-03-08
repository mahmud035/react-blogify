const getFormattedDate = (timestamp) => {
  const localDate = new Date(timestamp);
  const now = new Date();

  // Calculate the difference in milliseconds
  const timeDiff = now - localDate;
  const diffInSeconds = Math.floor(timeDiff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInHours >= 24 && diffInHours < 48) {
    return 'Yesterday';
  } else {
    // Format the converted date
    const formatter = new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const { day, month, year } = formatter
      .formatToParts(localDate)
      .reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});

    return `${month} ${day}, ${year}`;
  }
};

export { getFormattedDate };
