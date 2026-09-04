(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const _r=["enterShrine","meetKeeper","clearStoneSteps","crossBridge","cleansePool","defendLanterns","defeatRainErodedWarrior","exposeBindingCore","cutBindings","hioRescued","escortHioToKeeper","missionComplete"],el=60,rn=1/el,Uo=100,No=800,nd=.52;class id{s;constructor(e){this.s=e>>>0}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}int(e){return Math.floor(this.next()*e)}pick(e){return e[this.int(e.length)]}get seed(){return this.s}setSeed(e){this.s=e>>>0}}function On(i,e){if(i.dead)return{applied:0,kind:"dead",poiseBroken:!1,killed:!1};if(i.iFrames>0)return{applied:0,kind:"iframe",poiseBroken:!1,killed:!1};if(i.damageCooldown>0)return{applied:0,kind:"cooldown",poiseBroken:!1,killed:!1};let t=!1;i.guard>0&&(i.guard=Math.max(0,i.guard-e.guardDamage),i.guard<=0&&(t=!0,i.poiseBreakTimer=e.poiseBreakTicks,i.attack=null));const n=Math.max(0,e.damage);return i.hp=Math.max(0,i.hp-n),i.damageCooldown=8,i.hp<=0?(i.dead=!0,i.attack=null,{applied:n,kind:"hit",poiseBroken:t,killed:!0}):{applied:n,kind:t?"blocked-stagger":"hit",poiseBroken:t,killed:!1}}function Fo(i){i.iFrames>0&&(i.iFrames-=1),i.damageCooldown>0&&(i.damageCooldown-=1),i.poiseBreakTimer>0&&(i.poiseBreakTimer-=1),i.stamina<i.maxStamina&&(i.stamina=Math.min(i.maxStamina,i.stamina+.35))}function xr(i,e){i.iFrames=Math.max(i.iFrames,e)}function dt(i,e){const t=i.x-e.x,n=i.z-e.z;return Math.hypot(t,n)}let sd=1;const rd={"rin.primary.1":{id:"rin.primary.1",telegraphTicks:5,contactTicks:5,resultTicks:4,recoveryTicks:7,shape:"sphere",range:2.2,radius:1.1,damage:12,guardDamage:8,poiseBreakTicks:20},"rin.primary.2":{id:"rin.primary.2",telegraphTicks:8,contactTicks:4,resultTicks:3,recoveryTicks:10,shape:"sphere",range:2.3,radius:1.2,damage:14,guardDamage:10,poiseBreakTicks:22},"rin.primary.3":{id:"rin.primary.3",telegraphTicks:10,contactTicks:5,resultTicks:4,recoveryTicks:14,shape:"sphere",range:2.5,radius:1.4,damage:18,guardDamage:14,poiseBreakTicks:28},"rin.secondary":{id:"rin.secondary",telegraphTicks:6,contactTicks:2,resultTicks:4,recoveryTicks:12,shape:"ray",range:2.4,radius:.2,damage:0,guardDamage:0,poiseBreakTicks:0},"rin.q":{id:"rin.q",telegraphTicks:10,contactTicks:8,resultTicks:4,recoveryTicks:16,shape:"sphere",range:0,radius:6,damage:8,guardDamage:12,poiseBreakTicks:24},"rin.r":{id:"rin.r",telegraphTicks:4,contactTicks:8,resultTicks:2,recoveryTicks:12,shape:"sphere",range:6,radius:1.2,damage:12,guardDamage:8,poiseBreakTicks:18},"rin.f":{id:"rin.f",telegraphTicks:20,contactTicks:10,resultTicks:8,recoveryTicks:24,shape:"sphere",range:0,radius:8,damage:40,guardDamage:30,poiseBreakTicks:48},"enemy.slash":{id:"enemy.slash",telegraphTicks:18,contactTicks:6,resultTicks:4,recoveryTicks:20,shape:"sphere",range:1.8,radius:1,damage:12,guardDamage:8,poiseBreakTicks:18},"enemy.heavy":{id:"enemy.heavy",telegraphTicks:28,contactTicks:8,resultTicks:6,recoveryTicks:28,shape:"sphere",range:2.2,radius:1.3,damage:22,guardDamage:14,poiseBreakTicks:30},"enemy.arrow":{id:"enemy.arrow",telegraphTicks:24,contactTicks:2,resultTicks:4,recoveryTicks:30,shape:"ray",range:28,radius:.2,damage:10,guardDamage:6,poiseBreakTicks:12},"enemy.cast":{id:"enemy.cast",telegraphTicks:30,contactTicks:8,resultTicks:6,recoveryTicks:36,shape:"sphere",range:10,radius:2.4,damage:8,guardDamage:4,poiseBreakTicks:10},"hound.dash":{id:"hound.dash",telegraphTicks:16,contactTicks:8,resultTicks:4,recoveryTicks:22,shape:"sphere",range:5,radius:1,damage:14,guardDamage:10,poiseBreakTicks:16},"elite.chain":{id:"elite.chain",telegraphTicks:22,contactTicks:10,resultTicks:6,recoveryTicks:26,shape:"sphere",range:3.2,radius:1.6,damage:18,guardDamage:12,poiseBreakTicks:22},"boss.triple1":{id:"boss.triple1",telegraphTicks:20,contactTicks:8,resultTicks:4,recoveryTicks:8,shape:"cone",range:6,radius:3.5,damage:16,guardDamage:10,poiseBreakTicks:18},"boss.triple2":{id:"boss.triple2",telegraphTicks:12,contactTicks:8,resultTicks:4,recoveryTicks:8,shape:"cone",range:6,radius:3.5,damage:16,guardDamage:10,poiseBreakTicks:18},"boss.triple3":{id:"boss.triple3",telegraphTicks:28,contactTicks:10,resultTicks:6,recoveryTicks:22,shape:"cone",range:7,radius:4,damage:22,guardDamage:14,poiseBreakTicks:26},"boss.chop":{id:"boss.chop",telegraphTicks:36,contactTicks:8,resultTicks:8,recoveryTicks:28,shape:"box",range:5,radius:2.2,damage:28,guardDamage:20,poiseBreakTicks:36},"boss.rain-arrow":{id:"boss.rain-arrow",telegraphTicks:24,contactTicks:6,resultTicks:6,recoveryTicks:20,shape:"sphere",range:14,radius:2,damage:12,guardDamage:6,poiseBreakTicks:12},"boss.clone-cut":{id:"boss.clone-cut",telegraphTicks:22,contactTicks:8,resultTicks:6,recoveryTicks:18,shape:"box",range:10,radius:1.4,damage:20,guardDamage:12,poiseBreakTicks:20},"boss.wave":{id:"boss.wave",telegraphTicks:26,contactTicks:12,resultTicks:6,recoveryTicks:24,shape:"sphere",range:0,radius:12,damage:18,guardDamage:8,poiseBreakTicks:16},"boss.thunder":{id:"boss.thunder",telegraphTicks:32,contactTicks:6,resultTicks:6,recoveryTicks:20,shape:"sphere",range:16,radius:2.2,damage:24,guardDamage:10,poiseBreakTicks:18}};function en(i,e){if(i.dead||i.poiseBreakTimer>0||i.attack)return null;const t=rd[e];if(!t)return null;const n={id:`atk-${sd++}`,defId:t.id,phase:"telegraph",elapsed:0,telegraphTicks:t.telegraphTicks,contactTicks:t.contactTicks,resultTicks:t.resultTicks,recoveryTicks:t.recoveryTicks,shape:t.shape,range:t.range,radius:t.radius,damage:t.damage,guardDamage:t.guardDamage,poiseBreakTicks:t.poiseBreakTicks,hits:[],ownerId:i.id};return i.attack=n,n}function ko(i){const e=i.attack;if(!e)return null;e.elapsed+=1;const t=e.telegraphTicks,n=t+e.contactTicks,s=n+e.resultTicks,r=s+e.recoveryTicks;if(e.elapsed<=t)e.phase="telegraph";else if(e.elapsed<=n)e.phase="contact";else if(e.elapsed<=s)e.phase="result";else if(e.elapsed<=r)e.phase="recovery";else return i.attack=null,null;return e}function rs(i,e){return{x:i.pos.x+Math.sin(i.yaw)*e,y:i.pos.y+1,z:i.pos.z-Math.cos(i.yaw)*e}}const no=[{id:"module.moon-return",name:"月返",category:"technique",starter:!0,description:"月刃回收強化下一擊近戰。",effect:"近戰傷害 +4"},{id:"module.pin-rain",name:"雨釘",category:"technique",starter:!1,description:"Q 控場時間延長。",effect:"月輪滯空更久"},{id:"module.arc-slash",name:"月弧",category:"technique",starter:!1,description:"近戰距離略增。",effect:"近戰距離 +0.4"},{id:"module.focus",name:"凝神",category:"mind",starter:!0,description:"精準射擊削韌提高。",effect:"射擊削韌 ×1.4"},{id:"module.iron-breath",name:"鐵息",category:"mind",starter:!1,description:"最大韌性提高。",effect:"最大韌性 +15"},{id:"module.mend-light",name:"回光",category:"mind",starter:!1,description:"互動時回復少量生命。",effect:"按 E 回復 8 生命"},{id:"module.lantern-guard",name:"燈護",category:"fate",starter:!0,description:"命燈耐久與救援護盾增強。",effect:"命燈耐久 ×1.5"},{id:"module.rain-ward",name:"雨禦",category:"fate",starter:!1,description:"地面危害減傷。",effect:"池毒傷害 ×0.7"},{id:"module.fate-bond",name:"命契",category:"fate",starter:!1,description:"緋緒最大生命提高。",effect:"緋緒生命 +25"}],tl=no.filter(i=>i.starter);function oa(i){return{meleeBonus:i==="module.moon-return"?4:0,meleeRange:i==="module.arc-slash"?.4:0,guardShotMul:i==="module.focus"?1.4:1,maxGuardBonus:i==="module.iron-breath"?15:0,interactHeal:i==="module.mend-light"?8:0,lanternHpMul:i==="module.lantern-guard"?1.5:1,hazardMul:i==="module.rain-ward"?.7:1,hioHpBonus:i==="module.fate-bond"?25:0}}function vs(i){const e=i.map(oa);return{meleeBonus:e.reduce((t,n)=>t+n.meleeBonus,0),meleeRange:e.reduce((t,n)=>t+n.meleeRange,0),guardShotMul:e.reduce((t,n)=>t*n.guardShotMul,1),maxGuardBonus:e.reduce((t,n)=>t+n.maxGuardBonus,0),interactHeal:e.reduce((t,n)=>t+n.interactHeal,0),lanternHpMul:e.reduce((t,n)=>Math.max(t,n.lanternHpMul),1),hazardMul:e.reduce((t,n)=>t*n.hazardMul,1),hioHpBonus:e.reduce((t,n)=>t+n.hioHpBonus,0)}}function ad(i,e=3){const t=new Set(i),n=tl.map(r=>r.id).filter(r=>!t.has(r)),s=no.map(r=>r.id).filter(r=>!t.has(r)&&!n.includes(r));return[...n,...s].slice(0,e)}function vr(i){const e=ad(i.ownedModules);e.length!==0&&(i.pendingModuleChoices=e,i.moduleChoiceOpen=!0)}function It(i,e){const t=_r.indexOf(e),n=_r.indexOf(i.objective);if(t<0)return!1;if(t<n)return!0;if(t!==n)return!1;i.completedObjectives.includes(e)||i.completedObjectives.push(e);const s=_r[t+1];return s&&(i.objective=s),!0}function Mr(i){const e=()=>i.enemies.filter(n=>!n.dead&&n.kind!=="dummy"),t=n=>e().filter(s=>s.kind===n);if(i.objective==="enterShrine"&&It(i,"enterShrine"),i.objective==="meetKeeper"&&i.keeperTalked&&(It(i,"meetKeeper"),i.checkpointId="keeper"),i.objective==="clearStoneSteps"&&(t("sword-soldier").filter(s=>s.id.startsWith("enc-a")).length+t("archer").filter(s=>s.id.startsWith("enc-a")).length,i.enemies.some(s=>s.id.startsWith("enc-a"))&&i.enemies.filter(s=>s.id.startsWith("enc-a")&&!s.dead).length===0&&(It(i,"clearStoneSteps"),vr(i))),i.objective==="crossBridge"&&i.triggersFired.includes("s5-pool")&&It(i,"crossBridge"),i.objective==="cleansePool"){const n=i.enemies.filter(r=>r.id.startsWith("enc-b")&&!r.dead).length;i.enemies.some(r=>r.id.startsWith("enc-b"))&&n===0&&(i.casterPuddlesCleansed=!0,It(i,"cleansePool"),vr(i))}if(i.objective==="defendLanterns"){const n=i.enemies.some(a=>a.kind==="lantern-hunter"&&a.dead),s=i.lanterns.filter(a=>a.lit&&a.hp>0).length;i.enemies.some(a=>a.kind==="lantern-hunter")&&n&&s>=1&&(i.stats.lanternsSaved=s,It(i,"defendLanterns"),i.checkpointId="inner-path",vr(i))}if(i.objective==="defeatRainErodedWarrior"){const n=i.enemies.find(s=>s.kind==="boss");n&&n.dead&&(It(i,"defeatRainErodedWarrior"),i.checkpointId="rescue")}i.objective==="exposeBindingCore"&&It(i,"exposeBindingCore"),i.objective==="cutBindings"&&i.bindingsCut>=3&&It(i,"cutBindings"),i.objective==="hioRescued"&&i.bindingsCut>=3&&(i.hioState="rescued",It(i,"hioRescued"),i.checkpointId="escort"),i.objective==="escortHioToKeeper"&&(i.hioState==="safe"||i.triggersFired.includes("escort-arrive"))&&(i.hioState="safe",It(i,"escortHioToKeeper")),i.objective==="missionComplete"&&i.triggersFired.includes("light-main-lantern")&&It(i,"missionComplete")}const od="雨把山門鎖死。凜踏入殘界，要一刀一刀割開緋緒的束縛。",xt={keeper:"./runtime-assets/ui/keeper.png",rin:"./runtime-assets/ui/rin-portrait.jpg",hio:"./runtime-assets/ui/hio.png"},di=[{id:"story.intro.1",speaker:"keeper",name:"澄夜",text:"雨聲會吞沒弓弦。燈還亮著的時候，往山門深處走。",portrait:xt.keeper,blocking:!0,ttlTicks:0},{id:"story.intro.2",speaker:"keeper",name:"澄夜",text:"封印台在最裡。三條束縛未斷，她便醒不來。",portrait:xt.keeper,blocking:!0,ttlTicks:0},{id:"story.intro.3",speaker:"rin",name:"凜",text:"……我來割開。",portrait:xt.rin,blocking:!0,ttlTicks:0}],cd=[{id:"story.keeper.1",speaker:"keeper",name:"澄夜",text:"你來了。雨把參道鎖成一條路，別指望回頭。",portrait:xt.keeper,blocking:!0,ttlTicks:0},{id:"story.keeper.2",speaker:"keeper",name:"澄夜",text:"石階有伏兵。過橋時看腳下。命燈若滅，山門便不再認人。",portrait:xt.keeper,blocking:!0,ttlTicks:0},{id:"story.keeper.3",speaker:"rin",name:"凜",text:"我知道。",portrait:xt.rin,blocking:!0,ttlTicks:0}],ld=[{id:"story.binding.1",speaker:"rin",name:"凜",text:"第一刀。金線顫了一下。",portrait:xt.rin,blocking:!1,ttlTicks:210},{id:"story.binding.2",speaker:"hio",name:"緋緒",text:"……唔。",portrait:"./runtime-assets/ui/hio-bound.png",blocking:!1,ttlTicks:210},{id:"story.binding.3",speaker:"narrator",name:"",text:"第三刀。雨聲忽然遠了。",portrait:"",blocking:!1,ttlTicks:150}],dd=[{id:"story.hio.wake.1",speaker:"hio",name:"緋緒",text:"……凜？我還在雨裡嗎。",portrait:xt.hio,blocking:!0,ttlTicks:0},{id:"story.hio.wake.2",speaker:"rin",name:"凜",text:"還在。我帶你出去。",portrait:xt.rin,blocking:!0,ttlTicks:0},{id:"story.hio.wake.3",speaker:"hio",name:"緋緒",text:"好。走慢一點，也沒有關係。",portrait:xt.hio,blocking:!0,ttlTicks:0}],hd={meetKeeper:{id:"story.objective.meetKeeper",speaker:"rin",name:"凜",text:"燈火在前。先問燈守。",portrait:xt.rin,blocking:!1,ttlTicks:240},clearStoneSteps:{id:"story.objective.clearStoneSteps",speaker:"keeper",name:"澄夜",text:"石階不會讓你空手通過。",portrait:xt.keeper,blocking:!1,ttlTicks:240},crossBridge:{id:"story.objective.crossBridge",speaker:"rin",name:"凜",text:"橋斷了。步子要穩。",portrait:xt.rin,blocking:!1,ttlTicks:240},cleansePool:{id:"story.objective.cleansePool",speaker:"keeper",name:"澄夜",text:"洗心池已被咒水浸過。別站在紫霧裡。",portrait:xt.keeper,blocking:!1,ttlTicks:240},defendLanterns:{id:"story.objective.defendLanterns",speaker:"keeper",name:"澄夜",text:"守住那些燈。它們認得路。",portrait:xt.keeper,blocking:!1,ttlTicks:240},defeatRainErodedWarrior:{id:"story.objective.defeatRainErodedWarrior",speaker:"rin",name:"凜",text:"雨蝕武者……站在門前。",portrait:xt.rin,blocking:!1,ttlTicks:260},cutBindings:{id:"story.objective.cutBindings",speaker:"rin",name:"凜",text:"靠近她。一條一條割開。",portrait:xt.rin,blocking:!1,ttlTicks:240},escortHioToKeeper:{id:"story.objective.escortHioToKeeper",speaker:"hio",name:"緋緒",text:"我跟得上。別走太遠。",portrait:xt.hio,blocking:!1,ttlTicks:240},missionComplete:{id:"story.objective.missionComplete",speaker:"keeper",name:"澄夜",text:"點主燈。讓山門記得你們還在。",portrait:xt.keeper,blocking:!1,ttlTicks:240}},ud=["雨還未停，山門卻鬆了一線。","緋緒的燈重新亮了。據點的夜，暫時肯認人。","林影深處，有人低聲喚了一句——葛葉。像是預告，又像是欠條。"],fd=[{s:22,title:"雨鎖山門",body:"雨不停，門不開。過此者，只許向前。"},{s:48,title:"燈守箴",body:"燈在，人在。燈滅，山不認路。"},{s:118,title:"洗心",body:"池本澄明。咒水入後，心不可洗，只可渡。"},{s:202,title:"封門",body:"武者立此，為雨所蝕，為命所役。"}];function pd(){return{queue:[],active:null,elapsed:0,flags:[],introLineIndex:0}}function Ni(i){return i?!!i.story.active?.blocking:!1}function Yn(i,e){return i.story.flags.includes(e)?!1:(i.story.flags.push(e),!0)}function io(i,e){if(i.story.flags.includes(e.id))return!1;if(Yn(i,e.id),!i.story.active)i.story.active=e,i.story.elapsed=0;else if(e.blocking&&!i.story.active.blocking){const t=i.story.active;i.story.active=e,i.story.elapsed=0,i.story.queue.push(t)}else i.story.queue.push(e);return!0}function nl(i,e){const t=[];i.story.active&&!i.story.active.blocking&&(t.push(i.story.active),i.story.active=null,i.story.elapsed=0);const n=i.story.queue.splice(0,i.story.queue.length);let s=0;for(const r of e)io(i,r)&&(s+=1);return i.story.queue.push(...n,...t),s}function il(i,e){e.id==="story.keeper.3"&&(i.keeperTalked=!0,Yn(i,"story.keeper.talked")),e.id==="story.hio.wake.3"&&Yn(i,"story.hio.wake"),e.id.startsWith("story.intro.")&&Yn(i,"story.intro.seen")}function as(i){const e=i.story.active;if(!e)return!1;il(i,e);const t=i.story.queue.shift()??null;return i.story.active=t,i.story.elapsed=0,!0}function Oo(i){const e=[i.story.active,...i.story.queue].filter(n=>!!n),t=[];for(const n of e)n.blocking?il(i,n):t.push(n);i.story.queue=t.slice(1),i.story.active=t[0]??null,i.story.elapsed=0}function Bo(i){for(;i.story.active&&!i.story.active.blocking&&i.story.queue.some(t=>t.blocking);)as(i);!i.story.active&&i.story.queue.length&&(i.story.active=i.story.queue.shift()??null,i.story.elapsed=0);const e=i.story.active;if(e){if(i.story.elapsed+=1,e.blocking&&i.story.elapsed>=210){as(i);return}!e.blocking&&e.ttlTicks>0&&i.story.elapsed>=e.ttlTicks&&as(i)}}function zo(i,e){const t=hd[e];t&&io(i,t)}function md(i){return i.keeperTalked||i.story.flags.includes("story.keeper.talked")||i.story.flags.includes("story.keeper.1")?!1:nl(i,cd)>0}function gd(i,e){const t=ld[e-1];t&&io(i,t)}function _d(i){return i.story.flags.includes("story.hio.wake.1")?!1:nl(i,dd)>0}function xd(i){i.story.introLineIndex+=1;const e=di[i.story.introLineIndex-1];return e&&Yn(i,e.id),i.story.introLineIndex>=di.length?(Yn(i,"story.intro.seen"),"done"):"continue"}function vd(i){i.story.introLineIndex=di.length;for(const e of di)Yn(i,e.id);Yn(i,"story.intro.seen")}function sl(i){if(i.bindingsCut>=3||i.objective!=="cutBindings"&&i.objective!=="exposeBindingCore")return!1;const e=i.npcs.find(t=>t.kind==="hio");return e?dt(i.player.pos,e.pos)<=3.8:!1}function Md(i){if(!sl(i)&&i.objective!=="cutBindings"&&i.objective!=="exposeBindingCore")return!1;const e=i.npcs.find(t=>t.kind==="hio");return!e||dt(i.player.pos,e.pos)>4.2?!1:(i.bindingsCut>=3||(i.bindingsCut+=1,gd(i,i.bindingsCut),i.pendingCues.push("binding-cut"),i.bindingsCut>=3&&(i.hioState="rescued",i.objective==="exposeBindingCore"&&It(i,"exposeBindingCore"),i.objective==="cutBindings"&&It(i,"cutBindings"),i.objective==="hioRescued"&&It(i,"hioRescued"),_d(i))),!0)}const os=231,yd=1.75;function Pe(i){const e=Math.max(0,Math.min(os,i)),t=32*Math.sin(e/os*Math.PI),n=5.5*(e/os),s=-e*yd;return{x:t,y:n,z:s}}const Cn=Pe(45),qs=Pe(202),Fi=Pe(226),Ys=Pe(2),Ks={waves:[{id:"tutorial-blade",sectionId:"s1",triggerId:"s1-torii",enemies:[{kind:"sword-soldier",id:"tut-blade",s:30,offsetX:2}]},{id:"enc-a-w1",sectionId:"s3",triggerId:"s3-stairs",enemies:[{kind:"sword-soldier",id:"enc-a-blade-1",s:62,offsetX:-2},{kind:"sword-soldier",id:"enc-a-blade-2",s:66,offsetX:2}]},{id:"wave-enc-a-2",sectionId:"s3",triggerId:"enc-a-w2",enemies:[{kind:"archer",id:"enc-a-archer",s:74,offsetX:6},{kind:"sword-soldier",id:"enc-a-blade-3",s:70,offsetX:-2},{kind:"sword-soldier",id:"enc-a-blade-4",s:72,offsetX:2}]},{id:"wave-bridge-hound",sectionId:"s4",triggerId:"s4-bridge",enemies:[{kind:"shadow-hound",id:"enc-bridge-hound",s:92,offsetX:-3}]},{id:"enc-b-w1",sectionId:"s5",triggerId:"s5-pool",enemies:[{kind:"caster",id:"enc-b-caster",s:116,offsetX:0},{kind:"shadow-hound",id:"enc-b-hound-1",s:112,offsetX:-3},{kind:"shadow-hound",id:"enc-b-hound-2",s:112,offsetX:3}]},{id:"wave-enc-b-2",sectionId:"s5",triggerId:"enc-b-w2",enemies:[{kind:"archer",id:"enc-b-archer",s:124,offsetX:5}]},{id:"elite",sectionId:"s6",triggerId:"s6-court",enemies:[{kind:"lantern-hunter",id:"elite-hunter",s:148,offsetX:0},{kind:"sword-soldier",id:"elite-blade",s:144,offsetX:-3},{kind:"archer",id:"elite-archer",s:152,offsetX:4}]},{id:"boss",sectionId:"s8",triggerId:"s8-arena",enemies:[{kind:"boss",id:"boss-rain-eroded",s:202,offsetX:0}]},{id:"escort-w1",sectionId:"s10",triggerId:"escort-start",enemies:[{kind:"shadow-hound",id:"esc-hound-1",s:170,offsetX:-2},{kind:"shadow-hound",id:"esc-hound-2",s:168,offsetX:2}]},{id:"wave-escort-2",sectionId:"s10",triggerId:"escort-w2",enemies:[{kind:"archer",id:"esc-archer",s:90,offsetX:4},{kind:"sword-soldier",id:"esc-blade",s:88,offsetX:-2}]}],triggers:[{id:"s1-torii",pos:Pe(24),radius:14},{id:"s2-keeper",pos:Pe(45),radius:16},{id:"s3-stairs",pos:Pe(56),radius:16},{id:"enc-a-w2",pos:Pe(68),radius:16},{id:"s4-bridge",pos:Pe(84),radius:16},{id:"s5-pool",pos:Pe(108),radius:16},{id:"enc-b-w2",pos:Pe(120),radius:16},{id:"s6-court",pos:Pe(136),radius:18},{id:"s7-inner",pos:Pe(168),radius:16},{id:"s8-arena",pos:Pe(188),radius:22},{id:"s9-seal",pos:Pe(226),radius:14},{id:"escort-start",pos:Pe(226),radius:16},{id:"escort-w2",pos:Pe(100),radius:18},{id:"escort-arrive",pos:Pe(45),radius:14},{id:"light-main-lantern",pos:Pe(45),radius:10}],checkpoints:[{id:"keeper",pos:Pe(45)},{id:"inner-path",pos:Pe(170)},{id:"rescue",pos:Pe(226)},{id:"escort",pos:Pe(220)}]},$s=[{s:90,width:1.5},{s:98,width:1.5}];function Ms(i){let e=0,t=1/0;for(let n=0;n<=os;n+=2){const s=Pe(n),r=(s.x-i.x)**2+(s.z-i.z)**2;r<t&&(t=r,e=n)}return e}const Sd=18,bd=8*60,so=10*60;function rl(i){if(i.hioState!=="down")return!1;const e=i.npcs.find(t=>t.kind==="hio");return e?dt(i.player.pos,e.pos)<=3.2:!1}function Ed(i){if(!rl(i))return!1;const e=i.npcs.find(t=>t.kind==="hio");return e?(e.dead=!1,e.hp=Math.max(24,Math.round(e.maxHp*.45)),i.hioHp=e.hp,i.hioState="escorting",i.hioDownTicks=0,i.escortFailCause=null,i.pendingCues.push("revive"),!0):!1}function Td(i){const e=i.npcs.find(s=>s.kind==="hio");if(i.hioState==="down"){i.hioDownTicks+=1,e&&(i.hioHp=0,e.hp=0),i.hioDownTicks>=so&&(i.escortFailCause="hio-down");return}if(i.hioState!=="escorting"&&i.hioState!=="rescued")return;if(!e||e.dead&&e.hp<=0){i.hioState="down",i.hioHp=0,i.hioDownTicks=0;return}i.hioState==="rescued"&&(i.hioState="escorting");const t=i.player.pos,n=dt(e.pos,t);if(n>2.2){const s=(t.x-e.pos.x)/(n||1),r=(t.z-e.pos.z)/(n||1),a=Math.min(4.2/60,n-1.6);e.pos={x:e.pos.x+s*a,y:e.pos.y,z:e.pos.z+r*a}}n>Sd?i.hioOutOfBoundsTicks+=1:i.hioOutOfBoundsTicks=Math.max(0,i.hioOutOfBoundsTicks-2),i.hioOutOfBoundsTicks>=bd&&(i.escortFailCause="escort-bounds"),dt(e.pos,Cn)<=4&&dt(i.player.pos,Cn)<=6&&(i.triggersFired.includes("escort-arrive")||i.triggersFired.push("escort-arrive")),i.hioHp=e.hp}function wd(i){return i.escortFailCause!==null}function ca(i){let e=100;return e-=Math.min(40,i.stats.damageTaken*.4),e-=Math.min(20,i.stats.timeTicks/60/18),e+=i.stats.lanternsSaved*6,e+=Math.min(15,i.hioHp/i.hioMaxHp*15),e+=Math.min(10,i.stats.perfectDodges),e>=90?"S":e>=75?"A":e>=55?"B":"C"}const yr={archive:["archive.hio.rescue","archive.boss.rain-eroded","archive.region.rainbound","archive.rin","archive.kuzuha.teaser"],modules:["module.pin-rain","module.iron-breath"],flags:["story.rainbound.cleared","story.kuzuha.teaser"]};function Ad(i,e){if(e.rewardsCommitted)return{rank:i.clearedMissions[e.missionId]?.bestRank??ca(e),firstClear:!1};e.rewardsCommitted=!0;const t=ca(e),n=i.clearedMissions[e.missionId],s=!n,r={C:0,B:1,A:2,S:3},a=n&&r[n.bestRank]>r[t]?n.bestRank:t,o=n?Math.min(n.bestTimeTicks,e.stats.timeTicks):e.stats.timeTicks;i.clearedMissions[e.missionId]={bestRank:a,bestTimeTicks:o,clears:(n?.clears??0)+1};const c=(l,d)=>{l.includes(d)||l.push(d)};c(i.unlockedCharacters,"character.rin.gameplay");for(const l of yr.archive)c(i.unlockedArchiveEntries,l);for(const l of yr.modules)c(i.unlockedModules,l);for(const l of yr.flags)c(i.seenStoryFlags,l);return{rank:t,firstClear:s}}const Rd="heroines-fate-rainlocked-tps.save.v1",si={masterVolume:.8,musicVolume:.6,sfxVolume:.8,shake:.5,sensitivity:1,invertY:!1,reducedMotion:!1};function la(){return{unlockedCharacters:["character.rin.gameplay"],unlockedArchiveEntries:[],seenStoryFlags:[],unlockedModules:["module.moon-return","module.focus","module.lantern-guard"],clearedMissions:{}}}function Zn(){const i=la();return{version:1,settings:{...si},clearedMissions:{},unlockedCharacters:[...i.unlockedCharacters],unlockedArchiveEntries:[],seenStoryFlags:[],unlockedModules:[...i.unlockedModules]}}function Cd(i){if(!i||typeof i!="object")return!1;const e=i;return e.version===1&&typeof e.settings=="object"&&e.settings!==null}function Ho(i){const e=i&&typeof i=="object"?i:{};return{masterVolume:Yi(e.masterVolume,si.masterVolume),musicVolume:Yi(e.musicVolume,si.musicVolume),sfxVolume:Yi(e.sfxVolume,si.sfxVolume),shake:Yi(e.shake,si.shake),sensitivity:Yi(e.sensitivity,si.sensitivity),invertY:!!e.invertY,reducedMotion:!!e.reducedMotion}}function Yi(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}function _i(i){return Array.isArray(i)?i.filter(e=>typeof e=="string"):[]}function al(i){if(i==null)return{save:Zn(),reason:"missing",migrated:!0};if(typeof i=="string")try{return al(JSON.parse(i))}catch{return{save:Zn(),reason:"corrupt-json",migrated:!0}}if(typeof i!="object")return{save:Zn(),reason:"corrupt-type",migrated:!0};const e=i;if(e.version===0||e.version===void 0&&Array.isArray(e.unlocked)){const n=Zn();return n.unlockedCharacters=_i(e.unlocked).length?_i(e.unlocked):n.unlockedCharacters,n.settings=Ho(e.settings),{save:n,reason:"migrated-v0",migrated:!0}}if(!Cd(i))return{save:Zn(),reason:"corrupt-schema",migrated:!0};const t={version:1,settings:Ho(e.settings),clearedMissions:e.clearedMissions&&typeof e.clearedMissions=="object"?e.clearedMissions:{},unlockedCharacters:_i(e.unlockedCharacters),unlockedArchiveEntries:_i(e.unlockedArchiveEntries),seenStoryFlags:_i(e.seenStoryFlags),unlockedModules:_i(e.unlockedModules)};return t.unlockedCharacters.length===0&&(t.unlockedCharacters=Zn().unlockedCharacters),(!t.unlockedModules||t.unlockedModules.length===0)&&(t.unlockedModules=Zn().unlockedModules),{save:t,reason:null,migrated:!1}}function Pd(i,e=0){const t=50+e;return{id:"player-rin",kind:"player",team:"player",pos:{...i},yaw:0,hp:Uo,maxHp:Uo,guard:t,maxGuard:t,iFrames:0,damageCooldown:0,poiseBreakTimer:0,dead:!1,attack:null,stamina:100,maxStamina:100,radius:.35,height:1.69,speed:6.8}}function Dd(i,e=0){const t=80+e;return{id:"npc-hio",kind:"hio",team:"npc",pos:{...i},yaw:Math.PI,hp:t,maxHp:t,guard:20,maxGuard:20,iFrames:0,damageCooldown:0,poiseBreakTimer:0,dead:!1,attack:null,stamina:100,maxStamina:100,radius:.34,height:1.62,speed:4.2}}function Ld(i){return{id:"npc-keeper",kind:"keeper",team:"npc",pos:{...i},yaw:0,hp:999,maxHp:999,guard:999,maxGuard:999,iFrames:9999,damageCooldown:0,poiseBreakTimer:0,dead:!1,attack:null,stamina:100,maxStamina:100,radius:.4,height:1.7,speed:0}}const Go={"sword-soldier":{hp:35,guard:25,radius:.38,height:1.7,speed:3.4},archer:{hp:28,guard:15,radius:.36,height:1.65,speed:2.8},caster:{hp:40,guard:20,radius:.4,height:1.7,speed:2.4},"shadow-hound":{hp:22,guard:12,radius:.42,height:.7,speed:6.2},"lantern-hunter":{hp:150,guard:60,radius:.48,height:2,speed:3.6},boss:{hp:800,guard:120,radius:.7,height:2.4,speed:3.2},dummy:{hp:20,guard:0,radius:.35,height:1.6,speed:0}};function da(i,e,t){const n=Go[e]??Go["sword-soldier"];return{id:i,kind:e,team:"enemy",pos:{...t},yaw:0,hp:n.hp,maxHp:n.hp,guard:n.guard,maxGuard:n.guard,iFrames:0,damageCooldown:0,poiseBreakTimer:0,dead:!1,attack:null,stamina:100,maxStamina:100,radius:n.radius,height:n.height,speed:n.speed}}const Ki={dodge:28,q:45*2,r:50,f:60*12,primaryChainWindow:36},Id={end:10};class ro{staticBoxes=[];velY=0;coyote=0;reset(){this.staticBoxes=[],this.velY=0,this.coyote=0}addStaticBox(e,t,n){this.staticBoxes.push({id:e,center:t,half:n})}boxes(){return this.staticBoxes}raycast(e,t,n){let s=n;for(let r=.1;r<n;r+=.15){const a={x:e.x+t.x*r,y:e.y+t.y*r,z:e.z+t.z*r};for(const o of this.staticBoxes)if(Math.abs(a.x-o.center.x)<=o.half.x&&Math.abs(a.y-o.center.y)<=o.half.y&&Math.abs(a.z-o.center.z)<=o.half.z)return r}return s}moveCharacter(e,t,n,s,r){let a=n.x,o=n.z,c=t.y;this.velY-=20*(1/60),c+=this.velY*(1/60);let l=!1,d=!1;const h=this.groundAt(a,o,s);return c<=h?(c=h,this.velY=0,l=!0,this.coyote=6):this.coyote-=1,c<h-6&&(d=!0,c=h,this.velY=0,l=!0),{pos:{x:a,y:c,z:o},grounded:l,fell:d}}groundAt(e,t,n){let s=-20;for(const r of this.staticBoxes)if(Math.abs(e-r.center.x)<=r.half.x+n&&Math.abs(t-r.center.z)<=r.half.z+n){const a=r.center.y+r.half.y;a>s&&(s=a)}return s}}const cs=()=>({moveX:0,moveZ:0,lookDeltaYaw:0,lookDeltaPitch:0,primary:!1,secondary:!1,dodge:!1,ability1:!1,ability2:!1,ultimate:!1,interact:!1,lockOn:!1,pause:!1,confirm:!1,cancel:!1});function Jn(i,e,t){return{x:i,y:e,z:t}}function Sr(i,e){const t=Ks.waves.find(n=>n.id===e);if(t&&!i.encounterWaves[e]){i.encounterWaves[e]=i.tick;for(const n of t.enemies){if(i.enemies.some(r=>r.id===n.id))continue;const s=Pe(n.s);s.x+=n.offsetX,i.enemies.push(da(n.id,n.kind,s))}}}class Ud{state;rng;physics;allowDebug;cd={dodge:0,q:0,r:0,f:0,primaryChain:0,combo:0};primaryStep=0;prev=cs();events=[];constructor(e){const t=e?.seed??20260903;this.rng=new id(t),this.physics=e?.physics??new ro,this.allowDebug=e?.allowDebug??!0;const n=al(e?.saved??null);this.state={schemaVersion:1,phase:"loading",run:null,meta:{...la(),unlockedCharacters:n.save.unlockedCharacters,unlockedArchiveEntries:n.save.unlockedArchiveEntries,seenStoryFlags:n.save.seenStoryFlags,unlockedModules:n.save.unlockedModules??la().unlockedModules,clearedMissions:n.save.clearedMissions},settings:n.save.settings??{...si},loadStage:"boot-ui",loadProgress:0,loadError:null,selectedModule:"module.moon-return"}}setPhase(e){this.state.phase=e}finishLoading(){(this.state.phase==="loading"||this.state.phase==="error")&&(this.state.loadStage="ready",this.state.phase="title")}failLoading(e,t){this.state.phase="error",this.state.loadError=`${e}:${t}`}startRun(e){const t=e??this.state.selectedModule;this.state.selectedModule=t;const n=oa(t),s=Pd(Ys,n.maxGuardBonus),r=Dd(Fi,n.hioHpBonus),a=Ld(Cn),o=Math.round(80*n.lanternHpMul),c={seed:this.rng.seed,tick:0,missionId:"rainbound-shrine",objective:"enterShrine",completedObjectives:[],player:s,resolve:0,maxResolve:100,enemies:[da("tut-dummy","dummy",Pe(22))],npcs:[r,a],projectiles:[],hazards:[],lanterns:[0,1,2].map(d=>{const h=Pe(148);return h.x+=(d-1)*5,{id:`lantern-${d}`,pos:h,hp:o,maxHp:o,lit:!0}}),bindingsCut:0,hioState:"bound",hioHp:r.hp,hioMaxHp:r.maxHp,hioOutOfBoundsTicks:0,bossPhase:1,bossTransitionDone:!1,nodesDestroyed:0,nodes:[-8,0,8].map((d,h)=>({id:`node-${h}`,pos:{x:qs.x+d,y:qs.y,z:qs.z-4},hp:40,destroyed:!1})),martialModule:t,inLevelModule:null,ownedModules:[t],pendingModuleChoices:[],checkpointId:"spawn",lastStablePos:{...Ys},defeatCause:null,escortFailCause:null,rewardsCommitted:!1,stats:{damageTaken:0,damageDealt:0,perfectDodges:0,comboMax:0,timeTicks:0,lanternsSaved:0},triggersFired:[],encounterWaves:{},cameraYaw:0,cameraPitch:.18,lockOnId:null,introTicks:10*60,ultimateLock:!1,tutorialDummyAlive:!0,casterPuddlesCleansed:!1,summonedOnce:!1,moduleChoiceOpen:!1,story:pd(),keeperTalked:!1,hitstopTicks:0,juiceTick:0,combatFloaters:[],hioDownTicks:0,pendingCues:[]};this.state.run=c,this.physics.reset();const l={x:6.25,y:.225,z:4.1};for(let d=0;d<=os;d+=4){if($s.some(u=>Math.abs(d-u.s)<u.width))continue;const h=Pe(d);this.physics.addStaticBox(`path-${d}`,{x:h.x,y:h.y-.2,z:h.z},l)}this.physics.addStaticBox("kill-floor",{x:0,y:-8,z:-110},{x:120,y:.5,z:280}),this.cd={dodge:0,q:0,r:0,f:0,primaryChain:0,combo:0},this.primaryStep=0,this.state.phase="intro"}skipIntro(){this.state.run&&(this.state.run.introTicks=0,vd(this.state.run),this.state.phase==="intro"&&(this.state.phase="playing"),zo(this.state.run,this.state.run.objective))}advanceIntro(){const e=this.state.run;return!e||this.state.phase!=="intro"?!1:(xd(e)==="done"&&this.skipIntro(),!0)}advanceStory(){const e=this.state.run;return e?this.state.phase==="intro"?this.advanceIntro():as(e):!1}skipStory(){const e=this.state.run;if(e){if(this.state.phase==="intro"){this.skipIntro();return}Oo(e)}}pushCue(e){const t=this.state.run;t&&t.pendingCues.push(e)}pause(){(this.state.phase==="playing"||this.state.phase==="rescue"||this.state.phase==="escort")&&(this.state.phase="paused",this.prev={...this.prev,pause:!0})}resume(){if(this.state.phase==="paused"&&this.state.run){const e=this.state.run.objective;e==="cutBindings"||e==="exposeBindingCore"?this.state.phase="rescue":e==="escortHioToKeeper"||e==="hioRescued"?this.state.phase="escort":this.state.phase="playing"}}restartMission(){this.startRun(this.state.selectedModule),this.skipIntro()}retryCheckpoint(){const e=this.state.run;if(!e)return;const t=Ks.checkpoints.find(n=>n.id===e.checkpointId)??{pos:Ys};if(e.player.hp=e.player.maxHp,e.player.dead=!1,e.player.guard=e.player.maxGuard,e.player.pos={...t.pos},e.player.attack=null,e.defeatCause=null,e.escortFailCause=null,e.checkpointId==="escort"||e.checkpointId==="rescue"){const n=e.enemies.find(s=>s.kind==="boss");n&&(n.dead=!0,n.hp=0)}if(e.checkpointId==="escort"){e.hioState="rescued",e.bindingsCut=3;const n=e.npcs.find(s=>s.kind==="hio");n&&(n.dead=!1,n.hp=n.maxHp,n.pos={...Fi}),e.hioHp=e.hioMaxHp,e.enemies=e.enemies.filter(s=>s.kind==="boss"||!s.id.startsWith("esc-")),delete e.encounterWaves["escort-w1"],delete e.encounterWaves["escort-w2"]}this.state.phase=e.checkpointId==="escort"?"escort":"playing"}step(e=cs()){const t=this.state.phase;if(t==="loading"||t==="title"||t==="loadout"||t==="result"||t==="error"){this.prev=e;return}if(t==="paused"){e.pause&&!this.prev.pause&&this.resume(),this.prev=e;return}const n=this.state.run;if(!n)return;if(t==="intro"){n.introTicks-=1,e.cancel&&!this.prev.cancel?this.skipIntro():e.confirm&&!this.prev.confirm||e.interact&&!this.prev.interact?this.advanceIntro():n.introTicks<=0&&this.skipIntro(),this.prev=e;return}if(n.moduleChoiceOpen){this.prev=e;return}if(Ni(n)){n.juiceTick+=1,Bo(n),e.confirm&&!this.prev.confirm||e.interact&&!this.prev.interact?as(n):e.cancel&&!this.prev.cancel&&Oo(n),n.keeperTalked&&n.objective==="meetKeeper"&&Mr(n),this.syncPhase(n),this.prev=e;return}if(e.pause&&!this.prev.pause){this.pause(),this.prev=e;return}if(n.hitstopTicks>0){n.hitstopTicks-=1,n.juiceTick+=1,this.tickFloaters(n),this.prev=e;return}n.tick+=1,n.stats.timeTicks+=1,n.juiceTick+=1,this.tickCooldowns(),this.tickLook(n,e),this.tickPlayer(n,e),this.tickTriggers(n),this.tickWaves(n),this.tickEnemies(n),this.tickProjectiles(n),this.tickHazards(n),this.tickBoss(n),this.tickRescueInteract(n,e),(n.hioState==="rescued"||n.hioState==="escorting"||n.hioState==="down")&&Td(n);const s=n.objective;Mr(n),n.objective!==s&&zo(n,n.objective),Bo(n),this.tickFloaters(n),this.syncPhase(n),this.checkFail(n),this.prev=e}advanceTime(e){const t=Math.max(0,Math.round(e/1e3*el));for(let n=0;n<t;n++)this.step(cs())}setSeed(e){this.rng.setSeed(e),this.state.run&&(this.state.run.seed=e>>>0)}snapshot(){const e=this.state.run;return{schemaVersion:this.state.schemaVersion,phase:this.state.phase,tick:e?.tick??0,seed:e?.seed??this.rng.seed,objective:e?.objective??null,completedObjectives:e?.completedObjectives??[],player:e?{hp:e.player.hp,maxHp:e.player.maxHp,guard:e.player.guard,pos:{...e.player.pos},iFrames:e.player.iFrames,dead:e.player.dead}:null,enemies:(e?.enemies??[]).map(t=>({id:t.id,kind:t.kind,hp:t.hp,dead:t.dead,pos:{...t.pos},attackPhase:t.attack?.phase??null})),npc:(e?.npcs??[]).map(t=>({id:t.id,kind:t.kind,hp:t.hp,pos:{...t.pos}})),bindingsCut:e?.bindingsCut??0,hioState:e?.hioState??null,bossPhase:e?.bossPhase??0,nodesDestroyed:e?.nodesDestroyed??0,lanterns:e?.lanterns??[],entityCounts:{enemies:e?.enemies.length??0,projectiles:e?.projectiles.length??0,hazards:e?.hazards.length??0},checkpointId:e?.checkpointId??null,rewardsCommitted:e?.rewardsCommitted??!1,loadStage:this.state.loadStage,selectedModule:this.state.selectedModule,moduleChoiceOpen:e?.moduleChoiceOpen??!1,ownedModules:e?.ownedModules??[],pendingModuleChoices:e?.pendingModuleChoices??[],storyFlags:e?.story.flags??[],keeperTalked:e?.keeperTalked??!1,storyBlocking:Ni(e),hitstopTicks:e?.hitstopTicks??0,floaterCount:e?.combatFloaters.length??0,hioDownTicks:e?.hioDownTicks??0}}debugTeleport(e){!this.allowDebug||!this.state.run||(this.state.run.player.pos={...e},this.state.run.lastStablePos={...e})}debugKill(e){if(!this.allowDebug||!this.state.run)return;const t=this.state.run.enemies.find(n=>n.id===e);t&&(t.hp=0,t.dead=!0)}debugDamage(e,t){if(!this.allowDebug||!this.state.run)return;const n=this.state.run.enemies.find(s=>s.id===e)??(this.state.run.player.id===e?this.state.run.player:null);n&&On(n,{damage:t,guardDamage:t,poiseBreakTicks:20})}tickCooldowns(){for(const e of Object.keys(this.cd))this.cd[e]>0&&(this.cd[e]-=1)}tickLook(e,t){e.cameraYaw+=t.lookDeltaYaw,e.cameraPitch=Math.max(-.12,Math.min(.38,e.cameraPitch+t.lookDeltaPitch));const n=e.enemies.filter(s=>!s.dead);if(t.lockOn&&!this.prev.lockOn)if(e.lockOnId)e.lockOnId=null;else{let s=null,r=28;for(const a of n){const o=dt(e.player.pos,a.pos);o<r&&(r=o,s=a)}e.lockOnId=s?.id??null}if(e.lockOnId){const s=n.find(r=>r.id===e.lockOnId);s?e.player.yaw=Math.atan2(s.pos.x-e.player.pos.x,-(s.pos.z-e.player.pos.z)):e.lockOnId=null}}tickPlayer(e,t){const n=e.player;if(Fo(n),ko(n),n.dead||n.poiseBreakTimer>0)return;const s=e.cameraYaw,r=Math.sin(s),a=-Math.cos(s),o=Math.cos(s),c=Math.sin(s);let l=r*t.moveZ+o*t.moveX,d=a*t.moveZ+c*t.moveX;const h=Math.hypot(l,d);h>1&&(l/=h,d/=h);const f=n.attack&&n.attack.phase!=="recovery"?n.speed*.35:n.speed,g=Jn(n.pos.x+l*f*rn,n.pos.y,n.pos.z+d*f*rn),v=this.physics.moveCharacter(n.id,n.pos,g,n.radius,n.height);let m=v.pos,p=v.grounded;const T=Math.hypot(g.x-n.pos.x,g.z-n.pos.z),A=Math.hypot(m.x-n.pos.x,m.z-n.pos.z);if(T>.04&&A<T*.2){const S=this.physics.moveCharacter(n.id,n.pos,Jn(g.x,n.pos.y,n.pos.z),n.radius,n.height),R=this.physics.moveCharacter(n.id,n.pos,Jn(n.pos.x,n.pos.y,g.z),n.radius,n.height),x=Math.hypot(S.pos.x-n.pos.x,S.pos.z-n.pos.z),b=Math.hypot(R.pos.x-n.pos.x,R.pos.z-n.pos.z);x>=b&&x>A?(m=S.pos,p=S.grounded):b>A&&(m=R.pos,p=R.grounded)}if(n.pos=m,p){const S=Ms(n.pos);if(!$s.some(x=>Math.abs(S-x.s)<x.width*.5)){const b=Pe(S).y+.025,P=n.pos.x-Pe(S).x,C=n.pos.z-Pe(S).z;P*P+C*C<7*7&&(n.pos.y+=(b-n.pos.y)*.45)}e.lastStablePos={...n.pos}}v.fell&&(n.pos={...e.lastStablePos},On(n,{damage:8,guardDamage:0,poiseBreakTicks:0}),e.stats.damageTaken+=8),h>.1&&!e.lockOnId&&(n.yaw=Math.atan2(l,-d));const y=()=>{e.lockOnId||(n.yaw=h>.1?Math.atan2(l,-d):e.cameraYaw)};if(t.dodge&&!this.prev.dodge&&this.cd.dodge<=0&&n.stamina>=25){this.cd.dodge=Ki.dodge,n.stamina-=25,xr(n,Id.end);const S=h>.1?l:Math.sin(n.yaw),R=h>.1?d:-Math.cos(n.yaw),x=Jn(n.pos.x+S*2.4,n.pos.y,n.pos.z+R*2.4),b=this.physics.moveCharacter(n.id,n.pos,x,n.radius,n.height);n.pos=b.pos,b.grounded&&(e.lastStablePos={...n.pos}),e.stats.perfectDodges+=1,e.resolve=Math.min(e.maxResolve,e.resolve+6)}if(t.primary&&!this.prev.primary&&!n.attack&&(y(),this.cd.primaryChain<=0&&(this.primaryStep=0),en(n,["rin.primary.1","rin.primary.2","rin.primary.3"][this.primaryStep]??"rin.primary.1"),this.primaryStep=(this.primaryStep+1)%3,this.cd.primaryChain=Ki.primaryChainWindow,e.pendingCues.push("slash")),t.secondary&&!this.prev.secondary&&!n.attack){const S=this.findAutoAimTarget(e);S?this.aimPlayerAt(e,S):y(),en(n,"rin.secondary"),this.firePlayerShot(e)}if(t.ability1&&!this.prev.ability1&&this.cd.q<=0&&!n.attack&&(y(),this.cd.q=Ki.q,en(n,"rin.q")),t.ability2&&!this.prev.ability2&&this.cd.r<=0&&!n.attack){y(),this.cd.r=Ki.r,en(n,"rin.r");{const S=Jn(n.pos.x+Math.sin(n.yaw)*5,n.pos.y,n.pos.z-Math.cos(n.yaw)*5),R=this.physics.moveCharacter(n.id,n.pos,S,n.radius,n.height);n.pos=R.pos,R.grounded&&(e.lastStablePos={...n.pos})}xr(n,8)}t.ultimate&&!this.prev.ultimate&&this.cd.f<=0&&e.resolve>=80&&!n.attack&&(y(),this.cd.f=Ki.f,e.resolve=0,en(n,"rin.f")),this.resolvePlayerContact(e);const w=Ms(n.pos);for(const S of $s)Math.abs(w-S.s)<S.width*.5&&n.pos.y<Pe(S.s).y-.4&&(n.pos={...e.lastStablePos},On(n,{damage:8,guardDamage:0,poiseBreakTicks:0}),e.stats.damageTaken+=8)}findAutoAimTarget(e,t=30){const n=e.player,s=e.lockOnId?n.yaw:e.cameraYaw,r=Math.sin(s),a=-Math.cos(s);let o=null,c=1/0;for(const l of e.enemies){if(l.dead)continue;const d=l.pos.x-n.pos.x,h=l.pos.z-n.pos.z,u=Math.hypot(d,h);if(u<.5||u>t)continue;const f=d/u,g=h/u,v=f*r+g*a;if(v<.55)continue;const m=u*(2.2-v);m<c&&(c=m,o=l)}if(e.lockOnId){const l=e.enemies.find(d=>d.id===e.lockOnId&&!d.dead);if(l){const d=l.pos.x-n.pos.x,h=l.pos.z-n.pos.z,u=Math.hypot(d,h)||1;if(d/u*r+h/u*a>=.35&&u<=t)return l}}return o}aimPlayerAt(e,t){const n=e.player,s=t.pos.x-n.pos.x,r=t.pos.z-n.pos.z;Math.hypot(s,r)<.05||(n.yaw=Math.atan2(s,-r))}firePlayerShot(e){const t=e.player,n=vs(e.ownedModules),s=this.findAutoAimTarget(e);s&&this.aimPlayerAt(e,s);const r={x:Math.sin(t.yaw),y:0,z:-Math.cos(t.yaw)};if(s){const a=s.pos.x-t.pos.x,o=s.pos.y+1.15-(t.pos.y+1.25),c=s.pos.z-t.pos.z,l=Math.hypot(a,o,c)||1;r.x=a/l,r.y=o/l,r.z=c/l}e.projectiles.push({id:`proj-p-${e.tick}`,ownerId:t.id,team:"player",pos:{x:t.pos.x+r.x*.55,y:t.pos.y+1.25,z:t.pos.z+r.z*.55},dir:r,speed:48,damage:10+n.meleeBonus*.25,guardDamage:18*n.guardShotMul,life:90,radius:.22,hits:[]}),e.pendingCues.push("shot")}resolvePlayerContact(e){const t=e.player,n=t.attack;if(!n||n.phase!=="contact"||n.shape==="ray"||n.defId==="rin.secondary")return;const s=vs(e.ownedModules),r=n.shape==="sphere"&&n.range===0?t.pos:rs(t,Math.max(.6,n.range*.6)),a=n.radius+s.meleeRange;for(const o of e.enemies)if(!o.dead&&!n.hits.includes(o.id)&&dt(r,o.pos)<=a+o.radius){const c=On(o,{damage:n.damage+s.meleeBonus,guardDamage:n.guardDamage,poiseBreakTicks:n.poiseBreakTicks,sourceId:t.id});n.hits.push(o.id),e.stats.damageDealt+=c.applied,c.applied>0&&(e.resolve=Math.min(e.maxResolve,e.resolve+3),this.noteHit(e,o.pos,c.applied,c.poiseBroken,!0))}for(const o of e.nodes)o.destroyed||dt(r,o.pos)<=a+.8&&(o.hp-=n.damage,n.hits.push(o.id),o.hp<=0&&(o.destroyed=!0,e.nodesDestroyed+=1))}tickTriggers(e){const t=Ms(e.player.pos);for(const n of Ks.triggers){if(e.triggersFired.includes(n.id))continue;const s=Ms(n.pos),r=/^(s\d|enc-)/.test(n.id)&&Math.abs(t-s)<=12;(dt(e.player.pos,n.pos)<=n.radius||r)&&e.triggersFired.push(n.id)}}tickWaves(e){const t=new Set(e.triggersFired);for(const n of Ks.waves)t.has(n.triggerId)&&(n.id.startsWith("escort")&&e.hioState!=="escorting"&&e.hioState!=="rescued"||Sr(e,n.id));e.enemies.filter(n=>n.id.startsWith("enc-a")&&!n.dead).length===0&&e.enemies.some(n=>n.id.startsWith("enc-a"))&&t.has("s3-stairs")&&Sr(e,"wave-enc-a-2"),e.enemies.filter(n=>n.id.startsWith("enc-b")&&n.kind!=="archer"&&!n.dead).length===0&&e.enemies.some(n=>n.id==="enc-b-caster"&&n.dead)&&Sr(e,"wave-enc-b-2")}tickEnemies(e){const t=e.player;let n=0;for(const s of e.enemies){if(s.dead||(Fo(s),ko(s),s.kind==="dummy")||s.poiseBreakTimer>0)continue;const r=dt(s.pos,t.pos);if(s.yaw=Math.atan2(t.pos.x-s.pos.x,-(t.pos.z-s.pos.z)),(s.kind==="sword-soldier"||s.kind==="lantern-hunter"||s.kind==="shadow-hound"||s.kind==="boss")&&r<3.2&&(n+=1),s.kind!=="boss"&&(s.kind==="sword-soldier"?(r>1.7&&n<=2&&this.steer(s,t.pos),r<2.1&&!s.attack&&en(s,"enemy.slash")):s.kind==="lantern-hunter"?r<2.4&&!s.attack&&en(s,"elite.chain"):s.kind==="shadow-hound"?(r>2.5&&this.steer(s,t.pos),r<6&&!s.attack&&en(s,"hound.dash")):s.kind==="archer"?(r<10&&this.steer(s,Jn(s.pos.x-(t.pos.x-s.pos.x),s.pos.y,s.pos.z-(t.pos.z-s.pos.z))),r<28&&!s.attack&&en(s,"enemy.arrow"),s.attack?.phase==="contact"&&!s.attack.hits.includes("shot")&&(s.attack.hits.push("shot"),this.enemyShot(e,s))):s.kind==="caster"&&(r<8&&this.steer(s,Jn(s.pos.x-(t.pos.x-s.pos.x),s.pos.y,s.pos.z-(t.pos.z-s.pos.z))),s.attack||en(s,"enemy.cast"),s.attack?.phase==="contact"&&!s.attack.hits.includes("puddle")&&(s.attack.hits.push("puddle"),e.hazards.push({id:`puddle-${e.tick}`,kind:"puddle",pos:{...t.pos},radius:2.4,damage:4,life:240,purified:!1}))),this.enemyContact(e,s),s.kind==="lantern-hunter")){let o=e.lanterns.find(l=>l.lit&&l.hp>0),c=o?dt(s.pos,o.pos):99;for(const l of e.lanterns){if(!l.lit||l.hp<=0)continue;const d=dt(s.pos,l.pos);d<c&&(o=l,c=d)}o&&c>1.4&&this.steer(s,o.pos),o&&c<2.6&&e.tick%20===0&&(o.hp-=6,e.pendingCues.push("lantern-hit"),o.hp<=0&&(o.lit=!1))}}if(e.hioState==="escorting"){const s=e.npcs.find(r=>r.kind==="hio");if(s&&!s.dead)for(const r of e.enemies)r.dead||r.kind==="boss"||r.attack?.phase==="contact"&&dt(r.pos,s.pos)<2&&!r.attack.hits.includes(s.id)&&(r.attack.hits.push(s.id),On(s,{damage:8,guardDamage:4,poiseBreakTicks:10,sourceId:r.id}),e.hioHp=s.hp,(s.dead||s.hp<=0)&&(e.hioState="down",e.hioDownTicks=0))}}steer(e,t){const n=dt(e.pos,t);if(n<.2)return;const s=(t.x-e.pos.x)/n,r=(t.z-e.pos.z)/n;e.pos.x+=s*e.speed*rn,e.pos.z+=r*e.speed*rn}enemyShot(e,t){const n={x:Math.sin(t.yaw),y:0,z:-Math.cos(t.yaw)};e.projectiles.push({id:`proj-e-${t.id}-${e.tick}`,ownerId:t.id,team:"enemy",pos:{x:t.pos.x,y:t.pos.y+1.2,z:t.pos.z},dir:n,speed:22,damage:10,guardDamage:6,life:90,radius:.2,hits:[]})}enemyContact(e,t){const n=t.attack;if(!n||n.phase!=="contact")return;const s=e.player;if(n.hits.includes(s.id))return;const r=rs(t,Math.max(.5,n.range*.5));if(dt(r,s.pos)<=n.radius+s.radius){const a=s.iFrames>0,o=On(s,{damage:n.damage,guardDamage:n.guardDamage,poiseBreakTicks:n.poiseBreakTicks,sourceId:t.id});n.hits.push(s.id),o.applied>0&&(e.stats.damageTaken+=o.applied,this.noteHit(e,s.pos,o.applied,o.poiseBroken,!1)),a&&(e.stats.perfectDodges+=1)}}tickProjectiles(e){const t=[];for(const n of e.projectiles){if(n.life-=1,n.pos.x+=n.dir.x*n.speed*rn,n.pos.y+=n.dir.y*n.speed*rn,n.pos.z+=n.dir.z*n.speed*rn,n.life<=0)continue;const s=n.team==="player"?e.enemies.filter(a=>!a.dead):[e.player];let r=!1;for(const a of s)if(!n.hits.includes(a.id)&&dt(n.pos,a.pos)<=n.radius+a.radius){const o=On(a,{damage:n.damage,guardDamage:n.guardDamage,poiseBreakTicks:16,sourceId:n.ownerId});n.hits.push(a.id),n.team==="player"?e.stats.damageDealt+=o.applied:o.applied>0&&(e.stats.damageTaken+=o.applied),o.applied>0&&this.noteHit(e,a.pos,o.applied,o.poiseBroken,n.team==="player"),r=!0}r||t.push(n)}e.projectiles=t.slice(-48)}tickHazards(e){const t=vs(e.ownedModules);for(const n of e.hazards)if(n.life-=1,!(n.purified||n.life<=0)&&dt(e.player.pos,n.pos)<=n.radius&&e.tick%20===0){const s=On(e.player,{damage:Math.round(n.damage*t.hazardMul),guardDamage:2,poiseBreakTicks:0,sourceId:n.id});e.stats.damageTaken+=s.applied}e.hazards=e.hazards.filter(n=>n.life>0&&!n.purified)}tickBoss(e){const t=e.enemies.find(r=>r.kind==="boss");if(!t||t.dead||(!e.bossTransitionDone&&t.hp<=No*nd&&(e.bossPhase=2,e.bossTransitionDone=!0,xr(t,90),t.attack=null,this.emit("boss-phase-2")),t.poiseBreakTimer>0||t.iFrames>40))return;if(t.attack){this.enemyContact(e,t);return}const n=e.bossPhase===1?["boss.triple1","boss.triple2","boss.triple3","boss.chop","boss.rain-arrow"]:["boss.clone-cut","boss.wave","boss.thunder","boss.triple3"],s=Math.floor(e.tick/90)%n.length;en(t,n[s]),e.bossPhase===1&&!e.summonedOnce&&t.hp<No*.7&&(e.summonedOnce=!0,e.enemies.push(da("boss-summon-1","sword-soldier",{x:t.pos.x+3,y:t.pos.y,z:t.pos.z})))}tickRescueInteract(e,t){if(!(t.interact&&!this.prev.interact))return;const n=vs(e.ownedModules);if(n.interactHeal&&e.player.hp<e.player.maxHp&&(e.player.hp=Math.min(e.player.maxHp,e.player.hp+n.interactHeal)),e.objective==="meetKeeper"&&!e.keeperTalked&&dt(e.player.pos,Cn)<4.5&&md(e)){e.pendingCues.push("keeper");return}if(e.hioState==="down"&&rl(e)){Ed(e);return}(e.objective==="exposeBindingCore"||e.objective==="cutBindings")&&(sl(e)||dt(e.player.pos,Fi)<2.8)&&Md(e),(e.objective==="escortHioToKeeper"||e.objective==="missionComplete"||e.triggersFired.includes("escort-arrive"))&&dt(e.player.pos,Cn)<8&&e.hioState!=="down"&&(e.triggersFired.includes("light-main-lantern")||(e.triggersFired.push("light-main-lantern"),e.pendingCues.push("lantern")),Mr(e),(e.completedObjectives.includes("escortHioToKeeper")||e.objective==="missionComplete")&&(It(e,"missionComplete"),this.finishMission(e)))}finishMission(e){Ad(this.state.meta,e),this.state.phase="result"}syncPhase(e){this.state.phase==="result"||this.state.phase==="defeat"||(e.objective==="cutBindings"||e.objective==="exposeBindingCore"?this.state.phase="rescue":e.objective==="hioRescued"||e.objective==="escortHioToKeeper"?this.state.phase="escort":e.objective==="missionComplete"?this.finishMission(e):this.state.phase!=="paused"&&(this.state.phase="playing"))}checkFail(e){(e.player.dead||e.player.hp<=0)&&(e.player.dead=!0,e.defeatCause=e.defeatCause??"player-hp",this.state.phase="defeat"),wd(e)&&this.state.phase!=="defeat"&&(this.state.phase="defeat",e.defeatCause=e.escortFailCause)}pickInLevelModule(e){const t=this.state.run;if(!t||!t.moduleChoiceOpen||!t.pendingModuleChoices.includes(e)||t.ownedModules.includes(e))return!1;t.ownedModules.push(e),t.inLevelModule=e,t.moduleChoiceOpen=!1,t.pendingModuleChoices=[];const n=oa(e);if(t.player.maxGuard+=n.maxGuardBonus,t.player.guard=Math.min(t.player.maxGuard,t.player.guard+n.maxGuardBonus),n.hioHpBonus){t.hioMaxHp+=n.hioHpBonus,t.hioHp+=n.hioHpBonus;const s=t.npcs.find(r=>r.kind==="hio");s&&(s.maxHp+=n.hioHpBonus,s.hp+=n.hioHpBonus)}if(n.lanternHpMul>1)for(const s of t.lanterns){const r=Math.round(s.maxHp*(n.lanternHpMul-1));s.maxHp+=r,s.hp+=r}return this.emit("module-picked",e),!0}noteHit(e,t,n,s,r){e.combatFloaters.push({id:`floater-${e.juiceTick}-${e.combatFloaters.length}`,pos:{x:t.x,y:t.y+1.55,z:t.z},text:String(n),kind:"damage",born:e.juiceTick,life:48}),s&&e.combatFloaters.push({id:`floater-poise-${e.juiceTick}-${e.combatFloaters.length}`,pos:{x:t.x+.25,y:t.y+1.85,z:t.z},text:"韌破",kind:"poise",born:e.juiceTick,life:54}),r?(e.hitstopTicks=Math.max(e.hitstopTicks,n>=18?3:2),e.pendingCues.push("hit")):e.pendingCues.push("hurt"),e.combatFloaters.length>24&&e.combatFloaters.splice(0,e.combatFloaters.length-24)}tickFloaters(e){e.combatFloaters=e.combatFloaters.filter(t=>e.juiceTick-t.born<t.life)}emit(e,t){this.events.push({type:e,at:this.state.run?.tick??0,data:t}),this.events.length>64&&this.events.shift()}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ao="185",Nd=0,Vo=1,Fd=2,Zs=1,kd=2,is=3,Ln=0,Vt=1,Ut=2,Pn=0,hi=1,ki=2,Wo=3,Xo=4,Od=5,ri=100,Bd=101,zd=102,Hd=103,Gd=104,Vd=200,Wd=201,Xd=202,qd=203,ha=204,ua=205,Yd=206,Kd=207,$d=208,Zd=209,Jd=210,Qd=211,jd=212,eh=213,th=214,fa=0,pa=1,ma=2,zi=3,ga=4,_a=5,xa=6,va=7,ol=0,nh=1,ih=2,vn=0,cl=1,ll=2,dl=3,oo=4,hl=5,ul=6,fl=7,co=300,ui=301,Hi=302,br=303,Er=304,hr=306,Mn=1e3,Ft=1001,Ma=1002,At=1003,sh=1004,ys=1005,kt=1006,Tr=1007,ci=1008,Zt=1009,pl=1010,ml=1011,ls=1012,lo=1013,Sn=1014,_n=1015,In=1016,ho=1017,uo=1018,ds=1020,gl=35902,_l=35899,xl=1021,vl=1022,on=1023,Un=1026,li=1027,Ml=1028,fo=1029,fi=1030,po=1031,mo=1033,Js=33776,Qs=33777,js=33778,er=33779,ya=35840,Sa=35841,ba=35842,Ea=35843,Ta=36196,wa=37492,Aa=37496,Ra=37488,Ca=37489,ir=37490,Pa=37491,Da=37808,La=37809,Ia=37810,Ua=37811,Na=37812,Fa=37813,ka=37814,Oa=37815,Ba=37816,za=37817,Ha=37818,Ga=37819,Va=37820,Wa=37821,Xa=36492,qa=36494,Ya=36495,Ka=36283,$a=36284,sr=36285,Za=36286,rh=3200,Ja=0,ah=1,Xn="",vt="srgb",rr="srgb-linear",ar="linear",Ze="srgb",xi=7680,qo=519,oh=512,ch=513,lh=514,go=515,dh=516,hh=517,_o=518,uh=519,Yo=35044,Ko="300 es",xn=2e3,hs=2001;function fh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ph(){const i=us("canvas");return i.style.display="block",i}const $o={};function Zo(...i){const e="THREE."+i.shift();console.log(e,...i)}function yl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Re(...i){i=yl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=yl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Oi(...i){const e=i.join(" ");e in $o||($o[e]=!0,Re(...i))}function mh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const gh={[fa]:pa,[ma]:xa,[ga]:va,[zi]:_a,[pa]:fa,[xa]:ma,[va]:ga,[_a]:zi};class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wr=Math.PI/180,Qa=180/Math.PI;function ms(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function _h(i,e){return(i%e+e)%e}function Ar(i,e,t){return(1-t)*i+t*e}function $i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ht(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Be{static{Be.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],h=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(h!==v||c!==u||l!==f||d!==g){let m=c*u+l*f+d*g+h*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const T=Math.acos(m),A=Math.sin(T);p=Math.sin(p*T)/A,o=Math.sin(o*T)/A,c=c*p+u*o,l=l*p+f*o,d=d*p+g*o,h=h*p+v*o}else{c=c*p+u*o,l=l*p+f*o,d=d*p+g*o,h=h*p+v*o;const T=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=T,l*=T,d*=T,h*=T}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],h=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*h+c*f-l*u,e[t+1]=c*g+d*u+l*h-o*f,e[t+2]=l*g+d*f+o*u-c*h,e[t+3]=d*g-o*h-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),h=o(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"YXZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"ZXY":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"ZYX":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"YZX":this._x=u*d*h+l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h-u*f*g;break;case"XZY":this._x=u*d*h-l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h+u*f*g;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(d-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+d)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{static{U.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),d=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*d,this.y=n+c*d+o*l-r*h,this.z=s+c*h+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Rr.copy(this).projectOnVector(e),this.sub(Rr)}reflect(e){return this.sub(Rr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new U,Jo=new Wi;class De{static{De.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],h=n[7],u=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],A=s[4],y=s[7],w=s[2],S=s[5],R=s[8];return r[0]=a*v+o*T+c*w,r[3]=a*m+o*A+c*S,r[6]=a*p+o*y+c*R,r[1]=l*v+d*T+h*w,r[4]=l*m+d*A+h*S,r[7]=l*p+d*y+h*R,r[2]=u*v+f*T+g*w,r[5]=u*m+f*A+g*S,r[8]=u*p+f*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=d*a-o*l,u=o*c-d*r,f=l*r-a*c,g=t*h+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(s*l-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(d*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Cr.makeScale(e,t)),this}rotate(e){return Oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Cr.makeRotation(-e)),this}translate(e,t){return Oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new De,Qo=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jo=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xh(){const i={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xn?ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[rr]:{primaries:e,whitePoint:n,transfer:ar,toXYZ:Qo,fromXYZ:jo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vt},outputColorSpaceConfig:{drawingBufferColorSpace:vt}},[vt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:Qo,fromXYZ:jo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vt}}}),i}const He=xh();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class vh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=us("canvas")),vi.width=e.width,vi.height=e.height;const s=vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=us("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Dn(t[n]/255)*255):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mh=0;class xo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=ms(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Pr(s[a].image)):r.push(Pr(s[a]))}else r=Pr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Pr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let yh=0;const Dr=new U;class Rt extends pi{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Ft,s=Ft,r=kt,a=ci,o=on,c=Zt,l=Rt.DEFAULT_ANISOTROPY,d=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=ms(),this.name="",this.source=new xo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Dr).x}get height(){return this.source.getSize(Dr).y}get depth(){return this.source.getSize(Dr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==co)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mn:e.x=e.x-Math.floor(e.x);break;case Ft:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mn:e.y=e.y-Math.floor(e.y);break;case Ft:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=co;Rt.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,y=(f+1)/2,w=(p+1)/2,S=(d+u)/4,R=(h+v)/4,x=(g+m)/4;return A>y&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=S/n,r=R/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=S/s,r=x/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=x/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(h-v)/T,this.z=(u-d)/T,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sh extends pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Rt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new xo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends Sh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sl extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=At,this.minFilter=At,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class st{static{st.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,d,h,u,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,d,h,u,f,g,v,m)}set(e,t,n,s,r,a,o,c,l,d,h,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Mi.setFromMatrixColumn(e,0).length(),r=1/Mi.setFromMatrixColumn(e,1).length(),a=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,f=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*d,f=c*h,g=l*d,v=l*h;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*d,f=c*h,g=l*d,v=l*h;t[0]=u-v*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*d,f=a*h,g=o*d,v=o*h;t[0]=c*d,t[4]=g*l-f,t[8]=u*l+v,t[1]=c*h,t[5]=v*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=v-u*h,t[8]=g*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=f*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,v=o*l;t[0]=c*d,t[4]=-h,t[8]=l*d,t[1]=u*h+v,t[5]=a*d,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Eh,e,Th)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Bn.crossVectors(n,Xt),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Bn.crossVectors(n,Xt)),Bn.normalize(),Ss.crossVectors(Xt,Bn),s[0]=Bn.x,s[4]=Ss.x,s[8]=Xt.x,s[1]=Bn.y,s[5]=Ss.y,s[9]=Xt.y,s[2]=Bn.z,s[6]=Ss.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],h=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],A=n[7],y=n[11],w=n[15],S=s[0],R=s[4],x=s[8],b=s[12],P=s[1],C=s[5],N=s[9],G=s[13],W=s[2],B=s[6],q=s[10],V=s[14],J=s[3],j=s[7],de=s[11],pe=s[15];return r[0]=a*S+o*P+c*W+l*J,r[4]=a*R+o*C+c*B+l*j,r[8]=a*x+o*N+c*q+l*de,r[12]=a*b+o*G+c*V+l*pe,r[1]=d*S+h*P+u*W+f*J,r[5]=d*R+h*C+u*B+f*j,r[9]=d*x+h*N+u*q+f*de,r[13]=d*b+h*G+u*V+f*pe,r[2]=g*S+v*P+m*W+p*J,r[6]=g*R+v*C+m*B+p*j,r[10]=g*x+v*N+m*q+p*de,r[14]=g*b+v*G+m*V+p*pe,r[3]=T*S+A*P+y*W+w*J,r[7]=T*R+A*C+y*B+w*j,r[11]=T*x+A*N+y*q+w*de,r[15]=T*b+A*G+y*V+w*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],h=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],T=c*f-l*u,A=o*f-l*h,y=o*u-c*h,w=a*f-l*d,S=a*u-c*d,R=a*h-o*d;return t*(v*T-m*A+p*y)-n*(g*T-m*w+p*S)+s*(g*A-v*w+p*R)-r*(g*y-v*S+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-n*(r*d-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],h=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],T=t*o-n*a,A=t*c-s*a,y=t*l-r*a,w=n*c-s*o,S=n*l-r*o,R=s*l-r*c,x=d*v-h*g,b=d*m-u*g,P=d*p-f*g,C=h*m-u*v,N=h*p-f*v,G=u*p-f*m,W=T*G-A*N+y*C+w*P-S*b+R*x;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/W;return e[0]=(o*G-c*N+l*C)*B,e[1]=(s*N-n*G-r*C)*B,e[2]=(v*R-m*S+p*w)*B,e[3]=(u*S-h*R-f*w)*B,e[4]=(c*P-a*G-l*b)*B,e[5]=(t*G-s*P+r*b)*B,e[6]=(m*y-g*R-p*A)*B,e[7]=(d*R-u*y+f*A)*B,e[8]=(a*N-o*P+l*x)*B,e[9]=(n*P-t*N-r*x)*B,e[10]=(g*S-v*y+p*T)*B,e[11]=(h*y-d*S-f*T)*B,e[12]=(o*b-a*C-c*x)*B,e[13]=(t*C-n*b+s*x)*B,e[14]=(v*A-g*w-m*T)*B,e[15]=(d*w-h*A+u*T)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,h=o+o,u=r*l,f=r*d,g=r*h,v=a*d,m=a*h,p=o*h,T=c*l,A=c*d,y=c*h,w=n.x,S=n.y,R=n.z;return s[0]=(1-(v+p))*w,s[1]=(f+y)*w,s[2]=(g-A)*w,s[3]=0,s[4]=(f-y)*S,s[5]=(1-(u+p))*S,s[6]=(m+T)*S,s[7]=0,s[8]=(g+A)*R,s[9]=(m-T)*R,s[10]=(1-(u+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Mi.set(s[0],s[1],s[2]).length();const o=Mi.set(s[4],s[5],s[6]).length(),c=Mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),tn.copy(this);const l=1/a,d=1/o,h=1/c;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=d,tn.elements[5]*=d,tn.elements[6]*=d,tn.elements[8]*=h,tn.elements[9]*=h,tn.elements[10]*=h,t.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=xn,c=!1){const l=this.elements,d=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===xn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===hs)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=xn,c=!1){const l=this.elements,d=2/(t-e),h=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===xn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===hs)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new U,tn=new st,Eh=new U(0,0,0),Th=new U(1,1,1),Bn=new U,Ss=new U,Xt=new U,ec=new st,tc=new Wi;class Kn{constructor(e=0,t=0,n=0,s=Kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],h=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ec,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tc.setFromEuler(this),this.setFromQuaternion(tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kn.DEFAULT_ORDER="XYZ";class bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wh=0;const nc=new U,yi=new Wi,En=new st,bs=new U,Zi=new U,Ah=new U,Rh=new Wi,ic=new U(1,0,0),sc=new U(0,1,0),rc=new U(0,0,1),ac={type:"added"},Ch={type:"removed"},Si={type:"childadded",child:null},Lr={type:"childremoved",child:null};class Tt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new U,t=new Kn,n=new Wi,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new De}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(ic,e)}rotateY(e){return this.rotateOnAxis(sc,e)}rotateZ(e){return this.rotateOnAxis(rc,e)}translateOnAxis(e,t){return nc.copy(e).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ic,e)}translateY(e){return this.translateOnAxis(sc,e)}translateZ(e){return this.translateOnAxis(rc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bs.copy(e):bs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(Zi,bs,this.up):En.lookAt(bs,Zi,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),yi.setFromRotationMatrix(En),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ac),Si.child=e,this.dispatchEvent(Si),Si.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ch),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ac),Si.child=e,this.dispatchEvent(Si),Si.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Ah),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,Rh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Tt.DEFAULT_UP=new U(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nt extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ph={type:"move"};class Ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ph)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Nt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const El={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Ur(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=He.workingColorSpace){return this.r=e,this.g=t,this.b=n,He.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=He.workingColorSpace){if(e=_h(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ur(a,r,e+1/3),this.g=Ur(a,r,e),this.b=Ur(a,r,e-1/3)}return He.colorSpaceToWorking(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){const n=El[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return He.workingToColorSpace(Dt.copy(this),e),Math.round(Ge(Dt.r*255,0,255))*65536+Math.round(Ge(Dt.g*255,0,255))*256+Math.round(Ge(Dt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.workingToColorSpace(Dt.copy(this),t);const n=Dt.r,s=Dt.g,r=Dt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=d<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=He.workingColorSpace){return He.workingToColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=vt){He.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,s=Dt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Es);const n=Ar(zn.h,Es.h,t),s=Ar(zn.s,Es.s,t),r=Ar(zn.l,Es.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Oe;Oe.NAMES=El;class or{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new or(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Dh extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const nn=new U,Tn=new U,Nr=new U,wn=new U,bi=new U,Ei=new U,oc=new U,Fr=new U,kr=new U,Or=new U,Br=new rt,zr=new rt,Hr=new rt;class an{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),nn.subVectors(e,t),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){nn.subVectors(s,t),Tn.subVectors(n,t),Nr.subVectors(e,t);const a=nn.dot(nn),o=nn.dot(Tn),c=nn.dot(Nr),l=Tn.dot(Tn),d=Tn.dot(Nr),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,f=(l*c-o*d)*u,g=(a*d-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,wn.x),c.addScaledVector(a,wn.y),c.addScaledVector(o,wn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Br.setScalar(0),zr.setScalar(0),Hr.setScalar(0),Br.fromBufferAttribute(e,t),zr.fromBufferAttribute(e,n),Hr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Br,r.x),a.addScaledVector(zr,r.y),a.addScaledVector(Hr,r.z),a}static isFrontFacing(e,t,n,s){return nn.subVectors(n,t),Tn.subVectors(e,t),nn.cross(Tn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),nn.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return an.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return an.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return an.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return an.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return an.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;bi.subVectors(s,n),Ei.subVectors(r,n),Fr.subVectors(e,n);const c=bi.dot(Fr),l=Ei.dot(Fr);if(c<=0&&l<=0)return t.copy(n);kr.subVectors(e,s);const d=bi.dot(kr),h=Ei.dot(kr);if(d>=0&&h<=d)return t.copy(s);const u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(n).addScaledVector(bi,a);Or.subVectors(e,r);const f=bi.dot(Or),g=Ei.dot(Or);if(g>=0&&f<=g)return t.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ei,o);const m=d*g-f*h;if(m<=0&&h-d>=0&&f-g>=0)return oc.subVectors(r,s),o=(h-d)/(h-d+(f-g)),t.copy(s).addScaledVector(oc,o);const p=1/(m+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class gs{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ts.copy(n.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),ws.subVectors(this.max,Ji),Ti.subVectors(e.a,Ji),wi.subVectors(e.b,Ji),Ai.subVectors(e.c,Ji),Hn.subVectors(wi,Ti),Gn.subVectors(Ai,wi),Qn.subVectors(Ti,Ai);let t=[0,-Hn.z,Hn.y,0,-Gn.z,Gn.y,0,-Qn.z,Qn.y,Hn.z,0,-Hn.x,Gn.z,0,-Gn.x,Qn.z,0,-Qn.x,-Hn.y,Hn.x,0,-Gn.y,Gn.x,0,-Qn.y,Qn.x,0];return!Gr(t,Ti,wi,Ai,ws)||(t=[1,0,0,0,1,0,0,0,1],!Gr(t,Ti,wi,Ai,ws))?!1:(As.crossVectors(Hn,Gn),t=[As.x,As.y,As.z],Gr(t,Ti,wi,Ai,ws))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const An=[new U,new U,new U,new U,new U,new U,new U,new U],sn=new U,Ts=new gs,Ti=new U,wi=new U,Ai=new U,Hn=new U,Gn=new U,Qn=new U,Ji=new U,ws=new U,As=new U,jn=new U;function Gr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){jn.fromArray(i,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),c=e.dot(jn),l=t.dot(jn),d=n.dot(jn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const gt=new U,Rs=new Be;let Lh=0;class cn extends pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yo,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),s=Ht(s,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Tl extends cn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wl extends cn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class it extends cn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Ih=new gs,Qi=new U,Vr=new U;class ur{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ih.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(Vr)),this.expandByPoint(Qi.copy(e.center).sub(Vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Uh=0;const Qt=new st,Wr=new Tt,Ri=new U,qt=new gs,ji=new gs,bt=new U;class Ot extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fh(e)?wl:Tl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new De().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,n){return Qt.makeTranslation(e,t,n),this.applyMatrix4(Qt),this}scale(e,t,n){return Qt.makeScale(e,t,n),this.applyMatrix4(Qt),this}lookAt(e){return Wr.lookAt(e),Wr.updateMatrix(),this.applyMatrix4(Wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new it(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(qt.min,ji.min),qt.expandByPoint(bt),bt.addVectors(qt.max,ji.max),qt.expandByPoint(bt)):(qt.expandByPoint(ji.min),qt.expandByPoint(ji.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)bt.fromBufferAttribute(o,l),c&&(Ri.fromBufferAttribute(e,l),bt.add(Ri)),s=Math.max(s,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new cn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new U,c[x]=new U;const l=new U,d=new U,h=new U,u=new Be,f=new Be,g=new Be,v=new U,m=new U;function p(x,b,P){l.fromBufferAttribute(n,x),d.fromBufferAttribute(n,b),h.fromBufferAttribute(n,P),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,P),d.sub(l),h.sub(l),f.sub(u),g.sub(u);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(C),o[x].add(v),o[b].add(v),o[P].add(v),c[x].add(m),c[b].add(m),c[P].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let x=0,b=T.length;x<b;++x){const P=T[x],C=P.start,N=P.count;for(let G=C,W=C+N;G<W;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const A=new U,y=new U,w=new U,S=new U;function R(x){w.fromBufferAttribute(s,x),S.copy(w);const b=o[x];A.copy(b),A.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(S,b);const C=y.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,C)}for(let x=0,b=T.length;x<b;++x){const P=T[x],C=P.start,N=P.count;for(let G=C,W=C+N;G<W;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new cn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,o=new U,c=new U,l=new U,d=new U,h=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(d),c.add(d),l.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,c){const l=o.array,d=o.itemSize,h=o.normalized,u=new l.constructor(c.length*d);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*d;for(let p=0;p<d;p++)u[g++]=l[f++]}return new cn(u,d,h)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,h=l.length;d<h;d++){const u=l[d],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){const f=l[h];d.push(f.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(t))}const r=e.morphAttributes;for(const l in r){const d=[],h=r[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,d=a.length;l<d;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Nh=0;class Xi extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=hi,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ha,this.blendDst=ua,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ha&&(n.blendSrc=this.blendSrc),this.blendDst!==ua&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Be().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Be().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Rn=new U,Xr=new U,Cs=new U,Vn=new U,qr=new U,Ps=new U,Yr=new U;class Al{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Rn.copy(this.origin).addScaledVector(this.direction,t),Rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Xr.copy(e).add(t).multiplyScalar(.5),Cs.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(Xr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Cs),o=Vn.dot(this.direction),c=-Vn.dot(Cs),l=Vn.lengthSq(),d=Math.abs(1-a*a);let h,u,f,g;if(d>0)if(h=a*c-o,u=a*o-c,g=r*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,f=h*(h+a*u+2*o)+u*(a*h+u+2*c)+l}else u=r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;else u=-r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;else u<=-g?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+u*(u+2*c)+l):u<=g?(h=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+u*(u+2*c)+l);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Xr).addScaledVector(Cs,u),f}intersectSphere(e,t){Rn.subVectors(e.center,this.origin);const n=Rn.dot(this.direction),s=Rn.dot(Rn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-u.z)*h,c=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,c=(e.min.z-u.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Rn)!==null}intersectTriangle(e,t,n,s,r){qr.subVectors(t,e),Ps.subVectors(n,e),Yr.crossVectors(qr,Ps);let a=this.direction.dot(Yr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,e);const c=o*this.direction.dot(Ps.crossVectors(Vn,Ps));if(c<0)return null;const l=o*this.direction.dot(qr.cross(Vn));if(l<0||c+l>a)return null;const d=-o*Vn.dot(Yr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yt extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cc=new st,ei=new Al,Ds=new ur,lc=new U,Ls=new U,Is=new U,Us=new U,Kr=new U,Ns=new U,dc=new U,Fs=new U;class be extends Tt{constructor(e=new Ot,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ns.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],h=r[c];d!==0&&(Kr.fromBufferAttribute(h,e),a?Ns.addScaledVector(Kr,d):Ns.addScaledVector(Kr.sub(t),d))}t.add(Ns)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(r),ei.copy(e.ray).recast(e.near),!(Ds.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Ds,lc)===null||ei.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(cc.copy(r).invert(),ei.copy(e.ray).applyMatrix4(cc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=T,w=A;y<w;y+=3){const S=o.getX(y),R=o.getX(y+1),x=o.getX(y+2);s=ks(this,p,e,n,l,d,h,S,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=o.getX(m),A=o.getX(m+1),y=o.getX(m+2);s=ks(this,a,e,n,l,d,h,T,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),A=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=T,w=A;y<w;y+=3){const S=y,R=y+1,x=y+2;s=ks(this,p,e,n,l,d,h,S,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const T=m,A=m+1,y=m+2;s=ks(this,a,e,n,l,d,h,T,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Fh(i,e,t,n,s,r,a,o){let c;if(e.side===Vt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Ln,o),c===null)return null;Fs.copy(o),Fs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Fs);return l<t.near||l>t.far?null:{distance:l,point:Fs.clone(),object:i}}function ks(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ls),i.getVertexPosition(c,Is),i.getVertexPosition(l,Us);const d=Fh(i,e,t,n,Ls,Is,Us,dc);if(d){const h=new U;an.getBarycoord(dc,Ls,Is,Us,h),s&&(d.uv=an.getInterpolatedAttribute(s,o,c,l,h,new Be)),r&&(d.uv1=an.getInterpolatedAttribute(r,o,c,l,h,new Be)),a&&(d.normal=an.getInterpolatedAttribute(a,o,c,l,h,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new U,materialIndex:0};an.getNormal(Ls,Is,Us,u.normal),d.face=u,d.barycoord=h}return d}class Rl extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=At,d=At,h,u){super(null,a,o,c,l,d,s,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $r=new U,kh=new U,Oh=new De;class ii{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=$r.subVectors(n,t).cross(kh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta($r),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Oh.getNormalMatrix(e),s=this.coplanarPoint($r).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new ur,Bh=new Be(.5,.5),Os=new U;class vo{constructor(e=new ii,t=new ii,n=new ii,s=new ii,r=new ii,a=new ii){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],h=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],T=r[12],A=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,f-d,p-g,w-T).normalize(),s[1].setComponents(l+a,f+d,p+g,w+T).normalize(),s[2].setComponents(l+o,f+h,p+v,w+A).normalize(),s[3].setComponents(l-o,f-h,p-v,w-A).normalize(),n)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,f-u,p-m,w-y).normalize();else if(s[4].setComponents(l-c,f-u,p-m,w-y).normalize(),t===xn)s[5].setComponents(l+c,f+u,p+m,w+y).normalize();else if(t===hs)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){ti.center.set(0,0,0);const t=Bh.distanceTo(e.center);return ti.radius=.7071067811865476+t,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Os.x=s.normal.x>0?e.max.x:e.min.x,Os.y=s.normal.y>0?e.max.y:e.min.y,Os.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Os)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cl extends Xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cr=new U,lr=new U,hc=new st,es=new Al,Bs=new ur,Zr=new U,uc=new U;class zh extends Tt{constructor(e=new Ot,t=new Cl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)cr.fromBufferAttribute(t,s-1),lr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=cr.distanceTo(lr);e.setAttribute("lineDistance",new it(n,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(s),Bs.radius+=r,e.ray.intersectsSphere(Bs)===!1)return;hc.copy(s).invert(),es.copy(e.ray).applyMatrix4(hc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=l){const p=d.getX(v),T=d.getX(v+1),A=zs(this,e,es,c,p,T,v);A&&t.push(A)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=zs(this,e,es,c,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=l){const p=zs(this,e,es,c,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=zs(this,e,es,c,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(cr.fromBufferAttribute(o,s),lr.fromBufferAttribute(o,r),t.distanceSqToSegment(cr,lr,Zr,uc)>n)return;Zr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Zr);if(!(l<e.near||l>e.far))return{distance:l,point:uc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const fc=new U,pc=new U;class Hh extends zh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)fc.fromBufferAttribute(t,s),pc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+fc.distanceTo(pc);e.setAttribute("lineDistance",new it(n,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pl extends Rt{constructor(e=[],t=ui,n,s,r,a,o,c,l,d){super(e,t,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gh extends Rt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gi extends Rt{constructor(e,t,n=Sn,s,r,a,o=At,c=At,l,d=Un,h=1){if(d!==Un&&d!==li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Vh extends Gi{constructor(e,t=Sn,n=ui,s,r,a=At,o=At,c,l=Un){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Dl extends Rt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Et extends Ot{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],h=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(h,2));function g(v,m,p,T,A,y,w,S,R,x,b){const P=y/R,C=w/x,N=y/2,G=w/2,W=S/2,B=R+1,q=x+1;let V=0,J=0;const j=new U;for(let de=0;de<q;de++){const pe=de*C-G;for(let _e=0;_e<B;_e++){const qe=_e*P-N;j[v]=qe*T,j[m]=pe*A,j[p]=W,l.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[p]=S>0?1:-1,d.push(j.x,j.y,j.z),h.push(_e/R),h.push(1-de/x),V+=1}}for(let de=0;de<x;de++)for(let pe=0;pe<R;pe++){const _e=u+pe+B*de,qe=u+pe+B*(de+1),at=u+(pe+1)+B*(de+1),Ye=u+(pe+1)+B*de;c.push(_e,qe,Ye),c.push(qe,at,Ye),J+=6}o.addGroup(f,J,b),f+=J,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class pn extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new U,d=new Be;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const f=n+h/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),d.x=(a[u]/e+1)/2,d.y=(a[u+1]/e+1)/2,c.push(d.x,d.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Kt extends Ot{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],u=[],f=[];let g=0;const v=[],m=n/2;let p=0;T(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(d),this.setAttribute("position",new it(h,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(f,2));function T(){const y=new U,w=new U;let S=0;const R=(t-e)/n;for(let x=0;x<=r;x++){const b=[],P=x/r,C=P*(t-e)+e;for(let N=0;N<=s;N++){const G=N/s,W=G*c+o,B=Math.sin(W),q=Math.cos(W);w.x=C*B,w.y=-P*n+m,w.z=C*q,h.push(w.x,w.y,w.z),y.set(B,R,q).normalize(),u.push(y.x,y.y,y.z),f.push(G,1-P),b.push(g++)}v.push(b)}for(let x=0;x<s;x++)for(let b=0;b<r;b++){const P=v[b][x],C=v[b+1][x],N=v[b+1][x+1],G=v[b][x+1];(e>0||b!==0)&&(d.push(P,C,G),S+=3),(t>0||b!==r-1)&&(d.push(C,N,G),S+=3)}l.addGroup(p,S,0),p+=S}function A(y){const w=g,S=new Be,R=new U;let x=0;const b=y===!0?e:t,P=y===!0?1:-1;for(let N=1;N<=s;N++)h.push(0,m*P,0),u.push(0,P,0),f.push(.5,.5),g++;const C=g;for(let N=0;N<=s;N++){const W=N/s*c+o,B=Math.cos(W),q=Math.sin(W);R.x=b*q,R.y=m*P,R.z=b*B,h.push(R.x,R.y,R.z),u.push(0,P,0),S.x=B*.5+.5,S.y=q*.5*P+.5,f.push(S.x,S.y),g++}for(let N=0;N<s;N++){const G=w+N,W=C+N;y===!0?d.push(W,W+1,G):d.push(W+1,W,G),x+=3}l.addGroup(p,x,y===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mo extends Kt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Mo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jt extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,h=e/o,u=t/c,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const T=p*u-a;for(let A=0;A<l;A++){const y=A*h-r;g.push(y,-T,0),v.push(0,0,1),m.push(A/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<o;T++){const A=T+l*p,y=T+l*(p+1),w=T+1+l*(p+1),S=T+1+l*p;f.push(A,y,S),f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.width,e.height,e.widthSegments,e.heightSegments)}}class dr extends Ot{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],d=[];let h=e;const u=(t-e)/s,f=new U,g=new Be;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}h+=u}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const T=p+m,A=T,y=T+n+1,w=T+n+2,S=T+1;o.push(A,y,S),o.push(y,w,S)}}this.setIndex(o),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class fs extends Ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],h=new U,u=new U,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const T=[],A=p/n,y=a+A*o,w=e*Math.cos(y),S=Math.sqrt(e*e-w*w);let R=0;p===0&&a===0?R=.5/t:p===n&&c===Math.PI&&(R=-.5/t);for(let x=0;x<=t;x++){const b=x/t,P=s+b*r;h.x=-S*Math.cos(P),h.y=w,h.z=S*Math.sin(P),g.push(h.x,h.y,h.z),u.copy(h).normalize(),v.push(u.x,u.y,u.z),m.push(b+R,1-A),T.push(l++)}d.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const A=d[p][T+1],y=d[p][T],w=d[p+1][T],S=d[p+1][T+1];(p!==0||a>0)&&f.push(A,y,S),(p!==n-1||c<Math.PI)&&f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ps extends Ot{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],h=[],u=new U,f=new U,g=new U;for(let v=0;v<=n;v++){const m=a+v/n*o;for(let p=0;p<=s;p++){const T=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(T),f.y=(e+t*Math.cos(m))*Math.sin(T),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),u.x=e*Math.cos(T),u.y=e*Math.sin(T),g.subVectors(f,u).normalize(),d.push(g.x,g.y,g.z),h.push(p/s),h.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){const p=(s+1)*v+m-1,T=(s+1)*(v-1)+m-1,A=(s+1)*(v-1)+m,y=(s+1)*v+m;c.push(p,T,y),c.push(T,A,y)}this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(mc(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(mc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Bt(i){const e={};for(let t=0;t<i.length;t++){const n=Vi(i[t]);for(const s in n)e[s]=n[s]}return e}function mc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Wh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ll(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}const Xh={clone:Vi,merge:Bt};var qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qh,this.fragmentShader=Yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Wh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Be().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new rt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new De().fromArray(s.value);break;case"m4":this.uniforms[n].value=new st().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Kh extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Lt extends Xi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $h extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zh extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jr={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(gc(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!gc(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function gc(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Jh{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){const h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){const f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Qh=new Jh;class yo{constructor(e){this.manager=e!==void 0?e:Qh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}yo.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ci=new WeakMap;class jh extends yo{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Jr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let h=Ci.get(a);h===void 0&&(h=[],Ci.set(a,h)),h.push({onLoad:t,onError:s})}return a}const o=us("img");function c(){d(),t&&t(this);const h=Ci.get(this)||[];for(let u=0;u<h.length;u++){const f=h[u];f.onLoad&&f.onLoad(this)}Ci.delete(this),r.manager.itemEnd(e)}function l(h){d(),s&&s(h),Jr.remove(`image:${e}`);const u=Ci.get(this)||[];for(let f=0;f<u.length;f++){const g=u[f];g.onError&&g.onError(h)}Ci.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Jr.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class eu extends yo{constructor(e){super(e)}load(e,t,n,s){const r=new Rt,a=new jh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class So extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class tu extends So{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Qr=new st,_c=new U,xc=new U;class Il{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=Zt,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vo,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_c.setFromMatrixPosition(e.matrixWorld),t.position.copy(_c),xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xc),t.updateMatrixWorld(),Qr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qr,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===hs||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Hs=new U,Gs=new Wi,un=new U;class Ul extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hs,Gs,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Gs,un.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hs,Gs,un),un.x===1&&un.y===1&&un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hs,Gs,un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new U,vc=new Be,Mc=new Be;class $t extends Ul{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qa*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z)}getViewSize(e,t){return this.getViewBounds(e,vc,Mc),t.subVectors(Mc,vc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(wr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class nu extends Il{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0}}class iu extends So{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class bo extends Ul{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class su extends Il{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yc extends So{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new su}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Pi=-90,Di=1;class ru extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $t(Pi,Di,e,t);s.layers=this.layers,this.add(s);const r=new $t(Pi,Di,e,t);r.layers=this.layers,this.add(r);const a=new $t(Pi,Di,e,t);a.layers=this.layers,this.add(a);const o=new $t(Pi,Di,e,t);o.layers=this.layers,this.add(o);const c=new $t(Pi,Di,e,t);c.layers=this.layers,this.add(c);const l=new $t(Pi,Di,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class au extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Nl{static{Nl.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function Sc(i,e,t,n){const s=ou(n);switch(t){case xl:return i*e;case Ml:return i*e/s.components*s.byteLength;case fo:return i*e/s.components*s.byteLength;case fi:return i*e*2/s.components*s.byteLength;case po:return i*e*2/s.components*s.byteLength;case vl:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case mo:return i*e*4/s.components*s.byteLength;case Js:case Qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case js:case er:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sa:case Ea:return Math.max(i,16)*Math.max(e,8)/4;case ya:case ba:return Math.max(i,8)*Math.max(e,8)/2;case Ta:case wa:case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:case ir:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case La:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ka:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xa:case qa:case Ya:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ka:case $a:return Math.ceil(i/4)*Math.ceil(e/4)*8;case sr:case Za:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ou(i){switch(i){case Zt:case pl:return{byteLength:1,components:1};case ls:case ml:case In:return{byteLength:2,components:1};case ho:case uo:return{byteLength:2,components:4};case Sn:case lo:case _n:return{byteLength:4,components:1};case gl:case _l:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ao}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ao);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Fl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function cu(i){const e=new WeakMap;function t(o,c){const l=o.array,d=o.usage,h=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const d=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,d);else{h.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<h.length;f++){const g=h[u],v=h[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let f=0,g=h.length;f<g;f++){const v=h[f];i.bufferSubData(l,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var lu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,du=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_u=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,xu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Su=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Au=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ru=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Pu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Du=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Lu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Iu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Uu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Nu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ou=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bu="gl_FragColor = linearToOutputTexel( gl_FragColor );",zu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Wu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ku=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$u=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ju=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ju=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ef=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,tf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,of=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,df=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,If=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Of=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,zf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$f=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,np=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ip=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ep=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Tp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ap=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ip=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Np=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:lu,alphahash_pars_fragment:du,alphamap_fragment:hu,alphamap_pars_fragment:uu,alphatest_fragment:fu,alphatest_pars_fragment:pu,aomap_fragment:mu,aomap_pars_fragment:gu,batching_pars_vertex:_u,batching_vertex:xu,begin_vertex:vu,beginnormal_vertex:Mu,bsdfs:yu,iridescence_fragment:Su,bumpmap_pars_fragment:bu,clipping_planes_fragment:Eu,clipping_planes_pars_fragment:Tu,clipping_planes_pars_vertex:wu,clipping_planes_vertex:Au,color_fragment:Ru,color_pars_fragment:Cu,color_pars_vertex:Pu,color_vertex:Du,common:Lu,cube_uv_reflection_fragment:Iu,defaultnormal_vertex:Uu,displacementmap_pars_vertex:Nu,displacementmap_vertex:Fu,emissivemap_fragment:ku,emissivemap_pars_fragment:Ou,colorspace_fragment:Bu,colorspace_pars_fragment:zu,envmap_fragment:Hu,envmap_common_pars_fragment:Gu,envmap_pars_fragment:Vu,envmap_pars_vertex:Wu,envmap_physical_pars_fragment:tf,envmap_vertex:Xu,fog_vertex:qu,fog_pars_vertex:Yu,fog_fragment:Ku,fog_pars_fragment:$u,gradientmap_pars_fragment:Zu,lightmap_pars_fragment:Ju,lights_lambert_fragment:Qu,lights_lambert_pars_fragment:ju,lights_pars_begin:ef,lights_toon_fragment:nf,lights_toon_pars_fragment:sf,lights_phong_fragment:rf,lights_phong_pars_fragment:af,lights_physical_fragment:of,lights_physical_pars_fragment:cf,lights_fragment_begin:lf,lights_fragment_maps:df,lights_fragment_end:hf,lightprobes_pars_fragment:uf,logdepthbuf_fragment:ff,logdepthbuf_pars_fragment:pf,logdepthbuf_pars_vertex:mf,logdepthbuf_vertex:gf,map_fragment:_f,map_pars_fragment:xf,map_particle_fragment:vf,map_particle_pars_fragment:Mf,metalnessmap_fragment:yf,metalnessmap_pars_fragment:Sf,morphinstance_vertex:bf,morphcolor_vertex:Ef,morphnormal_vertex:Tf,morphtarget_pars_vertex:wf,morphtarget_vertex:Af,normal_fragment_begin:Rf,normal_fragment_maps:Cf,normal_pars_fragment:Pf,normal_pars_vertex:Df,normal_vertex:Lf,normalmap_pars_fragment:If,clearcoat_normal_fragment_begin:Uf,clearcoat_normal_fragment_maps:Nf,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:kf,opaque_fragment:Of,packing:Bf,premultiplied_alpha_fragment:zf,project_vertex:Hf,dithering_fragment:Gf,dithering_pars_fragment:Vf,roughnessmap_fragment:Wf,roughnessmap_pars_fragment:Xf,shadowmap_pars_fragment:qf,shadowmap_pars_vertex:Yf,shadowmap_vertex:Kf,shadowmask_pars_fragment:$f,skinbase_vertex:Zf,skinning_pars_vertex:Jf,skinning_vertex:Qf,skinnormal_vertex:jf,specularmap_fragment:ep,specularmap_pars_fragment:tp,tonemapping_fragment:np,tonemapping_pars_fragment:ip,transmission_fragment:sp,transmission_pars_fragment:rp,uv_pars_fragment:ap,uv_pars_vertex:op,uv_vertex:cp,worldpos_vertex:lp,background_vert:dp,background_frag:hp,backgroundCube_vert:up,backgroundCube_frag:fp,cube_vert:pp,cube_frag:mp,depth_vert:gp,depth_frag:_p,distance_vert:xp,distance_frag:vp,equirect_vert:Mp,equirect_frag:yp,linedashed_vert:Sp,linedashed_frag:bp,meshbasic_vert:Ep,meshbasic_frag:Tp,meshlambert_vert:wp,meshlambert_frag:Ap,meshmatcap_vert:Rp,meshmatcap_frag:Cp,meshnormal_vert:Pp,meshnormal_frag:Dp,meshphong_vert:Lp,meshphong_frag:Ip,meshphysical_vert:Up,meshphysical_frag:Np,meshtoon_vert:Fp,meshtoon_frag:kp,points_vert:Op,points_frag:Bp,shadow_vert:zp,shadow_frag:Hp,sprite_vert:Gp,sprite_frag:Vp},le={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},gn={basic:{uniforms:Bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Bt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Bt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Bt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Bt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Bt([le.points,le.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Bt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Bt([le.common,le.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Bt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Bt([le.sprite,le.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:Bt([le.common,le.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:Bt([le.lights,le.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};gn.physical={uniforms:Bt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Vs={r:0,b:0,g:0},Wp=new st,kl=new De;kl.set(-1,0,0,0,1,0,0,0,1);function Xp(i,e,t,n,s,r){const a=new Oe(0);let o=s===!0?0:1,c,l,d=null,h=0,u=null;function f(T){let A=T.isScene===!0?T.background:null;if(A&&A.isTexture){const y=T.backgroundBlurriness>0;A=e.get(A,y)}return A}function g(T){let A=!1;const y=f(T);y===null?m(a,o):y&&y.isColor&&(m(y,1),A=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(T,A){const y=f(A);y&&(y.isCubeTexture||y.mapping===hr)?(l===void 0&&(l=new be(new Et(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Vi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Wp.makeRotationFromEuler(A.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(kl),l.material.toneMapped=He.getTransfer(y.colorSpace)!==Ze,(d!==y||h!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new be(new jt(2,2),new bn({name:"BackgroundMaterial",uniforms:Vi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=He.getTransfer(y.colorSpace)!==Ze,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function m(T,A){T.getRGB(Vs,Ll(i)),t.buffers.color.setClear(Vs.r,Vs.g,Vs.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,A=1){a.set(T),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,m(a,o)},render:g,addToRenderList:v,dispose:p}}function qp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(C,N,G,W,B){let q=!1;const V=h(C,W,G,N);r!==V&&(r=V,l(r.object)),q=f(C,W,G,B),q&&g(C,W,G,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(C,N,G,W),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function d(C){return i.deleteVertexArray(C)}function h(C,N,G,W){const B=W.wireframe===!0;let q=n[N.id];q===void 0&&(q={},n[N.id]=q);const V=C.isInstancedMesh===!0?C.id:0;let J=q[V];J===void 0&&(J={},q[V]=J);let j=J[G.id];j===void 0&&(j={},J[G.id]=j);let de=j[B];return de===void 0&&(de=u(c()),j[B]=de),de}function u(C){const N=[],G=[],W=[];for(let B=0;B<t;B++)N[B]=0,G[B]=0,W[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:W,object:C,attributes:{},index:null}}function f(C,N,G,W){const B=r.attributes,q=N.attributes;let V=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){const pe=B[j];let _e=q[j];if(_e===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(_e=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(_e=C.instanceColor)),pe===void 0||pe.attribute!==_e||_e&&pe.data!==_e.data)return!0;V++}return r.attributesNum!==V||r.index!==W}function g(C,N,G,W){const B={},q=N.attributes;let V=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){let pe=q[j];pe===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(pe=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(pe=C.instanceColor));const _e={};_e.attribute=pe,pe&&pe.data&&(_e.data=pe.data),B[j]=_e,V++}r.attributes=B,r.attributesNum=V,r.index=W}function v(){const C=r.newAttributes;for(let N=0,G=C.length;N<G;N++)C[N]=0}function m(C){p(C,0)}function p(C,N){const G=r.newAttributes,W=r.enabledAttributes,B=r.attributeDivisors;G[C]=1,W[C]===0&&(i.enableVertexAttribArray(C),W[C]=1),B[C]!==N&&(i.vertexAttribDivisor(C,N),B[C]=N)}function T(){const C=r.newAttributes,N=r.enabledAttributes;for(let G=0,W=N.length;G<W;G++)N[G]!==C[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function A(C,N,G,W,B,q,V){V===!0?i.vertexAttribIPointer(C,N,G,B,q):i.vertexAttribPointer(C,N,G,W,B,q)}function y(C,N,G,W){v();const B=W.attributes,q=G.getAttributes(),V=N.defaultAttributeValues;for(const J in q){const j=q[J];if(j.location>=0){let de=B[J];if(de===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(de=C.instanceColor)),de!==void 0){const pe=de.normalized,_e=de.itemSize,qe=e.get(de);if(qe===void 0)continue;const at=qe.buffer,Ye=qe.type,Z=qe.bytesPerElement,ie=Ye===i.INT||Ye===i.UNSIGNED_INT||de.gpuType===lo;if(de.isInterleavedBufferAttribute){const ee=de.data,Ce=ee.stride,Le=de.offset;if(ee.isInstancedInterleavedBuffer){for(let we=0;we<j.locationSize;we++)p(j.location+we,ee.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let we=0;we<j.locationSize;we++)m(j.location+we);i.bindBuffer(i.ARRAY_BUFFER,at);for(let we=0;we<j.locationSize;we++)A(j.location+we,_e/j.locationSize,Ye,pe,Ce*Z,(Le+_e/j.locationSize*we)*Z,ie)}else{if(de.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)p(j.location+ee,de.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ee=0;ee<j.locationSize;ee++)m(j.location+ee);i.bindBuffer(i.ARRAY_BUFFER,at);for(let ee=0;ee<j.locationSize;ee++)A(j.location+ee,_e/j.locationSize,Ye,pe,_e*Z,_e/j.locationSize*ee*Z,ie)}}else if(V!==void 0){const pe=V[J];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(j.location,pe);break;case 3:i.vertexAttrib3fv(j.location,pe);break;case 4:i.vertexAttrib4fv(j.location,pe);break;default:i.vertexAttrib1fv(j.location,pe)}}}}T()}function w(){b();for(const C in n){const N=n[C];for(const G in N){const W=N[G];for(const B in W){const q=W[B];for(const V in q)d(q[V].object),delete q[V];delete W[B]}}delete n[C]}}function S(C){if(n[C.id]===void 0)return;const N=n[C.id];for(const G in N){const W=N[G];for(const B in W){const q=W[B];for(const V in q)d(q[V].object),delete q[V];delete W[B]}}delete n[C.id]}function R(C){for(const N in n){const G=n[N];for(const W in G){const B=G[W];if(B[C.id]===void 0)continue;const q=B[C.id];for(const V in q)d(q[V].object),delete q[V];delete B[C.id]}}}function x(C){for(const N in n){const G=n[N],W=C.isInstancedMesh===!0?C.id:0,B=G[W];if(B!==void 0){for(const q in B){const V=B[q];for(const J in V)d(V[J].object),delete V[J];delete B[q]}delete G[W],Object.keys(G).length===0&&delete n[N]}}}function b(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Yp(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),t.update(l,n,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let u=0;for(let f=0;f<d;f++)u+=l[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Kp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==on&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===In&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Zt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==_n&&!x)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const d=c(l);d!==l&&(Re("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:A,maxFragmentUniforms:y,maxSamples:w,samples:S}}function $p(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ii,o=new De,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||n!==0||s;return s=u,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):l();else{const T=r?0:n,A=T*4;let y=p.clippingState||null;c.value=y,y=d(g,u,A,f);for(let w=0;w!==A;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,f,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,y=f;A!==v;++A,y+=4)a.copy(h[A]).applyMatrix4(T,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const qn=4,bc=[.125,.215,.35,.446,.526,.582],ai=20,Zp=256,ts=new bo,Ec=new Oe;let jr=null,ea=0,ta=0,na=!1;const Jp=new U;class Tc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Jp}=r;jr=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(jr,ea,ta),this._renderer.xr.enabled=na,e.scissorTest=!1,Li(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ui||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jr=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:In,format:on,colorSpace:rr,depthBuffer:!1},s=wc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Qp(r)),this._blurMaterial=em(r,e,t),this._ggxMaterial=jp(r,e,t)}return s}_compileMaterial(e){const t=new be(new Ot,e);this._renderer.compile(t,ts)}_sceneToCubeUV(e,t,n,s,r){const c=new $t(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ec),h.toneMapping=vn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new Et,new Yt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,p=!0):(m.color.copy(Ec),p=!0);for(let A=0;A<6;A++){const y=A%3;y===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[A],r.y,r.z)):y===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[A]));const w=this._cubeSize;Li(s,y*w,A>2?w:0,w,w),h.setRenderTarget(s),p&&h.render(v,c),h.render(e,c)}h.toneMapping=f,h.autoClear=u,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ui||e.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ac());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Li(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ts)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-d*d),u=0+l*1.25,f=h*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-qn?n-g+qn:0),p=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,Li(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,ts),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Li(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(o,ts)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[s];h.material=l;const u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ai-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ai;m>ai&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const p=[];let T=0;for(let R=0;R<ai;++R){const x=R/v,b=Math.exp(-x*x/2);p.push(b),R===0?T+=b:R<m&&(T+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/T;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=g,u.mipInt.value=A-n;const y=this._sizeLods[s],w=3*y*(s>A-qn?s-A+qn:0),S=4*(this._cubeSize-y);Li(t,w,S,3*y,2*y),c.setRenderTarget(t),c.render(h,ts)}}function Qp(i){const e=[],t=[],n=[];let s=i;const r=i-qn+1+bc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-qn?c=bc[a-i+qn-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*f),A=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let S=0;S<f;S++){const R=S%3*2/3-1,x=S>2?0:-1,b=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];T.set(b,v*g*S),A.set(u,m*g*S);const P=[S,S,S,S,S,S];y.set(P,p*g*S)}const w=new Ot;w.setAttribute("position",new cn(T,v)),w.setAttribute("uv",new cn(A,m)),w.setAttribute("faceIndex",new cn(y,p)),n.push(new be(w,null)),s>qn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function wc(i,e,t){const n=new yn(i,e,t);return n.texture.mapping=hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Li(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function jp(i,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Zp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function em(i,e,t){const n=new Float32Array(ai),s=new U(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ac(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Rc(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function fr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ol extends yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Pl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Et(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:Pn});r.uniforms.tEquirect.value=t;const a=new be(s,r),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=kt),new ru(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function tm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===br||f===Er)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new Ol(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===br||f===Er,v=f===ui||f===Hi;if(g||v){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Tc(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const T=u.image;return g&&T&&T.height>0||v&&T&&c(T)?(n===null&&(n=new Tc(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,f){return f===br?u.mapping=ui:f===Er&&(u.mapping=Hi),u}function c(u){let f=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(u){const f=u.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function nm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Oi("WebGLRenderer: "+n+" extension not supported."),s}}}function im(i,e,t,n){const s={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(h){const u=h.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function l(h){const u=[],f=h.index,g=h.attributes.position;let v=0;if(g===void 0)return;if(f!==null){const T=f.array;v=f.version;for(let A=0,y=T.length;A<y;A+=3){const w=T[A+0],S=T[A+1],R=T[A+2];u.push(w,S,S,R,R,w)}}else{const T=g.array;v=g.version;for(let A=0,y=T.length/3-1;A<y;A+=3){const w=A+0,S=A+1,R=A+2;u.push(w,S,S,R,R,w)}}const m=new(g.count>=65535?wl:Tl)(u,1);m.version=v;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function d(h){const u=r.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:d}}function sm(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,u){i.drawElements(n,u,r,h*a),t.update(u,n,1)}function l(h,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,h*a,f),t.update(u,n,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,h,0,f);let v=0;for(let m=0;m<f;m++)v+=u[m];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function rm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function am(i,e,t){const n=new WeakMap,s=new rt;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==h){let b=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let A=0;f===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let y=o.attributes.position.count*A,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*w*4*h),R=new Sl(S,y,w,h);R.type=_n,R.needsUpdate=!0;const x=A*4;for(let P=0;P<h;P++){const C=m[P],N=p[P],G=T[P],W=y*w*4*P;for(let B=0;B<C.count;B++){const q=B*x;f===!0&&(s.fromBufferAttribute(C,B),S[W+q+0]=s.x,S[W+q+1]=s.y,S[W+q+2]=s.z,S[W+q+3]=0),g===!0&&(s.fromBufferAttribute(N,B),S[W+q+4]=s.x,S[W+q+5]=s.y,S[W+q+6]=s.z,S[W+q+7]=0),v===!0&&(s.fromBufferAttribute(G,B),S[W+q+8]=s.x,S[W+q+9]=s.y,S[W+q+10]=s.z,S[W+q+11]=G.itemSize===4?s.w:1)}}u={count:h,texture:R,size:new Be(y,w)},n.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function om(i,e,t,n,s){let r=new WeakMap;function a(l){const d=s.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return u}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const cm={[cl]:"LINEAR_TONE_MAPPING",[ll]:"REINHARD_TONE_MAPPING",[dl]:"CINEON_TONE_MAPPING",[oo]:"ACES_FILMIC_TONE_MAPPING",[ul]:"AGX_TONE_MAPPING",[fl]:"NEUTRAL_TONE_MAPPING",[hl]:"CUSTOM_TONE_MAPPING"};function lm(i,e,t,n,s,r){const a=new yn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Gi(e,t):void 0}),o=new yn(e,t,{type:In,depthBuffer:!1,stencilBuffer:!1}),c=new Ot;c.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new it([0,2,0,0,2,0],2));const l=new Kh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new be(c,l),h=new bo(-1,1,1,-1,0,1);let u=null,f=null,g=!1,v,m=null,p=[],T=!1;this.setSize=function(A,y){a.setSize(A,y),o.setSize(A,y);for(let w=0;w<p.length;w++){const S=p[w];S.setSize&&S.setSize(A,y)}},this.setEffects=function(A){p=A,T=p.length>0&&p[0].isRenderPass===!0;const y=a.width,w=a.height;for(let S=0;S<p.length;S++){const R=p[S];R.setSize&&R.setSize(y,w)}},this.begin=function(A,y){if(g||A.toneMapping===vn&&p.length===0)return!1;if(m=y,y!==null){const w=y.width,S=y.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return T===!1&&A.setRenderTarget(a),v=A.toneMapping,A.toneMapping=vn,!0},this.hasRenderPass=function(){return T},this.end=function(A,y){A.toneMapping=v,g=!0;let w=a,S=o;for(let R=0;R<p.length;R++){const x=p[R];if(x.enabled!==!1&&(x.render(A,S,w,y),x.needsSwap!==!1)){const b=w;w=S,S=b}}if(u!==A.outputColorSpace||f!==A.toneMapping){u=A.outputColorSpace,f=A.toneMapping,l.defines={},He.getTransfer(u)===Ze&&(l.defines.SRGB_TRANSFER="");const R=cm[f];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,A.setRenderTarget(m),A.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Bl=new Rt,ja=new Gi(1,1),zl=new Sl,Hl=new bh,Gl=new Pl,Cc=[],Pc=[],Dc=new Float32Array(16),Lc=new Float32Array(9),Ic=new Float32Array(4);function qi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Cc[s];if(r===void 0&&(r=new Float32Array(s),Cc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function pr(i,e){let t=Pc[e];t===void 0&&(t=new Int32Array(e),Pc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function pm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(Mt(t,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),yt(t,n)}}function mm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(Mt(t,n))return;Lc.set(n),i.uniformMatrix3fv(this.addr,!1,Lc),yt(t,n)}}function gm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(Mt(t,n))return;Dc.set(n),i.uniformMatrix4fv(this.addr,!1,Dc),yt(t,n)}}function _m(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function ym(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function Tm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ja.compareFunction=t.isReversedDepthBuffer()?_o:go,r=ja):r=Bl,t.setTexture2D(e||r,s)}function wm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Hl,s)}function Am(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Gl,s)}function Rm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zl,s)}function Cm(i){switch(i){case 5126:return dm;case 35664:return hm;case 35665:return um;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return _m;case 35667:case 35671:return xm;case 35668:case 35672:return vm;case 35669:case 35673:return Mm;case 5125:return ym;case 36294:return Sm;case 36295:return bm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Rm}}function Pm(i,e){i.uniform1fv(this.addr,e)}function Dm(i,e){const t=qi(e,this.size,2);i.uniform2fv(this.addr,t)}function Lm(i,e){const t=qi(e,this.size,3);i.uniform3fv(this.addr,t)}function Im(i,e){const t=qi(e,this.size,4);i.uniform4fv(this.addr,t)}function Um(i,e){const t=qi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Nm(i,e){const t=qi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Fm(i,e){const t=qi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function km(i,e){i.uniform1iv(this.addr,e)}function Om(i,e){i.uniform2iv(this.addr,e)}function Bm(i,e){i.uniform3iv(this.addr,e)}function zm(i,e){i.uniform4iv(this.addr,e)}function Hm(i,e){i.uniform1uiv(this.addr,e)}function Gm(i,e){i.uniform2uiv(this.addr,e)}function Vm(i,e){i.uniform3uiv(this.addr,e)}function Wm(i,e){i.uniform4uiv(this.addr,e)}function Xm(i,e,t){const n=this.cache,s=e.length,r=pr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ja:a=Bl;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function qm(i,e,t){const n=this.cache,s=e.length,r=pr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Hl,r[a])}function Ym(i,e,t){const n=this.cache,s=e.length,r=pr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Gl,r[a])}function Km(i,e,t){const n=this.cache,s=e.length,r=pr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||zl,r[a])}function $m(i){switch(i){case 5126:return Pm;case 35664:return Dm;case 35665:return Lm;case 35666:return Im;case 35674:return Um;case 35675:return Nm;case 35676:return Fm;case 5124:case 35670:return km;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return zm;case 5125:return Hm;case 36294:return Gm;case 36295:return Vm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return qm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return Km}}class Zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cm(t.type)}}class Jm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$m(t.type)}}class Qm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ia=/(\w+)(\])?(\[|\.)?/g;function Uc(i,e){i.seq.push(e),i.map[e.id]=e}function jm(i,e,t){const n=i.name,s=n.length;for(ia.lastIndex=0;;){const r=ia.exec(n),a=ia.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Uc(t,l===void 0?new Zm(o,i,e):new Jm(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Qm(o),Uc(t,h)),t=h}}}class tr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);jm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Nc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const e0=37297;let t0=0;function n0(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Fc=new De;function i0(i){He._getMatrix(Fc,He.workingColorSpace,i);const e=`mat3( ${Fc.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(i)){case ar:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function kc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+n0(i.getShaderSource(e),o)}else return r}function s0(i,e){const t=i0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const r0={[cl]:"Linear",[ll]:"Reinhard",[dl]:"Cineon",[oo]:"ACESFilmic",[ul]:"AgX",[fl]:"Neutral",[hl]:"Custom"};function a0(i,e){const t=r0[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ws=new U;function o0(){He.getLuminanceCoefficients(Ws);const i=Ws.x.toFixed(4),e=Ws.y.toFixed(4),t=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function c0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ss).join(`
`)}function l0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function d0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ss(i){return i!==""}function Oc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function eo(i){return i.replace(h0,f0)}const u0=new Map;function f0(i,e){let t=Ne[e];if(t===void 0){const n=u0.get(e);if(n!==void 0)t=Ne[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return eo(t)}const p0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(i){return i.replace(p0,m0)}function m0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const g0={[Zs]:"SHADOWMAP_TYPE_PCF",[is]:"SHADOWMAP_TYPE_VSM"};function _0(i){return g0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const x0={[ui]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[hr]:"ENVMAP_TYPE_CUBE_UV"};function v0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":x0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const M0={[Hi]:"ENVMAP_MODE_REFRACTION"};function y0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":M0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const S0={[ol]:"ENVMAP_BLENDING_MULTIPLY",[nh]:"ENVMAP_BLENDING_MIX",[ih]:"ENVMAP_BLENDING_ADD"};function b0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":S0[i.combine]||"ENVMAP_BLENDING_NONE"}function E0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function T0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=_0(t),l=v0(t),d=y0(t),h=b0(t),u=E0(t),f=c0(t),g=l0(r),v=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ss).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ss).join(`
`),p.length>0&&(p+=`
`)):(m=[Hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ss).join(`
`),p=[Hc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==vn?a0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,s0("linearToOutputTexel",t.outputColorSpace),o0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ss).join(`
`)),a=eo(a),a=Oc(a,t),a=Bc(a,t),o=eo(o),o=Oc(o,t),o=Bc(o,t),a=zc(a),o=zc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ko?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ko?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=T+m+a,y=T+p+o,w=Nc(s,s.VERTEX_SHADER,A),S=Nc(s,s.FRAGMENT_SHADER,y);s.attachShader(v,w),s.attachShader(v,S),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(w)||"",W=s.getShaderInfoLog(S)||"",B=N.trim(),q=G.trim(),V=W.trim();let J=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,S);else{const de=kc(s,w,"vertex"),pe=kc(s,S,"fragment");Xe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+de+`
`+pe)}else B!==""?Re("WebGLProgram: Program Info Log:",B):(q===""||V==="")&&(j=!1);j&&(C.diagnostics={runnable:J,programLog:B,vertexShader:{log:q,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(w),s.deleteShader(S),x=new tr(s,v),b=d0(s,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,e0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=S,this}let w0=0;class A0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new R0(e),t.set(e,n)),n}}class R0{constructor(e){this.id=w0++,this.code=e,this.usedTimes=0}}function C0(i){return i===fi||i===ir||i===sr}function P0(i,e,t,n,s,r){const a=new bl,o=new A0,c=new Set,l=[],d=new Map,h=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,b,P,C,N,G){const W=C.fog,B=N.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,J=e.get(x.envMap||q,V),j=J&&J.mapping===hr?J.image.height:null,de=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Re("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const pe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=pe!==void 0?pe.length:0;let qe=0;B.morphAttributes.position!==void 0&&(qe=1),B.morphAttributes.normal!==void 0&&(qe=2),B.morphAttributes.color!==void 0&&(qe=3);let at,Ye,Z,ie;if(de){const xe=gn[de];at=xe.vertexShader,Ye=xe.fragmentShader}else{at=x.vertexShader,Ye=x.fragmentShader;const xe=o.getVertexShaderStage(x),ct=o.getFragmentShaderStage(x);o.update(x,xe,ct),Z=xe.id,ie=ct.id}const ee=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Le=N.isInstancedMesh===!0,we=N.isBatchedMesh===!0,ht=!!x.map,ze=!!x.matcap,Qe=!!J,Ke=!!x.aoMap,Ve=!!x.lightMap,pt=!!x.bumpMap&&x.wireframe===!1,_t=!!x.normalMap,St=!!x.displacementMap,wt=!!x.emissiveMap,ot=!!x.metalnessMap,mt=!!x.roughnessMap,L=x.anisotropy>0,zt=x.clearcoat>0,$e=x.dispersion>0,E=x.iridescence>0,_=x.sheen>0,F=x.transmission>0,z=L&&!!x.anisotropyMap,X=zt&&!!x.clearcoatMap,te=zt&&!!x.clearcoatNormalMap,se=zt&&!!x.clearcoatRoughnessMap,Y=E&&!!x.iridescenceMap,$=E&&!!x.iridescenceThicknessMap,re=_&&!!x.sheenColorMap,ye=_&&!!x.sheenRoughnessMap,ce=!!x.specularMap,ae=!!x.specularColorMap,Te=!!x.specularIntensityMap,Ae=F&&!!x.transmissionMap,Ie=F&&!!x.thicknessMap,D=!!x.gradientMap,ne=!!x.alphaMap,K=x.alphaTest>0,oe=!!x.alphaHash,fe=!!x.extensions;let Q=vn;x.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Q=i.toneMapping);const Me={shaderID:de,shaderType:x.type,shaderName:x.name,vertexShader:at,fragmentShader:Ye,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:ie,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:we,batchingColor:we&&N._colorsTexture!==null,instancing:Le,instancingColor:Le&&N.instanceColor!==null,instancingMorph:Le&&N.morphTexture!==null,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:He.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ht,matcap:ze,envMap:Qe,envMapMode:Qe&&J.mapping,envMapCubeUVHeight:j,aoMap:Ke,lightMap:Ve,bumpMap:pt,normalMap:_t,displacementMap:St,emissiveMap:wt,normalMapObjectSpace:_t&&x.normalMapType===ah,normalMapTangentSpace:_t&&x.normalMapType===Ja,packedNormalMap:_t&&x.normalMapType===Ja&&C0(x.normalMap.format),metalnessMap:ot,roughnessMap:mt,anisotropy:L,anisotropyMap:z,clearcoat:zt,clearcoatMap:X,clearcoatNormalMap:te,clearcoatRoughnessMap:se,dispersion:$e,iridescence:E,iridescenceMap:Y,iridescenceThicknessMap:$,sheen:_,sheenColorMap:re,sheenRoughnessMap:ye,specularMap:ce,specularColorMap:ae,specularIntensityMap:Te,transmission:F,transmissionMap:Ae,thicknessMap:Ie,gradientMap:D,opaque:x.transparent===!1&&x.blending===hi&&x.alphaToCoverage===!1,alphaMap:ne,alphaTest:K,alphaHash:oe,combine:x.combine,mapUv:ht&&g(x.map.channel),aoMapUv:Ke&&g(x.aoMap.channel),lightMapUv:Ve&&g(x.lightMap.channel),bumpMapUv:pt&&g(x.bumpMap.channel),normalMapUv:_t&&g(x.normalMap.channel),displacementMapUv:St&&g(x.displacementMap.channel),emissiveMapUv:wt&&g(x.emissiveMap.channel),metalnessMapUv:ot&&g(x.metalnessMap.channel),roughnessMapUv:mt&&g(x.roughnessMap.channel),anisotropyMapUv:z&&g(x.anisotropyMap.channel),clearcoatMapUv:X&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:te&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:$&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:re&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(x.sheenRoughnessMap.channel),specularMapUv:ce&&g(x.specularMap.channel),specularColorMapUv:ae&&g(x.specularColorMap.channel),specularIntensityMapUv:Te&&g(x.specularIntensityMap.channel),transmissionMapUv:Ae&&g(x.transmissionMap.channel),thicknessMapUv:Ie&&g(x.thicknessMap.channel),alphaMapUv:ne&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_t||L),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!B.attributes.uv&&(ht||ne),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ce,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:qe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Q,decodeVideoTexture:ht&&x.map.isVideoTexture===!0&&He.getTransfer(x.map.colorSpace)===Ze,decodeVideoTextureEmissive:wt&&x.emissiveMap.isVideoTexture===!0&&He.getTransfer(x.emissiveMap.colorSpace)===Ze,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ut,flipSided:x.side===Vt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:fe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&x.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)b.push(P),b.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(b,x),T(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function T(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const b=f[x.type];let P;if(b){const C=gn[b];P=Xh.clone(C.uniforms)}else P=x.uniforms;return P}function y(x,b){let P=d.get(b);return P!==void 0?++P.usedTimes:(P=new T0(i,b,x,s),l.push(P),d.set(b,P)),P}function w(x){if(--x.usedTimes===0){const b=l.indexOf(x);l[b]=l[l.length-1],l.pop(),d.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:A,acquireProgram:y,releaseProgram:w,releaseShaderCache:S,programs:l,dispose:R}}function D0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function L0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Gc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Vc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,m,p){let T=i[e];return T===void 0?(T={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[e]=T):(T.id=u.id,T.object=u,T.geometry=f,T.material=g,T.materialVariant=a(u),T.groupOrder=v,T.renderOrder=u.renderOrder,T.z=m,T.group=p),e++,T}function c(u,f,g,v,m,p){const T=o(u,f,g,v,m,p);g.transmission>0?n.push(T):g.transparent===!0?s.push(T):t.push(T)}function l(u,f,g,v,m,p){const T=o(u,f,g,v,m,p);g.transmission>0?n.unshift(T):g.transparent===!0?s.unshift(T):t.unshift(T)}function d(u,f,g){t.length>1&&t.sort(u||L0),n.length>1&&n.sort(f||Gc),s.length>1&&s.sort(f||Gc),g&&(t.reverse(),n.reverse(),s.reverse())}function h(){for(let u=e,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:h,sort:d}}function I0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Vc,i.set(n,[a])):s>=r.length?(a=new Vc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function U0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Oe};break;case"SpotLight":t={position:new U,direction:new U,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function N0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let F0=0;function k0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function O0(i){const e=new U0,t=N0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new st,a=new st;function o(l){let d=0,h=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,T=0,A=0,y=0,w=0,S=0,R=0;l.sort(k0);for(let b=0,P=l.length;b<P;b++){const C=l[b],N=C.color,G=C.intensity,W=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===fi?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)d+=N.r*G,h+=N.g*G,u+=N.b*G;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],G);R++}else if(C.isDirectionalLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,J=t.get(C);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=C.shadow.matrix,T++}n.directional[f]=q,f++}else if(C.isSpotLight){const q=e.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(N).multiplyScalar(G),q.distance=W,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[v]=q;const V=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,V.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[v]=V.matrix,C.castShadow){const J=t.get(C);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,n.spotShadow[v]=J,n.spotShadowMap[v]=B,y++}v++}else if(C.isRectAreaLight){const q=e.get(C);q.color.copy(N).multiplyScalar(G),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=q,m++}else if(C.isPointLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){const V=C.shadow,J=t.get(C);J.shadowIntensity=V.intensity,J.shadowBias=V.bias,J.shadowNormalBias=V.normalBias,J.shadowRadius=V.radius,J.shadowMapSize=V.mapSize,J.shadowCameraNear=V.camera.near,J.shadowCameraFar=V.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=C.shadow.matrix,A++}n.point[g]=q,g++}else if(C.isHemisphereLight){const q=e.get(C);q.skyColor.copy(C.color).multiplyScalar(G),q.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const x=n.hash;(x.directionalLength!==f||x.pointLength!==g||x.spotLength!==v||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==T||x.numPointShadows!==A||x.numSpotShadows!==y||x.numSpotMaps!==w||x.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=R,x.directionalLength=f,x.pointLength=g,x.spotLength=v,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=T,x.numPointShadows=A,x.numSpotShadows=y,x.numSpotMaps=w,x.numLightProbes=R,n.version=F0++)}function c(l,d){let h=0,u=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,T=l.length;p<T;p++){const A=l[p];if(A.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(A.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(A.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(A.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),u++}else if(A.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Wc(i){const e=new O0(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function d(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function B0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Wc(i),e.set(s,[o])):r>=a.length?(o=new Wc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const z0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,G0=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],V0=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Xc=new st,ns=new U,sa=new U;function W0(i,e,t){let n=new vo;const s=new Be,r=new Be,a=new rt,o=new $h,c=new Zh,l={},d=t.maxTextureSize,h={[Ln]:Vt,[Vt]:Ln,[Ut]:Ut},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:z0,fragmentShader:H0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ot;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new be(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zs;let p=this.type;this.render=function(S,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===kd&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Zs);const b=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Pn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const G=p!==this.type;G&&R.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(B=>B.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,B=S.length;W<B;W++){const q=S[W],V=q.shadow;if(V===void 0){Re("WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const J=V.getFrameExtents();s.multiply(J),r.copy(V.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/J.x),s.x=r.x*J.x,V.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/J.y),s.y=r.y*J.y,V.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=j,V.map===null||G===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===is){if(q.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new yn(s.x,s.y,{format:fi,type:In,minFilter:kt,magFilter:kt,generateMipmaps:!1}),V.map.texture.name=q.name+".shadowMap",V.map.depthTexture=new Gi(s.x,s.y,_n),V.map.depthTexture.name=q.name+".shadowMapDepth",V.map.depthTexture.format=Un,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=At,V.map.depthTexture.magFilter=At}else q.isPointLight?(V.map=new Ol(s.x),V.map.depthTexture=new Vh(s.x,Sn)):(V.map=new yn(s.x,s.y),V.map.depthTexture=new Gi(s.x,s.y,Sn)),V.map.depthTexture.name=q.name+".shadowMap",V.map.depthTexture.format=Un,this.type===Zs?(V.map.depthTexture.compareFunction=j?_o:go,V.map.depthTexture.minFilter=kt,V.map.depthTexture.magFilter=kt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=At,V.map.depthTexture.magFilter=At);V.camera.updateProjectionMatrix()}const de=V.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<de;pe++){if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,pe),i.clear();else{pe===0&&(i.setRenderTarget(V.map),i.clear());const _e=V.getViewport(pe);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),N.viewport(a)}if(q.isPointLight){const _e=V.camera,qe=V.matrix,at=q.distance||_e.far;at!==_e.far&&(_e.far=at,_e.updateProjectionMatrix()),ns.setFromMatrixPosition(q.matrixWorld),_e.position.copy(ns),sa.copy(_e.position),sa.add(G0[pe]),_e.up.copy(V0[pe]),_e.lookAt(sa),_e.updateMatrixWorld(),qe.makeTranslation(-ns.x,-ns.y,-ns.z),Xc.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Xc,_e.coordinateSystem,_e.reversedDepth)}else V.updateMatrices(q);n=V.getFrustum(),y(R,x,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===is&&T(V,x),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,P,C)};function T(S,R){const x=e.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new yn(s.x,s.y,{format:fi,type:In})),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,x,u,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,x,f,v,null)}function A(S,R,x,b){let P=null;const C=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)P=C;else if(P=x.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=P.uuid,G=R.uuid;let W=l[N];W===void 0&&(W={},l[N]=W);let B=W[G];B===void 0&&(B=P.clone(),W[G]=B,R.addEventListener("dispose",w)),P=B}if(P.visible=R.visible,P.wireframe=R.wireframe,b===is?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:h[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=i.properties.get(P);N.light=x}return P}function y(S,R,x,b,P){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===is)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);const G=e.update(S),W=S.material;if(Array.isArray(W)){const B=G.groups;for(let q=0,V=B.length;q<V;q++){const J=B[q],j=W[J.materialIndex];if(j&&j.visible){const de=A(S,j,b,P);S.onBeforeShadow(i,S,R,x,G,de,J),i.renderBufferDirect(x,null,G,de,S,J),S.onAfterShadow(i,S,R,x,G,de,J)}}}else if(W.visible){const B=A(S,W,b,P);S.onBeforeShadow(i,S,R,x,G,B,null),i.renderBufferDirect(x,null,G,B,S,null),S.onAfterShadow(i,S,R,x,G,B,null)}}const N=S.children;for(let G=0,W=N.length;G<W;G++)y(N[G],R,x,b,P)}function w(S){S.target.removeEventListener("dispose",w);for(const x in l){const b=l[x],P=S.target.uuid;P in b&&(b[P].dispose(),delete b[P])}}}function X0(i,e){function t(){let D=!1;const ne=new rt;let K=null;const oe=new rt(0,0,0,0);return{setMask:function(fe){K!==fe&&!D&&(i.colorMask(fe,fe,fe,fe),K=fe)},setLocked:function(fe){D=fe},setClear:function(fe,Q,Me,xe,ct){ct===!0&&(fe*=xe,Q*=xe,Me*=xe),ne.set(fe,Q,Me,xe),oe.equals(ne)===!1&&(i.clearColor(fe,Q,Me,xe),oe.copy(ne))},reset:function(){D=!1,K=null,oe.set(-1,0,0,0)}}}function n(){let D=!1,ne=!1,K=null,oe=null,fe=null;return{setReversed:function(Q){if(ne!==Q){const Me=e.get("EXT_clip_control");Q?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),ne=Q;const xe=fe;fe=null,this.setClear(xe)}},getReversed:function(){return ne},setTest:function(Q){Q?ee(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(Q){K!==Q&&!D&&(i.depthMask(Q),K=Q)},setFunc:function(Q){if(ne&&(Q=gh[Q]),oe!==Q){switch(Q){case fa:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case _a:i.depthFunc(i.GEQUAL);break;case xa:i.depthFunc(i.GREATER);break;case va:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Q}},setLocked:function(Q){D=Q},setClear:function(Q){fe!==Q&&(fe=Q,ne&&(Q=1-Q),i.clearDepth(Q))},reset:function(){D=!1,K=null,oe=null,fe=null,ne=!1}}}function s(){let D=!1,ne=null,K=null,oe=null,fe=null,Q=null,Me=null,xe=null,ct=null;return{setTest:function(tt){D||(tt?ee(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(tt){ne!==tt&&!D&&(i.stencilMask(tt),ne=tt)},setFunc:function(tt,ln,dn){(K!==tt||oe!==ln||fe!==dn)&&(i.stencilFunc(tt,ln,dn),K=tt,oe=ln,fe=dn)},setOp:function(tt,ln,dn){(Q!==tt||Me!==ln||xe!==dn)&&(i.stencilOp(tt,ln,dn),Q=tt,Me=ln,xe=dn)},setLocked:function(tt){D=tt},setClear:function(tt){ct!==tt&&(i.clearStencil(tt),ct=tt)},reset:function(){D=!1,ne=null,K=null,oe=null,fe=null,Q=null,Me=null,xe=null,ct=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let d={},h={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,T=null,A=null,y=null,w=null,S=null,R=null,x=new Oe(0,0,0),b=0,P=!1,C=null,N=null,G=null,W=null,B=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(j)[1]),V=J>=1):j.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),V=J>=2);let de=null,pe={};const _e=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),at=new rt().fromArray(_e),Ye=new rt().fromArray(qe);function Z(D,ne,K,oe){const fe=new Uint8Array(4),Q=i.createTexture();i.bindTexture(D,Q),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<K;Me++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ne+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return Q}const ie={};ie[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(i.DEPTH_TEST),a.setFunc(zi),pt(!1),_t(Vo),ee(i.CULL_FACE),Ke(Pn);function ee(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function Ce(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Le(D,ne){return u[D]!==ne?(i.bindFramebuffer(D,ne),u[D]=ne,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ne),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function we(D,ne){let K=g,oe=!1;if(D){K=f.get(ne),K===void 0&&(K=[],f.set(ne,K));const fe=D.textures;if(K.length!==fe.length||K[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Me=fe.length;Q<Me;Q++)K[Q]=i.COLOR_ATTACHMENT0+Q;K.length=fe.length,oe=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,oe=!0);oe&&i.drawBuffers(K)}function ht(D){return v!==D?(i.useProgram(D),v=D,!0):!1}const ze={[ri]:i.FUNC_ADD,[Bd]:i.FUNC_SUBTRACT,[zd]:i.FUNC_REVERSE_SUBTRACT};ze[Hd]=i.MIN,ze[Gd]=i.MAX;const Qe={[Vd]:i.ZERO,[Wd]:i.ONE,[Xd]:i.SRC_COLOR,[ha]:i.SRC_ALPHA,[Jd]:i.SRC_ALPHA_SATURATE,[$d]:i.DST_COLOR,[Yd]:i.DST_ALPHA,[qd]:i.ONE_MINUS_SRC_COLOR,[ua]:i.ONE_MINUS_SRC_ALPHA,[Zd]:i.ONE_MINUS_DST_COLOR,[Kd]:i.ONE_MINUS_DST_ALPHA,[Qd]:i.CONSTANT_COLOR,[jd]:i.ONE_MINUS_CONSTANT_COLOR,[eh]:i.CONSTANT_ALPHA,[th]:i.ONE_MINUS_CONSTANT_ALPHA};function Ke(D,ne,K,oe,fe,Q,Me,xe,ct,tt){if(D===Pn){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(ee(i.BLEND),m=!0),D!==Od){if(D!==p||tt!==P){if((T!==ri||w!==ri)&&(i.blendEquation(i.FUNC_ADD),T=ri,w=ri),tt)switch(D){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ki:i.blendFunc(i.ONE,i.ONE);break;case Wo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",D);break}else switch(D){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wo:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xo:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",D);break}A=null,y=null,S=null,R=null,x.set(0,0,0),b=0,p=D,P=tt}return}fe=fe||ne,Q=Q||K,Me=Me||oe,(ne!==T||fe!==w)&&(i.blendEquationSeparate(ze[ne],ze[fe]),T=ne,w=fe),(K!==A||oe!==y||Q!==S||Me!==R)&&(i.blendFuncSeparate(Qe[K],Qe[oe],Qe[Q],Qe[Me]),A=K,y=oe,S=Q,R=Me),(xe.equals(x)===!1||ct!==b)&&(i.blendColor(xe.r,xe.g,xe.b,ct),x.copy(xe),b=ct),p=D,P=!1}function Ve(D,ne){D.side===Ut?Ce(i.CULL_FACE):ee(i.CULL_FACE);let K=D.side===Vt;ne&&(K=!K),pt(K),D.blending===hi&&D.transparent===!1?Ke(Pn):Ke(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const oe=D.stencilWrite;o.setTest(oe),oe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),wt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(D){C!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),C=D)}function _t(D){D!==Nd?(ee(i.CULL_FACE),D!==N&&(D===Vo?i.cullFace(i.BACK):D===Fd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),N=D}function St(D){D!==G&&(V&&i.lineWidth(D),G=D)}function wt(D,ne,K){D?(ee(i.POLYGON_OFFSET_FILL),(W!==ne||B!==K)&&(W=ne,B=K,a.getReversed()&&(ne=-ne),i.polygonOffset(ne,K))):Ce(i.POLYGON_OFFSET_FILL)}function ot(D){D?ee(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function mt(D){D===void 0&&(D=i.TEXTURE0+q-1),de!==D&&(i.activeTexture(D),de=D)}function L(D,ne,K){K===void 0&&(de===null?K=i.TEXTURE0+q-1:K=de);let oe=pe[K];oe===void 0&&(oe={type:void 0,texture:void 0},pe[K]=oe),(oe.type!==D||oe.texture!==ne)&&(de!==K&&(i.activeTexture(K),de=K),i.bindTexture(D,ne||ie[D]),oe.type=D,oe.texture=ne)}function zt(){const D=pe[de];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function $e(){try{i.compressedTexImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function _(){try{i.texSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function F(){try{i.texSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function X(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function te(){try{i.texStorage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function se(){try{i.texStorage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function Y(){try{i.texImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function $(){try{i.texImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function re(D){return h[D]!==void 0?h[D]:i.getParameter(D)}function ye(D,ne){h[D]!==ne&&(i.pixelStorei(D,ne),h[D]=ne)}function ce(D){at.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),at.copy(D))}function ae(D){Ye.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ye.copy(D))}function Te(D,ne){let K=l.get(ne);K===void 0&&(K=new WeakMap,l.set(ne,K));let oe=K.get(D);oe===void 0&&(oe=i.getUniformBlockIndex(ne,D.name),K.set(D,oe))}function Ae(D,ne){const oe=l.get(ne).get(D);c.get(ne)!==oe&&(i.uniformBlockBinding(ne,oe,D.__bindingPointIndex),c.set(ne,oe))}function Ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},h={},de=null,pe={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,T=null,A=null,y=null,w=null,S=null,R=null,x=new Oe(0,0,0),b=0,P=!1,C=null,N=null,G=null,W=null,B=null,at.set(0,0,i.canvas.width,i.canvas.height),Ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ce,bindFramebuffer:Le,drawBuffers:we,useProgram:ht,setBlending:Ke,setMaterial:Ve,setFlipSided:pt,setCullFace:_t,setLineWidth:St,setPolygonOffset:wt,setScissorTest:ot,activeTexture:mt,bindTexture:L,unbindTexture:zt,compressedTexImage2D:$e,compressedTexImage3D:E,texImage2D:Y,texImage3D:$,pixelStorei:ye,getParameter:re,updateUBOMapping:Te,uniformBlockBinding:Ae,texStorage2D:te,texStorage3D:se,texSubImage2D:_,texSubImage3D:F,compressedTexSubImage2D:z,compressedTexSubImage3D:X,scissor:ce,viewport:ae,reset:Ie}}function q0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,d=new WeakMap,h=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,_){return g?new OffscreenCanvas(E,_):us("canvas")}function m(E,_,F){let z=1;const X=$e(E);if((X.width>F||X.height>F)&&(z=F/Math.max(X.width,X.height)),z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const te=Math.floor(z*X.width),se=Math.floor(z*X.height);u===void 0&&(u=v(te,se));const Y=_?v(te,se):u;return Y.width=te,Y.height=se,Y.getContext("2d").drawImage(E,0,0,te,se),Re("WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+te+"x"+se+")."),Y}else return"data"in E&&Re("WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),E;return E}function p(E){return E.generateMipmaps}function T(E){i.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(E,_,F,z,X,te=!1){if(E!==null){if(i[E]!==void 0)return i[E];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let se;z&&(se=e.get("EXT_texture_norm16"),se||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===i.RED&&(F===i.FLOAT&&(Y=i.R32F),F===i.HALF_FLOAT&&(Y=i.R16F),F===i.UNSIGNED_BYTE&&(Y=i.R8),F===i.UNSIGNED_SHORT&&se&&(Y=se.R16_EXT),F===i.SHORT&&se&&(Y=se.R16_SNORM_EXT)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.R8UI),F===i.UNSIGNED_SHORT&&(Y=i.R16UI),F===i.UNSIGNED_INT&&(Y=i.R32UI),F===i.BYTE&&(Y=i.R8I),F===i.SHORT&&(Y=i.R16I),F===i.INT&&(Y=i.R32I)),_===i.RG&&(F===i.FLOAT&&(Y=i.RG32F),F===i.HALF_FLOAT&&(Y=i.RG16F),F===i.UNSIGNED_BYTE&&(Y=i.RG8),F===i.UNSIGNED_SHORT&&se&&(Y=se.RG16_EXT),F===i.SHORT&&se&&(Y=se.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RG8UI),F===i.UNSIGNED_SHORT&&(Y=i.RG16UI),F===i.UNSIGNED_INT&&(Y=i.RG32UI),F===i.BYTE&&(Y=i.RG8I),F===i.SHORT&&(Y=i.RG16I),F===i.INT&&(Y=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),F===i.UNSIGNED_INT&&(Y=i.RGB32UI),F===i.BYTE&&(Y=i.RGB8I),F===i.SHORT&&(Y=i.RGB16I),F===i.INT&&(Y=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),F===i.UNSIGNED_INT&&(Y=i.RGBA32UI),F===i.BYTE&&(Y=i.RGBA8I),F===i.SHORT&&(Y=i.RGBA16I),F===i.INT&&(Y=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_SHORT&&se&&(Y=se.RGB16_EXT),F===i.SHORT&&se&&(Y=se.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),_===i.RGBA){const $=te?ar:He.getTransfer(X);F===i.FLOAT&&(Y=i.RGBA32F),F===i.HALF_FLOAT&&(Y=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Y=$===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&se&&(Y=se.RGBA16_EXT),F===i.SHORT&&se&&(Y=se.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function w(E,_){let F;return E?_===null||_===Sn||_===ds?F=i.DEPTH24_STENCIL8:_===_n?F=i.DEPTH32F_STENCIL8:_===ls&&(F=i.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Sn||_===ds?F=i.DEPTH_COMPONENT24:_===_n?F=i.DEPTH_COMPONENT32F:_===ls&&(F=i.DEPTH_COMPONENT16),F}function S(E,_){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==At&&E.minFilter!==kt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){const _=E.target;_.removeEventListener("dispose",R),b(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function x(E){const _=E.target;_.removeEventListener("dispose",x),C(_)}function b(E){const _=n.get(E);if(_.__webglInit===void 0)return;const F=E.source,z=f.get(F);if(z){const X=z[_.__cacheKey];X.usedTimes--,X.usedTimes===0&&P(E),Object.keys(z).length===0&&f.delete(F)}n.remove(E)}function P(E){const _=n.get(E);i.deleteTexture(_.__webglTexture);const F=E.source,z=f.get(F);delete z[_.__cacheKey],a.memory.textures--}function C(E){const _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(_.__webglFramebuffer[z]))for(let X=0;X<_.__webglFramebuffer[z].length;X++)i.deleteFramebuffer(_.__webglFramebuffer[z][X]);else i.deleteFramebuffer(_.__webglFramebuffer[z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[z])}else{if(Array.isArray(_.__webglFramebuffer))for(let z=0;z<_.__webglFramebuffer.length;z++)i.deleteFramebuffer(_.__webglFramebuffer[z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let z=0;z<_.__webglColorRenderbuffer.length;z++)_.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=E.textures;for(let z=0,X=F.length;z<X;z++){const te=n.get(F[z]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(F[z])}n.remove(E)}let N=0;function G(){N=0}function W(){return N}function B(E){N=E}function q(){const E=N;return E>=s.maxTextures&&Re("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),N+=1,E}function V(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function J(E,_){const F=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){const z=E.image;if(z===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(F,E,_);return}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function j(E,_){const F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){Ce(F,E,_);return}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function de(E,_){const F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){Ce(F,E,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function pe(E,_){const F=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&F.__version!==E.version){Le(F,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const _e={[Mn]:i.REPEAT,[Ft]:i.CLAMP_TO_EDGE,[Ma]:i.MIRRORED_REPEAT},qe={[At]:i.NEAREST,[sh]:i.NEAREST_MIPMAP_NEAREST,[ys]:i.NEAREST_MIPMAP_LINEAR,[kt]:i.LINEAR,[Tr]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},at={[oh]:i.NEVER,[uh]:i.ALWAYS,[ch]:i.LESS,[go]:i.LEQUAL,[lh]:i.EQUAL,[_o]:i.GEQUAL,[dh]:i.GREATER,[hh]:i.NOTEQUAL};function Ye(E,_){if(_.type===_n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===kt||_.magFilter===Tr||_.magFilter===ys||_.magFilter===ci||_.minFilter===kt||_.minFilter===Tr||_.minFilter===ys||_.minFilter===ci)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,_e[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,_e[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,_e[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,qe[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,qe[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,at[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==ys&&_.minFilter!==ci||_.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Z(E,_){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));const z=_.source;let X=f.get(z);X===void 0&&(X={},f.set(z,X));const te=V(_);if(te!==E.__cacheKey){X[te]===void 0&&(X[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),X[te].usedTimes++;const se=X[E.__cacheKey];se!==void 0&&(X[E.__cacheKey].usedTimes--,se.usedTimes===0&&P(_)),E.__cacheKey=te,E.__webglTexture=X[te].texture}return F}function ie(E,_,F){return Math.floor(Math.floor(E/F)/_)}function ee(E,_,F,z){const te=E.updateRanges;if(te.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,z,_.data);else{te.sort((ye,ce)=>ye.start-ce.start);let se=0;for(let ye=1;ye<te.length;ye++){const ce=te[se],ae=te[ye],Te=ce.start+ce.count,Ae=ie(ae.start,_.width,4),Ie=ie(ce.start,_.width,4);ae.start<=Te+1&&Ae===Ie&&ie(ae.start+ae.count-1,_.width,4)===Ae?ce.count=Math.max(ce.count,ae.start+ae.count-ce.start):(++se,te[se]=ae)}te.length=se+1;const Y=t.getParameter(i.UNPACK_ROW_LENGTH),$=t.getParameter(i.UNPACK_SKIP_PIXELS),re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ye=0,ce=te.length;ye<ce;ye++){const ae=te[ye],Te=Math.floor(ae.start/4),Ae=Math.ceil(ae.count/4),Ie=Te%_.width,D=Math.floor(Te/_.width),ne=Ae,K=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ie,D,ne,K,F,z,_.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,$),t.pixelStorei(i.UNPACK_SKIP_ROWS,re)}}function Ce(E,_,F){let z=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(z=i.TEXTURE_3D);const X=Z(E,_),te=_.source;t.bindTexture(z,E.__webglTexture,i.TEXTURE0+F);const se=n.get(te);if(te.version!==se.__version||X===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const K=He.getPrimaries(He.workingColorSpace),oe=_.colorSpace===Xn?null:He.getPrimaries(_.colorSpace),fe=_.colorSpace===Xn||K===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let $=m(_.image,!1,s.maxTextureSize);$=zt(_,$);const re=r.convert(_.format,_.colorSpace),ye=r.convert(_.type);let ce=y(_.internalFormat,re,ye,_.normalized,_.colorSpace,_.isVideoTexture);Ye(z,_);let ae;const Te=_.mipmaps,Ae=_.isVideoTexture!==!0,Ie=se.__version===void 0||X===!0,D=te.dataReady,ne=S(_,$);if(_.isDepthTexture)ce=w(_.format===li,_.type),Ie&&(Ae?t.texStorage2D(i.TEXTURE_2D,1,ce,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,ce,$.width,$.height,0,re,ye,null));else if(_.isDataTexture)if(Te.length>0){Ae&&Ie&&t.texStorage2D(i.TEXTURE_2D,ne,ce,Te[0].width,Te[0].height);for(let K=0,oe=Te.length;K<oe;K++)ae=Te[K],Ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,re,ye,ae.data):t.texImage2D(i.TEXTURE_2D,K,ce,ae.width,ae.height,0,re,ye,ae.data);_.generateMipmaps=!1}else Ae?(Ie&&t.texStorage2D(i.TEXTURE_2D,ne,ce,$.width,$.height),D&&ee(_,$,re,ye)):t.texImage2D(i.TEXTURE_2D,0,ce,$.width,$.height,0,re,ye,$.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ae&&Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,ce,Te[0].width,Te[0].height,$.depth);for(let K=0,oe=Te.length;K<oe;K++)if(ae=Te[K],_.format!==on)if(re!==null)if(Ae){if(D)if(_.layerUpdates.size>0){const fe=Sc(ae.width,ae.height,_.format,_.type);for(const Q of _.layerUpdates){const Me=ae.data.subarray(Q*fe/ae.data.BYTES_PER_ELEMENT,(Q+1)*fe/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,Q,ae.width,ae.height,1,re,Me)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,$.depth,re,ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,ce,ae.width,ae.height,$.depth,0,ae.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ae?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,$.depth,re,ye,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,ce,ae.width,ae.height,$.depth,0,re,ye,ae.data)}else{Ae&&Ie&&t.texStorage2D(i.TEXTURE_2D,ne,ce,Te[0].width,Te[0].height);for(let K=0,oe=Te.length;K<oe;K++)ae=Te[K],_.format!==on?re!==null?Ae?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,re,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,K,ce,ae.width,ae.height,0,ae.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ae.width,ae.height,re,ye,ae.data):t.texImage2D(i.TEXTURE_2D,K,ce,ae.width,ae.height,0,re,ye,ae.data)}else if(_.isDataArrayTexture)if(Ae){if(Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,ce,$.width,$.height,$.depth),D)if(_.layerUpdates.size>0){const K=Sc($.width,$.height,_.format,_.type);for(const oe of _.layerUpdates){const fe=$.data.subarray(oe*K/$.data.BYTES_PER_ELEMENT,(oe+1)*K/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,$.width,$.height,1,re,ye,fe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,re,ye,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,$.width,$.height,$.depth,0,re,ye,$.data);else if(_.isData3DTexture)Ae?(Ie&&t.texStorage3D(i.TEXTURE_3D,ne,ce,$.width,$.height,$.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,re,ye,$.data)):t.texImage3D(i.TEXTURE_3D,0,ce,$.width,$.height,$.depth,0,re,ye,$.data);else if(_.isFramebufferTexture){if(Ie)if(Ae)t.texStorage2D(i.TEXTURE_2D,ne,ce,$.width,$.height);else{let K=$.width,oe=$.height;for(let fe=0;fe<ne;fe++)t.texImage2D(i.TEXTURE_2D,fe,ce,K,oe,0,re,ye,null),K>>=1,oe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const K=i.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),$.parentNode!==K){K.appendChild($),h.add(_),K.onpaint=oe=>{const fe=oe.changedElements;for(const Q of h)fe.includes(Q.image)&&(Q.needsUpdate=!0)},K.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,$);else{const fe=i.RGBA,Q=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,fe,Q,Me,$)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Te.length>0){if(Ae&&Ie){const K=$e(Te[0]);t.texStorage2D(i.TEXTURE_2D,ne,ce,K.width,K.height)}for(let K=0,oe=Te.length;K<oe;K++)ae=Te[K],Ae?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,re,ye,ae):t.texImage2D(i.TEXTURE_2D,K,ce,re,ye,ae);_.generateMipmaps=!1}else if(Ae){if(Ie){const K=$e($);t.texStorage2D(i.TEXTURE_2D,ne,ce,K.width,K.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re,ye,$)}else t.texImage2D(i.TEXTURE_2D,0,ce,re,ye,$);p(_)&&T(z),se.__version=te.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Le(E,_,F){if(_.image.length!==6)return;const z=Z(E,_),X=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);const te=n.get(X);if(X.version!==te.__version||z===!0){t.activeTexture(i.TEXTURE0+F);const se=He.getPrimaries(He.workingColorSpace),Y=_.colorSpace===Xn?null:He.getPrimaries(_.colorSpace),$=_.colorSpace===Xn||se===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const re=_.isCompressedTexture||_.image[0].isCompressedTexture,ye=_.image[0]&&_.image[0].isDataTexture,ce=[];for(let Q=0;Q<6;Q++)!re&&!ye?ce[Q]=m(_.image[Q],!0,s.maxCubemapSize):ce[Q]=ye?_.image[Q].image:_.image[Q],ce[Q]=zt(_,ce[Q]);const ae=ce[0],Te=r.convert(_.format,_.colorSpace),Ae=r.convert(_.type),Ie=y(_.internalFormat,Te,Ae,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,ne=te.__version===void 0||z===!0,K=X.dataReady;let oe=S(_,ae);Ye(i.TEXTURE_CUBE_MAP,_);let fe;if(re){D&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ie,ae.width,ae.height);for(let Q=0;Q<6;Q++){fe=ce[Q].mipmaps;for(let Me=0;Me<fe.length;Me++){const xe=fe[Me];_.format!==on?Te!==null?D?K&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,xe.width,xe.height,Te,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,Ie,xe.width,xe.height,0,xe.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,xe.width,xe.height,Te,Ae,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,Ie,xe.width,xe.height,0,Te,Ae,xe.data)}}}else{if(fe=_.mipmaps,D&&ne){fe.length>0&&oe++;const Q=$e(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ie,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ye){D?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ce[Q].width,ce[Q].height,Te,Ae,ce[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ie,ce[Q].width,ce[Q].height,0,Te,Ae,ce[Q].data);for(let Me=0;Me<fe.length;Me++){const ct=fe[Me].image[Q].image;D?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,ct.width,ct.height,Te,Ae,ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,Ie,ct.width,ct.height,0,Te,Ae,ct.data)}}else{D?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Te,Ae,ce[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ie,Te,Ae,ce[Q]);for(let Me=0;Me<fe.length;Me++){const xe=fe[Me];D?K&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,Te,Ae,xe.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,Ie,Te,Ae,xe.image[Q])}}}p(_)&&T(i.TEXTURE_CUBE_MAP),te.__version=X.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function we(E,_,F,z,X,te){const se=r.convert(F.format,F.colorSpace),Y=r.convert(F.type),$=y(F.internalFormat,se,Y,F.normalized,F.colorSpace),re=n.get(_),ye=n.get(F);if(ye.__renderTarget=_,!re.__hasExternalTextures){const ce=Math.max(1,_.width>>te),ae=Math.max(1,_.height>>te);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?t.texImage3D(X,te,$,ce,ae,_.depth,0,se,Y,null):t.texImage2D(X,te,$,ce,ae,0,se,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,X,ye.__webglTexture,0,ot(_)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,X,ye.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(E,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){const z=_.depthTexture,X=z&&z.isDepthTexture?z.type:null,te=w(_.stencilBuffer,X),se=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(_),te,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(_),te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,te,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,E)}else{const z=_.textures;for(let X=0;X<z.length;X++){const te=z[X],se=r.convert(te.format,te.colorSpace),Y=r.convert(te.type),$=y(te.internalFormat,se,Y,te.normalized,te.colorSpace);mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(_),$,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(_),$,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,$,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(E,_,F){const z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const X=n.get(_.depthTexture);if(X.__renderTarget=_,(!X.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z){if(X.__webglInit===void 0&&(X.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),X.__webglTexture===void 0){X.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,_.depthTexture);const re=r.convert(_.depthTexture.format),ye=r.convert(_.depthTexture.type);let ce;_.depthTexture.format===Un?ce=i.DEPTH_COMPONENT24:_.depthTexture.format===li&&(ce=i.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ce,_.width,_.height,0,re,ye,null)}}else J(_.depthTexture,0);const te=X.__webglTexture,se=ot(_),Y=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,$=_.depthTexture.format===li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Un)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Y,te,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,$,Y,te,0);else if(_.depthTexture.format===li)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Y,te,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,$,Y,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qe(E){const _=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const z=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),z){const X=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,z.removeEventListener("dispose",X)};z.addEventListener("dispose",X),_.__depthDisposeCallback=X}_.__boundDepthTexture=z}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(F)for(let z=0;z<6;z++)ze(_.__webglFramebuffer[z],E,z);else{const z=E.texture.mipmaps;z&&z.length>0?ze(_.__webglFramebuffer[0],E,0):ze(_.__webglFramebuffer,E,0)}else if(F){_.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[z]),_.__webglDepthbuffer[z]===void 0)_.__webglDepthbuffer[z]=i.createRenderbuffer(),ht(_.__webglDepthbuffer[z],E,!1);else{const X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,te)}}else{const z=E.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ht(_.__webglDepthbuffer,E,!1);else{const X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,te)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ke(E,_,F){const z=n.get(E);_!==void 0&&we(z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Qe(E)}function Ve(E){const _=E.texture,F=n.get(E),z=n.get(_);E.addEventListener("dispose",x);const X=E.textures,te=E.isWebGLCubeRenderTarget===!0,se=X.length>1;if(se||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=_.version,a.memory.textures++),te){F.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[Y]=[];for(let $=0;$<_.mipmaps.length;$++)F.__webglFramebuffer[Y][$]=i.createFramebuffer()}else F.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)F.__webglFramebuffer[Y]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(se)for(let Y=0,$=X.length;Y<$;Y++){const re=n.get(X[Y]);re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&mt(E)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Y=0;Y<X.length;Y++){const $=X[Y];F.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[Y]);const re=r.convert($.format,$.colorSpace),ye=r.convert($.type),ce=y($.internalFormat,re,ye,$.normalized,$.colorSpace,E.isXRRenderTarget===!0),ae=ot(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,ce,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,F.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)we(F.__webglFramebuffer[Y][$],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,$);else we(F.__webglFramebuffer[Y],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(_)&&T(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){for(let Y=0,$=X.length;Y<$;Y++){const re=X[Y],ye=n.get(re);let ce=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ce=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ye.__webglTexture),Ye(ce,re),we(F.__webglFramebuffer,E,re,i.COLOR_ATTACHMENT0+Y,ce,0),p(re)&&T(ce)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Y=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,z.__webglTexture),Ye(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let $=0;$<_.mipmaps.length;$++)we(F.__webglFramebuffer[$],E,_,i.COLOR_ATTACHMENT0,Y,$);else we(F.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,Y,0);p(_)&&T(Y),t.unbindTexture()}E.depthBuffer&&Qe(E)}function pt(E){const _=E.textures;for(let F=0,z=_.length;F<z;F++){const X=_[F];if(p(X)){const te=A(E),se=n.get(X).__webglTexture;t.bindTexture(te,se),T(te),t.unbindTexture()}}}const _t=[],St=[];function wt(E){if(E.samples>0){if(mt(E)===!1){const _=E.textures,F=E.width,z=E.height;let X=i.COLOR_BUFFER_BIT;const te=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=n.get(E),Y=_.length>1;if(Y)for(let re=0;re<_.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer);const $=E.texture.mipmaps;$&&$.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let re=0;re<_.length;re++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);const ye=n.get(_[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,F,z,0,0,F,z,X,i.NEAREST),c===!0&&(_t.length=0,St.length=0,_t.push(i.COLOR_ATTACHMENT0+re),E.depthBuffer&&E.resolveDepthBuffer===!1&&(_t.push(te),St.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,St)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let re=0;re<_.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,se.__webglColorRenderbuffer[re]);const ye=n.get(_[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function ot(E){return Math.min(s.maxSamples,E.samples)}function mt(E){const _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(E){const _=a.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function zt(E,_){const F=E.colorSpace,z=E.format,X=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==rr&&F!==Xn&&(He.getTransfer(F)===Ze?(z!==on||X!==Zt)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",F)),_}function $e(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=G,this.getTextureUnits=W,this.setTextureUnits=B,this.setTexture2D=J,this.setTexture2DArray=j,this.setTexture3D=de,this.setTextureCube=pe,this.rebindTextures=Ke,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=we,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Y0(i,e){function t(n,s=Xn){let r;const a=He.getTransfer(s);if(n===Zt)return i.UNSIGNED_BYTE;if(n===ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===uo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_l)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===pl)return i.BYTE;if(n===ml)return i.SHORT;if(n===ls)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===Sn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===xl)return i.ALPHA;if(n===vl)return i.RGB;if(n===on)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===li)return i.DEPTH_STENCIL;if(n===Ml)return i.RED;if(n===fo)return i.RED_INTEGER;if(n===fi)return i.RG;if(n===po)return i.RG_INTEGER;if(n===mo)return i.RGBA_INTEGER;if(n===Js||n===Qs||n===js||n===er)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ya||n===Sa||n===ba||n===Ea)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ta||n===wa||n===Aa||n===Ra||n===Ca||n===ir||n===Pa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ta||n===wa)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Aa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ra)return r.COMPRESSED_R11_EAC;if(n===Ca)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ir)return r.COMPRESSED_RG11_EAC;if(n===Pa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Da||n===La||n===Ia||n===Ua||n===Na||n===Fa||n===ka||n===Oa||n===Ba||n===za||n===Ha||n===Ga||n===Va||n===Wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Da)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===La)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ia)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ua)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Na)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ka)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ba)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===za)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ha)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ga)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Va)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===qa||n===Ya)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Xa)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ka||n===$a||n===sr||n===Za)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ka)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const K0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Z0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Dl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bn({vertexShader:K0,fragmentShader:$0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new be(new jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class J0 extends pi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new Z0,p={},T=t.getContextAttributes();let A=null,y=null;const w=[],S=[],R=new Be;let x=null;const b=new $t;b.viewport=new rt;const P=new $t;P.viewport=new rt;const C=[b,P],N=new au;let G=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ie=w[Z];return ie===void 0&&(ie=new Ir,w[Z]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Z){let ie=w[Z];return ie===void 0&&(ie=new Ir,w[Z]=ie),ie.getGripSpace()},this.getHand=function(Z){let ie=w[Z];return ie===void 0&&(ie=new Ir,w[Z]=ie),ie.getHandSpace()};function B(Z){const ie=S.indexOf(Z.inputSource);if(ie===-1)return;const ee=w[ie];ee!==void 0&&(ee.update(Z.inputSource,Z.frame,l||a),ee.dispatchEvent({type:Z.type,data:Z.inputSource}))}function q(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",V);for(let Z=0;Z<w.length;Z++){const ie=S[Z];ie!==null&&(S[Z]=null,w[Z].disconnect(ie))}G=null,W=null,m.reset();for(const Z in p)delete p[Z];e.setRenderTarget(A),f=null,u=null,h=null,s=null,y=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",q),s.addEventListener("inputsourceschange",V),T.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ce=null,Le=null;T.depth&&(Le=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=T.stencil?li:Un,Ce=T.stencil?ds:Sn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(we),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new yn(u.textureWidth,u.textureHeight,{format:on,type:Zt,depthTexture:new Gi(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new yn(f.framebufferWidth,f.framebufferHeight,{format:on,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(Z){for(let ie=0;ie<Z.removed.length;ie++){const ee=Z.removed[ie],Ce=S.indexOf(ee);Ce>=0&&(S[Ce]=null,w[Ce].disconnect(ee))}for(let ie=0;ie<Z.added.length;ie++){const ee=Z.added[ie];let Ce=S.indexOf(ee);if(Ce===-1){for(let we=0;we<w.length;we++)if(we>=S.length){S.push(ee),Ce=we;break}else if(S[we]===null){S[we]=ee,Ce=we;break}if(Ce===-1)break}const Le=w[Ce];Le&&Le.connect(ee)}}const J=new U,j=new U;function de(Z,ie,ee){J.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const Ce=J.distanceTo(j),Le=ie.projectionMatrix.elements,we=ee.projectionMatrix.elements,ht=Le[14]/(Le[10]-1),ze=Le[14]/(Le[10]+1),Qe=(Le[9]+1)/Le[5],Ke=(Le[9]-1)/Le[5],Ve=(Le[8]-1)/Le[0],pt=(we[8]+1)/we[0],_t=ht*Ve,St=ht*pt,wt=Ce/(-Ve+pt),ot=wt*-Ve;if(ie.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ot),Z.translateZ(wt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Le[10]===-1)Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const mt=ht+wt,L=ze+wt,zt=_t-ot,$e=St+(Ce-ot),E=Qe*ze/L*mt,_=Ke*ze/L*mt;Z.projectionMatrix.makePerspective(zt,$e,E,_,mt,L),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pe(Z,ie){ie===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ie.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ie=Z.near,ee=Z.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),N.near=P.near=b.near=ie,N.far=P.far=b.far=ee,(G!==N.near||W!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),G=N.near,W=N.far),N.layers.mask=Z.layers.mask|6,b.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Ce=Z.parent,Le=N.cameras;pe(N,Ce);for(let we=0;we<Le.length;we++)pe(Le[we],Ce);Le.length===2?de(N,b,P):N.projectionMatrix.copy(b.projectionMatrix),_e(Z,N,Ce)};function _e(Z,ie,ee){ee===null?Z.matrix.copy(ie.matrixWorld):(Z.matrix.copy(ee.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ie.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Qa*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Z){c=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(Z){return p[Z]};let qe=null;function at(Z,ie){if(d=ie.getViewerPose(l||a),g=ie,d!==null){const ee=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ce=!1;ee.length!==N.cameras.length&&(N.cameras.length=0,Ce=!0);for(let ze=0;ze<ee.length;ze++){const Qe=ee[ze];let Ke=null;if(f!==null)Ke=f.getViewport(Qe);else{const pt=h.getViewSubImage(u,Qe);Ke=pt.viewport,ze===0&&(e.setRenderTargetTextures(y,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(y))}let Ve=C[ze];Ve===void 0&&(Ve=new $t,Ve.layers.enable(ze),Ve.viewport=new rt,C[ze]=Ve),Ve.matrix.fromArray(Qe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Qe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ze===0&&(N.matrix.copy(Ve.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ce===!0&&N.cameras.push(Ve)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const ze=h.getDepthInformation(ee[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(Le&&Le.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let ze=0;ze<ee.length;ze++){const Qe=ee[ze].camera;if(Qe){let Ke=p[Qe];Ke||(Ke=new Dl,p[Qe]=Ke);const Ve=h.getCameraImage(Qe);Ke.sourceTexture=Ve}}}}for(let ee=0;ee<w.length;ee++){const Ce=S[ee],Le=w[ee];Ce!==null&&Le!==void 0&&Le.update(Ce,ie,l||a)}qe&&qe(Z,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Ye=new Fl;Ye.setAnimationLoop(at),this.setAnimationLoop=function(Z){qe=Z},this.dispose=function(){}}}const Q0=new st,Vl=new De;Vl.set(-1,0,0,0,1,0,0,0,1);function j0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ll(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,A,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,T,A):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),A=T.envMap,y=T.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Q0.makeRotationFromEuler(y)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Vl),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,T,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=A*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function eg(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,w){const S=w.program;n.uniformBlockBinding(y,S)}function l(y,w){let S=s[y.id];S===void 0&&(m(y),S=d(y),s[y.id]=S,y.addEventListener("dispose",T));const R=w.program;n.updateUBOMapping(y,R);const x=e.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function d(y){const w=h();y.__bindingPointIndex=w;const S=i.createBuffer(),R=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const w=s[y.id],S=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let x=0,b=S.length;x<b;x++){const P=S[x];if(Array.isArray(P))for(let C=0,N=P.length;C<N;C++)f(P[C],x,C,R);else f(P,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,w,S,R){if(v(y,w,S,R)===!0){const x=y.__offset,b=y.value;if(Array.isArray(b)){let P=0;for(let C=0;C<b.length;C++){const N=b[C],G=p(N);g(N,y.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,w,S){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,S)}function v(y,w,S,R){const x=y.value,b=w+"_"+S;if(R[b]===void 0)return typeof x=="number"||typeof x=="boolean"?R[b]=x:ArrayBuffer.isView(x)?R[b]=x.slice():R[b]=x.clone(),!0;{const P=R[b];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return R[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(y){const w=y.uniforms;let S=0;const R=16;for(let b=0,P=w.length;b<P;b++){const C=Array.isArray(w[b])?w[b]:[w[b]];for(let N=0,G=C.length;N<G;N++){const W=C[N],B=Array.isArray(W.value)?W.value:[W.value];for(let q=0,V=B.length;q<V;q++){const J=B[q],j=p(J),de=S%R,pe=de%j.boundary,_e=de+pe;S+=pe,_e!==0&&R-_e<j.storage&&(S+=R-_e),W.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=S,S+=j.storage}}}const x=S%R;return x>0&&(S+=R-x),y.__size=S,y.__cache={},this}function p(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",y),w}function T(y){const w=y.target;w.removeEventListener("dispose",T);const S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function A(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:A}}const tg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fn=null;function ng(){return fn===null&&(fn=new Rl(tg,16,16,fi,In),fn.name="DFG_LUT",fn.minFilter=kt,fn.magFilter=kt,fn.wrapS=Ft,fn.wrapT=Ft,fn.generateMipmaps=!1,fn.needsUpdate=!0),fn}class ig{constructor(e={}){const{canvas:t=ph(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Zt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=f,m=new Set([mo,po,fo]),p=new Set([Zt,Sn,ls,ds,ho,uo]),T=new Uint32Array(4),A=new Int32Array(4),y=new U;let w=null,S=null;const R=[],x=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,N=null,G=null,W=null,B=null;this._outputColorSpace=vt;let q=0,V=0,J=null,j=-1,de=null;const pe=new rt,_e=new rt;let qe=null;const at=new Oe(0);let Ye=0,Z=t.width,ie=t.height,ee=1,Ce=null,Le=null;const we=new rt(0,0,Z,ie),ht=new rt(0,0,Z,ie);let ze=!1;const Qe=new vo;let Ke=!1,Ve=!1;const pt=new st,_t=new U,St=new rt,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function mt(){return J===null?ee:1}let L=n;function zt(M,I){return t.getContext(M,I)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ao}`),t.addEventListener("webglcontextlost",ct,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",ln,!1),L===null){const I="webgl2";if(L=zt(I,M),L===null)throw zt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw Xe("WebGLRenderer: "+M.message),M}let $e,E,_,F,z,X,te,se,Y,$,re,ye,ce,ae,Te,Ae,Ie,D,ne,K,oe,fe,Q;function Me(){$e=new nm(L),$e.init(),oe=new Y0(L,$e),E=new Kp(L,$e,e,oe),_=new X0(L,$e),E.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),G=L.createFramebuffer(),W=L.createFramebuffer(),B=L.createFramebuffer(),F=new rm(L),z=new D0,X=new q0(L,$e,_,z,E,oe,F),te=new tm(P),se=new cu(L),fe=new qp(L,se),Y=new im(L,se,F,fe),$=new om(L,Y,se,fe,F),D=new am(L,E,X),Te=new $p(z),re=new P0(P,te,$e,E,fe,Te),ye=new j0(P,z),ce=new I0,ae=new B0($e),Ie=new Xp(P,te,_,$,g,c),Ae=new W0(P,$,E),Q=new eg(L,F,E,_),ne=new Yp(L,$e,F),K=new sm(L,$e,F),F.programs=re.programs,P.capabilities=E,P.extensions=$e,P.properties=z,P.renderLists=ce,P.shadowMap=Ae,P.state=_,P.info=F}Me(),v!==Zt&&(b=new lm(v,t.width,t.height,o,s,r));const xe=new J0(P,L);this.xr=xe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=$e.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=$e.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(M){M!==void 0&&(ee=M,this.setSize(Z,ie,!1))},this.getSize=function(M){return M.set(Z,ie)},this.setSize=function(M,I,H=!0){if(xe.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=M,ie=I,t.width=Math.floor(M*ee),t.height=Math.floor(I*ee),H===!0&&(t.style.width=M+"px",t.style.height=I+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(Z*ee,ie*ee).floor()},this.setDrawingBufferSize=function(M,I,H){Z=M,ie=I,ee=H,t.width=Math.floor(M*H),t.height=Math.floor(I*H),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(v===Zt){Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(pe)},this.getViewport=function(M){return M.copy(we)},this.setViewport=function(M,I,H,k){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,I,H,k),_.viewport(pe.copy(we).multiplyScalar(ee).round())},this.getScissor=function(M){return M.copy(ht)},this.setScissor=function(M,I,H,k){M.isVector4?ht.set(M.x,M.y,M.z,M.w):ht.set(M,I,H,k),_.scissor(_e.copy(ht).multiplyScalar(ee).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(M){_.setScissorTest(ze=M)},this.setOpaqueSort=function(M){Ce=M},this.setTransparentSort=function(M){Le=M},this.getClearColor=function(M){return M.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,H=!0){let k=0;if(M){let O=!1;if(J!==null){const ue=J.texture.format;O=m.has(ue)}if(O){const ue=J.texture.type,ge=p.has(ue),he=Ie.getClearColor(),ve=Ie.getClearAlpha(),Se=he.r,Ue=he.g,Fe=he.b;ge?(T[0]=Se,T[1]=Ue,T[2]=Fe,T[3]=ve,L.clearBufferuiv(L.COLOR,0,T)):(A[0]=Se,A[1]=Ue,A[2]=Fe,A[3]=ve,L.clearBufferiv(L.COLOR,0,A))}else k|=L.COLOR_BUFFER_BIT}I&&(k|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(k|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&L.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),N=M},this.dispose=function(){t.removeEventListener("webglcontextlost",ct,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),Ie.dispose(),ce.dispose(),ae.dispose(),z.dispose(),te.dispose(),$.dispose(),fe.dispose(),Q.dispose(),re.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",wo),xe.removeEventListener("sessionend",Ao),$n.stop()};function ct(M){M.preventDefault(),Zo("WebGLRenderer: Context Lost."),C=!0}function tt(){Zo("WebGLRenderer: Context Restored."),C=!1;const M=F.autoReset,I=Ae.enabled,H=Ae.autoUpdate,k=Ae.needsUpdate,O=Ae.type;Me(),F.autoReset=M,Ae.enabled=I,Ae.autoUpdate=H,Ae.needsUpdate=k,Ae.type=O}function ln(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function dn(M){const I=M.target;I.removeEventListener("dispose",dn),$l(I)}function $l(M){Zl(M),z.remove(M)}function Zl(M){const I=z.get(M).programs;I!==void 0&&(I.forEach(function(H){re.releaseProgram(H)}),M.isShaderMaterial&&re.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,H,k,O,ue){I===null&&(I=wt);const ge=O.isMesh&&O.matrixWorld.determinantAffine()<0,he=jl(M,I,H,k,O);_.setMaterial(k,ge);let ve=H.index,Se=1;if(k.wireframe===!0){if(ve=Y.getWireframeAttribute(H),ve===void 0)return;Se=2}const Ue=H.drawRange,Fe=H.attributes.position;let Ee=Ue.start*Se,Je=(Ue.start+Ue.count)*Se;ue!==null&&(Ee=Math.max(Ee,ue.start*Se),Je=Math.min(Je,(ue.start+ue.count)*Se)),ve!==null?(Ee=Math.max(Ee,0),Je=Math.min(Je,ve.count)):Fe!=null&&(Ee=Math.max(Ee,0),Je=Math.min(Je,Fe.count));const ut=Je-Ee;if(ut<0||ut===1/0)return;fe.setup(O,k,he,H,ve);let lt,je=ne;if(ve!==null&&(lt=se.get(ve),je=K,je.setIndex(lt)),O.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*mt()),je.setMode(L.LINES)):je.setMode(L.TRIANGLES);else if(O.isLine){let Ct=k.linewidth;Ct===void 0&&(Ct=1),_.setLineWidth(Ct*mt()),O.isLineSegments?je.setMode(L.LINES):O.isLineLoop?je.setMode(L.LINE_LOOP):je.setMode(L.LINE_STRIP)}else O.isPoints?je.setMode(L.POINTS):O.isSprite&&je.setMode(L.TRIANGLES);if(O.isBatchedMesh)if($e.get("WEBGL_multi_draw"))je.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ct=O._multiDrawStarts,me=O._multiDrawCounts,Wt=O._multiDrawCount,We=ve?se.get(ve).bytesPerElement:1,Jt=z.get(k).currentProgram.getUniforms();for(let hn=0;hn<Wt;hn++)Jt.setValue(L,"_gl_DrawID",hn),je.render(Ct[hn]/We,me[hn])}else if(O.isInstancedMesh)je.renderInstances(Ee,ut,O.count);else if(H.isInstancedBufferGeometry){const Ct=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,me=Math.min(H.instanceCount,Ct);je.renderInstances(Ee,ut,me)}else je.render(Ee,ut)};function To(M,I,H){M.transparent===!0&&M.side===Ut&&M.forceSinglePass===!1?(M.side=Vt,M.needsUpdate=!0,xs(M,I,H),M.side=Ln,M.needsUpdate=!0,xs(M,I,H),M.side=Ut):xs(M,I,H)}this.compile=function(M,I,H=null){H===null&&(H=M),S=ae.get(H),S.init(I),x.push(S),H.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),M!==H&&M.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),S.setupLights();const k=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ue=O.material;if(ue)if(Array.isArray(ue))for(let ge=0;ge<ue.length;ge++){const he=ue[ge];To(he,H,O),k.add(he)}else To(ue,H,O),k.add(ue)}),S=x.pop(),k},this.compileAsync=function(M,I,H=null){const k=this.compile(M,I,H);return new Promise(O=>{function ue(){if(k.forEach(function(ge){z.get(ge).currentProgram.isReady()&&k.delete(ge)}),k.size===0){O(M);return}setTimeout(ue,10)}$e.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let mr=null;function Jl(M){mr&&mr(M)}function wo(){$n.stop()}function Ao(){$n.start()}const $n=new Fl;$n.setAnimationLoop(Jl),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(M){mr=M,xe.setAnimationLoop(M),M===null?$n.stop():$n.start()},xe.addEventListener("sessionstart",wo),xe.addEventListener("sessionend",Ao),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(M,I);const H=xe.enabled===!0&&xe.isPresenting===!0,k=b!==null&&(J===null||H)&&b.begin(P,J);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(I),I=xe.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,I,J),S=ae.get(M,x.length),S.init(I),S.state.textureUnits=X.getTextureUnits(),x.push(S),pt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Qe.setFromProjectionMatrix(pt,xn,I.reversedDepth),Ve=this.localClippingEnabled,Ke=Te.init(this.clippingPlanes,Ve),w=ce.get(M,R.length),w.init(),R.push(w),xe.enabled===!0&&xe.isPresenting===!0){const ge=P.xr.getDepthSensingMesh();ge!==null&&gr(ge,I,-1/0,P.sortObjects)}gr(M,I,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Ce,Le,I.reversedDepth),ot=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,ot&&Ie.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Te.beginShadows();const O=S.state.shadowsArray;if(Ae.render(O,M,I),Ke===!0&&Te.endShadows(),(k&&b.hasRenderPass())===!1){const ge=w.opaque,he=w.transmissive;if(S.setupLights(),I.isArrayCamera){const ve=I.cameras;if(he.length>0)for(let Se=0,Ue=ve.length;Se<Ue;Se++){const Fe=ve[Se];Co(ge,he,M,Fe)}ot&&Ie.render(M);for(let Se=0,Ue=ve.length;Se<Ue;Se++){const Fe=ve[Se];Ro(w,M,Fe,Fe.viewport)}}else he.length>0&&Co(ge,he,M,I),ot&&Ie.render(M),Ro(w,M,I)}J!==null&&V===0&&(X.updateMultisampleRenderTarget(J),X.updateRenderTargetMipmap(J)),k&&b.end(P),M.isScene===!0&&M.onAfterRender(P,M,I),fe.resetDefaultState(),j=-1,de=null,x.pop(),x.length>0?(S=x[x.length-1],X.setTextureUnits(S.state.textureUnits),Ke===!0&&Te.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,N!==null&&N.renderEnd()};function gr(M,I,H,k){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)S.pushLightProbeGrid(M);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Qe.intersectsSprite(M)){k&&St.setFromMatrixPosition(M.matrixWorld).applyMatrix4(pt);const ge=$.update(M),he=M.material;he.visible&&w.push(M,ge,he,H,St.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Qe.intersectsObject(M))){const ge=$.update(M),he=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),St.copy(M.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),St.copy(ge.boundingSphere.center)),St.applyMatrix4(M.matrixWorld).applyMatrix4(pt)),Array.isArray(he)){const ve=ge.groups;for(let Se=0,Ue=ve.length;Se<Ue;Se++){const Fe=ve[Se],Ee=he[Fe.materialIndex];Ee&&Ee.visible&&w.push(M,ge,Ee,H,St.z,Fe)}}else he.visible&&w.push(M,ge,he,H,St.z,null)}}const ue=M.children;for(let ge=0,he=ue.length;ge<he;ge++)gr(ue[ge],I,H,k)}function Ro(M,I,H,k){const{opaque:O,transmissive:ue,transparent:ge}=M;S.setupLightsView(H),Ke===!0&&Te.setGlobalState(P.clippingPlanes,H),k&&_.viewport(pe.copy(k)),O.length>0&&_s(O,I,H),ue.length>0&&_s(ue,I,H),ge.length>0&&_s(ge,I,H),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Co(M,I,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){const Ee=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new yn(1,1,{generateMipmaps:!0,type:Ee?In:Zt,minFilter:ci,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace})}const ue=S.state.transmissionRenderTarget[k.id],ge=k.viewport||pe;ue.setSize(ge.z*P.transmissionResolutionScale,ge.w*P.transmissionResolutionScale);const he=P.getRenderTarget(),ve=P.getActiveCubeFace(),Se=P.getActiveMipmapLevel();P.setRenderTarget(ue),P.getClearColor(at),Ye=P.getClearAlpha(),Ye<1&&P.setClearColor(16777215,.5),P.clear(),ot&&Ie.render(H);const Ue=P.toneMapping;P.toneMapping=vn;const Fe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),Ke===!0&&Te.setGlobalState(P.clippingPlanes,k),_s(M,H,k),X.updateMultisampleRenderTarget(ue),X.updateRenderTargetMipmap(ue),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Je=0,ut=I.length;Je<ut;Je++){const lt=I[Je],{object:je,geometry:Ct,material:me,group:Wt}=lt;if(me.side===Ut&&je.layers.test(k.layers)){const We=me.side;me.side=Vt,me.needsUpdate=!0,Po(je,H,k,Ct,me,Wt),me.side=We,me.needsUpdate=!0,Ee=!0}}Ee===!0&&(X.updateMultisampleRenderTarget(ue),X.updateRenderTargetMipmap(ue))}P.setRenderTarget(he,ve,Se),P.setClearColor(at,Ye),Fe!==void 0&&(k.viewport=Fe),P.toneMapping=Ue}function _s(M,I,H){const k=I.isScene===!0?I.overrideMaterial:null;for(let O=0,ue=M.length;O<ue;O++){const ge=M[O],{object:he,geometry:ve,group:Se}=ge;let Ue=ge.material;Ue.allowOverride===!0&&k!==null&&(Ue=k),he.layers.test(H.layers)&&Po(he,I,H,ve,Ue,Se)}}function Po(M,I,H,k,O,ue){M.onBeforeRender(P,I,H,k,O,ue),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(P,I,H,k,M,ue),O.transparent===!0&&O.side===Ut&&O.forceSinglePass===!1?(O.side=Vt,O.needsUpdate=!0,P.renderBufferDirect(H,I,k,O,M,ue),O.side=Ln,O.needsUpdate=!0,P.renderBufferDirect(H,I,k,O,M,ue),O.side=Ut):P.renderBufferDirect(H,I,k,O,M,ue),M.onAfterRender(P,I,H,k,O,ue)}function xs(M,I,H){I.isScene!==!0&&(I=wt);const k=z.get(M),O=S.state.lights,ue=S.state.shadowsArray,ge=O.state.version,he=re.getParameters(M,O.state,ue,I,H,S.state.lightProbeGridArray),ve=re.getProgramCacheKey(he);let Se=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,k.fog=I.fog;const Ue=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=te.get(M.envMap||k.environment,Ue),k.envMapRotation=k.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Se===void 0&&(M.addEventListener("dispose",dn),Se=new Map,k.programs=Se);let Fe=Se.get(ve);if(Fe!==void 0){if(k.currentProgram===Fe&&k.lightsStateVersion===ge)return Lo(M,he),Fe}else he.uniforms=re.getUniforms(M),N!==null&&M.isNodeMaterial&&N.build(M,H,he),M.onBeforeCompile(he,P),Fe=re.acquireProgram(he,ve),Se.set(ve,Fe),k.uniforms=he.uniforms;const Ee=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ee.clippingPlanes=Te.uniform),Lo(M,he),k.needsLights=td(M),k.lightsStateVersion=ge,k.needsLights&&(Ee.ambientLightColor.value=O.state.ambient,Ee.lightProbe.value=O.state.probe,Ee.directionalLights.value=O.state.directional,Ee.directionalLightShadows.value=O.state.directionalShadow,Ee.spotLights.value=O.state.spot,Ee.spotLightShadows.value=O.state.spotShadow,Ee.rectAreaLights.value=O.state.rectArea,Ee.ltc_1.value=O.state.rectAreaLTC1,Ee.ltc_2.value=O.state.rectAreaLTC2,Ee.pointLights.value=O.state.point,Ee.pointLightShadows.value=O.state.pointShadow,Ee.hemisphereLights.value=O.state.hemi,Ee.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ee.spotLightMatrix.value=O.state.spotLightMatrix,Ee.spotLightMap.value=O.state.spotLightMap,Ee.pointShadowMatrix.value=O.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=Fe,k.uniformsList=null,Fe}function Do(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=tr.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Lo(M,I){const H=z.get(M);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function Ql(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(I.matrixWorld);for(let H=0,k=M.length;H<k;H++){const O=M[H];if(O.texture!==null&&O.boundingBox.containsPoint(y))return O}return null}function jl(M,I,H,k,O){I.isScene!==!0&&(I=wt),X.resetTextureUnits();const ue=I.fog,ge=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?I.environment:null,he=J===null?P.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:He.workingColorSpace,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Se=te.get(k.envMap||ge,ve),Ue=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Fe=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ee=!!H.morphAttributes.position,Je=!!H.morphAttributes.normal,ut=!!H.morphAttributes.color;let lt=vn;k.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(lt=P.toneMapping);const je=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ct=je!==void 0?je.length:0,me=z.get(k),Wt=S.state.lights;if(Ke===!0&&(Ve===!0||M!==de)){const nt=M===de&&k.id===j;Te.setState(k,M,nt)}let We=!1;k.version===me.__version?(me.needsLights&&me.lightsStateVersion!==Wt.state.version||me.outputColorSpace!==he||O.isBatchedMesh&&me.batching===!1||!O.isBatchedMesh&&me.batching===!0||O.isBatchedMesh&&me.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&me.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&me.instancing===!1||!O.isInstancedMesh&&me.instancing===!0||O.isSkinnedMesh&&me.skinning===!1||!O.isSkinnedMesh&&me.skinning===!0||O.isInstancedMesh&&me.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&me.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&me.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&me.instancingMorph===!1&&O.morphTexture!==null||me.envMap!==Se||k.fog===!0&&me.fog!==ue||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==Te.numPlanes||me.numIntersection!==Te.numIntersection)||me.vertexAlphas!==Ue||me.vertexTangents!==Fe||me.morphTargets!==Ee||me.morphNormals!==Je||me.morphColors!==ut||me.toneMapping!==lt||me.morphTargetsCount!==Ct||!!me.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(We=!0):(We=!0,me.__version=k.version);let Jt=me.currentProgram;We===!0&&(Jt=xs(k,I,O),N&&k.isNodeMaterial&&N.onUpdateProgram(k,Jt,me));let hn=!1,Nn=!1,mi=!1;const et=Jt.getUniforms(),ft=me.uniforms;if(_.useProgram(Jt.program)&&(hn=!0,Nn=!0,mi=!0),k.id!==j&&(j=k.id,Nn=!0),me.needsLights){const nt=Ql(S.state.lightProbeGridArray,O);me.lightProbeGrid!==nt&&(me.lightProbeGrid=nt,Nn=!0)}if(hn||de!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),et.setValue(L,"projectionMatrix",M.projectionMatrix),et.setValue(L,"viewMatrix",M.matrixWorldInverse);const kn=et.map.cameraPosition;kn!==void 0&&kn.setValue(L,_t.setFromMatrixPosition(M.matrixWorld)),E.logarithmicDepthBuffer&&et.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&et.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),de!==M&&(de=M,Nn=!0,mi=!0)}if(me.needsLights&&(Wt.state.directionalShadowMap.length>0&&et.setValue(L,"directionalShadowMap",Wt.state.directionalShadowMap,X),Wt.state.spotShadowMap.length>0&&et.setValue(L,"spotShadowMap",Wt.state.spotShadowMap,X),Wt.state.pointShadowMap.length>0&&et.setValue(L,"pointShadowMap",Wt.state.pointShadowMap,X)),O.isSkinnedMesh){et.setOptional(L,O,"bindMatrix"),et.setOptional(L,O,"bindMatrixInverse");const nt=O.skeleton;nt&&(nt.boneTexture===null&&nt.computeBoneTexture(),et.setValue(L,"boneTexture",nt.boneTexture,X))}O.isBatchedMesh&&(et.setOptional(L,O,"batchingTexture"),et.setValue(L,"batchingTexture",O._matricesTexture,X),et.setOptional(L,O,"batchingIdTexture"),et.setValue(L,"batchingIdTexture",O._indirectTexture,X),et.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&et.setValue(L,"batchingColorTexture",O._colorsTexture,X));const Fn=H.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&D.update(O,H,Jt),(Nn||me.receiveShadow!==O.receiveShadow)&&(me.receiveShadow=O.receiveShadow,et.setValue(L,"receiveShadow",O.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&I.environment!==null&&(ft.envMapIntensity.value=I.environmentIntensity),ft.dfgLUT!==void 0&&(ft.dfgLUT.value=ng()),Nn){if(et.setValue(L,"toneMappingExposure",P.toneMappingExposure),me.needsLights&&ed(ft,mi),ue&&k.fog===!0&&ye.refreshFogUniforms(ft,ue),ye.refreshMaterialUniforms(ft,k,ee,ie,S.state.transmissionRenderTarget[M.id]),me.needsLights&&me.lightProbeGrid){const nt=me.lightProbeGrid;ft.probesSH.value=nt.texture,ft.probesMin.value.copy(nt.boundingBox.min),ft.probesMax.value.copy(nt.boundingBox.max),ft.probesResolution.value.copy(nt.resolution)}tr.upload(L,Do(me),ft,X)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(tr.upload(L,Do(me),ft,X),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&et.setValue(L,"center",O.center),et.setValue(L,"modelViewMatrix",O.modelViewMatrix),et.setValue(L,"normalMatrix",O.normalMatrix),et.setValue(L,"modelMatrix",O.matrixWorld),k.uniformsGroups!==void 0){const nt=k.uniformsGroups;for(let kn=0,gi=nt.length;kn<gi;kn++){const Io=nt[kn];Q.update(Io,Jt),Q.bind(Io,Jt)}}return Jt}function ed(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function td(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(M,I,H){const k=z.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),z.get(M.texture).__webglTexture=I,z.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:H,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const H=z.get(M);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,H=0){J=M,q=I,V=H;let k=null,O=!1,ue=!1;if(M){const he=z.get(M);if(he.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,he.__webglFramebuffer),pe.copy(M.viewport),_e.copy(M.scissor),qe=M.scissorTest,_.viewport(pe),_.scissor(_e),_.setScissorTest(qe),j=-1;return}else if(he.__webglFramebuffer===void 0)X.setupRenderTarget(M);else if(he.__hasExternalTextures)X.rebindTextures(M,z.get(M.texture).__webglTexture,z.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ue=M.depthTexture;if(he.__boundDepthTexture!==Ue){if(Ue!==null&&z.has(Ue)&&(M.width!==Ue.image.width||M.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(M)}}const ve=M.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(ue=!0);const Se=z.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Se[I])?k=Se[I][H]:k=Se[I],O=!0):M.samples>0&&X.useMultisampledRTT(M)===!1?k=z.get(M).__webglMultisampledFramebuffer:Array.isArray(Se)?k=Se[H]:k=Se,pe.copy(M.viewport),_e.copy(M.scissor),qe=M.scissorTest}else pe.copy(we).multiplyScalar(ee).floor(),_e.copy(ht).multiplyScalar(ee).floor(),qe=ze;if(H!==0&&(k=G),_.bindFramebuffer(L.FRAMEBUFFER,k)&&_.drawBuffers(M,k),_.viewport(pe),_.scissor(_e),_.setScissorTest(qe),O){const he=z.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+I,he.__webglTexture,H)}else if(ue){const he=I;for(let ve=0;ve<M.textures.length;ve++){const Se=z.get(M.textures[ve]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ve,Se.__webglTexture,H,he)}}else if(M!==null&&H!==0){const he=z.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,he.__webglTexture,H)}j=-1},this.readRenderTargetPixels=function(M,I,H,k,O,ue,ge,he=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=z.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(ve=ve[ge]),ve){_.bindFramebuffer(L.FRAMEBUFFER,ve);try{const Se=M.textures[he],Ue=Se.format,Fe=Se.type;if(M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),!E.textureFormatReadable(Ue)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(Fe)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-k&&H>=0&&H<=M.height-O&&L.readPixels(I,H,k,O,oe.convert(Ue),oe.convert(Fe),ue)}finally{const Se=J!==null?z.get(J).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(M,I,H,k,O,ue,ge,he=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=z.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(ve=ve[ge]),ve)if(I>=0&&I<=M.width-k&&H>=0&&H<=M.height-O){_.bindFramebuffer(L.FRAMEBUFFER,ve);const Se=M.textures[he],Ue=Se.format,Fe=Se.type;if(M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+he),!E.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ee),L.bufferData(L.PIXEL_PACK_BUFFER,ue.byteLength,L.STREAM_READ),L.readPixels(I,H,k,O,oe.convert(Ue),oe.convert(Fe),0);const Je=J!==null?z.get(J).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Je);const ut=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await mh(L,ut,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ee),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ue),L.deleteBuffer(Ee),L.deleteSync(ut),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,H=0){const k=Math.pow(2,-H),O=Math.floor(M.image.width*k),ue=Math.floor(M.image.height*k),ge=I!==null?I.x:0,he=I!==null?I.y:0;X.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,ge,he,O,ue),_.unbindTexture()},this.copyTextureToTexture=function(M,I,H=null,k=null,O=0,ue=0){let ge,he,ve,Se,Ue,Fe,Ee,Je,ut;const lt=M.isCompressedTexture?M.mipmaps[ue]:M.image;if(H!==null)ge=H.max.x-H.min.x,he=H.max.y-H.min.y,ve=H.isBox3?H.max.z-H.min.z:1,Se=H.min.x,Ue=H.min.y,Fe=H.isBox3?H.min.z:0;else{const ft=Math.pow(2,-O);ge=Math.floor(lt.width*ft),he=Math.floor(lt.height*ft),M.isDataArrayTexture?ve=lt.depth:M.isData3DTexture?ve=Math.floor(lt.depth*ft):ve=1,Se=0,Ue=0,Fe=0}k!==null?(Ee=k.x,Je=k.y,ut=k.z):(Ee=0,Je=0,ut=0);const je=oe.convert(I.format),Ct=oe.convert(I.type);let me;I.isData3DTexture?(X.setTexture3D(I,0),me=L.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(X.setTexture2DArray(I,0),me=L.TEXTURE_2D_ARRAY):(X.setTexture2D(I,0),me=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,I.unpackAlignment);const Wt=_.getParameter(L.UNPACK_ROW_LENGTH),We=_.getParameter(L.UNPACK_IMAGE_HEIGHT),Jt=_.getParameter(L.UNPACK_SKIP_PIXELS),hn=_.getParameter(L.UNPACK_SKIP_ROWS),Nn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,lt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,lt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Se),_.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Fe);const mi=M.isDataArrayTexture||M.isData3DTexture,et=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const ft=z.get(M),Fn=z.get(I),nt=z.get(ft.__renderTarget),kn=z.get(Fn.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,nt.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let gi=0;gi<ve;gi++)mi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(M).__webglTexture,O,Fe+gi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(I).__webglTexture,ue,ut+gi)),L.blitFramebuffer(Se,Ue,ge,he,Ee,Je,ge,he,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||z.has(M)){const ft=z.get(M),Fn=z.get(I);_.bindFramebuffer(L.READ_FRAMEBUFFER,W),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,B);for(let nt=0;nt<ve;nt++)mi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ft.__webglTexture,O,Fe+nt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ft.__webglTexture,O),et?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Fn.__webglTexture,ue,ut+nt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Fn.__webglTexture,ue),O!==0?L.blitFramebuffer(Se,Ue,ge,he,Ee,Je,ge,he,L.COLOR_BUFFER_BIT,L.NEAREST):et?L.copyTexSubImage3D(me,ue,Ee,Je,ut+nt,Se,Ue,ge,he):L.copyTexSubImage2D(me,ue,Ee,Je,Se,Ue,ge,he);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else et?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(me,ue,Ee,Je,ut,ge,he,ve,je,Ct,lt.data):I.isCompressedArrayTexture?L.compressedTexSubImage3D(me,ue,Ee,Je,ut,ge,he,ve,je,lt.data):L.texSubImage3D(me,ue,Ee,Je,ut,ge,he,ve,je,Ct,lt):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ue,Ee,Je,ge,he,je,Ct,lt.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ue,Ee,Je,lt.width,lt.height,je,lt.data):L.texSubImage2D(L.TEXTURE_2D,ue,Ee,Je,ge,he,je,Ct,lt);_.pixelStorei(L.UNPACK_ROW_LENGTH,Wt),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,We),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Jt),_.pixelStorei(L.UNPACK_SKIP_ROWS,hn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Nn),ue===0&&I.generateMipmaps&&L.generateMipmap(me),_.unbindTexture()},this.initRenderTarget=function(M){z.get(M).__webglFramebuffer===void 0&&X.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?X.setTextureCube(M,0):M.isData3DTexture?X.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?X.setTexture2DArray(M,0):X.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){q=0,V=0,J=null,_.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}}const qc=[{id:"env.stone",url:"./runtime-assets/env/stone.jpg",repeat:[4,3]},{id:"env.forest-far",url:"./runtime-assets/env/forest-far.jpg"},{id:"env.torii-cutout",url:"./runtime-assets/env/torii-cutout.png"},{id:"env.tree-1",url:"./runtime-assets/env/tree-1.png"},{id:"env.tree-2",url:"./runtime-assets/env/tree-2.png"},{id:"fx.slash",url:"./runtime-assets/fx/slash.png"},{id:"fx.beam",url:"./runtime-assets/fx/beam.png"},{id:"fx.spark",url:"./runtime-assets/fx/spark.png"},{id:"fx.impact",url:"./runtime-assets/fx/impact.png"},{id:"char.rin",url:"./runtime-assets/ui/rin-portrait.jpg"},{id:"char.keeper",url:"./runtime-assets/ui/keeper.png"},{id:"char.hio",url:"./runtime-assets/ui/hio.png"},{id:"char.soldier",url:"./runtime-assets/char/soldier.png"},{id:"char.boss",url:"./runtime-assets/char/boss1.png"}],sg=[{id:"env.vermilion",url:"./runtime-assets/env/vermilion.jpg",repeat:[2,2]},{id:"env.wood",url:"./runtime-assets/env/wood.jpg",repeat:[2,2]},{id:"env.forest-far-hd",url:"./runtime-assets/env/forest-far-hd.jpg"},{id:"env.forest-mid-hd",url:"./runtime-assets/env/forest-mid-hd.jpg"},{id:"env.forest-mid",url:"./runtime-assets/env/forest-mid.jpg"},{id:"env.tree-3",url:"./runtime-assets/env/tree-3.png"},{id:"env.tree-4",url:"./runtime-assets/env/tree-4.png"},{id:"env.moss",url:"./runtime-assets/env/moss.jpg",repeat:[3,3]},{id:"env.path-ahead",url:"./runtime-assets/env/path-ahead.jpg"},{id:"fx.ring",url:"./runtime-assets/fx/ring.png"},{id:"char.hio-bound",url:"./runtime-assets/ui/hio-bound.png"},{id:"char.archer",url:"./runtime-assets/char/archer.png"},{id:"char.mage",url:"./runtime-assets/char/mage.png"},{id:"char.hound",url:"./runtime-assets/char/hound.png"},{id:"char.elite",url:"./runtime-assets/char/elite.png"},{id:"char.rin-full",url:"./runtime-assets/ui/rin-full.png"}],rg=4,ag=8e3;function og(i,e,t){return new Promise((n,s)=>{const r=window.setTimeout(()=>s(new Error(`timeout:${t}`)),e);i.then(a=>{window.clearTimeout(r),n(a)},a=>{window.clearTimeout(r),s(a)})})}class cg{stages=[];failed=[];textures=new Map;onStage;done=0;total=qc.length;async boot(){if(this.note("boot-ui","準備介面"),typeof Image>"u"){this.note("runtime-art","vitest: skip TextureLoader");return}await this.loadBatch(qc,"runtime-art")}async loadDeferred(){typeof Image>"u"||await this.loadBatch(sg,"runtime-art-hd")}async loadBatch(e,t){const n=new eu;this.total=e.length,this.done=0,this.onStage?.(t,0,this.total);let s=0;const r=Array.from({length:Math.min(rg,e.length)},async()=>{for(;s<e.length;){const a=s;s+=1;const o=e[a];try{const c=await og(n.loadAsync(o.url),ag,o.id);c.colorSpace=vt,o.repeat&&(c.wrapS=Mn,c.wrapT=Mn,c.repeat.set(o.repeat[0],o.repeat[1]));const l=o.id.includes("forest-")||o.id.startsWith("env.tree")||o.id==="env.torii-cutout"||o.id.startsWith("fx.");c.anisotropy=o.id.includes("forest-")?8:l?4:2,this.textures.set(o.id,c),o.id==="char.rin-full"&&this.textures.set("char.rin",c)}catch{this.failed.push({id:o.id,stage:t,status:"missing"})}this.done+=1,this.note(o.id,o.url),this.onStage?.(t,this.done,this.total),await new Promise(c=>window.setTimeout(c,0))}});await Promise.all(r)}note(e,t){this.stages.push({stage:e,knownBytes:null,note:t,done:this.done,total:this.total})}}const lg="modulepreload",dg=function(i,e){return new URL(i,e).href},Yc={},hg=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let a=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");s=a(t.map(d=>{if(d=dg(d,n),d in Yc)return;Yc[d]=!0;const h=d.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let v=o.length-1;v>=0;v--){const m=o[v];if(m.href===d&&(!h||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${u}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":lg,h||(g.as="script"),g.crossOrigin="",g.href=d,l&&g.setAttribute("nonce",l),document.head.appendChild(g),h)return new Promise((v,m)=>{g.addEventListener("load",v),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};class ug{R;world;controller;bodies=new Map;boxList=[];fallback=new ro;ready=!0;constructor(e){this.R=e,this.world=new e.World({x:0,y:-20,z:0}),this.controller=this.world.createCharacterController(.08),this.controller.setMaxSlopeClimbAngle(50*Math.PI/180),this.controller.setMinSlopeSlideAngle(40*Math.PI/180),this.controller.enableSnapToGround(.25),this.controller.setApplyImpulsesToDynamicBodies(!1),this.controller.setCharacterMass(60)}reset(){this.boxList=[],this.fallback.reset(),this.world.free(),this.world=new this.R.World({x:0,y:-20,z:0}),this.controller=this.world.createCharacterController(.08),this.controller.setMaxSlopeClimbAngle(50*Math.PI/180),this.controller.setMinSlopeSlideAngle(40*Math.PI/180),this.controller.enableSnapToGround(.25),this.bodies.clear()}addStaticBox(e,t,n){this.boxList.push({id:e,center:t,half:n}),this.fallback.addStaticBox(e,t,n);const s=this.world.createRigidBody(this.R.RigidBodyDesc.fixed().setTranslation(t.x,t.y,t.z));this.world.createCollider(this.R.ColliderDesc.cuboid(n.x,n.y,n.z),s),this.bodies.set(e,s)}boxes(){return this.boxList}raycast(e,t,n){const s=new this.R.Ray({x:e.x,y:e.y,z:e.z},{x:t.x,y:t.y,z:t.z}),r=this.world.castRay(s,n,!0);return r?r.timeOfImpact:n}moveCharacter(e,t,n,s,r){const a={x:n.x-t.x,y:n.y-t.y-.02,z:n.z-t.z},o=Math.max(.1,r*.5-s),c=this.R.ColliderDesc.capsule(o,s).setTranslation(t.x,t.y+r*.5,t.z),l=this.world.createRigidBody(this.R.RigidBodyDesc.kinematicPositionBased().setTranslation(t.x,t.y,t.z)),d=this.world.createCollider(c,l);this.controller.computeColliderMovement(d,a);const h=this.controller.computedMovement(),u=this.controller.computedGrounded(),f={x:t.x+h.x,y:t.y+h.y,z:t.z+h.z};this.world.removeRigidBody(l),this.world.step();const g=f.y<t.y-6;return{pos:f,grounded:u,fell:g}}}async function fg(){try{const i=await hg(()=>import("./rapier.es-CmnDU9Yz.js"),[],import.meta.url),e=i.default??i;return await e.init(),new ug(e)}catch{return new ro}}const pg=25e3;async function mg(i,e){const t=new cg;t.onStage=(n,s,r)=>{i.state.loadStage=n,typeof s=="number"&&typeof r=="number"&&r>0&&(i.state.loadProgress=Math.min(.92,s/r)),e?.onStage?.(n,s,r)},i.state.loadStage="boot-ui",i.state.loadProgress=0,performance.now();try{i.state.loadStage="boot-parallel",e?.onStage?.("boot-parallel",0,1);const n=t.boot(),s=(async()=>{try{const r=await Promise.race([fg(),new Promise((a,o)=>{window.setTimeout(()=>o(new Error("physics-timeout")),12e3)})]);i.physics=r}catch(r){i.state.loadError=r instanceof Error?r.message:"physics"}})();await Promise.race([Promise.all([n,s]),new Promise(r=>{window.setTimeout(r,pg)})]),i.state.loadStage="ready",i.state.loadProgress=1,e?.onStage?.("ready",1,1),i.finishLoading()}catch(n){i.failLoading(i.state.loadStage,n instanceof Error?n.message:"unknown")}return{textures:t.textures,assets:t}}function gg(){return new Ud({seed:20260903,allowDebug:!1})}const Kc=.22,$c=5;class _g{constructor(e,t){this.simulate=e,this.render=t}acc=0;last=0;raf=0;running=!1;start(){this.running=!0,this.last=performance.now();const e=t=>{if(!this.running)return;let n=(t-this.last)/1e3;this.last=t,n>Kc&&(n=Kc),this.acc+=n;let s=0;for(;this.acc>=rn&&s<$c;)this.simulate(rn),this.acc-=rn,s+=1;s===$c&&(this.acc=0),this.render(this.acc/rn,t),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}freezeClock(){this.last=performance.now(),this.acc=0}}function xg(i){return i.code==="Escape"||i.key==="Escape"||i.key==="Esc"}class vg{constructor(e,t){this.canvas=e,this.onPointerLockLost=t??null,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.clear),e.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove),document.addEventListener("pointerlockchange",this.onPointerLockChange)}keys=new Set;lookX=0;lookY=0;pointerLocked=!1;uiOwns=!1;sensitivity=1;invertY=!1;onPointerLockLost;setUiOwns(e){e&&!this.uiOwns&&this.clear(),this.uiOwns=e}sample(){const e=cs(),t=this.escapeHeld();if(e.pause=t,e.cancel=t,this.uiOwns)return e.interact=this.keys.has("KeyE"),e.confirm=this.keys.has("Enter")||this.keys.has("Space"),e;const n=this.keys.has("KeyW")||this.keys.has("ArrowUp"),s=this.keys.has("KeyS")||this.keys.has("ArrowDown"),r=this.keys.has("KeyA")||this.keys.has("ArrowLeft"),a=this.keys.has("KeyD")||this.keys.has("ArrowRight");return e.moveZ=(n?1:0)+(s?-1:0),e.moveX=(a?1:0)+(r?-1:0),e.lookDeltaYaw=this.lookX*.0022*this.sensitivity,e.lookDeltaPitch=this.lookY*.0022*this.sensitivity*(this.invertY?1:-1),this.lookX=0,this.lookY=0,e.primary=this.keys.has("KeyJ")||this.keys.has("Mouse0"),e.secondary=this.keys.has("KeyL")||this.keys.has("Mouse2"),e.dodge=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),e.ability1=this.keys.has("KeyQ"),e.ability2=this.keys.has("KeyR"),e.ultimate=this.keys.has("KeyF"),e.interact=this.keys.has("KeyE"),e.lockOn=this.keys.has("Tab"),e.confirm=this.keys.has("Enter")||this.keys.has("Space"),e}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.clear),this.canvas.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("pointerlockchange",this.onPointerLockChange)}escapeHeld(){return this.keys.has("Escape")||this.keys.has("Esc")}rememberEscape(e,t){xg(e)&&(t?(this.keys.add("Escape"),this.keys.add("Esc")):(this.keys.delete("Escape"),this.keys.delete("Esc")))}onKeyDown=e=>{["Tab","Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)&&(this.uiOwns||e.preventDefault()),e.code&&this.keys.add(e.code),this.rememberEscape(e,!0)};onKeyUp=e=>{e.code&&this.keys.delete(e.code),this.rememberEscape(e,!1)};onMouseDown=e=>{this.uiOwns||(this.keys.add(`Mouse${e.button}`),!this.pointerLocked&&e.button===0&&this.canvas.requestPointerLock())};onMouseUp=e=>{this.keys.delete(`Mouse${e.button}`)};onMouseMove=e=>{this.pointerLocked&&(this.lookX+=e.movementX,this.lookY+=e.movementY)};onPointerLockChange=()=>{const e=document.pointerLockElement===this.canvas,t=this.pointerLocked&&!e;this.pointerLocked=e,t&&this.onPointerLockLost?.()};clear=()=>{this.keys.clear(),this.lookX=0,this.lookY=0}}function Mg(i,e){return i?e>=1.5?"A":"B":"C"}function yg(i,e){const t=e==="A"?1.75:e==="B"?1.25:1;i.setPixelRatio(Math.min(window.devicePixelRatio||1,t))}class Sg{renderer;tier;constructor(e){const t=!!e.getContext("webgl2");this.renderer=new ig({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=vt,this.renderer.toneMapping=oo,this.renderer.toneMappingExposure=1.45,this.renderer.shadowMap.enabled=!0,this.tier=Mg(t,window.devicePixelRatio||1),yg(this.renderer,this.tier),this.resize(),window.addEventListener("resize",()=>this.resize())}resize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1)}info(){const e=this.renderer.info;return{backend:"webgl2",tier:this.tier,calls:e.render.calls,triangles:e.render.triangles,textures:e.memory.textures,geometries:e.memory.geometries}}}const Ii={player:{skin:15983830,cloth:16055295,clothDark:9365503,accent:12186623,hair:13825279,weapon:14151420,metal:10139848},hio:{skin:15785156,cloth:15254891,clothDark:12884522,accent:16770976,hair:16176490,weapon:16769162,metal:14530634},keeper:{skin:15391944,cloth:16770976,clothDark:13217898,accent:16774088,hair:16310440,weapon:16766090,metal:14727242},dummy:{skin:12892328,cloth:8952234,clothDark:6715272,accent:11057348,hair:6713466,weapon:9071172,metal:6969416},enemy:{skin:6965854,cloth:4858712,clothDark:2757176,accent:8011114,hair:1707032,weapon:5910600,metal:3809328},boss:{skin:5910600,cloth:3805224,clothDark:1706004,accent:8003648,hair:1312784,weapon:6951976,metal:3805216}};function Wl(i){return i==="player"?Ii.player:i==="hio"?Ii.hio:i==="keeper"?Ii.keeper:i==="dummy"?Ii.dummy:i==="boss"?Ii.boss:Ii.enemy}function bg(i){switch(i){case"player":return"gb.player.humanoid";case"hio":return"gb.hio.humanoid";case"keeper":return"gb.keeper.humanoid";case"sword-soldier":return"gb.sword-soldier.humanoid";case"archer":return"gb.archer.humanoid";case"caster":return"gb.caster.humanoid";case"shadow-hound":return"gb.shadow-hound.assembled";case"lantern-hunter":return"gb.lantern-hunter.humanoid";case"boss":return"gb.boss.humanoid";case"dummy":return"gb.dummy.humanoid"}}function mn(i,e){return new Lt({color:i,roughness:e?.roughness??.55,metalness:e?.metalness??.12,emissive:e?.emissive??0,emissiveIntensity:e?.emissiveIntensity??0})}function ke(i,e,t,n,s,r,a){const o=new be(new Et(e,t,n),i);return o.position.set(s,r,a),o.castShadow=!0,o.receiveShadow=!0,o}function Xl(i,e,t,n,s,r=10){const a=new be(new fs(e,r,8),i);return a.position.set(t,n,s),a.castShadow=!0,a}function nr(i,e,t,n,s,r,a,o=8){const c=new be(new Kt(e,t,n,o),i);return c.position.set(s,r,a),c.castShadow=!0,c}function ql(i,e){i.userData.placeholder=e,i.traverse(t=>{t.userData.placeholder=e})}function Eg(i){const e=new Nt;e.name=i.id;const t=bg(i.kind);return e.userData.placeholder=t,e.userData.kind=i.kind,e.userData.height=i.height,i.kind==="shadow-hound"?Ag(e,i,t):Tg(e,i,t),e.updateMatrixWorld(!0),e}function Tg(i,e,t){const n=Wl(e.kind),s=Math.max(.55,e.height/1.69),r=mn(n.skin,{roughness:.62}),a=mn(n.cloth,{roughness:.48,metalness:e.kind==="player"?.18:.08}),o=mn(n.clothDark,{roughness:.5,metalness:.1}),c=mn(n.accent,{roughness:.4,metalness:.2,emissive:n.accent,emissiveIntensity:e.kind==="player"||e.kind==="hio"?.18:.06}),l=mn(n.hair,{roughness:.7}),d=mn(n.metal,{roughness:.32,metalness:.72}),h=mn(n.weapon,{roughness:.28,metalness:.65,emissive:n.weapon,emissiveIntensity:.12}),u=.92*s,f=.42*s,g=u+.08*s+f*.5,v=g+f*.38,m=.105*s,p=e.height-m,T=.11*s,A=.38*s,y=.34*s,w=.07*s;i.add(ke(o,.16*s,w,.28*s,-T,w*.5,.02*s)),i.add(ke(o,.16*s,w,.28*s,T,w*.5,.02*s)),i.add(ke(a,.14*s,y,.14*s,-T,w+y*.5,0)),i.add(ke(a,.14*s,y,.14*s,T,w+y*.5,0)),i.add(ke(o,.16*s,A,.16*s,-T,w+y+A*.5,0)),i.add(ke(o,.16*s,A,.16*s,T,w+y+A*.5,0)),i.add(ke(c,.34*s,.14*s,.2*s,0,u,0));const S=ke(a,.36*s,f,.22*s,0,g,0);i.add(S),i.userData.torso=S,i.add(ke(c,.22*s,.08*s,.24*s,0,g+.04*s,.02*s)),i.add(nr(r,.05*s,.055*s,.08*s,0,p-m-.04*s,0,6));const R=Xl(r,m,0,p,0,12);i.add(R),i.add(ke(l,.2*s,.08*s,.18*s,0,p+m*.55,-.01*s)),i.add(ke(o,.03*s,.02*s,.02*s,-.035*s,p+.01*s,m*.82)),i.add(ke(o,.03*s,.02*s,.02*s,.035*s,p+.01*s,m*.82));const x=.24*s,b=.28*s,P=.26*s;i.add(ke(a,.1*s,b,.1*s,-x,v-b*.35,0)),i.add(ke(a,.1*s,b,.1*s,x,v-b*.35,0)),i.add(ke(r,.09*s,P,.09*s,-x,v-b*.7-P*.45,.02*s)),i.add(ke(r,.09*s,P,.09*s,x,v-b*.7-P*.45,.02*s)),i.add(ke(r,.08*s,.08*s,.1*s,-x,v-b-P*.55,.04*s));const C=ke(r,.08*s,.08*s,.1*s,x,v-b-P*.55,.04*s);i.add(C);const N=wg(e.kind,s,h,d,c);if(N.position.set(x,C.position.y+.15*s,.12*s),i.add(N),i.userData.weapon=N,e.kind==="hio")for(let G=0;G<3;G++){const W=ke(c,.04*s,.55*s,.04*s,(G-1)*.12*s,g,.14*s);W.userData.binding=!0,i.add(W)}if(e.kind==="boss"){const G=ke(o,.22*s,.12*s,.28*s,0,v+.06*s,0);i.add(G),i.add(ke(c,.5*s,.08*s,.08*s,0,p+m+.04*s,0))}ql(i,t)}function wg(i,e,t,n,s){const r=new Nt;if(i==="archer"){const a=new be(new ps(.28*e,.03*e,6,14,Math.PI),n);a.rotation.y=Math.PI/2,a.rotation.z=Math.PI/2;const o=ke(s,.01*e,.52*e,.01*e,0,0,0);r.add(a,o)}else if(i==="caster"){const a=Xl(s,.1*e,0,.2*e,.16*e,10);a.material.emissiveIntensity=.7,r.add(a),r.add(nr(n,.02*e,.03*e,.55*e,0,0,.08*e,6))}else if(i==="keeper"){r.add(nr(n,.025*e,.03*e,.7*e,0,.1*e,.08*e,6));const a=ke(s,.14*e,.14*e,.14*e,0,.48*e,.08*e);a.material.emissiveIntensity=.85,r.add(a)}else if(i==="boss")r.add(ke(n,.06*e,.08*e,.12*e,0,0,0)),r.add(ke(t,.07*e,1.35*e,.05*e,0,.7*e,0));else if(i==="lantern-hunter"){r.add(ke(t,.05*e,.85*e,.04*e,0,.42*e,0));const a=ke(s,.12*e,.16*e,.12*e,.16*e,.2*e,.1*e);a.material.emissiveIntensity=.6,r.add(a)}else if(i==="hio")r.add(ke(s,.04*e,.02*e,.04*e,0,0,0));else{const a=nr(n,.08*e,.08*e,.03*e,0,.02*e,0,10);a.rotation.x=Math.PI/2,r.add(ke(n,.035*e,.16*e,.035*e,0,-.06*e,0)),r.add(a),r.add(ke(t,.045*e,.78*e,.03*e,0,.42*e,0))}return r}function Ag(i,e,t){const n=Wl("sword-soldier"),s=Math.max(.7,e.height/.7),r=mn(n.clothDark,{roughness:.75}),a=mn(n.cloth,{roughness:.6}),o=mn(n.metal,{metalness:.4,roughness:.45}),c=ke(r,.85*s,.32*s,.38*s,0,.38*s,0);i.add(c),i.userData.torso=c,i.add(ke(a,.6*s,.16*s,.28*s,0,.26*s,0));const l=ke(r,.28*s,.22*s,.32*s,0,.5*s,.32*s);i.add(l),i.add(ke(r,.08*s,.16*s,.08*s,-.08*s,.64*s,.28*s)),i.add(ke(r,.08*s,.16*s,.08*s,.08*s,.64*s,.28*s)),i.add(ke(o,.1*s,.08*s,.16*s,0,.42*s,.48*s));const d=.28*s;for(const u of[-.18,.18])for(const f of[-.18,.16])i.add(ke(r,.09*s,d,.09*s,u*s,d*.5,f*s)),i.add(ke(o,.1*s,.05*s,.14*s,u*s,.03*s,f*s+.03*s));i.add(ke(r,.08*s,.08*s,.36*s,0,.4*s,-.34*s));const h=new Nt;i.add(h),i.userData.weapon=h,ql(i,t)}function Xs(i,e){return i.startsWith("rin.primary")?"crescent":i==="rin.secondary"?"bolt":i==="enemy.arrow"||i==="boss.rain-arrow"?"ray":i==="rin.q"?"ring":i==="rin.r"||i==="hound.dash"||i==="boss.clone-cut"?"streak":i==="rin.f"||i==="boss.thunder"?"column":i.startsWith("boss.triple")||e==="cone"?"wedge":i==="boss.chop"||e==="box"?"slab":i==="elite.chain"?"hexburst":i==="enemy.slash"?"crescent":"disc"}function Gt(i,e,t=!0,n){return new Yt({color:i,map:n??null,transparent:!0,opacity:e,depthTest:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4,blending:t?ki:hi,side:Ut})}function ni(i,e=0){return i.pos.y+.55+e}function Rg(i){return i.yaw}class Cg{root=new Nt;telegraphs=new Map;flashes=[];seenContact=new Set;projectiles=new Map;maps={};constructor(){this.root.userData.placeholder="gb.attack-vfx"}applyTextures(e){this.maps.slash=e.get("fx.slash"),this.maps.beam=e.get("fx.beam"),this.maps.spark=e.get("fx.spark"),this.maps.impact=e.get("fx.impact"),this.maps.ring=e.get("fx.ring");for(const t of Object.values(this.maps))t&&(t.colorSpace=vt,t.wrapS=Ft,t.wrapT=Ft)}sync(e){const t=new Set,n=[e.player,...e.enemies,...e.npcs];for(const a of n){if(!a.attack||a.dead)continue;const o=a.attack;t.add(o.id);let c=this.telegraphs.get(o.id);c||(c=this.makeTelegraph(a,o),this.telegraphs.set(o.id,c),this.root.add(c)),this.placeTelegraph(c,a,o);const d=Xs(o.defId,o.shape)==="bolt"||o.defId==="rin.secondary",h=o.phase==="telegraph"?d?.62+.12*Math.sin(o.elapsed*.28):.55+.4*Math.sin(o.elapsed*.45):o.phase==="contact"?d?.85:1:d?.22:.28;c.traverse(u=>{const f=u.material;if(f&&f.opacity!==void 0){const g=u.userData.baseOpacity??1;f.opacity=h*g}}),c.visible=o.phase==="telegraph"||o.phase==="contact"||o.phase==="result",o.phase==="contact"&&!this.seenContact.has(o.id)&&(this.seenContact.add(o.id),d||this.spawnFlash(a,o,e.tick))}for(const[a,o]of this.telegraphs)t.has(a)||(this.root.remove(o),this.telegraphs.delete(a));const s=new Set;for(const a of e.projectiles){s.add(a.id);let o=this.projectiles.get(a.id);o||(o=this.makeProjectile(a.team==="player"),this.projectiles.set(a.id,o),this.root.add(o));const c=Math.max(a.pos.y,.7);o.position.set(a.pos.x,c,a.pos.z);const l=a.pos.x+a.dir.x,d=c+a.dir.y,h=a.pos.z+a.dir.z;(a.dir.x!==0||a.dir.y!==0||a.dir.z!==0)&&o.lookAt(l,d,h)}for(const[a,o]of this.projectiles)s.has(a)||(this.root.remove(o),this.projectiles.delete(a));const r=[];for(const a of this.flashes){const o=e.tick-a.born;if(o>a.life){this.root.remove(a.mesh);continue}const c=1-o/a.life;a.mesh.scale.setScalar(1.4+(1-c)*2.8),a.mesh.traverse(l=>{const d=l.material;if(d){const h=l.userData.baseOpacity??1;d.opacity=.7*c*h}}),r.push(a)}this.flashes=r}sprite(e,t,n,s,r){const a=new be(new jt(e,t),Gt(n,s,!0,r));return a.userData.baseOpacity=s,a.userData.placeholder="gb.attack-vfx",a}addSparks(e,t,n,s=.32){for(let r=0;r<t;r++){const a=this.sprite(s,s,16777215,.75,this.maps.spark),o=r/t*Math.PI*2;a.position.set(Math.cos(o)*n,Math.sin(o*1.3)*n*.45,Math.sin(o)*n*.35),e.add(a)}}makeProjectile(e){const t=new Nt;t.userData.placeholder="gb.attack-vfx";const n=e?14221311:16761064,s=e?.95:1.15,r=e?.22:.28,a=this.maps.beam??this.maps.spark;for(const c of[0,Math.PI/2]){const l=this.sprite(r,s,n,.95,a);l.rotation.x=Math.PI/2,l.rotation.y=c,t.add(l)}const o=new be(new Kt(e?.035:.045,.018,s*.85,6),Gt(16777215,.9));o.rotation.x=Math.PI/2,o.userData.baseOpacity=.9,o.userData.placeholder="gb.attack-vfx",t.add(o);for(let c=1;c<=2;c++){const l=this.sprite(.16/c,.16/c,n,.55/c,this.maps.spark);l.position.z=-.38*c,t.add(l)}return ra(t),t}makeTelegraph(e,t){const n=Xs(t.defId,t.shape),s=e.team==="player",r=s?10217471:e.kind==="boss"?16730730:13664511,a=s?15268095:16760944,o=new Nt;o.userData.placeholder="gb.attack-vfx",o.userData.kind=n;const c=Math.max(.4,t.radius);if(n==="crescent"){const l=this.sprite(2.6,1.35,16777215,1,this.maps.slash);l.rotation.y=Math.PI/2,l.position.set(0,.28,-1.15),o.add(l);const d=this.sprite(3.3,1.7,r,.42,this.maps.slash);d.rotation.y=Math.PI/2,d.position.set(0,.28,-1.05),o.add(d),this.addSparks(o,3,.7,.38);const h=new be(new ps(1.05,.045,8,24,Math.PI),Gt(r,.4));if(h.rotation.z=Math.PI/2,h.position.set(0,.15,-.9),h.userData.baseOpacity=.4,o.add(h),!this.maps.slash){const u=new be(new ps(1.05,.12,8,24,Math.PI),Gt(r,1));u.rotation.z=Math.PI/2,u.position.set(0,.15,-.9),u.userData.baseOpacity=1,o.add(u)}}else if(n==="ray"){const l=Math.max(6,t.range);for(const f of[0,Math.PI/2]){const g=this.sprite(.55,l,16777215,.92,this.maps.beam);g.rotation.x=Math.PI/2,g.rotation.y=f,g.position.z=-l*.5,o.add(g)}const d=new be(new Kt(.045,.02,l,8),Gt(16777215,.85));d.rotation.x=Math.PI/2,d.position.z=-l*.5,d.userData.baseOpacity=.85,o.add(d);const h=new be(new Kt(.11,.05,l,8),Gt(r,.35));h.rotation.x=Math.PI/2,h.position.z=-l*.5,h.userData.baseOpacity=.35,o.add(h);const u=this.sprite(.7,.7,16777215,1,this.maps.spark);u.position.z=-.05,o.add(u)}else if(n==="bolt"){const l=Math.max(1.6,Math.min(3.2,t.range));for(const u of[0,Math.PI/2]){const f=this.sprite(.32,l,16777215,.55,this.maps.beam);f.rotation.x=Math.PI/2,f.rotation.y=u,f.position.z=-l*.45,o.add(f)}const d=new be(new Kt(.035,.018,l,6),Gt(16777215,.55));d.rotation.x=Math.PI/2,d.position.z=-l*.45,d.userData.baseOpacity=.55,o.add(d);const h=this.sprite(.4,.4,16777215,.7,this.maps.spark);h.position.z=-.05,o.add(h)}else if(n==="ring"){const l=this.sprite(c*2.4,c*2.4,16777215,.85,this.maps.ring);if(l.rotation.x=-Math.PI/2,l.position.y=.04,o.add(l),!this.maps.ring){const d=new be(new dr(c*.62,c*1.15,32),Gt(a,.8));d.rotation.x=-Math.PI/2,d.position.y=.02,d.userData.baseOpacity=.8,o.add(d)}this.addSparks(o,6,c*.9,.28)}else if(n==="column"){const l=new be(new Kt(c*.55,c*.8,4.4,14,1,!0),Gt(r,.55));l.position.y=1.6,l.userData.baseOpacity=.55,o.add(l);for(const u of[0,Math.PI/2]){const f=this.sprite(c*1.1,4.4,16777215,.55,this.maps.beam);f.rotation.y=u,f.position.y=1.6,o.add(f)}const d=this.sprite(c*1.6,c*1.6,16777215,.5,this.maps.ring??this.maps.impact);d.rotation.x=-Math.PI/2,o.add(d);const h=this.sprite(1.1,1.1,16777215,.9,this.maps.spark);h.position.y=3.6,o.add(h)}else if(n==="wedge"){const l=new be(new pn(c+.4,16,-.55,1.1),Gt(a,.42));l.rotation.x=-Math.PI/2,l.userData.baseOpacity=.42,o.add(l);const d=this.sprite(1.8,.9,16777215,.7,this.maps.slash);d.position.set(0,.35,-c*.45),o.add(d),this.addSparks(o,4,c*.5,.3)}else if(n==="disc"){const l=this.sprite(c*2.2,c*2.2,16777215,.55,this.maps.ring??this.maps.impact);l.rotation.x=-Math.PI/2,o.add(l);const d=new be(new dr(c*.88,c,24),Gt(r,.5));d.rotation.x=-Math.PI/2,d.position.y=.02,d.userData.baseOpacity=.5,o.add(d),this.addSparks(o,5,c*.7,.28)}else if(n==="slab"){const l=new be(new Et(c*1.4,.16,Math.max(2,t.range)),Gt(a,.55));l.position.z=-Math.max(2,t.range)*.45,l.position.y=.12,l.userData.baseOpacity=.55,o.add(l);const d=this.sprite(c*1.6,Math.max(2,t.range)*.9,16777215,.45,this.maps.impact);d.rotation.x=-Math.PI/2,d.position.z=-Math.max(2,t.range)*.45,d.position.y=.14,o.add(d),this.addSparks(o,4,c*.5,.3)}else if(n==="streak"){const l=Math.max(3,t.range);for(const h of[0,Math.PI/2]){const u=this.sprite(.55,l,r,.85,this.maps.beam??this.maps.slash);u.rotation.x=Math.PI/2,u.rotation.y=h,u.position.set(0,.6,-l*.4),o.add(u)}const d=new be(new Et(.22,.12,l),Gt(16777215,.55));d.position.z=-l*.4,d.position.y=.6,d.userData.baseOpacity=.55,o.add(d),this.addSparks(o,3,.4,.3)}else{const l=new be(new Kt(c,c,.08,6),Gt(a,.45));l.userData.baseOpacity=.45,o.add(l);const d=this.sprite(c*2.1,c*2.1,16777215,.6,this.maps.ring??this.maps.impact);d.rotation.x=-Math.PI/2,d.position.y=.05,o.add(d),this.addSparks(o,6,c*.7,.3)}return ra(o),o}placeTelegraph(e,t,n){const s=Xs(n.defId,n.shape),r=s==="ring"||s==="disc"||s==="wedge"||s==="hexburst"||s==="slab";if(s==="ray"||s==="bolt"||s==="streak"||s==="crescent"||s==="column"){const a=s==="column"?ni(t,.2):s==="crescent"?ni(t,.45):ni(t,.7);e.position.set(t.pos.x,a,t.pos.z)}else if(n.range===0)e.position.set(t.pos.x,ni(t,r?0:.2),t.pos.z);else{const a=rs(t,Math.max(.6,n.range*.45));e.position.set(a.x,ni(t,.05),a.z)}if(e.rotation.y=Rg(t),s==="crescent"){const a=Math.min(1,n.elapsed/Math.max(1,n.telegraphTicks)),o=n.phase==="contact"?Math.min(1,(n.elapsed-n.telegraphTicks)/Math.max(1,n.contactTicks)):n.phase==="result"?1:0,c=n.phase==="telegraph"?-.8-a*.4:-.3+o*2;e.rotation.z=c*.15,e.scale.setScalar(n.phase==="contact"?1.15:n.phase==="telegraph"?.9+a*.15:1)}else if(s==="ray"||s==="bolt"){const a=s==="bolt"?n.phase==="contact"?1.04:n.phase==="telegraph"?.95:1:n.phase==="contact"?1.12:n.phase==="telegraph"?.85:1;e.scale.setScalar(a)}}spawnFlash(e,t,n){const s=Xs(t.defId,t.shape),a=e.team==="player"?15269887:16765088,o=new Nt;o.userData.placeholder="gb.attack-vfx";const c=this.sprite(2.2,2.2,a,1,this.maps.impact);if(o.add(c),this.addSparks(o,11,.72,.42),s==="crescent"||s==="wedge"){const h=this.sprite(2.2,1.1,a,.85,this.maps.slash);o.add(h)}else if(s==="ray"||s==="streak"){const h=this.sprite(.7,2.4,a,.8,this.maps.beam);h.rotation.x=Math.PI/2,o.add(h)}else if(s==="column"){const h=this.sprite(2.2,2.2,a,.9,this.maps.impact);o.add(h)}let l=rs(e,Math.max(.4,t.range*.3)),d=ni(e,.65);(s==="ray"||s==="streak")&&(l=rs(e,Math.max(2,t.range*.85)),d=ni(e,.45)),o.position.set(l.x,d,l.z),o.rotation.y=e.yaw,ra(o),this.root.add(o),this.flashes.push({mesh:o,born:n,life:22})}}function ra(i){i.traverse(e=>{e.userData.placeholder="gb.attack-vfx"})}function Yl(i,e){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(i,e);const t=document.createElement("canvas");return t.width=i,t.height=e,t}function Kl(i){const e=new Gh(i);return e.colorSpace=vt,e.needsUpdate=!0,e.anisotropy=8,e}function Pg(){const t=Yl(128,128),n=t.getContext("2d"),s=n.createRadialGradient(64,64,8,64,64,62);s.addColorStop(0,"rgba(160,190,210,0.55)"),s.addColorStop(.45,"rgba(40,70,90,0.5)"),s.addColorStop(1,"rgba(10,16,22,0)"),n.fillStyle=s,n.fillRect(0,0,128,128);const r=Kl(t);return r.wrapS=Ft,r.wrapT=Ft,r}function Dg(i,e){const s=Yl(256,384),r=s.getContext("2d");r.fillStyle="#3a2214",r.fillRect(0,0,256,384),r.strokeStyle="#c9a24a",r.lineWidth=8,r.strokeRect(10,10,236,364),r.fillStyle="#e8d29a",r.font='bold 28px "Noto Serif TC", serif',r.textAlign="center",r.fillText(i,256/2,64),r.font='20px "Noto Serif TC", serif',r.fillStyle="#d8c8a0";const a=e.split("");let o=110,c="";for(const l of a)c.length>=8&&(r.fillText(c,256/2,o),o+=32,c=""),c+=l;return c&&r.fillText(c,256/2,o),Kl(s)}class Lg{scene=new Dh;actors=new Map;extras=new Map;rain;rainNear;titleStage;vfx=new Cg;wetMat;stoneMat;runtimeTex=new Map;artEnvApplied=!1;artEnvHd=!1;envGroup=null;props=[];constructor(){this.scene.background=new Oe(1714226),this.scene.fog=new or(1714226,48,140);const e=new tu(13162736,2761776,1.55);this.scene.add(e);const t=new yc(16773848,2.35);t.position.set(10,26,12),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.near=2,t.shadow.camera.far=80,this.scene.add(t);const n=new yc(8954056,.85);n.position.set(-12,10,-8),this.scene.add(n),this.wetMat=Ig(),this.stoneMat=new Lt({color:3819096,roughness:.42,metalness:.22,map:this.wetMat.map}),this.buildWorld(),this.rain=this.makeRain(700,70,.42,.18),this.rainNear=this.makeRain(160,12,.28,.22),this.scene.add(this.rain),this.scene.add(this.rainNear),this.scene.add(this.vfx.root),this.titleStage=this.makeTitleStage(),this.scene.add(this.titleStage)}applyRuntimeArt(e){this.runtimeTex=e;const t=e.get("env.stone"),n=e.get("env.vermilion"),s=e.get("env.wood"),r=e.get("env.moss"),a=e.get("env.path-ahead"),o=e.get("env.forest-far-hd")??e.get("env.forest-far"),c=e.get("env.forest-mid-hd")??e.get("env.forest-mid");if(e.get("env.torii-cutout")??e.get("env.torii-ruin"),this.vfx.applyTextures(e),t&&(this.wetMat.map=t,this.wetMat.color.setHex(16777215),this.wetMat.roughness=.22,this.wetMat.metalness=.48,this.wetMat.needsUpdate=!0,this.stoneMat.map=t,this.stoneMat.color.setHex(15263976),this.stoneMat.needsUpdate=!0),this.scene.traverse(l=>{const d=l;if(!d.isMesh)return;const h=d.material;if(!h||!h.color)return;const u=d.userData.placeholder;u==="gb.torii-kit"&&n&&d.name!=="prop-card"&&h.color.getHex()>=7340032&&(h.map=n,h.color.setHex(16761024),h.needsUpdate=!0),(u==="gb.lantern-prop"||u==="gb.arena-ring"||u==="gb.shrine-wood")&&s&&(h.color.getHex()<8947848||u==="gb.shrine-wood")&&(h.map=s,h.color.setHex(14540253),h.needsUpdate=!0),u==="gb.moss-decal"&&r&&(h.map=r,h.color.setHex(13160640),h.transparent=!0,h.opacity=.78,h.needsUpdate=!0),u==="gb.path-scroll"&&a&&(h.map=a,h.color.setHex(16777215),h.needsUpdate=!0)}),!this.artEnvApplied||o&&this.envGroup&&!this.artEnvHd&&e.has("env.forest-far-hd")){this.scene.background=new Oe(1714226),this.scene.fog=new or(1714226,48,140),this.envGroup&&(this.scene.remove(this.envGroup),this.envGroup=null),(o||c)&&(this.envGroup=this.makeEnvSky(o??c),this.scene.add(this.envGroup)),this.artEnvHd=e.has("env.forest-far-hd");const l=e.get("env.stone");if(l){const d=l.clone();d.wrapS=Mn,d.wrapT=Mn,d.repeat.set(18,18);const h=new be(new pn(200,48),new Lt({map:d,color:11581632,roughness:.82,metalness:.08}));h.rotation.x=-Math.PI/2,h.position.y=-.55,h.receiveShadow=!0,this.scene.add(h)}}this.artEnvApplied=!0,this.dressProps();for(const l of this.actors.values())this.dressActor(l);this.titleStage.traverse(l=>{l.userData.kind&&this.dressActor(l)})}texForKind(e,t=!1){const n=e==="player"?"char.rin":e==="hio"?t?"char.hio-bound":"char.hio":e==="keeper"?"char.keeper":e==="sword-soldier"||e==="dummy"?"char.soldier":e==="archer"?"char.archer":e==="caster"?"char.mage":e==="shadow-hound"?"char.hound":e==="lantern-hunter"?"char.elite":e==="boss"?"char.boss":void 0;return n?this.runtimeTex.get(n):void 0}dressActor(e,t=!1){const n=e.userData.kind;if(!n)return;const s=this.texForKind(n,t);if(!s)return;let r=e.getObjectByName("char-card");if(r){const f=r.material;f.map!==s&&(f.map=s,f.needsUpdate=!0);return}const a=Number(e.userData.height)||1.69,o=s.image,c=o&&o.width&&o.height?o.width/o.height:.5,l=a*Math.min(.58,Math.max(.32,c)),d=new Yt({map:s,transparent:!0,alphaTest:.22,side:Ut,depthWrite:!0,fog:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),h=a*.78;r=new be(new jt(l*.92,h),d),r.name="char-card",r.position.set(0,h*.5+.22,0),r.renderOrder=2,e.add(r);const u=new be(new pn(Math.max(.28,l*.45),16),new Yt({color:0,transparent:!0,opacity:.42,depthWrite:!1}));u.name="char-shadow",u.rotation.x=-Math.PI/2,u.position.y=.08,e.add(u),e.traverse(f=>{f===r||f===u||f.userData.binding||f.isMesh&&(f.visible=!1)}),r.visible=!0,u.visible=!0}billboardActors(e){const t=e.position;this.envGroup&&this.envGroup.position.copy(t);const n=new U,s=a=>(a.getWorldPosition(n),a.lookAt(t.x,n.y,t.z),n.distanceTo(t)),r=a=>{if(!a.userData.kind)return;this.dressActor(a);const o=a.getObjectByName("char-card");if(!o)return;const c=s(o),l=a.userData.attackPose;if(l&&(o.rotation.z+=l.twist??0,o.rotation.x+=l.lean??0,o.position.y+=l.bob??0,l.scale&&o.scale.setScalar(l.scale)),a.userData.kind==="player"){const u=o.material,f=!!a.userData.attackPose?.muzzleOnly;u.opacity=f?1:c<2.8?.2:1,u.transparent=!0,o.visible=c>1.6}const d=a.getObjectByName("atk-swing"),h=a.getObjectByName("atk-muzzle");d?.visible&&d.lookAt(t.x,d.getWorldPosition(n).y,t.z),h?.visible&&h.lookAt(t.x,h.getWorldPosition(n).y,t.z)};for(const a of this.actors.values())r(a);this.titleStage.visible&&this.titleStage.traverse(a=>{a.userData.kind&&r(a)});for(const a of this.props){const o=a.userData.kind;if(o!=="prop-tree"&&o!=="prop-torii")continue;const c=a.getObjectByName("prop-card");c&&s(c)}}titleLookAt(){const e=Ys,t=Pe(28);return{from:new U(e.x+2.8,e.y+1.85,e.z+7.2),at:new U(t.x,t.y+3.1,t.z)}}buildWorld(){const e=new Lt({color:13114910,roughness:.38,metalness:.16}),t=new Lt({color:7999504,roughness:.45,metalness:.12}),n=new Lt({color:14727242,emissive:16756768,emissiveIntensity:1.15,roughness:.28,metalness:.35}),s=this.stoneMat,r=new Lt({color:3805232,emissive:4853816,emissiveIntensity:.5,roughness:.55,metalness:.2}),a=new Lt({color:1718869,roughness:.08,metalness:.55});for(let f=0;f<=231;f+=4){if($s.some(m=>Math.abs(f-m.s)<m.width))continue;const g=Pe(f),v=new be(new Et(12.5,.45,8.2),this.wetMat);v.position.set(g.x,g.y-.2,g.z),v.receiveShadow=!0,v.userData.placeholder="gb.ground-boxes",this.scene.add(v)}this.addToriiKit(Pe(28),e,t,n);const o=Pe(45);for(const f of[-4,0,4])this.addLantern({x:o.x+f,y:o.y,z:o.z},n,s);for(let f=0;f<8;f++){const g=Pe(58+f*3),v=new be(new Et(5.5,.35,2.2),this.wetMat);v.position.set(g.x,g.y+f*.05,g.z),v.receiveShadow=!0,v.userData.placeholder="gb.ground-boxes",this.scene.add(v)}const c=Pe(118),l=new be(new Kt(6,6,.15,24),a);l.position.set(c.x,c.y+.05,c.z),l.userData.placeholder="gb.pool-disc",this.scene.add(l);for(let f=0;f<3;f++){const g=Pe(148);this.addLantern({x:g.x+(f-1)*5,y:g.y,z:g.z},n,s)}const d=qs;for(let f=0;f<16;f++){const g=f/16*Math.PI*2,v=new be(new Et(3.2,1.2,1.2),s);v.position.set(d.x+Math.cos(g)*16,d.y+.4,d.z+Math.sin(g)*16),v.userData.placeholder="gb.arena-ring",this.scene.add(v)}this.addToriiKit({x:d.x,y:d.y,z:d.z-18},e,t,n);const h=new be(new Kt(3.2,3.6,.5,20),r);h.position.set(Fi.x,Fi.y,Fi.z),h.userData.placeholder="gb.seal-platform",this.scene.add(h);const u=Pe(220);this.addToriiKit({x:u.x,y:u.y,z:u.z-8},e,t,n);for(let f=0;f<40;f++){const g=8+f*5%210,v=Pe(g),m=(f%2===0?1:-1)*(8.5+f%6*1.08),p=9+f%4;this.addTreeCard({x:v.x+m,y:v.y,z:v.z+(f%3-1)*1.2},p,f)}for(let f=20;f<=210;f+=22){const g=Pe(f);this.addLantern({x:g.x+4.2,y:g.y,z:g.z},n,s),this.addLantern({x:g.x-4.2,y:g.y,z:g.z+1.5},n,s)}this.addLantern({x:Cn.x+1.6,y:Cn.y,z:Cn.z+1.2},n,s),this.addShrineDressing(e,n)}addToriiKit(e,t,n,s){const r=new Nt;r.position.set(e.x,e.y,e.z),r.userData.placeholder="gb.torii-kit",r.userData.kind="prop-torii";const a=8.6,o=928/1208,c=a*o,l=new Yt({color:12868168,transparent:!0,alphaTest:.18,side:Ut,fog:!0,depthWrite:!0}),d=new be(new jt(c,a),l);d.name="prop-card",d.position.y=a*.5,d.userData.placeholder="gb.torii-kit",d.userData.kind="prop-torii",r.add(d);const h=new be(new pn(1.35,16),new Yt({color:0,transparent:!0,opacity:.4,depthWrite:!1}));h.name="prop-shadow",h.rotation.x=-Math.PI/2,h.position.y=.08,h.userData.placeholder="gb.torii-kit",r.add(h),this.props.push(r),this.scene.add(r)}addTreeCard(e,t,n){const s=new Nt;s.position.set(e.x,e.y,e.z),s.userData.placeholder="gb.ground-boxes",s.userData.kind="prop-tree",s.userData.treeIndex=n;const r=3.2,a=new Yt({color:2372908,transparent:!0,alphaTest:.18,side:Ut,fog:!0,depthWrite:!0}),o=new be(new jt(r,t),a);o.name="prop-card",o.position.y=t*.5,o.userData.placeholder="gb.ground-boxes",o.userData.kind="prop-tree",s.add(o);const c=new be(new pn(Math.max(.55,r*.32),16),new Yt({color:0,transparent:!0,opacity:.4,depthWrite:!1}));c.name="prop-shadow",c.rotation.x=-Math.PI/2,c.position.y=.08,c.userData.placeholder="gb.ground-boxes",s.add(c),this.props.push(s),this.scene.add(s)}dressProps(){const e=[1,2,3,4].map(n=>this.runtimeTex.get(`env.tree-${n}`)).filter(n=>!!n),t=this.runtimeTex.get("env.torii-cutout")??this.runtimeTex.get("env.torii-ruin");for(const n of[...e,t])n&&(n.colorSpace=vt,n.wrapS=Ft,n.wrapT=Ft,n.anisotropy=Math.max(n.anisotropy,8));for(const n of this.props){const s=n.getObjectByName("prop-card");if(!s)continue;const r=s.material;if(n.userData.kind==="prop-tree"&&e.length){const a=Number(n.userData.treeIndex)||0;r.map=e[a%e.length],r.color.setHex(16777215),r.needsUpdate=!0}n.userData.kind==="prop-torii"&&t&&(r.map=t,r.color.setHex(16777215),r.transparent=!0,r.alphaTest=.18,r.needsUpdate=!0)}}makeEnvSky(e){const t=new Nt;t.userData.placeholder="gb.backdrop",e.wrapS=Mn,e.wrapT=Ft,e.repeat.set(1,1),e.colorSpace=vt,e.anisotropy=Math.max(e.anisotropy,16),e.mapping=co,e.needsUpdate=!0,this.scene.background=new Oe(1845300);const n=new fs(420,72,56);n.scale(-1,1,1);const s=n.attributes.uv,r=n.attributes.position;for(let o=0;o<s.count;o++){const c=r.getX(o),l=r.getY(o),d=r.getZ(o),h=Math.hypot(c,l,d)||1,u=l/h,f=Math.atan2(c/h,d/h)/(Math.PI*2)+.5,g=1-Math.max(0,Math.min(1,(u+.18)/1.12));s.setXY(o,f,g)}s.needsUpdate=!0;const a=new be(n,new Yt({map:e,fog:!1,depthWrite:!1,side:Ln}));return a.renderOrder=-20,a.userData.placeholder="gb.backdrop",a.rotation.y=Math.PI,t.add(a),t}addLantern(e,t,n){const s=new Nt;s.position.set(e.x,e.y,e.z),s.userData.placeholder="gb.lantern-prop";const r=new be(new Et(.55,.18,.55),n);r.position.y=.09;const a=new be(new Kt(.1,.13,.7,8),n);a.position.y=.52;const o=new be(new Et(.32,.38,.32),t);o.position.y=1.05;const c=new be(new Mo(.32,.22,4),n);c.position.y=1.32,c.rotation.y=Math.PI/4;const l=new be(new Et(.08,.1,.08),n);l.position.y=1.46;for(const h of[r,a,o,c,l])h.castShadow=!0,h.userData.placeholder="gb.lantern-prop",s.add(h);const d=new iu(16766090,1.8,9);d.position.set(0,1.1,0),s.add(d),this.scene.add(s)}makeTitleStage(){const e=new Nt;return e.name="title-stage",e.visible=!1,e}makeRain(e,t,n,s){const r=new Float32Array(e*6),a=n*.14,o=n*.05;for(let h=0;h<e;h++){const u=(Math.random()-.5)*t,f=Math.random()*18,g=(Math.random()-.5)*t,v=h*6;r[v]=u,r[v+1]=f,r[v+2]=g,r[v+3]=u+a,r[v+4]=f-n,r[v+5]=g+o}const c=new Ot;c.setAttribute("position",new cn(r,3));const l=new Cl({color:9087164,transparent:!0,opacity:s,depthWrite:!1,blending:ki}),d=new Hh(c,l);return d.frustumCulled=!1,d.userData.placeholder="gb.rain-points",d.userData.streakLen=n,d}addShrineDressing(e,t){const n=new Lt({color:5913122,roughness:.72,metalness:.08}),s=new Lt({color:2767400,roughness:.92,metalness:.04,transparent:!0,opacity:.72}),r=Pg(),a=new Lt({map:r,color:6981792,roughness:.06,metalness:.78,transparent:!0,opacity:.72,depthWrite:!1});for(let o=0;o<18;o++){const c=Pe(12+o*12),l=new be(new Et(2.4,2.1,1.3),n);l.position.set(c.x+(o%2===0?6.2:-6.2),c.y+1.05,c.z),l.userData.placeholder="gb.shrine-wood",l.castShadow=!0,this.scene.add(l);const d=new be(new Et(2.8,.16,.22),e);d.position.set(l.position.x,c.y+2.2,c.z),d.userData.placeholder="gb.torii-kit",this.scene.add(d)}for(let o=0;o<22;o++){const c=Pe(10+o*10),l=new be(new pn(1.15+o%3*.25,16),s);if(l.rotation.x=-Math.PI/2,l.position.set(c.x+(o%2?2.4:-2.6),c.y+.06,c.z+.4),l.userData.placeholder="gb.moss-decal",this.scene.add(l),o%2===0){const d=new be(new pn(.85+o%4*.18,18),a);d.rotation.x=-Math.PI/2,d.position.set(c.x+(o%3-1)*1.4,c.y+.07,c.z-.6),d.userData.placeholder="gb.ground-boxes",this.scene.add(d)}}for(const o of fd){const c=Pe(o.s),l=Dg(o.title,o.body),d=new be(new jt(1.15,1.7),new Lt({map:l,roughness:.55,metalness:.12}));d.position.set(c.x+5.1,c.y+1.35,c.z),d.userData.placeholder="gb.shrine-wood",this.scene.add(d);const h=new be(new Et(.14,1.8,.14),n);h.position.set(c.x+5.1,c.y+.9,c.z+.08),h.userData.placeholder="gb.shrine-wood",this.scene.add(h)}for(const o of[28,84,148,202]){const c=Pe(o),l=new be(new jt(3.6,2.2),new Lt({color:6967360,roughness:.6,metalness:.08}));l.position.set(c.x,c.y+3.4,c.z-2.2),l.userData.placeholder="gb.path-scroll",this.scene.add(l)}}sync(e){this.titleStage.visible=!1;const t=new Set,n=[e.player,...e.enemies,...e.npcs];for(const s of n){t.add(s.id);let r=this.actors.get(s.id);r?s.kind==="hio"&&this.dressActor(r,e.hioState==="bound"):(r=Eg(s),this.actors.set(s.id,r),this.scene.add(r),this.dressActor(r,s.kind==="hio"&&e.hioState==="bound")),r.position.set(s.pos.x,s.pos.y,s.pos.z),r.rotation.y=s.yaw;const a=s.kind==="hio"&&e.hioState==="down";r.visible=!s.dead||a,r.rotation.z=a?1.15:0,r.position.y=s.pos.y+(a?.15:0),this.applyAttackPose(r,s),r.traverse(o=>{o.userData.binding&&(o.visible=s.kind==="hio"&&e.hioState==="bound")})}for(const[s,r]of this.actors)t.has(s)||(this.scene.remove(r),this.actors.delete(s));this.syncExtra(e),this.vfx.sync(e),this.fallRain(this.rain,.18,16),this.fallRain(this.rainNear,.24,12),this.rain.position.set(e.player.pos.x,0,e.player.pos.z),this.rainNear.position.set(e.player.pos.x,0,e.player.pos.z)}applyAttackPose(e,t){const n=e.getObjectByName("char-card"),s=t.attack,r=n?n.geometry.parameters.height*.5+.22:1;let a=0,o=0,c=0,l=1,d=!1,h=!1,u=0;if(s&&!t.dead){const A=s.defId==="rin.secondary"||s.defId==="enemy.arrow"||s.defId==="boss.rain-arrow"||s.shape==="ray",y=s.elapsed;if(A)(s.phase==="telegraph"||s.phase==="contact"||s.phase==="result")&&(h=!0);else{const w=Math.min(1,y/Math.max(1,s.telegraphTicks)),S=s.phase==="contact"?Math.min(1,(y-s.telegraphTicks)/Math.max(1,s.contactTicks)):0;s.phase==="telegraph"?(a=-.55-w*.35,o=-.18,l=1.02,d=!0,u=-.9-w*.5):s.phase==="contact"?(a=.85+S*.55,o=.28,l=1.12,c=.08,d=!0,u=-.2+S*2.2):s.phase==="result"?(a=.35,o=.1,l=1.05,d=!0,u=1.8):a=.08}}const f=!!(s&&!t.dead&&(s.defId==="rin.secondary"||s.defId==="enemy.arrow"||s.defId==="boss.rain-arrow"||s.shape==="ray"));e.userData.attackPose=s&&!t.dead?{twist:a,lean:o,bob:c,scale:l,muzzleOnly:f}:{twist:0,lean:0,bob:0,scale:1,muzzleOnly:!1},n&&(n.position.y=r,n.scale.setScalar(1));let g=e.getObjectByName("atk-swing");if(!g){const A=new Yt({color:12120319,transparent:!0,opacity:.9,depthWrite:!1,blending:ki,side:Ut});g=new be(new jt(1.8,.85),A),g.name="atk-swing",g.renderOrder=5,e.add(g)}let v=e.getObjectByName("atk-muzzle");if(!v){const A=new Yt({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,blending:ki,side:Ut});v=new be(new jt(.55,.55),A),v.name="atk-muzzle",v.renderOrder=5,e.add(v)}const m=this.runtimeTex.get("fx.slash"),p=this.runtimeTex.get("fx.spark")??this.runtimeTex.get("fx.impact");if(m&&g.material.map!==m&&(g.material.map=m,g.material.needsUpdate=!0),p&&v.material.map!==p&&(v.material.map=p,v.material.needsUpdate=!0),g.visible=d,d&&(g.position.set(.15,1.15+c,-.55),g.rotation.set(.1,0,u),g.material.opacity=s?.phase==="contact"?.95:.55),v.visible=h,h){v.position.set(.25,1.25+c,-.35);const A=.72+.08*Math.sin((s?.elapsed??0)*.55);v.scale.setScalar(A),v.material.opacity=s?.phase==="contact"?.75:.45}const T=e.userData.weapon;T&&(s?.phase==="telegraph"?T.rotation.z=-.55:s?.phase==="contact"?T.rotation.z=1.15:s?.phase==="result"?T.rotation.z=.35:T.rotation.z=0)}fallRain(e,t,n){const s=e.geometry.getAttribute("position"),r=Number(e.userData.streakLen)||1.2,a=r*.14,o=r*.05;for(let c=0;c<s.count;c+=2){let l=s.getY(c)-t;l<.15&&(l=n*(.65+Math.random()*.35));const d=s.getX(c),h=s.getZ(c);s.setXYZ(c,d,l,h),s.setXYZ(c+1,d+a,l-r,h+o)}s.needsUpdate=!0}showTitle(){this.titleStage.visible=!0}syncExtra(e){const t=new Set;for(const n of e.nodes){t.add(n.id);let s=this.extras.get(n.id);s||(s=new be(new Et(.9,1.4,.9),new Lt({color:3805232,emissive:5904456,emissiveIntensity:.6,roughness:.5})),s.userData.placeholder="gb.corruption-node",this.extras.set(n.id,s),this.scene.add(s)),s.position.set(n.pos.x,n.pos.y+.7,n.pos.z),s.visible=!n.destroyed}for(const n of e.lanterns){t.add(n.id);let s=this.extras.get(n.id);s||(s=new be(new fs(.18,10,8),new Lt({color:16766090,emissive:16756768,emissiveIntensity:1.2,roughness:.25,metalness:.3})),s.userData.placeholder="gb.lantern-prop",this.extras.set(n.id,s),this.scene.add(s)),s.position.set(n.pos.x,n.pos.y+1.1,n.pos.z),s.visible=n.lit&&n.hp>0}for(const n of e.hazards){t.add(n.id);let s=this.extras.get(n.id);s||(s=new be(new pn(n.radius,20),new Yt({color:6955144,transparent:!0,opacity:.35,side:Ut})),s.rotation.x=-Math.PI/2,s.userData.placeholder="gb.attack-vfx",this.extras.set(n.id,s),this.scene.add(s)),s.position.set(n.pos.x,n.pos.y+.04,n.pos.z)}for(const[n,s]of this.extras)t.has(n)||(this.scene.remove(s),this.extras.delete(n))}}function Ig(){const t=new Uint8Array(16384);for(let s=0;s<64;s++)for(let r=0;r<64;r++){const a=(s*64+r)*4,o=(Math.sin(r*.4)*Math.cos(s*.35)+Math.sin((r+s)*.18))*.5+.5,c=o>.62?1:0,l=28+Math.floor(o*22);t[a]=l,t[a+1]=l+6,t[a+2]=l+18,t[a+3]=255,c&&(t[a]=22,t[a+1]=38,t[a+2]=58)}const n=new Rl(t,64,64);return n.wrapS=Mn,n.wrapT=Mn,n.repeat.set(3,2),n.needsUpdate=!0,n.colorSpace=vt,new Lt({color:4874360,map:n,roughness:.16,metalness:.42})}class Ug{camera;mode="locomotion";shake=0;shakePhase=0;occlusion=0;constructor(){this.camera=new $t(58,1,.22,520)}resize(e,t){this.camera.aspect=e/Math.max(1,t),this.camera.updateProjectionMatrix()}addShake(e){this.shake=Math.min(.55,this.shake+Math.max(0,e))}update(e,t,n,s){this.mode=e.lockOnId?"lock-on":n?"aim":"locomotion";const r=n?54:62;this.camera.fov=r;const a=e.cameraYaw,o=Math.max(-.12,Math.min(.38,e.cameraPitch)),c=n?4.2:6.2,l=new U(e.player.pos.x,e.player.pos.y+1.38,e.player.pos.z),d=new U(Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)),h=new U(-Math.cos(a)*.55,0,Math.sin(a)*.55),u={x:l.x,y:l.y,z:l.z},f={x:d.x,y:d.y,z:d.z},g=t.raycast(u,f,c+.4),v=Math.max(2.6,Math.min(c,g-.45));this.occlusion=c-v,this.shakePhase+=.55+this.shake*.8;const m=this.shake*.055*(1-s);this.shake*=.82;const p=Math.sin(this.shakePhase*1.7)*m,T=Math.cos(this.shakePhase*2.1)*m*.55;this.camera.position.set(l.x+d.x*v+h.x+p,l.y+d.y*v+T,l.z+d.z*v+h.z),this.camera.lookAt(l.x+h.x*.2,l.y,l.z),this.camera.updateProjectionMatrix()}snapshot(){return{pose:this.camera.position.toArray(),fov:this.camera.fov,mode:this.mode,occlusionLength:this.occlusion}}}const Zc={start:{kind:"pad",freq:196,dur:.55,vol:.06,type:"sine",freq2:247},keeper:{kind:"pad",freq:220,dur:.42,vol:.05,type:"sine",freq2:330},hit:{kind:"tone",freq:620,dur:.07,vol:.09,type:"square"},shot:{kind:"tone",freq:880,dur:.05,vol:.07,type:"triangle"},slash:{kind:"tone",freq:240,dur:.08,vol:.08,type:"sawtooth"},hurt:{kind:"tone",freq:180,dur:.1,vol:.07,type:"sawtooth"},"binding-cut":{kind:"tone",freq:740,dur:.16,vol:.07,type:"triangle"},lantern:{kind:"pad",freq:392,dur:.28,vol:.05,type:"sine",freq2:588},"lantern-hit":{kind:"tone",freq:160,dur:.09,vol:.06,type:"square"},revive:{kind:"pad",freq:262,dur:.32,vol:.05,type:"sine",freq2:392},rain:{kind:"noise",freq:0,dur:1.8,vol:.035}};class Ng{ctx=null;unlocked=!1;muted=!1;master=.4;status="silent-until-gesture";unlock(){if(this.unlocked)return;const e=window.AudioContext||window.webkitAudioContext;if(!e){this.status="unavailable";return}this.ctx=new e,this.unlocked=!0,this.status="oscillator-placeholder",this.play("rain")}cue(e,t=440,n=.08){if(Zc[e]){this.play(e);return}this.tone(t,n,.07,"sine")}play(e){if(this.muted||!this.ctx||!this.unlocked)return;const t=Zc[e];if(!t){this.tone(440,.06,.05,"sine");return}t.kind==="noise"?this.noise(t.dur,t.vol):t.kind==="pad"?this.pad(t.freq,t.freq2??t.freq*1.5,t.dur,t.vol):this.tone(t.freq,t.dur,t.vol,t.type??"sine")}pause(){this.ctx?.suspend()}resume(){this.ctx?.resume()}now(){return this.ctx?.currentTime??0}dest(e){this.ctx&&e.connect(this.ctx.destination)}tone(e,t,n,s){if(!this.ctx)return;const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type=s,r.frequency.value=e,a.gain.setValueAtTime(this.master*n,this.now()),a.gain.exponentialRampToValueAtTime(1e-4,this.now()+t),r.connect(a),this.dest(a),r.start(),r.stop(this.now()+t)}pad(e,t,n,s){this.tone(e,n,s,"sine"),this.tone(t,n*.9,s*.7,"sine")}noise(e,t){if(!this.ctx)return;const n=Math.floor(this.ctx.sampleRate*e),s=this.ctx.createBuffer(1,n,this.ctx.sampleRate),r=s.getChannelData(0);for(let l=0;l<n;l++)r[l]=(Math.random()*2-1)*(1-l/n);const a=this.ctx.createBufferSource();a.buffer=s;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=900;const c=this.ctx.createGain();c.gain.value=this.master*t,a.connect(o),o.connect(c),this.dest(c),a.start()}}function Fg(i,e,t,n){const r={snapshot:()=>({...i.snapshot(),camera:t?.snapshot()??null,audio:{status:n.status,muted:n.muted},viewport:typeof window<"u"?{w:window.innerWidth,h:window.innerHeight,dpr:window.devicePixelRatio}:null,renderer:e?.info()??null}),rendererInfo:()=>e?.info()??{backend:"none"}};window.__GAME_DIAGNOSTICS__=r}const kg={enterShrine:"進入雨鎖山門",meetKeeper:"會見燈守澄夜",clearStoneSteps:"清除石階伏擊",crossBridge:"跨越斷橋",cleansePool:"淨化洗心池",defendLanterns:"守住命燈",defeatRainErodedWarrior:"擊敗雨蝕武者",exposeBindingCore:"顯露封印核心",cutBindings:"斬斷三條束縛",hioRescued:"解救緋緒",escortHioToKeeper:"護送緋緒返回據點",missionComplete:"點亮主燈，完成任務"};function Og(i){return i==="boot-ui"||i==="boot-parallel"?"喚醒雨幕與物理…":i==="physics-wasm"?"載入戰鬥物理…":i==="runtime-art"?"描繪霧林與立繪…":i==="ready"?"雨鎖山門已開啟":i.startsWith("env.")||i.startsWith("char.")||i.startsWith("fx.")?"描繪霧林與立繪…":i}function Bg(i){if(i.moduleChoiceOpen)return"戰鬥暫停　點卡片或按 1／2／3 選擇武學後才會繼續";if(Ni(i))return"點擊或按 E 繼續";if(i.hioState==="down")return`靠近緋緒，按 E 扶起　${Math.max(0,Math.ceil((so-i.hioDownTicks)/60))} 秒`;switch(i.objective){case"enterShrine":return"沿參道向前走";case"meetKeeper":return"走近澄夜，按 E 對話";case"clearStoneSteps":return"先破近戰，再找高處弓手";case"crossBridge":return"越過斷橋，影犬會從缺口撲來";case"cleansePool":return"先打斷咒術師，避開紫霧";case"defendLanterns":return"燈獵者會去砸燈　守你看得見的那盞";case"defeatRainErodedWarrior":return"看清預兆再開刃";case"exposeBindingCore":case"cutBindings":return`靠近緋緒，按 E 斬斷束縛　${i.bindingsCut}/3`;case"hioRescued":return"帶著緋緒沿參道撤回入口";case"escortHioToKeeper":return"護送緋緒回到燈守據點　她倒下時按 E 扶起";case"missionComplete":return"在入口按 E 點亮主燈";default:return""}}class zg{constructor(e,t,n,s=()=>{this.sim.pause(),this.render()}){this.host=e,this.sim=t,this.onStart=n,this.onPause=s,this.root=document.createElement("div"),this.root.id="ui-root",this.juice=document.createElement("div"),this.juice.id="juice-layer",e.appendChild(this.root),e.appendChild(this.juice),this.render()}root;juice;bootBuilt=!1;render(){const e=this.sim.state,t=e.run;if(this.root.innerHTML="",e.phase==="loading"||e.phase==="error"){const n=Math.max(0,Math.min(1,e.loadProgress??0)),s=Og(e.loadStage);if(e.phase==="loading"&&this.bootBuilt){const a=this.root.querySelector(".boot-stage"),o=this.root.querySelector(".boot-pct"),c=this.root.querySelector(".boot-bar > i");a&&(a.textContent=s),o&&(o.textContent=`${Math.round(n*100)}％`),c&&(c.style.width=`${Math.max(6,n*100)}%`);return}this.bootBuilt=e.phase==="loading";const r=this.overlay(e.phase==="error"?"載入失敗":"群芳天命錄：雨鎖殘界",e.phase==="error"?[s,e.loadError?`資產：${e.loadError}`:"","請重試。"]:["雨鎖山門　·　操作凜　·　解救緋緒"],e.phase==="error"?[["重試",()=>location.reload()]]:[],"boot-home");if(r.style.backgroundImage="linear-gradient(180deg, rgba(6,12,16,0.4), rgba(6,12,16,0.88)), url(./runtime-assets/env/forest-far.jpg)",r.style.backgroundSize="cover",r.style.backgroundPosition="center 40%",e.phase==="loading"){const a=document.createElement("p");a.className="boot-stage",a.textContent=s;const o=document.createElement("p");o.className="boot-pct",o.textContent=`${Math.round(n*100)}％`;const c=document.createElement("div");c.className="boot-bar",c.innerHTML=`<i style="width:${Math.max(6,n*100)}%"></i>`,r.appendChild(a),r.appendChild(o),r.appendChild(c)}return}if(this.bootBuilt=!1,e.phase==="title"){const n=this.overlay("群芳天命錄：雨鎖殘界",[od,"雨鎖山門　·　操作凜　·　解救緋緒","WASD 移動　滑鼠視角　J／左鍵 近戰　L／右鍵 自動瞄準射擊","Shift 閃避　Q／R／F 招式　E 互動　Tab 鎖定　Esc 暫停"],[["開始",()=>{this.sim.setPhase("loadout"),this.render()}]],"title-home"),s=document.createElement("div");s.className="title-art",s.innerHTML='<img src="./runtime-assets/ui/rin-portrait.jpg" alt="凜" /><img src="./runtime-assets/ui/keeper.png" alt="澄夜" /><img src="./runtime-assets/ui/hio.png" alt="緋緒" />',n.insertBefore(s,n.children[1]);const r=document.createElement("img");r.src="./runtime-assets/ui/rin-portrait.jpg",r.alt="",r.className="title-sheet",n.appendChild(r),n.style.backgroundImage="linear-gradient(180deg, rgba(6,12,16,0.38), rgba(6,12,16,0.82)), url(./runtime-assets/env/forest-far.jpg)",n.style.backgroundSize="cover",n.style.backgroundPosition="center 40%";return}if(e.phase==="loadout"){const n=this.overlay("編成　凜",["選擇起始武學模組：月返／凝神／燈護"],[]),s=document.createElement("img");s.src="./runtime-assets/ui/rin-portrait.jpg",s.alt="凜",s.className="loadout-portrait",n.insertBefore(s,n.children[1]);const r=document.createElement("div");r.className="modules";for(const o of tl){const c=document.createElement("button");c.className="card"+(e.selectedModule===o.id?" selected":""),c.innerHTML=`<strong>${o.name}</strong><span class="card-effect">${o.effect}</span><em>${o.description}</em>`,c.onclick=()=>{this.sim.state.selectedModule=o.id,this.render()},r.appendChild(c)}n.appendChild(r);const a=document.createElement("button");a.textContent="進入雨鎖山門",a.onclick=()=>this.onStart(),n.appendChild(a);return}if(e.phase==="intro"&&t){this.introScene(t);return}if(e.phase==="paused"){this.overlay("暫停",["遊戲時鐘與物理已凍結","Esc 或 繼續 恢復"],[["繼續",()=>{this.sim.resume(),this.render()}],["回標題",()=>{this.sim.setPhase("title"),this.sim.state.run=null,this.render()}]]);return}if(e.phase==="defeat"){const n=t?.defeatCause??t?.escortFailCause??"不明",s=n==="hio-down"?"緋緒倒下，未能及時扶起":n==="escort-bounds"?"護送距離過遠，雨把路吞了":n==="player-hp"?"凜力竭":n;this.overlay("戰敗",[s,`傷害承受：${t?.stats.damageTaken??0}`],[["從檢查點重試",()=>{this.sim.retryCheckpoint(),this.render()}],["整關重開",()=>{this.sim.restartMission(),this.render()}],["回標題",()=>{this.sim.setPhase("title"),this.sim.state.run=null,this.render()}]]);return}if(e.phase==="result"&&t){const n=ca(t);this.overlay("雨停一線",[...ud,`評級 ${n}　·　${(t.stats.timeTicks/60).toFixed(0)} 秒　·　命燈 ${t.stats.lanternsSaved}/3　·　緋緒 HP ${t.hioHp}`,t.rewardsCommitted?"已寫入解鎖：緋緒檔案、葛葉預告、新武學":""],[["再戰",()=>{this.sim.restartMission(),this.render()}],["回標題",()=>{this.sim.setPhase("title"),this.sim.state.run=null,this.render()}]],"result-coda");return}t&&(e.phase==="playing"||e.phase==="rescue"||e.phase==="escort")&&(this.hud(t),this.storyOverlay(t))}syncFloaters(e){this.juice.innerHTML=e.map(t=>`<span class="floater floater-${t.kind}" style="left:${t.x}px;top:${t.y-(1-t.k)*36}px;opacity:${Math.min(1,t.k*1.4)}">${t.text}</span>`).join("")}introScene(e){const t=di[e.story.introLineIndex]??di[di.length-1],n=document.createElement("div");n.className="overlay intro-scene",n.appendChild(this.dialogueCard(t.name,t.text,t.portrait,"點擊或按 E 繼續",()=>{this.sim.advanceIntro(),this.render()}));const s=document.createElement("button");s.textContent="略過",s.className="skip-btn",s.onclick=r=>{r.stopPropagation(),this.sim.skipIntro(),this.render()},n.appendChild(s),this.root.appendChild(n)}storyOverlay(e){const t=e.story.active;if(!t)return;if(t.blocking){const s=document.createElement("div");s.className="overlay scene-dim",s.appendChild(this.dialogueCard(t.name,t.text,t.portrait,"點擊或按 E 繼續",()=>{this.sim.advanceStory(),this.render()})),s.addEventListener("click",a=>{a.target===s&&(this.sim.advanceStory(),this.render())});const r=document.createElement("button");r.textContent="略過",r.className="skip-btn",r.onclick=a=>{a.stopPropagation(),this.sim.skipStory(),this.render()},s.appendChild(r),this.root.appendChild(s);return}const n=document.createElement("div");n.className="ink-line",n.innerHTML=`${t.portrait?`<img src="${t.portrait}" alt="${t.name}" />`:""}<div><div class="speaker">${t.name}</div><p>${t.text}</p></div>`,this.root.appendChild(n)}dialogueCard(e,t,n,s,r){const a=document.createElement("div");return a.className="dialogue-card",a.innerHTML=`${n?`<img src="${n}" alt="${e}" />`:""}<div class="dialogue-body"><div class="speaker">${e}</div><p>${t}</p><div class="hint">${s}</div></div>`,a.onclick=()=>r(),a}overlay(e,t,n,s=""){const r=document.createElement("div");r.className=s?`overlay ${s}`:"overlay",r.innerHTML=`<h1>${e}</h1>`+t.map(a=>`<p>${a}</p>`).join("");for(const[a,o]of n){const c=document.createElement("button");c.textContent=a,c.onclick=o,r.appendChild(c)}return this.root.appendChild(r),r}hud(e){const t=document.createElement("div");t.className="hud";const n=Math.max(0,e.player.hp/e.player.maxHp*100),s=Math.max(0,e.player.guard/e.player.maxGuard*100),r=Math.max(0,e.resolve/e.maxResolve*100),a=e.enemies.find(u=>u.kind==="boss"&&!u.dead),o=e.hioState==="down",c=e.hioState==="bound"?`<div class="hud-party"><img src="./runtime-assets/ui/hio-bound.png" alt="緋緒" /><span>緋緒　封印中　${e.bindingsCut}/3</span></div>`:o?`<div class="hud-party down"><img src="./runtime-assets/ui/hio.png" alt="緋緒" /><span>倒下　按 E 扶起　${Math.max(0,Math.ceil((so-e.hioDownTicks)/60))}s</span></div>`:e.hioState==="escorting"||e.hioState==="rescued"?`<div class="hud-party"><img src="./runtime-assets/ui/hio.png" alt="緋緒" /><span>護送　HP ${e.hioHp}</span></div>`:"",l=e.objective==="defendLanterns"?`<div class="hud-lanterns">${e.lanterns.map(u=>{const f=Math.max(0,u.hp/u.maxHp*100);return`<div class="lamp ${u.lit&&u.hp>0?"lit":"dead"}"><span>命燈</span><div class="bar"><span style="width:${f}%"></span></div></div>`}).join("")}</div>`:"",d=e.objective==="meetKeeper"&&dt(e.player.pos,Cn)<4.5;t.innerHTML=`
      ${a?`<div class="hud-boss"><div class="boss-name">雨蝕武者　階段 ${e.bossPhase}</div><div class="bar bossbar"><span style="width:${a.hp/a.maxHp*100}%"></span></div></div>`:""}
      <div class="hud-obj">
        <div class="obj-kicker">當前目標</div>
        <div class="objective">${kg[e.objective]??e.objective}${e.objective==="cutBindings"?`　${e.bindingsCut}/3`:""}</div>
        <div class="action-toast">${d?"按 E 與澄夜對話":Bg(e)}</div>
      </div>
      <div class="hud-pause"><button type="button" class="pause-btn">暫停</button></div>
      <div class="hud-player">
        <img class="hud-face" src="./runtime-assets/ui/rin-portrait.jpg" alt="凜" />
        <div class="hud-bars">
          <div class="hud-name">凜</div>
          <div class="bar-row"><span>HP</span><div class="bar"><span style="width:${n}%"></span></div><b>${Math.ceil(e.player.hp)}</b></div>
          <div class="bar-row"><span>韌性</span><div class="bar guard"><span style="width:${s}%"></span></div><b>${Math.ceil(e.player.guard)}</b></div>
          <div class="bar-row"><span>決意</span><div class="bar resolve"><span style="width:${r}%"></span></div><b>${Math.ceil(e.resolve)}</b></div>
        </div>
      </div>
      ${c}
      ${l}
      <div class="hud-dock">
        <span><k>J</k>近戰</span><span><k>L</k>自動瞄準</span><span><k>⇧</k>閃避</span>
        <span><k>Q</k>控場</span><span><k>R</k>轉位</span><span><k>F</k>奧義</span><span><k>E</k>互動</span>
      </div>
      <div class="debug"></div>
    `,this.root.appendChild(t);const h=t.querySelector(".pause-btn");h&&h.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),this.onPause()}),e.moduleChoiceOpen&&this.modulePicker(e)}modulePicker(e){const t=document.createElement("div");t.className="overlay picker",t.innerHTML="<h1>三選一　武學</h1><p>擇一模組。戰鬥已暫停。按 1／2／3 或點選卡片。</p>";const n=document.createElement("div");n.className="modules",e.pendingModuleChoices.forEach((s,r)=>{const a=no.find(c=>c.id===s);if(!a)return;const o=document.createElement("button");o.className="card",o.innerHTML=`<strong>${r+1}　${a.name}</strong><span class="card-effect">${a.effect}</span><em>${a.description}</em>`,o.onclick=()=>{this.sim.pickInLevelModule(a.id),this.render()},n.appendChild(o)}),t.appendChild(n),this.root.appendChild(t)}}const Hg=["playing","rescue","escort","intro","paused"],Jc=["playing","rescue","escort"];class Gg{sim;loop=null;input=null;renderer=null;scene=null;camera=null;audio=new Ng;ui=null;lastInput=cs();hudAcc=0;hidden=!1;lastStoryUi="";lastShakeAtk="";lastShakeProj="";constructor(e){this.sim=e}mount(e){e.innerHTML="",e.id="game-root";const t=document.createElement("canvas");t.id="c",e.appendChild(t),this.renderer=new Sg(t),this.scene=new Lg;const n=window.__RUNTIME_TEX__;n&&this.scene.applyRuntimeArt(n),this.camera=new Ug,this.input=new vg(t,()=>this.requestPause()),this.input.sensitivity=this.sim.state.settings.sensitivity,this.input.invertY=this.sim.state.settings.invertY,this.ui=new zg(e,this.sim,()=>this.beginRun(),()=>this.requestPause()),Fg(this.sim,this.renderer,this.camera,this.audio),document.addEventListener("visibilitychange",()=>{document.hidden?(this.hidden=!0,Jc.includes(this.sim.state.phase)&&(this.sim.pause(),this.forceUi()),this.audio.pause()):(this.hidden=!1,this.loop?.freezeClock(),this.audio.resume(),this.ui?.render())}),this.loop=new _g(()=>{if(this.hidden)return;const s=this.sim.state.phase;this.lastInput=this.input.sample(),Hg.includes(s)&&this.sim.step(this.lastInput),this.sim.state.phase!==s&&(this.sim.state.phase==="paused"||s==="paused")&&(this.forceUi(),this.sim.state.phase==="paused"&&this.releasePointerLock())},(s,r)=>{if(this.sim.state.phase==="loading")return;this.draw(),this.drainCues(),this.projectFloaters(),this.hudAcc+=1;const a=this.sim.state.phase,o=this.sim.state.run,c=a==="intro"?"intro-"+String(o?.story.introLineIndex??0):o?.moduleChoiceOpen?`pick-${(o.pendingModuleChoices??[]).join(",")}`:o?.story.active?.id??"";Ni(o)||a==="intro"||!!o?.moduleChoiceOpen?c!==this.lastStoryUi&&(this.lastStoryUi=c,this.releasePointerLock(),this.ui?.render()):this.lastStoryUi!==""?(this.lastStoryUi="",this.ui?.render()):this.hudAcc%6===0&&(a==="playing"||a==="rescue"||a==="escort")&&this.ui?.render()}),this.loop.start(),this.ui.render(),window.addEventListener("keydown",s=>{const r=this.sim.state.run;if(!r?.moduleChoiceOpen)return;const a=s.code==="Digit1"||s.code==="Numpad1"?0:s.code==="Digit2"||s.code==="Numpad2"?1:s.code==="Digit3"||s.code==="Numpad3"?2:-1,o=a>=0?r.pendingModuleChoices[a]:void 0;o&&(this.sim.pickInLevelModule(o),this.ui?.render())})}requestPause(){Jc.includes(this.sim.state.phase)&&(this.sim.pause(),this.releasePointerLock(),this.forceUi())}forceUi(){this.ui?.render()}releasePointerLock(){if(!(typeof document>"u")&&document.pointerLockElement)try{document.exitPointerLock()}catch{}}beginRun(){this.audio.unlock(),this.audio.cue("start",330,.12),this.sim.startRun(this.sim.state.selectedModule),this.camera?.resize(window.innerWidth,window.innerHeight),this.ui?.render()}draw(){const e=this.sim.state.run;if(!this.renderer||!this.scene||!this.camera)return;this.camera.resize(window.innerWidth,window.innerHeight);const t=Ni(e)||!!e?.moduleChoiceOpen,n=["title","loadout","intro","paused","defeat","result","loading","error"].includes(this.sim.state.phase)||!!e?.moduleChoiceOpen||Ni(e);if(this.input?.setUiOwns(n),t&&this.releasePointerLock(),e){this.scene.sync(e);const s=this.lastInput.secondary;this.camera.update(e,this.sim.physics,s,this.sim.state.settings.reducedMotion?1:0);const r=this.sim.state.settings.reducedMotion?0:this.sim.state.settings.shake??.5,a=e.player.attack;if(a?.phase==="contact"){const c=`${a.id}-contact`;this.lastShakeAtk!==c&&(this.lastShakeAtk=c,this.camera.addShake((a.defId==="rin.secondary"?.07:.12)*r))}else this.lastShakeAtk="";const o=e.projectiles.find(c=>c.team==="player");o?o.id!==this.lastShakeProj&&(this.lastShakeProj=o.id,this.camera.addShake(.025*r)):this.lastShakeProj=""}else{this.scene.showTitle();const s=this.scene.titleLookAt();this.camera.camera.position.copy(s.from),this.camera.camera.lookAt(s.at),this.camera.camera.updateProjectionMatrix()}this.scene.billboardActors(this.camera.camera),this.renderer.renderer.render(this.scene.scene,this.camera.camera),this.sim.state.phase==="result"&&this.sim.state.run?.rewardsCommitted&&this.persistSave()}refreshUi(){this.ui?.render()}applyRuntimeArt(e){this.scene?.applyRuntimeArt(e)}maybeQaPlay(){if(this.sim.state.phase==="loading"||this.sim.state.phase==="error")return;new URLSearchParams(location.search).get("qa")==="play"&&(this.beginRun(),this.sim.skipIntro(),this.ui?.render())}drainCues(){const e=this.sim.state.run;if(!e||!e.pendingCues.length)return;const t=e.pendingCues.splice(0,e.pendingCues.length);for(const n of t)this.audio.play(n)}projectFloaters(){const e=this.sim.state.run;if(!e||!this.camera||!this.ui)return;const t=window.innerWidth,n=window.innerHeight,s=new U,r=[];for(const a of e.combatFloaters){if(s.set(a.pos.x,a.pos.y,a.pos.z).project(this.camera.camera),s.z<-1||s.z>1)continue;const o=1-(e.juiceTick-a.born)/a.life;r.push({id:a.id,x:(s.x*.5+.5)*t,y:(-s.y*.5+.5)*n,text:a.text,kind:a.kind,k:o})}this.ui.syncFloaters(r)}persistSave(){const e=this.sim.state.meta,t={version:1,settings:this.sim.state.settings,clearedMissions:e.clearedMissions,unlockedCharacters:e.unlockedCharacters,unlockedArchiveEntries:e.unlockedArchiveEntries,seenStoryFlags:e.seenStoryFlags,unlockedModules:e.unlockedModules};try{localStorage.setItem(Rd,JSON.stringify(t))}catch{}}}const Eo=document.getElementById("app");if(!Eo)throw new Error("missing #app");const oi=document.getElementById("boot-splash"),Qc=oi?.querySelector(".hint"),to=gg(),Ui=new Gg(to);Ui.mount(Eo);function aa(i,e){Qc&&(Qc.textContent=i);const t=oi?.querySelector(".bar > i");t&&typeof e=="number"&&(t.style.width=`${Math.max(8,Math.round(e*100))}%`,t.style.animation="none")}let jc=0;mg(to,{onStage:(i,e,t)=>{const n=t&&t>0&&typeof e=="number"?e/t:to.state.loadProgress;i==="boot-parallel"?aa("喚醒雨幕與物理…",.05):i.startsWith("runtime")?aa(`描繪霧林與立繪… ${Math.round(n*100)}％`,n):i==="ready"&&aa("雨鎖山門已開啟",1);const s=performance.now();s-jc<120&&e!==t||(jc=s,Ui.refreshUi())}}).then(({textures:i,assets:e})=>{Ui.applyRuntimeArt(i),Ui.refreshUi(),oi&&(oi.classList.add("gone"),window.setTimeout(()=>oi.remove(),350)),Ui.maybeQaPlay(),window.setTimeout(()=>{e.loadDeferred().then(()=>{Ui.applyRuntimeArt(e.textures)}).catch(()=>{})},400)}).catch(i=>{oi&&oi.remove(),Eo.textContent=`載入失敗：${i instanceof Error?i.message:String(i)}`});
//# sourceMappingURL=index-CNf1aTFG.js.map
