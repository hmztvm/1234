const ALL=["Səni sevirəm","I love you","Seni seviyorum","Я тебя люблю","Je t'aime","Te quiero","Ti amo","Ich liebe dich","Eu te amo","أحبك","دوستت دارم","愛してる","사랑해","我爱你","मुझे तुमसे प्यार है","Σ' αγαπώ","Kocham cię","Ik hou van jou","Jag älskar dig","Я тебе кохаю",
"Jeg elsker deg","Jeg elsker dig","Minä rakastan sinua","Szeretlek","Te iubesc","Miluji tě","Ľúbim ťa","Volim te","Обичам те","Mīlu tevi","Aš tave myliu","Ma armastan sind","Ljubim te","Të dua",
"Ég elska þig","Tá grá agam duit","Rwy'n dy garu di","Mi amas vin","Te amo","Maite zaitut","T'estimo","Te quero","Ech hunn dech gär","Ik hâld fan dy","Inħobbok",
"Ես քեզ սիրում եմ","მიყვარხარ","Мен сені сүйемін","Men seni sevaman","Мен сени сүйөм","Би чамд хайртай","אני אוהב אותך","مجھے تم سے پیار ہے","Ez te hez dikim","Ман туро дӯст медорам",
"আমি তোমাকে ভালোবাসি","ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ","நான் உன்னை காதலிக்கிறேன்","నేను నిన్ను ప్రేమిస్తున్నాను","ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു","ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ","माझे तुझ्यावर प्रेम आहे","હું તને પ્રેમ કરું છું","म तिमीलाई माया गर्छु","මම ඔබට ආදරෙයි",
"ฉันรักเธอ","Anh yêu em","Aku cinta kamu","Saya cintakan awak","Mahal kita","ချစ်တယ်","ខ្ញុំស្រលាញ់អ្នក","ຂ້ອຍຮັກເຈົ້າ","我愛你",
"Nakupenda","Ngiyakuthanda","Ndiyakuthanda","Ek is lief vir jou","እወድሃለሁ","Ina son ka","Mo nifẹ rẹ","A hụrụ m gị n'anya","Ndinokuda","Waan ku jeclahay","Tiako ianao",
"Aloha au iā ʻoe","Aroha ana ahau ki a koe","Ou te alofa ia te oe","Au domoni iko","Rohayhu","Munakuyki","Mwen renmen w","Мин сине яратам","Men seni söýýärin","Я цябе кахаю","Те сакам","Волим те","Tha gaol agam ort","Da garout a ran","Ti tengu caru"];
const PK=["Szeretlek","Te iubesc","Miluji tě","Volim te","Mi amas vin","მიყვარხარ","אני אוהב אותך","ฉันรักเธอ","Anh yêu em","Nakupenda"];
const L=ALL.filter((x,i)=>i<20||PK.includes(x));
const NS="http://www.w3.org/2000/svg",sv=document.getElementById('sv');
const PG=[];for(let i=0;i<400;i++){const t=i/400*2*Math.PI;PG.push([16*Math.pow(Math.sin(t),3),-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))])}
const ins=(x,y)=>{let c=false;for(let i=0,j=PG.length-1;i<PG.length;j=i++){const a=PG[i],b=PG[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c};
const NY=-1.2,RH=1.75;
function outline(){let d="";for(let a=0;a<360;a+=1.5){const dx=Math.cos(a*Math.PI/180),dy=Math.sin(a*Math.PI/180);let r=0;while(r<30&&ins(r*dx,-2.5+r*dy))r+=.05;d+=(a?"L":"M")+(r*dx).toFixed(2)+" "+(-2.5+r*dy).toFixed(2)}return d+"Z"}
function mk(n,at){const e=document.createElementNS(NS,n);for(const k in at)e.setAttribute(k,at[k]);return e}
const rnd=(()=>{let q=11;return()=>{q=(q*16807)%2147483647;return q/2147483647}})();
function build(){
 sv.innerHTML='';
 const m=mk('text',{'font-size':1});m.style.fontWeight=700;sv.appendChild(m);
 const bw=L.map(t=>{m.textContent=t;return m.getComputedTextLength()});
 let k=0,ri=0;
 for(let y=-10.8;y<=16.4;y+=RH,ri++){
  const y1=y-RH*.46,y2=y+RH*.46,runs=[];let st=null;
  for(let x=-18;x<=18.01;x+=.1){
   let ok=ins(x,y1)&&ins(x,y2)&&ins(x,y);
   if(ok&&st===null)st=x;
   if(!ok&&st!==null){runs.push([st,x]);st=null}
  }
  runs.forEach(r=>{
   const W=r[1]-r[0]-.8;if(W<1.4)return;
   let it=[],sum=0;
   while(it.length<16){
    const i=k%L.length,g=it.length?.75:0,s=.9+rnd()*.65;
    if(sum+g+bw[i]*s<=W){it.push({i,s,w:bw[i]*s});sum+=g+bw[i]*s;k++}
    else if(sum+g+bw[i]*.85<=W){it.push({i,s:.85,w:bw[i]*.85});sum+=g+bw[i]*.85;k++}
    else break}
   const col=()=>'hsl('+(2+rnd()*10|0)+',100%,'+(56+rnd()*10|0)+'%)';
   if(!it.length){const t=mk('text',{x:((r[0]+r[1])/2).toFixed(2),y:y.toFixed(2),'font-size':1.3,'text-anchor':'middle','dominant-baseline':'central',class:'r',fill:col()});t.style.animationDelay=(.2+ri*.12)+'s,0s';t.textContent='♥';sv.appendChild(t);return}
   const tw=it.reduce((a,o)=>a+o.w,0),gap=it.length>1?Math.min(2.4,(W-tw)/(it.length-1)):0;
   let x=r[0]+.4+(W-(tw+gap*(it.length-1)))/2;
   it.forEach(o=>{const t=mk('text',{x:x.toFixed(2),y:(y+(rnd()-.5)*.35).toFixed(2),'font-size':o.s.toFixed(2),'dominant-baseline':'central',class:'r',fill:col()});
    t.style.animationDelay=(.2+ri*.12+rnd()*.8)+'s,'+(rnd()*3).toFixed(2)+'s';t.textContent=L[o.i];sv.appendChild(t);x+=o.w+gap})
  })
 }
 sv.removeChild(m);
}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(build);
// ticker
const tk=document.getElementById('tk');let ti=0;
function tick(){tk.style.opacity=0;setTimeout(()=>{tk.textContent=L[ti++%L.length];tk.style.opacity=1},300)}
setTimeout(()=>{tick();setInterval(tick,1700)},3000);
// hearts
const rain=document.getElementById('rain'),E=['❤','💖','💗','💕','✨','🌹'];
setInterval(()=>{const e=document.createElement('span');e.className='fh';e.textContent=E[Math.random()*E.length|0];e.style.left=Math.random()*100+'%';e.style.fontSize=(12+Math.random()*22)+'px';e.style.animationDuration=(6+Math.random()*7)+'s';rain.appendChild(e);setTimeout(()=>e.remove(),13500)},380);
addEventListener('pointerdown',e=>{for(let i=0;i<6;i++){const q=document.createElement('span');q.className='fh';q.textContent='❤';q.style.position='fixed';q.style.left=(e.clientX-10+Math.random()*20)+'px';q.style.top=(e.clientY-10)+'px';q.style.bottom='auto';q.style.fontSize=(14+Math.random()*16)+'px';q.style.animationDuration=(2+Math.random()*2)+'s';rain.appendChild(q);setTimeout(()=>q.remove(),4200)}});
