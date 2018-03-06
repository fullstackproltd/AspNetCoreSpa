import base64UrlDecode from './decode';

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

const decode = (token, options = <any>{}) => {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  const pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64UrlDecode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: ${e.message}`);
  }
};
export { decode };
