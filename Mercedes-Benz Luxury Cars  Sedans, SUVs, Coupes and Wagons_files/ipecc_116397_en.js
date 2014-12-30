
iperceptions = window.iperceptions || {};

//BEGIN Configuration variables
iperceptions.imgRootPath = "/mercedes/iperceptions/116397/en/images/";
iperceptions.imgSizeOut = [68, 68];
iperceptions.imgSizeOver = [180, 68];
iperceptions.blockMobile = true;
iperceptions.surveyID = 116397;
iperceptions.langID = 1;
iperceptions.posX = 'right';
iperceptions.posY = 'bottom';
iperceptions.winWidth = 480;
iperceptions.winHeight = 580;

//Reserved for advanced use.  Do not modify these.
iperceptions.iconBrandID = null;
iperceptions.logoBrandID = null;
iperceptions.siteID = null;
iperceptions.imgOut = iperceptions.imgRootPath + "br" + (iperceptions.iconBrandID ? "_" + iperceptions.iconBrandID : "") + ".png";
iperceptions.imgOver = iperceptions.imgRootPath + "br_over" + (iperceptions.iconBrandID ? "_" + iperceptions.iconBrandID : "") + ".png";
//END Configuration variables.


iperceptions.isMobile = (function(a){return (/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|googlebot|google web preview|msbot|yahoo|bingbot|silk|mobile|rim tablet|hp-tablet|touch;|touch\)|wpdesktop/i.test(a))})(navigator.userAgent || navigator.vendor || window.opera);

//API function to add floating icon
iperceptions.ipeIcon = function(config) {
    config = config || {};
    if(iperceptions.launchedIcon) {
        return;
    }
    iperceptions.launchedIcon = true;

    var _pos_x = config.pos_x || iperceptions.posX, //left|middle|right
        _pos_y = config.pos_y || iperceptions.posY, //'top'|middle|bottom 
        _img_out = config.img_out || iperceptions.imgOut,
        _img_over = config.img_over || iperceptions.imgOver, 
        _size_out = iperceptions.imgSizeOut || [68, 68],
        _size_over = iperceptions.imgSizeOver || [180, 68],
        _size_current = _size_out,
        _id = Math.ceil(Math.random() * 10000),
        _img_id = 'UIF-IMG-' + _id,
		_page = '<img id="' + _img_id + '" ' +
        ' src="' + _img_out + '"' +
        'style="display:none;position:fixed;cursor:pointer;margin:0px!important;padding:0px!important;border:0px!important;' +
        'z-index: 2147483647!important;' +
		(_pos_x == 'right' ? 'text-align:right!important;' : 'text-align:left!important;') +
		(_pos_y == 'bottom' ? 'vertical-align:bottom!important;' : 'vertical-align:top!important;') +
        'background-color:transparent!important;"/>', 
		_img, _is_ie, _icon_timer,
      
        //Generic method to attach an event to a DOM element
        domAddEvent = function (target, eventName, handlerFn) {
            if (target.addEventListener)
                target.addEventListener(eventName, handlerFn, true);
            else if (target.attachEvent)
                target.attachEvent("on" + eventName, handlerFn);
            else
                target["on" + eventName] = handlerFn;
        },

        ipeSetPos = function(pos_x, pos_y) {
            var divW = _size_current[0],
                divH = _size_current[1],
                viewsize = iperceptions.viewSize(),
                bodyWidth, bodyHeight, winW, winH;

            //Our default viewsize calculation sometimes to include the scrollbar.  document.documentElement.client[Width|Height] do not include scrollbar.
            bodyWidth = document.documentElement.clientWidth;
            if (bodyWidth > 0 && bodyWidth < viewsize[0]) {
                viewsize[0] = bodyWidth;
            }

            bodyHeight = document.documentElement.clientHeight;
            if (bodyHeight > 0 && bodyHeight < viewsize[1]) {
                viewsize[1] = bodyHeight;
            }

            winW = parseInt((viewsize[0] - divW));
            winH = parseInt((viewsize[1] - divH));
               
            if (pos_x == 'left') { _img.style.left = '0px'; }
            else if (pos_x == 'right') { _img.style.right = '0px'; }
            else if(winW >= 0) { _img.style.left = (winW / 2 >> 0) + 'px'; }
            if (pos_y == 'top') { _img.style.top = '0px'; }
            else if (pos_y == 'bottom') { _img.style.bottom = "0px"; }
            else if(winH >= 0) { _img.style.top = (winH / 2 >> 0) + 'px'; }
        },

        isIE = function() {
            var ua = navigator.userAgent.toLowerCase(),
            isOpera = (ua.indexOf('opera') != -1);
            return ua.indexOf('msie') != -1 && !isOpera && (ua.indexOf('webtv') == -1);
        },

        IEMajorVersion = function() {
            var m = /MSIE\s*(\d*)/.exec(navigator.userAgent),
                v = (m && m[1]) || -1;
            if(isNaN(parseInt(v, 10))) {
                v = -1;
            }
            return v;
        },

		ipeIconComplete = function() {
            _img = document.getElementById(_img_id);
            _img.style.display = "block";
            ipeSetPos(_pos_x, _pos_y);

            domAddEvent(window, 'resize', function () { ipeSetPos(_pos_x, _pos_y); });
            domAddEvent(window, 'scroll', function () { ipeSetPos(_pos_x, _pos_y); }); 
            domAddEvent(_img, "mouseout", function () {
                    _img.src = _img_out;
                    _size_current = _size_out;
                });
            domAddEvent(_img, "mouseover", function () {
                    _img.src = _img_over;
                    _size_current = _size_over;
            });
            domAddEvent(_img, "click", function (e) {
                iperceptions.ipeCC(config);
            });
        };

    _is_ie = isIE();

    //Now blocking IE6 and mobile devices
    if(_is_ie && IEMajorVersion() < 7) {
        return;
    }
    if(iperceptions.blockMobile && iperceptions.isMobile) {
        return;
    }

    _icon_timer = setInterval(function() {
        if(document.readyState === "complete") {
            if (_is_ie && IEMajorVersion() < 10) {
                document.body.insertAdjacentHTML("beforeEnd", _page);
            } else {
                _dL = document.createElement("div");
                _dL.innerHTML = _page;
                document.body.appendChild(_dL);
            }
            clearInterval(_icon_timer);
            ipeIconComplete();
        }  
    }, 250);
}


//API function to launch comment card
iperceptions.ipeCC = function(config) {
    var config = config || {};
    config.surveyID = config.surveyID || iperceptions.surveyID;

    iperceptions.launch(config);
}

iperceptions.viewSize = function() {
    var width = 0, height = 0;
    if (typeof (window.innerWidth) == 'number') {
        width = window.innerWidth;
        height = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    return [width, height];
}

iperceptions.launch = function(config) {
    config.langID = config.langID || iperceptions.langID;

    var RC = function(n){var nEQ= n+'='; var ca= document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c= ca[i];while (c.charAt(0)==' ') c= c.substring(1,c.length);if (c.indexOf(nEQ) == 0) return c.substring(nEQ.length,c.length);} };

    var name = "IPerceptions_comment_" + config.surveyID;
    var w = 0, h = 0, url = "", l = 0, t = 0, vs = iperceptions.viewSize(), 
        sdfc = "5dc17a45" + "-" + config.surveyID + "-" + "fc59468e-50f1-46f5-9d4f-8e4a3d12192e";
    w = iperceptions.winWidth || 480;
    h = iperceptions.winHeight || 580;
    l = Math.max((vs[0] - w) / 2, 0);
    t = Math.max((vs[1] - h) / 2, 0);
    url = window.location.protocol + "//ips-invite.iperceptions.com/WebValidator.aspx?lID=" + config.langID + "&sdfc=" + sdfc + "&source=91787&destination=commentcard&referrer=" + encodeURIComponent(window.location.href) + (iperceptions.logoBrandID ? "&brandID=" + iperceptions.logoBrandID : "" ) + (iperceptions.siteID ? "&siteID=" + iperceptions.siteID : "" );
 
    var features = "width=" + w + ",height=" + h + ", left=" + l + ", top=" + t + ", resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no";

    window.open(url, name, features);
}

iperceptions.ipeIcon();