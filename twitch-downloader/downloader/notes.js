// notes
function openNoteTab(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}

function create_note_content() {
    return [
        {
            id: "note_notice",
            value: '注意事項',
            content: note_content
        },
        {
            id: "note_local",
            value: '本地下載',
            'Youtube儲存':  "",
            content: note_local_content
        }, {
            id: "note_youtube",
            value: 'Youtube儲存',
            content: note_youtube_content
        }, {
            id: "note_gdrive",
            value: 'Google drive儲存',
            content: note_gdrive_content
        }
    ]
}

function showNotes() {
    document.cookie='1'
    var tab_contents = create_note_content()
    var holder = document.createElement('div')
    var tab = document.createElement('div')
    tab.classList.add("tab")
    holder.appendChild(tab)
    holder.style.width = "100%"
    var firstBtn = null
    tab_contents.forEach(tab_content=>{
        var btn = document.createElement('button')
        firstBtn = firstBtn || btn
        btn.classList.add("tablinks")
        btn.onclick=function(event) {
            openNoteTab(event, tab_content.id)
        }
        btn.innerText = tab_content.value
        tab.appendChild(btn)
        var content = document.createElement('div')
        content.id = tab_content.id
        content.style.maxHeight = "50vh";
        content.style.overflow = "auto"
        content.classList.add("tabcontent")
        content.innerHTML = tab_content.content
        content.style.background = "white";
        holder.appendChild(content)
    })
    showModal(holder)
    firstBtn.click()
}


note_local_content =  `
<ol class="custom-counter">
    <li>本地存取權限於視窗關閉後失效<br><b>請勿</b>將下載頁面關閉</li>
    <li>請確保硬碟有足夠儲存空間</li>
    <li>無法儲存於系統預設資料夾 <br> (C:\\, 桌面, 下載 ... 等路徑)</li>
    <li>影片完成輸出前直接關閉下載頁面將遺失影片</li>
    <li> 關閉視窗後背景直播檢查週期限制為1分鐘 </li>
</ol>
`
note_youtube_content = `
<ol class="custom-counter">
    <li> 可於視窗關閉後自動開起錄影作業 </li>
    <li> 需 <a href="https://studio.youtube.com/" target="_blank">創建</a> Youtube 頻道 <b> (必須) </b> </li>
    <li> 需 <a href="https://www.youtube.com/verify" target="_blank">啟用</a> 上傳 <a href="https://support.google.com/youtube/answer/71673" target="_blank"> 長片 </a>權限 <b> (必須) </b> </li>
    <li> <a href="https://support.google.com/youtube/answer/9891124#hcfe-content" target="_blank">開啟進階功能</a> 擴增上傳數量限制 <b> (可能需要) </b> </li>
    <li> 透過直播串流影片可以即時回放 </li>
    <li> 系統將自動建立一個 vods 播放清單 <br> 並加入錄製的影片 </li>
    <li> 影片完成輸出前直接關閉下載頁面將遺失影片 </li>
    <li> 請遵守Youtube <a href="https://support.google.com/youtube/answer/9288567" target="_blank">使用規範</a> 評估使用上傳服務 </li>
    <li> 關閉視窗後背景直播檢查週期限制為1分鐘 </li>
</ol>
`
note_gdrive_content = `
<ol class="custom-counter">
    <li> 可於視窗關閉後自動開起錄影作業 </li>
    <li> 請確保硬碟有足夠儲存空間 </li>
    <li> 影片完成輸出前直接關閉下載頁面將遺失影片 </li>
    <li> 請遵守Google 雲端硬碟 <a href="https://www.google.com/drive/terms-of-service/" target="_blank">使用規範</a> 評估使用上傳服務 </li>
    <li> 關閉視窗後背景直播檢查週期限制為1分鐘 </li>
</ol>
`
note_content=`
<ol class="custom-counter">
    <li> 請確保詳讀各項模式使用說明 </li>
    <li> 使用者資料不會以任何形式提供外部存取 </li>
    <li> 此工具尚處開發初期，可能有潛在Bug存在，請自行斟酌使用 </li>
    <li> 錄製過程若發生任何傳輸錯誤，當次影片將有機會完全遺失，請自行斟酌使用 </li>
    <li> 連結外部帳號會存取<b>機敏資料</b>，請自行斟酌使用 </li>
    <li> 未經同意 <b>禁止</b> 以任何形式分享此工具 </li>
    <li> Contribute or bug report : <a href="https://github.com/Josh8712/Twitch-VOD-Downloader" target="_blank"> Github </a> </li>
</ol>
`