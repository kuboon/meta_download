// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var storage = {};

function saveMeta(x){
  var downloadItem = x[0], info = storage[downloadItem.id];
  var result = `----\r
url: ${downloadItem.url}\r
pageTitle: ${info.title}\r
pageUrl: ${info.pageUrl}\r
startTime: ${downloadItem.startTime}\r
`
  var url = 'data:application/json;base64,' + btoa(result),
  filename = downloadItem.filename.split(/[\/\\]/).slice(-1)[0] + '.meta.txt'
  chrome.downloads.download({url: url, filename: filename, conflictAction: chrome.downloads.FilenameConflictAction.prompt, saveAs: false});
  delete storage[downloadItem.id];
}

chrome.downloads.onChanged.addListener(function(delta) {
  if(!delta.filename)return;
  if(!storage[delta.id]) { return; }

  chrome.downloads.search({id: delta.id}, saveMeta);
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.downloads.download({url: info.linkUrl}, function(id) {
    storage[id] = {
      title: tab.title,
      pageUrl: info.pageUrl
    };
  });
});

chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
  if(downloadItem.url.indexOf('arxiv.org/') == -1)return;
  suggest({filename: storage[downloadItem.id].title + '.pdf'});
});

chrome.contextMenus.create({
  id: 'metadownload',
  title: chrome.i18n.getMessage('openContextMenuTitle'),
  contexts: ['link'],
});
