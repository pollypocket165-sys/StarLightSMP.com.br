var tabs=document.querySelectorAll('.tab'),secs=document.querySelectorAll('section');
function burst(el){var r=el.getBoundingClientRect(),c=['#8fd3ff','#cfeaff','#ffffff','#3d9be0'];
for(var i=0;i<10;i++){var p=document.createElement('div');p.className='pt';p.style.left=(r.left+r.width/2)+'px';p.style.top=(r.top+r.height/2)+'px';p.style.background=c[i%4];
p.style.setProperty('--x',(Math.random()*120-60)+'px');p.style.setProperty('--y',(Math.random()*-90-10)+'px');document.body.appendChild(p);setTimeout(function(q){q.remove()}.bind(null,p),650)}}
function show(id,btn){tabs.forEach(function(t){t.classList.toggle('on',t.dataset.tab===id)});
var cur=document.querySelector('section.on'),nx=document.getElementById(id);clearTimeout(window._sw);if(cur&&cur!==nx){cur.classList.add('leave');window._sw=setTimeout(function(){secs.forEach(function(x){x.classList.remove('on','leave')});void nx.offsetWidth;nx.classList.add('on')},190)}else if(!cur){nx.classList.add('on')}
if(btn)burst(btn);try{history.replaceState(null,'','#'+id)}catch(e){}}
tabs.forEach(function(t){t.addEventListener('click',function(){show(t.dataset.tab,t)})});
document.querySelectorAll('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();show(a.dataset.go,a)})});
var h=location.hash.slice(1);if(h&&document.getElementById(h))show(h);

for(var k=0;k<26;k++){var q=document.createElement('div');q.className='petal';var z=6+Math.random()*8;q.style.cssText='left:'+Math.random()*100+'vw;width:'+z+'px;height:'+z+'px;animation-duration:'+(9+Math.random()*10)+'s;animation-delay:-'+Math.random()*18+'s;--dx:'+(Math.random()*200-100)+'px';document.body.appendChild(q)}
var cp=document.getElementById('copy');cp.addEventListener('click',function(){var t=document.getElementById('ip').textContent;
function ok(){cp.textContent='Copiado!';burst(cp);setTimeout(function(){cp.textContent='Copiar IP'},1500)}
function fb(){var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove();ok()}
try{navigator.clipboard.writeText(t).then(ok,fb)}catch(e){fb()}});
(function(){var t=document.getElementById('tilt');if(!t||matchMedia('(prefers-reduced-motion:reduce)').matches)return;var rx=0,ry=0,cx=0,cy=0,sh=t.querySelector('.shine');
addEventListener('pointermove',function(e){var r=t.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/(innerWidth/2),dy=(e.clientY-(r.top+r.height/2))/(innerHeight/2);dx=Math.max(-1,Math.min(1,dx));dy=Math.max(-1,Math.min(1,dy));ry=dx*16;rx=-dy*12;sh.style.setProperty('--mx',(50+dx*40)+'%');sh.style.setProperty('--my',(40+dy*40)+'%')});
document.addEventListener('mouseleave',function(){rx=0;ry=0});
(function loop(){cx+=(rx-cx)*.08;cy+=(ry-cy)*.08;t.style.setProperty('--rx',cx.toFixed(2)+'deg');t.style.setProperty('--ry',cy.toFixed(2)+'deg');requestAnimationFrame(loop)})()})();
