
// Copyright 2010 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview The script chooser loads any page specific enhancement
 * scripts that are applicable to the page the user is currently on.
 *
 * @author clchen@google.com (Charles Chen)
 */

var ENHANCEMENT_SCRIPTS_BASE_URL =
    'https://ssl.gstatic.com/accessibility/javascript/ext/';

cvox.SiteSpecificEnhancements = {};

/**
 * Loads site specific enhancement scripts.
 */
cvox.SiteSpecificEnhancements.load = function() {
  // Append this to the end of a remote URL to force it to bypass the cache
  // and be redownloaded.
  // For gstatic releases, make sure this is '' since gstatic won't accept '?'
  // params.
  var forceRedownload = '';

  function loadScripts(srcs) {
    if (!srcs)
      return;
    var src = srcs[0];
    var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
    if (src.substr(0, 4) == 'http') {
      theScript.src = src + forceRedownload;
    } else if (ENHANCEMENT_SCRIPTS_BASE_URL) {
      theScript.src = ENHANCEMENT_SCRIPTS_BASE_URL + src + forceRedownload;
    } else {
      theScript.src = chrome.extension.getURL(src) + forceRedownload;
    }
    if (srcs.length > 1) {
      theScript.onload = function() {
        loadScripts(srcs.slice(1));
      };
    }
    document.head.appendChild(theScript);
  }

  function loadScript(src) {
    loadScripts([src]);
  }

  var currentURL = document.baseURI;

  if (currentURL.indexOf('https://mail.google.com/mail/') == 0 &&
      currentURL.indexOf('?ui=2&view=btop&ver=1s4dmo0mhdqld#') != -1) {
    // GMail chat box
    loadScript('gtalk.js');
  } else if ((currentURL.indexOf('http://books.google.com/ebooks?id=') == 0) &&
      (currentURL.indexOf('&printsec=frontcover&output=reader') != -1)) {
    // Google Books Web Reader
    loadScripts(['booksReader_api.js', 'booksReader.js']);
  } else if (currentURL.indexOf('http://news.google.com/') == 0) {
    // News
    loadScript('news.js');
  } else if (currentURL.indexOf(
      'https://gcomm.talkgadget.google.com/talkgadget/gcomm') == 0) {
    // GComm
    loadScript('gcomm.js');
  } else if (currentURL.indexOf('http://iplayif.com/story?') == 0) {
    // Parchment z-machine
    loadScript('parchment.js');
  } else if (currentURL.indexOf('http://www.google.com/reader') == 0) {
    // Google Reader
    loadScript('reader.js');
  } else if (currentURL.indexOf('https://www.google.com/calendar') == 0 ||
      currentURL.indexOf('http://www.google.com/calendar') == 0) {
    // Calendar
    loadScript('calendar.js');
  }
};

cvox.SiteSpecificEnhancements.load();