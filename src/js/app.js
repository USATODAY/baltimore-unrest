define([
    'jquery',
    'underscore',
    'templates',
    'api/analytics',
    'config',
    'jquery_ui'
], function(jQuery, _, templates, Analytics, config) {

    var videoInfo, copy;

    var share_text = "Share me";

    var objImmerse = objImmerse || {};
    objImmerse.arrYTVideos = [];

    objImmerse.init = function() {
        var hostname = window.location.hostname;
        var dataURL;

        if ((hostname == "localhost" || hostname == "10.0.2.2")) {
            dataURL = 'data/data.json';
        } else {
            dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/04/record-day/data/data.json";
        }

        jQuery.getJSON(dataURL, function(data) {
            videoInfo = data.videos;
            copy = data.copy;
        
            objImmerse.arrHTMLTag = jQuery("html");
            objImmerse.arrPanelWindow = jQuery(".panel-window");
            
            window.onYouTubeIframeAPIReady = function() {
              // add youtube videos here
              objImmerse.addYTVideo(videoInfo[0].yt_id, "introplayer", true, true);
              for (i = 1; i < videoInfo.length; i++) {
                var id = "main-player-" + i;
                objImmerse.addYTVideo(videoInfo[i].yt_id, id);  
              }
            };
            objImmerse.renderPage();
            // Youtube api setup
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    

            var blnIframeEmbed = window != window.parent;
            if (blnIframeEmbed) {
                jQuery("#header").css({"display" : "none"});
                jQuery("body").addClass("iFrame");
            } 

            objImmerse.arrPageContainer = jQuery(".page-container");
            objImmerse.arrVideos = jQuery(".video-container");
            objImmerse.arrAudios = jQuery("audio");
            objImmerse.arrPanels = jQuery(".panel");
            objImmerse.arrPlayButtons = jQuery(".play-pause-button");
            objImmerse.arrAudioPlayButtons = jQuery(".audio-play-pause-button");
            objImmerse.arrAudioInner = jQuery(".audio-inner");
            objImmerse.arrAudioToggle = jQuery(".audio-toggle");
            objImmerse.arrVolumeDots = jQuery(".volume-dot");
            objImmerse.arrAudioDots = jQuery(".audio-dot");
            objImmerse.arrDotContainers = jQuery(".dot-container");
            objImmerse.arrAudioDotContainers = jQuery(".audio-dot-container");
            objImmerse.arrAudioTimeText = jQuery(".audio-time-text");
            objImmerse.arrNextButton = jQuery(".navigation-controls-forward-arrow");
            objImmerse.arrPrevButton = jQuery(".navigation-controls-back-arrow");
            objImmerse.arrCaptionBox = jQuery(".caption-box");
            objImmerse.arrPanelToggle = jQuery(".panel-toggle");
            objImmerse.arrBeginButton = jQuery(".begin-button");
            objImmerse.arrBtsCloseButtons = jQuery(".bts-back-button");
            objImmerse.arrSocialButtons = jQuery(".social-button");
            objImmerse.arrSocialPopups = jQuery(".social-popup");
            objImmerse.arrThumbnailCloseButtons = jQuery(".thumbnail-close-button ");
            objImmerse.totalPanels = videoInfo.length;


            
            // objImmerse.positionPanels();
            objImmerse.reformatPage();
            objImmerse.addEventListeners();
        });
        
     };
     
    objImmerse.currentPanel = 0;
    objImmerse.numMinVolume = 0;
    objImmerse.intPlayId = 0;
    objImmerse.blnAudioDrag = false;
    objImmerse.numWindowWidth = window.innerWidth;

    objImmerse.renderPage = function() {
        objImmerse.arrPanelWindow.html(templates['app.html']());
        objImmerse.arrPanelWindow.find('.intro').html(templates['intro.html']());
        var $pageContainer = objImmerse.arrPanelWindow.find('.page-container');
        for (i = 1; i < videoInfo.length; i++) {
            console.log(videoInfo[i]);
            $pageContainer.append(templates['panel.html']({vid: videoInfo[i], num: i, share: objImmerse.createShare(share_text)}));
        }
    };

    objImmerse.addYTVideo = function(vidID, targetID, autoplay, mute) {
        var player;
      

        var contWidth = $(window).width();

        player = new YT.Player(targetID, {
          height: "100%",
          width: "100%",
          videoId: vidID,
          playerVars: {
            "autohide": 2,
            "controls": 0,
            "html5": 1,
            "loop": 1,
            "modestbranding": 1,
            // "origin": "http%3A%2F%2Fwww.usatoday.com",
            // "playlist": vidID,
            "showinfo": 0,
            "rel": 0,
            "theme": "dark",
            "enablejsapi": 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': stateChange
          }
        });

      function stateChange(event) {
        if (event.data === 0) {
            event.target.playVideo();
        }
        
      }
      function onPlayerReady(event) {
        if (autoplay) {
             event.target.playVideo();
             console.log(event.target.getPlayerState());
        }
        if (!$(".preloader").hasClass("hide")) {
            $(".preloader").addClass("hide");
        } 
             //change this later 
         if (mute) {
           event.target.mute();
        } 
      }

      objImmerse.arrYTVideos.push(player);
    };

    objImmerse.reformatPage = function() {
        objImmerse.numWindowWidth = window.innerWidth;
        if (window.innerWidth / window.innerHeight < 1920 / 1080) {
            var numWidth = 100 * ((1920 / 1080) / (window.innerWidth / window.innerHeight));

            objImmerse.arrVideos.css({"top": "0%", "left" : ((100 - numWidth) / 2).toString() + "%", "width": numWidth.toString() + "%", "height": "100%"});

        } else {
            var numHeight = 100 * ((1080/ 1920) / (window.innerHeight/window.innerWidth));
            objImmerse.arrVideos.css({"left" : "0%"});
            objImmerse.arrVideos.css({"top" : ((100 - numHeight) / 2).toString() + "%", "height": numHeight.toString() + "%", "width": "100%"});
        }
    };

    objImmerse.positionPanels = function() {
        jQuery.each(objImmerse.arrPanels, function(index) {
            objImmerse.arrPanels.eq(index).css({"left" : (index * 100).toString() + "%"});
        });
    };

    objImmerse.addEventListeners = function() {

        // $(window).on("resize", function(e){
        // 	objImmerse.resizeVideos();
        // });
      objImmerse.arrBtsCloseButtons.click(function(e) {
        var index = objImmerse.arrBtsCloseButtons.index($(this)) + 1;
        console.log(index);
        objImmerse.toggleBts(index);
      });

        objImmerse.arrSocialPopups.click(objImmerse.socialClick);

        window.addEventListener("orientationchange", function() {
                objImmerse.reformatPage();
            }, false);
          
            onresize=onload=function(){
                objImmerse.reformatPage();
            };

        objImmerse.arrPlayButtons.click(function(e) {
            var _this = jQuery(this);
            var intIndex = objImmerse.arrPlayButtons.index(this);
            objImmerse.playPause(intIndex);
        });
        objImmerse.arrAudioPlayButtons.click(function(e) {
            var _this = jQuery(this);
            var intIndex = objImmerse.arrAudioPlayButtons.index(this);
            console.log(intIndex);
            objImmerse.audioPlayPause(intIndex);
            Analytics.trackEvent("audioPlayed" + objImmerse.currentPanel.toString());
        });
        objImmerse.arrVolumeDots.draggable({ containment: "parent", stop: function( event, ui ) {
            objImmerse.adjustVolume(objImmerse.currentPanel);
                //Analytics.trackEvent("importanceScaleChanged" + objQuiz.currentQuestion.toString());
            }
        });
        objImmerse.arrAudioDots.draggable({ containment: "parent", start: function ( event, ui) {
            objImmerse.blnAudioDrag = true;
        }, stop: function( event, ui ) {
                objImmerse.adjustProgress(objImmerse.currentPanel - 1, true);
                Analytics.trackEvent("audioDotDragged" + objImmerse.currentPanel.toString());
            }
        });
        objImmerse.arrNextButton.click(function(e) {
            var intNextPanel = objImmerse.currentPanel + 1;
            
            objImmerse.slidePanel(intNextPanel);
            Analytics.trackEvent("NextButton" + objImmerse.currentPanel.toString());
        });
        objImmerse.arrPrevButton.click(function(e) {
            var intPrevPanel = objImmerse.currentPanel - 1;
            objImmerse.slidePanel(intPrevPanel);
            Analytics.trackEvent("PrevButton" + objImmerse.currentPanel.toString());
        });

        objImmerse.arrBeginButton.click(function(e) {

            objImmerse.slidePanel(1);

           
        });

        $(window).on("keydown", function(e) {

            if (e.keyCode==37) {  //left arrow
                if (objImmerse.currentPanel > 0) { //checking to make sure it isn't the first panel
                    var intPrevPanel = objImmerse.currentPanel - 1;
                    if (intPrevPanel <= 0) {
                        objImmerse.arrPrevButton.addClass("hide");
                    }
                    objImmerse.arrNextButton.removeClass("hide");
                    objImmerse.slidePanel(intPrevPanel); 
                }
                Analytics.trackEvent("LeftArrow" + objImmerse.currentPanel.toString());
            }

            if (e.keyCode==39) {  //right arrow
                if (objImmerse.currentPanel < objImmerse.arrPanels.length - 1) { //checking to make sure it isn't the last panel
                    var intNextPanel = objImmerse.currentPanel + 1;
                    if (intNextPanel >= objImmerse.arrPanels.length - 1) {
                        objImmerse.arrNextButton.addClass("hide");
                    }
                    objImmerse.arrPrevButton.removeClass("hide");
                    objImmerse.slidePanel(intNextPanel); 
                }
                Analytics.trackEvent("rightArrow" + objImmerse.currentPanel.toString());
            }
        });

        objImmerse.arrPanelToggle.click(function(e){
            objImmerse.toggleCaption();
        });
      
       $(".thumbnail").click(function(e) {
            // var thumb = $(e.target);
            var id = $(this).data().vidId;
            objImmerse.toggleBts(id);
       });

       objImmerse.arrThumbnailCloseButtons.on("click", function(e) {
            objImmerse.toggleCaption();
       });

        // $(window).resize(function() {
        // 	var currentCaptionBox = objImmerse.arrCaptionBox.eq(objImmerse.currentPanel - 1);
        // 	var currentBoxHeight = currentCaptionBox.outerHeight();
        // 	var currentPanelToggle = objImmerse.arrPanelToggle.eq(objImmerse.currentPanel - 1);

        // 	if (currentCaptionBox.hasClass("closed")) {
        // 		currentCaptionBox.css({"bottom": - (currentBoxHeight - 30)}); 
        // 	}
        // });
        
        if (config.isMobile || config.isTablet) {
            objImmerse.arrPageContainer.on("swipe", function(event){
                event.preventDefault();
            });
            
            objImmerse.arrPageContainer.on("swipeleft", function(event){
                event.preventDefault();
                var intNextPanel = objImmerse.currentPanel + 1;
                if (intNextPanel >= objImmerse.arrPanels.length - 1) {
                    objImmerse.arrNextButton.addClass("hide");
                } 
                if (intNextPanel <= objImmerse.arrPanels.length - 1) {
                    objImmerse.arrPrevButton.removeClass("hide");
                    objImmerse.slidePanel(intNextPanel);
                }
                Analytics.trackEvent("swipeLeft" + objImmerse.currentPanel.toString());
            });
        
            objImmerse.arrPageContainer.on("swiperight", function(event){
                event.preventDefault();
                var intPrevPanel = objImmerse.currentPanel - 1;
                if (intPrevPanel <= 0) {
                    objImmerse.arrPrevButton.addClass("hide");
                } 
                if (intPrevPanel >= 0) {
                    objImmerse.arrNextButton.removeClass("hide");
                    objImmerse.slidePanel(intPrevPanel);
                }
                Analytics.trackEvent("swipeRight" + objImmerse.currentPanel.toString());
            });
        }
        jQuery.each(objImmerse.arrAudios, function (index) {
            objImmerse.arrAudios[index].addEventListener("ended", function () {
                objImmerse.arrVideos[objImmerse.currentPanel].volume = 0.75;
                objImmerse.arrAudioInner.eq(index).toggleClass('not-playing');
                objImmerse.arrAudioToggle.eq(index).toggleClass('playing');
                Analytics.trackEvent("audioComplete" + objImmerse.currentPanel.toString());
            });
        });

    };

    objImmerse.playPause = function(intVideo) {
        if (objImmerse.arrVideos[intVideo].paused) {
            objImmerse.arrVideos[intVideo].play();
            objImmerse.arrPlayButtons.eq(intVideo).html("Pause");
        } else {
            objImmerse.arrVideos[intVideo].pause();
            objImmerse.arrPlayButtons.eq(intVideo).html("Play");
        } 
    };

    objImmerse.audioPlayPause = function(intAudio) {
        console.log(intAudio);
        console.log(objImmerse.arrAudios);
      if (objImmerse.arrAudios[intAudio].paused) {
            objImmerse.arrAudios[intAudio].play();
            objImmerse.arrAudios[intAudio].volume = 1;
            // objImmerse.arrVideos[intAudio + 1].volume = 0.05;
            objImmerse.intPlayId = setInterval(function() {
                objImmerse.adjustProgress(intAudio, false);
            }, 950);
        } else {
            objImmerse.arrAudios[intAudio].pause();
        //	objImmerse.arrVideos[intAudio + 1].volume = 0.75;
            clearInterval(objImmerse.intPlayId);
        }
        objImmerse.arrAudioInner.eq(intAudio).toggleClass('not-playing');
        objImmerse.arrAudioToggle.eq(intAudio).toggleClass('playing');
    };

    objImmerse.adjustVolume = function(intVideo) {
        var strLeft, intLeft, intPercent, numVolume;
        strLeft = objImmerse.arrVolumeDots.eq(intVideo).css("left");
        strLeft = strLeft.substr(0, strLeft.indexOf("px"));
        intLeft = parseInt(strLeft);
        intPercent = Math.round((intLeft/(objImmerse.arrDotContainers.eq(intVideo).width() - objImmerse.arrVolumeDots.eq(intVideo).width())) * 100);
        if (intPercent > 100) {
            intPercent = 100;
        }
        numVolume = intPercent / 100;
        if (numVolume < objImmerse.numMinVolume) {
            numVolume = objImmerse.numMinVolume;
        }
        objImmerse.arrVideos[intVideo].volume = numVolume;
    };

    objImmerse.adjustProgress = function(intAudio, blnSeek) {
        console.log(objImmerse.arrAudios[intAudio]);
        var strLeft, intLeft, intPercent, numProgress, numDuration, strCurrentTime, strTotalTime;
        numDuration = Math.round(objImmerse.arrAudios[intAudio].duration);
        if (blnSeek) {
            strLeft = objImmerse.arrAudioDots.eq(intAudio).css("left");
            strLeft = strLeft.substr(0, strLeft.indexOf("px"));
            intLeft = parseInt(strLeft);
            intPercent = Math.round((intLeft/(objImmerse.arrAudioDotContainers.eq(intAudio).width() - objImmerse.arrAudioDots.eq(intAudio).width())) * 100);
            if (intPercent > 100) {
                intPercent = 100;
            }
            numProgress = intPercent / 100;
            if (numProgress < 0) {
                numProgress = 0;
            }
            objImmerse.arrAudios[intAudio].currentTime = numProgress * numDuration;
            objImmerse.blnAudioDrag = false;
        } else if (!objImmerse.blnAudioDrag) {
            intPercent = Math.round((objImmerse.arrAudios[intAudio].currentTime / numDuration) * 100);
            numProgress = intPercent / 100;
            objImmerse.arrAudioDots.eq(intAudio).css({"left" : (numProgress * (objImmerse.arrAudioDotContainers.eq(intAudio).width() - objImmerse.arrAudioDots.eq(intAudio).width())).toString() + "px"});
        }
        strCurrentTime = objImmerse.renderTime(Math.round(objImmerse.arrAudios[intAudio].currentTime));
        strTotalTime = objImmerse.renderTime(numDuration);
        objImmerse.arrAudioTimeText.eq(intAudio).html(strCurrentTime + "/" + strTotalTime);
    };

    objImmerse.renderTime = function (numTotalSeconds) {
        var strTime, numHour, numMinute, numSecond;
        if (numTotalSeconds >= 3600) {
                numHour = Math.floor(numTotalSeconds / 3600);
                numMinute = Math.floor((numTotalSeconds % 3600) / 60);
                numSecond = (numTotalSeconds % 3600) % 60;
                strTime = numHour.toString() + ":";
                if (numMinute < 10) {
                    strTime += "0" + numMinute.toString() + ":";
                } else {
                    strTime += numMinute.toString() + ":";
                }
                if (numSecond < 10) {
                    strTime += "0" + numSecond.toString();
                } else {
                    strTime += numSecond.toString();
                }
        } else if (numTotalSeconds >= 60) {
                numMinute = Math.floor(numTotalSeconds / 60);
                numSecond = numTotalSeconds % 60;
                strTime = numMinute.toString() + ":";		
                if (numSecond < 10) {
                    strTime += "0" + numSecond.toString();
                } else {
                    strTime += numSecond.toString();
                }
        } else {
                strTime = "0:";
                numSecond = numTotalSeconds;
                if (numSecond < 10) {
                    strTime += "0" + numSecond.toString();
                } else {
                    strTime += numSecond.toString();
                }		
        }
        return (strTime);
    };

    objImmerse.slidePanel = function(intNewPanel) {

        objImmerse.arrYTVideos[objImmerse.currentPanel].pauseVideo();
        objImmerse.arrYTVideos[intNewPanel].playVideo();
        if (intNewPanel > objImmerse.currentPanel) {
            objImmerse.arrPanels.eq(objImmerse.currentPanel).addClass("done");
            objImmerse.arrPrevButton.removeClass("hide");
        } else {
            objImmerse.arrPanels.eq(objImmerse.currentPanel).addClass("upcoming");
            objImmerse.arrNextButton.removeClass("hide");
        }
        if (intNewPanel >= objImmerse.arrPanels.length - 1) {
            objImmerse.arrNextButton.addClass("hide");
        }

        if (intNewPanel <= 0) {
            objImmerse.arrPrevButton.addClass("hide");
        }

        objImmerse.arrPanels.eq(intNewPanel).removeClass("upcoming").removeClass("done");
        objImmerse.currentPanel = intNewPanel;
       
        // $(".intro").addClass("hide");
        // $(".intro").addClass("hide");
        // $("#introvid").addClass("hide");	


        // objImmerse.arrVideos[objImmerse.currentPanel].pause();
        // objImmerse.arrVideos[intNewPanel].play();
        // if ((objImmerse.currentPanel !== 0) && (objImmerse.currentPanel < objImmerse.totalPanels - 1)) {
        //     if (!objImmerse.arrAudios[objImmerse.currentPanel - 1].paused) {
        //         objImmerse.audioPlayPause(objImmerse.currentPanel - 1);
        //     }
        // }
        // objImmerse.arrPageContainer.stop().animate({"left" : (-1 * intNewPanel * 100).toString() + "%"}, 500);
        // objImmerse.currentPanel = intNewPanel;
    };

    objImmerse.toggleCaption = function(e) {
            var currentCaptionBox = objImmerse.arrCaptionBox.eq(objImmerse.currentPanel - 1);
            var currentBoxHeight = currentCaptionBox.outerHeight();
            var currentPanelToggle = objImmerse.arrPanelToggle.eq(objImmerse.currentPanel - 1);

            if ( !currentCaptionBox.hasClass("closed")) {
    //			currentCaptionBox.animate({"bottom": - (currentBoxHeight - 30)}, 200); 
                currentCaptionBox.toggleClass("closed");
                setTimeout(function() {
                     // currentPanelToggle.html("Close");
                }, 200);
                Analytics.trackEvent("openPanel" + objImmerse.currentPanel.toString());
            }

            else  {
        //		currentCaptionBox.animate({"bottom": "0px"}, 200);
                currentCaptionBox.toggleClass("closed");
                setTimeout(function() {
                     // currentPanelToggle.html("Backstage");
                }, 200);
                Analytics.trackEvent("closePanel" + objImmerse.currentPanel.toString());
            }

    };

    objImmerse.toggleBts = function(index) {
        var bts = $(".bts-video-wrap").eq(index - 1);
        if (bts.hasClass("inactive")) {
            //show, play
            bts.removeClass("inactive");
            objImmerse.arrYTVideos[1].pauseVideo();
            objImmerse.arrYTVideos[index + 1].playVideo();
        } else {
          // hide, pause
          bts.addClass("inactive");
          objImmerse.arrYTVideos[1].playVideo();
          objImmerse.arrYTVideos[index + 1].pauseVideo();
        }
    };

    window.playVid = function(i) {
        console.log("play");
        objImmerse.arrYTVideos[i].playVideo();
    };

    // objImmerse.resizeVideos = function() {
        
    // 	console.log(objImmerse.arrVideos);
    // 	var contWidth = $(window).width();
    // 	var contHeight = $(window).height();
    // 	var width, height;

    //     if (contHeight > (contWidth * 9/16)) {
    //     	height = contHeight;
    //     	width = height * (16/9);
    //     }
    //     else {
    //     	height = contHeight;
    //     	width = height * (16/9);
    //     	// width = contWidth;
    //     	// height = width * (9/16);
    //     }

    //     objImmerse.arrVideos.height(height);
    //     objImmerse.arrVideos.width(width);
        
    // };
    objImmerse.createShare = function(shareString) {
        var shareURL = window.location.href;
        var fbShareURL = encodeURI(shareURL.replace('#', '%23'));
        var twitterShareURL = encodeURIComponent(shareURL);
        var emailLink = "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + twitterShareURL + "&subject=";
        
        return {
            'fb_id': config.facebook.app_id,
            fbShare:  encodeURI(shareURL.replace('#', '%23')),
            stillimage: "http://www.gannett-cdn.com/experiments/usatoday/2015/04/baltimore-unrest/img/fb-post.jpg",
            encodedShare: encodeURIComponent(shareString),
            fb_redirect: 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
            email_link: "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + encodeURIComponent(shareURL) + "&subject=",
            twitterShare: encodeURIComponent(shareURL)
        };

    };

    objImmerse.socialClick = function(e) {
        e.preventDefault();
        Analytics.trackEvent('Share button clicked: ' + jQuery(e.currentTarget).attr('id'));

        objImmerse.windowPopup(e.currentTarget.href, 500, 300);
    };

    objImmerse.windowPopup = function(url, width, height) {
        // Calculate the position of the popup so
        // it’s centered on the screen.
        var left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

        window.open(
            url,
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
        );
    };

    return objImmerse;

});

