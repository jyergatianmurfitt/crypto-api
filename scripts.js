var request = new XMLHttpRequest();
request.open("GET", "https://api.lunarcrush.com/v2?data=assets&key=0s4pjodwlilrgsmems836v9&symbol=LINK,GRT,BCH,EOS,XLM,USDT,LTC,BTC,ETH,XRP", true);

request.onreadystatechange = function() {
var myData = JSON.parse(this.response)
    if (this.readyState == 4 && this.status == 200) {

          let unix_timestamp = myData.data[0].timeSeries[0].time;
          var date = new Date(unix_timestamp * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          document.getElementById('time').innerHTML = "As of " + formattedTime;

          var el;
          var prefix = 'crypto';
          var content;
          var contentPrefix = 'content';
          for(var i = 0; i <= 10; i++) {
            el = document.getElementById(prefix + i);
            content = document.getElementById(contentPrefix + i);
            el.innerHTML = "<div class='id'><div class='symbol'>" + myData.data[i].symbol + "</div><div class='name'>" + myData.data[i].name + "</div></div><div class='prices'><div class='mainPrice'>" + myData.data[i].price + "</div><div class='priceChange'>" + myData.data[i].percent_change_24h + "</div><h5 class='period1'> 24h</h5></div>";
            content.innerHTML = "<div class='expansionRow'><div class='open-close-avg'><div class='open'>" + myData.data[i].timeSeries[0].open + " Open</div><div class='close'>" + myData.data[i].timeSeries[0].close + " Close</div><div class='avg'>" + (myData.data[i].timeSeries[0].high + myData.data[i].timeSeries[0].low) / 2 + " Average</div></div><div class='historyChanges'><div class='history'><div class='change7'>" + myData.data[i].percent_change_7d + "<h5 class='period' id='priceChange'> 7d</h5></div><div class='change30' id='priceChange'>" + myData.data[i].percent_change_30d + "<h5 class='period'> 30d</h5></div></div></div></div>";

            if (myData.data[i].percent_change_24h >= 0) {
              el.getElementsByClassName('priceChange')[0].style.color = "green";
            } else if (myData.data[i].percent_change_24h < 0) {
              el.getElementsByClassName('priceChange')[0].style.color = "red";
            }

            if (myData.data[i].percent_change_7d >= 0) {
              content.getElementsByClassName('change7')[0].style.color = "green";
            } else if (myData.data[i].percent_change_7d < 0) {
              content.getElementsByClassName('change7')[0].style.color = "red";
            }

            if (myData.data[i].percent_change_30d >= 0) {
              content.getElementsByClassName('change30')[0].style.color = "green";
            } else if (myData.data[i].percent_change_30d < 0) {
              content.getElementsByClassName('change30')[0].style.color = "red";
            }

        }
} else {
      console.log('error')
  }
};




























request.send();
