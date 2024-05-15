let documentPath = '';

function setDocumentPath(path) {
  documentPath = path;
}

function getDocumentPath() {
  return documentPath;
}

module.exports = {
  setDocumentPath,
  getDocumentPath,
};
