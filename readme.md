# Meta Download

chrome拡張 https://chrome.google.com/webstore/detail/mjigpipnclfbkghholgkmbnpegadllll

論文PDF等をダウンロードした時に、「どこからダウンロードしたか」という情報はPDFそのものには記録されていないため、あとで困るということがよくある。

そこで、ダウンロード時にそういったメタデータを自動的に記録するツールを作った。

インストールすると、ファイルリンクの右クリックに「Meta Download」というアイテムが追加される。ここからダウンロードすると、ファイル名 + ".meta.txt" というファイルが自動的に生成され、そこに URL 等が記録される。

```code:hoge.pdf.meta.yml
 ----
 url: https://example.com/pdf/hoge.pdf
 pageTitle: hogehoge no pdf
 pageUrl: https://example.com/doc/index.html
 startTime: 2018-05-10T08:45:41.278Z
```


フォーマットは yml 形式なので、一覧を作りたい等の際には簡単なスクリプトを書いてうまいことやってください。

 ご要望は https://twitter.com/kuboon へどうぞ



- リダイレクトが挟まってたりするとうまく動かないかも

