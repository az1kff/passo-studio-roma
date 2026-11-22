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
function home(){
const active=saved.session, count=saved.days[today()]||0;
return `<div class="topline"><h1>Привет, София!</h1><span class="dateline">${new Intl.DateTimeFormat("ru",{weekday:"long",day:"numeric",month:"long"}).format(new Date())}</span></div>
<div class="dashboard"><section class="hero"><div class="track" aria-hidden="true">${Array.from({length:9},(_,i)=>`<i style="--n:${i}"></i>`).join("")}</div><span class="pill" lang="it">Scienze motorie</span><h2>${active?"Продолжим?":"Разминка дня"}</h2><p>${active?`${esc(active.title)}. Следующий шаг ждёт тебя здесь.`:"Пять вопросов на итальянском из трёх блоков. После каждого — разбор на русском."}</p>${active?link("play","Продолжить занятие"):button("daily","Начать разминку","btn")}</section>
<section class="panel"><h2>Твоя неделя</h2><p class="sub">Сегодня решено вопросов: <b>${count}</b>. Цель на день — 5.</p>${meter(Math.min(count,5),5)}<div class="week">${week()}</div></section></div>
<div class="sectiontitle"><h2>Учебные блоки</h2>${link("course","Все темы","textlink")}</div><div class="tiles">${groups.map((_,i)=>tile(i)).join("")}</div>
<div class="extras">${link("exam",`<span><b>Пробный экзамен</b><small>60 вопросов за 60 минут</small></span>${svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v5l3 2M9 2h6"/>')}`,"strip")}${link("review",`<span><b>Работа над ошибками</b><small>К повторению: ${errors().length}</small></span>${svg('<path d="M4 11a8 8 0 1 1 2 7M4 5v6h6"/>')}`,"strip")}</div>`
}
function course(g){
const subset=Number.isInteger(g)?[g]:[0,1,2];
return heading(Number.isInteger(g)?groups[g]:"Учебные темы","Выбери тему, прочитай короткий конспект и проверь себя.")+subset.map(i=>wrap(`<div class="spread"><h2 lang="it">${captions[i]}</h2>${icon(i)}</div><div class="rows">${lessons.filter(l=>l.group===i).map(l=>`<a href="#lesson/${l.id}" class="row"><span><b>${l.name}</b><small lang="it">${l.it}</small></span><span>${known(l)} / ${l.questions.length} верно</span></a>`).join("")}</div>`)).join("")
}
function lesson(l){return wrap(`${back("group/"+l.group,groups[l.group])}<h1>${l.name}</h1><p lang="it" class="sub">${l.it}</p><p>${l.rule}</p><div class="example"><b>Разберём на примере</b><p>${l.example}</p></div><div class="word"><em lang="it">${l.word}</em> — ${l.translation}</div>${button("lesson:"+l.id,"Перейти к практике")}<h2>Почитать подробнее</h2><div class="rows">${l.refs.map(bk).join("")}</div>`)}
function library(){return heading("Бесплатная библиотека","Книги и материалы открываются на сайтах авторов и университетов. Для перехода понадобится интернет.")+[["Логика и эрудиция",["logic","orient","civic"]],["Биомедицина",["bio","anat","muscle"]],["Естественные науки",["math","physics","chem"]],["Условия пробника",["test"]]].map(([name,ids])=>wrap(`<h2>${name}</h2><div class="rows">${ids.map(bk).join("")}</div>`)).join("")}
function progress(){return heading("Твой прогресс","Результаты сохраняются в этом браузере на этом устройстве.")+wrap(`<h2>Освоенные вопросы</h2><p class="sub">Считаем вопросы, на которые ты в последний раз ответила верно.</p>${groups.map((g,i)=>{const ls=lessons.filter(l=>l.group===i);const n=ls.reduce((s,l)=>s+known(l),0),m=ls.reduce((s,l)=>s+l.questions.length,0);return `<div><div class="spread"><b>${g}</b><span>${n} / ${m}</span></div>${meter(n,m)}</div>`}).join("")}${link("review",`Повторить ошибки (${errors().length})`,"textlink")}`)+wrap(`<h2>Недавние занятия</h2>${saved.history.length?saved.history.slice(0,12).map(h=>`<a class="row" href="#result/${h.id}"><span><b>${esc(h.title)}</b><small>${new Date(h.at).toLocaleDateString("ru")}</small></span><b>${h.score} / ${h.items.length}</b></a>`).join(""):'<p>Здесь появятся результаты после первого занятия.</p>'+link("home","К разминке")}`)}
function exam(){return wrap(`<span class="pill">Tor Vergata · Scienze motorie</span><h1>Пробный экзамен</h1><p>60 минут на 60 вопросов. За верный ответ — 1 балл, за ошибку или пропуск — 0. Разбор откроется после завершения.</p><div class="rows">${[30,20,10].map((n,i)=>`<div class="row"><b>${groups[i]}</b><span>${n} вопросов</span></div>`).join("")}</div><p class="sub">Авторская тренировка по структуре bando 2026/27. Для поступления в 2027/28 сверь формат с новым bando. Для Fisioterapia действует отдельный конкурс.</p>${button("exam","Начать пробник")} ${bk("test")}`)}
function review(){const qs=errors();return wrap(`<h1>Работа над ошибками</h1><p>${qs.length?`К повторению ${qs.length}. Разберём за одно занятие до десяти вопросов. Верный ответ уберёт вопрос из этого списка.`:"Здесь будут вопросы, вызвавшие трудности. После первой ошибки можно вернуться к ней и попробовать ещё раз."}</p>${qs.length?button("errors","Начать повторение"):link("course","Выбрать тему")}`)}
function go(route){if(location.hash.slice(1)===route)render();else location.hash=route}
function start(type,id){
if(saved.session && !confirm("Начать новое занятие и завершить текущее? Его результат сохранится, оставшиеся вопросы будут пропущены."))return;
if(saved.session)finish(false);
let qs,title;
if(type==="exam"){qs=shuffle([30,20,10].flatMap((n,i)=>pick(all.filter(q=>q.lesson.group===i),n)));title="Пробный экзамен"}
else if(type==="daily"){qs=shuffle([2,2,1].flatMap((n,i)=>pick(all.filter(q=>q.lesson.group===i),n)));title="Разминка дня"}
else if(type==="errors"){qs=pick(errors(),10);title="Работа над ошибками"}
else{const l=lessonById.get(id);qs=shuffle(l.questions);title=l.name}
if(!qs.length){go("review");return}
saved.session={id:crypto.randomUUID?.()||String(Date.now()),type,title,at:Date.now(),end:type==="exam"?Date.now()+3600000:null,index:0,items:qs.map(q=>({q:q.id,order:shuffle([0,1,2,3]),a:null,locked:false}))};persist();go("play")
}
function record(item){const q=item.q,stat=saved.stats[q]||{count:0};stat.count++;stat.last=item.a===0;saved.stats[q]=stat;if(item.a!==null)saved.days[today()]=(saved.days[today()]||0)+1}
function finish(navigate=true){
const s=saved.session;if(!s)return;
for(const it of s.items){if(!it.locked){if(s.type==="exam")record(it);else it.a=null;it.locked=true}}
s.score=s.items.filter(it=>it.a===0).length;saved.history.unshift(s);saved.history=saved.history.slice(0,24);saved.session=null;persist();if(navigate)go("result/"+s.id)
}
function clockText(s){const t=Math.max(0,Math.ceil((s.end-Date.now())/1000));return `${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}
function play(){
const s=saved.session;if(!s)return wrap(`<h1>Начнём занятие?</h1>${link("home","К разминке")}`);
const it=s.items[s.index],q=questions.get(it.q),e=s.type==="exam";
return wrap(`<div class="spread"><b>${s.title}</b><span class="timer">${e?clockText(s):"Практика"}</span></div>${meter(s.index,s.items.length)}<small>${groups[q.lesson.group]} · Вопрос ${s.index+1} из ${s.items.length}</small><h1 lang="it">${q.ask}</h1><div class="choices">${it.order.map((v,i)=>`<button class="choice ${it.a===v?"selected":""} ${it.locked&&v===0?"good":""} ${it.locked&&it.a===v&&v!==0?"bad":""}" data-act="select:${v}" aria-pressed="${it.a===v}" ${it.locked?"disabled":""}><span class="letter">${"ABCD"[i]}</span><span lang="it">${esc(q.choices[v])}</span></button>`).join("")}</div>${it.locked?`<div class="feedback ${it.a===0?"good":"bad"}" role="status"><b>${it.a===0?"Верно!":"Верный ответ: "+esc(q.choices[0])}</b><p>${q.why}</p></div>`:""}
<div class="actions">${e?`${s.index?button("prev","Назад","plain"):""}${button("next",s.index===s.items.length-1?"Завершить пробник":it.a===null?"Пропустить":"Дальше")}${it.a!==null?button("clear","Снять выбор","plain"):""}`:it.locked?button("next",s.index===s.items.length-1?"Посмотреть результат":"Следующий вопрос"):`<button class="action" data-act="check" ${it.a===null?"disabled":""}>Проверить</button>`}</div>${back("home","Сохранить и выйти")}${e?'<small>Таймер продолжит отсчёт после выхода.</small>':""}`)
}
function result(id){
const s=saved.history.find(h=>h.id===id);if(!s)return progress();
return wrap(`<p class="sub">${esc(s.title)}</p><h1>Результат занятия</h1><div class="score">${s.score} / ${s.items.length}</div><p>Верных ответов — ${s.score}, ошибок — ${s.items.filter(i=>i.a!==null&&i.a!==0).length}, пропусков — ${s.items.filter(i=>i.a===null).length}.</p><div class="actions">${link("review","Работа над ошибками","btn secondary")}${link("home","На главную")}</div><h2>Разбор вопросов</h2>${s.items.map((it,i)=>{const q=questions.get(it.q);return `<details class="review"><summary>${i+1}. ${it.a===0?"Верно":it.a===null?"Пропуск":"Ошибка"} · <span lang="it">${q.ask}</span></summary><p>Твой ответ — ${it.a===null?"пропуск":esc(q.choices[it.a])}.</p><p><b>Верный ответ</b> · <span lang="it">${q.choices[0]}</span></p><p>${q.why}</p>${link("lesson/"+q.lesson.id,"Повторить тему","textlink")}</details>`}).join("")}`)
}
function render(focus=true){
if(saved.session?.end && Date.now()>=saved.session.end){finish();return}
const [r,id]=(location.hash.slice(1)||"home").split("/");
const l=lessonById.get(id),route={course:()=>course(),group:()=>["0","1","2"].includes(id)?course(+id):course(),lesson:()=>l?lesson(l):course(),library,progress,play,exam,review,result:()=>result(id)};
main.innerHTML=(route[r]||home)();
document.querySelectorAll("nav a").forEach(a=>{if(a.hash==="#"+({group:"course",lesson:"course",play:"home",exam:"home",review:"progress",result:"progress"}[r]||r))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
if(focus){main.focus({preventScroll:true});window.scrollTo(0,0)}
}
main.addEventListener("click",ev=>{
const b=ev.target.closest("[data-act]");if(!b)return;
const [action,arg]=b.dataset.act.split(":");
const s=saved.session;if(s?.end&&Date.now()>=s.end){finish();return}
if(["exam","daily","lesson","errors"].includes(action)){start(action,arg);return}
if(!s)return;const it=s.items[s.index];
if(action==="select"&&!it.locked){it.a=Number(arg);persist();render(false);main.querySelector(`[data-act="select:${arg}"]`)?.focus({preventScroll:true});return}
if(action==="clear")it.a=null;
if(action==="check"&&it.a!==null&&!it.locked){record(it);it.locked=true}
if(action==="prev"&&s.index>0)s.index--;
if(action==="next"){if(s.index===s.items.length-1){if(s.type==="exam"&&!confirm("Завершить пробник и открыть разбор ответов?"))return;finish();return}s.index++}
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
