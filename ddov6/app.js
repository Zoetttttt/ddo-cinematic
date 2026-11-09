(() => {
'use strict';
const BASE=new URL('./',document.currentScript.src), PAGE=document.body.dataset.page, projects=window.DDO_PROJECTS;
let lang='en'; try{lang=localStorage.getItem('ddo-language')==='zh'?'zh':'en'}catch{}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const url=(path='')=>new URL(path,BASE).href, image=id=>url(`assets/${id}.webp`);
const text=(en,zh)=>lang==='zh'?zh:en;
const arrow=(direction='ne')=>`<svg class="arrow ${direction}" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26 26 6M6 6h20v20" stroke="currentColor" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>`;
const dot='<i class="dot" aria-hidden="true"></i>';
const sectors={all:['All spaces','全部空间'],hospitality:['Food & Beverage','餐饮空间'],retail:['Immersive Space','沉浸体验空间'],wellbeing:['Wellbeing','身心体验'],residential:['Residential','住宅空间']};
const sectorName=k=>text(...sectors[k]);
const statusName=k=>k==='render'?text('Concept render','概念效果图'):k==='design'?text('Design only','室内设计'):text('Completed space','已落成空间');
const projectURL=p=>url(`project/?id=${p.id}`);
function logo(){return `<svg class="logo-symbol" viewBox="0 0 94 82" role="img" aria-label="DDO"><path d="M5 3h35a38 38 0 0 1 0 76H5Z" fill="var(--blue)"/><text x="4" y="52" font-family="Jost,Arial,sans-serif" font-weight="600" font-size="24" letter-spacing="12" fill="currentColor">DDO</text></svg>`}
function header(){return `<a class="skip" href="#main">${text('Skip to content','跳至正文')}</a><header class="header"><a class="brand" href="${url()}" aria-label="D Design Office — ${text('Home','首页')}">${logo()}<span>D DESIGN<br>OFFICE</span></a><span class="header-note">${text('INTERIOR ARCHITECTURE<br>SYDNEY, AUSTRALIA','室内建筑设计<br>澳大利亚 · 悉尼')}</span><nav class="navigation" aria-label="${text('Main navigation','主导航')}">${[['projects','Projects','项目'],['services','Services','服务'],['studio','Studio','工作室'],['contact','Contact','联系']].map(([p,en,zh])=>`<a href="${url(p+'/')}" ${PAGE===p?'aria-current="page"':''}><span class="nav-title">${text(en,zh)}</span>${p==='contact'?arrow():''}</a>`).join('')}</nav>${PAGE==='home'?musicButton():''}<div class="language" aria-label="${text('Language','语言')}"><button data-lang="en" aria-pressed="${lang==='en'}">EN</button><span>/</span><button data-lang="zh" aria-pressed="${lang==='zh'}">中文</button></div></header>`}
function footer(){return `<footer class="footer"><span>© ${new Date().getFullYear()} D DESIGN OFFICE</span><span>${text('Spaces for people. Made with feeling.','以空间，回应生活。')}</span><a href="mailto:info@ddesignoffice.com">${text('Start a conversation','聊聊你的想法')}${arrow()}</a></footer>`}
const score = new Audio(url('assets/light-material-memory.m4a'));
score.id='soundtrack';score.loop=true;score.preload='none';score.volume=0;
let soundWanted=false,fadeRAF=0,musicBusy=false,soundContext=null,soundGain=null,musicLevel=0;
function prepareSound(){const C=window.AudioContext||window.webkitAudioContext;if(!soundContext&&C){try{const c=new C();const gain=c.createGain();gain.gain.value=musicLevel;const source=c.createMediaElementSource(score);source.connect(gain);gain.connect(c.destination);soundContext=c;soundGain=gain;score.volume=1}catch{soundContext=null;soundGain=null}}}
function setSoundLevel(v){musicLevel=v;if(soundGain)soundGain.gain.value=v;else score.volume=v}

const musicIcon=`<svg class="sound-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4m4-7v10m5-14v18m5-14v10m4-7v4" stroke="currentColor" stroke-width="1.2"/></svg>`;
function musicButton(){return `<button id="music-switch" class="music-switch" aria-label="${soundWanted?text('Turn music off','关闭音乐'):text('Turn music on','开启音乐')}" aria-pressed="${soundWanted}">${musicIcon}<span>${soundWanted?text('SOUND ON','音乐开'):text('SOUND OFF','音乐关')}</span></button>`}
function updateSound(){const b=$('#music-switch');if(!b)return;b.setAttribute('aria-pressed',soundWanted);b.setAttribute('aria-label',soundWanted?text('Turn music off','关闭音乐'):text('Turn music on','开启音乐'));b.innerHTML=musicIcon+`<span>${soundWanted?text('SOUND ON','音乐开'):text('SOUND OFF','音乐关')}</span>`}
function volumeTo(target,ms,done){cancelAnimationFrame(fadeRAF);const from=musicLevel,start=performance.now();function frame(now){const t=Math.min(1,(now-start)/ms);setSoundLevel(from+(target-from)*(t*t*(3-2*t)));if(t<1)fadeRAF=requestAnimationFrame(frame);else done?.()}fadeRAF=requestAnimationFrame(frame)}
async function toggleMusic(){if(musicBusy)return;musicBusy=true;try{soundWanted=!soundWanted;updateSound();if(soundWanted){prepareSound();const started=score.play();if(soundContext)await soundContext.resume();await started;volumeTo(.42,2600);$('#sound-notice').textContent=''}else{volumeTo(0,1000,()=>score.pause())}}catch{soundWanted=false;updateSound();$('#sound-notice').textContent=text('Tap sound to try again.','请再次点击音乐按钮。')}finally{musicBusy=false}}
let slide=0,timer=null,playing=!reduced.matches;
const heroes=['sumi','arctic-regent','koko-dixon','dragon-regent','yebisu'].map(id=>projects.find(p=>p.id===id));
const heroPhotos=['hero-sumi','hero-arctic','hero-koko','hero-dragon','hero-yebisu'];
const sceneDurations=[16000,16000,15920,16000,16000];
function home(){const p=heroes[slide];return `<main id="main" class="film"><section class="hero-film" aria-label="${text('D Design Office — places in motion','D Design Office — 流动的空间')}"><div class="film-screen" aria-hidden="true">${heroes.map((p,i)=>`<div class="film-shot ${i===slide?'is-active':''}" data-shot="${i}">${i===2?`<video id="morefun-video" muted playsinline preload="none" poster="${image('hero-koko-1600')}" aria-label="${text('KOKO Amusement interior film','KOKO Amusement 空间影像')}"></video>`:`<img src="${image(heroPhotos[i]+'-1600')}" srcset="${image(heroPhotos[i]+'-1600')} 1600w, ${image(heroPhotos[i]+'-3200')} 3200w" sizes="100vw" alt="" ${i===0?'fetchpriority="high"':'loading="eager"'}>`}<div class="film-vignette"></div></div>`).join('')}</div><div class="film-shade" aria-hidden="true"></div><div class="film-overline"><span><button id="replay-intro" aria-label="${text('Replay DDO introduction','重播 DDO 开场')}" class="intro-replay">${dot}</button>${text('INTERIORS & HUMAN EXPERIENCE','空间，与人的体验')}</span><span>${text('SYDNEY, AUSTRALIA','澳大利亚 · 悉尼')}</span></div><div class="film-title"><p>${text('D DESIGN OFFICE — A SPATIAL PRACTICE','D DESIGN OFFICE — 空间设计实践')}</p><h1>${text('<span>The art of</span><br><span>being somewhere.</span>','<span>置身其间，</span><br><span>感受空间的艺术。</span>')}</h1></div><span class="film-side">${text('LIGHT. MATERIAL. MEMORY.','光线 · 材质 · 记忆')}</span><div class="film-bottom"><a class="film-explore" href="${url('projects/')}"><span class="film-round">${arrow()}</span><span>${text('EXPLORE OUR SPACES','探索我们的空间')}</span></a><a class="film-project" id="hero-project" href="${projectURL(p)}"><span class="film-focus">${text('IN FOCUS','此刻聚焦')} / <span id="slide-number">${String(slide+1).padStart(2,'0')}</span></span><span class="film-project-line"><span id="hero-name">${p.brand}, ${p.location}</span>${arrow()}</span></a><div class="film-controls"><span class="film-counter">01</span><div class="film-timeline" role="group" aria-label="${text('Featured spaces','精选空间')}">${heroes.map((p,i)=>`<button data-slide="${i}" aria-label="${text('Show','查看')} ${p.brand}" aria-pressed="${i===slide}"><i class="track"><i></i></i></button>`).join('')}</div><span class="film-counter">05</span><button id="pause" class="film-pause" aria-pressed="${!playing}" aria-label="${playing?text('Pause film','暂停影像'):text('Play film','播放影像')}">${playing?'<span class="pause-icon" aria-hidden="true"></span>':'<span class="play-icon" aria-hidden="true"></span>'}</button></div></div><p class="sound-notice" id="sound-notice" role="status"></p></section></main>`}
let frameElapsed=0,lastFrame=null;
function startTimer(){cancelAnimationFrame(timer);lastFrame=null;document.body.classList.toggle('film-paused',!playing||document.hidden);if(!playing||document.hidden||introActive)return;function tick(now){if(lastFrame!==null)frameElapsed+=now-lastFrame;lastFrame=now;document.body.style.setProperty('--film-progress',Math.min(frameElapsed/sceneDurations[slide],1));if(frameElapsed>=sceneDurations[slide]){frameElapsed=0;changeSlide(slide+1)}timer=requestAnimationFrame(tick)}timer=requestAnimationFrame(tick)}
function changeSlide(index){const next=(index+heroes.length)%heroes.length;if(next===slide)return;frameElapsed=0;document.body.style.setProperty('--film-progress',0);const p=heroes[next];const shot=$$('[data-shot]')[next];shot.classList.add('is-preparing');requestAnimationFrame(()=>requestAnimationFrame(()=>{slide=next;$$('[data-shot]').forEach((el,i)=>{el.classList.toggle('is-active',i===slide);el.classList.remove('is-preparing')});$$('[data-slide]').forEach((el,i)=>el.setAttribute('aria-pressed',i===slide));$('#slide-number').textContent=String(slide+1).padStart(2,'0');$('#hero-name').textContent=`${p.brand}, ${p.location}`;$('#hero-project').href=projectURL(p);syncVideo()}))}
function bindFilm(){document.body.append(score);$('#replay-intro').addEventListener('click',()=>playIntro(true));const video=$('#morefun-video');video.addEventListener('ended',()=>{if(playing&&!document.hidden)changeSlide(slide+1)});$('#music-switch').addEventListener('click',toggleMusic);startTimer();syncVideo();playIntro();$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>{changeSlide(+b.dataset.slide);startTimer()}));$('#pause').addEventListener('click',()=>{playing=!playing;const b=$('#pause');b.setAttribute('aria-pressed',!playing);b.setAttribute('aria-label',playing?text('Pause film','暂停影像'):text('Play film','播放影像'));b.innerHTML=playing?'<span class="pause-icon" aria-hidden="true"></span>':'<span class="play-icon" aria-hidden="true"></span>';startTimer();syncVideo()});let start=null;$('.hero-film').addEventListener('touchstart',e=>{start=e.changedTouches[0].clientX},{passive:true});$('.hero-film').addEventListener('touchend',e=>{if(start!==null&&Math.abs(e.changedTouches[0].clientX-start)>60){changeSlide(slide+(e.changedTouches[0].clientX<start?1:-1));startTimer()}start=null},{passive:true})}

function syncVideo(){const video=$('#morefun-video');if(!video)return;const visible=slide===2&&playing&&!document.hidden&&!introActive;if(visible){if(!video.getAttribute('src'))video.src=url('assets/morefun-'+(innerWidth>=1200&&(devicePixelRatio||1)>1?'4k':'1080')+'.mp4');video.play().catch(()=>{})}else{video.pause();if(slide!==2&&video.readyState>0)video.currentTime=0}}
function projectsPage(){return `<main id="main" class="page projects-page"><div class="page-heading"><div><p class="eyebrow">${dot}${text('A COLLECTION OF PLACES','空间集')}</p><h1>${text('Our spaces<span class="heading-dot">.</span>','我们的空间<span class="heading-dot">。</span>')}</h1></div><p>${text('Different lives. Different rituals.<br>One considered approach.','不同的生活，不同的日常。<br>同样细腻的设计态度。')}</p></div><div id="project-content"></div></main>`}
function filterState(){const q=new URLSearchParams(location.search);const sector=q.get('sector')||'all';return {sector:sectors[sector]?sector:'all',brand:q.get('brand')||'all'}}
function renderProjects(){const {sector,brand}=filterState();let selection=projects.filter(p=>sector==='all'||p.sector===sector);const brands=[...new Set(selection.map(p=>p.brand))];let filtered=selection.filter(p=>brand==='all'||p.brand===brand);
$('#project-content').innerHTML=`<div class="sector-filter" role="group" aria-label="${text('Project category','项目类别')}">${Object.entries(sectors).map(([key,n])=>`<button data-sector="${key}" aria-pressed="${sector===key}">${text(...n)}<sup>${key==='all'?projects.length:projects.filter(p=>p.sector===key).length}</sup></button>`).join('')}</div><div class="collection"><aside class="brand-filter"><p class="eyebrow">${text('BRANDS / COLLABORATIONS','品牌 / 合作')}</p><div role="group" aria-label="${text('Filter by brand','按品牌筛选')}"><button data-brand="all" aria-pressed="${brand==='all'}">${text('All brands','全部品牌')}<span>${String(selection.length).padStart(2,'0')}</span></button>${brands.map(b=>`<button data-brand="${b}" aria-pressed="${brand===b}">${b}<span>${selection.filter(p=>p.brand===b).length}</span></button>`).join('')}</div></aside><div class="project-results"><p class="result-count" aria-live="polite">${String(filtered.length).padStart(2,'0')} ${text('SPACES','个空间')} / ${sectorName(sector)}</p>${filtered.length? [...new Set(filtered.map(p=>p.brand))].map(b=>`<section class="brand-group"><h2>${b}<span>${text('Selected projects','精选项目')}</span></h2><div class="project-grid">${filtered.filter(p=>p.brand===b).map(p=>`<a class="project-card" href="${projectURL(p)}"><div class="card-image"><img src="${image(p.photos[0])}" alt="${p.brand} — ${p.location}" loading="lazy" width="960" height="640"><span class="card-arrow">${arrow()}</span>${p.status==='render'?`<span class="status-badge">${statusName(p.status)}</span>`:''}</div><div class="card-caption"><h3>${p.location}</h3><span>${p.year||sectorName(p.sector)}</span></div></a>`).join('')}</div></section>`).join(''):`<section class="empty-state"><span class="empty-d" aria-hidden="true"></span><h2>${text('Room for what’s next.','为未来，留一处空间。')}</h2><p>${text('Residential work is not included in this collection.<br>Let’s talk about the place you have in mind.','本次作品集中尚未收录住宅案例。<br>欢迎和我们聊聊你心中的理想空间。')}</p><a class="text-link" href="${url('contact/')}">${text('Get in touch','联系我们')}${arrow()}</a></section>`}</div></div>`;
$$('[data-sector]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.sector,'all')));$$('[data-brand]').forEach(b=>b.addEventListener('click',()=>setFilter(sector,b.dataset.brand)));
}
function setFilter(sector,brand){const q=new URLSearchParams();if(sector!=='all')q.set('sector',sector);if(brand!=='all')q.set('brand',brand);history.pushState({},'',url('projects/')+(q.size?'?'+q:''));renderProjects()}
let currentProject=null,lightIndex=0;
function detail(){const id=new URLSearchParams(location.search).get('id');const p=projects.find(p=>p.id===id);currentProject=p;if(p)document.title=`${p.brand} — ${p.location} | D Design Office`;if(!p)return `<main id="main" class="page empty-state"><h1>${text('Space not found.','未找到这个项目。')}</h1><a class="text-link" href="${url('projects/')}">${text('Back to all spaces','返回项目列表')}${arrow()}</a></main>`;const next=projects[(projects.indexOf(p)+1)%projects.length];return `<main id="main" class="page detail"><a class="back-link" href="${url('projects/?sector='+p.sector)}">${arrow('sw')}${sectorName(p.sector)}</a><div class="detail-heading"><h1>${p.brand}</h1><p>${p.description[lang]}</p></div><div class="project-meta"><span>${p.location}</span><span>${statusName(p.status)}</span><span>${p.year}</span></div><button class="detail-cover" data-photo="0" aria-label="${text('Enlarge photograph','放大图片')}"><img src="${image(p.photos[0])}" alt="${p.brand} — ${p.location}" fetchpriority="high"><span>${arrow()}</span></button><div class="detail-caption"><span>${p.brand} / ${p.location}</span><span>${text('A STUDY IN SPACE, LIGHT & MATERIAL','关于空间、光线与材质')}</span></div><div class="detail-gallery">${p.photos.slice(1).map((ph,i)=>`<figure><button data-photo="${i+1}" aria-label="${text('Enlarge photograph','放大图片')} ${i+2}"><img src="${image(ph)}" alt="${p.brand} — ${text('detail','细节')} ${i+2}" loading="lazy"></button><figcaption>${String(i+2).padStart(2,'0')} / ${statusName(p.status==='design'?'built':p.status)}</figcaption></figure>`).join('')}</div><a class="next-project" href="${projectURL(next)}"><span>${text('NEXT SPACE','下一个空间')}</span><h2>${next.brand}</h2>${arrow()}</a></main><dialog id="lightbox" class="lightbox"><button class="light-close" aria-label="${text('Close image','关闭图片')}"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m7 7 18 18M7 25 25 7" stroke="currentColor" fill="none"/></svg></button><button class="light-prev" aria-label="${text('Previous image','上一张')}">${arrow('sw')}</button><img id="light-image" alt=""><button class="light-next" aria-label="${text('Next image','下一张')}">${arrow()}</button><p id="light-caption"></p></dialog>`}
const team=[['mandy','Mandy','Creative Director','创意总监'],['luffy','Luffy','Company Ambassador','公司形象大使'],['dora','Dora','Interior Designer','室内设计师'],['vicki','Vicki','Interior Designer','室内设计师'],['hugh','Hugh','Interior Designer','室内设计师'],['cecilia','Cecilia','Interior Designer','室内设计师']];
function teamSection(){return `<section class="team-section"><div class="team-heading"><p class="eyebrow">${text('THE PEOPLE / 06','团队 / 06')}</p><h2>${text('A few different minds.<br>A shared way of seeing.','不同的创意，<br>共同的视角。')}</h2></div><div class="team-grid">${team.map(([id,name,en,zh])=>`<figure class="team-member ${id==='mandy'||id==='luffy'?'team-lead':''}"><div class="team-portrait"><img src="${url('assets/team-'+id+(id==='hugh'||id==='cecilia'?'.webp':'.svg'))}" alt="${name} — ${text(en,zh)}" loading="lazy"></div><figcaption><h3>${name}</h3><span>${text(en,zh)}</span></figcaption></figure>`).join('')}</div><div class="team-story"><p>${text('At the heart of D Design Office is a dynamic team of young, passionate and highly skilled designers, each bringing fresh perspectives and innovative ideas to the table. Most of our team members hold a Master of Architecture degree, allowing us to approach every project with a refined sensitivity to form, function and spatial quality.','D Design Office 汇聚了一群年轻、热情且经验扎实的设计师。每一位成员都带来新鲜的视角与创意；多数团队成员拥有建筑学硕士学位，让我们能够细腻地回应每个项目的形式、功能与空间品质。')}</p><p>${text('Led by Mandy, our team thrives on collaboration, constantly pushing boundaries to create spaces that are both beautiful and purposeful. With diverse expertise spanning architecture, interior architecture and project management, we approach every project with enthusiasm, bringing creativity, precision, and a deep understanding of space to every design we craft.','在 Mandy 的带领下，团队以协作为核心，不断探索兼具美感与使用价值的空间。我们的专长涵盖建筑、室内建筑与项目管理，以热情、创意、精准的执行和对空间的深入理解，完成每一次设计。')}</p></div></section>`}
const servicesData=[
['Concept & direction','概念与方向','Every place begins with a question.','每个空间，都始于一个问题。','We explore how your business, your people and your place come together. A clear concept gives every later decision a shared direction.','我们从品牌、人和场所的关系出发，寻找清晰的空间概念，为接下来的每个设计决定建立共同方向。',['Concept design & development','Spatial planning','3D visualisation','Branding & spatial identity'],['概念设计与发展','空间规划','三维效果呈现','品牌与空间识别'],'hero-sumi-1600'],
['Space & material','空间与材质','An idea becomes an atmosphere.','让一个想法，成为一种氛围。','Light, material, furniture and detail work together to shape the way a place feels — and the way it works every day.','光线、材质、家具与细部共同构成空间的感受，也回应每一天真实的使用需求。',['Interior design','Material & finishes selection','Bespoke joinery design','Lighting, furniture & fittings'],['室内设计','材质与饰面选择','定制木作设计','灯光、家具与配件'],'hero-arctic-1600'],
['Documents & approvals','文件与审批','Clarity at every step.','让每一步，都清晰可循。','We translate design intent into the documents needed to move a project forward, coordinating requirements with the relevant parties.','我们将设计意图转化为推进项目所需的文件，并与相关各方协调要求，让方案逐步走向实施。',['Design documentation','RDM, strata & owner approvals','DA, CC & CDC documentation','Tender & construction documentation'],['设计文件','商场、物业与业主审批文件','DA、CC 与 CDC 申请文件','招标与施工文件'],'hero-koko-1600'],
['Realisation & review','实施与设计跟进','Carry the idea into the everyday.','让设计，抵达日常。','We stay connected to the making of a space, reviewing the work on site and collaborating with D Construction Office to help the design arrive as intended.','我们持续关注空间的实施，通过现场设计跟进，并与 D Construction Office 协作，协助设计意图完整落地。',['On-site design review','Design coordination','Material & detail review','Collaboration with D Construction Office'],['现场设计跟进','设计协调','材料与细部核对','与 D Construction Office 协作'],'hero-dragon-1600']
];
function services(){const headings=[['Creative direction','概念与方向'],['Interior design','空间与设计'],['Documentation','文件与审批'],['Realisation','实施与跟进']];return `<main id="main" class="page services-page service-composition"><header class="service-masthead"><h1>${text('Services','服务')}</h1><div class="service-statement"><h2>${text('An idea,<br>given space.','让想法，<br>有处安放。')}</h2><p>${text('We bring a space into focus.<br>Through light, material and the details of everyday life.','从光线、材质，<br>到日常生活的细节，<br>让空间逐渐清晰。')}</p><span class="service-orbit" aria-hidden="true"></span></div></header><div class="service-fields">${servicesData.map((s,i)=>`<section class="service-field"><div class="service-field-heading"><i aria-hidden="true"></i><h2>${text(...headings[i])}</h2></div><ul>${s[lang==='zh'?7:6].map(item=>`<li>${item}</li>`).join('')}</ul></section>`).join('')}</div><figure class="service-panorama"><img src="${image('hero-arctic-3200')}" alt="${text('Arctic White — light shaping a space','Arctic White — 光线塑造空间')}" loading="lazy"><figcaption><span>ARCTIC WHITE</span><span>${text('AN IDEA, INHABITED.','从想法，到置身其间。')}</span></figcaption></figure><section class="service-dialogue"><h2>${text('A dialogue between<br>idea and making.','在想象与建造之间，<br>保持对话。')}</h2><div><p>${text('We begin by listening — to your ideas, the way your business works, and the people who will use the space. From this conversation, a clear design direction takes shape.','我们先倾听你的想法、理解业务的日常，也观察未来使用空间的人。清晰的设计方向，就从这些对话中逐渐成形。')}</p><p>${text('Light, material and detail are considered together. Design documentation, approvals and on-site review carry the idea through to the built work, in close collaboration with D Construction Office.','我们将光线、材质与细节一同考虑，通过设计文件、审批协调与现场设计跟进，并与 D Construction Office 紧密协作，让想法成为真实的空间。')}</p></div></section><div class="service-end"><span>${text('WHAT DO YOU HAVE IN MIND?','你正在想象什么？')}</span><a href="${url('contact/')}">${text('Let’s begin.','从一次对话开始。')}${arrow()}</a></div></main>`}

// One render clock keeps the identity, model reveal and handover continuous.
let introActive=false,introDialog=null,introRAF=0,introAbort=null,introAssets=null;
const modelCrops=[
 [18,18,680,724],[18,126,626,655],[18,136,630,650],
 [18,18,704,642],[18,18,720,730],[18,18,846,560],
 [18,18,864,647],[18,18,700,770],[20,20,640,568],
 [18,18,932,686],[35,18,570,730],[18,18,932,686],
 [18,18,1284,387]
];
function finishIntro(){
 cancelAnimationFrame(introRAF);introAbort?.abort();introAbort=null;introActive=false;
 if(introDialog?.open)introDialog.close();introDialog?.remove();introDialog=null;
 document.body.classList.remove('intro-open','intro-entering');
 if(PAGE==='home'){frameElapsed=0;startTimer();syncVideo()}
}
function loadIntroModels(){
 if(!introAssets)introAssets=Promise.all(modelCrops.map((crop,i)=>new Promise(resolve=>{
  const img=new Image();img.decoding='async';let settled=false,retry=0,timeout=null;
  const done=value=>{if(!settled){settled=true;clearTimeout(timeout);resolve(value)}};
  const source=url('assets/model-large-'+String(i+1).padStart(2,'0')+'.webp')+'?v=20261110c';
  img.onload=()=>img.decode().catch(()=>{}).then(()=>done({img,crop}));
  img.onerror=()=>{if(retry++===0)img.src=source+'&retry=1';else done(null)};
  timeout=setTimeout(()=>done(img.complete&&img.naturalWidth?{img,crop}:null),12000);img.src=source;
 }))).then(items=>items.filter(Boolean));
 return introAssets;
}
const introFrameStep=220,introFrameBlend=150;
// Use time since the actual frame index, so the last hold never loops a previous-frame blend.
function introModelBlend(elapsed,count){
 const time=Math.max(0,elapsed),index=Math.min(count-1,Math.floor(time/introFrameStep));
 return {index,fraction:Math.min(1,(time-index*introFrameStep)/introFrameBlend)};
}
function playIntro(force=false){
 if(reduced.matches||introActive)return;
 try{if(!force&&sessionStorage.getItem('ddo-intro-20261110d'))return}catch{}
 introActive=true;cancelAnimationFrame(timer);document.body.classList.add('intro-open');syncVideo();
 const d=document.createElement('dialog');introDialog=d;d.className='ddo-intro intro-v3';d.tabIndex=0;
 d.setAttribute('aria-label',text('D Design Office opening. Click anywhere or press Enter to enter.','D Design Office 开场。点击任意位置或按回车进入。'));
 d.innerHTML=`<canvas class="intro-canvas" aria-hidden="true"></canvas><div class="intro-identity" aria-hidden="true" hidden>${[0,1].map(()=>'<span class="intro-identity-glyph"><svg viewBox="0 0 68 100"><path fill="currentColor" fill-rule="evenodd" d="M0 0H21.76C82.96 0 82.96 100 21.76 100H0ZM15.5 15.5V84.5H21.76C62.56 84.5 62.56 15.5 21.76 15.5Z"/></svg></span>').join('')}<span class="intro-identity-glyph"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40.25" stroke-width="15.5" fill="none" stroke="currentColor"/></svg></span></div>`;
 document.body.append(d);d.showModal();d.focus({preventScroll:true});
 introAbort=new AbortController();const signal=introAbort.signal;
 const canvas=d.querySelector('canvas'),ctx=canvas.getContext('2d',{alpha:true});
 const identity=d.querySelector('.intro-identity'),identityGlyphs=Array.from(identity.children),identityRing=identity.querySelector('circle');
 let identityHeight=0,identityCounter=null,wordBackdropPainted=false;
 let W=innerWidth,H=innerHeight,DPR=Math.min(devicePixelRatio||1,2),models=[],ready=false,elapsed=0,last=0;
 let scatter=null,phase='',logoRect=null;const modelLayers=new Map();
 const ink=getComputedStyle(document.body).getPropertyValue('--ink').trim()||'#342d27';
 const blue=getComputedStyle(document.body).getPropertyValue('--blue').trim()||'#b6cfe9',brandColor=getComputedStyle($('.brand')).color;
 const clamp=v=>Math.max(0,Math.min(1,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v)},mix=(a,b,t)=>a+(b-a)*t;
 const smoother=v=>{v=clamp(v);return v*v*v*(v*(v*6-15)+10)};
 const spring=(t,damping=7.5,frequency=15)=>t<=0?0:1-Math.exp(-damping*t)*(Math.cos(frequency*t)+damping/frequency*Math.sin(frequency*t));
 const setPhase=p=>{if(phase!==p){phase=p;d.dataset.phase=p}};
 function resize(){modelLayers.clear();wordBackdropPainted=false;W=innerWidth;H=innerHeight;DPR=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);canvas.style.width=W+'px';canvas.style.height=H+'px';logoRect=$('.brand .logo-symbol').getBoundingClientRect();}
 resize();window.addEventListener('resize',resize,{signal});
 function modelBox(frame){
  const [, ,cw,ch]=frame.crop;
  const maxW=Math.min(W*.87,1180),maxH=H*(W<760?.64:.79);
  // Equal optical area, bounded by a common centred display envelope.
  const area=maxW*maxH*.82,scale=Math.min(Math.sqrt(area/(cw*ch)),maxW/cw,maxH/ch);
  return {w:cw*scale,h:ch*scale};
 }
 function model(frame,scale=1,alpha=1,cx=W/2,cy=H/2){
  if(!frame||alpha<=0)return;const b=modelBox(frame),[sx,sy,sw,sh]=frame.crop;
  ctx.save();ctx.globalAlpha=alpha;ctx.drawImage(frame.img,sx,sy,sw,sh,cx-b.w*scale/2,cy-b.h*scale/2,b.w*scale,b.h*scale);ctx.restore();
 }
 // Composite full white-backed frames, so incoming parts outside the previous model's bounds never pop on.
 function modelLayer(index){
  if(modelLayers.has(index))return modelLayers.get(index);
  const layer=document.createElement('canvas');layer.width=canvas.width;layer.height=canvas.height;
  const painter=layer.getContext('2d'),frame=models[index],b=modelBox(frame);painter.scale(DPR,DPR);painter.fillStyle='#fff';painter.fillRect(0,0,W,H);
  painter.drawImage(frame.img,...frame.crop,W/2-b.w/2,H/2-b.h/2,b.w,b.h);
  modelLayers.set(index,layer);for(const key of modelLayers.keys())if(key<index-1||key>index+1)modelLayers.delete(key);
  return layer;
 }
 function flowingModels(index,p){
  if(index===0){ctx.drawImage(modelLayer(0),0,0,W,H);return}
  const outgoing=modelLayer(index-1),incoming=modelLayer(index),blend=smoother(p);
  const tension=Math.sin(Math.PI*p),arrival=mix(spring(p*.38,10,16),1,smoother((p-.65)/.35));
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(1+.018*tension,1-.014*tension);ctx.drawImage(outgoing,-W/2,-H/2,W,H);ctx.restore();
  ctx.save();ctx.globalAlpha=blend;ctx.translate(W/2,H/2);ctx.scale(.965+.035*arrival,1.03-.03*arrival);ctx.drawImage(incoming,-W/2,-H/2,W,H);ctx.restore();
 }
 function circle(x,y,r,inner=0,color=ink,alpha=1){
  if(r<=0||alpha<=0)return;ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
  if(inner>0){ctx.moveTo(x+inner,y);ctx.arc(x,y,inner,0,Math.PI*2,true)}ctx.fill('evenodd');ctx.restore();
 }
 function letterD(x,y,h,sx,sy,alpha){
  const w=h*.68,stroke=h*.155;ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.scale(sx,sy);ctx.translate(-w/2,-h/2);
  ctx.fillStyle=blue;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(w*.32,0);ctx.bezierCurveTo(w*1.22,0,w*1.22,h,w*.32,h);ctx.lineTo(0,h);ctx.closePath();
  ctx.moveTo(stroke,stroke);ctx.lineTo(stroke,h-stroke);ctx.lineTo(w*.32,h-stroke);ctx.bezierCurveTo(w*.92,h-stroke,w*.92,stroke,w*.32,stroke);ctx.closePath();ctx.fill('evenodd');ctx.restore();
 }
 function identityPose(t){
  const h=Math.min(W*(W<760?.29:.215),H*.29,204),step=h*.9,jump=h*.34;
  const flow=smooth((t-760)/1880),arrival=age=>spring(age,6.8,14.6);
  const letters=[0,1].map(i=>{
   const age=Math.max(0,t-i*100)/1000,b=arrival(age),out=smoother((t-930-i*60)/600);
   return {x:W/2-step+i*step+h*.08*(1-b)-h*.065*flow,y:H/2+jump*(1-b)-h*.018*out,
    sx:(.84+.16*b)*(1-.02*out),sy:(1.13-.13*b)*(1-.02*out),alpha:smoother(age/.24)*(1-out)};
  });
  const age=Math.max(0,t-200)/1000,b=arrival(age),strain=.014*Math.sin(Math.PI*flow);
  const contraction=smoother((t-2640)/680),outer=mix(h*.48,7,contraction),hole=outer*(1-.155/.48)*(1-smoother(contraction/.8));
  const o={x:mix(W/2+step,W/2,flow)+h*.08*(1-b)*(1-flow),y:H/2+jump*(1-b)*(1-flow),
   sx:.84+.16*b+strain,sy:1.13-.13*b-strain*.75,alpha:smoother(age/.24),outer,hole};
  return {h,letters,o};
 }
 function word(t,paint=false){
  const {h,letters,o}=identityPose(t);
  if(paint){
   letters.forEach(p=>letterD(p.x,p.y,h,p.sx,p.sy,p.alpha));
   ctx.save();ctx.translate(o.x,o.y);ctx.scale(o.sx,o.sy);circle(0,0,o.outer,o.hole,blue,o.alpha);ctx.restore();return;
  }
  if(identityHeight!==h){identityHeight=h;identityGlyphs.forEach((el,i)=>{el.style.width=(i<2?h*.68:h)+'px';el.style.height=h+'px'})}
  const place=(el,p,w,scale=1)=>{el.style.transform=`translate3d(${(p.x-w/2).toFixed(4)}px,${(p.y-h/2).toFixed(4)}px,0) scale(${(p.sx*scale).toFixed(6)},${(p.sy*scale).toFixed(6)})`;el.style.opacity=p.alpha.toFixed(5)};
  letters.forEach((p,i)=>place(identityGlyphs[i],p,h*.68));place(identityGlyphs[2],o,h,o.outer/(h*.48));
  const counter=(o.hole/o.outer*48).toFixed(5);
  if(counter!==identityCounter){identityCounter=counter;identityRing.setAttribute('r',String((48+Number(counter))/2));identityRing.setAttribute('stroke-width',String(48-Number(counter)))}
 }
 function makePieces(originX=W/2,originY=H/2){
  const cols=W<760?4:7,rows=W<760?7:5,points=[],pieces=[];
  for(let y=0;y<=rows;y++){points[y]=[];for(let x=0;x<=cols;x++){const jitter=Math.sin(x*61.7+y*37.1);points[y][x]=[x*W/cols+(x&&x<cols?jitter*W/cols*.21:0),y*H/rows+(y&&y<rows?Math.cos(x*43+y*19)*H/rows*.2:0)]}}
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
   const a=points[y][x],b=points[y][x+1],c=points[y+1][x+1],e=points[y+1][x];
   for(const p of [[a,b,c],[a,c,e]]){const cx=p.reduce((n,v)=>n+v[0],0)/3,cy=p.reduce((n,v)=>n+v[1],0)/3,dist=Math.hypot(cx-originX,cy-originY),angle=Math.atan2(cy-originY,cx-originX);
    pieces.push({p,cx,cy,delay:dist/Math.hypot(W,H)*.24,dx:Math.cos(angle)*(12+dist*.04),dy:Math.sin(angle)*(12+dist*.04)-9,rotation:Math.sin(cx+cy)*.075,
     x:Math.min(...p.map(v=>v[0])),y:Math.min(...p.map(v=>v[1])),w:Math.max(...p.map(v=>v[0]))-Math.min(...p.map(v=>v[0])),h:Math.max(...p.map(v=>v[1]))-Math.min(...p.map(v=>v[1]))});
   }
  }return pieces;
 }
 const whitePieces=makePieces();
 function fragments(pieces,t,source=null){
  ctx.save();ctx.globalAlpha=1-smoother(t/.74);if(source)ctx.drawImage(source,0,0,W,H);else{ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H)}ctx.restore();
  for(const piece of pieces){const u=smooth((t-piece.delay)/.79);if(u>=1)continue;ctx.save();ctx.globalAlpha=Math.pow(1-u,1.4);ctx.translate(piece.cx+piece.dx*u,piece.cy+piece.dy*u);ctx.rotate(piece.rotation*u);ctx.scale(1-u*.055,1-u*.055);ctx.translate(-piece.cx,-piece.cy);ctx.beginPath();piece.p.forEach((v,i)=>i?ctx.lineTo(...v):ctx.moveTo(...v));ctx.closePath();
   if(source){ctx.clip();ctx.drawImage(source,piece.x*DPR,piece.y*DPR,piece.w*DPR,piece.h*DPR,piece.x,piece.y,piece.w,piece.h)}else{ctx.fillStyle='#fff';ctx.fill()}ctx.restore();
  }
 }
 function drawLogo(x,y,w,h,alpha=1){
  const s=Math.min(w/94,h/82);ctx.save();ctx.globalAlpha=alpha;ctx.translate(x+(w-94*s)/2,y+(h-82*s)/2);ctx.scale(s,s);
  ctx.fillStyle=blue;ctx.beginPath();ctx.moveTo(5,3);ctx.lineTo(40,3);ctx.arc(40,41,38,-Math.PI/2,Math.PI/2);ctx.lineTo(5,79);ctx.closePath();ctx.fill();
  ctx.fillStyle=brandColor;ctx.font='600 24px Jost';ctx.textBaseline='alphabetic';
  if('letterSpacing' in ctx){ctx.letterSpacing='12px';ctx.fillText('DDO',4,52);ctx.letterSpacing='0px'}else{let xx=4;for(const l of 'DDO'){ctx.fillText(l,xx,52);xx+=ctx.measureText(l).width+12}}
  ctx.restore();
 }
 function handover(t){
  const p=smooth(t/1510),travel=1-Math.pow(1-p,2),frame=models[models.length-1],b=modelBox(frame);
  fragments(whitePieces,Math.max(0,t-160)/1100);
  const cx=mix(W/2,logoRect.x+logoRect.width/2,travel),cy=mix(H/2,logoRect.y+logoRect.height/2,travel)-Math.sin(p*Math.PI)*Math.min(45,H*.06);
  const w=mix(b.w,logoRect.width,travel),h=mix(b.h,logoRect.height,travel),blueIn=smooth((p-.1)/.63),logoIn=smooth((p-.43)/.45);
  ctx.save();ctx.translate(cx-w/2,cy-h/2);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(w*(1-p*.55),0);ctx.bezierCurveTo(w,0,w,h,w*(1-p*.55),h);ctx.lineTo(0,h);ctx.closePath();ctx.clip();
  ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.globalAlpha=1-blueIn;ctx.drawImage(frame.img,...frame.crop,0,0,w,h);ctx.globalAlpha=blueIn*(1-logoIn);ctx.fillStyle=blue;ctx.fillRect(0,0,w,h);ctx.restore();
  drawLogo(cx-w/2,cy-h/2,w,h,logoIn);
 }
 function enter(e){
  if(scatter||!introActive)return;e?.preventDefault();e?.stopPropagation();
  if(ready&&elapsed<3500){ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);word(elapsed,true);identity.hidden=true}
  const snapshot=document.createElement('canvas');snapshot.width=canvas.width;snapshot.height=canvas.height;snapshot.getContext('2d').drawImage(canvas,0,0);
  scatter={source:snapshot,time:0,pieces:makePieces(e?.clientX||W/2,e?.clientY||H/2)};document.body.classList.add('intro-entering');setPhase('dissolve');
 }
 d.addEventListener('click',enter,{signal});d.addEventListener('cancel',enter,{signal});
 d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){enter(e)}},{signal});
 Promise.all([loadIntroModels(),document.fonts.load('600 24px Jost').catch(()=>{})]).then(([frames])=>{
  if(!introActive||introDialog!==d)return;models=frames;d.dataset.frames=String(frames.length);ready=true;elapsed=0;try{sessionStorage.setItem('ddo-intro-20261110d','1')}catch{}
 });
 function frame(now){
  if(!introActive||introDialog!==d)return;
  const dt=last?Math.min(50,now-last):0;last=now;ctx.setTransform(DPR,0,0,DPR,0,0);
  const wordFrame=ready&&!scatter&&elapsed+dt<3500;identity.hidden=!wordFrame;
  if(!wordFrame||!wordBackdropPainted)ctx.clearRect(0,0,W,H);
  if(scatter){scatter.time+=dt;fragments(scatter.pieces,scatter.time/950,scatter.source);if(scatter.time>=1050){finishIntro();return}}
  else if(!ready){setPhase('loading');ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);circle(W/2,H/2,6+Math.sin(now/350)*1.2,0,blue)}
  else{
   elapsed+=dt;const modelStart=4220,modelEnd=modelStart+Math.max(0,models.length-1)*introFrameStep+introFrameBlend+320,flightEnd=modelEnd+1540;
   if(elapsed<modelEnd&&(!wordFrame||!wordBackdropPainted)){ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H)}
   if(elapsed<3500){setPhase(elapsed<760?'word':elapsed<2640?'letter-o':elapsed<3320?'o-to-dot':'dot');word(elapsed);wordBackdropPainted=true}
   else if(!models.length){finishIntro();return}
   else if(elapsed<modelStart){
    setPhase('dot-to-model');const t=clamp((elapsed-3500)/720),b=mix(spring(t*1.1,8,10),1,smoother((t-.62)/.38)),radius=mix(7,Math.hypot(W,H)*.57,smoother(t));
    circle(W/2,H/2,mix(7,22,smooth(t)),0,blue,1-smooth(t*2));ctx.save();ctx.beginPath();ctx.arc(W/2,H/2,radius,0,Math.PI*2);ctx.clip();model(models[0],mix(.08,1,b),smoother(t*1.8));ctx.restore();
   }else if(elapsed<modelEnd){
    setPhase('models');const {index,fraction}=introModelBlend(elapsed-modelStart,models.length);d.dataset.model=String(index+1);
    flowingModels(index,fraction);
   }else if(elapsed<flightEnd){setPhase('model-to-logo');handover(elapsed-modelEnd)}
   else{finishIntro();return}
  }
  introRAF=requestAnimationFrame(frame);
 }
 introRAF=requestAnimationFrame(frame);
}

function studio(){return `<main id="main" class="page studio-page"><p class="eyebrow">${dot}${text('THE PRACTICE','关于我们')}</p><div class="studio-heading"><h1>${text('Two disciplines.<br>One vision.','两种专长，<br>一个愿景。')}</h1><div class="studio-sign" aria-hidden="true"><i></i></div></div><div class="studio-layout"><img src="${image('p05-00')}" alt="Yappari Steak interior" width="1602" height="842"><div class="studio-copy"><h2>${text('From the first sketch<br>to the first guest.','从第一笔草图，<br>到第一位来客。')}</h2><p>${text('D Design Office and D Construction Office are sister studios based in Sydney, devoted to interior architecture and its realisation. We work with the belief that a space is never finished at the drawing. It is finished when it is lived in.','D Design Office 与 D Construction Office 是位于悉尼的姊妹工作室，专注于室内建筑设计及其落地。我们相信，空间并不止于图纸；当人们走入其中，生活开始，设计才真正完整。')}</p><p>${text('Movement, ritual, light and material shape our work. DDO leads creative direction, interior architecture and documentation. DCO carries that vision into the built work — from first sketch to final handover.','人的动线、日常习惯、光线与材质，共同塑造我们的作品。DDO 负责创意方向、室内建筑设计与设计文件；DCO 将愿景落实为真实空间，从最初的草图一路走到交付。')}</p><a class="text-link" href="https://dconstructionoffice.com/" target="_blank" rel="noopener">D Construction Office ${arrow()}</a></div></div>${teamSection()}<div class="studio-principles"><div><span>01 / ${text('OBSERVE','观察')}</span><h3>${text('Begin with people.','从人出发。')}</h3><p>${text('Listen to how a place will be used, before deciding how it will look.','先理解一个空间如何被使用，再思考它的模样。')}</p></div><div><span>02 / ${text('EXPLORE','探索')}</span><h3>${text('Leave room for play.','给玩心留白。')}</h3><p>${text('Find character in light, material and the unexpected detail.','在光线、材质与意外的细节里，发现独特的性格。')}</p></div><div><span>03 / ${text('REALISE','实现')}</span><h3>${text('Carry the idea through.','让想法抵达。')}</h3><p>${text('A close conversation between design and construction, all the way to handover.','让设计与建造始终保持对话，直至空间交付。')}</p></div></div><a class="next-project" href="${url('contact/')}"><span>${text('START SOMETHING','开启新的故事')}</span><h2>${text('What do you have in mind?','你正在想象什么？')}</h2>${arrow()}</a></main>`}
function contact(){return `<main id="main" class="page contact-page"><p class="eyebrow">${dot}${text('EVERY SPACE BEGINS WITH A CONVERSATION','每一个空间，都始于对话')}</p><h1>${text('Something<br>in mind<span class="heading-dot">?</span>','心中，<br>已有想法<span class="heading-dot">？</span>')}</h1><div class="contact-layout"><p>${text('A new place. A different perspective.<br>We’d love to hear what you’re imagining.','一个新空间，一种新视角。<br>我们期待听听你的想象。')}</p><div class="contact-links"><a class="contact-email" href="mailto:info@ddesignoffice.com">info@ddesignoffice.com ${arrow()}</a><button id="copy-email">${text('Copy email address','复制邮箱地址')}</button><span id="copy-result" role="status"></span><div class="contact-external"><a href="https://www.instagram.com/ddesignoffice/" target="_blank" rel="noopener">Instagram ${arrow()}</a><a href="https://dconstructionoffice.com/" target="_blank" rel="noopener">D Construction Office ${arrow()}</a></div><p>${text('BASED IN SYDNEY, AUSTRALIA','澳大利亚 · 悉尼')}</p></div></div><div class="contact-shape" aria-hidden="true"></div></main>`}
function showPhoto(i){lightIndex=(i+currentProject.photos.length)%currentProject.photos.length;$('#light-image').src=image(currentProject.photos[lightIndex]);$('#light-image').alt=`${currentProject.brand} — ${lightIndex+1}`;$('#light-caption').textContent=`${currentProject.brand} / ${String(lightIndex+1).padStart(2,'0')} — ${String(currentProject.photos.length).padStart(2,'0')}`}
function render(){cancelAnimationFrame(timer);document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.body.classList.toggle('zh',lang==='zh');document.body.classList.toggle('is-home',PAGE==='home');document.body.innerHTML=header()+({home:home,projects:projectsPage,project:detail,studio:studio,services:services,contact:contact}[PAGE]||home)()+footer();$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;try{localStorage.setItem('ddo-language',lang)}catch{}render()}));
if(PAGE==='projects')renderProjects();
if(PAGE==='home')bindFilm();
if(PAGE==='project'&&currentProject){const d=$('#lightbox');$$('[data-photo]').forEach(b=>b.addEventListener('click',()=>{showPhoto(+b.dataset.photo);d.showModal()}));$('.light-close').addEventListener('click',()=>d.close());$('.light-prev').addEventListener('click',()=>showPhoto(lightIndex-1));$('.light-next').addEventListener('click',()=>showPhoto(lightIndex+1));d.addEventListener('click',e=>{if(e.target===d)d.close()})}
if(PAGE==='contact')$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('info@ddesignoffice.com');$('#copy-result').textContent=text('Copied.','已复制。')}catch{$('#copy-result').textContent=text('Please select the address above to copy it.','请选择上方邮箱地址复制。')}});
}
document.addEventListener('visibilitychange',()=>{if(PAGE==='home'){startTimer();syncVideo();if(document.hidden){cancelAnimationFrame(fadeRAF);score.pause()}else if(soundWanted){setSoundLevel(0);soundContext?.resume().catch(()=>{});score.play().then(()=>volumeTo(.42,2200)).catch(()=>{soundWanted=false;updateSound()})}}});window.addEventListener('pagehide',()=>score.pause());window.addEventListener('popstate',()=>{if(PAGE==='projects')renderProjects()});document.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key)||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(PAGE==='project'&&$('#lightbox')?.open){e.preventDefault();showPhoto(lightIndex+(e.key==='ArrowRight'?1:-1))}else if(PAGE==='home'){changeSlide(slide+(e.key==='ArrowRight'?1:-1));startTimer()}});reduced.addEventListener('change',e=>{if(e.matches){playing=false;finishIntro();if(PAGE==='home')render()}});render();
})();
