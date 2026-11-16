/* Shared listing contact controls: full call numbers are never fetched here. */
window.NasherContacts={
 async load(db,rows){if(!rows.length)return new Map();const r=await db.rpc('nasher_card_contacts',{p_ids:rows.map(a=>a.id)});if(r.error)throw r.error;return new Map((r.data||[]).map(c=>[c.ad_id,c]));},
 render(ad,c,lang){const ar=lang==='ar',box=document.createElement('div');box.className='listing-contacts';
 const control=(label,cls,href,hint)=>{const e=document.createElement(href?'a':'button');e.className=cls;e.textContent=label;if(href)e.href=href;else{e.type='button';e.disabled=true;}if(hint)e.title=hint;box.append(e);return e;};
 if(c?.login_required){control('WhatsApp','contact-whatsapp',c.whatsapp_available?'account.html':null,ar?'سجّل الدخول لعرض الاتصال':'Sign in to view contact');control(ar?'تسجيل الدخول':'Sign in','contact-call',c.call_available?'account.html':null);return box;}
 const wa=c?.whatsapp_number;if(/^\+[1-9][0-9]{6,14}$/.test(wa||'')){const a=control('WhatsApp','contact-whatsapp','https://wa.me/'+wa.slice(1));a.target='_blank';a.rel='noopener noreferrer';}else control('WhatsApp','contact-whatsapp',null,ar?'واتساب غير متاح':'WhatsApp unavailable');
 const call=control(c?.call_masked|| (ar?'اتصال':'Call'),'contact-call',c?.call_masked?'ad.html?id='+encodeURIComponent(ad.id):null,ar?'افتح الإعلان لإظهار الرقم كاملاً':'Open the ad to reveal the full number');call.dir='ltr';return box;
 }};
