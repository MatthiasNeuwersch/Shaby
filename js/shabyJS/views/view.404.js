"use strict";
import Shaby_View from '../core/shaby-view.js?v=0.1';

export let view = new Shaby_View("/404", function(){
    this.rendering();
});

view.rendering = async function(){
    await Shaby_View.renderTemplate("home", document.getElementById("shaby-body"));
    await Shaby_View.renderTemplate("partial-a", document.getElementById("partial-a-container"),["fiends", "love", "chicken"]);
};