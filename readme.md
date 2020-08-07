# Tab Pass

## What Dis?
I often find myself with a billion tabs open on my computer, but then it's SHYITTIN time. I want those tabs on my phone, but what am I gonna sync accounts across devices? Hell naw. Enter Tab Pass (tm). This is a chrome extension which generates a qr code based on your open chrome tabs. Scanning this qr code on your phone using Tab Pass will open these tabs on that device. No sign ups or logins necessary.

---

## How dis work?

Using a popup browser_action, the chrome.tabs api and [this](https://davidshimjs.github.io/qrcodejs/) qr code library.

---

## Brand new to extension development? Take an afternoon and read this:

A fairly good introductory tutorial can be found [here](https://thoughtbot.com/blog/how-to-make-a-chrome-extension). Below are my notes from that tutorial as well as notes on `default_popup` (which is basically all this extension needs to work).

---

## Manifest json
 - Meta data and config for the extensions
 - Must contain `name`, `manifest_version`, `version`

 ---

 - `name`: the name of your extension
 - `manifest_version`: currently 2, as breaking api changes were implemented on top of one. this attribute is basically the schema version
 - `version`: version of your actual extension
 - `content_scripts`: js that will have access to webpages
 - `background`: object containing array of `scripts` indicating background scripts
 - `browser_action`: allows us to configure the toolbar button. We use the `default_icon` property to define the toolbar icon, the `default_title` to define the hover text, and the `default_popup` to define an html file which will be loaded when the icon is clicked. This html file can contain css and javascript like any regular html file, and the javscript will have access to (at least some) chrome apis. It is dope nasty.

## Content Scripts

- array of objects representing url patterns and scripts which will have access to pages matching the patterns
---
- `matches`: regex like expression defining the urls we want to match. `<all_urls>` can be specified to match all websites. The protocol (http/https) must be specified. This is an array
- `js`: array of javascript files to run on these webpages. appear to run onload (potentially continue in the background as well).

## Messaging

- The `chrome.runtime` api gives us access to a message queue with the methods `sendMessage({})` and `onMessage((request, sender, sendResponse)=>{})`. Send message allows us to broadcast an arbitrary object via the queue. onMessage is a listener which executes a callback any time a message is placed in the queue. We can inspect the object to determine it's contents and take action as appropriate

## Further reading

- Apis: [chrome.tabs](https://developer.chrome.com/extensions/tabs)