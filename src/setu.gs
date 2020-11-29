function setu(setukeyword) {
  var keyword = setukeyword || null;

  var url = 'https://api.lolicon.app/setu/?apikey=' + setuApiKey + '&r18=' + r18;

  if (keyword) url += '&keyword=' + keyword;

  var setudata = JSON.parse(UrlFetchApp.fetch(url).getContentText());

  if (setudata && setudata.data.length>0) {
    this.replyToChat('Title: ' + setudata.data[0].title + '\n'
      + 'Author: ' + setudata.data[0].author + '\n' 
      + 'URL: ' + setudata.data[0].url + '\n' 
      + 'Tags: ' + setudata.data[0].tags + '\n' 
      + '今日剩余社保次数: ' + setudata.quota);
  } else {
    var pixivtagurl = 'https://www.pixiv.net/tags/';
    this.replyToChat('嗨呀! 你的性癖可太怪了! 自己上p站去看看吧\n' + pixivtagurl + setukeyword);
  }
}
