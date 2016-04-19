$(function () {

  const os = require('os');
  const prettyBytes = require('pretty-bytes');

  $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
  $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem()) + '</span>');

  const shell = require('shell');

  const xcal = 'urn:ietf:params:xml:ns:xcal';

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

  const prefix = 'xcal:';

  feednami.load(feedURL, function (result) {
     if (result.error) {
       console.log(result.error);
     } else {
       var entries = result.feed.entries;
       for (var i = 0; i < entries.length; i++) {
         var entry = entries[i];
         var $ent = $(entry);
         var $location = $ent.toArray();
         var $newLoc = $location;
         for (var loc of $location) {
           var taco = _.propertyOf(loc)('xcal\:location');
           var addy = _.values(taco);;
           console.log(addy[1]);
         }

         // var taco = entry.getElementsByTagNameNS('xcal', 'location').text();
         // entry.find('xcal|location').text();
         //console.log($newLoc);
         console.log(entry.title);
       }
     }
   });

});
