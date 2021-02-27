"use strict";
import Shaby_PWA from './shaby-pwa.js?v=0.1';

import {view as home} from './../views/view.home.js?v=0.1';

let config = {
    debugMode: true,
    languages: ["de","en","ru"],
    offlineCompatible: true,
    views: [home],
    webRoot: "https://shabyjs.neuwersch.eu/"
};

const Shaby_App = new Shaby_PWA(config);