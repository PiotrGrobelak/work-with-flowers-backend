const creationDate = new Date().toLocaleDateString('pl-PL', {
  month: '2-digit',
  day: '2-digit',
});

module.exports = creationDate;
