import{S as g,i as c}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const u=document.querySelector(".gallery");let l="";function p(s){l="",u.innerHTML=l;for(let r=0;r<s.hits.length;r++)l+=`<li class="gallery-item">
         <a class="gallery-link" href="${s.hits[r].largeImageURL}">
         <img class="gallery-image"
                src="${s.hits[r].webformatURL}"
                alt="${s.hits[r].tags}"/> </a>
        <ul class="stat">
          <li class="detals-stat">
           <h2 class="description">Likes</h2>
           <p class="stat-value">${s.hits[r].likes}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Views</h2>
           <p class="stat-value">${s.hits[r].views}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Comments</h2>
           <p class="stat-value">${s.hits[r].comments}</p>
          </li>
          <li class="detals-stat">
           <h2 class="description">Downloads</h2>
           <p class="stat-value">${s.hits[r].downloads}</p>
          </li>
        </ul>
        </li>`;u.innerHTML=l,new g(".gallery-item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}const m=document.querySelector(".form"),h=document.querySelector(".button"),f=document.querySelector(".loader"),i={url:"https://pixabay.com/api/",KEY:"42515741-a33332df4257bc0cfcc74fb38",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};f.style.display="none";m.addEventListener("submit",d);function d(s){f.style.display="block",s.preventDefault(),i.q=s.target.search.value.trim(),i.q===""?(h.disabled=!0,c.warning({title:"Look at me",message:"Ви не ввели що треба шукати",messageColor:"black",messageSize:"16",backgroundColor:"orange",theme:"dark",position:"topRight"})):(h.disabled=!1,fetch(`${i.url}?key=${i.KEY}&q=${i.q}&image_type=${i.image_type}&orientation=${i.orientation}&safesearch=${i.safesearch}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(t.hits.length===0)return c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",position:"topRight"});p(t)}).catch(t=>{console.log(t)}).finally(()=>{m.reset()}))}
//# sourceMappingURL=commonHelpers.js.map
