"use strict";var precacheConfig=[["/index.html","0f25d55884f8f0456fe33e5cc921718a"],["/static/css/main.6e7eec51.css","d8564c19bd3443702a31209efd50fd26"],["/static/js/main.af4b2a2c.js","7848eda7c249bddc7b404cb31e056ae8"],["/static/media/WechatIMG620.9fcd75ca.jpeg","9fcd75cacf839e7a81380caf78591fe1"],["/static/media/WechatIMG959.f43e5cd3.jpeg","f43e5cd3850d198327b1f2cab1188b18"],["/static/media/address.b7dbc277.svg","b7dbc2776240052eea5286c86a010c99"],["/static/media/blackcard.4e94b679.png","4e94b6793c442ce128a677c35faf56c9"],["/static/media/cancel.b933f868.svg","b933f8685f74b98c9f3ae32ffbbf638d"],["/static/media/card.e85d09e8.svg","e85d09e80721afc168dd58168c98de11"],["/static/media/data.fe0e805e.svg","fe0e805e90e0db7f83625f6edb883b6d"],["/static/media/details.1443957b.svg","1443957b60142adf77f3537a59496aeb"],["/static/media/explain.d23481a7.svg","d23481a723a9111558d10abf25530b59"],["/static/media/fail.696d4c0f.svg","696d4c0ff7140a86183d7c42b284796d"],["/static/media/list.0ce3e3c6.svg","0ce3e3c663be783d53e7ce41c9fc97a0"],["/static/media/member.e4dbcb92.svg","e4dbcb9238d36cd35cf5f04d917f210f"],["/static/media/money.3252f146.svg","3252f14688fde5527b8432fcfbf66e65"],["/static/media/money_bag.9d023a9d.svg","9d023a9d37f3b6194242f97368f16986"],["/static/media/money_icon.96f087d0.svg","96f087d0477a45905a831406261106b1"],["/static/media/recommend.8f9beb28.svg","8f9beb281bf5aa4a03d348ab73ca54b1"],["/static/media/right.b9d7f814.svg","b9d7f8147dd048753fd8eee1e0132905"],["/static/media/shop.3eb8e421.svg","3eb8e4210dadcceb5bf3e88c451ffed5"],["/static/media/shop.caf8b769.jpg","caf8b7699fdc02a30fca50950b85bb60"],["/static/media/success.49273e11.svg","49273e115fee6726c08b79e731a68190"],["/static/media/timg.d094f407.jpg","d094f40735b098a3f62b77e44ed143ce"],["/static/media/xianzhilogo.f99cc5be.jpg","f99cc5be73d45f12fd9a778999a790ba"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});