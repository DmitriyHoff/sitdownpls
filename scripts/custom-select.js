"use strict";var e,t,s,n,i,c,l,a,o;for(n=(e=document.getElementsByClassName("custom-select")).length,t=0;t<n;t++){for(e[t].tabIndex=0,i=(c=e[t].getElementsByTagName("select")[0]).length,(l=document.createElement("div")).setAttribute("class","custom-select--selected"),l.innerHTML=c.options[c.selectedIndex].innerHTML,e[t].appendChild(l),(a=document.createElement("div")).setAttribute("class","custom-select__items custom-select--hide"),s=1;s<i;s++)(o=document.createElement("div")).innerHTML=c.options[s].innerHTML,o.addEventListener("click",(function(){var e,t,s,n,i,c,l;for(c=(n=this.parentNode.parentNode.getElementsByTagName("select")[0]).length,i=this.parentNode.previousSibling,t=0;t<c;t++)if(n.options[t].innerHTML==this.innerHTML){for(n.selectedIndex=t,i.innerHTML=this.innerHTML,l=(e=this.parentNode.getElementsByClassName("same-as-selected")).length,s=0;s<l;s++)e[s].removeAttribute("class");this.setAttribute("class","same-as-selected");break}i.click()})),a.appendChild(o);e[t].appendChild(a),l.addEventListener("click",(function(e){e.stopPropagation(),d(this),this.nextSibling.classList.toggle("custom-select--hide"),this.classList.toggle("--arrow-active")}))}function d(e){var t,s,n,i,c,l=[];for(t=document.getElementsByClassName("custom-select__items"),s=document.getElementsByClassName("custom-select--selected"),i=t.length,c=s.length,n=0;n<c;n++)e==s[n]?l.push(n):s[n].classList.remove("--arrow-active");for(n=0;n<i;n++)l.indexOf(n)&&t[n].classList.add("custom-select--hide")}document.addEventListener("click",d);