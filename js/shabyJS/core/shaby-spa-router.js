'use strict';
/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *     First Route will be handled as homeRoute.
 *     Second Route will be handled as 404Route;
 *
 *     ShaBy - 2021-02-27
 *******************************************************/
export default class Shaby_SPA_Router{
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
                    this.goToRoute(view);
                    return;
                }
            }
            console.log("I have no Idea where "+window.location.hash+" should be, but hey - taste some startpage!");
            window.location.hash = this.homeRoute.slug;
        } else
            window.location.hash = this.homeRoute.slug;
    };

    goToRoute(view) {
        view.init();
    }
}