"use strict";
import Shaby_View from '../core/shaby-view.js?v=0.1';

export let renderFooter = async function(){
    await Shaby_View.renderTemplate("footer", document.getElementById("shaby-footer"));

    //handlers
};