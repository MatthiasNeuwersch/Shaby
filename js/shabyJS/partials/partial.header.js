"use strict";
import Shaby_View from '../core/shaby-view.js?v=0.1';

export let renderHeader = async function(...languages){
    await Shaby_View.renderTemplate("header", document.getElementById("shaby-header"));

    //handlers
};