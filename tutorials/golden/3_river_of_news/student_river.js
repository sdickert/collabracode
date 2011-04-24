var riverCallback = {
  "onsuccess" : function(obj) {
    // TODO
    if(!obj) {
      return;
    }
    var title = document.getElementById("title");
    if(title && obj.rss && obj.rss.channel && obj.rss.channel.title) {
      title.innerHTML = obj.rss.channel.title;
    }
    if(obj.rss.channel.item) {
      var river = document.getElementById("river");
      var items = obj.rss.channel.item;
      for(var i=0, itemSize=items.length; i<itemSize; i++) {
        var item = items[i];
        var anchor = document.createElement("a");
        anchor.innerHTML = item.title;
        anchor.href = item.link;
        var atitle = document.createElement("div");
        atitle.className = "article-title";
        var adesc = document.createElement("div");
        adesc.className = "article-description hidden";
        adesc.id = "article-description-" + i;
        var description = item.description;
        description = description.replace(/&quot;/g, '"');
        adesc.innerHTML = description;
        var article = document.createElement("div");
        article.className = "article";
        article.appendChild(atitle);
        var expandContract = document.createElement("span");
        setInnerText(expandContract, "+/-");
        addEvent(expandContract, "click", toggleVisibilityWrapper(adesc.id));
        atitle.appendChild(expandContract);
        atitle.appendChild(anchor);
        article.appendChild(atitle);
        article.appendChild(adesc);
        river.appendChild(article);
      }
    }
    log("SUCCESS: Loaded rss.json file");
  },
  "onerror" : function(req) {
    log("ERROR: Unable to download rss.json file" + req);
  }
};

function toggleVisibility(id) {
  var elem = document.getElementById(id);
  if(!elem) {
    return;
  }
  var index = elem.className.indexOf("hidden");
  if(index != -1) {
    elem.className = elem.className.substring(0, index) + elem.className.substring(index + 7);
  }
}

function toggleVisibilityWrapper(id) {
  return function() {
    var elem = document.getElementById(id);
    if(!elem) {
      return;
    }
    var index = elem.className.indexOf("hidden");
    if(index != -1) {
      elem.className = elem.className.substring(0, index) + elem.className.substring(index + 7);
    } else {
      elem.className = elem.className + " hidden"; 
    }
  };
}
