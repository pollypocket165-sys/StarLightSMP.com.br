(function(){var $=function(i){return document.getElementById(i)},mode='grad',fm={b:0,i:0,u:0,s:0};
function h2(n){n=Math.max(0,Math.min(255,Math.round(n)));return (n<16?'0':'')+n.toString(16)}
function rgb(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
function hx(r){return '#'+h2(r[0])+h2(r[1])+h2(r[2])}
function hsl(h){var a=h/60,x=1-Math.abs(a%2-1),r=0,g=0,b=0;if(a<1){r=1;g=x}else if(a<2){r=x;g=1}else if(a<3){g=1;b=x}else if(a<4){g=x;b=1}else if(a<5){r=x;b=1}else{r=1;b=x}return hx([r*255,g*255,b*255])}
var L=[['0',0,0,0],['1',0,0,170],['2',0,170,0],['3',0,170,170],['4',170,0,0],['5',170,0,170],['6',255,170,0],['7',170,170,170],['8',85,85,85],['9',85,85,255],['a',85,255,85],['b',85,255,255],['c',255,85,85],['d',255,85,255],['e',255,255,85],['f',255,255,255]];
function near(h){var c=rgb(h),b=L[0],d=1e9;L.forEach(function(l){var e=Math.pow(l[1]-c[0],2)+Math.pow(l[2]-c[1],2)+Math.pow(l[3]-c[2],2);if(e<d){d=e;b=l}});return b[0]}
function cols(n){var a=[],c1=$('c1').value,c2=$('c2').value,A=rgb(c1),B=rgb(c2);for(var i=0;i<n;i++){if(mode==='solid')a.push(c1);else if(mode==='rain')a.push(hsl(i/Math.max(n,1)*360));else{var t=n>1?i/(n-1):0;a.push(hx([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t]))}}return a}
function cpy(t,b){function ok(){var o=b.textContent;b.textContent='Copiado!';burst(b);setTimeout(function(){b.textContent=o},1400)}
function fb(){var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove();ok()}
try{navigator.clipboard.writeText(t).then(ok,fb)}catch(e){fb()}}
function gen(){var T=Array.from($('nk').value).slice(0,24),n=T.length,C=cols(n),pv=$('prev'),ou=$('outs');pv.textContent='';ou.textContent='';
T.forEach(function(ch,i){var sp=document.createElement('span');sp.textContent=ch;sp.style.color=C[i];if(fm.b)sp.style.fontWeight='bold';if(fm.i)sp.style.fontStyle='italic';var td=[];if(fm.u)td.push('underline');if(fm.s)td.push('line-through');if(td.length)sp.style.textDecoration=td.join(' ');pv.appendChild(sp)});
if(!n){pv.textContent='Digite um nick acima';return}
var fc=(fm.b?'&l':'')+(fm.i?'&o':'')+(fm.u?'&n':'')+(fm.s?'&m':''),fo=(fm.b?'<bold>':'')+(fm.i?'<italic>':'')+(fm.u?'<underlined>':'')+(fm.s?'<strikethrough>':''),fcl=(fm.s?'</strikethrough>':'')+(fm.u?'</underlined>':'')+(fm.i?'</italic>':'')+(fm.b?'</bold>':''),txt=T.join(''),sp1=/\s/;
var o1='',o2='',o4='',pr='';
T.forEach(function(ch,i){if(sp1.test(ch)){o1+=ch;o2+=ch;o4+=ch;return}var h=C[i];o1+='&'+h+fc+ch;o2+='&x'+h.slice(1).split('').map(function(d){return '&'+d}).join('')+fc+ch;var k=near(h);if(k!==pr){o4+='&'+k+fc;pr=k}o4+=ch});
var mm=mode==='grad'?'<gradient:'+$('c1').value+':'+$('c2').value+'>'+fo+txt+fcl+'</gradient>':mode==='solid'?'<'+$('c1').value+'>'+fo+txt+fcl:'<rainbow>'+fo+txt+fcl+'</rainbow>';
[['Formato &#RRGGBB (o mais comum)',o1],['Formato &x&R&R&G&G&B&B',o2],['MiniMessage',mm],['Cores básicas (&c, &d...)',o4]].forEach(function(r){var d=document.createElement('div');d.className='ot';var b=document.createElement('b');b.textContent=r[0];var c=document.createElement('code');c.textContent=r[1];var bt=document.createElement('button');bt.className='btn sm';bt.textContent='Copiar';bt.addEventListener('click',function(){cpy(r[1],bt)});d.appendChild(b);d.appendChild(c);d.appendChild(bt);ou.appendChild(d)})}
function vis(){$('l2').style.display=mode==='grad'?'':'none';$('c1').parentNode.style.display=mode==='rain'?'none':'';$('swap').style.display=mode==='grad'?'':'none'}
var P=[['Céu','#8fd3ff','#ffffff'],['Gelo','#cfeaff','#3d9be0'],['Sakura','#ff9ab5','#e8325f'],['Lua Carmesim','#ff4d79','#7a0f2e'],['Neon','#00f5ff','#ff00e5'],['Fogo','#ffe600','#ff3d00'],['Oceano','#00c6ff','#0072ff'],['Floresta','#a8ff78','#11998e']];
P.forEach(function(p){var b=document.createElement('button');b.className='chip';b.textContent=p[0];b.style.background='linear-gradient(90deg,'+p[1]+','+p[2]+')';b.addEventListener('click',function(){$('c1').value=p[1];$('c2').value=p[2];mode='grad';document.querySelectorAll('#modes .chip').forEach(function(x){x.classList.toggle('on',x.dataset.m==='grad')});vis();gen();burst(b)});$('presets').appendChild(b)});
$('modes').addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;mode=b.dataset.m;document.querySelectorAll('#modes .chip').forEach(function(x){x.classList.toggle('on',x===b)});vis();gen()});
$('fmts').addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;fm[b.dataset.f]=fm[b.dataset.f]?0:1;b.classList.toggle('on');gen()});
$('swap').addEventListener('click',function(){var t=$('c1').value;$('c1').value=$('c2').value;$('c2').value=t;gen()});
['nk','c1','c2'].forEach(function(i){$(i).addEventListener('input',gen)});vis();gen()})();
