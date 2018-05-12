
var storage = {};

function saveMeta(x){
  var downloadItem = x[0], info = storage[downloadItem.id];
  var result = `----
url: ${downloadItem.url}
pageTitle: ${info.title}
pageUrl: ${info.pageUrl}
startTime: ${downloadItem.startTime}
`
  var url = 'data:application/x-yaml;base64,' + btoa(result),
  filename = downloadItem.filename.split(/[\/\\]/).slice(-1)[0] + '.meta.yml'
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
