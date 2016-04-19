$(function () {

  const os = require('os');
  const prettyBytes = require('pretty-bytes');

  $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
  $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem()) + '</span>');

  const shell = require('shell');

  const feedURL = 'https://www.portlandoregon.gov/parks/38307?calOutput=RSS';
  $('#rss-feeds').rss(feedURL,
    {
      limit: 6,
      tokens: {
        infoLink: '<a href="${entry.guid}">more info</a>',
        bar: (entry, tokens) => (entry.title),
      },
      layoutTemplate: '<ul>{entries}</ul>',
      entryTemplate:  '<li><h2>{title}</h2><p>{body}</p><a class="form__btn" href="{url}">more info</a></li>',
    });

  // feednami.load(feedURL, function (result) {
  //    if (result.error) {
  //      console.log(result.error);
  //    } else {
  //      var entries = result.feed.entries;
  //      console.log(entries);
  //      for (var i = 0; i < entries.length; i++) {
  //        var entry = entries[i];
  //
  //        // var taco = entry.getElementsByTagNameNS('xcal', 'location').text();
  //        // entry.find('xcal|location').text();
  //        console.log(entry.guid);
  //        console.log(entry.title);
  //      }
  //    }
  //  });

});
