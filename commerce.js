'use strict';
window.NasherCommerce = {
 price(ad,language,settings) {
  const ar=language==='ar', root=document.createElement('p');root.className='price';
  if(ad.status==='sold'&&(ad.price_hidden||settings?.show_sold_price===false))return root;
  const money=value=>Number(value).toLocaleString(ar?'ar-AE':'en-AE',{maximumFractionDigits:2})+' '+(ar?'درهم':'AED');
  if(ad.status==='sold') {
   const label=document.createElement('span');label.className='last-asking';
   label.textContent=ar?'آخر سعر مطلوب':'Last asking price';root.append(label);
  }
  if(ad.status!=='sold'&&ad.previous_price>ad.price&&!ad.price_on_request) {
   const previous=document.createElement('del');previous.textContent=money(ad.previous_price);root.append(previous);
   const discount=document.createElement('span');discount.className='tag discount';
   const rate=(ad.previous_price-ad.price)*100/ad.previous_price;
   discount.textContent=(ar?'خصم ':'Save ')+(rate<0.01?'<0.01':rate.toLocaleString(ar?'ar-AE':'en-AE',{maximumFractionDigits:2}))+'%';
   root.append(discount);
  }
  const current=document.createElement('span');current.textContent=ad.price_on_request?(ar?'السعر عند الطلب':'Price on request'):money(ad.price);
  root.append(current);return root;
 },
 filter(query,value) {
  const active='and(status.eq.active,expires_at.gt.'+new Date().toISOString()+')';
  if(value==='available')return query.eq('status','active').gt('expires_at',new Date().toISOString());
  if(value==='sold')return query.eq('status','sold');
  return query.or(active+',status.eq.sold');
 }
};
