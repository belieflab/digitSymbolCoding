/* Copyright 2020 by the Many Brains Project, Inc. and McLean Hospital
 This code is made available under a Creative Commons Attribution-Share Alike
 4.0 International license (CC BY-SA 4.0).
  https://creativecommons.org/licenses/by-sa/4.0/ This script may be shared,
 with appropriate credit, and reasonable indication of any changes that were
 made. If you remix, transform, or build upon the material, you must distribute
 your contributions under the same license as the original.
 The following third party libraries and code are included in TestMyBrain.js for convenience
 (copyright and licenses, where applicable, are by their respective authors
 and can be found in the code or in the attached web links):
 - <rawdeflate.js at https://github.com/dankogai/js-deflate>
 - <rawinflate.js at https://github.com/dankogai/js-deflate>
 - <json2.js at https://github.com/douglascrockford/JSON-js>
 - <FileSaver.js at https://github.com/ChenWenBrian/FileSaver.js>
 - <Blob.js at https://github.com/eligrey/Blob.js>
 - <seedrandom.js at https://github.com/davidbau/seedrandom/tree/master>
 - <setImmediate.js at https://github.com/YuzuJS/setImmediate>
  - <requestAnimationFrame and cancelAnimationFrame at
 https://github.com/darius/requestAnimationFrame>
 - <atob and btoa at https://github.com/davidchambers/Base64.js>
 - <Object.create at https://developer.mozilla.org/en-
 US/docs/Web/JavaScript/Reference/Global_Objects/Object/create>
 - <Object.keys at https://developer.mozilla.org/en-
 US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys>
 - <Function.prototype.bind at https://developer.mozilla.org/en-
 US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind>
 - <Array.isArray at https://developer.mozilla.org/en-
 US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray>
 - all standard HTML5 <array prototype methods at https://developer.mozilla.org/en-
 US/docs/Web/JavaScript/Reference/Global_Objects/Array>
  */ 

 function getID(
    e
) {
    return (tmbObjs.elements[e] = tmbObjs.elements[e] || document.getElementById(e)), tmbObjs.elements[e];
}
function showFrame() {
    var e,
        t,
        n = [];
    if (1 == arguments.length && arguments[0] instanceof Array) n = arguments[0];
    else for (t = 0; t < arguments.length; t++) n[t] = arguments[t];
    for (tmbObjs.frames.length || (tmbObjs.frames = document.getElementsByTagName("div")), t = tmbObjs.frames.length; t--; )
        (e = n.indexOf(tmbObjs.frames[t].id) > -1 ? "block" : "none"), tmbObjs.frames[t].style.display != e && (tmbObjs.frames[t].style.display = e);
}
function showFrameClass() {
    var e,
        t,
        n = [];
    if (1 == arguments.length && arguments[0] instanceof Array) n = arguments[0];
    else for (t = 0; t < arguments.length; t++) n[t] = arguments[t];
    for (tmbObjs.frames.length || (tmbObjs.frames = document.getElementsByTagName("div")), t = tmbObjs.frames.length; t--; )
        (e = n.indexOf(tmbObjs.frames[t].className) > -1 ? "block" : "none"), tmbObjs.frames[t].style.display != e && (tmbObjs.frames[t].style.display = e);
}
function showSlide(e) {
    tmbObjs.slides.length || (tmbObjs.slides = document.getElementsByClassName("slide"));
    for (var t, n = tmbObjs.slides, r = tmbObjs.slides.length; r--; ) (t = n[r].id == e ? "block" : "none"), n[r].style.display != t && (n[r].style.display = t);
}
function fixMobileOrientation(e) {
    function t() {
        n[0] != window.orientation && n[1] != window.orientation && alert(o);
    }
    if (void 0 != window.orientation) {
        if ("portrait" != e && "landscape" != e) throw new TypeError();
        var n = "portrait" == e ? [0, 180] : [-90, 90],
            r = "portrait" == e ? "upright" : "sideways",
            o = "Please keep your device in " + e + " mode (" + r + ") for this test!";
        n[0] != window.orientation && n[1] != window.orientation && alert(o), window.addEventListener("orientationchange", t, !0);
    }
}
function setMobileViewportScale(e, t) {
    function n() {
        (i = 0 == window.orientation || 180 == window.orientation ? "portrait" : "landscape"),
            "portrait" == t || ("any" == t && "portrait" == i) ? (o = Math.min(screen.width, screen.height)) : ("landscape" == t || ("any" == t && "landscape" == i)) && (o = Math.max(screen.width, screen.height)),
            e || (e = o),
            (r = o / e),
            r > 10 && (r = 10),
            (a.content = "width=" + e + ", maximum-scale=" + r + ", minimum-scale=" + r + ", user-scalable=0");
    }
    if (hasTouch) {
        var r, o, i, a;
        if (
            ((a = document.getElementsByTagName("meta").viewport),
            a || ((a = document.createElement("meta")), (a.name = "viewport"), (a.id = "viewport"), document.getElementsByTagName("head")[0].appendChild(a)),
            t || (t = "any"),
            "portrait" != t && "landscape" != t && "any" != t)
        )
            throw new TypeError();
        n(), "any" == t && window.addEventListener("orientationchange", n, !0);
    }
}
function showCursor(e) {
    "document.body" == e ? (document.body.style.cursor = "auto") : (getID(e).style.cursor = "auto");
}
function hideCursor(e) {
    "document.body" == e ? (document.body.style.cursor = "none") : (getID(e).style.cursor = "none");
}
function tmbSubmitToServer(e, t, n, r) {
    var o, i, a, s;
    (r = r ? r : "index.php"),
        document.createElement &&
            (o = document.createElement("FORM")) &&
            (i = document.createElement("INPUT")) &&
            (a = document.createElement("INPUT")) &&
            (s = document.createElement("INPUT")) &&
            ((o.name = "form"),
            (o.method = "post"),
            (o.action = r),
            (o.onsubmit = function () {
                return !1;
            }),
            (i.type = "hidden"),
            (i.name = "data"),
            (i.value = JSON.stringify(e)),
            o.appendChild(i),
            (a.type = "hidden"),
            (a.name = "score"),
            (a.value = t),
            o.appendChild(a),
            (s.type = "hidden"),
            (s.name = "outcomes"),
            (s.value = JSON.stringify(n)),
            o.appendChild(s),
            document.body.appendChild(o),
            o.submit());
}
function tmbSubmitToURL(e, t) {
    var n;
    if (null === t || "object" != typeof t) throw new TypeError("tmbSubmitToURL: 'tmbData' is not an object.");
    if (document.createElement && (n = document.createElement("FORM"))) {
        (n.name = "form"),
            (n.method = "post"),
            (n.action = e),
            (n.onsubmit = function () {
                return !1;
            });
        for (var r in t)
            if (t.hasOwnProperty(r)) {
                var o = document.createElement("INPUT");
                (o.type = "hidden"), (o.name = r), (o.value = t[r]), n.appendChild(o);
            }
        document.body.appendChild(n), n.submit(), document.body.removeChild(n);
    }
}
function tmbSubmitToFile(e, t, n) {
    for (var r = [], o = "", i = "", a = !0, s = 0; s < e.length; s++) for (var u in e[s]) e[s].hasOwnProperty(u) && -1 == r.indexOf(u) && (r.push(u), (i += '"' + u + '",'));
    for (i = i.substring(0, i.length - 1), i += "\r\n", s = 0; s < e.length; s++) {
        o = "";
        for (var l = 0; l < r.length; l++) "undefined" != typeof e[s][r[l]] && null !== e[s][r[l]] && (o += e[s][r[l]] instanceof Object ? '"' + JSON.stringify(e[s][r[l]]).replace(/\"/g, '""') + '"' : '"' + e[s][r[l]] + '"'), (o += ",");
        (o = o.substring(0, o.length - 1)), (i += o + "\r\n");
    }
    n && ((a = !saveTextAs(i, t)), a ? alert("Could not save the data!!") : alert("Data have been saved in " + t));
    try {
        var c = window.open("", "", "width=500,height=500,menubar=yes,toolbar=yes,scrollbars=yes,status=yes,resizable=yes");
        if (null == c || "undefined" == typeof c) throw new TypeError();
    } catch (d) {
        alert("Could not open data window. Try disabling popup blockers before closing this."), (c = window.open("", "", "width=500,height=500,menubar=yes,toolbar=yes,scrollbars=yes,status=yes,resizable=yes"));
    } finally {
        if (null == c || "undefined" == typeof c) alert("Tried again and failed opening data window.");
        else {
            c.document.write("<pre>" + i + "</pre><br>");
            var f = c.document.createElement("INPUT");
            (f.type = "text"), (f.value = t), c.document.body.appendChild(f);
            var m = c.document.createElement("BUTTON"),
                p = c.document.createTextNode("Save");
            m.appendChild(p),
                c.document.body.appendChild(m),
                (c.onbeforeunload = function () {
                    return a ? "Have you saved the data?" : void 0;
                }),
                (m.onclick = function () {
                    (t = f.value), (a = !saveTextAs(i, t)), a ? alert("Could not save the data!!") : alert("Data have been saved in " + t);
                }),
                (c.document.title = t),
                c.document.close();
        }
    }
}


function convertToCSV (json) {
  
    var keys = ['subjectkey','src_subject_id','site','interview_date','interview_age','sex','phenotype','handedness','index'];
    // add NDA required variables
    keys.push()

    var values = [];
    function getKeys(data, k = '') {
      for (var i in data) {
        var rest = k.length ? '_' + i : i
        if (typeof data[i] == 'object') {
          if (!Array.isArray(data[i])) {
            getKeys(data[i], k + rest)
          }
        } else keys.push( k+ rest)
      }
    }   
    function getValues(data, k = '') {
      for (var i in data) {
        var rest = k.length ? '' + i : i
        if (typeof data[i] == 'object') {
          if (!Array.isArray(data[i])) {
            getValues(data[i], k + rest)
          }
        }
        else values.push(data[rest])
      }
    }

    getKeys(json[0])
    var value="";
    var index = -2; // to accomodate for practice trials
    json.forEach(x=>{
       values=[];
       getValues(x);
       value+=GUID+',';
       value+=subjectID+',';
       value+=siteNumber+',';
       value+=today+',';
       value+=ageAtAssessment+',';
       value+=sexAtBirth+',';
       value+=groupStatus+',';
       value+=handedness+',';
       value+=index+',';
       value+=values.join(",")+"\r\n";
    index++;
    })
    
    var csv = keys.join(",")+"\r\n"+value;
    return csv
}


function getUrlParameters(e, t, n) {
    var r, o, i, a;
    if (((r = t.length ? t : window.location.search), !r)) return !1;
    (o = r.split("?")[1].split("&")), (a = !0);
    for (var s = 0; s < o.length; s++) {
        if (((i = o[s].split("=")), i[0] == e)) return (a = !0), n ? decodeURIComponent(i[1]) : i[1];
        a = !1;
    }
    return a ? void 0 : !1;
}
function urlEncode(e) {
    return (e = (e + "").toString()), encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
}
function httpBuildQuery(e, t, n) {
    var r,
        o,
        i = [],
        a = this,
        s = function (e, t, n) {
            var r,
                o = [];
            if ((t === !0 ? (t = "1") : t === !1 && (t = "0"), null != t)) {
                if ("object" == typeof t) {
                    for (r in t) null != t[r] && t.hasOwnProperty(r) && o.push(s(e + "[" + r + "]", t[r], n));
                    return o.join(n);
                }
                if ("function" != typeof t) return a.urlEncode(e) + "=" + a.urlEncode(t);
                throw new Error("There was an error processing for http_build_query().");
            }
            return "";
        };
    n || (n = "&");
    for (o in e)
        if (e.hasOwnProperty(o)) {
            (r = e[o]), t && !isNaN(o) && (o = String(t) + o);
            var u = s(o, r, n);
            "" !== u && i.push(u);
        }
    return i.join(n);
}
function ajaxRequest(e) {
    var t,
        n,
        r,
        o,
        i,
        a = { url: ".", method: "GET", data: null, async: !0, timeout: 3e4, user: null, pass: null, getHeaders: !1, sendCredentials: !1, callback: null };
    null != e &&
        "object" == typeof e &&
        (e.hasOwnProperty("url") && (a.url = e.url),
        e.hasOwnProperty("method") && (a.method = e.method.toUpperCase()),
        e.hasOwnProperty("data") && (a.data = e.data),
        e.hasOwnProperty("async") && (a.async = e.async),
        e.hasOwnProperty("timeout") && (a.timeout = e.timeout),
        e.hasOwnProperty("user") && (a.user = e.user),
        e.hasOwnProperty("pass") && (a.pass = e.pass),
        e.hasOwnProperty("getHeaders") && (a.getHeaders = e.getHeaders),
        e.hasOwnProperty("sendCredentials") && (a.sendCredentials = e.sendCredentials),
        e.hasOwnProperty("callback") && (a.callback = e.callback)),
        null != a.data && ((r = httpBuildQuery(a.data)), "GET" == a.method && (a.url += "?" + r)),
        (t = new XMLHttpRequest());
    try {
        t.open(a.method, a.url, a.async),
            a.async &&
                (void 0 !== t.timeout &&
                    void 0 !== t.ontimeout &&
                    ((t.timeout = a.timeout),
                    (t.ontimeout = function () {
                        console.log("ajaxRequest timed out.");
                    })),
                void 0 !== t.withCredentials && a.sendCredentials && (t.withCredentials = !0),
                (t.onreadystatechange = function () {
                    if ((a.getHeaders && 2 === t.readyState && ((o = t.getAllResponseHeaders()), console.log("Request Status: " + t.status + " " + t.statusText), o && console.log(o)), 4 === t.readyState))
                        if (t.status >= 200 && t.status < 400) {
                            if (((i = void 0 != t.response ? t.response : t.responseText), null == a.callback)) return i;
                            a.callback(i);
                        } else {
                            if (((n = "Error in ajaxRequest: " + t.status + " " + t.statusText), console.log(n), null == a.callback)) return null;
                            a.callback(null);
                        }
                })),
            t.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            a.user && a.pass && t.setRequestHeader("Authorization", "Basic " + btoa(a.user + ":" + a.pass)),
            "PUT" == a.method && t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    } catch (s) {
        if (((n = "Error in ajaxRequest 'open': " + s.message), console.log(n), null == a.callback)) return null;
        a.callback(null);
    }
    try {
        "PUT" == a.method ? t.send(r) : t.send();
    } catch (s) {
        if (((n = "Error in ajaxRequest 'send': " + s.message), console.log(n), null == a.callback)) return null;
        a.callback(null);
    }
    if (!a.async)
        if ((a.getHeaders && ((o = t.getAllResponseHeaders()), console.log("Request Status: " + t.status + " " + t.statusText), o && console.log(o)), t.status >= 200 && t.status < 400)) {
            if (((i = void 0 != t.response ? t.response : t.responseText), null == a.callback)) return i;
            a.callback(i);
        } else {
            if (((n = "Error in ajaxRequest: " + t.status + " " + t.statusText), console.log(n), null == a.callback)) return null;
            a.callback(null);
        }
}
function imagePreLoad(e, t) {
    var n = e.slice(),
        r = 0,
        o = { progress: !0, pipeline: !0, copy: !1, callBack: null };
    null != t &&
        "object" == typeof t &&
        (t.hasOwnProperty("progress") && (o.progress = t.progress),
        t.hasOwnProperty("pipeline") && (o.pipeline = t.pipeline),
        t.hasOwnProperty("copy") && ((o.copy = t.copy), o.copy && void 0 === tmbObjs.images && (tmbObjs.images = [])),
        t.hasOwnProperty("callBack") && (o.callBack = t.callBack));
    var i,
        a,
        s,
        u,
        l = o.pipeline ? 1 : n.length;
    o.progress &&
        ((i = document.createElement("div")),
        (a = document.createElement("span")),
        (s = document.createElement("span")),
        (u = document.createElement("progress")),
        (i.id = "_preloadDiv"),
        (i.style.textAlign = "center"),
        (i.style.position = "absolute"),
        (i.style.left = "50%"),
        (i.style.top = "50%"),
        (i.style.marginTop = "-30px"),
        (i.style.marginLeft = "-150px"),
        (a.id = "_preloadText"),
        (a.style.textAlign = "center"),
        (a.innerHTML = "Loading resources: "),
        (s.id = "_preloadCount"),
        (s.style.textAlign = "center"),
        (s.innerHTML = "0 / " + e.length + "<br>"),
        i.appendChild(a),
        i.appendChild(s),
        u && void 0 !== u.max && ((u.id = "_preloadBar"), (u.style.width = "300px"), (u.style.height = "30px"), (u.max = 1), (u.value = 0), i.appendChild(u)),
        document.body.appendChild(i),
        (i.style.display = "block"));
    for (
        var c = function (t) {
                var a = t.target;
                r++,
                    t.preventDefault(),
                    t.stopPropagation(),
                    a.removeEventListener("load", c, !0),
                    a.removeEventListener("error", c, !0),
                    "error" == t.type && console.log("Error pre-loading image: " + a.src),
                    o.progress && ((s.innerHTML = r + " / " + e.length + "<br>"), u && void 0 !== u.max && (u.value = r / e.length)),
                    o.copy && tmbObjs.images.push(a.id),
                    o.pipeline && r < e.length && d(n.shift()),
                    r == e.length && (o.progress && document.body.removeChild(i), o.callBack && o.callBack());
            },
            d = function (e) {
                var t = new Image();
                t.addEventListener("load", c, !0), t.addEventListener("error", c, !0), (t.id = e), (t.src = e);
            };
        l > 0;

    )
        l--, d(n.shift());
}
function getKeyboardInput(e, t, n, r) {
    if (!(1 == e.highlight || e instanceof Array || "any" === e)) throw new TypeError("getKeyboardInput: invalid acceptedKeys parameter");
    var o = 1 == e.highlight;
    r && setTimeout(disableKeyboard, r);
    var i = now(),
        a = null,
        s = 0,
        u = function () {
            if (((a = null), o)) for (var t in e) e.hasOwnProperty(t) && "highlight" != t && (e[t].style.border = "5px solid transparent");
        };
    return (
        (document.onkeydown = function (t) {
            s = now() - i;
            var t = t || window.event,
                n = t.charCode || t.keyCode,
                r = codeToKey(n);
            return (
                ("any" === e || (o && r in e) || (e instanceof Array && e.includes(r))) &&
                    (a && a != r ? (u(), alert("Please press only one key!\n\nYour response was not recorded. Please try again."), u()) : ((a = r), o && e[r] && (e[r].style.border = "5px solid #afd6fd"))),
                !1
            );
        }),
        (document.onkeyup = function (r) {
            var r = r || window.event,
                i = r.charCode || r.keyCode,
                l = codeToKey(i);
            if ("any" === e || (o && l in e) || (e instanceof Array && e.contains(l))) {
                r.preventDefault ? (r.preventDefault(), r.stopPropagation()) : ((r.returnValue = !1), (r.cancelBubble = !0));
                var c = function () {
                    if (l != a) return !1;
                    o && (e[l].style.border = "5px solid transparent");
                    var r = { response: l, rt: s };
                    return u(), n ? t(r, n) : t(r), !1;
                };
                o ? window.setTimeout(c, 300) : c();
            }
        }),
        !1
    );
}
function simulateMobileMouseEvent(e, t) {
    var n = document.createEvent("MouseEvents"),
        r = e.changedTouches[0];
    n.initMouseEvent(t, !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), e.target.dispatchEvent(n);
}
function simulateKeyEvent(e, t) {
    var n = null;
    if (document.createEvent) {
        try {
            (n = document.createEvent("KeyEvents")), n.initKeyEvent(e, !0, !0, window, !1, !1, !1, !1, t, 0);
        } catch (r) {
            try {
                n = document.createEvent("Events");
            } catch (o) {
                n = document.createEvent("UIEvents");
            } finally {
                n.initEvent(e, !0, !0), (n.view = window), (n.altKey = !1), (n.ctrlKey = !1), (n.shiftKey = !1), (n.metaKey = !1), (n.keyCode = t), (n.charCode = 0);
            }
        }
        document.dispatchEvent(n);
    } else {
        if (!document.createEventObject) throw "simulateKeyEvent(): No event simulation framework present.";
        (n = document.createEventObject()), (n.bubbles = !0), (n.cancelable = !0), (n.view = window), (n.ctrlKey = !1), (n.altKey = !1), (n.shiftKey = !1), (n.metaKey = !1), (n.keyCode = t), document.fireEvent("on" + e, n);
    }
}
function codeToKey(e) {
    return keyboardCodes[e] || "nokey";
}
function keyToCode(e) {
    return keyboardKeys[e] || 0;
}
function disableKeyboard() {
    (document.onkeyup = null), (document.onkeydown = null);
}
function disableTouch(e) {
    if ("document" === e) document.ontouchend = null;
    else for (var t = 0; t < e.length; t++) (e[t].ontouchstart = null), (e[t].ontouchend = null);
}
function disableSelect() {
    var e = document.body.style;
    "undefined" != typeof e.webkitUserSelect
        ? (e.webkitUserSelect = "none")
        : "undefined" != typeof e.MozUserSelect
        ? (e.MozUserSelect = "none")
        : "undefined" != typeof e.msUserSelect
        ? (e.msUserSelect = "none")
        : "undefined" != typeof e.oUserSelect
        ? (e.oUserSelect = "none")
        : "undefined" != typeof e.userSelect
        ? (e.userSelect = "none")
        : "undefined" != typeof document.onselectstart &&
          (document.onselectstart = function () {
              return !1;
          });
}
function disableRightClick() {
    "undefined" != typeof document.oncontextmenu &&
        (document.oncontextmenu = function () {
            return !1;
        });
}
function disableDrag() {
    "undefined" != typeof document.ondragstart &&
        (document.ondragstart = function () {
            return !1;
        });
}
function disableElasticScrolling() {
    "undefined" != typeof document.ontouchmove &&
        (document.ontouchmove = function (e) {
            e.preventDefault(), e.stopPropagation();
        });
}
function getWindowHeight() {
    var e = 0;
    return self.innerHeight ? (e = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (e = document.documentElement.clientHeight) : document.body && (e = document.body.clientHeight), e;
}
function getWindowWidth() {
    var e = 0;
    return self.innerWidth ? (e = self.innerWidth) : document.documentElement && document.documentElement.clientWidth ? (e = document.documentElement.clientWidth) : document.body && (e = document.body.clientWidth), e;
}
function getAspectRatio() {
    return screen.height < screen.width ? screen.width / screen.height : screen.height / screen.width;
}
function getBoundingClientRectWithScroll(e) {
    var t = e.getBoundingClientRect(),
        n = document.body,
        r = document.documentElement,
        o = window.pageYOffset || r.scrollTop || n.scrollTop,
        i = window.pageXOffset || r.scrollLeft || n.scrollLeft,
        a = r.clientTop || n.clientTop || 0,
        s = r.clientLeft || n.clientLeft || 0,
        u = t.top + o - a,
        l = t.left + i - s,
        c = t.right + i - s,
        d = t.bottom + o - a,
        f = t.bottom - t.top,
        m = t.right - t.left;
    return { top: Math.round(u), left: Math.round(l), right: Math.round(c), bottom: Math.round(d), height: Math.round(f), width: Math.round(m) };
}
function regularPolygon(e, t, n, r, o) {
    if (!(3 > e)) {
        var i = [],
            a = (2 * Math.PI) / e;
        o = (o * Math.PI) / 180;
        for (var s = 0; e > s; s++) i.push({ x: t + r * Math.cos(s * a + o), y: n - r * Math.sin(s * a + o) });
        return i;
    }
}
function svgPathString(e, t) {
    var n;
    n = "M" + e[0].x + " " + e[0].y + "L";
    for (var r = 1; r < e.length; r++) n = n + e[r].x + " " + e[r].y + " ";
    return t && (n += "Z"), n;
}
function randInt(e, t) {
    return t ? Math.floor(Math.random() * (t - e + 1)) + e : ((e = e || 2), Math.floor(Math.random() * e));
}
function randSign() {
    return Math.random() < 0.5 ? -1 : 1;
}
function combinations(e, t) {
    var n,
        r,
        o,
        i,
        a = [];
    for (n = 0; n < e.length; n++)
        if (1 === t) a.push([e[n]]);
        else for (o = combinations(e.slice(n + 1, e.length), t - 1), r = 0; r < o.length; r++) (i = o[r]), i.unshift(e[n]), a.push(i);
    return a;
}
function range(e, t) {
    for (var n = [], r = e; t >= r; r++) n.push(r);
    return n;
}
function linSpace(e, t, n) {
    if (("undefined" == typeof n && (n = Math.max(Math.round(t - e) + 1, 1)), 2 > n)) return 1 === n ? [e] : [];
    var r,
        o = new Array(n);
    for (n--, r = n; r >= 0; r--) o[r] = (r * t + (n - r) * e) / n;
    return o;
}
function isEven(e) {
    return e == parseFloat(e) ? !(e % 2) : void 0;
}
function wrapRads(e) {
    for (; e > Math.PI; ) e -= 2 * Math.PI;
    for (; e < -Math.PI; ) e += 2 * Math.PI;
    return e;
}
function sizeToDegrees(e, t) {
    return (t = t || 57.294), (2 * Math.atan2(e, 2 * t) * 180) / Math.PI;
}
function degreesToSize(e, t) {
    return (t = t || 57.294), 2 * t * Math.tan((e * Math.PI) / 360);
}
function euclidDistance(e, t, n, r) {
    var o = e - n,
        i = t - r;
    return Math.sqrt(o * o + i * i);
}
function euclidDistanceSquared(e, t, n, r) {
    var o, i;
    return (o = e - n), (i = t - r), o * o + i * i;
}
function vecPvector(e, t) {
    var n = {};
    return (n.x = t.x - e.x), (n.y = t.y - e.y), n;
}
function vecLength(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
}
function vecAngle(e) {
    var t = Math.atan2(e.y, e.x);
    return wrapRads(t);
}
function vecDotProduct(e, t) {
    return e.x * t.x + e.y * t.y;
}
function vecCrossProduct(e, t) {
    return e.x * t.y - e.y * t.x;
}
function vecAngleBetween(e, t) {
    var n = Math.atan2(t.y, t.x) - Math.atan2(e.y, e.x);
    return wrapRads(n);
}
function segmentsIntersect(e, t, n, r) {
    function o(e, t) {
        return e.x == t.x && e.y == t.y;
    }
    function i() {
        for (var e = arguments[0], t = 1; t < arguments.length; t += 1) if (arguments[t] != e) return !1;
        return !0;
    }
    var a = vecPvector(e, n),
        s = vecPvector(e, t),
        u = vecPvector(n, r),
        l = vecCrossProduct(s, u),
        c = vecCrossProduct(a, s);
    if (0 == l) {
        if (0 == c) {
            if (!i(n.x - e.x < 0, n.x - t.x < 0, r.x - e.x < 0, r.x - t.x < 0) || !i(n.y - e.y < 0, n.y - t.y < 0, r.y - e.y < 0, r.y - t.y < 0)) return 1;
            if (o(e, n) || o(e, r) || o(t, n) || o(t, r)) return 2;
        }
        return !1;
    }
    var d = vecCrossProduct(a, u),
        f = c / l,
        m = d / l;
    return (0 != m && 1 != m) || (0 != f && 1 != f) ? (m >= 0 && 1 >= m && f >= 0 && 1 >= f ? 4 : !1) : 3;
}
function pointSegmentDistance(e, t, n) {
    function r(e, t) {
        var n = e.x - t.x,
            r = e.y - t.y;
        return n * n + r * r;
    }
    var o = r(t, n);
    if (0 === o) return Math.sqrt(r(e, t));
    var i = ((e.x - t.x) * (n.x - t.x) + (e.y - t.y) * (n.y - t.y)) / o;
    return 0 > i ? Math.sqrt(r(e, t)) : i > 1 ? Math.sqrt(r(e, n)) : Math.sqrt(r(e, { x: t.x + i * (n.x - t.x), y: t.y + i * (n.y - t.y) }));
}
function polygonIsComplex(e) {
    var t, n;
    if ((n = e.length) > 2) {
        for (var r = 1; n - 1 > r; r++) for (var o = 0; r > o; o++) if (((t = segmentsIntersect(e[o], e[o + 1], e[r], e[r + 1])), 0 != t && 3 != t)) return [t, o, r];
        for (o = 0; n - 1 > o; o++) if (((t = segmentsIntersect(e[o], e[o + 1], e[n - 1], e[0])), 0 != t && 3 != t)) return [t, o, n - 1];
    }
    return !1;
}
function autoCorr(e, t) {
    var n,
        r,
        o,
        i,
        a,
        s = 0,
        u = 0,
        l = [];
    if (1 > t || t > e.length - 1) throw new TypeError("'hiLag' must be positive and less than 'series.length'.");
    for (i = e.slice(), o = i.length, a = i.average(), n = 0; o > n; n++) (i[n] = i[n] - a), (s += i[n] * i[n]);
    for (l[0] = 1, r = 1; t + 1 > r; r++) {
        for (u = 0, n = 0; o - r - 1 > n; n++) u += i[n] * i[n + r];
        l[r] = u / s;
    }
    return l;
}
function getTimerGrain(e, t) {
    function n() {
        var s, u, l, c;
        for (l = a, u = s = now(); l; ) (c = now()), c - u && (l--, (u = c));
        (r += u - s), (o += a), o == e ? ((c = r / e), t(c)) : (o == e - i && (a = i), setImmediate(n));
    }
    var r, o, i, a;
    e && t ? ((r = o = 0), e > 100 ? ((a = 100), (i = e % 100)) : (a = e), setImmediate(n)) : console.log("getTimerGrain needs how many 'ticks' to measure and a 'callBack' function to return the result.");
}
function getFrameTime(e, t) {
    function n() {
        (r = o),
            (o = now()),
            (r = o - r),
            i.push(r),
            e
                ? (e--, requestAnimationFrame(n))
                : (i.sort(function (e, t) {
                      return e - t;
                  }),
                  (r = i[Math.round(0.5 * i.length)]),
                  t(r));
    }
    var r,
        o,
        i = [];
    e && t
        ? requestAnimationFrame(function () {
              (o = now()), requestAnimationFrame(n);
          })
        : console.log("getFrameTime needs how many 'frames' to measure and a 'callback' function to return the result.");
}
function chainTimeouts() {
    var e = arguments.length,
        t = arguments[0];
    if ((1 == e && t instanceof Array && ((arguments = t), (e = arguments.length), (t = arguments[0])), e % 2 == 0)) throw new Error("chainTimeouts(): number of arguments must be odd");
    t();
    for (var n = [], r = 2, o = arguments[1]; e > r; r += 2, o += arguments[r - 1]) n.push(setTimeout(arguments[r], o));
    return n;
}
function clearChainTimeouts(e) {
    for (var t = 0, n = e.length; n > t; t++) clearTimeout(e[t]);
}
function createCookie(e, t, n, r, o, i) {
    if (!e) return !1;
    if (((t = t ? t : ""), void 0 != n)) {
        var a = new Date();
        a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3), (n = "; expires=" + a.toUTCString());
    } else n = "; expires=0";
    (r = r ? "; path=" + r : "; path=/"), (o = o ? "; domain=" + o : ""), (i = i ? ";secure" : ""), (document.cookie = e + "=" + t + n + r + o + i);
}
function readCookie(e) {
    for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
        for (var o = n[r]; " " == o.charAt(0); ) o = o.substring(1, o.length);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
    }
    return null;
}
function eraseCookie(e, t, n) {
    (t = t ? "; path=" + t : ""), (n = n ? "; domain=" + n : ""), createCookie(e, "", -1, t, n);
}
function safeDecode(e) {
    return (e = e.replace(/\!/g, "/").replace(/-/g, "+").replace(/\./g, "=")), atob(e);
}
function safeEncode(e) {
    return (e = btoa(e)), (e = e.replace(/\//g, "!").replace(/\+/g, "-").replace(/\=/g, "."));
}
function getPastResults(e) {
    return RawDeflate.inflate(safeDecode(readCookie("t." + e)));
}
function insertAfter(e, t) {
    e.parentNode.insertBefore(t, e.nextSibling);
}
function generateForm(survey, node, action, method, buttonText) {
    function tag(e, t) {
        var n = "<" + e + " ",
            r = [];
        for (var o in t) t.hasOwnProperty(o) && "content" != o && r.push(o + '="' + t[o] + '"');
        return (n += r.join(" ") + ">"), "undefined" != typeof t.content && (n += t.content), (n += "</" + e + ">");
    }
    var self = generateForm;
    "undefined" == typeof self.numForms ? (self.numForms = 1) : self.numForms++;
    var formId = "__form" + (self.numForms - 1);
    (method = void 0 == method ? "POST" : method), (onsubmit = "alert('blart');");
    for (var str = "<form id='" + formId + "' action='" + action + "' method='" + method + "'><ol>", a = 0, b; (b = survey[a]); a++)
        if ("textdiv" != b.type) {
            switch (
                ("" != b.question &&
                    ((str += "hidden" != b.type ? "<li>" : ""),
                    (str +=
                        "<p><div class='zen_question zen_" +
                        b.type +
                        "' id='zen_" +
                        b.name +
                        "_question'>" +
                        b.question +
                        "</div><div class='zen_input zen_" +
                        b.type +
                        ("undefined" != typeof b.subtype ? " zen_" + b.subtype : "") +
                        "' id='zen_" +
                        b.name +
                        "_input'>")),
                b.type)
            ) {
                case "":
                    str += tag("input", { type: "text", id: b.name });
                    break;
                case "text":
                    str += tag("input", { type: "text", maxlength: b.length, id: b.name, size: b.length });
                    break;
                case "hidden":
                    (b.optional = !0), (b.question = b.name), (str += tag("input", { type: "hidden", id: b.name }));
                    break;
                case "checkbox":
                case "radio":
                    b.options.map(function (e, t) {
                        var n = b.name + "[" + t + "]";
                        str += tag("span", {
                            class: "undefined" != typeof b.subtype ? "zen_" + b.subtype : "zen_" + b.type,
                            content: tag("input", { type: b.type, name: b.name, id: n, value: "undefined" != typeof b.values ? b.values[t] : b.options[t], class: "zen_" + b.type }) + tag("label", { for: n, content: e }),
                        });
                    });
                    break;
                case "dropdown":
                    (str += "<select id='" + b.name + "' name= '" + b.name + "'>"),
                        b.options.map(function (e, t) {
                            var n = b.name + "[" + t + "]";
                            (str += tag("option", { type: b.type, content: e, id: n, value: "undefined" != typeof b.values ? b.values[t] : b.options[t], class: "zen_" + b.type })),
                                (str = str.substring(0, str.lastIndexOf('"') + 1) + (b.selected == b.options[t] ? " selected='selected' " : " ") + str.substring(str.lastIndexOf('"') + 1));
                        }),
                        (str += "</select>");
                    break;
                case "textarea":
                    str += tag("textarea", { name: b.name, rows: b.rows, cols: b.cols, id: b.name, class: "undefined" != typeof b.subtype ? " zen_" + b.subtype : "" });
            }
            (str += "</div></p>"), (str += "hidden" != b.type ? "</li>" : "");
        } else (b.optional = !0), (str += tag("div", { id: b.name, size: b.length, content: b.content, class: "zen_infoblock" }));
    (str = buttonText
        ? str + "<br /><button type='button' id='zen_submit' onclick='document.forms." + formId + ".validate();'>" + buttonText + "</button>"
        : str + "<br /><button type='button' id='zen_submit' onclick='document.forms." + formId + ".validate();'>Next</button>"),
        (str += "<input type='hidden' name='data' id='data' /><input type='hidden' name='score' id='score'/></form>"),
        (node.innerHTML += str),
        (getID(formId).validate = function () {
            var results = [],
                score = 0,
                finalCheck = !0,
                error = !1,
                form = getID(formId);
            survey.map(function (item) {
                var id = item.name,
                    el,
                    value,
                    answer;
                if ("checkbox" == item.type || "radio" == item.type) {
                    value = [];
                    for (var i = 0, len = item.options.length; len > i; i++) {
                        var option = getID(item.name + "[" + i + "]");
                        option.checked && (value.push(option.value), item.values && (score += 1 * option.value));
                    }
                    "radio" == item.type
                        ? ((value = value.shift()),
                          (item.validate = function (e) {
                              return e;
                          }))
                        : (item.validate = function (e) {
                              return e.length;
                          }),
                        (answer = value),
                        (el = getID(item.name + "[" + (i - 1) + "]"));
                } else if ("dropdown" == item.type) {
                    for (var i = 0, len = item.options.length; len > i; i++) {
                        var option = getID(item.name + "[" + i + "]");
                        option.selected && ((answer = option.value), item.values && ((answer = 1 * option.value), (score += 1 * option.value)));
                    }
                    (el = form[item.name]),
                        (value = getID(item.name).options[0].selected),
                        (value = !value),
                        (item.validate = function (e) {
                            return e;
                        });
                } else (value = []), (el = form[item.name] ? form[item.name] : getID(item.name)), (value = el.value), (answer = el.value);
                if (item.optional) {
                    var ans = new Object();
                    eval("ans.zen_" + item.name + "= answer"), results.push(ans);
                } else {
                    var errorEl = getID(id + ".err");
                    errorEl || ((errorEl = document.createElement("span")), (errorEl.id = id + ".err"), (errorEl.className = "zen_error"), insertAfter(getID("zen_" + id + "_input"), errorEl));
                    var notBlank = function (e) {
                            return !("" === e);
                        },
                        validate = item.validate || notBlank;
                    if (validate(value)) {
                        errorEl.innerHTML = "";
                        var ans = new Object();
                        eval("ans.zen_" + item.name + "= answer"), results.push(ans);
                    } else (error = !0), (finalCheck = !1), (errorEl.innerHTML = "required");
                }
            });
            var errorTot = getID(formId + ".err");
            return (
                errorTot || ((errorTot = document.createElement("span")), (errorTot.id = formId + ".err"), (errorTot.className = "zen_err_flag"), insertAfter(getID("zen_submit"), errorTot)),
                (getID("data").value = JSON.stringify(results)),
                (getID("score").value = isNaN(score) ? 0 : score),
                finalCheck ? void getID(formId).submit() : ((errorTot.innerHTML = "There is a problem with your form submission.  Please check that you have filled out all required fields correctly."), finalCheck)
            );
        });
}
Date.now ||
    (Date.now = function () {
        return new Date().getTime();
    }),
    (function () {
        "use strict";
        for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
            var n = e[t];
            (window.requestAnimationFrame = window[n + "RequestAnimationFrame"]), (window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var r = 0;
            (window.requestAnimationFrame = function (e) {
                var t = Date.now(),
                    n = Math.max(r + 16, t);
                return setTimeout(function () {
                    e((r = n));
                }, n - t);
            }),
                (window.cancelAnimationFrame = clearTimeout);
        }
    })(),
    (function () {
        function e(e) {
            this.message = e;
        }
        var t = "undefined" != typeof exports ? exports : this,
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        (e.prototype = new Error()),
            (e.prototype.name = "InvalidCharacterError"),
            t.btoa ||
                (t.btoa = function (t) {
                    for (var r, o, i = String(t), a = 0, s = n, u = ""; i.charAt(0 | a) || ((s = "="), a % 1); u += s.charAt(63 & (r >> (8 - (a % 1) * 8)))) {
                        if (((o = i.charCodeAt((a += 0.75))), o > 255)) throw new e("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                        r = (r << 8) | o;
                    }
                    return u;
                }),
            t.atob ||
                (t.atob = function (t) {
                    var r = String(t).replace(/=+$/, "");
                    if (r.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
                    for (var o, i, a = 0, s = 0, u = ""; (i = r.charAt(s++)); ~i && ((o = a % 4 ? 64 * o + i : i), a++ % 4) ? (u += String.fromCharCode(255 & (o >> ((-2 * a) & 6)))) : 0) i = n.indexOf(i);
                    return u;
                });
    })();
var base64decode = atob,
    base64encode = btoa;
document.getElementsByClassName ||
    (document.getElementsByClassName = function (e) {
        for (var t = [], n = document, r = n.getElementsByTagName("*"), o = r.length, i = new RegExp("(^|\\s)" + e + "(\\s|$)"), a = 0, s = 0; o > a; a++) i.test(r[a].className) && ((t[s] = r[a]), s++);
        return t;
    }),
    Object.prototype.hasOwnProperty ||
        (Object.prototype.hasOwnProperty = function (e) {
            var t = this.__proto__ || this.constructor.prototype;
            return e in this && (!(e in t) || t[e] !== this[e]);
        }),
    "function" != typeof Object.create &&
        (Object.create = (function () {
            var e = function () {};
            return function (t) {
                if (arguments.length > 1) throw Error("Second argument not supported");
                if ("object" != typeof t) throw TypeError("Argument must be an object");
                e.prototype = t;
                var n = new e();
                return (e.prototype = null), n;
            };
        })()),
    Object.keys ||
        (Object.keys = (function () {
            "use strict";
            var e = Object.prototype.hasOwnProperty,
                t = !{ toString: null }.propertyIsEnumerable("toString"),
                n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                r = n.length;
            return function (o) {
                if ("object" != typeof o && ("function" != typeof o || null === o)) throw new TypeError("Object.keys called on non-object");
                var i,
                    a,
                    s = [];
                for (i in o) e.call(o, i) && s.push(i);
                if (t) for (a = 0; r > a; a++) e.call(o, n[a]) && s.push(n[a]);
                return s;
            };
        })()),
    Function.prototype.bind ||
        (Function.prototype.bind = function (e) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                n = this,
                r = function () {},
                o = function () {
                    return n.apply(this instanceof r ? this : e, t.concat(Array.prototype.slice.call(arguments)));
                };
            return (r.prototype = this.prototype), (o.prototype = new r()), o;
        }),
    Array.isArray ||
        (Array.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
        }),
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (e, t) {
            if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');
            var n = this.length >>> 0;
            for (t = +t || 0, Math.abs(t) === 1 / 0 && (t = 0), 0 > t && ((t += n), 0 > t && (t = 0)); n > t; t++) if (this[t] === e) return t;
            return -1;
        }),
    Array.prototype.lastIndexOf ||
        (Array.prototype.lastIndexOf = function (e) {
            "use strict";
            if (null == this) throw new TypeError();
            var t,
                n,
                r = Object(this),
                o = r.length >>> 0;
            if (0 === o) return -1;
            for (
                t = o, arguments.length > 1 && ((t = Number(arguments[1])), t != t ? (t = 0) : 0 != t && t != 1 / 0 && t != -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t)))), n = t >= 0 ? Math.min(t, o - 1) : o - Math.abs(t);
                n >= 0;
                n--
            )
                if (n in r && r[n] === e) return n;
            return -1;
        }),
    Array.prototype.every ||
        (Array.prototype.every = function (e) {
            "use strict";
            if (void 0 === this || null === this) throw new TypeError();
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError();
            for (var r = arguments.length >= 2 ? arguments[1] : void 0, o = 0; n > o; o++) if (o in t && !e.call(r, t[o], o, t)) return !1;
            return !0;
        }),
    Array.prototype.some ||
        (Array.prototype.some = function (e) {
            "use strict";
            if (void 0 === this || null === this) throw new TypeError();
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError();
            for (var r = arguments.length >= 2 ? arguments[1] : void 0, o = 0; n > o; o++) if (o in t && e.call(r, t[o], o, t)) return !0;
            return !1;
        }),
    Array.prototype.forEach ||
        (Array.prototype.forEach = function (e) {
            "use strict";
            if (void 0 === this || null === this) throw new TypeError();
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError();
            for (var r = arguments.length >= 2 ? arguments[1] : void 0, o = 0; n > o; o++) o in t && e.call(r, t[o], o, t);
        }),
    Array.prototype.map ||
        (Array.prototype.map = function (e) {
            "use strict";
            if (void 0 === this || null === this) throw new TypeError();
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError();
            for (var r = new Array(n), o = arguments.length >= 2 ? arguments[1] : void 0, i = 0; n > i; i++) i in t && (r[i] = e.call(o, t[i], i, t));
            return r;
        }),
    Array.prototype.filter ||
        (Array.prototype.filter = function (e) {
            "use strict";
            if (void 0 === this || null === this) throw new TypeError();
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw new TypeError();
            for (var r = [], o = arguments.length >= 2 ? arguments[1] : void 0, i = 0; n > i; i++)
                if (i in t) {
                    var a = t[i];
                    e.call(o, a, i, t) && r.push(a);
                }
            return r;
        }),
    "function" != typeof Array.prototype.reduce &&
        (Array.prototype.reduce = function (e, t) {
            "use strict";
            if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof e) throw new TypeError(e + " is not a function");
            var n,
                r,
                o = this.length >>> 0,
                i = !1;
            for (1 < arguments.length && ((r = t), (i = !0)), n = 0; o > n; ++n) this.hasOwnProperty(n) && (i ? (r = e(r, this[n], n, this)) : ((r = this[n]), (i = !0)));
            if (!i) throw new TypeError("Reduce of empty array with no initial value");
            return r;
        }),
    "function" != typeof Array.prototype.reduceRight &&
        (Array.prototype.reduceRight = function (e, t) {
            "use strict";
            if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduceRight called on null or undefined");
            if ("function" != typeof e) throw new TypeError(e + " is not a function");
            var n,
                r,
                o = this.length >>> 0,
                i = !1;
            for (1 < arguments.length && ((r = t), (i = !0)), n = o - 1; n > -1; --n) this.hasOwnProperty(n) && (i ? (r = e(r, this[n], n, this)) : ((r = this[n]), (i = !0)));
            if (!i) throw new TypeError("Reduce of empty array with no initial value");
            return r;
        }),
    (function () {
        "use strict";
        var e = Array.prototype.slice;
        try {
            e.call(document.documentElement);
        } catch (t) {
            Array.prototype.slice = function (t, n) {
                if (((n = "undefined" != typeof n ? n : this.length), "[object Array]" === Object.prototype.toString.call(this))) return e.call(this, t, n);
                var r,
                    o,
                    i = [],
                    a = this.length,
                    s = t || 0;
                s = s >= 0 ? s : a + s;
                var u = n ? n : a;
                if ((0 > n && (u = a + n), (o = u - s), o > 0))
                    if (((i = new Array(o)), this.charAt)) for (r = 0; o > r; r++) i[r] = this.charAt(s + r);
                    else for (r = 0; o > r; r++) i[r] = this[s + r];
                return i;
            };
        }
    })(),
    this.Element &&
        Element.prototype.attachEvent &&
        !Element.prototype.addEventListener &&
        (function () {
            function e(e, t) {
                Window.prototype[e] = HTMLDocument.prototype[e] = Element.prototype[e] = t;
            }
            function t() {
                t.interval && document.body && ((t.interval = clearInterval(t.interval)), document.dispatchEvent(new CustomEvent("DOMContentLoaded")));
            }
            e("addEventListener", function (e, t) {
                var n = this,
                    r = (n._c1_listeners = n._c1_listeners || {}),
                    o = (r[e] = r[e] || []);
                o.length ||
                    n.attachEvent(
                        "on" + e,
                        (o.event = function (e) {
                            var t = (n.document && n.document.documentElement) || n.documentElement || { scrollLeft: 0, scrollTop: 0 };
                            (e.currentTarget = n),
                                (e.pageX = e.clientX + t.scrollLeft),
                                (e.pageY = e.clientY + t.scrollTop),
                                (e.preventDefault = function () {
                                    e.returnValue = !1;
                                }),
                                (e.relatedTarget = e.fromElement || null),
                                (e.stopImmediatePropagation = function () {
                                    (l = !1), (e.cancelBubble = !0);
                                }),
                                (e.stopPropagation = function () {
                                    e.cancelBubble = !0;
                                }),
                                (e.target = e.srcElement || n),
                                (e.timeStamp = +new Date());
                            var r = {};
                            for (var i in e) r[i] = e[i];
                            for (var a, s = 0, u = [].concat(o), l = !0; l && (a = u[s]); ++s)
                                for (var c, d = 0; (c = o[d]); ++d)
                                    if (c == a) {
                                        c.call(n, r);
                                        break;
                                    }
                        })
                    ),
                    o.push(t);
            }),
                e("removeEventListener", function (e, t) {
                    for (var n, r = this, o = (r._c1_listeners = r._c1_listeners || {}), i = (o[e] = o[e] || []), a = i.length - 1; (n = i[a]); --a)
                        if (n == t) {
                            i.splice(a, 1);
                            break;
                        }
                    !i.length && i.event && r.detachEvent("on" + e, i.event);
                }),
                e("dispatchEvent", function (e) {
                    var t = this,
                        n = e.type,
                        r = (t._c1_listeners = t._c1_listeners || {}),
                        o = (r[n] = r[n] || []);
                    try {
                        return t.fireEvent("on" + n, e);
                    } catch (i) {
                        return void (o.event && o.event(e));
                    }
                });
            try {
                new window.CustomEvent("?");
            } catch (n) {
                Object.defineProperty(Window.prototype, "CustomEvent", {
                    get: function () {
                        var e = this;
                        return function (t, n) {
                            n = n || {};
                            var r,
                                o = e.document.createEventObject();
                            (o.type = t), (o.returnValue = !n.cancelable), (o.cancelBubble = !n.bubbles);
                            for (r in n) o[r] = n[r];
                            return o;
                        };
                    },
                });
            }
            (t.interval = setInterval(t, 1)), window.addEventListener("load", t);
        })();
try {
    new window.CustomEvent("?");
} catch (e) {
    !(function () {
        window.CustomEvent = function (e, t) {
            var n;
            t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
            try {
                (n = document.createEvent("CustomEvent")), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail);
            } catch (r) {
                (n = document.createEvent("Event")), n.initEvent(e, t.bubbles, t.cancelable), (n.detail = t.detail);
            }
            return n;
        };
    })();
}
window.Node ||
    (window.Node = {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12,
    }),
    (function (e) {
        var t = 32768,
            n = 0,
            r = 1,
            o = 2,
            i = 6,
            a = !0,
            s = 32768,
            u = 64,
            l = 8192,
            c = 2 * t,
            d = 3,
            f = 258,
            m = 16,
            p = 8192,
            h = 13;
        p > s && alert("error: zip_INBUFSIZ is too small"), t << 1 > 1 << m && alert("error: zip_WSIZE is too large"), h > m - 1 && alert("error: zip_HASH_BITS is too large"), (8 > h || 258 != f) && alert("error: Code too clever");
        var y,
            v,
            b,
            g,
            w,
            I,
            E,
            U,
            T,
            A,
            k,
            x,
            O,
            _,
            S,
            M,
            C,
            L,
            D,
            N,
            R,
            j,
            P,
            B,
            q,
            z,
            F,
            H,
            W,
            K,
            J,
            X,
            Y,
            G,
            $,
            V,
            Z,
            Q,
            ee,
            te,
            ne,
            re,
            oe,
            ie,
            ae,
            se,
            ue,
            le,
            ce,
            de,
            fe,
            me,
            pe,
            he,
            ye,
            ve,
            be = p,
            ge = 1 << h,
            we = ge - 1,
            Ie = t - 1,
            Ee = 0,
            Ue = 4096,
            Te = f + d + 1,
            Ae = t - Te,
            ke = 1,
            xe = 15,
            Oe = 7,
            _e = 29,
            Se = 256,
            Me = 256,
            Ce = Se + 1 + _e,
            Le = 30,
            De = 19,
            Ne = 16,
            Re = 17,
            je = 18,
            Pe = 2 * Ce + 1,
            Be = parseInt((h + d - 1) / d),
            qe = null,
            ze = function () {
                (this.fc = 0), (this.dl = 0);
            },
            Fe = function () {
                (this.dyn_tree = null), (this.static_tree = null), (this.extra_bits = null), (this.extra_base = 0), (this.elems = 0), (this.max_length = 0), (this.max_code = 0);
            },
            He = function (e, t, n, r) {
                (this.good_length = e), (this.max_lazy = t), (this.nice_length = n), (this.max_chain = r);
            },
            We = function () {
                (this.next = null), (this.len = 0), (this.ptr = new Array(l)), (this.off = 0);
            },
            Ke = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0),
            Je = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13),
            Xe = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7),
            Ye = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15),
            Ge = new Array(
                new He(0, 0, 0, 0),
                new He(4, 4, 8, 4),
                new He(4, 5, 16, 8),
                new He(4, 6, 32, 32),
                new He(4, 4, 16, 16),
                new He(8, 16, 32, 32),
                new He(8, 16, 128, 128),
                new He(8, 32, 128, 256),
                new He(32, 128, 258, 1024),
                new He(32, 258, 258, 4096)
            ),
            $e = function (e) {
                var t;
                if ((e ? (1 > e ? (e = 1) : e > 9 && (e = 9)) : (e = i), (F = e), (g = !1), (P = !1), null == qe)) {
                    for (y = v = b = null, qe = new Array(l), U = new Array(c), T = new Array(be), A = new Array(s + u), k = new Array(1 << m), K = new Array(Pe), t = 0; Pe > t; t++) K[t] = new ze();
                    for (J = new Array(2 * Le + 1), t = 0; 2 * Le + 1 > t; t++) J[t] = new ze();
                    for (X = new Array(Ce + 2), t = 0; Ce + 2 > t; t++) X[t] = new ze();
                    for (Y = new Array(Le), t = 0; Le > t; t++) Y[t] = new ze();
                    for (G = new Array(2 * De + 1), t = 0; 2 * De + 1 > t; t++) G[t] = new ze();
                    ($ = new Fe()),
                        (V = new Fe()),
                        (Z = new Fe()),
                        (Q = new Array(xe + 1)),
                        (ee = new Array(2 * Ce + 1)),
                        (re = new Array(2 * Ce + 1)),
                        (oe = new Array(f - d + 1)),
                        (ie = new Array(512)),
                        (ae = new Array(_e)),
                        (se = new Array(Le)),
                        (ue = new Array(parseInt(p / 8)));
                }
            },
            Ve = function (e) {
                (e.next = y), (y = e);
            },
            Ze = function () {
                var e;
                return null != y ? ((e = y), (y = y.next)) : (e = new We()), (e.next = null), (e.len = e.off = 0), e;
            },
            Qe = function (e) {
                return k[t + e];
            },
            et = function (e, n) {
                return (k[t + e] = n);
            },
            tt = function (e) {
                (qe[I + w++] = e), I + w == l && Lt();
            },
            nt = function (e) {
                (e &= 65535), l - 2 > I + w ? ((qe[I + w++] = 255 & e), (qe[I + w++] = e >>> 8)) : (tt(255 & e), tt(e >>> 8));
            },
            rt = function () {
                (S = ((S << Be) ^ (255 & U[R + d - 1])) & we), (M = Qe(S)), (k[R & Ie] = M), et(S, R);
            },
            ot = function (e, t) {
                St(t[e].fc, t[e].dl);
            },
            it = function (e) {
                return 255 & (256 > e ? ie[e] : ie[256 + (e >> 7)]);
            },
            at = function (e, t, n) {
                return e[t].fc < e[n].fc || (e[t].fc == e[n].fc && re[t] <= re[n]);
            },
            st = function (e, t, n) {
                var r;
                for (r = 0; n > r && ve < ye.length; r++) e[t + r] = 255 & ye.charCodeAt(ve++);
                return r;
            },
            ut = function () {
                var e;
                for (e = 0; ge > e; e++) k[t + e] = 0;
                if (((z = Ge[F].max_lazy), (H = Ge[F].good_length), a || (W = Ge[F].nice_length), (q = Ge[F].max_chain), (R = 0), (_ = 0), (B = st(U, 0, 2 * t)), 0 >= B)) return (P = !0), void (B = 0);
                for (P = !1; Te > B && !P; ) ct();
                for (S = 0, e = 0; d - 1 > e; e++) S = ((S << Be) ^ (255 & U[e])) & we;
            },
            lt = function (e) {
                var t,
                    n,
                    r = q,
                    o = R,
                    i = N,
                    s = R > Ae ? R - Ae : Ee,
                    u = R + f,
                    l = U[o + i - 1],
                    c = U[o + i];
                N >= H && (r >>= 2);
                do
                    if (((t = e), U[t + i] == c && U[t + i - 1] == l && U[t] == U[o] && U[++t] == U[o + 1])) {
                        (o += 2), t++;
                        do;
                        while (U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && U[++o] == U[++t] && u > o);
                        if (((n = f - (u - o)), (o = u - f), n > i)) {
                            if (((j = e), (i = n), a)) {
                                if (n >= f) break;
                            } else if (n >= W) break;
                            (l = U[o + i - 1]), (c = U[o + i]);
                        }
                    }
                while ((e = k[e & Ie]) > s && 0 != --r);
                return i;
            },
            ct = function () {
                var e,
                    n,
                    r = c - B - R;
                if (-1 == r) r--;
                else if (R >= t + Ae) {
                    for (e = 0; t > e; e++) U[e] = U[e + t];
                    for (j -= t, R -= t, _ -= t, e = 0; ge > e; e++) (n = Qe(e)), et(e, n >= t ? n - t : Ee);
                    for (e = 0; t > e; e++) (n = k[e]), (k[e] = n >= t ? n - t : Ee);
                    r += t;
                }
                P || ((e = st(U, R + B, r)), 0 >= e ? (P = !0) : (B += e));
            },
            dt = function () {
                for (; 0 != B && null == v; ) {
                    var e;
                    if ((rt(), M != Ee && Ae >= R - M && ((D = lt(M)), D > B && (D = B)), D >= d))
                        if (((e = xt(R - j, D - d)), (B -= D), z >= D)) {
                            D--;
                            do R++, rt();
                            while (0 != --D);
                            R++;
                        } else (R += D), (D = 0), (S = 255 & U[R]), (S = ((S << Be) ^ (255 & U[R + 1])) & we);
                    else (e = xt(0, 255 & U[R])), B--, R++;
                    for (e && (kt(0), (_ = R)); Te > B && !P; ) ct();
                }
            },
            ft = function () {
                for (; 0 != B && null == v; ) {
                    if ((rt(), (N = D), (C = j), (D = d - 1), M != Ee && z > N && Ae >= R - M && ((D = lt(M)), D > B && (D = B), D == d && R - j > Ue && D--), N >= d && N >= D)) {
                        var e;
                        (e = xt(R - 1 - C, N - d)), (B -= N - 1), (N -= 2);
                        do R++, rt();
                        while (0 != --N);
                        (L = 0), (D = d - 1), R++, e && (kt(0), (_ = R));
                    } else 0 != L ? (xt(0, 255 & U[R - 1]) && (kt(0), (_ = R)), R++, B--) : ((L = 1), R++, B--);
                    for (; Te > B && !P; ) ct();
                }
            },
            mt = function () {
                P || ((x = 0), (O = 0), yt(), ut(), (v = null), (w = 0), (I = 0), (L = 0), 3 >= F ? ((N = d - 1), (D = 0)) : ((D = d - 1), (L = 0), (L = 0)), (E = !1));
            },
            pt = function (e, t, n) {
                var r;
                return g || (mt(), (g = !0), 0 != B) ? ((r = ht(e, t, n)) == n ? n : E ? r : (3 >= F ? dt() : ft(), 0 == B && (0 != L && xt(0, 255 & U[R - 1]), kt(1), (E = !0)), r + ht(e, r + t, n - r))) : ((E = !0), 0);
            },
            ht = function (e, t, n) {
                var r, o, i;
                for (r = 0; null != v && n > r; ) {
                    for (o = n - r, o > v.len && (o = v.len), i = 0; o > i; i++) e[t + r + i] = v.ptr[v.off + i];
                    if (((v.off += o), (v.len -= o), (r += o), 0 == v.len)) {
                        var a;
                        (a = v), (v = v.next), Ve(a);
                    }
                }
                if (r == n) return r;
                if (w > I) {
                    for (o = n - r, o > w - I && (o = w - I), i = 0; o > i; i++) e[t + r + i] = qe[I + i];
                    (I += o), (r += o), w == I && (w = I = 0);
                }
                return r;
            },
            yt = function () {
                var e, t, n, r, o;
                if (0 == Y[0].dl) {
                    for (
                        $.dyn_tree = K,
                            $.static_tree = X,
                            $.extra_bits = Ke,
                            $.extra_base = Se + 1,
                            $.elems = Ce,
                            $.max_length = xe,
                            $.max_code = 0,
                            V.dyn_tree = J,
                            V.static_tree = Y,
                            V.extra_bits = Je,
                            V.extra_base = 0,
                            V.elems = Le,
                            V.max_length = xe,
                            V.max_code = 0,
                            Z.dyn_tree = G,
                            Z.static_tree = null,
                            Z.extra_bits = Xe,
                            Z.extra_base = 0,
                            Z.elems = De,
                            Z.max_length = Oe,
                            Z.max_code = 0,
                            n = 0,
                            r = 0;
                        _e - 1 > r;
                        r++
                    )
                        for (ae[r] = n, e = 0; e < 1 << Ke[r]; e++) oe[n++] = r;
                    for (oe[n - 1] = r, o = 0, r = 0; 16 > r; r++) for (se[r] = o, e = 0; e < 1 << Je[r]; e++) ie[o++] = r;
                    for (o >>= 7; Le > r; r++) for (se[r] = o << 7, e = 0; e < 1 << (Je[r] - 7); e++) ie[256 + o++] = r;
                    for (t = 0; xe >= t; t++) Q[t] = 0;
                    for (e = 0; 143 >= e; ) (X[e++].dl = 8), Q[8]++;
                    for (; 255 >= e; ) (X[e++].dl = 9), Q[9]++;
                    for (; 279 >= e; ) (X[e++].dl = 7), Q[7]++;
                    for (; 287 >= e; ) (X[e++].dl = 8), Q[8]++;
                    for (wt(X, Ce + 1), e = 0; Le > e; e++) (Y[e].dl = 5), (Y[e].fc = Mt(e, 5));
                    vt();
                }
            },
            vt = function () {
                var e;
                for (e = 0; Ce > e; e++) K[e].fc = 0;
                for (e = 0; Le > e; e++) J[e].fc = 0;
                for (e = 0; De > e; e++) G[e].fc = 0;
                (K[Me].fc = 1), (pe = he = 0), (le = ce = de = 0), (fe = 0), (me = 1);
            },
            bt = function (e, t) {
                for (var n = ee[t], r = t << 1; te >= r && (te > r && at(e, ee[r + 1], ee[r]) && r++, !at(e, n, ee[r])); ) (ee[t] = ee[r]), (t = r), (r <<= 1);
                ee[t] = n;
            },
            gt = function (e) {
                var t,
                    n,
                    r,
                    o,
                    i,
                    a,
                    s = e.dyn_tree,
                    u = e.extra_bits,
                    l = e.extra_base,
                    c = e.max_code,
                    d = e.max_length,
                    f = e.static_tree,
                    m = 0;
                for (o = 0; xe >= o; o++) Q[o] = 0;
                for (s[ee[ne]].dl = 0, t = ne + 1; Pe > t; t++)
                    (n = ee[t]), (o = s[s[n].dl].dl + 1), o > d && ((o = d), m++), (s[n].dl = o), n > c || (Q[o]++, (i = 0), n >= l && (i = u[n - l]), (a = s[n].fc), (pe += a * (o + i)), null != f && (he += a * (f[n].dl + i)));
                if (0 != m) {
                    do {
                        for (o = d - 1; 0 == Q[o]; ) o--;
                        Q[o]--, (Q[o + 1] += 2), Q[d]--, (m -= 2);
                    } while (m > 0);
                    for (o = d; 0 != o; o--) for (n = Q[o]; 0 != n; ) (r = ee[--t]), r > c || (s[r].dl != o && ((pe += (o - s[r].dl) * s[r].fc), (s[r].fc = o)), n--);
                }
            },
            wt = function (e, t) {
                var n,
                    r,
                    o = new Array(xe + 1),
                    i = 0;
                for (n = 1; xe >= n; n++) (i = (i + Q[n - 1]) << 1), (o[n] = i);
                for (r = 0; t >= r; r++) {
                    var a = e[r].dl;
                    0 != a && (e[r].fc = Mt(o[a]++, a));
                }
            },
            It = function (e) {
                var t,
                    n,
                    r = e.dyn_tree,
                    o = e.static_tree,
                    i = e.elems,
                    a = -1,
                    s = i;
                for (te = 0, ne = Pe, t = 0; i > t; t++) 0 != r[t].fc ? ((ee[++te] = a = t), (re[t] = 0)) : (r[t].dl = 0);
                for (; 2 > te; ) {
                    var u = (ee[++te] = 2 > a ? ++a : 0);
                    (r[u].fc = 1), (re[u] = 0), pe--, null != o && (he -= o[u].dl);
                }
                for (e.max_code = a, t = te >> 1; t >= 1; t--) bt(r, t);
                do
                    (t = ee[ke]),
                        (ee[ke] = ee[te--]),
                        bt(r, ke),
                        (n = ee[ke]),
                        (ee[--ne] = t),
                        (ee[--ne] = n),
                        (r[s].fc = r[t].fc + r[n].fc),
                        re[t] > re[n] + 1 ? (re[s] = re[t]) : (re[s] = re[n] + 1),
                        (r[t].dl = r[n].dl = s),
                        (ee[ke] = s++),
                        bt(r, ke);
                while (te >= 2);
                (ee[--ne] = ee[ke]), gt(e), wt(r, a);
            },
            Et = function (e, t) {
                var n,
                    r,
                    o = -1,
                    i = e[0].dl,
                    a = 0,
                    s = 7,
                    u = 4;
                for (0 == i && ((s = 138), (u = 3)), e[t + 1].dl = 65535, n = 0; t >= n; n++)
                    (r = i),
                        (i = e[n + 1].dl),
                        (++a < s && r == i) ||
                            (u > a ? (G[r].fc += a) : 0 != r ? (r != o && G[r].fc++, G[Ne].fc++) : 10 >= a ? G[Re].fc++ : G[je].fc++, (a = 0), (o = r), 0 == i ? ((s = 138), (u = 3)) : r == i ? ((s = 6), (u = 3)) : ((s = 7), (u = 4)));
            },
            Ut = function (e, t) {
                var n,
                    r,
                    o = -1,
                    i = e[0].dl,
                    a = 0,
                    s = 7,
                    u = 4;
                for (0 == i && ((s = 138), (u = 3)), n = 0; t >= n; n++)
                    if (((r = i), (i = e[n + 1].dl), !(++a < s && r == i))) {
                        if (u > a) {
                            do ot(r, G);
                            while (0 != --a);
                        } else 0 != r ? (r != o && (ot(r, G), a--), ot(Ne, G), St(a - 3, 2)) : 10 >= a ? (ot(Re, G), St(a - 3, 3)) : (ot(je, G), St(a - 11, 7));
                        (a = 0), (o = r), 0 == i ? ((s = 138), (u = 3)) : r == i ? ((s = 6), (u = 3)) : ((s = 7), (u = 4));
                    }
            },
            Tt = function () {
                var e;
                for (Et(K, $.max_code), Et(J, V.max_code), It(Z), e = De - 1; e >= 3 && 0 == G[Ye[e]].dl; e--);
                return (pe += 3 * (e + 1) + 5 + 5 + 4), e;
            },
            At = function (e, t, n) {
                var r;
                for (St(e - 257, 5), St(t - 1, 5), St(n - 4, 4), r = 0; n > r; r++) St(G[Ye[r]].dl, 3);
                Ut(K, e - 1), Ut(J, t - 1);
            },
            kt = function (e) {
                var t, i, a, s;
                if (((s = R - _), (ue[de] = fe), It($), It(V), (a = Tt()), (t = (pe + 3 + 7) >> 3), (i = (he + 3 + 7) >> 3), t >= i && (t = i), t >= s + 4 && _ >= 0)) {
                    var u;
                    for (St((n << 1) + e, 3), Ct(), nt(s), nt(~s), u = 0; s > u; u++) tt(U[_ + u]);
                } else i == t ? (St((r << 1) + e, 3), Ot(X, Y)) : (St((o << 1) + e, 3), At($.max_code + 1, V.max_code + 1, a + 1), Ot(K, J));
                vt(), 0 != e && Ct();
            },
            xt = function (e, t) {
                if (((A[le++] = t), 0 == e ? K[t].fc++ : (e--, K[oe[t] + Se + 1].fc++, J[it(e)].fc++, (T[ce++] = e), (fe |= me)), (me <<= 1), 0 == (7 & le) && ((ue[de++] = fe), (fe = 0), (me = 1)), F > 2 && 0 == (4095 & le))) {
                    var n,
                        r = 8 * le,
                        o = R - _;
                    for (n = 0; Le > n; n++) r += J[n].fc * (5 + Je[n]);
                    if (((r >>= 3), ce < parseInt(le / 2) && r < parseInt(o / 2))) return !0;
                }
                return le == p - 1 || ce == be;
            },
            Ot = function (e, t) {
                var n,
                    r,
                    o,
                    i,
                    a = 0,
                    s = 0,
                    u = 0,
                    l = 0;
                if (0 != le)
                    do
                        0 == (7 & a) && (l = ue[u++]),
                            (r = 255 & A[a++]),
                            0 == (1 & l) ? ot(r, e) : ((o = oe[r]), ot(o + Se + 1, e), (i = Ke[o]), 0 != i && ((r -= ae[o]), St(r, i)), (n = T[s++]), (o = it(n)), ot(o, t), (i = Je[o]), 0 != i && ((n -= se[o]), St(n, i))),
                            (l >>= 1);
                    while (le > a);
                ot(Me, e);
            },
            _t = 16,
            St = function (e, t) {
                O > _t - t ? ((x |= e << O), nt(x), (x = e >> (_t - O)), (O += t - _t)) : ((x |= e << O), (O += t));
            },
            Mt = function (e, t) {
                var n = 0;
                do (n |= 1 & e), (e >>= 1), (n <<= 1);
                while (--t > 0);
                return n >> 1;
            },
            Ct = function () {
                O > 8 ? nt(x) : O > 0 && tt(x), (x = 0), (O = 0);
            },
            Lt = function () {
                if (0 != w) {
                    var e, t;
                    for (e = Ze(), null == v ? (v = b = e) : (b = b.next = e), e.len = w - I, t = 0; t < e.len; t++) e.ptr[t] = qe[I + t];
                    w = I = 0;
                }
            },
            Dt = function (e, t) {
                var n, r;
                (ye = e), (ve = 0), "undefined" == typeof t && (t = i), $e(t);
                for (var o = new Array(1024), a = []; (n = pt(o, 0, o.length)) > 0; ) {
                    var s = new Array(n);
                    for (r = 0; n > r; r++) s[r] = String.fromCharCode(o[r]);
                    a[a.length] = s.join("");
                }
                return (ye = null), a.join("");
            };
        e.RawDeflate || (e.RawDeflate = {}), (e.RawDeflate.deflate = Dt);
    })(this),
    (function (e) {
        var t,
            n,
            r,
            o,
            i,
            a,
            s,
            u,
            l,
            c,
            d,
            f,
            m,
            p,
            h,
            y,
            v,
            b = 32768,
            g = 0,
            w = 9,
            I = 6,
            E = null,
            U = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535),
            T = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0),
            A = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99),
            k = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577),
            x = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13),
            O = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15),
            _ = function () {
                (this.next = null), (this.list = null);
            },
            S = function () {
                (this.e = 0), (this.b = 0), (this.n = 0), (this.t = null);
            },
            M = function (e, t, n, r, o, i) {
                (this.BMAX = 16), (this.N_MAX = 288), (this.status = 0), (this.root = null), (this.m = 0);
                var a,
                    s,
                    u,
                    l,
                    c,
                    d,
                    f,
                    m,
                    p,
                    h,
                    y,
                    v,
                    b,
                    g,
                    w,
                    I,
                    E,
                    U = new Array(this.BMAX + 1),
                    T = new Array(this.BMAX + 1),
                    A = new S(),
                    k = new Array(this.BMAX),
                    x = new Array(this.N_MAX),
                    O = new Array(this.BMAX + 1);
                for (E = this.root = null, d = 0; d < U.length; d++) U[d] = 0;
                for (d = 0; d < T.length; d++) T[d] = 0;
                for (d = 0; d < k.length; d++) k[d] = null;
                for (d = 0; d < x.length; d++) x[d] = 0;
                for (d = 0; d < O.length; d++) O[d] = 0;
                (s = t > 256 ? e[256] : this.BMAX), (p = e), (h = 0), (d = t);
                do U[p[h]]++, h++;
                while (--d > 0);
                if (U[0] == t) return (this.root = null), (this.m = 0), void (this.status = 0);
                for (f = 1; f <= this.BMAX && 0 == U[f]; f++);
                for (m = f, f > i && (i = f), d = this.BMAX; 0 != d && 0 == U[d]; d--);
                for (l = d, i > d && (i = d), g = 1 << f; d > f; f++, g <<= 1) if ((g -= U[f]) < 0) return (this.status = 2), void (this.m = i);
                if ((g -= U[d]) < 0) return (this.status = 2), void (this.m = i);
                for (U[d] += g, O[1] = f = 0, p = U, h = 1, b = 2; --d > 0; ) O[b++] = f += p[h++];
                (p = e), (h = 0), (d = 0);
                do 0 != (f = p[h++]) && (x[O[f]++] = d);
                while (++d < t);
                for (t = O[l], O[0] = d = 0, p = x, h = 0, c = -1, v = T[0] = 0, y = null, w = 0; l >= m; m++)
                    for (a = U[m]; a-- > 0; ) {
                        for (; m > v + T[1 + c]; ) {
                            if (((v += T[1 + c]), c++, (w = (w = l - v) > i ? i : w), (u = 1 << (f = m - v)) > a + 1)) for (u -= a + 1, b = m; ++f < w && !((u <<= 1) <= U[++b]); ) u -= U[b];
                            for (v + f > s && s > v && (f = s - v), w = 1 << f, T[1 + c] = f, y = new Array(w), I = 0; w > I; I++) y[I] = new S();
                            (E = null == E ? (this.root = new _()) : (E.next = new _())),
                                (E.next = null),
                                (E.list = y),
                                (k[c] = y),
                                c > 0 && ((O[c] = d), (A.b = T[c]), (A.e = 16 + f), (A.t = y), (f = (d & ((1 << v) - 1)) >> (v - T[c])), (k[c - 1][f].e = A.e), (k[c - 1][f].b = A.b), (k[c - 1][f].n = A.n), (k[c - 1][f].t = A.t));
                        }
                        for (A.b = m - v, h >= t ? (A.e = 99) : p[h] < n ? ((A.e = p[h] < 256 ? 16 : 15), (A.n = p[h++])) : ((A.e = o[p[h] - n]), (A.n = r[p[h++] - n])), u = 1 << (m - v), f = d >> v; w > f; f += u)
                            (y[f].e = A.e), (y[f].b = A.b), (y[f].n = A.n), (y[f].t = A.t);
                        for (f = 1 << (m - 1); 0 != (d & f); f >>= 1) d ^= f;
                        for (d ^= f; (d & ((1 << v) - 1)) != O[c]; ) (v -= T[c]), c--;
                    }
                (this.m = T[1]), (this.status = 0 != g && 1 != l ? 1 : 0);
            },
            C = function () {
                return y.length == v ? -1 : 255 & y.charCodeAt(v++);
            },
            L = function (e) {
                for (; e > s; ) (a |= C() << s), (s += 8);
            },
            D = function (e) {
                return a & U[e];
            },
            N = function (e) {
                (a >>= e), (s -= e);
            },
            R = function (e, r, o) {
                var i, a, s;
                if (0 == o) return 0;
                for (s = 0; ; ) {
                    for (L(p), a = f.list[D(p)], i = a.e; i > 16; ) {
                        if (99 == i) return -1;
                        N(a.b), (i -= 16), L(i), (a = a.t[D(i)]), (i = a.e);
                    }
                    if ((N(a.b), 16 != i)) {
                        if (15 == i) break;
                        for (L(i), c = a.n + D(i), N(i), L(h), a = m.list[D(h)], i = a.e; i > 16; ) {
                            if (99 == i) return -1;
                            N(a.b), (i -= 16), L(i), (a = a.t[D(i)]), (i = a.e);
                        }
                        for (N(a.b), L(i), d = n - a.n - D(i), N(i); c > 0 && o > s; ) c--, (d &= b - 1), (n &= b - 1), (e[r + s++] = t[n++] = t[d++]);
                        if (s == o) return o;
                    } else if (((n &= b - 1), (e[r + s++] = t[n++] = a.n), s == o)) return o;
                }
                return (u = -1), s;
            },
            j = function (e, r, o) {
                var i;
                if (((i = 7 & s), N(i), L(16), (i = D(16)), N(16), L(16), i != (65535 & ~a))) return -1;
                for (N(16), c = i, i = 0; c > 0 && o > i; ) c--, (n &= b - 1), L(8), (e[r + i++] = t[n++] = D(8)), N(8);
                return 0 == c && (u = -1), i;
            },
            P = function (e, t, n) {
                if (null == E) {
                    var a,
                        s,
                        u = new Array(288);
                    for (a = 0; 144 > a; a++) u[a] = 8;
                    for (; 256 > a; a++) u[a] = 9;
                    for (; 280 > a; a++) u[a] = 7;
                    for (; 288 > a; a++) u[a] = 8;
                    if (((o = 7), (s = new M(u, 288, 257, T, A, o)), 0 != s.status)) return alert("HufBuild error: " + s.status), -1;
                    for (E = s.root, o = s.m, a = 0; 30 > a; a++) u[a] = 5;
                    if (((i = 5), (s = new M(u, 30, 0, k, x, i)), s.status > 1)) return (E = null), alert("HufBuild error: " + s.status), -1;
                    (r = s.root), (i = s.m);
                }
                return (f = E), (m = r), (p = o), (h = i), R(e, t, n);
            },
            B = function (e, t, n) {
                var r,
                    o,
                    i,
                    a,
                    s,
                    u,
                    l,
                    c,
                    d,
                    y = new Array(316);
                for (r = 0; r < y.length; r++) y[r] = 0;
                if ((L(5), (l = 257 + D(5)), N(5), L(5), (c = 1 + D(5)), N(5), L(4), (u = 4 + D(4)), N(4), l > 286 || c > 30)) return -1;
                for (o = 0; u > o; o++) L(3), (y[O[o]] = D(3)), N(3);
                for (; 19 > o; o++) y[O[o]] = 0;
                if (((p = 7), (d = new M(y, 19, 19, null, null, p)), 0 != d.status)) return -1;
                for (f = d.root, p = d.m, a = l + c, r = i = 0; a > r; )
                    if ((L(p), (s = f.list[D(p)]), (o = s.b), N(o), (o = s.n), 16 > o)) y[r++] = i = o;
                    else if (16 == o) {
                        if ((L(2), (o = 3 + D(2)), N(2), r + o > a)) return -1;
                        for (; o-- > 0; ) y[r++] = i;
                    } else if (17 == o) {
                        if ((L(3), (o = 3 + D(3)), N(3), r + o > a)) return -1;
                        for (; o-- > 0; ) y[r++] = 0;
                        i = 0;
                    } else {
                        if ((L(7), (o = 11 + D(7)), N(7), r + o > a)) return -1;
                        for (; o-- > 0; ) y[r++] = 0;
                        i = 0;
                    }
                if (((p = w), (d = new M(y, l, 257, T, A, p)), 0 == p && (d.status = 1), 0 != d.status)) return 1 == d.status, -1;
                for (f = d.root, p = d.m, r = 0; c > r; r++) y[r] = y[r + l];
                return (h = I), (d = new M(y, c, 0, k, x, h)), (m = d.root), (h = d.m), 0 == h && l > 257 ? -1 : (1 == d.status, 0 != d.status ? -1 : R(e, t, n));
            },
            q = function () {
                null == t && (t = new Array(2 * b)), (n = 0), (a = 0), (s = 0), (u = -1), (l = !1), (c = d = 0), (f = null);
            },
            z = function (e, r, o) {
                var i, a;
                for (i = 0; o > i; ) {
                    if (l && -1 == u) return i;
                    if (c > 0) {
                        if (u != g) for (; c > 0 && o > i; ) c--, (d &= b - 1), (n &= b - 1), (e[r + i++] = t[n++] = t[d++]);
                        else {
                            for (; c > 0 && o > i; ) c--, (n &= b - 1), L(8), (e[r + i++] = t[n++] = D(8)), N(8);
                            0 == c && (u = -1);
                        }
                        if (i == o) return i;
                    }
                    if (-1 == u) {
                        if (l) break;
                        L(1), 0 != D(1) && (l = !0), N(1), L(2), (u = D(2)), N(2), (f = null), (c = 0);
                    }
                    switch (u) {
                        case 0:
                            a = j(e, r + i, o - i);
                            break;
                        case 1:
                            a = null != f ? R(e, r + i, o - i) : P(e, r + i, o - i);
                            break;
                        case 2:
                            a = null != f ? R(e, r + i, o - i) : B(e, r + i, o - i);
                            break;
                        default:
                            a = -1;
                    }
                    if (-1 == a) return l ? 0 : -1;
                    i += a;
                }
                return i;
            },
            F = function (e) {
                var t, n;
                q(), (y = e), (v = 0);
                for (var r = new Array(1024), o = []; (t = z(r, 0, r.length)) > 0; ) {
                    var i = new Array(t);
                    for (n = 0; t > n; n++) i[n] = String.fromCharCode(r[n]);
                    o[o.length] = i.join("");
                }
                return (y = null), o.join("");
            };
        e.RawDeflate || (e.RawDeflate = {}), (e.RawDeflate.inflate = F);
    })(this),
    "object" != typeof JSON && (JSON = {}),
    (function () {
        "use strict";
        function f(e) {
            return 10 > e ? "0" + e : e;
        }
        function this_value() {
            return this.valueOf();
        }
        function quote(e) {
            return (
                (escapable.lastIndex = 0),
                escapable.test(e)
                    ? '"' +
                      e.replace(escapable, function (e) {
                          var t = meta[e];
                          return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                      }) +
                      '"'
                    : '"' + e + '"'
            );
        }
        function str(e, t) {
            var n,
                r,
                o,
                i,
                a,
                s = gap,
                u = t[e];
            switch ((u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u)) {
                case "string":
                    return quote(u);
                case "number":
                    return isFinite(u) ? String(u) : "null";
                case "boolean":
                case "null":
                    return String(u);
                case "object":
                    if (!u) return "null";
                    if (((gap += indent), (a = []), "[object Array]" === Object.prototype.toString.apply(u))) {
                        for (i = u.length, n = 0; i > n; n += 1) a[n] = str(n, u) || "null";
                        return (o = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]"), (gap = s), o;
                    }
                    if (rep && "object" == typeof rep) for (i = rep.length, n = 0; i > n; n += 1) "string" == typeof rep[n] && ((r = rep[n]), (o = str(r, u)), o && a.push(quote(r) + (gap ? ": " : ":") + o));
                    else for (r in u) Object.prototype.hasOwnProperty.call(u, r) && ((o = str(r, u)), o && a.push(quote(r) + (gap ? ": " : ":") + o));
                    return (o = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}"), (gap = s), o;
            }
        }
        "function" != typeof Date.prototype.toJSON &&
            ((Date.prototype.toJSON = function () {
                return isFinite(this.valueOf())
                    ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
                    : null;
            }),
            (Boolean.prototype.toJSON = this_value),
            (Number.prototype.toJSON = this_value),
            (String.prototype.toJSON = this_value));
        var cx, escapable, gap, indent, meta, rep;
        "function" != typeof JSON.stringify &&
            ((escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
            (meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }),
            (JSON.stringify = function (e, t, n) {
                var r;
                if (((gap = ""), (indent = ""), "number" == typeof n)) for (r = 0; n > r; r += 1) indent += " ";
                else "string" == typeof n && (indent = n);
                if (((rep = t), t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))) throw new Error("JSON.stringify");
                return str("", { "": e });
            })),
            "function" != typeof JSON.parse &&
                ((cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
                (JSON.parse = function (text, reviver) {
                    function walk(e, t) {
                        var n,
                            r,
                            o = e[t];
                        if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && ((r = walk(o, n)), void 0 !== r ? (o[n] = r) : delete o[n]);
                        return reviver.call(e, t, o);
                    }
                    var j;
                    if (
                        ((text = String(text)),
                        (cx.lastIndex = 0),
                        cx.test(text) &&
                            (text = text.replace(cx, function (e) {
                                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                            })),
                        /^[\],:{}\s]*$/.test(
                            text
                                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                        ))
                    )
                        return (j = eval("(" + text + ")")), "function" == typeof reviver ? walk({ "": j }, "") : j;
                    throw new SyntaxError("JSON.parse");
                }));
    })();
var saveAs =
    saveAs ||
    ("undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator)) ||
    (function (e) {
        "use strict";
        if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
            var t = e.document,
                n = function () {
                    return e.URL || e.webkitURL || e;
                },
                r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                o = !e.externalHost && "download" in r,
                i = function (n) {
                    var r = t.createEvent("MouseEvents");
                    r.initMouseEvent("click", !0, !1, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(r);
                },
                a = e.webkitRequestFileSystem,
                s = e.requestFileSystem || a || e.mozRequestFileSystem,
                u = function (t) {
                    (e.setImmediate || e.setTimeout)(function () {
                        throw t;
                    }, 0);
                },
                l = "application/octet-stream",
                c = 0,
                d = [],
                f = function () {
                    for (var e = d.length; e--; ) {
                        var t = d[e];
                        "string" == typeof t ? n().revokeObjectURL(t) : t.remove();
                    }
                    d.length = 0;
                },
                m = function (e, t, n) {
                    t = [].concat(t);
                    for (var r = t.length; r--; ) {
                        var o = e["on" + t[r]];
                        if ("function" == typeof o)
                            try {
                                o.call(e, n || e);
                            } catch (i) {
                                u(i);
                            }
                    }
                },
                p = function (t, u) {
                    var f,
                        p,
                        h,
                        y = this,
                        v = t.type,
                        b = !1,
                        g = function () {
                            var e = n().createObjectURL(t);
                            return d.push(e), e;
                        },
                        w = function () {
                            m(y, "writestart progress write writeend".split(" "));
                        },
                        I = function () {
                            (!b && f) || (f = g(t)), p ? (p.location.href = f) : window.open(f, "_blank"), (y.readyState = y.DONE), w();
                        },
                        E = function (e) {
                            return function () {
                                return y.readyState !== y.DONE ? e.apply(this, arguments) : void 0;
                            };
                        },
                        U = { create: !0, exclusive: !1 };
                    return (
                        (y.readyState = y.INIT),
                        u || (u = "download"),
                        o
                            ? ((f = g(t)), (r.href = f), (r.download = u), i(r), (y.readyState = y.DONE), void w())
                            : (e.chrome && v && v !== l && ((h = t.slice || t.webkitSlice), (t = h.call(t, 0, t.size, l)), (b = !0)),
                              a && "download" !== u && (u += ".download"),
                              (v === l || a) && (p = e),
                              s
                                  ? ((c += t.size),
                                    void s(
                                        e.TEMPORARY,
                                        c,
                                        E(function (e) {
                                            e.root.getDirectory(
                                                "saved",
                                                U,
                                                E(function (e) {
                                                    var n = function () {
                                                        e.getFile(
                                                            u,
                                                            U,
                                                            E(function (e) {
                                                                e.createWriter(
                                                                    E(function (n) {
                                                                        (n.onwriteend = function (t) {
                                                                            (p.location.href = e.toURL()), d.push(e), (y.readyState = y.DONE), m(y, "writeend", t);
                                                                        }),
                                                                            (n.onerror = function () {
                                                                                var e = n.error;
                                                                                e.code !== e.ABORT_ERR && I();
                                                                            }),
                                                                            "writestart progress write abort".split(" ").forEach(function (e) {
                                                                                n["on" + e] = y["on" + e];
                                                                            }),
                                                                            n.write(t),
                                                                            (y.abort = function () {
                                                                                n.abort(), (y.readyState = y.DONE);
                                                                            }),
                                                                            (y.readyState = y.WRITING);
                                                                    }),
                                                                    I
                                                                );
                                                            }),
                                                            I
                                                        );
                                                    };
                                                    e.getFile(
                                                        u,
                                                        { create: !1 },
                                                        E(function (e) {
                                                            e.remove(), n();
                                                        }),
                                                        E(function (e) {
                                                            e.code === e.NOT_FOUND_ERR ? n() : I();
                                                        })
                                                    );
                                                }),
                                                I
                                            );
                                        }),
                                        I
                                    ))
                                  : void I())
                    );
                },
                h = p.prototype,
                y = function (e, t) {
                    return new p(e, t);
                };
            return (
                (h.abort = function () {
                    var e = this;
                    (e.readyState = e.DONE), m(e, "abort");
                }),
                (h.readyState = h.INIT = 0),
                (h.WRITING = 1),
                (h.DONE = 2),
                (h.error = h.onwritestart = h.onprogress = h.onwrite = h.onabort = h.onerror = h.onwriteend = null),
                e.addEventListener("unload", f, !1),
                (y.unload = function () {
                    f(), e.removeEventListener("unload", f, !1);
                }),
                y
            );
        }
    })(("undefined" != typeof self && self) || ("undefined" != typeof window && window) || this.content);
"undefined" != typeof module && null !== module
    ? (module.exports = saveAs)
    : "undefined" != typeof define &&
      null !== define &&
      null != define.amd &&
      define([], function () {
          return saveAs;
      }),
    (String.prototype.endsWithAny = function () {
        for (var e = Array.prototype.slice.call(arguments), t = this.toLowerCase().toString(), n = 0; n < e.length; n++) if (-1 !== t.indexOf(e[n], t.length - e[n].length)) return !0;
        return !1;
    });
var saveTextAs =
    saveTextAs ||
    function (e, t, n) {
        if (((t = t || "download.txt"), (n = n || "utf-8"), (e = (e || "").replace(/\r?\n/g, "\r\n")), saveAs && Blob)) {
            var r = new Blob([e], { type: "text/plain;charset=" + n });
            return saveAs(r, t), !0;
        }
        var o = window.frames.saveTxtWindow;
        if (
            !o &&
            ((o = document.createElement("iframe")),
            (o.id = "saveTxtWindow"),
            (o.style.display = "none"),
            document.body.insertBefore(o, null),
            (o = window.frames.saveTxtWindow),
            !o && ((o = window.open("", "_temp", "width=100,height=100")), !o))
        )
            return window.alert("Sorry, download file could not be created."), !1;
        var i = o.document;
        i.open("text/plain", "replace"), (i.charset = n), t.endsWithAny(".htm", ".html") ? (i.close(), (i.body.innerHTML = "\r\n" + e + "\r\n")) : (t.endsWithAny(".txt") || (t += ".txt"), i.write(e), i.close());
        var a = i.execCommand("SaveAs", null, t);
        return o.close(), a;
    };
!(function (e) {
    "use strict";
    if (((e.URL = e.URL || e.webkitURL), e.Blob && e.URL))
        try {
            return void new Blob();
        } catch (t) {}
    var n =
        e.BlobBuilder ||
        e.WebKitBlobBuilder ||
        e.MozBlobBuilder ||
        (function (e) {
            var t = function (e) {
                    return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1];
                },
                n = function () {
                    this.data = [];
                },
                r = function (e, t, n) {
                    (this.data = e), (this.size = e.length), (this.type = t), (this.encoding = n);
                },
                o = n.prototype,
                i = r.prototype,
                a = e.FileReaderSync,
                s = function (e) {
                    this.code = this[(this.name = e)];
                },
                u = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
                l = u.length,
                c = e.URL || e.webkitURL || e,
                d = c.createObjectURL,
                f = c.revokeObjectURL,
                m = c,
                p = e.btoa,
                h = e.atob,
                y = e.ArrayBuffer,
                v = e.Uint8Array,
                b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
            for (r.fake = i.fake = !0; l--; ) s.prototype[u[l]] = l + 1;
            return (
                c.createObjectURL ||
                    (m = e.URL = function (e) {
                        var t,
                            n = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                        return (n.href = e), "origin" in n || ("data:" === n.protocol.toLowerCase() ? (n.origin = null) : ((t = e.match(b)), (n.origin = t && t[1]))), n;
                    }),
                (m.createObjectURL = function (e) {
                    var t,
                        n = e.type;
                    return (
                        null === n && (n = "application/octet-stream"),
                        e instanceof r
                            ? ((t = "data:" + n), "base64" === e.encoding ? t + ";base64," + e.data : "URI" === e.encoding ? t + "," + decodeURIComponent(e.data) : p ? t + ";base64," + p(e.data) : t + "," + encodeURIComponent(e.data))
                            : d
                            ? d.call(c, e)
                            : void 0
                    );
                }),
                (m.revokeObjectURL = function (e) {
                    "data:" !== e.substring(0, 5) && f && f.call(c, e);
                }),
                (o.append = function (e) {
                    var n = this.data;
                    if (v && (e instanceof y || e instanceof v)) {
                        for (var o = "", i = new v(e), u = 0, l = i.length; l > u; u++) o += String.fromCharCode(i[u]);
                        n.push(o);
                    } else if ("Blob" === t(e) || "File" === t(e)) {
                        if (!a) throw new s("NOT_READABLE_ERR");
                        var c = new a();
                        n.push(c.readAsBinaryString(e));
                    } else
                        e instanceof r
                            ? "base64" === e.encoding && h
                                ? n.push(h(e.data))
                                : "URI" === e.encoding
                                ? n.push(decodeURIComponent(e.data))
                                : "raw" === e.encoding && n.push(e.data)
                            : ("string" != typeof e && (e += ""), n.push(unescape(encodeURIComponent(e))));
                }),
                (o.getBlob = function (e) {
                    return arguments.length || (e = null), new r(this.data.join(""), e, "raw");
                }),
                (o.toString = function () {
                    return "[object BlobBuilder]";
                }),
                (i.slice = function (e, t, n) {
                    var o = arguments.length;
                    return 3 > o && (n = null), new r(this.data.slice(e, o > 1 ? t : this.data.length), n, this.encoding);
                }),
                (i.toString = function () {
                    return "[object Blob]";
                }),
                (i.close = function () {
                    (this.size = 0), delete this.data;
                }),
                n
            );
        })(e);
    e.Blob = function (e, t) {
        var r = t ? t.type || "" : "",
            o = new n();
        if (e) for (var i = 0, a = e.length; a > i; i++) Uint8Array && e[i] instanceof Uint8Array ? o.append(e[i].buffer) : o.append(e[i]);
        var s = o.getBlob(r);
        return !s.slice && s.webkitSlice && (s.slice = s.webkitSlice), s;
    };
    var r =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    e.Blob.prototype = r(new e.Blob());
})(("undefined" != typeof self && self) || ("undefined" != typeof window && window) || this.content || this),
    (function (e, t) {
        function n(n, l, c) {
            var m = [];
            l = 1 == l ? { entropy: !0 } : l || {};
            var b = a(i(l.entropy ? [n, u(e)] : null == n ? s() : n, 3), m),
                g = new r(m),
                w = function () {
                    for (var e = g.g(f), t = h, n = 0; y > e; ) (e = (e + n) * d), (t *= d), (n = g.g(1));
                    for (; e >= v; ) (e /= 2), (t /= 2), (n >>>= 1);
                    return (e + n) / t;
                };
            return (
                (w.int32 = function () {
                    return 0 | g.g(4);
                }),
                (w.quick = function () {
                    return g.g(4) / (4 * (1 << 30));
                }),
                (w["double"] = w),
                a(u(g.S), e),
                (
                    l.pass ||
                    c ||
                    function (e, n, r, i) {
                        return (
                            i &&
                                (i.S && o(i, g),
                                (e.state = function () {
                                    return o(g, {});
                                })),
                            r ? ((t[p] = e), n) : e
                        );
                    }
                )(w, b, "global" in l ? l.global : this == t, l.state)
            );
        }
        function r(e) {
            var t,
                n = e.length,
                r = this,
                o = 0,
                i = (r.i = r.j = 0),
                a = (r.S = []);
            for (n || (e = [n++]); d > o; ) a[o] = o++;
            for (o = 0; d > o; o++) (a[o] = a[(i = b & (i + e[o % n] + (t = a[o])))]), (a[i] = t);
            (r.g = function (e) {
                for (var t, n = 0, o = r.i, i = r.j, a = r.S; e--; ) (t = a[(o = b & (o + 1))]), (n = n * d + a[b & ((a[o] = a[(i = b & (i + t))]) + (a[i] = t))]);
                return (r.i = o), (r.j = i), n;
            })(d);
        }
        function o(e, t) {
            return (t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t;
        }
        function i(e, t) {
            var n,
                r = [],
                o = typeof e;
            if (t && "object" == o)
                for (n in e)
                    try {
                        r.push(i(e[n], t - 1));
                    } catch (a) {}
            return r.length ? r : "string" == o ? e : e + "\x00";
        }
        function a(e, t) {
            for (var n, r = e + "", o = 0; o < r.length; ) t[b & o] = b & ((n ^= 19 * t[b & o]) + r.charCodeAt(o++));
            return u(t);
        }
        function s() {
            try {
                if (l) return u(l.randomBytes(d));
                var t = new Uint8Array(d);
                return c.crypto.getRandomValues(t), u(t);
            } catch (n) {
                var r = c.navigator,
                    o = r && r.plugins;
                return [+new Date(), c, o, c.screen, u(e)];
            }
        }
        function u(e) {
            return String.fromCharCode.apply(0, e);
        }
        var l,
            c = this,
            d = 256,
            f = 6,
            m = 52,
            p = "random",
            h = t.pow(d, f),
            y = t.pow(2, m),
            v = 2 * y,
            b = d - 1;
        if (((t["seed" + p] = n), a(t.random(), e), "object" == typeof module && module.exports)) {
            module.exports = n;
            try {
                l = require("crypto");
            } catch (g) {}
        } else
            "function" == typeof define &&
                define.amd &&
                define(function () {
                    return n;
                });
    })([], Math),
    Math.seedrandom("TestMyBrain"),
    (function (e, t) {
        "use strict";
        function n(e) {
            return (p[m] = r.apply(t, e)), m++;
        }
        function r(e) {
            var n = [].slice.call(arguments, 1);
            return function () {
                "function" == typeof e ? e.apply(t, n) : new Function("" + e)();
            };
        }
        function o(e) {
            if (h) setTimeout(r(o, e), 0);
            else {
                var t = p[e];
                if (t) {
                    h = !0;
                    try {
                        t();
                    } finally {
                        i(e), (h = !1);
                    }
                }
            }
        }
        function i(e) {
            delete p[e];
        }
        function a() {
            f = function () {
                var e = n(arguments);
                return process.nextTick(r(o, e)), e;
            };
        }
        function s() {
            if (e.postMessage && !e.importScripts) {
                var t = !0,
                    n = e.onmessage;
                return (
                    (e.onmessage = function () {
                        t = !1;
                    }),
                    e.postMessage("", "*"),
                    (e.onmessage = n),
                    t
                );
            }
        }
        function u() {
            var t = "setImmediate$" + Math.random() + "$",
                r = function (n) {
                    n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && o(+n.data.slice(t.length));
                };
            e.addEventListener ? e.addEventListener("message", r, !1) : e.attachEvent("onmessage", r),
                (f = function () {
                    var r = n(arguments);
                    return e.postMessage(t + r, "*"), r;
                });
        }
        function l() {
            var e = new MessageChannel();
            (e.port1.onmessage = function (e) {
                var t = e.data;
                o(t);
            }),
                (f = function () {
                    var t = n(arguments);
                    return e.port2.postMessage(t), t;
                });
        }
        function c() {
            var e = y.documentElement;
            f = function () {
                var t = n(arguments),
                    r = y.createElement("script");
                return (
                    (r.onreadystatechange = function () {
                        o(t), (r.onreadystatechange = null), e.removeChild(r), (r = null);
                    }),
                    e.appendChild(r),
                    t
                );
            };
        }
        function d() {
            f = function () {
                var e = n(arguments);
                return setTimeout(r(o, e), 0), e;
            };
        }
        if (!e.setImmediate) {
            var f,
                m = 1,
                p = {},
                h = !1,
                y = e.document,
                v = Object.getPrototypeOf && Object.getPrototypeOf(e);
            (v = v && v.setTimeout ? v : e),
                "[object process]" === {}.toString.call(e.process) ? a() : s() ? u() : e.MessageChannel ? l() : y && "onreadystatechange" in y.createElement("script") ? c() : d(),
                (v.setImmediate = f),
                (v.clearImmediate = i);
        }
    })(new Function("return this")()),
    Array.prototype.shuffle ||
        (Array.prototype.shuffle = function () {
            for (var e, t, n = this.length; n; e = parseInt(Math.random() * n), t = this[--n], this[n] = this[e], this[e] = t);
            return this;
        }),
    Array.prototype.random ||
        (Array.prototype.random = function () {
            return this[randInt(this.length)];
        }),
    Array.prototype.invoke ||
        (Array.prototype.invoke = function (e) {
            var t = this.length >>> 0;
            if ("function" != typeof e) throw new TypeError("Argument is not a function.", "Array.prototype.invoke");
            for (var n = arguments[1], r = [], o = 0; t > o; o++) o in this && r.push(e.call(n, this[o]));
            return r;
        }),
    Array.prototype.pluck ||
        (Array.prototype.pluck = function (e) {
            "use strict";
            if (!e || "string" != typeof e) throw new TypeError("Argument must be a string.");
            return this.map(function (t) {
                var n;
                return (n = void 0 !== t[e] ? ("function" == typeof t[e] ? t[e]() : t[e]) : void 0);
            });
        }),
    Array.prototype.unique ||
        (Array.prototype.unique = function () {
            "use strict";
            return this.reduce(function (e, t) {
                return -1 === e.indexOf(t) && e.push(t), e;
            }, []);
        }),
    Array.prototype.includes ||
        (Array.prototype.includes = function (e) {
            "use strict";
            var t = Object(this),
                n = parseInt(t.length) || 0;
            if (0 === n) return !1;
            var r,
                o = parseInt(arguments[1]) || 0;
            o >= 0 ? (r = o) : ((r = n + o), 0 > r && (r = 0));
            for (var i; n > r; ) {
                if (((i = t[r]), e === i || (e !== e && i !== i))) return !0;
                r++;
            }
            return !1;
        }),
    Array.prototype.contains || (Array.prototype.contains = Array.prototype.includes),
    Array.prototype.fill ||
        (Array.prototype.fill = function (e) {
            if (null == this) throw new TypeError("'this' is null or not defined");
            for (
                var t = Object(this), n = t.length >>> 0, r = arguments[1], o = r >> 0, i = 0 > o ? Math.max(n + o, 0) : Math.min(o, n), a = arguments[2], s = void 0 === a ? n : a >> 0, u = 0 > s ? Math.max(n + s, 0) : Math.min(s, n);
                u > i;

            )
                (t[i] = e), i++;
            return t;
        }),
    Array.prototype.flatten ||
        (Array.prototype.flatten = function e() {
            for (var t = [], n = 0, r = this.length; r > n; n++) {
                var o = Object.prototype.toString.call(this[n]).split(" ").pop().split("]").shift().toLowerCase();
                o && (t = t.concat(/^(array|collection|arguments)$/.test(o) ? e.call(this[n]) : this[n]));
            }
            return t;
        }),
    Array.prototype.partition ||
        (Array.prototype.partition = function (e) {
            if ("function" != typeof e) throw new TypeError("Argument of Array.prototype.partition must be a function.");
            for (var t, n = [], r = [], o = 0, i = this.length; i > o; o++) (t = this[o]), e(t) ? n.push(t) : r.push(t);
            return [n, r];
        }),
    Array.prototype.zip ||
        (Array.prototype.zip = function (e) {
            var t = [];
            if (e.length != this.length) throw new TypeError("Array.prototype.zip: arrays must be equal length");
            for (var n = 0, r = this.length; r > n; n++) t.push([this[n], e[n]]);
            return t;
        }),
    Array.prototype.sum ||
        (Array.prototype.sum = function () {
            for (var e = this.length, t = 0; e--; ) t += this[e];
            return t;
        }),
    Array.prototype.average ||
        (Array.prototype.average = function () {
            return this.length ? this.sum() / this.length : null;
        }),
    Array.prototype.variance ||
        (Array.prototype.variance = function () {
            if (!this.length) return null;
            var e,
                t,
                n,
                r,
                o = 0,
                i = 0;
            for (t = this.average(), n = this.length, e = 0; n > e; e++) (r = this[e] - t), (o += r * r), (i += r);
            return (i *= i / n), (o - i) / (n - 1);
        }),
    Array.prototype.sd ||
        (Array.prototype.sd = function () {
            if (!this.length) return null;
            var e = this.variance();
            return Math.sqrt(e);
        }),
    Array.prototype.median ||
        (Array.prototype.median = function () {
            if (!this.length) return null;
            var e = this.slice(),
                t = Math.floor(e.length / 2);
            return (
                e.sort(function (e, t) {
                    return e - t;
                }),
                e.length % 2 == 1 ? e[t] : (e[t - 1] + e[t]) / 2
            );
        });
var tmbObjs = { params: {}, elements: {}, frames: {}, slides: {} };
tmbObjs.params = location.href.split("?")[1]
    ? location.href
          .split("?")[1]
          .split("&")
          .reduce(function (e, t) {
              return (e[t.split("=")[0]] = t.split("=")[1]), e;
          }, {})
    : {};
var zen = tmbObjs,
    hasTouch = "ontouchend" in window || navigator.maxTouchPoints || navigator.msMaxTouchPoints,
    hasPointer = window.PointerEvent || window.MSPointerEvent;
!(function () {
    for (
        var e,
            t = function () {},
            n = [
                "assert",
                "clear",
                "count",
                "debug",
                "dir",
                "dirxml",
                "error",
                "exception",
                "group",
                "groupCollapsed",
                "groupEnd",
                "info",
                "log",
                "markTimeline",
                "profile",
                "profileEnd",
                "table",
                "time",
                "timeEnd",
                "timeline",
                "timelineEnd",
                "timeStamp",
                "trace",
                "warn",
            ],
            r = n.length,
            o = (window.console = window.console || {});
        r--;

    )
        (e = n[r]), o[e] || (o[e] = t);
})(),
    (function () {
        for (var e = -1, t = 0, n = document.cookie.split(";"); t < n.length; t++) {
            for (var r = n[t]; " " == r.charAt(0); ) r = r.substring(1, r.length);
            0 == r.indexOf("r=") && (e = r.substring(2, r.length));
        }
        document.cookie = "r=" + (parseInt(e) + 1) + "; expires=Sun, 12 Jan 2031 18:22:31 GMT; path=/";
    })(),
    (function () {
        var e, t;
        document.createElement &&
            (e = document.createElement("div")) &&
            ((e.id = "____loading_slide"),
            (e.style.display = "none"),
            (e.style.textAlign = "center"),
            (e.style.paddingTop = "40px"),
            (e.style.fontWeight = "bold"),
            (e.style.fontSize = "x-large"),
            (e.innerHTML = "Working...."),
            (t = setInterval(function () {
                "loading" !== document.readyState && (clearInterval(t), document.body.appendChild(e));
            }, 100)),
            window.addEventListener(
                "beforeunload",
                function () {
                    showFrame("____loading_slide");
                },
                !0
            ));
    })();
var $$$ = getID,
    fixOrientation = fixMobileOrientation,
    tmbUI = {
        UIevents: [],
        UIkeys: [],
        UIelements: [],
        highlight: "",
        timeout: 1e4,
        timeoutRef: 0,
        onreadyUI: function () {},
        getInput: function () {},
        status: "",
        message: "",
        response: "",
        downTimestamp: 0,
        rt: 0,
        upTimestamp: 0,
        dwell: 0,
    };
tmbUI.getInput = function () {
    function e(e) {
        var t, n;
        (t = e),
            t.preventDefault(),
            t.stopPropagation(),
            0 == d &&
                ("keydown" == t.type
                    ? ((n = t.charCode || t.keyCode),
                      (tmbUI.UIkeys.includes(n) || 0 == tmbUI.UIkeys.length) && ((tmbUI.response = codeToKey(n)), "" !== tmbUI.highlight && tmbUI.UIkeys.length > 0 && (a = getID(tmbUI.UIelements[tmbUI.UIkeys.indexOf(n)])), (d = !0)))
                    : ("mousedown" != t.type && "touchstart" != t.type && "pointerdown" != t.type && "MSPointerDown" != t.type) ||
                      (0 == tmbUI.UIelements.length ? (tmbUI.response = "document") : (tmbUI.response = t.target ? t.target.id : t.srcElement.id), "" !== tmbUI.highlight && (a = getID(tmbUI.response)), (d = !0)),
                1 == d &&
                    ((tmbUI.rt = c),
                    (c = now()),
                    (tmbUI.rt = c - tmbUI.rt),
                    (tmbUI.rt = tmbUI.rt.round(2)),
                    (tmbUI.downTimestamp = c),
                    tmbUI.timeoutRef && clearTimeout(tmbUI.timeoutRef),
                    a &&
                        (["div", "span", "button", "p", "img"].includes(a.tagName.toLowerCase())
                            ? ((s = a.style.border), (a.style.border = "5px solid " + tmbUI.highlight))
                            : ["circle", "rect", "ellipse", "line", "path", "polygon", "polyline", "image", "text"].includes(a.tagName.toLowerCase())
                            ? ((u = a.style.stroke), (l = a.style.strokeWidth), (a.style.stroke = tmbUI.highlight), (a.style.strokeWidth = 5))
                            : ["shape"].includes(a.tagName.toLowerCase()) && ((u = a.strokecolor), (l = a.strokeweight), (a.strokecolor = tmbUI.highlight), (a.strokeweight = 5)))));
    }
    function t(e) {
        var t;
        (t = e), t.preventDefault(), t.stopPropagation(), 1 == d && ((tmbUI.upTimestamp = now()), (tmbUI.dwell = tmbUI.upTimestamp - c), (tmbUI.dwell = tmbUI.dwell.round(2)), (tmbUI.status = t.type), r(), o());
    }
    function n() {
        if ((tmbUI.UIevents.includes("keys") && (document.addEventListener("keydown", e, !0), document.addEventListener("keyup", t, !0)), tmbUI.UIevents.includes("clicks")))
            if (0 == tmbUI.UIelements.length) document.addEventListener("mousedown", e, !0), document.addEventListener("mouseup", t, !0);
            else for (i = 0; i < tmbUI.UIelements.length; i++) getID(tmbUI.UIelements[i]).addEventListener("mousedown", e, !0), getID(tmbUI.UIelements[i]).addEventListener("mouseup", t, !0);
        if (tmbUI.UIevents.includes("taps"))
            if (0 == tmbUI.UIelements.length)
                hasPointer
                    ? window.PointerEvent
                        ? (document.addEventListener("pointerdown", e, !0), document.addEventListener("pointerup", t, !0))
                        : (document.addEventListener("MSPointerDown", e, !0), document.addEventListener("MSPointerUp", t, !0))
                    : (document.addEventListener("touchstart", e, !0),
                      document.addEventListener("touchend", t, !0),
                      tmbUI.UIevents.includes("clicks") || (document.addEventListener("mousedown", e, !0), document.addEventListener("mouseup", t, !0)));
            else
                for (i = 0; i < tmbUI.UIelements.length; i++)
                    hasPointer
                        ? window.PointerEvent
                            ? (getID(tmbUI.UIelements[i]).addEventListener("pointerdown", e, !0), getID(tmbUI.UIelements[i]).addEventListener("pointerup", t, !0))
                            : (getID(tmbUI.UIelements[i]).addEventListener("MSPointerDown", e, !0), getID(tmbUI.UIelements[i]).addEventListener("MSPointerUp", t, !0))
                        : (getID(tmbUI.UIelements[i]).addEventListener("touchstart", e, !0),
                          getID(tmbUI.UIelements[i]).addEventListener("touchend", t, !0),
                          tmbUI.UIevents.includes("clicks") || (getID(tmbUI.UIelements[i]).addEventListener("mousedown", e, !0), getID(tmbUI.UIelements[i]).addEventListener("mouseup", t, !0)));
    }
    function r() {
        if ((tmbUI.UIevents.includes("keys") && (document.removeEventListener("keydown", e, !0), document.removeEventListener("keyup", t, !0)), tmbUI.UIevents.includes("clicks")))
            if (0 == tmbUI.UIelements.length) document.removeEventListener("mousedown", e, !0), document.removeEventListener("mouseup", t, !0);
            else for (i = 0; i < tmbUI.UIelements.length; i++) getID(tmbUI.UIelements[i]).removeEventListener("mousedown", e, !0), getID(tmbUI.UIelements[i]).removeEventListener("mouseup", t, !0);
        if (tmbUI.UIevents.includes("taps"))
            if (0 == tmbUI.UIelements.length)
                hasPointer
                    ? window.PointerEvent
                        ? (document.removeEventListener("pointerdown", e, !0), document.removeEventListener("pointerup", t, !0))
                        : (document.removeEventListener("MSPointerDown", e, !0), document.removeEventListener("MSPointerUp", t, !0))
                    : (document.removeEventListener("touchstart", e, !0),
                      document.removeEventListener("touchend", t, !0),
                      tmbUI.UIevents.includes("clicks") || (document.removeEventListener("mousedown", e, !0), document.removeEventListener("mouseup", t, !0)));
            else
                for (i = 0; i < tmbUI.UIelements.length; i++)
                    hasPointer
                        ? window.PointerEvent
                            ? (getID(tmbUI.UIelements[i]).removeEventListener("pointerdown", e, !0), getID(tmbUI.UIelements[i]).removeEventListener("pointerup", t, !0))
                            : (getID(tmbUI.UIelements[i]).removeEventListener("MSPointerDown", e, !0), getID(tmbUI.UIelements[i]).removeEventListener("MSPointerUp", t, !0))
                        : (getID(tmbUI.UIelements[i]).removeEventListener("touchstart", e, !0),
                          getID(tmbUI.UIelements[i]).removeEventListener("touchend", t, !0),
                          tmbUI.UIevents.includes("clicks") || (getID(tmbUI.UIelements[i]).removeEventListener("mousedown", e, !0), getID(tmbUI.UIelements[i]).removeEventListener("mouseup", t, !0)));
    }
    function o() {
        if ((tmbUI.timeoutRef && (clearTimeout(tmbUI.timeoutRef), (tmbUI.timeoutRef = 0)), a))
            setTimeout(function () {
                ["div", "span", "button", "p", "img"].includes(a.tagName.toLowerCase())
                    ? (a.style.border = s)
                    : ["circle", "rect", "ellipse", "line", "path", "polygon", "polyline", "image", "text"].includes(a.tagName.toLowerCase())
                    ? ((a.style.stroke = u), (a.style.strokeWidth = l))
                    : ["shape"].includes(a.tagName.toLowerCase()) && ((a.strokecolor = u), (a.strokeweight = l));
                var e = new CustomEvent("readyUI");
                document.addEventListener("readyUI", tmbUI.onreadyUI, !0), document.dispatchEvent(e), document.removeEventListener("readyUI", tmbUI.onreadyUI, !0);
            }, 250);
        else {
            var e = new CustomEvent("readyUI");
            document.addEventListener("readyUI", tmbUI.onreadyUI, !0), document.dispatchEvent(e), document.removeEventListener("readyUI", tmbUI.onreadyUI, !0);
        }
    }
    var i,
        a,
        s,
        u,
        l,
        c = now(),
        d = !1,
        f = "";
    for (var m in tmbUI)
        if (tmbUI.hasOwnProperty(m))
            switch (m) {
                case "UIevents":
                    for (0 == tmbUI.UIevents.length && (f += "Must specify UIevents: 'keys', 'clicks' or 'taps'. "), tmbUI.UIevents instanceof Array || (tmbUI.UIevents = [tmbUI.UIevents]), i = 0; i < tmbUI.UIevents.length; i++)
                        ["keys", "clicks", "taps"].includes(tmbUI.UIevents[i]) || (f += "'" + tmbUI.UIevents[i] + "' is not a valid event. ");
                    tmbUI.UIevents.includes("taps") && !hasTouch && (f += "Not a touch device, 'taps' is not a valid event. ");
                    break;
                case "UIkeys":
                    for (tmbUI.UIkeys instanceof Array || (tmbUI.UIkeys = [tmbUI.UIkeys]), i = 0; i < tmbUI.UIkeys.length; i++) keyboardCodes[tmbUI.UIkeys[i]] || (f += "'" + tmbUI.UIkeys[i] + "' is not a valid keyboard code. ");
                    break;
                case "UIelements":
                    for (tmbUI.UIelements instanceof Array || (tmbUI.UIelements = [tmbUI.UIelements]), i = 0; i < tmbUI.UIelements.length; i++) getID(tmbUI.UIelements[i]) || (f += "'" + tmbUI.UIelements[i] + "' is not a valid element. ");
                    break;
                case "timeout":
                    tmbUI.timeout < 150 && (f += "Timeout is " + tmbUI.timeout + " ms, must be > 150 ms. ");
                    break;
                case "timeoutRef":
                    if (0 != tmbUI.timeoutRef) return (tmbUI.message += "'getInput' called again while still busy. "), !1;
                    break;
                case "highlight":
                    if ("" != tmbUI.highlight) {
                        var p = document.createElement("div");
                        (p.style.color = "rgb(0, 0, 0)"),
                            (p.style.color = tmbUI.highlight),
                            "rgb(0, 0, 0)" == p.style.color &&
                                ((p.style.color = "rgb(255, 255, 255)"), (p.style.color = tmbUI.highlight), "rgb(255, 255, 255)" == p.style.color && (f += "'highlight' must be empty string or valid CSS color. "));
                    }
                    break;
                case "onreadyUI":
                    break;
                case "getInput":
                    break;
                case "status":
                    tmbUI.status = "";
                    break;
                case "message":
                    tmbUI.message = "";
                    break;
                case "response":
                    tmbUI.response = "";
                    break;
                case "downTimestamp":
                    tmbUI.downTimestamp = 0;
                    break;
                case "rt":
                    tmbUI.rt = 0;
                    break;
                case "upTimestamp":
                    tmbUI.upTimestamp = 0;
                    break;
                case "dwell":
                    tmbUI.dwell = 0;
                    break;
                default:
                    f += "Invalid parameter '" + m + "'. ";
            }
    if (
        (tmbUI.UIkeys.length > 0 && !tmbUI.UIevents.includes("keys") && (f += "Need 'keys' in UIevents for valid keys. "),
        tmbUI.UIkeys.length && tmbUI.UIelements.length && tmbUI.UIelements.length < tmbUI.UIkeys.length && (f += "Invalid number of UIelements, more 'keys' than 'UIelements'. "),
        0 == tmbUI.UIelements.length && "" !== tmbUI.highlight && (f += "No elements to highlight. "),
        f)
    ) {
        (tmbUI.status = "error"), (tmbUI.message = f);
        var h = new CustomEvent("readyUI");
        return document.addEventListener("readyUI", tmbUI.onreadyUI, !0), document.dispatchEvent(h), document.removeEventListener("readyUI", tmbUI.onreadyUI, !0), !1;
    }
    return (
        (tmbUI.timeoutRef = setTimeout(function () {
            (tmbUI.status = "timeout"), (tmbUI.message += "Timeout: no response in " + tmbUI.timeout + " ms."), r(), o();
        }, tmbUI.timeout)),
        n(),
        !1
    );
};
var simulateMobileMouse = function (e) {
        e.addEventListener("touchstart", mobileTouchHandler), e.addEventListener("touchmove", mobileTouchHandler), e.addEventListener("touchend", mobileTouchHandler), e.addEventListener("touchcancel", mobileTouchHandler);
    },
    mobileTouchHandler = function (e) {
        switch ((e.preventDefault(), e.type)) {
            case "touchstart":
                if (1 != e.changedTouches.length) return;
                (this.touchMoved = !1), simulateMobileMouseEvent(e, "mouseover"), simulateMobileMouseEvent(e, "mousemove"), simulateMobileMouseEvent(e, "mousedown");
                break;
            case "touchmove":
                if (1 != e.changedTouches.length) return;
                (this.touchMoved = !0), simulateMobileMouseEvent(e, "mousemove");
                break;
            case "touchend":
                if (1 != e.changedTouches.length) return;
                simulateMobileMouseEvent(e, "mouseup"), simulateMobileMouseEvent(e, "mouseout"), this.touchMoved || simulateMobileMouseEvent(e, "click");
                break;
            default:
                return;
        }
    },
    keyboardCodes = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "control",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "escape",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        59: ";",
        61: "=",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        91: "OSleft",
        92: "OSright",
        93: "OSright",
        96: "numpad0",
        97: "numpad1",
        98: "numpad2",
        99: "numpad3",
        100: "numpad4",
        101: "numpad5",
        102: "numpad6",
        103: "numpad7",
        104: "numpad8",
        105: "numpad9",
        106: "numpadmultiply",
        107: "numpadadd",
        109: "numpadsubtract",
        110: "numpaddecimal",
        111: "numpaddivide",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        124: "f13",
        125: "f14",
        126: "f15",
        144: "numlock",
        145: "scrolllock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "command",
    },
    keyValue = codeToKey,
    keyboardKeys = {
        backspace: 8,
        tab: 9,
        enter: 13,
        return: 13,
        shift: 16,
        control: 17,
        ctrl: 17,
        alt: 18,
        pause: 19,
        capslock: 20,
        escape: 27,
        esc: 27,
        space: 32,
        spacebar: 32,
        " ": 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        leftarrow: 37,
        left: 37,
        uparrow: 38,
        up: 38,
        rightarrow: 39,
        right: 39,
        downarrow: 40,
        down: 40,
        insert: 45,
        delete: 46,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        OSleft: 91,
        commandleft: 91,
        Windows: 91,
        OSright: 92,
        commandright: 93,
        numpad0: 96,
        numpad1: 97,
        numpad2: 98,
        numpad3: 99,
        numpad4: 100,
        numpad5: 101,
        numpad6: 102,
        numpad7: 103,
        numpad8: 104,
        numpad9: 105,
        numpadmultiply: 106,
        numpadadd: 107,
        numpadsubtract: 109,
        numpaddecimal: 110,
        numpaddivide: 111,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        f13: 124,
        f14: 125,
        f15: 126,
        numlock: 144,
        scrolllock: 145,
        semicolon: 186,
        ";": 186,
        equal: 187,
        "=": 187,
        comma: 188,
        ",": 188,
        minus: 189,
        "-": 189,
        period: 190,
        ".": 190,
        slash: 191,
        "/": 191,
        backquote: 192,
        "`": 192,
        bracketleft: 219,
        "[": 219,
        backslash: 220,
        "\\": 220,
        bracketright: 221,
        "]": 221,
        quote: 222,
        "'": 222,
        command: 224,
    },
    coinFlip = randInt;
Number.prototype.round ||
    (Number.prototype.round = function (e) {
        if (("undefined" == typeof e && (e = 0), "number" != typeof e || (e + 1) % 1 != 0 || !(e + 1 > 0))) throw new TypeError("Numer.prototype.round requires 0 or a natural number for precision argument");
        var t = Math.pow(10, e);
        return Math.round(this * t) / t;
    });
var centimetersToDegrees = sizeToDegrees,
    degreesToCentimeters = degreesToSize,
    now = function () {
        var e = window.performance || {};
        return (
            (e.now = (function () {
                return (
                    e.now ||
                    e.webkitNow ||
                    e.msNow ||
                    e.oNow ||
                    e.mozNow ||
                    function () {
                        return new Date().getTime();
                    }
                );
            })()),
            e.now()
        );
    },
    chain = chainTimeouts,
    clearChain = clearChainTimeouts,
    urlsafedecode = safeDecode;
