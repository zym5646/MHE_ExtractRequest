var jsonpath = require('jsonpath');

module.exports = {
  extractRequest: function(htmlTemplate, request) {
    const beginChar = '{';
    const endChar = '}';
    var htmlChar;
    while (htmlTemplate.indexOf(beginChar) !== -1) {
      const startIndex = htmlTemplate.indexOf(beginChar);
      const endIndex = htmlTemplate.indexOf(endChar);
      var paramString = htmlTemplate.substring(startIndex + 1, endIndex).replace('Request', '');
      if (paramString.indexOf('Details.') !== -1) {
        paramString = paramString.replace('Details.', '');
        const jsonValue = jsonpath.value(request.Details, '$' + paramString);
        htmlTemplate = htmlTemplate.replace(beginChar + 'Request.Details' + paramString + endChar, jsonValue);
      }else {
        const jsonValue = jsonpath.value(request, '$' + paramString);
        htmlTemplate = htmlTemplate.replace(beginChar + 'Request' + paramString + endChar, jsonValue);
      }
    }
    return htmlTemplate;
  }
}