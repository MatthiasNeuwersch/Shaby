'use strict';
/*******************************************************
 *     Hash-based Routes for Single Page Applications.
 *     Routes can are treated like Views. Each Route is
 *     therefore bound to one single (unique) View.
 *
 *     ShaBy - 2021-02-27
 *******************************************************/

export default class Shaby_View{
    constructor(slug, init){
        this.slug = slug;
        this.init = init;
    }

    isActive(){
        if(window.Shaby.utils.isEmpty(Shaby_View.getGetParameters()))
            return (window.location.hash.substr(1).replace('#','') === this.slug);
        else{
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1,index).replace("#","") === this.slug);
        }
    };

    static renderTemplate(templateName, container, values = false){
        return new Promise((resolve, reject) => {
            fetch(window.Shaby.system.webRoot+"/js/shabyJS/templates/"+templateName+".tpl?v=0.1")
                .then(response => response.text())
                .then(tpl=> {
                    console.log(tpl);
                    let markup = tpl,
                        open = /<%>/gi,
                        result,
                        indices_open = [],
                        indices_close = [],
                        even = true;
                    while ( (result = open.exec(tpl)) ) {
                        even ? indices_open.push(result.index): indices_close.push(result.index);
                        even = !even;
                    }
                    for(let i = 0; i < indices_close.length; i++){
                        let word = window.Shaby.t(tpl.substring(indices_open[i]+3, indices_close[i]));
                        markup = markup.replace(tpl.substring(indices_open[i], indices_close[i]+3), word);
                    }
                    container.innerHTML = markup;
                    window.dispatchEvent(new CustomEvent("templateRendered", {detail : {templateName: templateName}}));
                    resolve();
                });
        });
    }

    static getGetParameters() {
        let index = window.location.hash.substr(1).indexOf("?");
        if (index != -1) {
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split('&').reduce(function (result, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return(result);
        } else
            return {};
    }
}