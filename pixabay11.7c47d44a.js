!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var a=r("bpxeT"),i=r("2TvXO"),s=r("5IjG7"),c=r("6JpON"),l=r("dIxxU"),u=document.querySelector("#search-form"),d=u.querySelector("button"),f=document.querySelector(".js-gallery"),p=document.querySelector(".loader"),h=document.querySelector(".js-load-more-wrapper"),m=document.querySelector(".js-guard"),v=document.querySelector(".js-button-up"),y="https://pixabay.com/api/",g="38382383-be68f6f97c97ff697813dafa9";e(c).Notify.init({clickToClose:!0,timeout:2e3});var b="",w=1,L=0;O(),u.addEventListener("submit",(function(n){n.preventDefault(),M(),H(),d.disabled=!0,f.innerHTML="",w=1,S(b=u.elements.searchQuery.value,w).then((function(n){var t=n.total,o=n.hits,r=n.totalHits;if(t){var a;a="Hooray! We found ".concat(r," images."),e(c).Notify.success(a),(L=o.length)===r&&I(),w+=1,f.innerHTML=j(o),k();var i=document.querySelector(".js-scroll-guard");x.observe(m),q.observe(i)}else N("Sorry, there are no images matching your search query. Please try again.")})).catch((function(e){return N(e)})).finally((function(){O(),d.disabled=!1}))})),v.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"}),U()}));var x=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&(M(),H(),S(b,w).then((function(e){var n=e.hits,t=e.totalHits;w+=1,(L+=n.length)===t&&(x.unobserve(m),I()),f.insertAdjacentHTML("beforeend",j(n)),k()})).catch((function(e){return N(e)})).finally(O))}))}),{root:null,rootMargin:"200px",threshold:1}),q=new IntersectionObserver((function(e){e[0].isIntersecting?U():v.classList.remove("is-hidden")}),{root:null,rootMargin:"200px",threshold:1});function S(e,n){return T.apply(this,arguments)}function T(){return(T=e(a)(e(i).mark((function n(t,o){var r,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URLSearchParams({key:g,q:t,per_page:40,page:o,image_type:"photo",orientation:"horizontal",safesearch:!0}),e.prev=1,e.next=4,l.default.get("".concat(y,"/?").concat(r));case 4:return a=e.sent,e.abrupt("return",a.data);case 8:e.prev=8,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),n,null,[[1,8]])})))).apply(this,arguments)}function j(e){return e.map((function(e){var n=e.webformatURL,t=e.largeImageURL,o=e.tags,r=e.likes,a=e.views,i=e.comments,s=e.downloads;return'\n    <a href="'.concat(t,'" class="photo-link js-scroll-guard" >\n        <div class="photo-card">\n            <img src="').concat(n,'" alt="').concat(o,'" loading="lazy" width="350" height="225"/>\n        </div>\n        <div class="info">\n            <p class="info-item">\n            <b>Likes</b>\n            <span>').concat(r,'</span>\n            </p>\n            <p class="info-item">\n            <b>Views</b>\n            <span>').concat(a,'</span>\n            </p>\n            <p class="info-item">\n            <b>Comments</b>\n            <span>').concat(i,'</span>\n            </p>\n            <p class="info-item">\n            <b>Downloads</b>\n            <span>').concat(s,"</span>\n            </p>\n        \n    </div>\n    </a>\n\n    ")})).join("")}function k(){new(e(s))(".gallery a").refresh()}function I(){h.classList.remove("is-hidden")}function M(){h.classList.add("is-hidden")}function O(){p.classList.add("is-hidden")}function H(){p.classList.remove("is-hidden")}function N(n){e(c).Notify.failure(n)}function U(){v.classList.add("is-hidden")}}();
//# sourceMappingURL=pixabay11.7c47d44a.js.map