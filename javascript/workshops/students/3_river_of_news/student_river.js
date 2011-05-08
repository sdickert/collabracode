var riverCallback = {
  "onsuccess" : function(obj) {
    // TODO
    log("SUCCESS: Loaded rss.json file");
  },
  "onerror" : function(req) {
    log("ERROR: Unable to download rss.json file" + req);
  }
};
