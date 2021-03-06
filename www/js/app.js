var app = {
  getParameterByName: function(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
};

// Authorized Hrefs
var authorizedHrefs = [
  '/',
  '/chat.html',
  '/create.html',
  '/customendpoint.html',
  '/files.html',
  '/index.html',
  '/logout.html',
  '/profile.html',
  '/update.html',
  '/upload.html'
];

// Initialize Kinvey
var client = Kinvey.init({
  appKey: 'kid_rJFWNCB5G',
  appSecret: '75f96290939c421c882e2a3594ab60f6'
});

var activeUser = Kinvey.User.getActiveUser(client);

if (!activeUser && authorizedHrefs.indexOf(location.pathname) !== -1) {
  location.replace('/login.html');
} else if (activeUser && authorizedHrefs.indexOf(location.pathname) === -1) {
  location.replace('/index.html');
}

$(document).ready(function() {
  $(document).trigger('app.ready');
});
