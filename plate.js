/* Nasher plate compositor. Original illustration files stay unchanged.
   SVG viewports reuse their digit artwork rather than approximating the font. */
(function(){let serial=0;const NS='http://www.w3.org/2000/svg';
function node(tag,attrs={},text){const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n}
const boxes=[[473,330,91,169],[587,330,102,169],[698,330,105,169],[807,330,106,169],[925,330,113,169]];
function glyph(d,x,y,w,h,filter){const i='1234567890'.indexOf(d),box=boxes[i%5];const g=node('svg',{x,y,width:w,height:h,viewBox:box.join(' '),preserveAspectRatio:'none'});const im=node('image',{href:'assets/plates/variant1_ex'+(i<5?'1':'2')+'.png',width:1080,height:1080});if(filter)im.setAttribute('filter',filter);g.append(im);return g}
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
 const letters={A:[7,75,152,57,68],C:[1,75,152,57,68],D:[5,55,152,48,68],G:[6,48,152,55,68],I:[2,89,152,26,68],M:[3,73,152,58,68],W:[4,66,152,71,68]};
 const ref=letters[code[0]];
 if(ref){const [file,x,y,width,height]=ref,total=code.length*width;[...code].forEach((c,i)=>{const glyph=node('svg',{x:102-total/2+i*width,y:77,width,height,viewBox:[x,y,width,height].join(' ')});glyph.append(node('image',{href:'assets/plates/dubai-'+file+'.png',width:720,height:258}));svg.append(glyph)});target.replaceChildren(svg);return;}

 const label=node('text',{x:102,y:140,'text-anchor':'middle','font-family':'Arial, sans-serif','font-size':70,'font-weight':'600',fill:'#050505',stroke:'#a4a6a9','stroke-width':1,'paint-order':'stroke fill','textLength':code.length===1?45:90,'lengthAdjust':'spacingAndGlyphs'},code);svg.append(label);target.replaceChildren(svg);
}
window.NasherPlate={render(target,code,number,variant=1,emirate="abu_dhabi"){code=String(code);number=String(number);if(emirate==="dubai"){dubai(target,code,number,variant);return;}if(!/^[1-9][0-9]*$/.test(code)||code.length>10||!/^[1-9][0-9]{0,4}$/.test(number)||![1,2].includes(Number(variant))){target.replaceChildren();return}variant=Number(variant);const white='whiteCode'+(++serial),svg=node('svg',{viewBox:'0 0 1080 240',role:'img','aria-label':'Abu Dhabi '+code+' / '+number,class:'generated-plate'});svg.append(node('title',{},'Abu Dhabi — '+code+' / '+number));const defs=node('defs');const f=node('filter',{id:white,'color-interpolation-filters':'sRGB',x:'-2%',y:'-2%',width:'104%',height:'104%'});f.append(node('feColorMatrix',{type:'matrix',values:'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.1 -1.1 -1.1 0 2.8'}));defs.append(f);svg.append(defs);
const base=node('svg',{viewBox:'0 298 1080 240',x:0,y:0,width:1080,height:240});base.append(node('image',{href:`assets/plates/variant${variant}_ex1.png`,width:1080,height:1080}));svg.append(base);
svg.append(node('rect',{x:465,y:28,width:578,height:179,fill:'#d9dde6'}));
const digitW=96,gap=16,total=number.length*digitW+(number.length-1)*gap,start=465+(578-total)/2;
[...number].forEach((d,i)=>svg.append(glyph(d,start+i*(digitW+gap),34,digitW,164)));
const red=variant===2;svg.append(node('rect',{x:red?28:30,y:29,width:red?153:139,height:red?176:100,fill:red?'#ca1a1c':'#d9dde6'}));const codeW=Math.min(red?55:50,(red?145:130)/code.length-5),codeH=red?115:80,cTotal=code.length*codeW+(code.length-1)*5,cStart=(red?104.5:99.5)-cTotal/2;
[...code].forEach((d,i)=>svg.append(glyph(d,cStart+i*(codeW+5),red?62:34,codeW,codeH,red?'url(#'+white+')':null)));
target.replaceChildren(svg);
}};})();
