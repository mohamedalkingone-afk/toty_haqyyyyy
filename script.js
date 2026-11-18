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
const cloud = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

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

    const chg = document.createElement("button");
    chg.className = "chg"; chg.type = "button"; chg.textContent = "✎"; chg.title = "تغيير الصورة";
    chg.addEventListener("click", e => { e.stopPropagation(); file.click(); });

    const x = document.createElement("button");
    x.className = "x"; x.type = "button"; x.textContent = "✕";
    x.addEventListener("click", e => { e.stopPropagation(); removeTile(i); });

    item.addEventListener("click", () => { tile.img ? openLightbox(tile) : file.click(); });
    item.append(plus, file, cap, chg, x);
    grid.appendChild(item);
  });
}

function openLightbox(tile){
  $("lbImg").src = tile.img;
  $("lbCap").textContent = tile.cap || "";
  $("lightbox").classList.add("open");
}
function closeLightbox(){ $("lightbox").classList.remove("open"); $("lbImg").removeAttribute("src"); }
$("lightbox").addEventListener("click", e => { if(e.target.id !== "lbImg") closeLightbox(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });

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

if(cloud){
  loadMemories(true);
  setInterval(() => {
    const a = document.activeElement;
    if(busy || (a && a.classList && a.classList.contains("cap"))) return;
    loadMemories(false);
  }, 15000);
}else{
  tiles = Array.from({length:9}, emptyTile); renderGrid();
  setStatus("تعذر الاتصال بـ Supabase. اتأكدي من النت وحدّثي الصفحة.");
}

  /* ---------- رسالة الصلح ---------- */
  const HAPPY_LETTERS = [
    { label: "أول حاجة",
      lines: [
        "أنا آسف.",
        "مش عشان الموضوع يعدّي، ولا عشان نقفل الكلام. أنا آسف عشان زعلك وجعني أكتر مما تتخيلي.",
        "وأي كلمة قلتها وجعتك، وأي لحظة حسّيتي فيها إني بعيد عنك، أنا شايل مسؤوليتها بالكامل."
      ] },
    { label: "عن الخناقة",
      lines: [
        "عارف إن الخناقة كانت كبيرة، ومش هقلل منها ومش هقولك خلاص انسي.",
        "خدي وقتك كله، وأنا مستنيكي. مش مستعجل عليكي ولا ضاغط عليكي.",
        "بس عايزك تعرفي إن قلبي مش مرتاح وإنتي زعلانة مني."
      ] },
    { label: "اللي جوايا ليكي",
      lines: [
        "أنا بحبك.",
        "وده مش كلام بيتقال وقت الصلح وبس. الحب ده أكبر من أي خناقة، حتى لو كانت أكبر من كده.",
        "لسه بحبك زي أول يوم قلتلك فيه بحبك، وأكتر."
      ] },
    { label: "وعدي",
      lines: [
        "أنا وعدتك، وأنا قد وعدي.",
        "مش هسيبك، ومش هسيب إيدك مهما حصل ومهما اتغيرت الظروف.",
        "لو الطريق وِحش في يوم، هنمشيه سوا بالراحة. أنا مش هتعب منك، ولا من حبك."
      ] },
    { label: "إنتي الأول والأخير",
      lines: [
        "إنتي حبي الأول، وهتفضلي حبي الأخير.",
        "مفيش حد قبلك كان ليه مكان زي مكانك، ومفيش حد بعدك هيبقى ليه مكان.",
        "اللي بيني وبينك أغلى عندي من إني أخسره، وعمري ما هفرّط فيه."
      ] }
  ];
  const HAPPY_FINALE = [
    "لو قلبك فتحلي ولو شوية، أنا هنا.",
    "ولو محتاجة وقت، أنا برضه هنا.",
    "وفي الحالتين، بحبك، وهفضل أحبك."
  ];
  const AR_NUM = ["الأولى","التانية","التالتة","الرابعة","الخامسة"];
  const LINE_GAP = 1.5;      // الفرق بين كل سطر والتاني بالثواني
  let currentView = "lines";

  function softDot(){
    const d = document.createElement("div");
    const s = 8 + Math.random()*22;
    d.className = "soft";
    d.style.left = Math.random()*100 + "vw";
    d.style.setProperty("--s", s + "px");
    d.style.setProperty("--dx", (Math.random()*100-50) + "px");
    d.style.animationDuration = (11 + Math.random()*7) + "s";
    document.body.appendChild(d);
    setTimeout(()=>d.remove(), 19000);
  }
  setInterval(() => { if(currentView === "happy") softDot(); }, 800);

  function fillLines(target, lines, startDelay){
    lines.forEach((t,i)=>{
      const p = document.createElement("p");
      p.textContent = t;
      p.style.animationDelay = (startDelay + i*LINE_GAP) + "s";
      target.appendChild(p);
    });
    return startDelay + lines.length*LINE_GAP;
  }

  function buildLetters(box, letters, finaleLines){
    box.innerHTML = "";
    const envs = [];
    const status = (env, txt) => { env.querySelector("small").textContent = txt; };

    const finale = document.createElement("div");
    finale.className = "finale";
    finale.innerHTML = '<svg class="fheart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><div class="fbody"></div>';

    letters.forEach((L,i)=>{
      const env = document.createElement("div");
      env.className = "env" + (i ? " locked" : "");
      env.innerHTML =
        '<button type="button" class="env-btn">' +
          '<span class="env-art"><span class="flap"></span><span class="seal"></span></span>' +
          '<span class="env-label"><small></small><b></b></span>' +
        '</button>' +
        '<div class="paper"><div class="paper-in"><div class="paper-body"></div></div></div>';
      env.querySelector("b").textContent = L.label;
      status(env, i ? "بعد اللي قبلها" : "اضغطي وافتحي الرسالة " + AR_NUM[i]);
      envs.push(env);
      box.appendChild(env);

      env.querySelector(".env-btn").addEventListener("click", () => {
        if(env.classList.contains("locked") || env.classList.contains("open")) return;
        env.classList.add("open");
        status(env, "اقري على مهلك");
        setTimeout(() => {
          env.classList.add("show-paper");
          const end = fillLines(env.querySelector(".paper-body"), L.lines, 0.9);
          setTimeout(() => env.scrollIntoView({behavior:"smooth", block:"start"}), 500);
          setTimeout(() => {
            status(env, "اتفتحت");
            const next = envs[i+1];
            if(next){
              next.classList.remove("locked");
              status(next, "اضغطي وافتحي الرسالة " + AR_NUM[i+1]);
              next.scrollIntoView({behavior:"smooth", block:"center"});
            }else{
              finale.classList.add("show");
              fillLines(finale.querySelector(".fbody"), finaleLines, 1.6);
              setTimeout(() => finale.scrollIntoView({behavior:"smooth", block:"center"}), 600);
            }
          }, (end + 1.2) * 1000);
        }, 1100);
      });
    });
    box.appendChild(finale);
  }

  /* ---------- الرسالة اللي قبلها: أول خناقة ---------- */
  const FIRST_LETTERS = [
    { label: "أول خناقة",
      lines: [
        "دي كانت أول خناقة بينا.",
        "ومن أول ما حصلت وأنا حاسس إن حاجة غالية وقعت من مكانها، وإن اللي بينا أكبر من إنه يتهز."
      ] },
    { label: "الساعة 1:19 بالليل",
      lines: [
        "في الساعة واحدة وتسعتاشر دقيقة بالليل سيبنا بعض.",
        "الليل كان طويل أوي، ومعدّاش عليا ولا لحظة من غير ما أفكر فيكي.",
        "كل ما أحاول أنام، كان بيرجعلي صوتك وضحكتك، وأفتكر إني مش عايز أبعد عنك."
      ] },
    { label: "الساعة 5:20 ",
      lines: [
        "ورجعنا لبعض،.",
        "حوالي ستاشر ساعة بس، بس حسيتها أطول من كده بكتير.",
        "ومن أول ما رجعنا، الدنيا رجعت لمكانها."
      ] },
    { label: "اللي اتعلمته",
      lines: [
        "اتعلمت إن ساعات بعدك عني بتتقل أكتر من أي حاجة.",
        "وإن أحلى جزء في أي خلاف هو لحظة الرجوع لبعض ."
      ] }
  ];
  const FIRST_FINALE = [
    "أول خناقة عدّت، ورجعنا.",
    "وأنا واثق إن حبنا قادر يرجّعنا دايمًا.",
    "ومش عايز نبعد تاني، حتى لو اختلفنا ولازم نفهم بعض ."
  ];

  function showHappy(){
    buildLetters($("hLines"),  HAPPY_LETTERS, HAPPY_FINALE);
    buildLetters($("hLines2"), FIRST_LETTERS, FIRST_FINALE);
    setTab("first");
    for(let i=0;i<8;i++) setTimeout(softDot, i*450);
  }
  function setTab(which){
    document.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.tab === which));
    $("paneFirst").style.display = which === "first" ? "block" : "none";
    $("paneSulh").style.display  = which === "sulh"  ? "block" : "none";
    $("card").scrollTop = 0;
  }
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

  function show(view){
    currentView = view;
    document.body.classList.toggle("calm", view === "happy");
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

/* ===== Happy Message 11/11 =====
   الصق الكود ده كله في آخر ملف script.js، ومفيش أي حاجة تانية تتعدل. */
(function(){
  const LETTERS = [
    { label: "واحد وواحد",
      lines: [
        "الرقم واحد جنب الرقم واحد زي إحنا بالظبط.",
         "ومن غيرك أنا مجرد واحد وحيد، ومعاكي بقيت كامل."
      ] },
    { label: "أمنية",
      lines: [
        "بيقولوا إن 11/11 يوم الأمنيات.",
        "وأنا مش هتمنى كتير. هتمنى بس إنك تفضلي جنبي، وإن قلبك يرتاح، وإن أي زعل بينا يعدّي ويسيبنا أقرب من الأول.",
        "وأمنيتي دي، يا رب، تبقى أول حاجة تتحقق."
      ] },
    { label: "من أول الحكاية",
      lines: [
        "من يوم ما بدأت حكايتنا والدنيا بقت اجمل وأحلى في عيني.",
        "مفيش يوم عدّى من غير ما أحمد ربنا إنك في حياتي، وإنك اخترتيني."
      ] },
    { label: "وعد جديد",
      lines: [
        "أوعدك إني أفضل أسمعك، وأفضل أختارك في كل مرة.",
        "وعدي ليكي مش بيتغير بتغيّر اليوم ولا الظروف، وأنا قد وعدي."
      ] }
  ];
  const FINALE = [
    "اليوم ده مش هيعدّي عادي.",
    "هيفضل عندي اليوم اللي قلتلك فيه بحبك من جديد.",
    "بحبك النهارده، وبكرة، وكل يوم يا اجمل توتي في حياتي ."
  ];

  const g = id => document.getElementById(id);
  if(window.__e1111) return; window.__e1111 = 1;   // علشان ميتضافش مرتين

  /* --- الستايل --- */
  const st = document.createElement("style");
  st.textContent = `
    .tabs .tab{font-size:15px;line-height:1.35;padding:9px 4px}
    #paneEleven{display:none}
    .elv{display:flex;align-items:center;justify-content:center;gap:14px;margin:4px 0 2px;direction:ltr}
    .elv-n{font-size:64px;font-weight:700;line-height:1;color:var(--accent);
      font-family:"Playfair Display",serif;font-style:italic;opacity:0;
      text-shadow:0 8px 24px rgba(230,62,120,.35)}
    .elv-r{animation:elvR 2.4s ease .3s forwards, elvGlow 5s ease-in-out 2.7s infinite}
    .elv-l{animation:elvL 2.4s ease .3s forwards, elvGlow 5s ease-in-out 2.7s infinite}
    @keyframes elvR{from{opacity:0;transform:translateX(-46px)}to{opacity:1;transform:none}}
    @keyframes elvL{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:none}}
    @keyframes elvGlow{0%,100%{text-shadow:0 8px 24px rgba(230,62,120,.3)}50%{text-shadow:0 8px 38px rgba(230,62,120,.65)}}
    .elv-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);opacity:0;
      animation:elvDot 1.6s ease 2.4s forwards, breathe 5s ease-in-out 4s infinite}
    @keyframes elvDot{to{opacity:.8}}
  `;
  document.head.appendChild(st);

  /* --- التاب الجديد والصفحة بتاعته (لو مش موجودين في الـ HTML) --- */
  if(!g("paneEleven")){
  const tab = document.createElement("button");
  tab.type = "button"; tab.className = "tab"; tab.dataset.tab = "eleven";
  tab.setAttribute("role","tab"); tab.textContent = "Happy Message 11/11";
  document.querySelector(".tabs").appendChild(tab);
  tab.addEventListener("click", () => setTab("eleven"));

  const pane = document.createElement("div");
  pane.id = "paneEleven";
  pane.innerHTML =
    '<div class="elv" aria-label="11 نوفمبر"><span class="elv-n elv-r">11</span><i class="elv-dot"></i><span class="elv-n elv-l">11</span></div>' +
    '<div class="since hsub">واحد جنب واحد إحنا</div><div id="hLines3"></div>';
  g("paneSulh").after(pane);
  }
  const pane = g("paneEleven");

  /* --- ربطه بباقي الصفحة --- */
  const _showHappy = showHappy;
  showHappy = function(){
    _showHappy();
    buildLetters(g("hLines3"), LETTERS, FINALE);
  };
  const _setTab = setTab;
  setTab = function(which){
    _setTab(which);
    pane.style.display = which === "eleven" ? "block" : "none";
  };
})();
/* =====================================================================
   شهر مع بعض  —  الصق الكود ده كله في آخر ملف script.js وخلاص.
   مفيش أي تعديل تاني في HTML أو CSS.
   ===================================================================== */
(function(){
  if(document.getElementById("monthBtn")) return;   // علشان ميتضافش مرتين

  /* ---------------- حاجات تقدر تعدلها ---------------- */
  const START = new Date("2026-10-19T23:49:00+03:00");   // بداية العدّاد
  const ANNIV = new Date("2026-11-18T23:49:00+02:00");   // أول شهر

  const MEMORIES = [
    { d: "6 أكتوبر",              t: "أول مرة قلتلك بحبك" },
    { d: "19 أكتوبر · 11:49 مساءً", t: "اللحظة اللي ابتدا منها العدّ" },
    { d: "20 أكتوبر",             t: "اعترفتيلي إنك بتحبيني" },
    { d: "أول خناقة",              t: "بعدنا 16 ساعة بس، ورجعنا لبعض  " },
    { d: "11 / 11",               t: " إحنا واحد جنب واحد" },
    { d: "18 نوفمبر",              t: "أول شهر كامل، وأنا لسه بحبك زي أول يوم" }
  ];

  const LETTER = [
    "شهر عدّى، وأنا لسه حاسس إني في أول يوم.",
    "اتعلمت في الشهر ده إن الحب مش بس كلام حلو. الحب إننا نرجع لبعض حتى لو زعلنا، وإننا نختار بعض كل يوم من جديد.",
    "اتخانقنا، ورجعنا. وفي كل مرة كنت بتأكد إن مفيش مكان أهدى من جنبك.",
    "أنا مش بوعدك بشهر كمان أنا بوعدك بالعمر، وأنا قد وعدي.",
    "إنتي حبي الأول والأخير، وكل يوم معاكي بيأكد لي ده أكتر.",
    "كل شهر وإنتي حبيبتي."
  ];

  const WISHES = [
    "أتمنى نفضل مع بعض في كل الايام",
    "أتمنى قلبك يفضل مرتاح جنبي",
    "أتمنى أي خناقة بينا تعدّي وتسيبنا أقرب",
    "أتمنى أمسك إيدك في كل مكان بنحلم بيه",
    "أتمنى أشوف ضحكتك كل يوم",
    "أتمنى العمر كله ييجي جنبك"
  ];
  /* ----------------------------------------------------- */

  const $$ = (s, r) => (r || document).querySelector(s);
  const pad2 = n => String(n).padStart(2, "0");

  /* ---------------- الستايل ---------------- */
  const css = document.createElement("style");
  css.textContent = `
  #monthBtn{display:none;margin-top:12px;font-size:19px;
    background:linear-gradient(135deg,#1d1030,#4a1b46 60%,#a67c1f);box-shadow:0 8px 22px rgba(60,20,70,.45)}
  #happyBtn[style*="block"] ~ #monthBtn{display:block}
  .player{z-index:130}

  #mo{position:fixed;inset:0;z-index:120;display:none;overflow:hidden;color:#fff4f7;
    background:radial-gradient(120% 90% at 50% 0%,#3d1849 0%,#1a0d2e 45%,#09050f 100%);
    opacity:0;transition:opacity 1.4s ease;font-family:"Amiri","Reem Kufi",serif}
  #mo.on{display:block} #mo.vis{opacity:1}
  #moCv{position:absolute;inset:0;width:100%;height:100%}
  #mo button{font-family:inherit}

  .mo-sc{position:absolute;inset:96px 18px 118px;display:flex;overflow:auto;text-align:center;
    opacity:0;visibility:hidden;transform:translateY(18px);
    transition:opacity 1.2s ease,transform 1.2s ease,visibility 1.2s}
  .mo-sc.act{opacity:1;visibility:visible;transform:none}
  .mo-in{margin:auto;width:100%;max-width:420px}

  .mo-h{margin:0 0 10px;font-size:32px;font-weight:700;line-height:1.5;
    background:linear-gradient(90deg,#f7d794,#ffc2d4);-webkit-background-clip:text;background-clip:text;color:transparent}
  .mo-sub{margin:0 0 14px;font-size:19px;line-height:1.9;opacity:.82}

  /* حلقة الشهر */
  .ring{position:relative;width:min(62vw,230px);aspect-ratio:1;margin:0 auto 14px}
  .ring svg{width:100%;height:100%;overflow:visible}
  .ring circle{fill:none;stroke-width:6;stroke-linecap:round}
  .ring .trk{stroke:rgba(255,255,255,.1)}
  .ring .prg{stroke:url(#moG);stroke-dasharray:590.6;stroke-dashoffset:590.6;
    transition:stroke-dashoffset 3.2s cubic-bezier(.3,.7,.2,1);
    filter:drop-shadow(0 0 8px rgba(255,170,200,.8))}
  .ring .rc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .ring .rc b{font:italic 700 92px/1 "Playfair Display",serif;color:#fff2d6;text-shadow:0 0 30px rgba(247,215,148,.7)}
  .ring .rc span{font-size:24px;opacity:.9;margin-top:2px}
  .ring::before{content:"";position:absolute;inset:-26px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,170,200,.22),transparent 65%);animation:moPulse 5s ease-in-out infinite}
  @keyframes moPulse{0%,100%{transform:scale(.94);opacity:.7}50%{transform:scale(1.06);opacity:1}}

  .cd{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:6px auto 0;max-width:340px}
  .cd div{padding:10px 2px;border-radius:16px;background:rgba(255,255,255,.07);
    border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(6px)}
  .cd b{display:block;font-size:28px;color:#f7d794;font-variant-numeric:tabular-nums}
  .cd span{font-size:14px;opacity:.75}

  /* الأرقام */
  .stat{display:flex;align-items:baseline;justify-content:center;gap:10px;padding:10px 0;
    opacity:0;transform:translateY(14px);transition:opacity 1s ease,transform 1s ease}
  .stat.in{opacity:1;transform:none}
  .stat b{font:italic 700 46px/1.1 "Playfair Display",serif;color:#f7d794;font-variant-numeric:tabular-nums;
    text-shadow:0 0 22px rgba(247,215,148,.45)}
  .stat span{font-size:22px;opacity:.9}
  .mo-end{margin-top:12px;font-size:21px;opacity:0;transition:opacity 1.4s ease}
  .mo-end.in{opacity:.9}

  /* الخط الزمني */
  .tl2{position:relative;text-align:right;padding-right:34px;margin-top:6px}
  .tl2 .spine{position:absolute;right:9px;top:8px;bottom:14px;width:2px;border-radius:2px;
    background:linear-gradient(#f7d794,#ff9db8);transform-origin:top;transform:scaleY(0);
    box-shadow:0 0 12px rgba(255,157,184,.7)}
  .tl2 .ti{position:relative;padding:0 0 18px;opacity:0;transform:translateY(12px);
    transition:opacity 1.1s ease,transform 1.1s ease}
  .tl2 .ti.in{opacity:1;transform:none}
  .tl2 .ti::before{content:"";position:absolute;right:-31px;top:7px;width:12px;height:12px;border-radius:50%;
    background:#fff2d6;box-shadow:0 0 0 4px rgba(247,215,148,.25),0 0 16px rgba(247,215,148,.9)}
  .tl2 .ti small{display:block;font-size:16px;color:#f7d794;letter-spacing:.2px}
  .tl2 .ti p{margin:0;font-size:20px;line-height:1.7}

  /* الرسالة */
  .lt{padding:22px 20px 10px;border-radius:24px;text-align:right;background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(8px);box-shadow:0 20px 50px rgba(0,0,0,.35)}
  .lt p{margin:0 0 14px;font-size:21px;line-height:2}
  .lt p:last-child{font-size:25px;font-weight:700;color:#ffc2d4}
  .lt .w{opacity:0;display:inline-block;white-space:pre;transform:translateY(6px);transition:opacity 1.1s ease,transform 1.1s ease}
  .lt .w.in{opacity:1;transform:none}
  .lt-tip{margin-top:10px;font-size:14px;opacity:.5}

  /* الفوانيس */
  #moLan{position:absolute;inset:0;pointer-events:none;overflow:hidden}
  .lan{position:absolute;width:0;animation:lanUp var(--dur) cubic-bezier(.25,.1,.3,1) forwards}
  .lan .sw{position:absolute;left:0;top:0;animation:lanSway 3.4s ease-in-out infinite alternate}
  .lan .bd{position:absolute;left:-24px;top:0;width:48px;height:62px;border-radius:14px 14px 10px 10px;
    background:radial-gradient(circle at 50% 70%,#fff4c4,#ffb347 62%,#d9731f);
    box-shadow:0 0 34px 10px rgba(255,170,70,.55),0 0 80px 24px rgba(255,120,60,.25)}
  .lan .tx{position:absolute;left:-85px;top:72px;width:170px;text-align:center;font-size:16px;line-height:1.6;
    color:#fff4e0;text-shadow:0 2px 10px rgba(0,0,0,.7);
    background:rgba(24,10,40,.6);border-radius:14px;padding:4px 8px;box-sizing:border-box}
  @keyframes lanUp{0%{transform:translateY(0);opacity:0}8%{opacity:1}85%{opacity:1}100%{transform:translateY(calc(-1 * var(--rise)));opacity:0}}
  @keyframes lanSway{from{transform:translateX(-14px) rotate(-3deg)}to{transform:translateX(14px) rotate(3deg)}}
  .tapHint{display:inline-block;margin-top:6px;font-size:17px;opacity:.7;animation:moPulse 3s ease-in-out infinite}

  /* الختام */
  .fin{margin:0 0 6px;font-size:40px;line-height:1.5;font-weight:700;
    background:linear-gradient(100deg,#f7d794,#ffc2d4,#f7d794);background-size:220% 100%;
    -webkit-background-clip:text;background-clip:text;color:transparent;animation:moShine 6s linear infinite}
  @keyframes moShine{to{background-position:-220% 0}}
  .live{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px auto 8px;max-width:340px}
  .live div{padding:10px 2px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14)}
  .live b{display:block;font-size:27px;color:#ffc2d4;font-variant-numeric:tabular-nums}
  .live span{font-size:14px;opacity:.75}
  .mo-again{width:auto;margin-top:10px;padding:10px 22px;box-shadow:none;border-radius:14px;border:1px solid rgba(255,255,255,.3);
    background:transparent;color:#fff4f7;font-size:18px;cursor:pointer}

  /* التحكم */
  .mo-foot{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;
    gap:12px;padding:0 18px 58px;z-index:5}
  #moNext{width:min(86vw,320px);margin:0;padding:13px;border:0;border-radius:16px;font-size:21px;font-weight:700;
    color:#3b1030;background:linear-gradient(135deg,#f7d794,#ff9db8);cursor:pointer;
    box-shadow:0 10px 28px rgba(255,157,184,.35);opacity:0;pointer-events:none;transform:translateY(10px);
    transition:opacity 1s ease,transform 1s ease}
  #moNext.show{opacity:1;pointer-events:auto;transform:none}
  .dots{display:flex;gap:8px;position:absolute;bottom:26px;left:50%;transform:translateX(-50%)}
  .dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.25);transition:all .6s}
  .dots i.on{background:#f7d794;width:22px;border-radius:7px}
  #moExit{position:absolute;left:14px;bottom:12px;z-index:6;width:auto;margin:0;box-shadow:none;padding:6px 12px;border-radius:12px;
    border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.25);color:#fff4f7;font-size:15px;cursor:pointer}
  `;
  document.head.appendChild(css);

  /* ---------------- الزرار ---------------- */
  const btn = document.createElement("button");
  btn.id = "monthBtn"; btn.type = "button"; btn.textContent = "شهر مع بعض";
  document.getElementById("happyBtn").after(btn);

  /* ---------------- الشاشة ---------------- */
  const mo = document.createElement("div");
  mo.id = "mo";
  mo.innerHTML =
    '<canvas id="moCv"></canvas><div id="moLan"></div>' +

    /* 0: الحلقة */
    '<section class="mo-sc"><div class="mo-in">' +
      '<div class="ring"><svg viewBox="0 0 220 220"><defs><linearGradient id="moG" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#f7d794"/><stop offset="1" stop-color="#ff9db8"/></linearGradient></defs>' +
      '<circle class="trk" cx="110" cy="110" r="94"/>' +
      '<circle class="prg" id="moPrg" cx="110" cy="110" r="94" transform="rotate(-90 110 110)"/></svg>' +
      '<div class="rc"><b>1</b><span>شهر</span></div></div>' +
      '<h2 class="mo-h">أول شهر بينا</h2>' +
      '<p class="mo-sub" id="moCdLbl"></p>' +
      '<div class="cd" id="moCd"></div>' +
    '</div></section>' +

    /* 1: الأرقام */
    '<section class="mo-sc"><div class="mo-in">' +
      '<h2 class="mo-h">شهر كامل يعني</h2>' +
      '<div class="stat" data-to="31"><b>0</b><span>يوم</span></div>' +
      '<div class="stat" data-to="744"><b>0</b><span>ساعة</span></div>' +
      '<div class="stat" data-to="44640"><b>0</b><span>دقيقة</span></div>' +
      '<div class="stat" data-to="2678400"><b>0</b><span>ثانية</span></div>' +
      '<p class="mo-end">ولا لحظة منهم كانت عادية</p>' +
    '</div></section>' +

    /* 2: الخط الزمني */
    '<section class="mo-sc"><div class="mo-in">' +
      '<h2 class="mo-h">حكايتنا في شهر</h2>' +
      '<div class="tl2"><i class="spine"></i>' +
      MEMORIES.map(m => '<div class="ti"><small>' + m.d + '</small><p>' + m.t + '</p></div>').join("") +
      '</div>' +
    '</div></section>' +

    /* 3: الرسالة */
    '<section class="mo-sc"><div class="mo-in">' +
      '<div class="lt" id="moLt"></div><div class="lt-tip">اضغطي على الرسالة لو عايزة تظهر كلها</div>' +
    '</div></section>' +

    /* 4: الفوانيس */
    '<section class="mo-sc"><div class="mo-in">' +
      '<h2 class="mo-h">اطلقي أمنية</h2>' +
      '<p class="mo-sub">كل ضغطة في السما بتطلّع أمنية مني ليكي</p>' +
      '<span class="tapHint" id="moHint">اضغطي في أي مكان</span>' +
    '</div></section>' +

    /* 5: الختام */
    '<section class="mo-sc"><div class="mo-in">' +
      '<h1 class="fin">كل شهر وإنتي حبيبتي</h1>' +
      '<p class="mo-sub">شهر أول... وباقي العمر</p>' +
      '<div class="live" id="moLive"></div>' +
      '<p class="mo-sub" style="font-size:16px">والعدّاد لسه شغال، وهيفضل شغال</p>' +
      '<button type="button" class="mo-again" id="moAgain">من الأول</button>' +
    '</div></section>' +

    '<div class="mo-foot"><button type="button" id="moNext"></button><div class="dots"></div></div>' +
    '<button type="button" id="moExit">خروج</button>';
  document.body.appendChild(mo);

  const scenes = [...mo.querySelectorAll(".mo-sc")];
  const dots = $$(".dots", mo);
  scenes.forEach(() => dots.appendChild(document.createElement("i")));
  const nextBtn = $$("#moNext", mo);

  /* ---------------- الكانفاس: نجوم + شهاب + ألعاب نارية ---------------- */
  const cv = $$("#moCv", mo), ctx = cv.getContext("2d");
  let W, H, dpr, stars = [], shoot = null, nextShoot = 0, rockets = [], sparks = [];
  let raf = 0, lastTs = 0, fxOn = false, nextFw = 0, running = false;

  function resize(){
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(W * H / 5000);
    stars = Array.from({length: n}, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .3,
      ph: Math.random() * 6.28, sp: .6 + Math.random() * 1.6, g: Math.random() < .25
    }));
  }
  function launch(){
    const x = W * (.15 + Math.random() * .7);
    rockets.push({x, y: H, ty: H * (.14 + Math.random() * .34), vy: -(520 + Math.random() * 120),
                  h: [345, 40, 320, 200, 280, 20][Math.floor(Math.random() * 6)]});
  }
  function burst(x, y, h){
    const n = 56;
    for(let i = 0; i < n; i++){
      const a = i / n * 6.283 + Math.random() * .1, s = 70 + Math.random() * 150;
      sparks.push({x, y, px: x, py: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
                   life: 1, dec: .38 + Math.random() * .25, h: h + Math.random() * 30 - 15});
    }
  }
  function frame(ts){
    if(!running) return;
    const dt = Math.min(.05, (ts - lastTs) / 1000 || .016); lastTs = ts;
    const t = ts / 1000;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, W, H);

    for(const s of stars){
      const a = .3 + .7 * (Math.sin(t * s.sp + s.ph) * .5 + .5);
      ctx.globalAlpha = a;
      ctx.fillStyle = s.g ? "#ffe3a8" : "#ffffff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;

    if(!shoot && t > nextShoot){
      shoot = {x: Math.random() * W * .8 + W * .2, y: Math.random() * H * .35, vx: -520, vy: 300, life: 1};
      nextShoot = t + 5 + Math.random() * 5;
    }
    if(shoot){
      shoot.x += shoot.vx * dt; shoot.y += shoot.vy * dt; shoot.life -= dt * .9;
      const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * .22, shoot.y - shoot.vy * .22);
      g.addColorStop(0, "rgba(255,255,255," + Math.max(0, shoot.life) + ")"); g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * .22, shoot.y - shoot.vy * .22); ctx.stroke();
      if(shoot.life <= 0) shoot = null;
    }

    if(fxOn && t > nextFw){ launch(); nextFw = t + 0.9 + Math.random() * 0.9; }
    ctx.globalCompositeOperation = "lighter";
    rockets = rockets.filter(r => {
      r.y += r.vy * dt;
      ctx.fillStyle = "hsla(" + r.h + ",90%,75%,.9)";
      ctx.beginPath(); ctx.arc(r.x, r.y, 2.2, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "hsla(" + r.h + ",90%,70%,.35)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x, r.y + 26); ctx.stroke();
      if(r.y <= r.ty){ burst(r.x, r.y, r.h); return false; }
      return true;
    });
    const drag = Math.pow(.2, dt);
    sparks = sparks.filter(p => {
      p.px = p.x; p.py = p.y;
      p.vx *= drag; p.vy = p.vy * drag + 70 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.life -= p.dec * dt;
      if(p.life <= 0) return false;
      ctx.strokeStyle = "hsla(" + p.h + ",95%,72%," + p.life + ")"; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
      return true;
    });
    raf = requestAnimationFrame(frame);
  }

  /* ---------------- منطق المشاهد ---------------- */
  let cur = -1, timers = [], tick = 0, lanCount = 0, wishIdx = 0, letterDone = false;
  const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  const showNext = (label) => { nextBtn.textContent = label || "كمّلي"; nextBtn.classList.add("show"); };

  function unitsHTML(arr){
    return arr.map(u => '<div><b>' + u[0] + '</b><span>' + u[1] + '</span></div>').join("");
  }
  function updateClocks(){
    const now = Date.now();
    /* العدّاد اللي في أول مشهد */
    const diff = ANNIV.getTime() - now, before = diff > 0, s = Math.floor(Math.abs(diff) / 1000);
    $$("#moCdLbl", mo).textContent = before ? "فاضل على أول شهر لينا" : "عدّى على أول شهر لينا";
    $$("#moCd", mo).innerHTML = unitsHTML([
      [Math.floor(s / 86400), "يوم"], [pad2(Math.floor(s / 3600) % 24), "ساعة"],
      [pad2(Math.floor(s / 60) % 60), "دقيقة"], [pad2(s % 60), "ثانية"]
    ]);
    /* العدّاد اللي في الختام */
    const e = Math.max(0, Math.floor((now - START.getTime()) / 1000));
    $$("#moLive", mo).innerHTML = unitsHTML([
      [Math.floor(e / 86400), "يوم"], [pad2(Math.floor(e / 3600) % 24), "ساعة"],
      [pad2(Math.floor(e / 60) % 60), "دقيقة"], [pad2(e % 60), "ثانية"]
    ]);
  }

  function countUp(el, to, dur){
    const t0 = performance.now();
    (function step(n){
      const k = Math.min(1, (n - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
      el.textContent = v.toLocaleString("en-US");
      if(k < 1 && cur === 1) requestAnimationFrame(step);
    })(t0);
  }

  const enter = [
    function(){                                   // 0 الحلقة
      const frac = Math.max(0, Math.min(1, (Date.now() - START.getTime()) / (ANNIV.getTime() - START.getTime())));
      later(() => { $$("#moPrg", mo).style.strokeDashoffset = String(590.6 * (1 - frac)); }, 500);
      later(() => showNext("ابدأي الحكاية"), 2200);
    },
    function(){                                   // 1 الأرقام
      const st = [...scenes[1].querySelectorAll(".stat")];
      st.forEach((el, i) => later(() => { el.classList.add("in"); countUp(el.firstChild, +el.dataset.to, 2400); }, 500 + i * 1300));
      later(() => scenes[1].querySelector(".mo-end").classList.add("in"), 500 + st.length * 1300 + 1800);
      later(() => showNext(), 500 + st.length * 1300 + 2600);
    },
    function(){                                   // 2 الخط الزمني
      const items = [...scenes[2].querySelectorAll(".ti")], gap = 2100;
      const sp = scenes[2].querySelector(".spine");
      sp.style.transition = "transform " + (items.length * gap / 1000) + "s linear"; sp.style.transform = "scaleY(1)";
      items.forEach((el, i) => later(() => {
        el.classList.add("in");
        el.scrollIntoView({behavior: "smooth", block: "nearest"});
      }, 600 + i * gap));
      later(() => showNext(), 600 + items.length * gap + 600);
    },
    function(){                                   // 3 الرسالة
      const box = $$("#moLt", mo); box.innerHTML = ""; letterDone = false;
      const words = []; let delay = 600;
      LETTER.forEach(par => {
        const p = document.createElement("p");
        par.split(" ").forEach(w => {
          const sp = document.createElement("span"); sp.className = "w"; sp.textContent = w + " ";
          p.appendChild(sp); words.push(sp);
        });
        box.appendChild(p);
      });
      words.forEach((sp, i) => later(() => sp.classList.add("in"), delay + i * 190));
      const total = delay + words.length * 190 + 1200;
      later(() => { letterDone = true; showNext(); }, total);
      box.onclick = () => {
        timers.forEach(clearTimeout); timers = [];
        words.forEach(sp => sp.classList.add("in")); letterDone = true; showNext();
      };
    },
    function(){                                   // 4 الفوانيس
      lanCount = 0; $$("#moHint", mo).textContent = "اضغطي في أي مكان";
    },
    function(){                                   // 5 الختام
      fxOn = true; nextFw = 0; later(launch, 200); later(launch, 700);
      nextBtn.classList.remove("show");
    }
  ];

  function go(n){
    cur = n;
    timers.forEach(clearTimeout); timers = [];
    fxOn = false;
    nextBtn.classList.remove("show");
    scenes.forEach((s, i) => s.classList.toggle("act", i === n));
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === n));
    scenes[n].scrollTop = 0;
    enter[n]();
  }

  nextBtn.addEventListener("click", () => { if(cur < scenes.length - 1) go(cur + 1); });
  $$("#moAgain", mo).addEventListener("click", () => {
    scenes[1].querySelectorAll(".stat,.mo-end").forEach(e => e.classList.remove("in"));
    scenes[2].querySelectorAll(".ti").forEach(e => e.classList.remove("in"));
    const sp = scenes[2].querySelector(".spine"); sp.style.transition = "none"; sp.style.transform = "scaleY(0)";
    $$("#moPrg", mo).style.strokeDashoffset = "590.6";
    go(0);
  });

  /* ضغطة في السما = فانوس */
  mo.addEventListener("click", e => {
    if(cur !== 4 || e.target.closest("button")) return;
    const lan = document.createElement("div");
    const x = Math.max(80, Math.min(innerWidth - 80, e.clientX)), y = e.clientY;
    lan.className = "lan";
    lan.style.left = x + "px"; lan.style.top = y + "px";
    lan.style.setProperty("--dur", "11s"); lan.style.setProperty("--rise", (y + 160) + "px");
    lan.innerHTML = '<div class="sw"><div class="bd"></div><div class="tx"></div></div>';
    lan.querySelector(".tx").textContent = WISHES[wishIdx++ % WISHES.length];
    $$("#moLan", mo).appendChild(lan);
    setTimeout(() => lan.remove(), 11500);
    lanCount++;
    if(lanCount === 1) $$("#moHint", mo).textContent = "كمان واحدة";
    if(lanCount >= 3){ $$("#moHint", mo).textContent = "كمّلي لما تحبي، أو اطلقي كمان"; showNext(); }
  });

  /* ---------------- فتح وقفل ---------------- */
  function open(){
    mo.classList.add("on"); void mo.offsetWidth; mo.classList.add("vis");
    resize(); running = true; lastTs = performance.now(); nextShoot = performance.now() / 1000 + 2;
    raf = requestAnimationFrame(frame);
    updateClocks(); tick = setInterval(updateClocks, 1000);
    wishIdx = 0; go(0);
  }
  function close(){
    mo.classList.remove("vis");
    timers.forEach(clearTimeout); timers = []; clearInterval(tick); fxOn = false; cur = -1;
    setTimeout(() => {
      if(mo.classList.contains("vis")) return;
      mo.classList.remove("on"); running = false; cancelAnimationFrame(raf);
      rockets = []; sparks = []; $$("#moLan", mo).innerHTML = "";
      scenes.forEach(s => s.classList.remove("act"));
    }, 1500);
  }
  btn.addEventListener("click", open);
  $$("#moExit", mo).addEventListener("click", close);
  document.addEventListener("keydown", e => { if(e.key === "Escape" && mo.classList.contains("vis")) close(); });
  window.addEventListener("resize", () => { if(running) resize(); });
})();
