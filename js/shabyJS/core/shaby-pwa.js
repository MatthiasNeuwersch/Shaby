"use strict";
import Shaby_Utils from './shaby-utils.js?v=0.1';
import Shaby_App_Lib from './../your-functions.js?v=0.1';
import Shaby_Router from './shaby-router.js?v=0.1';
import Shaby_Translator from './shaby-language.js?v=0.1';

import {renderHeader} from '../partials/partial.header.js?v=0.1';
import {renderFooter} from '../partials/partial.footer.js?v=0.1';

/**********************************************************************
 *     Class-Bundle for Fuckn' Awzum PWAs.
 *
 *     @param:
 *     Config-Object:
 *       debugMode: Set true, if you want to get console.logs.
 *       webRoot:   Give me the root-URL of your App
 *       views:     Please provide an array of views, that will be
 *                  available in your app.
 *
 *     ShaBy - 2021-02-27
 **********************************************************************/

class Shaby_PWA{
    constructor(config) {
        window.Shaby = this;
        this.system = {
            appContainer: document.getElementById('shabyJS'),
            debugMode: config.debugMode,
            webRoot: config.webRoot,
        };
        this.utils = new Shaby_Utils();
        this.applib = new Shaby_App_Lib();
        this.translator = new Shaby_Translator(config.languages);
        renderHeader(config.languages);
        this.router = new Shaby_Router(config.views);
        renderFooter();
        // this.model = model;

        if('serviceWorker' in navigator) {
            //TODO: Testen, ob der Pfad auch bei Quereinstieg funktioniert, oder ob man absolut braucht.
            navigator.serviceWorker.register('/js/shabyJS/core/serviceworker.js?')
                .then(function() {
                    console.log('Service Worker Registered');
                });
        }
    }

    /***********************************************************************************
     *  Delivers resource in current language, when key is found in shaby-language.js
     *
     *  Use: window.Shaby.t(key);
     ***********************************************************************************/
    t(key, toLowerCase){
        return this.translator.t(key);
    }
}

export default Shaby_PWA;