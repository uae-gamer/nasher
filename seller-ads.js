(function(){
 let client,id,lang='ar',page=0,count=0,rows=[],generation=0,settings={},status='';
 const size=10,$=id=>document.getElementById(id);
 const words={
  ar:{empty:'لا توجد إعلانات مطابقة.',error:'تعذر تحميل الإعلانات. أعد تحميل الصفحة للمحاولة.',loading:'جارٍ تحميل الإعلانات…',next:'التالي',previous:'السابق',abu_dhabi:'أبوظبي',dubai:'دبي',umm_al_quwain:'أم القيوين',fujairah:'الفجيرة',ajman:'عجمان',ras_al_khaimah:'رأس الخيمة',sharjah:'الشارقة',noCode:'بدون رمز',all:'الكل',available:'متاح',sold:'تم البيع',show:'عرض'},
  en:{empty:'No matching ads.',error:'Could not load ads. Reload to retry.',loading:'Loading ads…',next:'Next',previous:'Previous',abu_dhabi:'Abu Dhabi',dubai:'Dubai',umm_al_quwain:'Umm Al Quwain',fujairah:'Fujairah',ajman:'Ajman',ras_al_khaimah:'Ras Al Khaimah',sharjah:'Sharjah',noCode:'No code',all:'All',available:'Available',sold:'Sold',show:'Show'}
 };
 function node(tag,value,cls){const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;return n;}
 function draw(){
  if(!$('seller-ad-grid'))return;
  const w=words[lang];
  $('seller-filter-label').textContent=w.show;
  [...$('seller-filter').options].forEach(o=>o.textContent=w[o.value]);
  $('seller-ads-message').textContent=status?w[status]:'';
  $('seller-ad-grid').replaceChildren(...rows.map(a=>{
   const card=node('article','','listing-card'),link=node('a','','card-art');
   const title=w[a.emirate]+' · \u2066'+(a.plate_code==='none'?w.noCode:a.plate_code)+' / '+a.plate_number+'\u2069';
   link.href='ad.html?id='+a.id;link.setAttribute('aria-label',title);
   NasherPlate.render(link,a.plate_code,a.plate_number,a.variant,a.emirate);
   const body=node('div','','card-body');body.append(node('h2',title),NasherCommerce.price(a,lang,settings));
   if(a.status==='sold')body.append(node('span',w.sold,'tag sold-tag'));
   card.append(link,body);return card;
  }));
  $('seller-prev').textContent=w.previous;$('seller-next').textContent=w.next;
  $('seller-prev').disabled=page===0;$('seller-next').disabled=(page+1)*size>=count;
  $('seller-page').textContent=(page+1)+' / '+Math.max(1,Math.ceil(count/size));
 }
 async function load(){
  const req=++generation;status='loading';rows=[];draw();
  try{
   let query=client.from('nasher_public_ads').select('*',{count:'exact'}).eq('seller_id',id);
   const filter=$('seller-filter').value;
   query=NasherCommerce.filter(query,filter);
   if(filter==='all')query=query.order('status',{ascending:true});
   const result=await query.order('created_at',{ascending:false}).order('id').range(page*size,(page+1)*size-1);
   if(req!==generation)return;if(result.error)throw result.error;
   rows=result.data;count=result.count||0;
   if(page>0&&!rows.length){page=Math.max(0,Math.ceil(count/size)-1);return load();}
   status=rows.length?'':'empty';
  }catch{if(req!==generation)return;status='error';}
  draw();
 }
 window.nasherSellerAdsClear=()=>{generation++;rows=[];status='';draw();};
 window.nasherSellerAdsTranslate=language=>{lang=language;draw();};
 window.nasherSellerAdsLoad=async(db,seller,language)=>{
  client=db;id=seller;lang=language;page=0;
  const request=++generation;
  const result=await client.from('nasher_settings').select('default_display_filter,show_sold_price').eq('id',1).single();
  if(request!==generation)return;
  if(result.error){status='error';draw();return;}
  settings=result.data;
  const requested=new URLSearchParams(location.search).get('status');
  $('seller-filter').value=['all','available','sold'].includes(requested)?requested:settings.default_display_filter;
  $('seller-filter').onchange=()=>{page=0;load();};
  $('seller-prev').onclick=()=>{if(page){page--;load();}};
  $('seller-next').onclick=()=>{if((page+1)*size<count){page++;load();}};
  await load();
 };
})();
