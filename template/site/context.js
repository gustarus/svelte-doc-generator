let library = [];
try {
  library = require('./library').default;
} catch (error) {
  if (typeof console !== 'undefined') {
    console.error ? console.error(error) : console.log(error);
  }
}

export default library;
