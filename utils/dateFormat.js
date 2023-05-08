function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

module.exports = { formatDate };