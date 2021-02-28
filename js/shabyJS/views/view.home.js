"use strict";
import Shaby_View from '../core/shaby-view.js?v=0.1';

/*******************************************************************************
 *     Sample Home-View given with the framework. This view may well be edited.
 *
 *     How to use views:
 *     1.) Export a new Shaby_View. Give it two @params:
 *       - The slug for it's Url, relative to the webroot
 *       - The function that is called, when the view isinitiated.
 *     2.) Import the View to and add the view-name (view.NAME.js) to the views-
 *         property in shaby-config.js
 *
 *     3.) Edit the view as it pleases you. Most likely  you will want to render
 *         some Templates, as seen in this example.
 *
 *     Hint:
 *     You may give the variable "view" in this file a  different name  without
 *     consequences. It is recommended to be view, and then be renamed in the
 *     import-statement of the config-file.
 *
 *     ShaBy - 2021-02-27
 *******************************************************************************/

export let view = new Shaby_View("/", async function(){
    await this.rendering();
});

view.rendering = async function(){
    await Shaby_View.renderTemplate("home", document.getElementById("shaby-body"));
    await Shaby_View.renderTemplate("partial-a", document.getElementById("partial-a-container"),["fiends", "love", "chicken"]);

    let button = simplebutton.addEventListener("click", function(){
        alert("test");
    });
};