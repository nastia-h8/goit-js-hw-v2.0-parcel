function e(e,t){const n=e.map((({url:e,urlToImage:t,title:n,author:r,description:i})=>`\n        <li>\n            <a href="${e}" target="_blank" rel="noopener noreferrer">\n            <article>\n                <img src="${t}" alt="${n}" width="480" />\n                <h2>${n}</h2>\n                <p>Posted by:${r}</p>\n                <p>${i}</p>\n            </article>\n            </a>\n      </li>\n        `)).join("");t.insertAdjacentHTML("beforeend",n)}const t=document.querySelector(".js-list-rep"),n=document.querySelector(".js-form"),r=document.querySelector(".search-btn"),i=new class{constructor(){this.query="",this.page=1,this.pageSize=5}fetchArticles(){return fetch(`https://newsapi.org/v2/everything?apiKey=27141b92df114a5392b42695bdffaae8&q=${this.query}&pageSize=${this.pageSize}&page=${this.page}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((({articles:e})=>(this.incrementPage(),e)))}incrementPage(){this.page+=1}resetPage(){this.page=1}get searchQuery(){return this.query}set searchQuery(e){this.query=e}},s=new class{constructor({selector:e,hidden:t=!1}){this.btn=document.querySelector(e),this.label=this.btn.querySelector(".js-spinner-label"),this.spinner=this.btn.querySelector(".js-spinner"),t&&this.hide()}enableSpinner(){this.spinner.hidden=!1,this.label.textContent="Loading...",this.btn.disabled=!0}disableSpinner(){this.spinner.hidden=!0,this.label.textContent="Load more...",this.btn.disabled=!1}show(){this.btn.hidden=!1}hide(){this.btn.hidden=!0}}({selector:".js-load-more",hidden:!0});function a(){s.enableSpinner(),i.fetchArticles().then((n=>{s.disableSpinner(),e(n,t),r.disabled=!1})).catch((e=>console.log(e)))}n.addEventListener("submit",(function(e){if(e.preventDefault(),r.disabled=!0,i.query=e.currentTarget.elements.query.value,!i.query)return alert("type something");s.show(),i.resetPage(),n=t,n.innerHTML="",a();var n})),s.btn.addEventListener("click",a);
//# sourceMappingURL=pagination.9aae842a.js.map
