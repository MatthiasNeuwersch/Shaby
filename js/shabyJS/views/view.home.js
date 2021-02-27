"use strict";
import Shaby_View from './../core/shaby-spa-view.js?v=0.1';

export let view = new Shaby_View("/", function(){
    this.shoutOut();
    window.addEventListener("templateChanged", function(e){
        if(e.detail.template == "home")
            console.log("home-Template just rendered");
    });

    this.rendering();

    //THEN
    // this.addEventListeners();
});

view.rendering = async function(){
    await this.renderTemplate("home", document.getElementById("shaby-body"));
    await this.renderTemplate("partial-a", document.getElementById("partial-a-container"),["fiends", "love", "chicken"]);
};

view.shoutOutMessage = "testwise";
view.shoutOut = function(){
    console.log(this.shoutOutMessage);
};