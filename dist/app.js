(function app(){
const {lessons,sources}=COURSE;
const groups=["Логика и эрудиция","Биомедицина","Естественные науки"];
const captions=["Logica e cultura generale","Ambito biomedico","Ambito scientifico"];
const icons=[
'<path d="M4 7h7v7H4zM14 4h6v6h-6zM13 15h7v6h-7z"/>',
'<path d="M20 5c-4 0-4 4-8 4-3 0-4-4-8-4m0 14c4 0 4-4 8-4 3 0 4 4 8 4M5 5c5 4 9 10 14 14M5 19c2-2 3-4 5-6m4-2 5-6"/>',
'<path d="M9 3h6m-5 0v6l-6 10q-1 2 2 2h12q3 0 2-2L14 9V3M7 15h10"/>'
];
const svg=(path)=>`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
const icon=(g)=>`<span class="emblem g${g}">${svg(icons[g])}</span>`;
const main=document.querySelector("main");
const questions=new Map(lessons.flatMap(l=>l.questions.map(q=>[q.id,{...q,lesson:l}])));
const lessonById=new Map(lessons.map(l=>[l.id,l]));
const key="passo-study-v1";
let saved={stats:{},days:{},history:[],session:null},storageProblem=false;
try{const old=JSON.parse(localStorage.getItem(key));if(old?.stats&&old?.days&&Array.isArray(old.history))saved=old}catch{storageProblem=true}
const persist=()=>{try{localStorage.setItem(key,JSON.stringify(saved))}catch{storageProblem=true;status()}};
const today=(d=new Date())=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");
const shuffle=(seq)=>{const a=[...seq];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const all=[...questions.values()];
const errors=()=>all.filter(q=>saved.stats[q.id]?.last===false);
const known=(l)=>l.questions.filter(q=>saved.stats[q.id]?.last===true).length;
const pick=(pool,n)=>shuffle(pool).sort((a,b)=>(saved.stats[a.id]?.count||0)-(saved.stats[b.id]?.count||0)).slice(0,n);
const esc=(v)=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const link=(route,label,cls="btn")=>`<a class="${cls}" href="#${route}">${label}</a>`;
const button=(action,label,cls="action")=>`<button class="${cls}" data-act="${action}">${label}</button>`;
const bk=(id)=>`<a class="book row" href="${sources[id][2]}" target="_blank" rel="noopener noreferrer"><b lang="it">${sources[id][0]}</b><small>${sources[id][1]}</small></a>`;
const wrap=(html)=>`<section class="sheet">${html}</section>`;
const heading=(title,desc="")=>`<div class="heading"><h1>${title}</h1>${desc?`<p class="sub">${desc}</p>`:""}</div>`;
const meter=(n,max)=>`<div class="meter" aria-hidden="true"><i style="width:${max?100*n/max:0}%"></i></div>`;
const tile=(g)=>`<a class="tile" href="#group/${g}">${icon(g)}<h3>${groups[g]}</h3><small lang="it">${captions[g]}</small></a>`;
const back=(to,label)=>link(to,label,"textlink back");
function week(){
const now=new Date(),monday=new Date(now);monday.setDate(now.getDate()-(now.getDay()+6)%7);
return ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map((name,i)=>{const d=new Date(monday);d.setDate(d.getDate()+i);const date=today(d),done=!!saved.days[date];return `<span class="day ${date===today()?"today":""} ${done?"done":""}" aria-label="${name}, ${done?"было занятие":"пока без занятия"}"><i>${done?"✓":d.getDate()}</i>${name}</span>`}).join("")
}

const controls=PRACTICE.controls;
const controlTitles={sprint:"Контрольная на 12 вопросов",finale:"Контрольный экзамен"};
for(const batch of Object.values(controls)){
  for(const q of batch)questions.set(q.id,{...q,lesson:lessonById.get(q.lesson)});
}
const chapters=groups.map((_,i)=>lessons.filter(l=>l.group===i));
const pathLessons=[];
for(let i=0;i<Math.max(...chapters.map(c=>c.length));i++){
  for(const chapter of chapters)if(chapter[i])pathLessons.push(chapter[i]);
}
const mastered=l=>known(l)>=Math.ceil(l.questions.length*.8);
const nextLesson=()=>pathLessons.find(l=>!mastered(l))||pathLessons[0];
const totalMastered=()=>lessons.filter(mastered).length;
const countdown=s=>s?.end!=null;
let searchText="",subject="all",onlySaved=false;
let deck=null;
const termList=lessons.flatMap(l=>l.terms.map((term,index)=>({...term,key:l.id+"."+index,lesson:l})));
function consecutiveDays(){
  const day=new Date(),result=[];
  if(!saved.days[today(day)])day.setDate(day.getDate()-1);
  while(saved.days[today(day)]){result.push(today(day));day.setDate(day.getDate()-1)}
  return result.length
}
function medals(){return `<div class="counters"><span><i aria-hidden="true">✦</i> ${totalMastered()} / ${lessons.length} тем</span><span><i aria-hidden="true">◉</i> Серия дней: ${consecutiveDays()}</span></div>`}
function home(){
  const l=nextLesson(),active=saved.session;
  const index=pathLessons.indexOf(l),start=Math.max(0,Math.min(pathLessons.length-4,index-1));
  return `<div class="topline"><div><p class="eyeline" lang="it">Scienze motorie / Roma</p><h1>Привет, София!</h1></div>${medals()}</div>
  <section class="camp"><div class="campcopy"><span class="ticket">Учебный маршрут</span><h2>${active?"Продолжим занятие?":"Твой путь в Рим"}</h2><p>${active?esc(active.title):`Следующая тема — «${l.name}». Разбери пример и проверь себя на итальянском.`}</p>${active?link("play","Продолжить занятие"):link("lesson/"+l.id,"Открыть урок")}</div><img src="roma.webp" width="600" height="400" alt="Заяц в спортивной форме на беговой дорожке в Риме"></section>
  <div class="campgrid"><section class="trailbox"><div class="sectiontitle"><div><p class="eyeline">От урока к уроку</p><h2>Ближайшие остановки</h2></div>${link("route","Весь путь","textlink")}</div>${trail(pathLessons.slice(start,start+4),start,l)}</section>
  <aside class="side"><section class="mission"><div class="spread"><span class="ticket">Разминка дня</span><b>${Math.min(saved.days[today()]||0,5)} / 5</b></div><h2>Пять вопросов</h2><p>Логика, биология и точные науки за один подход.</p>${meter(Math.min(saved.days[today()]||0,5),5)}${button("daily","Начать разминку","btn")}</section>
  <section class="atlasmini"><h2>Энциклопедия</h2><p>${lessons.length} тем и ${termList.length} словарных карточек с переводом.</p>${link("atlas","Найти тему или слово","textlink")}</section></aside></div>
  <div class="extras">${link("exam","<span><b>Экзаменационный зал</b><small>Пробники и независимые контрольные</small></span>","strip")}${link("review",`<span><b>Работа над ошибками</b><small>К повторению: ${errors().length}</small></span>`,"strip")}</div>`;
}
function trail(list,start,next){return `<ol class="trail" start="${start+1}">${list.map((l,i)=>`<li class="trackrow ${mastered(l)?"finished":next===l?"current":""}"><a href="#lesson/${l.id}"><span class="stone" aria-hidden="true">${mastered(l)?"✓":start+i+1}</span><span><small>${groups[l.group]}${mastered(l)?" · Освоено":next===l?" · Следующий урок":""}</small><b>${l.name}</b><em lang="it">${l.it}</em></span></a></li>`).join("")}</ol>`}
function routePage(){return heading("Твой учебный маршрут","Темы чередуются. Чтобы освоить остановку, ответь верно хотя бы на 5 из 6 вопросов её практики.")+wrap(`${medals()}${trail(pathLessons,0,nextLesson())}`)}
function lesson(l){
 const savedArticle=!!saved.bookmarks?.[l.id];
 return wrap(`${back("atlas","К энциклопедии")}<div class="spread"><span class="ticket">${groups[l.group]}</span><button class="plain save" data-act="bookmark:${l.id}" aria-pressed="${savedArticle}">${savedArticle?"В избранном":"В избранное"}</button></div><h1>${l.name}</h1><p lang="it" class="sub">${l.it}</p><p>${l.rule}</p><div class="example"><b>Разберём на примере</b><p>${l.example}</p></div><div class="nuance"><h2>На что обратить внимание</h2><p>${l.trap}</p></div>
 ${lab(l.id)}<h2>Словарь темы</h2><dl class="wordlist">${l.terms.map(t=>`<div><dt lang="it">${t.it}</dt><dd>${t.ru}${t.def?`<small lang="it">${t.def}</small>`:""}</dd></div>`).join("")}</dl><div class="actions">${button("lesson:"+l.id,"Перейти к практике")}${link("cards/"+l.id,"Карточки слов","btn secondary")}</div>
 <h2>Связанные темы</h2><div class="tags">${related(l).map(id=>link("lesson/"+id,lessonById.get(id).name,"tag")).join("")}</div><h2>Почитать подробнее</h2><div class="rows">${l.refs.map(bk).join("")}</div>`);
}
function related(l){
 const chains=[["ded","sets","language","read","evidence","data","order"],["civic","history","europe","geo","olympia","dante","renaissance"],["heart","blood","breath","cell","nutrition","hormones","genetics","systems","neuro","muscles","bones","planes"],["maths","algebra","geometry","fluids","motion","levers","energy","heat","chem","bonds","moles"]];
 const chain=chains.find(c=>c.includes(l.id))||[],i=chain.indexOf(l.id);return [chain[(i+chain.length-1)%chain.length],chain[(i+1)%chain.length]].filter(Boolean)
}
function fold(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/ё/g,"е").trim()}
function atlasResults(){
 const q=fold(searchText),matches=lessons.filter(l=>(subject==="all"||String(l.group)===subject)&&(!onlySaved||saved.bookmarks?.[l.id])).map(l=>{
 const term=l.terms.find(t=>q&&fold(t.it+" "+t.ru+" "+(t.def||"")).includes(q));
 const hay=fold([l.name,l.it,l.word,l.translation,l.rule,l.example,l.trap].join(" "));
 return {l,term,hit:!q||!!term||hay.includes(q)};
 }).filter(x=>x.hit);
 return `<p class="sub" role="status">Найдено тем: ${matches.length}</p>${matches.length?`<div class="articlegrid">${matches.map(({l,term})=>`<a class="article" href="#lesson/${l.id}">${icon(l.group)}<span><b>${l.name}</b><small lang="it">${l.it}</small>${term?`<em>${term.it} — ${term.ru}</em>`:""}</span></a>`).join("")}</div>`:"<p>Попробуй другое слово или выбери все блоки.</p>"}`;
}
function atlas(){
 return heading("Энциклопедия","Введи итальянский термин, его перевод или название темы.")+`<div class="extras catalogtools">${link("cards","Карточки слов","strip")}${link("library","Бесплатные книги и варианты","strip")}</div><section class="catalog"><label for="lookup">Поиск по знаниям</label><input id="lookup" type="search" value="${esc(searchText)}" placeholder="Например, atrio или предсердие"><div class="chips">${["Все блоки",...groups].map((v,i)=>`<button data-act="filter:${i?i-1:"all"}" aria-pressed="${subject===(i?String(i-1):"all")}">${v}</button>`).join("")}<button data-act="favorite" aria-pressed="${onlySaved}">Избранное</button></div><div id="matches">${atlasResults()}</div></section>
 `;
}
main.addEventListener("input",event=>{if(event.target.id==="lookup"){searchText=event.target.value;document.getElementById("matches").innerHTML=atlasResults()}});
function cards(id){
 const scope=lessonById.has(id)?id:"all";
 if(!deck||deck.scope!==scope){const pool=termList.filter(t=>scope==="all"||t.lesson.id===scope);
 const due=shuffle(pool.filter(t=>!(saved.words?.[t.key]>today())));
 deck={scope,queue:due.slice(0,8),total:Math.min(due.length,8),done:0,revealed:false};}
 const t=deck.queue[0];
 if(!t)return wrap(`<p class="eyeline">Итальянский словарь</p><h1>${deck.done?"Серия завершена!":"Всё повторено"}</h1><p>${deck.done?`Закреплено слов: ${deck.done}. `:""}Выученные карточки вернутся через три дня.</p>${button("morewords","Проверить следующую подборку")}${link("atlas","К темам","textlink")}`);
 return wrap(`<div class="spread"><span class="ticket">Словарь IT / RU</span><b>${deck.done+1} / ${deck.total}</b></div><h1>Вспомни перевод</h1><p class="sub">${t.lesson.name}</p><div class="flash"><strong lang="it">${t.it}</strong>${deck.revealed?`<p>${t.ru}</p>${t.def?`<small lang="it">${t.def}</small>`:""}`:""}</div>${deck.revealed?`<div class="actions">${button("again","Ещё раз","plain")}${button("learnt","Помню")}</div>`:button("reveal","Показать перевод")}`);
}
function exam(){
 const previous=saved.controlStarts||{};
 return heading("Экзаменационный зал","В контрольных — отдельные авторские задания. Разбор появится после завершения.")+wrap(`<h2>Контрольные варианты</h2>${Object.entries(controlTitles).map(([id,title])=>`<div class="examrow"><div><b>${title}</b><p>${controls[id].length} вопросов · ${controls[id].length} минут</p><small>${previous[id]?`Уже открыт · первый результат: ${saved.firstScores?.[id]??"в процессе"} / ${controls[id].length}`:"Ещё не открыт"}</small></div>${button("control:"+id,previous[id]?"Пройти снова":"Открыть вариант")}</div>`).join("")}`)+wrap(`<h2>Тренировочный пробник</h2><p>60 вопросов из практики за 60 минут. В образце Tor Vergata 2026/27 было 30 вопросов по логике и эрудиции, 20 по биомедицине и 10 по естественным наукам. За верный ответ — 1 балл, за ошибку или пропуск — 0.</p>${button("exam","Начать пробник")}<p>Для 2027/28 сверь условия с новым bando. Для Fisioterapia действует отдельный конкурс.</p>${bk("test")}${bk("verona")}`);
}
function panelAction(action,arg){
 if(action==="flow")flowStep=Number(arg);
 else if(action==="truth"){if(arg==="a")premiseA=!premiseA;else premiseB=!premiseB}
 else if(action==="bookmark"){saved.bookmarks??={};saved.bookmarks[arg]=!saved.bookmarks[arg];persist()}
 else if(action==="filter")subject=arg;
 else if(action==="favorite")onlySaved=!onlySaved;
 else if(action==="reveal")deck.revealed=true;
 else if(action==="morewords")deck=null;
 else if(action==="learnt"||action==="again"){const t=deck.queue.shift();if(action==="learnt"){saved.words??={};const date=new Date();date.setDate(date.getDate()+3);saved.words[t.key]=today(date);deck.done++;persist()}else deck.queue.push(t);deck.revealed=false}
 else return false;
 render(false);return true
}
function breakdown(s){
 const counts=groups.map((g,i)=>{const items=s.items.filter(v=>questions.get(v.q).lesson.group===i);return items.length?`<div class="spread"><span>${g}</span><b>${items.filter(v=>v.a===0).length} / ${items.length}</b></div>`:""}).join("");
 const need=[...new Set(s.items.filter(v=>v.a!==0).map(v=>questions.get(v.q).lesson))].slice(0,3);
 return `<div class="summaryblock"><h2>По блокам</h2>${counts}${s.type==="control"?`<p>Первая попытка: ${saved.firstScores[s.variant]} / ${s.items.length}</p>`:""}${need.length?`<h3>Что разобрать дальше</h3><div class="tags">${need.map(l=>link("lesson/"+l.id,l.name,"tag")).join("")}</div>`:`<p>Следующая тема маршрута: ${link("lesson/"+nextLesson().id,nextLesson().name,"textlink")}</p>`}</div>`
}

let flowStep=0,premiseA=true,premiseB=true,force=30,arm=20;
const circulation=[
 ["Вены большого круга","vene cave","Кровь от органов возвращается в правое предсердие по верхней и нижней полым венам."],
 ["Правое предсердие","atrio destro","Через трёхстворчатый клапан кровь попадает в правый желудочек."],
 ["Правый желудочек","ventricolo destro","Сокращение направляет кровь в лёгочный ствол и лёгочные артерии."],
 ["Капилляры лёгких","capillari polmonari","У альвеол кровь отдаёт углекислый газ и получает кислород."],
 ["Левое предсердие","atrio sinistro","Лёгочные вены приносят кровь в левое предсердие. Далее открыт путь через митральный клапан."],
 ["Левый желудочек","ventricolo sinistro","Толстая мышечная стенка создаёт давление для большого круга."],
 ["Аорта","aorta","Кровь направляется по артериям большого круга к тканям."],
 ["Капилляры тканей","capillari sistemici","Кислород переходит из крови в ткани, а углекислый газ — в кровь. Венозные сосуды возвращают кровь к сердцу."]
];
function lab(id){
 if(!["heart","levers","ded"].includes(id))return "";
 let body="";
 if(id==="heart"){
 const s=circulation[flowStep];
 body=`<div class="flow">${circulation.map((x,i)=>`<button data-act="flow:${i}" aria-label="${i+1}. ${x[0]}" aria-pressed="${i===flowStep}">${i+1}</button>`).join("")}</div><h3>${s[0]}</h3><i lang="it">${s[1]}</i><p>${s[2]}</p>${button("flow:"+((flowStep+1)%8),"Дальше по кругу","plain")}`
 }else if(id==="levers"){
 body=`<label>Сила <b id="force-out">${force} Н</b><input type="range" id="force" min="5" max="100" step="5" value="${force}"></label><label>Плечо <b id="arm-out">${arm} см</b><input type="range" id="arm" min="5" max="50" step="5" value="${arm}"></label><output id="torque">${torque()}</output><p>Удвой плечо при неизменной силе. Момент тоже удвоится.</p>`;
 }else{
 body=`<p>Проверь утверждение «Если идёт дождь (A), дорожка закрыта (B)». Выбери условия, при которых правило нарушено.</p><div class="chips"><button data-act="truth:a" aria-pressed="${premiseA}">Дождь: ${premiseA?"да":"нет"}</button><button data-act="truth:b" aria-pressed="${premiseB}">Дорожка: ${premiseB?"закрыта":"открыта"}</button></div><b role="status">${premiseA&&!premiseB?"Правило нарушено: условие выполнено, а следствие ложно.":!premiseA?"Правило не нарушено: о днях без дождя оно ничего не требует.":"Правило выполнено: идёт дождь, дорожка закрыта."}</b>`;
 }
 return `<section class="lab"><span class="ticket">Интерактив</span><h2>${{heart:"Проследи путь крови",levers:"Измени момент силы",ded:"Проверь условие"}[id]}</h2>${body}</section>`;
}
function torque(){return `${force} Н × ${(arm/100).toLocaleString("ru")} м = ${(force*arm/100).toLocaleString("ru")} Н·м`}
main.addEventListener("input",e=>{
 if(!["force","arm"].includes(e.target.id))return;
 if(e.target.id==="force")force=+e.target.value;else arm=+e.target.value;
 document.getElementById("force-out").textContent=force+" Н";document.getElementById("arm-out").textContent=arm+" см";document.getElementById("torque").textContent=torque()
});

function course(g){
const subset=Number.isInteger(g)?[g]:[0,1,2];
return heading(Number.isInteger(g)?groups[g]:"Учебные темы","Выбери тему, прочитай короткий конспект и проверь себя.")+subset.map(i=>wrap(`<div class="spread"><h2 lang="it">${captions[i]}</h2>${icon(i)}</div><div class="rows">${lessons.filter(l=>l.group===i).map(l=>`<a href="#lesson/${l.id}" class="row"><span><b>${l.name}</b><small lang="it">${l.it}</small></span><span>${known(l)} / ${l.questions.length} верно</span></a>`).join("")}</div>`)).join("")
}
function library(){return heading("Бесплатная библиотека","Книги и материалы открываются на сайтах авторов и университетов. Для перехода понадобится интернет.")+[["Логика и эрудиция",["logic","orient","civic"]],["Биомедицина",["bio","anat","muscle","text"]],["Естественные науки",["math","physics","chem"]],["История, география и спорт",["history","eu","atlas","ioc","dante","uffizi"]],["Поступление и прошлые варианты",["test","verona"]]].map(([name,ids])=>wrap(`<h2>${name}</h2><div class="rows">${ids.map(bk).join("")}</div>`)).join("")}
function progress(){return heading("Твой прогресс","Результаты сохраняются в этом браузере на этом устройстве.")+wrap(`<h2>Дни занятий</h2>${medals()}<div class="week">${week()}</div>`)+wrap(`<h2>Освоенные вопросы</h2><p class="sub">Считаем вопросы, на которые ты в последний раз ответила верно.</p>${groups.map((g,i)=>{const ls=lessons.filter(l=>l.group===i);const n=ls.reduce((s,l)=>s+known(l),0),m=ls.reduce((s,l)=>s+l.questions.length,0);return `<div><div class="spread"><b>${g}</b><span>${n} / ${m}</span></div>${meter(n,m)}</div>`}).join("")}${link("review",`Повторить ошибки (${errors().length})`,"textlink")}`)+wrap(`<h2>Недавние занятия</h2>${saved.history.length?saved.history.slice(0,12).map(h=>`<a class="row" href="#result/${h.id}"><span><b>${esc(h.title)}</b><small>${new Date(h.at).toLocaleDateString("ru")}</small></span><b>${h.score} / ${h.items.length}</b></a>`).join(""):'<p>Здесь появятся результаты после первого занятия.</p>'+link("home","К разминке")}`)}
function review(){const qs=errors();return wrap(`<h1>Работа над ошибками</h1><p>${qs.length?`К повторению ${qs.length}. Разберём за одно занятие до десяти вопросов. Верный ответ уберёт вопрос из этого списка.`:"Здесь будут вопросы, вызвавшие трудности. После первой ошибки можно вернуться к ней и попробовать ещё раз."}</p>${qs.length?button("errors","Начать повторение"):link("course","Выбрать тему")}`)}
function go(route){if(location.hash.slice(1)===route)render();else location.hash=route}
function start(type,id){
if(saved.session && !confirm("Начать новое занятие и завершить текущее? Его результат сохранится, оставшиеся вопросы будут пропущены."))return;
if(saved.session)finish(false);
let qs,title;
if(type==="control"){qs=shuffle(controls[id]);title=controlTitles[id];saved.controlStarts??={};saved.controlStarts[id]=true}
else if(type==="exam"){qs=shuffle([30,20,10].flatMap((n,i)=>pick(all.filter(q=>q.lesson.group===i),n)));title="Пробный экзамен"}
else if(type==="daily"){qs=shuffle([2,2,1].flatMap((n,i)=>pick(all.filter(q=>q.lesson.group===i),n)));title="Разминка дня"}
else if(type==="errors"){qs=pick(errors(),10);title="Работа над ошибками"}
else{const l=lessonById.get(id);qs=shuffle(l.questions);title=l.name}
if(!qs.length){go("review");return}
saved.session={id:crypto.randomUUID?.()||String(Date.now()),type,title,at:Date.now(),variant:type==="control"?id:null,end:["exam","control"].includes(type)?Date.now()+qs.length*60000:null,index:0,items:qs.map(q=>({q:q.id,order:shuffle([0,1,2,3]),a:null,locked:false}))};persist();go("play")
}
function record(item){const q=item.q,stat=saved.stats[q]||{count:0};stat.count++;stat.last=item.a===0;saved.stats[q]=stat;if(item.a!==null)saved.days[today()]=(saved.days[today()]||0)+1}
function finish(navigate=true){
const s=saved.session;if(!s)return;
for(const it of s.items){if(!it.locked){if(countdown(s))record(it);else it.a=null;it.locked=true}}
s.score=s.items.filter(it=>it.a===0).length;
if(s.type==="control"){saved.firstScores??={};saved.firstScores[s.variant]??=s.score}
saved.history.unshift(s);saved.history=saved.history.slice(0,24);saved.session=null;persist();if(navigate)go("result/"+s.id)
}
function clockText(s){const t=Math.max(0,Math.ceil((s.end-Date.now())/1000));return `${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}
function play(){
const s=saved.session;if(!s)return wrap(`<h1>Начнём занятие?</h1>${link("home","К разминке")}`);
const it=s.items[s.index],q=questions.get(it.q),e=countdown(s);
return wrap(`<div class="spread"><b>${s.title}</b><span class="timer">${e?clockText(s):"Практика"}</span></div>${meter(s.index,s.items.length)}<small>${groups[q.lesson.group]} · Вопрос ${s.index+1} из ${s.items.length}</small><h1 lang="it">${q.ask}</h1><div class="choices">${it.order.map((v,i)=>`<button class="choice ${it.a===v?"selected":""} ${it.locked&&v===0?"good":""} ${it.locked&&it.a===v&&v!==0?"bad":""}" data-act="select:${v}" aria-pressed="${it.a===v}" ${it.locked?"disabled":""}><span class="letter">${"ABCD"[i]}</span><span lang="it">${esc(q.choices[v])}</span></button>`).join("")}</div>${it.locked?`<div class="feedback ${it.a===0?"good":"bad"}" role="status"><b>${it.a===0?"Верно!":"Верный ответ: "+esc(q.choices[0])}</b><p>${q.why}</p></div>`:""}
<div class="actions">${e?`${s.index?button("prev","Назад","plain"):""}${button("next",s.index===s.items.length-1?"Завершить пробник":it.a===null?"Пропустить":"Дальше")}${it.a!==null?button("clear","Снять выбор","plain"):""}`:it.locked?button("next",s.index===s.items.length-1?"Посмотреть результат":"Следующий вопрос"):`<button class="action" data-act="check" ${it.a===null?"disabled":""}>Проверить</button>`}</div>${back("home","Сохранить и выйти")}${e?'<small>Таймер продолжит отсчёт после выхода.</small>':""}`)
}
function result(id){
const s=saved.history.find(h=>h.id===id);if(!s)return progress();
return wrap(`<p class="sub">${esc(s.title)}</p><h1>Результат занятия</h1><div class="score">${s.score} / ${s.items.length}</div><p>Верных ответов — ${s.score}, ошибок — ${s.items.filter(i=>i.a!==null&&i.a!==0).length}, пропусков — ${s.items.filter(i=>i.a===null).length}.</p><div class="actions">${s.type==="control"?link("exam","К контрольным","btn secondary"):link("review","Работа над ошибками","btn secondary")}${link("home","На главную")}</div>${breakdown(s)}<h2>Разбор вопросов</h2>${s.items.map((it,i)=>{const q=questions.get(it.q);return `<details class="review"><summary>${i+1}. ${it.a===0?"Верно":it.a===null?"Пропуск":"Ошибка"} · <span lang="it">${q.ask}</span></summary><p>Твой ответ — ${it.a===null?"пропуск":esc(q.choices[it.a])}.</p><p><b>Верный ответ</b> · <span lang="it">${q.choices[0]}</span></p><p>${q.why}</p>${link("lesson/"+q.lesson.id,"Повторить тему","textlink")}</details>`}).join("")}`)
}
function render(focus=true){
if(saved.session?.end && Date.now()>=saved.session.end){finish();return}
const [r,id]=(location.hash.slice(1)||"home").split("/");
const l=lessonById.get(id),route={atlas,route:routePage,cards:()=>cards(id),course:()=>course(),group:()=>["0","1","2"].includes(id)?course(+id):course(),lesson:()=>l?lesson(l):course(),library,progress,play,exam,review,result:()=>result(id)};
main.innerHTML=(route[r]||home)();
document.querySelectorAll("nav a").forEach(a=>{if(a.hash==="#"+({group:"atlas",course:"atlas",lesson:"atlas",library:"atlas",cards:"atlas",play:"home",review:"progress",result:"progress"}[r]||r))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
if(focus){main.focus({preventScroll:true});window.scrollTo(0,0)}
}
main.addEventListener("click",ev=>{
const b=ev.target.closest("[data-act]");if(!b)return;
const [action,arg]=b.dataset.act.split(":");
const s=saved.session;if(s?.end&&Date.now()>=s.end){finish();return}
if(panelAction(action,arg))return;
if(["control","exam","daily","lesson","errors"].includes(action)){start(action,arg);return}
if(!s)return;const it=s.items[s.index];
if(action==="select"&&!it.locked){it.a=Number(arg);persist();render(false);main.querySelector(`[data-act="select:${arg}"]`)?.focus({preventScroll:true});return}
if(action==="clear")it.a=null;
if(action==="check"&&it.a!==null&&!it.locked){record(it);it.locked=true}
if(action==="prev"&&s.index>0)s.index--;
if(action==="next"){if(s.index===s.items.length-1){if(countdown(s)&&!confirm("Завершить пробник и открыть разбор ответов?"))return;finish();return}s.index++}
persist();render(action==="next"||action==="prev");if(action==="check")main.querySelector('[data-act="next"]')?.focus({preventScroll:true})
});
let offlineMessage=location.protocol==="file:"?"Локальная копия":"Подготовка офлайн-доступа…";
function status(){document.getElementById("offline").textContent=storageProblem?"Браузер ограничил сохранение прогресса.":offlineMessage}
window.addEventListener("hashchange",()=>render());
setInterval(()=>{const s=saved.session;if(!s?.end)return;if(Date.now()>=s.end){finish();return}const t=document.querySelector(".timer");if(t)t.textContent=clockText(s)},1000);
render(false);status();
if(location.protocol!=="file:"){
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").then(()=>navigator.serviceWorker.ready).then(()=>{offlineMessage="Занятия доступны офлайн";status()}).catch(()=>{offlineMessage="Офлайн-режим недоступен в этом браузере";status()});
else{offlineMessage="Для установки нужен браузер с поддержкой PWA";status()}
}
})();
