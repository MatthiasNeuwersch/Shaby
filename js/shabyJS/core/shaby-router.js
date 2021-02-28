'use strict';
/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *
 *     Hints:
 *     - First view given will be handled as homeRoute.
 *     - If the browser-url does not fit to any known slug,
 *       by default the 404-Route will be loaded. You can
 *       change that behaviour to load the homeRoute in this
 *       case by following the instructions in line 38.
 *
 *     ShaBy - 2021-02-27
 *******************************************************/
export default class Shaby_Router{
    constructor(views){
        this.routes = views;
        this.homeRoute = views[0];
        this.init();
    }

    init(){
        window.removeEventListener('hashchange', this.hasChanged);
        window.addEventListener('hashchange',this.hasChanged.bind(this));
        this.hasChanged();
    }

    hasChanged(){
        if (window.location.hash.length >= 2) {
            for (const view of this.routes) {
                if (view.isActive()){
                    view.init();
                    return;
                }
            }
            console.log("I have no Idea where "+window.location.hash+" should be, but hey - taste some 404!");
            window.location.hash = '/404'; //CHANGE --'/404'-- HERE TO --this.homeRoute.slug-- if you want to redirect home.
        } else
            window.location.hash = this.homeRoute.slug;
    };
}