document.querySelectorAll('.accb').forEach(function(b){b.addEventListener('click',function(){b.parentNode.classList.toggle('open');burst(b)})});
document.querySelectorAll('[data-open]').forEach(function(a){a.addEventListener('click',function(){setTimeout(function(){document.getElementById('acc-'+a.dataset.open).classList.add('open')},450)})});
var D={vip:[['🌙','VIP Lua','R$ 25,00','Tag exclusiva e kit diário'],['🌕','VIP Lunar','R$ 45,00','Tudo do VIP Lua e mais vantagens'],['🌹','VIP Lua Carmesim','R$ 125,00','Todas as vantagens e prioridade']],cash:[['💎','1.000 Cash','R$ 11,00','Para usar na loja do servidor'],['💎','5.500 Cash','R$ 55,00','Pacote com bônus'],['💎','12.000 Cash','R$ 110,00','Melhor custo-benefício']],pets:[['🦊','Raposa','R$ 12,00','Companheira esperta'],['🐺','Lobo Sombrio','R$ 18,00','Guarda fiel'],['🐲','Dragãozinho','R$ 30,00','Raro e brilhante']],rel:[['🗡️','Espada Rosa','R$ 25,00','Relíquia com brilho de cerejeira'],['🌸','Pétala Eterna','R$ 20,00','Efeito de pétalas'],['👑','Coroa da Lua','R$ 40,00','Relíquia lendária']]};
function shop(c){var h='';D[c].forEach(function(p,i){h+='<div class="prod" style="animation-delay:'+(i*.08)+'s"><span class="ic">'+p[0]+'</span><b>'+p[1]+'</b><small>'+p[3]+'</small><span class="pr">'+p[2]+'</span><div class="pb"><button class="btn sm addb" data-act="add" data-id="'+c+i+'" title="Adicionar ao carrinho">+</button><button class="btn sm" data-act="buy" data-id="'+c+i+'">Comprar</button></div></div>'});document.getElementById('shop').innerHTML=h}
document.getElementById('cats').addEventListener('click',function(e){var b=e.target.closest('.cat');if(!b)return;document.querySelectorAll('.cat').forEach(function(x){x.classList.toggle('on',x===b)});shop(b.dataset.c);burst(b)});

shop('vip');
var CAT={},cart={},step=1,pct=0,pay='pix',order=null,PCT=10,CODE='NYX10';
try{cart=JSON.parse(localStorage.getItem('nyxcart')||'{}')}catch(e){}
Object.keys(D).forEach(function(c){D[c].forEach(function(p,i){CAT[c+i]={n:p[1],ic:p[0],v:parseFloat(p[2].replace('R$','').replace(/\./g,'').replace(',','.'))}})});
var db2=document.getElementById('db'),dr=document.getElementById('drawer'),ov=document.getElementById('ov'),fab=document.getElementById('cartfab');
function fmt(v){return 'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function save(){try{localStorage.setItem('nyxcart',JSON.stringify(cart))}catch(e){}}
function ids(){return Object.keys(cart).filter(function(k){return CAT[k]&&cart[k]>0})}
function sub(){return ids().reduce(function(a,k){return a+CAT[k].v*cart[k]},0)}
function tot(){return sub()*(1-pct/100)}
function upd(){document.getElementById('cc').textContent=ids().reduce(function(a,k){return a+cart[k]},0)}
function say2(t){if(window.nyxSay)nyxSay(t)}
function add(id){cart[id]=(cart[id]||0)+1;save();upd();fab.classList.remove('bump');void fab.offsetWidth;fab.classList.add('bump');say2('Adicionei '+CAT[id].n+' ao carrinho! 🛒')}
function openD(){if(step===3)step=1;ren();dr.classList.add('on');ov.classList.add('on')}
function closeD(){dr.classList.remove('on');ov.classList.remove('on')}
function totals(){var s1=sub();return '<div class="tot"><div><span>Subtotal</span><span>'+fmt(s1)+'</span></div>'+(pct?'<div><span>Desconto ('+pct+'%)</span><span>-'+fmt(s1*pct/100)+'</span></div>':'')+'<div class="g"><b>Total</b><b>'+fmt(tot())+'</b></div></div>'}
var PM={pix:['⚡ Pix','Pagamento instantâneo. As instruções aparecem ao finalizar.'],card:['💳 Cartão de crédito','Você será direcionado ao checkout seguro do cartão.'],boleto:['📄 Boleto','O boleto pode levar alguns dias para compensar.']};
function ren(){var h='',L=ids();document.getElementById('dt').textContent=step===1?'🛒 Carrinho':step===2?'💳 Pagamento':'✅ Pedido feito';
if(step===1){if(!L.length)h='<p class="em">Seu carrinho está vazio.<br><br>Toque no + dos itens da loja para adicionar.</p>';
else{h=L.map(function(k){return '<div class="ci"><span class="ic">'+CAT[k].ic+'</span><div class="in"><b>'+CAT[k].n+'</b><small>'+fmt(CAT[k].v)+'</small></div><div class="q"><button data-a="m" data-id="'+k+'">−</button><span>'+cart[k]+'</span><button data-a="p" data-id="'+k+'">+</button></div><button class="del" data-a="d" data-id="'+k+'">🗑</button></div>'}).join('')+'<div class="cp"><input id="cin" placeholder="Cupom de desconto" style="margin:0"><button class="btn sm" data-a="c">Aplicar</button></div><div class="msg" id="cmsg">'+(pct?'Cupom aplicado: '+pct+'% de desconto 🎟':'')+'</div>'+totals()+'<button class="btn" style="width:100%" data-a="go">Ir para pagamento</button>'}}
else if(step===2){h='<label>Seu nick no Minecraft *</label><input id="nick" maxlength="16" placeholder="Ex: Nyx" autocomplete="off" value="'+(window.nyxNick||'')+'"><label>E-mail (opcional)</label><input id="mail" type="email" placeholder="voce@email.com"><p>Forma de pagamento</p>'+Object.keys(PM).map(function(k){return '<button class="pm'+(pay===k?' sel':'')+'" data-a="pay" data-p="'+k+'">'+PM[k][0]+'</button>'}).join('')+'<p style="font-size:12px">'+PM[pay][1]+'</p>'+totals()+'<div class="msg er" id="emsg"></div><div class="row2"><button class="btn sm" data-a="back">Voltar</button><button class="btn" data-a="fin">Finalizar</button></div>'}
else{var ins=order.pay==='pix'?'Pague via Pix com a chave abaixo e envie o comprovante no Discord.<div class="box">Chave Pix: (coloque sua chave aqui)</div>':order.pay==='card'?'O link seguro de pagamento no cartão será enviado para você.':'O boleto será enviado para você. Itens liberados após a compensação.';
h='<div class="ok">✅</div><p style="text-align:center">Pedido <b>'+order.id+'</b> registrado, '+order.nick+'!</p>'+order.items.map(function(x){return '<div class="ci"><span class="ic">'+x.ic+'</span><div class="in"><b>'+x.n+'</b><small>x'+x.q+'</small></div></div>'}).join('')+'<div class="tot"><div class="g"><b>Total</b><b>'+fmt(order.total)+'</b></div><div><span>Pagamento</span><span>'+PM[order.pay][0]+'</span></div></div><p>'+ins+'</p><button class="btn" style="width:100%" data-a="done">Concluir</button>'}
db2.innerHTML=h;db2.style.animation='none';void db2.offsetWidth;db2.style.animation=''}
db2.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var a=b.dataset.a,id=b.dataset.id;
if(a==='p')cart[id]++;else if(a==='m')cart[id]=Math.max(0,cart[id]-1);else if(a==='d')delete cart[id];
else if(a==='c'){var v=document.getElementById('cin').value.trim().toUpperCase();var pc=v===CODE?PCT:(window.nyxCoupon?nyxCoupon(v):0);if(pc){pct=pc;window._cp=v;ren()}else{pct=0;var m=document.getElementById('cmsg');m.className='msg er';m.textContent='Cupom inválido.';return}}
else if(a==='go'){step=2;ren();return}else if(a==='back'){step=1;ren();return}
else if(a==='pay'){var n1=document.getElementById('nick').value,m1=document.getElementById('mail').value;pay=b.dataset.p;ren();document.getElementById('nick').value=n1;document.getElementById('mail').value=m1;return}
else if(a==='fin'){var nk=document.getElementById('nick').value.trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(nk)){document.getElementById('emsg').textContent='Digite um nick válido (3 a 16 letras, números ou _).';return}
order={id:'#NYX'+Math.floor(1000+Math.random()*9000),nick:nk,pay:pay,total:tot(),items:ids().map(function(k){return {ic:CAT[k].ic,n:CAT[k].n,q:cart[k]}})};if(window.nyxAddOrder)nyxAddOrder(order);step=3;cart={};pct=0;save();upd();ren();say2('Pedido feito, '+nk+'! Obrigada pela compra 💖');return}
else if(a==='done'){step=1;closeD();return}
save();upd();ren()});
document.getElementById('shop').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;add(b.dataset.id);if(b.dataset.act==='buy')openD()});
fab.addEventListener('click',openD);ov.addEventListener('click',closeD);document.getElementById('cx').addEventListener('click',closeD);upd();
