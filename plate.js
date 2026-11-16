/* Nasher plate compositor. Original illustration files stay unchanged.
   SVG viewports reuse their digit artwork rather than approximating the font. */
(function(){let serial=0;const NS='http://www.w3.org/2000/svg';
function node(tag,attrs={},text){const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n}
const boxes=[[473,330,91,169],[587,330,102,169],[698,330,105,169],[807,330,106,169],[925,330,113,169]];
function glyph(d,x,y,w,h,filter){const i='1234567890'.indexOf(d),box=d==='6'?[469,330,106,169]:boxes[i%5];const g=node('svg',{x,y,width:w,height:h,viewBox:box.join(' '),preserveAspectRatio:'none'});const im=node('image',{href:'assets/plates/variant1_ex'+(i<5?'1':'2')+'.png',width:1080,height:1080});if(filter)im.setAttribute('filter',filter);g.append(im);return g}
// Dubai uses the supplied reference artwork via SVG viewports; source PNGs are unchanged.
function dubai(target,code,number,variant){
 if(!/^([A-Z]|AA|BB|CC|DD|EE|FF|GG)$/.test(code)||!/^[1-9][0-9]{0,4}$/.test(number)||Number(variant)!==1){target.replaceChildren();return;}
 const svg=node('svg',{viewBox:'0 0 720 166',role:'img','aria-label':'Dubai '+code+' / '+number,class:'generated-plate'});
 svg.append(node('title',{},'Dubai — '+code+' / '+number));
 const base=node('svg',{x:0,y:0,width:720,height:166,viewBox:'0 75 720 166'});base.append(node('image',{href:'assets/plates/dubai-1.png',width:720,height:258}));svg.append(base);
 svg.append(node('rect',{x:318,y:20,width:302,height:123,fill:'#d9dde6'}));
 const boxes=[[323,101,51,113],[380,101,52,113],[437,101,51,113],[492,101,53,113],[550,101,53,113]];
 const total=number.length*49+(number.length-1)*8,start=462-total/2;
 [...number].forEach((d,i)=>{const even='24680',odd='13579',k=even.includes(d)?even.indexOf(d):odd.indexOf(d),g=node('svg',{x:start+i*57,y:26,width:49,height:113,viewBox:boxes[k].join(' '),preserveAspectRatio:'none'});g.append(node('image',{href:'assets/plates/dubai-'+(even.includes(d)?1:2)+'.png',width:720,height:258}));svg.append(g)});
 svg.append(node('rect',{x:43,y:78,width:119,height:69,fill:'#d9dde6'}));
 // Reference letter artwork where supplied; remaining letters use a close font match.
 const letters={A:[7,75,152,57,68],C:[1,75,152,57,68],D:[5,54,152,50,70],G:[6,48,152,55,68],I:[2,89,152,26,68],M:[3,73,152,58,68],W:[4,66,152,71,68]};
 const ref=letters[code[0]];
 if(ref){const [file,x,y,width,height]=ref,total=code.length*width;[...code].forEach((c,i)=>{const glyph=node('svg',{x:102-total/2+i*width,y:77,width,height,viewBox:[x,y,width,height].join(' ')});glyph.append(node('image',{href:'assets/plates/dubai-'+file+'.png',width:720,height:file===5?262:258}));svg.append(glyph)});target.replaceChildren(svg);return;}

 // Layered SVG relief: recessed shadow, bright upper-left edge, metallic rim,
 // and black face. Geometry remains a close font match for unprovided letters.
 const attrs={x:102,y:140,'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':82,'font-weight':'700','textLength':code.length===1?45:90,'lengthAdjust':'spacingAndGlyphs','stroke-linejoin':'round','paint-order':'stroke fill'};
 const effectId='dubaiRelief'+(++serial),defs=node('defs');
 const softness=node('filter',{id:effectId,x:'-12%',y:'-12%',width:'124%',height:'124%','color-interpolation-filters':'sRGB'});
 softness.append(node('feGaussianBlur',{stdDeviation:0.28}));defs.append(softness);
 const face=node('linearGradient',{id:effectId+'Face',x1:'0%',y1:'0%',x2:'65%',y2:'100%'});
 for(const [offset,color]of[['0%','#292a2b'],['18%','#101112'],['45%','#020202'],['80%','#080808'],['100%','#18191a']])face.append(node('stop',{offset,'stop-color':color}));
 defs.append(face);svg.append(defs);
 const relief=node('g',{'aria-hidden':'true',filter:'url(#'+effectId+')'});
 relief.append(node('text',{...attrs,transform:'translate(1.7 1.8)',fill:'#85878a',stroke:'#85878a','stroke-width':3.5},code));
 relief.append(node('text',{...attrs,transform:'translate(-1.15 -1.35)',fill:'#efefed',stroke:'#efefed','stroke-width':2.7},code));
 relief.append(node('text',{...attrs,fill:'#050505',stroke:'#96989c','stroke-width':2},code));
 relief.append(node('text',{...attrs,fill:'url(#'+effectId+'Face)'},code));
 svg.append(relief);target.replaceChildren(svg);
}
// Sharjah: original artwork, one layout, blank code area for the none sentinel.
function sharjah(target,code,number,variant){
 if(!['none','1','2','3','4'].includes(code)||!/^[1-9][0-9]{0,4}$/.test(number)||Number(variant)!==1){target.replaceChildren();return;}
 const label='Sharjah '+(code==='none'?'No code':code)+' / '+number,svg=node('svg',{viewBox:'0 0 720 164',role:'img','aria-label':label,class:'generated-plate'});
 svg.append(node('title',{},label));
 const base=node('svg',{x:0,y:0,width:720,height:164,viewBox:'0 195 720 164'});base.append(node('image',{href:'assets/plates/sharjah-1.png',width:720,height:720}));svg.append(base);
 svg.append(node('rect',{x:426,y:33,width:224,height:94,fill:'#d9dde6'}),node('rect',{x:99,y:49,width:39,height:70,fill:'#d9dde6'}));
 const boxes=[[435,231,33,89],[476,231,40,89],[519,231,39,89],[562,231,39,89],[606,231,39,89],[429,231,43,89],[474,231,40,89],[516,231,45,89],[558,231,42,89],[604,231,43,89]];
 function digit(d,x,y,width,height){const k='1234567890'.indexOf(d),g=node('svg',{x,y,width,height,viewBox:boxes[k].join(' '),preserveAspectRatio:'none'});g.append(node('image',{href:'assets/plates/sharjah-'+(k<5?1:2)+'.png',width:720,height:720}));return g;}
 const total=number.length*43,start=538-total/2;
 [...number].forEach((d,i)=>svg.append(digit(d,start+i*43+(43-boxes['1234567890'.indexOf(d)][2])/2,36,boxes['1234567890'.indexOf(d)][2],89)));
 if(code!=='none')svg.append(digit(code,101,51,34,66));
 target.replaceChildren(svg);
}
window.NasherPlate={render(target,code,number,variant=1,emirate="abu_dhabi"){code=String(code);number=String(number);if(emirate==="sharjah"){sharjah(target,code,number,variant);return;}if(emirate==="dubai"){dubai(target,code,number,variant);return;}if(!/^[1-9][0-9]*$/.test(code)||code.length>10||!/^[1-9][0-9]{0,4}$/.test(number)||![1,2].includes(Number(variant))){target.replaceChildren();return}variant=Number(variant);const white='whiteCode'+(++serial),svg=node('svg',{viewBox:'0 0 1080 240',role:'img','aria-label':'Abu Dhabi '+code+' / '+number,class:'generated-plate'});svg.append(node('title',{},'Abu Dhabi — '+code+' / '+number));const defs=node('defs');const f=node('filter',{id:white,'color-interpolation-filters':'sRGB',x:'-2%',y:'-2%',width:'104%',height:'104%'});f.append(node('feColorMatrix',{type:'matrix',values:'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.1 -1.1 -1.1 0 2.8'}));defs.append(f);svg.append(defs);
const base=node('svg',{viewBox:'0 298 1080 240',x:0,y:0,width:1080,height:240});base.append(node('image',{href:`assets/plates/variant${variant}_ex1.png`,width:1080,height:1080}));svg.append(base);
svg.append(node('rect',{x:465,y:28,width:578,height:179,fill:'#d9dde6'}));
const digitW=96,gap=16,total=number.length*digitW+(number.length-1)*gap,start=465+(578-total)/2;
[...number].forEach((d,i)=>svg.append(glyph(d,start+i*(digitW+gap),34,digitW,164)));
const red=variant===2;svg.append(node('rect',{x:red?28:30,y:29,width:red?153:139,height:red?176:100,fill:red?'#ca1a1c':'#d9dde6'}));const singleRed=red&&code.length===1;const codeW=Math.min(red?(singleRed?65:55):50,(red?145:130)/code.length-5),codeH=red?(singleRed?133:115):80,cTotal=code.length*codeW+(code.length-1)*5,cStart=(red?104.5:99.5)-cTotal/2;
[...code].forEach((d,i)=>svg.append(glyph(d,cStart+i*(codeW+5),red?(singleRed?53:62):34,codeW,codeH,red?'url(#'+white+')':null)));
target.replaceChildren(svg);
}};
// Build privately, embed every reference, then show only the finished PNG.
// Source assets remain public web resources; this is presentation, not access control.
const compose=window.NasherPlate.render,requests=new WeakMap(),assets=new Map();
function embeddedAsset(href){
 if(!assets.has(href)){
  const pending=fetch(href).then(response=>{if(!response.ok)throw new Error('Plate asset unavailable');return response.blob()}).then(blob=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Plate asset unreadable'));reader.readAsDataURL(blob)})).catch(error=>{assets.delete(href);throw error});
  assets.set(href,pending);
 }
 return assets.get(href);
}
function decodeImage(source){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Plate rendering failed'));img.src=source})}
window.NasherPlate.render=function(target,code,number,variant=1,emirate='abu_dhabi'){
 const request={},scratch=document.createElement('div');requests.set(target,request);
 compose(scratch,code,number,variant,emirate);
 const svg=scratch.firstElementChild;target.replaceChildren();
 if(!svg){target.removeAttribute('aria-busy');return Promise.resolve()}
 const label=svg.getAttribute('aria-label');
 const width=emirate==='abu_dhabi'?1080:720,height=emirate==='sharjah'?164:emirate==='dubai'?166:240;
 const placeholder=document.createElement('div');placeholder.style.aspectRatio=width+'/'+height;placeholder.setAttribute('aria-label',label);target.append(placeholder);target.setAttribute('aria-busy','true');
 return (async()=>{
  try{
   await Promise.all([...svg.querySelectorAll('image')].map(async image=>image.setAttribute('href',await embeddedAsset(image.getAttribute('href')))));
   if(requests.get(target)!==request)return;
   svg.setAttribute('width',width);svg.setAttribute('height',height);
   const serialized=new XMLSerializer().serializeToString(svg);
   const source='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(serialized);
   const rendered=await decodeImage(source);
   if(requests.get(target)!==request)return;
   const canvas=document.createElement('canvas');canvas.width=width*2;canvas.height=height*2;
   const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');
   context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(rendered,0,0,canvas.width,canvas.height);
   const output=await decodeImage(canvas.toDataURL('image/png'));
   if(requests.get(target)!==request)return;
   output.className='generated-plate';output.alt=label;output.width=canvas.width;output.height=canvas.height;
   target.replaceChildren(output);
  }catch(error){
   if(requests.get(target)!==request)return;
   const message=document.createElement('p');message.textContent=document.documentElement.lang==='ar'?'تعذر عرض رسم اللوحة. أعد تحميل الصفحة للمحاولة.':'Could not render the plate. Reload the page to retry.';message.setAttribute('role','status');target.replaceChildren(message);
  }finally{if(requests.get(target)===request)target.removeAttribute('aria-busy')}
 })();
};
})();
