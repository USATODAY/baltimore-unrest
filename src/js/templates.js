define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="page-container">\n    <div class="intro panel"></div>\n    <div class="navigation-controls">\n        <div class="navigation-controls-back-arrow navigation-controls-arrow hide">\n            <img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/left-arrow.png" alt="Back" />\n        </div>\n        <div class="navigation-controls-forward-arrow navigation-controls-arrow">\n            <img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/right-arrow.png" alt="Next" />\n        </div>\n    </div>\n</div>\n<!-- End page-container --> \n\n';

}
return __p
};

this["templates"]["intro.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div id="introvid" class="video-container">\n        <div class="videocover"></div>\n        <div class="videoembed" id="introplayer">\n        </div>\n</div>\n<div class="intro-content">\n             <div class="intro-title">\n              <h2 class="intro-copy">Baltimore Unrest</h2>\n          <div class="begin-button">Begin</div>\n          <!-- <div class="intro-credits">\n            <h3 class="credit-line">By: <a href="https://twitter.com/khjelmgaard" target="_blank">@khjelmgaard</a>, <a href="https://twitter.com/mitchthorson" target="_blank">@mitchthorson</a>, <a href="https://twitter.com/toryhargro" target="_blank">@toryhargro</a>, <a href="https://twitter.com/renalston" target="_blank">@renalston</a> and Robin A. Smith</h3>\n          </div> -->\n        </div>\n      </div>\n      \n    \n';

}
return __p
};

this["templates"]["panel.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '    <div class="panel upcoming">\n      <div class="caption-box">\n        <div class="box-controls">\n          \n            <h2 class="caption-head">' +
((__t = ( vid.head )) == null ? '' : __t) +
'</h2>\n  ';
 if(vid.audio) { ;
__p += '\n            <div class="controls" style="">\n            \n            <div class="audio-container" >\n              <div class="audio-play-pause-button"> <span class="commentary-label">Commentary</span>\n                <div class="audio-toggle">\n                  <div class="toggle-inner"> <span class="toggle-label">On</span>\n                    <div class="toggle-button"></div>\n                    <span class="toggle-label">Off</span> </div>\n                </div>\n              </div>\n              <div class="audio-player">\n                <div class="audio-inner not-playing">\n                  <div class="audio-credit-inner">Audio Credit</div>\n                  <div class="audio-box">\n                    <div class="audio-bar"> </div>\n                    <div class="audio-dot-container">\n                      <div class="audio-dot"></div>\n                    </div>\n                  </div>\n                  <div class="audio-time-text">0:00/0:00</div>\n                </div>\n              </div>\n            </div>\n        </div>\n        ';
 } ;
__p += '\n          <!-- End Controls --> \n          <p class="caption-body">' +
((__t = ( vid.body )) == null ? '' : __t) +
'</p>\n          <div class="panel-toggle"></div>\n          <div class="social">\n              <div class="social-button"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/options.svg" alt="share"></div>\n              <div class="social-upper-wrap">\n                <div class="social-inner-wrap">\n                  <a href="javascript: window.open(\'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.gannett-cdn.com%2Fexperiments%2Fusatoday%2F2014%2F12%2Fvs-backstage%2F&text=Angels!!!%20Check%20out%20this%20interactive%20backstage%20pass%20to%20the%202014%20Victoria\\\'s%20Secret%20Fashion%20Show&via=usatoday\', \'twitterwindow\', \'height=450, width=550, top=200, left=200, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0\');Analytics.click(\'Twitter share\');void(0);"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/twitter.svg" alt="Share on Twitter" class="social-icon" border="0"></a> \n                  <a href="javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open(\'https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=http%3A%2F%2Fwww.gannett-cdn.com%2Fexperiments%2Fusatoday%2F2014%2F12%2Fvs-backstage&picture=http://www.gannett-cdn.com/experiments/usatoday/2014/12/vs-backstage/img/fb-post.jpg&name=Angels!!!&description=Check%20out%20this%20interactive%20backstage%20pass%20to%20the%202014%20Victoria\\\'s%20Secret%20Fashion%20Show&redirect_uri=http://usatoday30.usatoday.com/_common/_dialogs/fb-share-done.html\',\'sharer\',\'toolbar=0,status=0,width=580,height=400,top=\'+sTop+\',left=\'+sLeft);Analytics.click(\'Facebook share\');void(0);"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/facebook.svg" alt="Share on Facebook" class="social-icon" border="0"></a> \n                  <a href="mailto:?body=Check%20out%20this%20interactive%20backstage%20pass%20to%20the%202014%20Victoria%27s%20Secret%20Fashion%20Show %0d%0d http%3A%2F%2Fwww.gannett-cdn.com%2Fexperiments%2Fusatoday%2F2014%2F12%2Fvs-backstage%2F&subject=Angels!!!" onclick="var sharer = window.open(\'http://usatoday30.usatoday.com/_common/_dialogs/fb-share-done.html\',\'sharer\',\'toolbar=0,status=0,width=580,height=400,top=200,left=200\');setTimeout(function() {sharer.close();}, 500);void(0);" target="sharer"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/email.svg" alt="Share on Email" class="social-icon" border="0"></a> \n                </div>\n              </div>\n          </div>\n        </div>\n      </div>\n      <div class="video-container">\n        <div class="videocover"></div>\n        <div class="videoembed" id="main-player-' +
((__t = (num)) == null ? '' : __t) +
'">\n      </div>\n        \n  </div>\n  ';
 if(vid.audio) {console.log(vid.audio_file); ;
__p += '\n     <audio>\n         <source src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/media/' +
((__t = ( vid.audio_file )) == null ? '' : __t) +
'.mp3" type="audio/mpeg">\n         <source src="http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/media/' +
((__t = ( vid.audio_file )) == null ? '' : __t) +
'.ogg" type="audio/ogg">\n    </audio>\n\n    ';
 } ;
__p += '\n\n\n    </div>\n    <!--End Panel-->\n';

}
return __p
};

this["templates"]["template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>' +
((__t = (test)) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

  return this["templates"];

});