var data = require("sdk/self").data;
var widgets = require("sdk/widget");

var text_entry = require("sdk/panel").Panel({
    width: 212,
    height: 200,
    contentURL: data.url("text-entry.html"),
    contentScriptFile: data.url("get-text.js")
});

var widget = widgets.Widget({
    id: "text-entry",
    label: "Wadobo timetracker",
    contentURL: "http://wadobo.com/favicon.ico",
    panel: text_entry
});

text_entry.port.on("text-entered", function(text) {
    text_entry.hide();
});
