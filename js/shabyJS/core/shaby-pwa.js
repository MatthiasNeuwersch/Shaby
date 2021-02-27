"use strict";
import Shaby_Utils from './shaby-utils.js?v=0.1';
import Shaby_SPA_Router from './shaby-spa-router.js?v=0.1';
import Shaby_Translator from './shaby-language.js?v=0.1';

/**********************************************************************
 *     Class-Bundle for PWAs.
 *     App-Shell needs an ID "#shaby_app".
 *
 *     @param:
 *     webRoot - Give me the root-URL of your App
 *     templatesPath - Give me the Path to your templates
 *       relative to your webRoot.
 *     routes - Give me an Object with "slug" : "template" Routes
 *     config - Want to store some Config in your App? Here you go!
 *     ...languages - Give me all languages you want your App to support.
 *
 *     ShaBy - 2021-02-27
 **********************************************************************/

class Shaby_PWA{
    constructor(config) {
        this.system = {
            appContainer: document.getElementById('shabyJS'),
            debugMode: config.debugMode,
            webRoot: config.webRoot,
        };
        this.utils = new Shaby_Utils();

        window.Shaby = this;
        this.translator = new Shaby_Translator(config.languages);
        this.router = new Shaby_SPA_Router(config.views);
        // this.model = model;
        this.serviceWorker();
    }

    online(){
        return navigator.onLine;
    };

    serviceWorker(){
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/js/shabyJS/core/serviceworker.js?')
                .then(function() {
                    console.log('Service Worker Registered');
                });
        }
    }

    /********************************************
     * Delivers Resource in current Language.
     * key should be found in shaby-language.js
     ********************************************/
    t(key, toLowerCase){
        return this.translator.t(this.currentLanguage, key);
    }

}

export default Shaby_PWA;