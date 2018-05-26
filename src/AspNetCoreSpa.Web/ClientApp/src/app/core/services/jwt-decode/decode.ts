function b64DecodeUnicode(str) {
  return decodeURIComponent(window.atob(str).replace(/(.)/g, (m, p) => {
    let code = p
      .charCodeAt(0)
      .toString(16)
      .toUpperCase();
    if (code.length < 2) {
      code = `0${code}`;
    }
    return `%${code}`;
  }));
}

export default function (str) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw Error('Illegal base64url string!');
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return window.atob(output);
  }
}
