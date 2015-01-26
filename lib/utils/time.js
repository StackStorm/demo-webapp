exports.getUnixTimestamp = function() {
  var ts = Math.floor(Date.now() / 1000);
  return ts;
}
