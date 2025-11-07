// ZZen modeボタンをツールバーに追加
 function addZenButton() {
   if (document.getElementById('zen-toolbar-btn')) return
   
   const toolbar = document.querySelector('.page-menu')
   if (!toolbar) {
     setTimeout(addZenButton, 500)
     return
   }
   
   const zenBtn = document.createElement('button')
   zenBtn.id = 'zen-toolbar-btn'
   zenBtn.className = 'tool-btn'
   zenBtn.style.cssText = 'width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: inherit;'
   zenBtn.innerHTML = '<span style="font-size: 22px;">🌙</span>'
   zenBtn.title = 'ZZen mode'
   
   zenBtn.onclick = () => {
     var bg = 'black'
     var style = document.getElementById('__zen__')
     if (style) { 
       style.remove()
       zenBtn.innerHTML = '<span style="font-size: 22px;">🌙</span>'
     } else {
       zenBtn.innerHTML = '<span style="font-size: 22px;">✓</span>'
       var css = `body, .page { background-color:${bg} !important; background-image:none !important }` +
           '.navbar:not(:hover), .line .telomere:not(:hover), .col-page-side:not(:hover),.flex-box:not(:hover) { opacity:0 }'
       style = document.createElement('style')
       style.setAttribute('id', '__zen__')
       style.appendChild(document.createTextNode(css))
       document.head.appendChild(style)
     }
   }
   
   // リミックスボタンを探して、その下に挿入
   const remixBtn = document.querySelector('button[title="リミックス"]')
   if (remixBtn && remixBtn.parentElement) {
     remixBtn.parentElement.insertBefore(zenBtn, remixBtn.nextSibling)
   } else {
     toolbar.appendChild(zenBtn)
   }
 }
 
 // Daily Templateボタンを新規ページボタンの横に追加
 function addDailyButton() {
   if (document.getElementById('daily-template-btn')) return
   
   const newPageBtn = document.querySelector('.new-button')
   if (!newPageBtn) {
     setTimeout(addDailyButton, 500)
     return
   }
   
   const dailyBtn = document.createElement('a')
   dailyBtn.id = 'daily-template-btn'
   dailyBtn.className = 'tool-btn'
   dailyBtn.style.cssText = 'margin-left: 8px; cursor: pointer;'
   dailyBtn.innerHTML = '<span style="font-size: 20px;">📅</span>'
   dailyBtn.title = 'Daily Template'
   
   dailyBtn.onclick = async () => {
     const today = new Date()
     const todayStr = today.getFullYear() + '-' + 
                      ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
                      ('0' + today.getDate()).slice(-2)
     
     const yesterday = new Date(today)
     yesterday.setDate(yesterday.getDate() - 1)
     const yesterdayStr = yesterday.getFullYear() + '-' + 
                          ('0' + (yesterday.getMonth() + 1)).slice(-2) + '-' + 
                          ('0' + yesterday.getDate()).slice(-2)
     
     let yesterdayTodos = []
     try {
       const response = await fetch(`/api/pages/${scrapbox.Project.name}/${yesterdayStr}`)
       if (response.ok) {
         const pageData = await response.json()
         const lines = pageData.lines || []
         
         let inTodoSection = false
         for (let line of lines) {
           const text = line.text
           
           if (text.match(/^##\s*Todo/i)) {
             inTodoSection = true
             continue
           }
           
           if (inTodoSection) {
             if (text.match(/^##\s/)) break
             if (!text.trim()) continue
             if (!text.includes('[x]') && !text.includes('[X]')) {
               yesterdayTodos.push(text.trim())
             }
           }
         }
       }
     } catch (err) {
       console.error('前日のTodo取得エラー:', err)
     }
     
     let content = '## Todo\n'
     if (yesterdayTodos.length > 0) {
       content += yesterdayTodos.join('\n') + '\n'
     }
     content += '\n## Done\n'
     
     const encodedTitle = encodeURIComponent(todayStr)
     const encodedBody = encodeURIComponent(content)
     window.location.href = `/${scrapbox.Project.name}/${encodedTitle}?body=${encodedBody}`
   }
   
   newPageBtn.parentElement.appendChild(dailyBtn)
 }
 
 setTimeout(() => {
   addZenButton()
   addDailyButton()
 }, 1000)
 
 setInterval(() => {
   if (!document.getElementById('zen-toolbar-btn')) addZenButton()
   if (!document.getElementById('daily-template-btn')) addDailyButton()
 }, 2000)
