(() => {
  'use strict';
  const lessons = window.LESSONS;
  const topics=[['all','所有練習'],['tree','樹 Tree'],['heap','堆積 Heap'],['queue','佇列 Queue'],['stack','堆疊 Stack'],['experiment','程式實驗']];
  const $=id=>document.getElementById(id);
  let topic='all', mode='parallel', timers=[];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const name=id=>topics.find(t=>t[0]===id)?.[1]||id;
  function cancel(){timers.forEach(clearTimeout);timers=[];}
  function render(){
    $('topics').innerHTML=topics.map(([id,title])=>{const n=id==='all'?lessons.length:lessons.filter(x=>x.category===id).length;return `<button type="button" data-topic="${id}" aria-pressed="${topic===id}"><span>${title}</span><small>${n?n+' 篇':'待新增'}</small></button>`;}).join('');
    $('count').textContent=lessons.length+' 篇已收錄';$('list-title').textContent=name(topic);
    const q=$('search').value.trim().toLowerCase();
    const entries=lessons.filter(x=>(topic==='all'||x.category===topic)&&[x.title,x.summary,x.language,...x.sections.map(s=>s.text)].join(' ').toLowerCase().includes(q));
    $('entries').innerHTML=entries.length?entries.map(x=>`<button class="entry" type="button" data-open="${esc(x.id)}"><div class="entry-top"><span class="badge">${esc(name(x.category))}</span><span>${esc(x.language)}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><div class="entry-bottom"><span>${esc(x.date)}</span><span>閱讀筆記 ↗</span></div></button>`).join(''):`<p class="empty">${q?'找不到符合的練習。':'這個分類還沒有筆記。下一次練習後，新增內容就會出現在這裡。'}</p>`;
  }
  function openLesson(id,scroll=true){
    const x=lessons.find(x=>x.id===id);if(!x)return;
    cancel();$('lesson').hidden=false;
    $('lesson').innerHTML=`<p class="lesson-meta">${esc(name(x.category))} / ${esc(x.date)} / ${esc(x.language)}</p><h2>${esc(x.title)}</h2><div class="question"><strong>本次實作觀察</strong><p>依序執行約 6.002 秒；改用兩個執行緒後約 3.008 秒。</p><p>來自本次練習的終端畫面，數值會隨環境改變。</p></div><div class="code-head"><span>練習程式</span><div><button id="copy-code" type="button">複製程式碼</button> <a href="${esc(x.source)}" download>下載 .cpp</a></div></div><pre><code id="source-code"></code></pre>${x.sections.map(s=>`<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>`).join('')}<section class="experiment"><h3>兩個三秒工作，怎麼排？</h3><p class="experiment-note">瀏覽器時間軸示意，沒有編譯或執行上方的 C++。並行範例的輸出順序僅為一種可能。</p><div class="mode-buttons"><button class="button" type="button" data-mode="serial">依序呼叫</button><button class="button" type="button" data-mode="parallel">兩個執行緒</button></div><div class="timeline"><div class="lane"><span>A</span><div class="track"><div class="bar">等待 3 秒</div></div></div><div class="lane"><span>B</span><div class="track"><div id="bar-b" class="bar bar-b">等待 3 秒</div></div></div><div class="time-axis"><span>0 秒</span><span>3 秒</span><span>6 秒</span></div></div><p class="result" id="timing"></p><button class="button" id="run-demo" type="button">播放一次</button><pre id="demo-log" role="log" aria-label="時間軸示範輸出">按「播放一次」觀看流程。</pre><p id="demo-state" class="experiment-note" aria-live="polite"></p></section><h3>下次複習，先回答這三題</h3><ol class="steps"><li>呼叫函式與建立執行緒，有什麼差別？</li><li>為什麼不能把三秒休眠也放進鎖的範圍？</li><li>如果要保證 A 先印開始，單靠 mutex 夠不夠？</li></ol><section class="update-guide"><h3>如何加入下一篇練習</h3><p>把程式放進 code 資料夾，接著在 lessons.js 加入一筆筆記。細節與欄位格式請看專案內 README.md。</p><p>儲存 → VS Code 原始檔控制檢查差異 → 暫存 → 提交 → 推送。GitHub Pages 部署成功後網站才會更新。</p></section>`;
    $('source-code').textContent=x.code;
    const download=$('lesson').querySelector('.code-head a');
    download.textContent='下載 '+(x.source.endsWith('.py')?'.py':'.cpp');
    if(x.diagram){
      const detail=document.createElement('section');
      detail.innerHTML='<h3>本次建立的樹</h3><pre><code>'+esc(x.diagram)+'</code></pre>';
      $('lesson').querySelector('.code-head').before(detail);
    }
    if(x.output){
      const detail=document.createElement('section');
      detail.innerHTML='<h3>程式執行結果</h3><pre><code>'+esc(x.output)+'</code></pre>';
      $('source-code').parentElement.after(detail);
    }
    if(x.complexity){
      const detail=document.createElement('section');
      detail.innerHTML='<h3>時間與空間複雜度</h3><div class="table-wrap"><table><thead><tr><th scope="col">操作</th><th scope="col">時間</th><th scope="col">額外空間</th><th scope="col">原因</th></tr></thead><tbody>'+x.complexity.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
      $('lesson').querySelector('.update-guide').before(detail);
    }
    if(x.reviewQuestions){
      const detail=document.createElement('section');
      detail.innerHTML='<h3>下次從這裡接著練</h3><ul>'+x.reviewQuestions.map(q=>'<li>'+esc(q)+'</li>').join('')+'</ul>';
      $('lesson').querySelector('.update-guide').before(detail);
    }
    $('copy-code').onclick=async()=>{try{await navigator.clipboard.writeText(x.code);$('copy-code').textContent='已複製';}catch{$('copy-code').textContent='請選取下方程式碼複製';}};
    if(x.id==='threads-and-mutex'){
      $('run-demo').onclick=play;setMode(mode);
    } else {
      $('lesson').querySelector('.question').remove();
      $('lesson').querySelector('.experiment').remove();
      const questions=$('lesson').querySelector('.steps');
      questions.previousElementSibling.remove();questions.remove();
    }
    if(scroll)$('lesson').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  function setMode(next){cancel();mode=next;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));$('bar-b').style.left=mode==='serial'?'50%':'0';$('timing').textContent=mode==='serial'?'兩段等待相加：總耗時約 6 秒':'兩段等待重疊：總耗時約 3 秒';$('run-demo').disabled=false;$('demo-log').textContent='按「播放一次」觀看流程。';$('demo-state').textContent='';}
  function play(){cancel();$('run-demo').disabled=true;$('demo-log').textContent='';$('demo-state').textContent='示範播放中';const log=t=>$('demo-log').textContent+=t+'\n';log('A 開始');if(mode==='parallel')log('B 開始');timers.push(setTimeout(()=>{log('A 完成');if(mode==='serial')log('B 開始');else{log('B 完成');finish();}},3000));if(mode==='serial')timers.push(setTimeout(()=>{log('B 完成');finish();},6000));}
  function finish(){$('demo-state').textContent='示範結束';$('run-demo').disabled=false;}
  $('topics').addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(!b)return;topic=b.dataset.topic;cancel();$('lesson').hidden=true;render();});
  $('entries').addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){location.hash=b.dataset.open;openLesson(b.dataset.open);}});
  $('lesson').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)setMode(b.dataset.mode);});
  $('search').addEventListener('input',()=>{cancel();$('lesson').hidden=true;render();});
  window.addEventListener('hashchange',()=>{if(location.hash)openLesson(location.hash.slice(1));});
  render();openLesson(location.hash.slice(1)||lessons[0].id,false);
})();
