/* Navigation retains native link behavior while presenting consistent button controls. */
(()=>{'use strict';
const danger=/^(remove|delete|permanently erase|erase|reject|حذف|إزالة|مسح جميع|رفض)(\b|\s|$)/i;
function style(n){
 if(n.matches('a')){const artwork=n.matches('.brand,.module-card,.card-art,.number-art,.vehicle-art')||n.querySelector('.card-art,.number-art,.vehicle-art,img.generated-plate,svg.generated-plate');n.classList.toggle('ui-button',!artwork);}
 if(!n.matches('button,a'))return;
 const text=n.textContent.trim();let tone='';
 if(danger.test(text))tone='danger';
 else if(/^(sold|mark sold|تم البيع|تم بيع)/i.test(text))tone='warning';
 else if(/^(save|publish|submit for review|approve|حفظ|نشر|إرسال للمراجعة|موافقة)(\s|$)/i.test(text))tone='primary';
 if(n.dataset.tone!==tone){if(tone)n.dataset.tone=tone;else delete n.dataset.tone;}
}
function scan(root){if(root.nodeType!==1)return;if(root.matches('a,button'))style(root);root.querySelectorAll('a,button').forEach(style);}
scan(document.body);
new MutationObserver(records=>{const parents=new Set();for(const r of records){if(r.type==='characterData'){const p=r.target.parentElement?.closest('a,button');if(p)parents.add(p);}else{const p=r.target.closest?.('a,button');if(p)parents.add(p);r.addedNodes.forEach(scan);}}parents.forEach(style);}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
