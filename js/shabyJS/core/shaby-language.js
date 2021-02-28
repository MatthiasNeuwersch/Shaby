"use strict";

/**********************************************************************
 *     Translation-Engine for Shaby-PWAs
 *     Just add your key:"value" Pairs down by.
 *
 *     ShaBy - 2019-04-20
 **********************************************************************/

class Shaby_Translator{
    constructor(...languages){
        for(const lng of languages)
            this[lng] = Shaby_Language[lng];
        this.currentLanguage = window.Shaby.utils.getCookie("language") ? window.Shaby.utils.getCookie("language") : languages[0];
    }

    t(key, language = this.currentLanguage){
        return this[language][key];
    }
}
export default Shaby_Translator;

let Shaby_Language = {};
Shaby_Language.en = {

    // LOGIN - LOGOUT
    forgot_pw: "Forgot Password?",
    login: "Login",
    logout: "Logout",
    name : "Name",
    password: "Password",
    username: "Username",
    required_field: "This field is mandatory",

    // GENERAL
    all: "All",
    and: "And",
    are_you_sure: "Are you sure you want to do this?",
    back: "Back",
    home: "Home",
    no : "No",
    preview : 'Preview',
    settings: "Settings",
    sync: "Sync",

    //LANGUAGE
    english: "English",
    german: "German",
    language: "Language",
    russian: "Russian",

    //MODALS
    abort: "Abort",
    attention: "Attention",
    confirm: "Confirm",
    hint: "Hint",
    okay: "Okay",
    send: "Send",
    yes : "Yes",

};

Shaby_Language.de = {
    // LOGIN - LOGOUT
    forgot_pw: "Passwort vergessen?",
    login: "Login",
    logout: "Logout",
    name : "Name",
    password: "Passwort",
    username: "Username",
    required_field: "Dies ist ein Pflichtfeld",

    // GENERAL
    all: "Alle",
    and: "Und",
    are_you_sure: "Sind Sie sicher?",
    back: "Zurück",
    home: "Home",
    no : "Nein",
    preview : 'Vorschau',
    settings: "Einstellungen",
    sync: "Synchronisieren",

    //LANGUAGE
    english: "Englisch",
    german: "Deutsch",
    language: "Sprache",
    russian: "Russisch",

    //MODALS
    abort: "Abbrechen",
    attention: "Achtung",
    confirm: "Bestätigen",
    hint: "Hinweis",
    okay: "Okay",
    send: "Senden",
    yes : "Ja",
};