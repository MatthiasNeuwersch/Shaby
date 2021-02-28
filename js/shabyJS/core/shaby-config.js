"use strict";
import Shaby_PWA from './shaby-pwa.js?v=0.1';

//Import and rename your views here:
import {view as home} from '../views/view.home.js?v=0.1';

/********************************************************************
 *     In most cases, this will be the only file within /core, that
 *     you might want to edit. Simply fill the config object with
 *     your data.
 *
 *     Hints:
 *     - The first language of 'languages' serves as the default-
 *       language.
 *     - The first view of 'views' serves as the home-view.
 *     - Do not forget to import the view above (Line 4) to be able
 *       to use it in the config.
 *
 *     ShaBy - 2021-02-27/
 ********************************************************************/

let config = {
    debugMode: true,
    languages: ["de","en","ru"], //First Language serves as default language.
    offlineCompatible: true,
    views: [home], // First View serves as home View.
    webRoot: "https://shabyjs.neuwersch.eu/"
};

new Shaby_PWA(config);