'use strict';
/* STILab® — Implementación original inspirada en experiencias editoriales de portfolio.
   No usa librerías, servicios de pago ni recursos externos. */
const root = document.getElementById('app');
const menu = document.getElementById('mobileMenu');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const asset = file => `assets/${file}`;
const pad = i => String(i).padStart(3,'0');
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const categories = ['TODOS','Fotografía','Identidad','Editorial','Arte y tipografía'];
const places = {timeline:'THE PLAYBOOK',works:'THE WORK',index:'THE INDEX',archive:'THE ARCHIVE',about:'THE FOUNDATION',hobbies:'BEYOND THE CANVAS',contact:'GET IN TOUCH'};
const hobbyData = [
  ['FITNESS / GIMNASIO','Disciplina, entrenamiento y progreso constante. Mejorar cada día también es una forma de diseño.','hobby-fitness.svg','Ilustración de pesas para entrenamiento'],
  ['DISEÑO GRÁFICO','Crear identidades visuales, explorar tipografías y construir universos de marca.','aura-application.webp','Aplicación de la identidad de marca Aura'],
  ['FOTOGRAFÍA','La fotografía analógica, la luz y los detalles que convierten un momento en una historia.','urban-photo.webp','Retrato urbano en blanco y negro'],
  ['MODA / STREETWEAR','Explorar siluetas, ropa, tendencias y códigos culturales que definen estilos personales.','album-shop.webp','Portada musical en tienda de vinilos'],
  ['CREACIÓN AUDIOVISUAL','Producir videos, experimentar con la edición y buscar narrativas de estética cinematográfica.','hobby-film.svg','Ilustración de fotogramas de video'],
  ['DISEÑO WEB','Diseñar interfaces, experimentar con movimiento digital y hacer experiencias intuitivas.','hobby-web.svg','Ilustración de una interfaz de usuario']
];
let currentRoute = '';
let railController = null;
let archiveObserver = null;
function buildHeading(title,sub,tag){return `<div class="page-heading"><span class="tiny meta-heading">${tag}</span><h1><span>STILab<sup>®</sup></span><span>${title}</span></h1><p class="page-deck">${sub}</p></div>`;}
function getHash(){
  const hash=decodeURIComponent(location.hash.slice(1)||'timeline');
  if(hash.startsWith('proyecto/')) return {page:'project',id:hash.split('/')[1]};
  return {page:places[hash]?hash:'timeline'};
}
function imageTag(file,alt,extra=''){return `<img src="${asset(file)}" alt="${esc(alt||'')}" loading="lazy" decoding="async" ${extra}>`;}
function cardHTML(p,i,kind='grid'){
  return `<a class="project-tile project-tile--${kind}" href="#proyecto/${encodeURIComponent(p.id)}" aria-label="Ver proyecto ${esc(p.title)}"><div class="tile-visual">${imageTag(p.images[0],p.alt[0])}<span class="tile-open" aria-hidden="true">↗</span></div><div class="tile-meta"><span>${pad(i+1)} / ${esc(p.category.toUpperCase())}</span><span>LUIS ZAMBRANO</span></div><h3>${esc(p.title)}</h3></a>`;
}
function renderTimeline(){
  const featured=[projects[1],projects[0],projects[4],projects[5],projects[6],projects[8],projects[2]];
  const rail=featured.map((p,i)=>`<a class="timeline-card" href="#proyecto/${p.id}" aria-label="Proyecto ${esc(p.title)}"><div class="timeline-card-image" style="--offset:${i%4}">${imageTag(p.images[0],p.alt[0])}</div><div class="timeline-card-meta"><span>${pad(i+1)}</span><span>${esc(p.category.toUpperCase())}</span></div><h3>${esc(p.title)}</h3></a>`).join('');
  root.innerHTML=`<div class="screen timeline-screen">
    ${buildHeading('THE PLAYBOOK','UN PORTAFOLIO SOBRE IMÁGENES, IDEAS Y EXPERIMENTACIÓN.','(01 / HOME · COLECCIÓN VISUAL)')}
    <div class="timeline-leadin"><span>EL TRABAJO ANTES QUE TODO</span><span>SELECCIÓN / 2025—2026</span></div>
    <div class="timeline-viewport"><div id="timelineRail" class="timeline-rail" tabindex="0" aria-label="Carrusel horizontal de trabajos; se puede desplazar con el dedo o con las flechas">${rail}</div></div>
    <div class="rail-controls"><div class="rail-status"><span id="railCount">001</span><span class="rail-line"><i id="railFill"></i></span><span>${pad(featured.length)}</span><small>ARRASTRA, DESLIZA O USA LAS FLECHAS</small></div><div class="rail-arrows"><button id="railPrev" aria-label="Anterior proyecto" type="button">←</button><button id="railNext" aria-label="Siguiente proyecto" type="button">→</button></div></div>
    <div class="intro-statement"><span>(01 / UN ESTUDIO PERSONAL)</span><p>EL DISEÑO ES UNA FORMA DE <em>OBSERVAR.</em> CADA PROYECTO, UNA NUEVA FORMA DE CONTAR ALGO.</p><a href="#works" class="text-link">EXPLORAR TODOS LOS PROYECTOS ↗</a></div>
    <div class="timeline-feature-grid"><a href="#proyecto/${projects[0].id}" class="feature-hero">${imageTag('album-art.webp','Portada musical con diseño urbano')}<div><span>DESTACADO / DIRECCIÓN VISUAL</span><strong>ARTE DE PORTADA</strong></div></a><a href="#proyecto/${projects[1].id}" class="feature-hero">${imageTag('citrus-two.webp','Fotografía de producto con salpicadura cítrica')}<div><span>DESTACADO / FOTOGRAFÍA</span><strong>CÍTRICOS EN MOVIMIENTO</strong></div></a></div>
    <div class="next-band"><span>¿QUIERES VER MÁS?</span><a href="#index">DESCUBRE EL ÍNDICE COMPLETO <b>↗</b></a></div>
  </div>`;
  setupRail();
}
function setupRail(){
  const el=document.getElementById('timelineRail'); if(!el)return;
  const cards=[...el.querySelectorAll('.timeline-card')];
  const count=document.getElementById('railCount'),fill=document.getElementById('railFill');
  function index(){const l=el.getBoundingClientRect().left;return cards.reduce((b,c,i)=>Math.abs(c.getBoundingClientRect().left-l)<b.d?{i,d:Math.abs(c.getBoundingClientRect().left-l)}:b,{i:0,d:Infinity}).i;}
  function state(){if(!el.isConnected)return;const i=index();count.textContent=pad(i+1);fill.style.width=`${(i+1)/cards.length*100}%`;document.getElementById('railPrev').disabled=i<=0;document.getElementById('railNext').disabled=i===cards.length-1;}
  const advance=d=>{const i=Math.max(0,Math.min(cards.length-1,index()+d));cards[i].scrollIntoView({behavior:reduce?'instant':'smooth',block:'nearest',inline:'start'});setTimeout(state,420);};
  document.getElementById('railPrev').addEventListener('click',()=>advance(-1));
  document.getElementById('railNext').addEventListener('click',()=>advance(1));
  el.addEventListener('scroll',()=>requestAnimationFrame(state),{passive:true});
  el.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();advance(e.key==='ArrowRight'?1:-1);}});
  let sx=0,sc=0,drag=false,moved=false;
  el.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0){sx=e.clientX;sc=el.scrollLeft;drag=true;moved=false;el.classList.add('is-dragging');}});
  el.addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-sx;if(Math.abs(dx)>6)moved=true;el.scrollLeft=sc-dx;}});
  const end=()=>{drag=false;el.classList.remove('is-dragging');};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);el.addEventListener('mouseleave',end);
  el.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
  window.addEventListener('resize',state,{passive:true,signal:railController.signal});
  requestAnimationFrame(state);
}
function renderWorks(){
  root.innerHTML=`<div class="screen works-screen">
    ${buildHeading('THE WORK','PROYECTOS QUE CONECTAN CONCEPTO, SISTEMA VISUAL Y EXPERIMENTACIÓN.','(02 / GALERÍA DE PROYECTOS)')}
    <div class="works-toolbar"><div class="category-filters" role="group" aria-label="Categorías de proyectos">${categories.map((c,i)=>`<button class="category-button ${i===0?'selected':''}" type="button" data-category="${esc(c)}" aria-pressed="${i===0?'true':'false'}">${i===0?'ALL WORKS':esc(c.toUpperCase())}</button>`).join('')}</div><div class="view-buttons"><button data-view="grid" aria-pressed="true" class="selected">CUADRÍCULA</button><button data-view="list" aria-pressed="false">LISTA</button><button data-fit aria-pressed="false">AJUSTAR</button></div></div>
    <div class="works-result"><span id="workNum">${projects.length} PROYECTOS</span><span>SELECCIÓN PERSONAL / STILab®</span></div>
    <div id="worksCollection" class="works-collection works-collection--grid"></div>
    <div class="next-band"><span>OTRA FORMA DE EXPLORAR</span><a href="#index">VER EL ÍNDICE INTERACTIVO <b>↗</b></a></div>
  </div>`;
  let filter='TODOS',view='grid',fit=false;
  const collection=document.getElementById('worksCollection');
  function update(){const list=filter==='TODOS'?projects:projects.filter(p=>p.category===filter);collection.className=`works-collection works-collection--${view}${fit?' fit-images':''}`;collection.innerHTML=list.map((p,i)=>cardHTML(p,projects.indexOf(p))).join('');document.getElementById('workNum').textContent=`${list.length} PROYECTO${list.length!==1?'S':''}`;}
  root.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.category;root.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});update();}));
  root.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{view=btn.dataset.view;root.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});update();}));
  root.querySelector('[data-fit]').addEventListener('click',e=>{fit=!fit;e.currentTarget.classList.toggle('selected',fit);e.currentTarget.setAttribute('aria-pressed',String(fit));update();});
  update();
}
function renderIndex(){
  root.innerHTML=`<div class="screen index-screen">
    ${buildHeading('THE INDEX','DOCE PROYECTOS. MÚLTIPLES MIRADAS. UNA MISMA CURIOSIDAD.','(03 / ÍNDICE INTERACTIVO)')}
    <div class="index-layout"><aside class="index-preview"><p>(COVER)</p><img id="indexImg" src="${asset(projects[0].images[0])}" alt="${esc(projects[0].alt[0])}"><div class="index-preview-meta"><span id="indexTitle">${esc(projects[0].title)}</span><span id="indexNum">001 / ${pad(projects.length)}</span></div></aside>
    <div class="index-table"><div class="index-head"><span>(Nº)</span><span>(PROJECT)</span><span>(FIELD)</span><span>(SERIE)</span></div>${projects.map((p,i)=>`<a class="index-row ${i===0?'is-current':''}" href="#proyecto/${p.id}" data-project="${i}" aria-label="Abrir ${esc(p.title)}"><span>${pad(i+1)}</span><strong>${esc(p.title)}</strong><span>${esc(p.category.toUpperCase())}</span><span>STI / ${pad(i+1)}</span></a>`).join('')}</div></div>
    <div class="next-band"><span>EL ARCHIVO VISUAL</span><a href="#archive">EXPLORAR TODAS LAS IMÁGENES <b>↗</b></a></div>
  </div>`;
  const preview=document.getElementById('indexImg');
  const rows=[...root.querySelectorAll('.index-row')];
  function set(i){const p=projects[i];preview.src=asset(p.images[0]);preview.alt=p.alt[0];document.getElementById('indexTitle').textContent=p.title;document.getElementById('indexNum').textContent=`${pad(i+1)} / ${pad(projects.length)}`;rows.forEach((r,j)=>r.classList.toggle('is-current',j===i));}
  rows.forEach((r,i)=>{r.addEventListener('mouseenter',()=>set(i));r.addEventListener('focus',()=>set(i));r.addEventListener('touchstart',()=>set(i),{passive:true});});
}
function renderArchive(){
  const images=projects.flatMap((p,i)=>p.images.map((im,j)=>({im,p,i,j}))).filter((_,i)=>i%4!==3).slice(0,28);
  root.innerHTML=`<div class="screen archive-screen">
    ${buildHeading('THE ARCHIVE','IMÁGENES, PROCESOS Y FRAGMENTOS QUE CONSTRUYEN EL TRABAJO.','(04 / ARCHIVO VISUAL)')}
    <div class="archive-top"><span>IMÁGENES / ${pad(images.length)}</span><span>EXPLORA HACIENDO CLIC EN CADA PIEZA</span></div><div class="archive-mosaic">${images.map((x,i)=>`<a href="#proyecto/${x.p.id}" class="archive-item archive-item--${i%7}" aria-label="Explorar ${esc(x.p.title)}">${imageTag(x.im,x.p.alt[x.j])}<span><b>${pad(i+1)}</b>${esc(x.p.title)} ↗</span></a>`).join('')}</div>
    <div class="next-band"><span>CADA IMAGEN TIENE UNA HISTORIA</span><a href="#works">VER PROYECTOS COMPLETOS <b>↗</b></a></div>
  </div>`;
}
function renderAbout(){
  root.innerHTML=`<div class="screen about-screen">
    ${buildHeading('THE FOUNDATION','DETRÁS DE CADA IMAGEN HAY UNA FORMA DE VER EL MUNDO.','(05 / DATOS GENERALES)')}
    <div class="about-top"><div class="portrait-placeholder"><div class="portrait-initials">LZ<span>®</span></div><div class="portrait-bottom"><span>RETRATO PERSONAL</span><span>PRÓXIMAMENTE</span></div></div>
    <div class="about-copy"><span class="tiny">(01 / ABOUT ME)</span><h2>SOY LUIS<br>ZAMBRANO<span class="dot">.</span></h2><p class="about-lead">ESTUDIANTE DE DISEÑO GRÁFICO QUE EXPLORA LA IDENTIDAD VISUAL, LA FOTOGRAFÍA Y LAS NUEVAS FORMAS DE COMUNICAR.</p><p>Estudio Diseño Gráfico en la Universidad del Azuay, en Cuenca, Ecuador. Me gusta trabajar con conceptos, composición, identidad y fotografía, experimentando con un lenguaje visual contemporáneo.</p><p>STILab es el espacio donde reúno mis exploraciones gráficas, proyectos académicos y trabajos personales, con especial interés en la dirección de arte y las experiencias digitales.</p>
    <div class="about-facts"><div><span>FORMACIÓN</span><strong>DISEÑO GRÁFICO<br>UNIVERSIDAD DEL AZUAY</strong></div><div><span>UBICACIÓN</span><strong>CUENCA, ECUADOR</strong></div><div><span>ENFOQUE</span><strong>IDENTIDAD · FOTOGRAFÍA<br>EDITORIAL · DIGITAL</strong></div></div></div></div>
    <div class="wide-manifesto"><small>(02 / PHILOSOPHY)</small><p>EL CONCEPTO MARCA EL CAMINO. LA COMPOSICIÓN LE DA <i>IDENTIDAD.</i></p></div>
    <div class="about-columns"><div class="about-list"><span class="tiny">(03 / ÁREAS DE TRABAJO)</span><h3>LO QUE HAGO</h3>${['DISEÑO DE IDENTIDAD','DIRECCIÓN DE ARTE','FOTOGRAFÍA PUBLICITARIA','DISEÑO EDITORIAL','TIPOGRAFÍA','DISEÑO WEB E INTERFACES'].map((s,i)=>`<div class="service-row"><span>${pad(i+1)}</span><strong>${s}</strong><span>↗</span></div>`).join('')}</div>
    <div class="about-tools"><span class="tiny">(04 / SOFTWARE)</span><h3>HERRAMIENTAS</h3>${['ADOBE ILLUSTRATOR','ADOBE PHOTOSHOP','ADOBE INDESIGN','ADOBE LIGHTROOM','FIGMA'].map((s,i)=>`<div class="service-row"><span>${pad(i+1)}</span><strong>${s}</strong><span>↗</span></div>`).join('')}<div class="about-tools-note">LAS HERRAMIENTAS CAMBIAN. LA CURIOSIDAD PERMANECE.</div></div></div>
    <div class="next-band"><span>FUERA DEL ESTUDIO</span><a href="#hobbies">CONOCE MIS INTERESES <b>↗</b></a></div>
  </div>`;
}
function renderHobbies(){
  root.innerHTML=`<div class="screen hobbies-screen">
    ${buildHeading('BEYOND DESIGN','TODO LO QUE ME INTERESA TAMBIÉN INFLUYE EN MI FORMA DE DISEÑAR.','(06 / HOBBIES Y PASATIEMPOS)')}
    <div class="hobby-intro"><span>(01 / INTERESES PERSONALES)</span><p>ENTRE LA CULTURA VISUAL, EL MOVIMIENTO Y LA CURIOSIDAD, ENCUENTRO IDEAS PARA EL SIGUIENTE PROYECTO.</p></div>
    <div class="hobby-gallery">${hobbyData.map((h,i)=>`<article class="hobby-panel"><div class="hobby-photo">${imageTag(h[2],h[3])}<span>${pad(i+1)} / 006</span></div><div class="hobby-info"><h2>${h[0]}</h2><p>${h[1]}</p></div></article>`).join('')}</div>
    <div class="next-band"><span>DE UNA IDEA A OTRA</span><a href="#works">VOLVER A PROYECTOS <b>↗</b></a></div>
  </div>`;
}
function renderContact(){
  root.innerHTML=`<div class="screen contact-screen">
    ${buildHeading('LET’S TALK','¿TIENES UN PROYECTO, UNA IDEA O UNA COLABORACIÓN EN MENTE?','(07 / CONTACTO)')}
    <div class="contact-statement"><span>(01 / NUEVAS CONVERSACIONES)</span><h2>LET’S MAKE<br>SOMETHING <em>REAL.</em></h2><a class="huge-mail" href="mailto:Luisz@stillab.studio">LUISZ@STILLAB.STUDIO <b>↗</b></a></div>
    <div class="contact-two"><div><span class="tiny">(02 / REDES)</span><a class="contact-social" href="https://www.instagram.com/lzambrano_ph/" target="_blank" rel="noopener noreferrer">INSTAGRAM <span>↗</span></a><div class="contact-place">CUENCA, ECUADOR <span>/</span> DISEÑO GRÁFICO</div></div><form class="contact-form" id="contactForm"><span class="tiny">(03 / ESCRÍBEME UN MENSAJE)</span><label for="contactName">TU NOMBRE</label><input id="contactName" name="name" required placeholder="Nombre y apellido" maxlength="90"><label for="contactEmail">TU CORREO</label><input id="contactEmail" name="email" type="email" required placeholder="correo@ejemplo.com" maxlength="180"><label for="contactMessage">¿QUÉ TIENES EN MENTE?</label><textarea id="contactMessage" name="message" required rows="4" placeholder="Cuéntame tu idea..." maxlength="3000"></textarea><button type="submit">ABRIR MENSAJE EN MI CORREO <span>↗</span></button><p>El formulario prepara un correo en tu aplicación de email; no almacena ni envía datos a un servidor.</p></form></div>
  </div>`;
  document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;const name=f.elements.name.value.trim(),email=f.elements.email.value.trim(),msg=f.elements.message.value.trim();if(!name||!email||!msg){f.reportValidity();return;}const subject=encodeURIComponent(`Consulta de portafolio — ${name}`),body=encodeURIComponent(`Hola Luis,\n\n${msg}\n\n— ${name}\nCorreo: ${email}`);location.href=`mailto:Luisz@stillab.studio?subject=${subject}&body=${body}`;});
}
function renderProject(id){
  const p=projects.find(x=>x.id===id);if(!p){root.innerHTML=`<div class="screen error-page"><h1>PROYECTO NO ENCONTRADO.</h1><a href="#works">VOLVER A PROYECTOS ↗</a></div>`;return;}
  const i=projects.indexOf(p),next=projects[(i+1)%projects.length],prev=projects[(i+projects.length-1)%projects.length];
  root.innerHTML=`<article class="screen case-screen">
    <div class="case-breadcrumb"><a href="#works">← TODOS LOS PROYECTOS</a><span>STILab® / ${pad(i+1)} DE ${pad(projects.length)}</span></div>
    <div class="case-headline"><span class="tiny">${esc(p.category.toUpperCase())} / ${esc(p.area.toUpperCase())}</span><h1>${esc(p.title)}<sup>®</sup></h1><div class="case-brief"><span>(PROYECTO ${pad(i+1)})</span><p>${esc(p.description)}</p></div></div>
    <div class="case-lead-image">${imageTag(p.images[0],p.alt[0])}</div>
    <div class="case-insights"><div><span>(01 / ÁREA)</span><p>${esc(p.area)}</p></div><div><span>(02 / HERRAMIENTAS)</span><p>${esc(p.tools)}</p></div><div><span>(03 / ENFOQUE)</span><p>${esc(p.category)}</p></div>${p.link?`<a href="${esc(p.link)}" rel="noopener noreferrer" target="_blank">VER PUBLICACIÓN EXTERNA ↗</a>`:''}</div>
    <div class="case-gallery-head"><span>(04 / GALERÍA DE PROYECTO)</span><span>${pad(p.images.length)} IMÁGENES</span></div>
    <div class="case-images">${p.images.map((im,j)=>`<figure class="case-picture case-picture--${j%4}">${imageTag(im,p.alt[j]||p.title)}<figcaption>${pad(j+1)} / ${esc(p.title)}</figcaption></figure>`).join('')}</div>
    <div class="case-next"><a href="#proyecto/${prev.id}"><span>← PROYECTO ANTERIOR</span><strong>${esc(prev.title)}</strong></a><a href="#proyecto/${next.id}"><span>SIGUIENTE PROYECTO →</span><strong>${esc(next.title)}</strong></a></div>
    <div class="next-band"><span>EXPLORA OTRAS IDEAS</span><a href="#archive">VOLVER AL ARCHIVO VISUAL <b>↗</b></a></div>
  </article>`;
}
function route(){
  closeMenu();
  if(railController)railController.abort(); railController=new AbortController();
  const {page,id}=getHash();currentRoute=page;
  document.querySelectorAll('.site-header [data-route]').forEach(a=>{const selected=a.dataset.route===page;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.title=(page==='project'?projects.find(p=>p.id===id)?.title:(places[page]||'STILab'))+' — STILab® / Luis Zambrano';
  const renderers={timeline:renderTimeline,works:renderWorks,index:renderIndex,archive:renderArchive,about:renderAbout,hobbies:renderHobbies,contact:renderContact};
  if(page==='project')renderProject(id);else (renderers[page]||renderTimeline)();
  document.body.classList.toggle('is-index',page==='index');
  window.scrollTo({top:0,behavior:'instant'});
}
function closeMenu(){menu.classList.remove('open');menu.setAttribute('aria-hidden','true');menu.inert=true;menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menú');document.body.classList.remove('nav-open');}
menuToggle.addEventListener('click',()=>{const opening=!menu.classList.contains('open');menu.classList.toggle('open',opening);menu.setAttribute('aria-hidden',String(!opening));menu.inert=!opening;menuToggle.classList.toggle('open',opening);menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'Cerrar menú':'Abrir menú');document.body.classList.toggle('nav-open',opening);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('hashchange',route);
try{const theme=localStorage.getItem('stilab-theme');if(theme==='light'||theme==='dark')document.body.dataset.theme=theme;}catch{}
themeToggle.addEventListener('click',()=>{const to=document.body.dataset.theme==='dark'?'light':'dark';document.body.dataset.theme=to;themeToggle.setAttribute('aria-pressed',String(to==='light'));try{localStorage.setItem('stilab-theme',to);}catch{}});
themeToggle.setAttribute('aria-pressed',String(document.body.dataset.theme==='light'));
if(!location.hash)history.replaceState(null,'','#timeline');
route();
requestAnimationFrame(()=>setTimeout(()=>document.getElementById('introScreen').classList.add('dismissed'),reduce?100:500));
