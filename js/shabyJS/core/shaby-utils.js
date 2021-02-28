"use strict";

/***************************************************
 *  A Collectorclass for several useful functions
 *
 *  ShaBy, 2019-04-20, v0.1
 ***************************************************/

class Shaby_Utils{
    constructor(){}

    isEmpty(variable) {
        if(Array.isArray(variable))
            return (variable.length == 0);
        else if(typeof variable === "object")
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable == "");
    };

    //Name = programm ;)
    getIndexOfObjectInArrayByPropertyvalue(array, attr, value) {
        for(let i = 0; i < array.length; i++) {
            if(array[i][attr] === value)
                return i;
        }
        return -1;
    };

    setCookie(name,value,days){
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else
            expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    getCookie(name){
        let nameEQ = name + "=",
            ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    deleteCookie(name){
        window.Shaby.utils.setCookie(name,"",-1);
    };

    getOS(){
        let device = "Unknown Device";
        if(navigator.appVersion.indexOf("Win")!=-1) device = "Windows";
        if(navigator.appVersion.indexOf("Mac")!=-1) device = "MacOS"; //iPad Pro & iPhone 6 :)
        if(navigator.appVersion.indexOf("Android")!=-1) device = "Android";
        if(navigator.appVersion.indexOf("iOS")!=-1) device = "iOS";
        return device;
    }

    clientHasCamera(){
        navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({video: true}, function(stream) {
            window.Shaby.system.hasCamera = true;
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
        }, function() {
            window.Shaby.system.hasCamera = false;
        });
    };

    // userInputModal(headline, question, callback, value = ""){
    //     $('#input_overlay').remove();
    //     let element = "<div id='input_overlay' class='active'><div id='userinput'><div class='headline'>"+headline+"</div><div class='text'>"+question+"</div>" +
    //         "<input type='text' id='modal_input' value='"+value+"'/>"+
    //         "<div class='button_box'><div id='confirm_ok' class='button'>"+window.Shaby.t('okay')+"</div><div id='confirm_cancel' class='button'>"+window.Shaby.t('abort')+"</div></div>" +
    //         "</div></div>";
    //     $('body').append($(element)).css('overflow', 'hidden');
    //
    //     $('#confirm_ok').unbind().on('click', function(){
    //         $('#confirm_overlay').removeClass('active');
    //         $('body').css('overflow', 'auto');
    //         callback($("#modal_input").val());
    //         $('#input_overlay').remove();
    //     });
    //
    //     $('#confirm_cancel').unbind().on('click', function(){
    //         $('#input_overlay').remove();
    //         $('body').css('overflow', 'auto');
    //     })
    // }
    //
    // modal(html, headline = ''){
    //     if(!$('#apimodal').length) {
    //         let element = "<div id='apimodal_overlay' class='active'><div id='apimodal'><span class='icon-cross'></span><div class='headline'>"+headline+"</div><div class='text'>"+html+"</div></div></div>";
    //         $('body').append($(element)).css('overflow', 'hidden');
    //     }
    //     else {
    //         $('#apimodal .text').html(html);
    //         $('#apimodal .headline').text(headline);
    //         $('#apimodal_overlay').addClass('active');
    //         $('body').css('overflow', 'hidden');
    //     }
    //     $('#apimodal .icon-cross').unbind().on('click', function(){
    //         $('#apimodal_overlay').removeClass('active');
    //         $('#lds-roller').removeClass('active');
    //         $('body').css('overflow', 'auto');
    //     });
    // }

    // confirm(question, callback, headline = 'confirm'){
    //     $('#confirm_overlay').remove();
    //     let element = "<div id='confirm_overlay' class='active'><div id='confirm'><div class='headline'>"+headline+"</div><div class='text'>"+question+"</div>" +
    //         "<div class='button_box'><div id='confirm_ok' class='button'>"+window.Shaby.t('yes')+"</div><div id='confirm_cancel' class='button'>"+window.Shaby.t('no')+"</div></div>" +
    //         "</div></div>";
    //     $('body').append($(element)).css('overflow', 'hidden');
    //
    //     $('#confirm_ok').unbind().on('click', function(){
    //         $('#confirm_overlay').removeClass('active');
    //         $('body').css('overflow', 'auto');
    //         callback(true);
    //     });
    //
    //     $('#confirm_cancel').unbind().on('click', function(){
    //         $('#confirm_overlay').removeClass('active');
    //         $('body').css('overflow', 'auto');
    //         callback(false);
    //     })
    // }

    arrayDifference(a, b){
        return a.filter(notContainedIn(b));

        function notContainedIn(array){
            return function arrNotContains(element) {
                return array.indexOf(element) === -1;
            };
        }
    };

    search(searchtag, selector, data){
        $('.displaynone').removeClass("displaynone");
        selector.each(function(index, element){
            let visible = false;
            for(let i = 0; i < data.length; i++){
                if($(element).data(data[i]).toString().toLowerCase().includes(searchtag.toString().toLowerCase())){
                    visible = true;
                    break;
                }
            }
            if (!visible)
                $(element).addClass("displaynone");
        });
    };

    htmlEntities(string){
        return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    xml2json(xml, tab) {
        let X = {
            toObj: function(xml) {
                let o = {};
                if (xml.nodeType==1) {   // element node ..
                    if (xml.attributes.length)   // element with attributes  ..
                        for (var i=0; i<xml.attributes.length; i++)
                            o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                    if (xml.firstChild) { // element has child nodes ..
                        let textChild=0, cdataChild=0, hasElementChild=false;
                        for (var n=xml.firstChild; n; n=n.nextSibling) {
                            if (n.nodeType==1) hasElementChild = true;
                            else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                            else if (n.nodeType==4) cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (let n=xml.firstChild; n; n=n.nextSibling) {
                                    if (n.nodeType == 3)  // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4)  // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) {  // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    }
                                    else  // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            }
                            else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        }
                        else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                        else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n=xml.firstChild; n; n=n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                }
                else if (xml.nodeType==9)
                    o = X.toObj(xml.documentElement);
                else
                    alert("Invalid JSON-node type: " + xml.nodeType);
                return o;
            },
            toJson: function(o, name, ind) {
                let json = name ? ("\""+name+"\"") : "";
                if (o instanceof Array) {
                    for (var i=0,n=o.length; i<n; i++)
                        o[i] = X.toJson(o[i], "", ind+"\t");
                    json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
                }
                else if (o == null)
                    json += (name&&":") + "null";
                else if (typeof(o) == "object") {
                    let arr = [];
                    for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind+"\t");
                    json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
                }
                else if (typeof(o) == "string")
                    json += (name&&":") + "\"" + o.toString() + "\"";
                else
                    json += (name&&":") + o.toString();
                return json;
            },
            innerXml: function(node) {
                let s = "";
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    let asXml = function(n) {
                        let s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i=0; i<n.attributes.length;i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c=n.firstChild; c; c=c.nextSibling)
                                    s += asXml(c);
                                s += "</"+n.nodeName+">";
                            }
                            else
                                s += "/>";
                        }
                        else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c=node.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                }
                return s;

            },
            escape: function(txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },
            removeWhite: function(e) {
                e.normalize();
                for (let n = e.firstChild; n; ) {
                    if (n.nodeType == 3) {  // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            let nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        }
                        else
                            n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) {  // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    }
                    else                      // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        let json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
        return JSON.parse("{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}");
    }

    getOrientation(event) {
        let view = new DataView(event.target.result);
        if (view.getUint16(0, false) != 0xFFD8)
            return (-2);
        var length = view.byteLength,
            offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966)
                    return -1;
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        return (view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return (-1);
    }

    /**** DATE FUNCTIONS ****/

    getDayOfYear(now){
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        let oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    getDateFromTimestamp(timestamp){
        let date = new Date(timestamp*1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return (year + '-' + month+ '-' + day);
    };

}
export default Shaby_Utils;