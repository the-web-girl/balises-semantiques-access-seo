  function dessinerCanvas(){
    var cv=document.getElementById('demo-canvas');
    if(!cv)return;
    var ctx=cv.getContext('2d');
    ctx.fillStyle='#1a1a2e';ctx.fillRect(0,0,300,100);
    ctx.beginPath();ctx.arc(50,50,35,0,Math.PI*2);
    ctx.fillStyle='#22c55e';ctx.fill();
    ctx.fillStyle='#b91c1c';ctx.fillRect(100,20,80,60);
    ctx.fillStyle='#fff';ctx.font='14px monospace';
    ctx.fillText('Canvas 2D',195,55);
  }
  dessinerCanvas();

  var spanAnnee=document.getElementById('annee');
  if(spanAnnee)spanAnnee.textContent=new Date().getFullYear();

  function demoToggleAriaPressed(btn){var e=btn.getAttribute('aria-pressed')==='true';btn.setAttribute('aria-pressed',String(!e));btn.style.background=!e?'var(--accent)':'#f0f4f8';btn.style.color=!e?'#fff':'inherit';}
  function demoDialogOuvrir(){var d=document.getElementById('demo-dialog');if(d)d.showModal();}
  function demoDialogFermer(){var d=document.getElementById('demo-dialog');if(d)d.close();}
  function demoTemplateAjouter(){var tpl=document.getElementById('carte-template');var cont=document.getElementById('template-container');if(!tpl||!cont)return;var clone=tpl.content.cloneNode(true);var n=cont.children.length+1;clone.querySelector('.carte-nom').textContent='Carte n°'+n;clone.querySelector('.carte-desc').textContent='Générée depuis <template>';cont.appendChild(clone);}
  function demoModeSombre(btn){var e=btn.getAttribute('aria-pressed')==='true';btn.setAttribute('aria-pressed',String(!e));btn.style.background=!e?'var(--primaire)':'';btn.style.color=!e?'#fff':'';btn.textContent=!e?'Mode sombre (actif)':'Mode sombre (inactif)';}
  function demoLiveRegion(btn){var z=document.getElementById('demo-live-region');var msg=btn.getAttribute('data-msg');if(!z)return;var cfg={succes:{color:'var(--vert)',border:'var(--vert)',txt:'Formulaire envoyé avec succès !'},erreur:{color:'var(--rouge)',border:'var(--rouge)',txt:'Erreur : connexion impossible.'},chargement:{color:'var(--ambre)',border:'var(--ambre)',txt:'Chargement en cours…'},reset:{color:'var(--txt2)',border:'var(--bord)',txt:'Zone de notification (vide)'}};var cf=cfg[msg];if(!cf)return;if(msg==='reset'){z.style.borderColor=cf.border;z.style.color=cf.color;z.textContent=cf.txt;}else{z.style.borderColor=cf.border;z.style.color=cf.color;z.textContent='';setTimeout(function(){z.textContent=cf.txt;},100);}}
  function demoErreurSimuler(){var i=document.getElementById('demo-email');var e=document.getElementById('demo-email-err');if(!i||!e)return;i.setAttribute('aria-invalid','true');i.style.borderColor='var(--rouge)';i.style.outline='2px solid var(--rouge)';e.removeAttribute('hidden');}
  function demoErreurEffacer(){var i=document.getElementById('demo-email');var e=document.getElementById('demo-email-err');if(!i||!e)return;i.setAttribute('aria-invalid','false');i.style.borderColor='';i.style.outline='';e.setAttribute('hidden','');}
  function activerOnglet(btn){if(!btn)return;var tabId=typeof btn==='string'?btn:btn.getAttribute('data-tab');['t1','t2','t3'].forEach(function(id){var tab=document.getElementById(id);var panel=document.getElementById(id.replace('t','p'));if(!tab||!panel)return;var actif=(id===tabId);tab.setAttribute('aria-selected',String(actif));tab.style.fontWeight=actif?'700':'400';tab.style.color=actif?'var(--primaire)':'var(--txt2)';tab.style.borderBottom=actif?'3px solid var(--primaire)':'3px solid transparent';if(actif){panel.removeAttribute('hidden');}else{panel.setAttribute('hidden','');}});var ft=document.getElementById(tabId);if(ft)ft.focus();}
  (function(){
    var tablist=document.querySelector('[role="tablist"][aria-label="Onglets de démonstration"]');
    if(!tablist)return;
    tablist.addEventListener('click',function(e){var btn=e.target.closest('[role="tab"]');if(!btn)return;activerOnglet(btn);});
    tablist.addEventListener('keydown',function(e){var btn=e.target.closest('[role="tab"]');if(!btn)return;var tabs=['t1','t2','t3'];var idx=tabs.indexOf(btn.getAttribute('data-tab'));if(e.key==='ArrowRight'){e.preventDefault();activerOnglet(tabs[(idx+1)%3]);}if(e.key==='ArrowLeft'){e.preventDefault();activerOnglet(tabs[(idx+2)%3]);}if(e.key==='Home'){e.preventDefault();activerOnglet(tabs[0]);}if(e.key==='End'){e.preventDefault();activerOnglet(tabs[2]);}});
  }());
  (function(){
    var burger=document.getElementById('site-burger');
    var panel=document.getElementById('site-mobile-panel');
    var ico=document.getElementById('site-burger-ico');
    if(!burger||!panel)return;
    burger.addEventListener('click',function(e){e.stopPropagation();var ouvert=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!ouvert));burger.setAttribute('aria-label',ouvert?'Ouvrir le menu de navigation':'Fermer le menu de navigation');if(ico)ico.textContent=ouvert?'☰':'✕';if(ouvert){panel.setAttribute('hidden','');}else{panel.removeAttribute('hidden');var fl=panel.querySelector('a');if(fl)fl.focus();}});
    document.addEventListener('click',function(e){if(!e.target.closest('.site-header')&&!e.target.closest('.site-mobile-nav')){panel.setAttribute('hidden','');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Ouvrir le menu de navigation');if(ico)ico.textContent='☰';}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){panel.setAttribute('hidden','');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Ouvrir le menu de navigation');if(ico)ico.textContent='☰';burger.focus();}});
    panel.querySelectorAll('a[href^="#"]').forEach(function(l){l.addEventListener('click',function(){panel.setAttribute('hidden','');burger.setAttribute('aria-expanded','false');if(ico)ico.textContent='☰';});});
  }());