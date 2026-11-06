(function(){var m=document.getElementById('mascot'),b=document.getElementById('bubble'),bt=document.getElementById('bt'),hd=document.getElementById('mhead'),C='NYX10',open=false,idx=0,iv,auto;
var msgs=['Oi, eu sou a Nyx! 💕 Clique em mim para abrir ou fechar as dicas.','Dica: durma numa cama para pular a noite e salvar seu ponto de renascimento.','🎟 Cupom NYX10: use na loja do servidor e ganhe desconto! Toque em Copiar cupom.','Dica: um balde de água no chão amortece qualquer queda.','Dica: para achar diamantes, minere perto da camada Y -59.','Dica: ilumine sua base com tochas ou lanternas para os monstros não nascerem dentro dela.','🎟 Aproveite o cupom NYX10 antes que acabe!','Dica: guarde comida, cama e um balde de água sempre no inventário.','Dica: encante sua armadura antes de ir ao Nether.','Dica: organize os baús por tipo e use placas para achar tudo rápido.','Dica do servidor: proteja seu terreno antes de sair da base.'];
var ctx={votar:'Vote todo dia para ajudar o servidor a crescer! 🗳',ferramentas:'Crie seu nick colorido e copie o código! 🌈',inicio:'De volta ao início! Copie o IP e venha jogar. ⛏',info:'Toque nos títulos para abrir modos, eventos, como entrar e regras.',loja:'Na loja tem VIP, cash, pets e relíquias. Use o cupom NYX10! 🎟',discord:'Entre no Discord para falar com a gente e saber dos cupons! 🎟'};
function say(t){clearInterval(iv);bt.textContent='';var i=0;m.classList.add('talk');iv=setInterval(function(){bt.textContent=t.slice(0,++i);if(i>=t.length){clearInterval(iv);m.classList.remove('talk')}},24)}
function next(){idx=(idx+1)%msgs.length;say(msgs[idx])}
function setOpen(v){open=v;b.classList.toggle('off',!v);clearInterval(auto);if(v){say(msgs[idx]);auto=setInterval(next,14000)}else{clearInterval(iv);m.classList.remove('talk')}}
window.nyxSay=function(t){if(!open)setOpen(true);say(t)};
document.getElementById('hit').addEventListener('click',function(){setOpen(!open)});
document.getElementById('nx').addEventListener('click',function(){next();clearInterval(auto);auto=setInterval(next,14000)});
var c2=document.getElementById('cp2');c2.addEventListener('click',function(){function ok(){c2.textContent='Copiado!';burst(c2);setTimeout(function(){c2.textContent='Copiar cupom'},1500)}
function fb(){var x=document.createElement('textarea');x.value=C;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove();ok()}
try{navigator.clipboard.writeText(C).then(ok,fb)}catch(e){fb()}});
tabs.forEach(function(t){t.addEventListener('click',function(){if(open&&ctx[t.dataset.tab])say(ctx[t.dataset.tab])})});
setTimeout(function(){setOpen(true)},1300);
(function bl(){hd.classList.remove('blink');void hd.offsetWidth;hd.classList.add('blink');setTimeout(bl,2200+Math.random()*3200)})();
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var tx=0,ty=0,cx=0,cy=0;
addEventListener('pointermove',function(e){var r=m.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width*.52))/(innerWidth*.5),dy=(e.clientY-(r.top+r.height*.2))/(innerHeight*.5);tx=Math.max(-1,Math.min(1,dx));ty=Math.max(-1,Math.min(1,dy))});
(function lp(){cx+=(tx-cx)*.09;cy+=(ty-cy)*.09;var k=m.offsetWidth/250;hd.style.transform='translate('+(cx*4*k).toFixed(2)+'px,'+(cy*3*k).toFixed(2)+'px) rotate('+(cx*2.5).toFixed(2)+'deg)';requestAnimationFrame(lp)})()})();
