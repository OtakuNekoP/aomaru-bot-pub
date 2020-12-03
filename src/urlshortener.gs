function urlShortener(longURL) {
  var payload = {
  destination: longURL,
  domain: { fullName: rebrandlyFullName }
  //, slashtag: "A_NEW_SLASHTAG"
  //, title: "Rebrandly YouTube channel"
}

var headers = {
  apikey: rebrandlyApiKey,
  workspace: rebrandlyWorkspaceId
}

var params = {
  headers: headers,
  contentType: "application/json",
  method: 'post',
  payload: JSON.stringify(payload),
  muteHttpExceptions: true
}

var response = UrlFetchApp.fetch("https://api.rebrandly.com/v1/links", params);

if (response.getResponseCode() == 200){
  var link = JSON.parse(response.getContentText())
  //console.log(`Long URL was ${payload.destination}, short URL is ${link.shortUrl}`);
  this.replyToChat(`Long URL was ${payload.destination}, short URL is ${link.shortUrl}`);
} else {
  this.replyToChat('ERROR: ' + response.getResponseCode() + ' [E20]\n\n verbose:\n' + response + '\n\n payload:\n' + payload);
}
}
