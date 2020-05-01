const errorMessage = (res) => res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });

module.exports = errorMessage;
