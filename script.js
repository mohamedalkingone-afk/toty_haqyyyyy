/* ================= عدّل من هنا ================= */
  const SECRET_WORD = "لولتي";

  const INTRO_TEXT = "في حد بيحبك أوي... 💕";

  // type: big = سطر كبير وملوّن
  const LINES = [
    { t: "بحبك ❤", type: "big" },
    { t: "إنتي أحلى حاجة حصلتلي في الدنيا." },
    { t: "ضحكتك بتنوّر يومي كله، وصوتك بيهدّيني أكتر من أي حاجة." },
    { t: "معاكي بحس إن الدنيا أبسط وأجمل، وإن كل حاجة هتبقى كويسة." },
    { t: "مش بقول كتير، بس كل يوم بحبك أكتر من اليوم اللي قبله. 💖" },
    { t: "ربنا يخليكي ليا ويخلّيني ليكي، ونفضل مع بعض دايمًا. 🌷" },
    { t: "إنتي حبيبتي وكانزايتي وعيوني و حياتي وصاحبتي وكل حاجة بحيها. ❤", type: "big" }
  ];
  /* =============================================== */

  const $ = id => document.getElementById(id);
  const FLOWERS = ["🌹","🌸","🌷","💐","🌺","🌼"];
  const PETALS  = ["🌸","🌹","💮","🏵️","🌺"];

  // تجاهل التشكيل والمسافات و ة/ه علشان الكتابة تتقبل بسهولة
  const norm = s => s.replace(/[\u064B-\u065F\u0640\s]/g,"")
                     .replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").toLowerCase();

  /* ---------- أنيميشن البداية ---------- */
  function typeIntro(){
    const el = $("typed"); let i = 0;
    const t = setInterval(()=>{
      el.textContent = INTRO_TEXT.slice(0, ++i);
      if(i >= INTRO_TEXT.length){ clearInterval(t); setTimeout(endIntro, 1200); }
    }, 90);
    // ورد بيتفتح خلال البداية
    for(let i=0;i<10;i++) setTimeout(plantFlower, i*180);
  }
  function endIntro(){
    $("intro").classList.add("done");
    $("card").classList.add("show");
    for(let i=0;i<14;i++) setTimeout(plantFlower, i*120);
    $("word").focus({preventScroll:true});
  }


  /* ---------- مشغّل الأغنية ---------- */
const song = $("song"), player = $("player");
const fmt = s => { s = Math.floor(s || 0); return Math.floor(s/60) + ":" + String(s % 60).padStart(2,"0"); };

function syncPlayer(){
  player.classList.toggle("playing", !song.paused);
  $("playBtn").textContent = song.paused ? "▶" : "⏸";
}
song.addEventListener("play", syncPlayer);
song.addEventListener("pause", syncPlayer);
song.addEventListener("loadedmetadata", () => { $("tDur").textContent = fmt(song.duration); });
song.addEventListener("timeupdate", () => {
  $("tCur").textContent = fmt(song.currentTime);
  $("fill").style.width = (song.duration ? song.currentTime/song.duration*100 : 0) + "%";
});
$("playBtn").addEventListener("click", () => { song.paused ? song.play().catch(()=>{}) : song.pause(); });
$("bar").addEventListener("click", e => {
  if(!song.duration) return;
  const r = e.currentTarget.getBoundingClientRect();
  song.currentTime = (e.clientX - r.left) / r.width * song.duration;
});
function startSong(){ player.classList.add("show"); song.play().catch(()=>{}); }
  /* ---------- الورد ---------- */
  function plantFlower(){
    const g = $("garden");
    const f = document.createElement("div");
    f.className = "flower" + (Math.random()>.4 ? " sway" : "");
    f.textContent = FLOWERS[Math.floor(Math.random()*FLOWERS.length)];
    f.style.left = (Math.random()*96) + "vw";
    f.style.fontSize = (34 + Math.random()*34) + "px";
    f.style.animationDelay = (Math.random()*.3) + "s";
    g.appendChild(f);
    if(g.children.length > 46) g.firstChild.remove();
  }
  function petal(){
    const p = document.createElement("div");
    p.className = "fall";
    p.textContent = PETALS[Math.floor(Math.random()*PETALS.length)];
    p.style.left = Math.random()*100 + "vw";
    p.style.fontSize = (14 + Math.random()*18) + "px";
    p.style.setProperty("--dx", (Math.random()*120-60) + "px");
    p.style.animationDuration = (6 + Math.random()*5) + "s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 11000);
  }
  function floatHeart(){
    const h = document.createElement("div");
    h.className = "rise";
    h.textContent = ["♥","❤","💕"][Math.floor(Math.random()*3)];
    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = (16 + Math.random()*24) + "px";
    h.style.animationDuration = (5 + Math.random()*5) + "s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(), 10000);
  }
  setInterval(petal, 700);
  setInterval(floatHeart, 900);

  /* ---------- فتح الرسالة ---------- */
  function showLines(){
    const box = $("lines"); box.innerHTML = "";
    $("next").style.display = "none"; $("happyBtn").style.display = "none";
    LINES.forEach((l,i)=>{
      const p = document.createElement("p");
      p.textContent = l.t;
      if(l.type === "big") p.className = "big";
      p.style.animationDelay = (i*1.4 + .3) + "s";
      box.appendChild(p);
    });
    setTimeout(()=>{ $("next").style.display = "block"; $("happyBtn").style.display = "block"; }, LINES.length*1400 + 600);
  }

  function tryUnlock(){
    if(norm($("word").value) === norm(SECRET_WORD)){
      startSong();
      $("lock").classList.add("hide");
      $("secret").style.display = "block";
      showLines();
      for(let i=0;i<30;i++){ setTimeout(plantFlower, i*90); setTimeout(petal, i*70); setTimeout(floatHeart, i*110); }
    }else{
      $("err").textContent = "مش دي الكلمةياتوتي تاني";
      const c = $("card");
      c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake");
    }
  }

  $("unlock").addEventListener("click", tryUnlock);
  $("word").addEventListener("keydown", e => { if(e.key === "Enter") tryUnlock(); });
  /* ---------- العدّاد ---------- */
  // 19 أكتوبر 2026 الساعة 11:49 مساءً بتوقيت القاهرة
  const START = new Date("2026-10-19T23:49:00+03:00");
  function tick(){
    let s = Math.floor((Date.now() - START.getTime())/1000);
    if(s < 0) s = 0;
    const totalDays = Math.floor(s/86400);
    $("cY").textContent = Math.floor(totalDays/365);
    $("cD").textContent = totalDays % 365;
    $("cH").textContent = Math.floor(s/3600) % 24;
    $("cM").textContent = Math.floor(s/60) % 60;
    $("cS").textContent = s % 60;
  }
  setInterval(tick, 1000); tick();

/* ---------- مربعات الذكريات (Supabase) ---------- */
const SUPABASE_URL = "https://itxytoyfqspahfwfkagc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EFIjZ3xLMdhf-o4-Rq1J1w_OxDLJqgP";
const BUCKET = "memory-photos";
const cloud = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let tiles = [];
let busy = 0;
const capTimers = {};
const emptyTile = () => ({id:null, path:"", img:"", cap:""});
const urlOf = p => cloud.storage.from(BUCKET).getPublicUrl(p).data.publicUrl;
const setStatus = m => { $("cloudStatus").textContent = m; };

function shrink(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("الملف ليس صورة صالحة"));
      image.onload = () => {
        const max = 900, k = Math.min(1, max/Math.max(image.width,image.height));
        const c = document.createElement("canvas");
        c.width = Math.round(image.width*k); c.height = Math.round(image.height*k);
        c.getContext("2d").drawImage(image,0,0,c.width,c.height);
        resolve(c.toDataURL("image/jpeg",.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function pickImage(tile, file){
  busy++; setStatus("جاري رفع الصورة...");
  try{
    const blob = await (await fetch(await shrink(file))).blob();
    const path = crypto.randomUUID() + ".jpg";
    let r = await cloud.storage.from(BUCKET).upload(path, blob, {contentType:"image/jpeg"});
    if(r.error) throw r.error;
    const oldPath = tile.path, id = tile.id || crypto.randomUUID();
    r = await cloud.from("memories").upsert({id, image_path:path, caption:tile.cap||""});
    if(r.error) throw r.error;
    Object.assign(tile, {id, path, img:urlOf(path)});
    if(oldPath) await cloud.storage.from(BUCKET).remove([oldPath]);
    setStatus("اتحفظت ✅ وهتظهر عند الشخص الي بتحبو");
  }catch(e){ setStatus("تاني ياتوتي: " + e.message); }
  finally{ busy--; renderGrid(); }
}

function saveCaption(tile){
  if(!tile.id) return;
  clearTimeout(capTimers[tile.id]);
  capTimers[tile.id] = setTimeout(async()=>{
    const {error} = await cloud.from("memories").update({caption:tile.cap}).eq("id",tile.id);
    if(error) setStatus("تاني ياتوتي: " + error.message);
  }, 700);
}

async function removeTile(i){
  const t = tiles[i];
  if(!confirm("تمسحي الصورة دي؟")) return;
  busy++;
  try{
    if(t.id){
      const {error} = await cloud.from("memories").delete().eq("id",t.id);
      if(error) throw error;
    }
    if(t.path) await cloud.storage.from(BUCKET).remove([t.path]);
    tiles[i] = emptyTile();
  }catch(e){ setStatus("تاني ياتوتي: " + e.message); }
  finally{ busy--; renderGrid(); }
}

function renderGrid(){
  const grid = $("grid"); grid.innerHTML = "";
  tiles.forEach((tile,i)=>{
    const item = document.createElement("div");
    item.className = "tile" + (tile.img ? " filled" : "");
    if(tile.img) item.style.backgroundImage = `url("${tile.img}")`;

    const plus = document.createElement("span"); plus.className = "plus"; plus.textContent = "＋";

    const file = document.createElement("input");
    file.type = "file"; file.accept = "image/*"; file.style.display = "none";
    file.addEventListener("change", () => { if(file.files[0]) pickImage(tile, file.files[0]); });
    file.addEventListener("click", e => e.stopPropagation());

    const cap = document.createElement("input");
    cap.className = "cap"; cap.type = "text"; cap.placeholder = "اكتبي ذكرى..."; cap.value = tile.cap || "";
    cap.addEventListener("click", e => e.stopPropagation());
    cap.addEventListener("input", () => { tile.cap = cap.value; saveCaption(tile); });

    const x = document.createElement("button");
    x.className = "x"; x.type = "button"; x.textContent = "✕";
    x.addEventListener("click", e => { e.stopPropagation(); removeTile(i); });

    item.addEventListener("click", () => file.click());
    item.append(plus, file, cap, x);
    grid.appendChild(item);
  });
}

const sig = list => JSON.stringify(list.map(t => [t.id, t.path, t.cap]));

async function loadMemories(first){
  const {data, error} = await cloud.from("memories")
    .select("id,image_path,caption,created_at").order("created_at");
  if(error){
    if(first){ tiles = Array.from({length:9}, emptyTile); renderGrid(); }
    setStatus("تعذر تحميل الصور. راجع إعدادات Supabase.");
    return;
  }
  const real = data.map(r => ({id:r.id, path:r.image_path, img:urlOf(r.image_path), cap:r.caption||""}));
  if(!first && sig(real) === sig(tiles.filter(t => t.id))) return;
  const empties = first ? 0 : tiles.filter(t => !t.id).length;
  tiles = [...real, ...Array.from({length:Math.max(0, 9 - real.length, empties)}, emptyTile)];
  renderGrid();
  if(first) setStatus("دوسي على أي مربع وحطي صورة، وهتتحفظ لوحدها ");
}

$("addTile").addEventListener("click", () => { tiles.push(emptyTile()); renderGrid(); });

loadMemories(true);
setInterval(() => {
  const a = document.activeElement;
  if(busy || (a && a.classList && a.classList.contains("cap"))) return;
  loadMemories(false);
}, 15000);

  /* ---------- Happy Message ---------- */
  const HAPPY_LINES = [
    { t: "Happy End of October 🍂", cls: "big autumn en-line" },
    { t: "أكتوبر بيودّعنا النهارده، وهيفضل أحلى شهر في السنة عندي، لأن فيه بدأت حكايتنا. 🧡" },
    { t: "في أكتوبر قلتلك بحبك، وفي أكتوبر قلتيلي بحبك… وبقى عندي أحلى ذكرى في الدنيا." },
    { t: "And Happy First Winter ❄️", cls: "big winter en-line" },
    { t: "الشتا داخل علينا أول مرة مع بعض، وأنا مستني أمسك إيدك وأدفّيكي لما تبردي. 🧣" },
    { t: "كوباية شاي سخنة، ومطرة حلوة، وأنا وإنتي… دي كل أمنيتي. ☕🌧️" },
    { t: "ودّعنا الخريف بحبّك، وهنستقبل الشتا بحبّك أكتر. 💖" },
    { t: "كل سنة وإنتي حبيبتي، ونفضل مع بعض في كل الفصول ❤", cls: "big love" }
  ];
  const FLAKES = ["❄️","🍂","🍁","❄","🍂"];
  let currentView = "lines";
  function flake(){
    const f = document.createElement("div");
    f.className = "fall";
    f.textContent = FLAKES[Math.floor(Math.random()*FLAKES.length)];
    f.style.left = Math.random()*100 + "vw";
    f.style.fontSize = (14 + Math.random()*20) + "px";
    f.style.setProperty("--dx", (Math.random()*160-80) + "px");
    f.style.animationDuration = (7 + Math.random()*5) + "s";
    document.body.appendChild(f);
    setTimeout(()=>f.remove(), 12000);
  }
  setInterval(() => { if(currentView === "happy") flake(); }, 350);

  function showHappy(){
    const box = $("hLines"); box.innerHTML = "";
    HAPPY_LINES.forEach((l,i)=>{
      const p = document.createElement("p");
      p.textContent = l.t;
      if(l.cls) p.className = l.cls;
      p.style.animationDelay = (i*1.3 + .3) + "s";
      box.appendChild(p);
    });
    for(let i=0;i<30;i++) setTimeout(flake, i*100);
    for(let i=0;i<10;i++) setTimeout(plantFlower, i*120);
  }

  function show(view){
    currentView = view;
    $("happy").style.display    = view === "happy" ? "block" : "none";
    $("secret").style.display   = view === "lines" ? "block" : "none";
    $("memories").style.display = view === "mem"   ? "block" : "none";
    $("card").classList.toggle("wide", view === "mem");
    $("card").scrollTop = 0;
  }
  $("next").addEventListener("click", () => {
    show("mem");
    for(let i=0;i<20;i++){ setTimeout(plantFlower, i*90); setTimeout(petal, i*80); }
  });
  $("back").addEventListener("click", () => show("lines"));
  $("happyBtn").addEventListener("click", () => { show("happy"); showHappy(); });
  $("hBack").addEventListener("click", () => show("lines"));

  window.addEventListener("load", typeIntro);
