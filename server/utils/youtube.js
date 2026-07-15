function extractVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regex);

  return match ? match[1] : null;
}

module.exports = {
  extractVideoId,
};
