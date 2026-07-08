document.addEventListener("DOMContentLoaded", () => {

    /*=========================================================
      ELEMENTS
    =========================================================*/

    const refreshTime = document.getElementById("refresh-time");
    const refreshStatus = document.getElementById("refreshStatus");
    const refreshInfo = document.getElementById("refreshInfo");
    const pullRefresh = document.querySelector(".pull-refresh");

    const signaturePopup = document.getElementById("signaturePopup");
    const closePopup = document.getElementById("closePopup");

    const copySheet = document.getElementById("copySheet");
    const closeCopySheet = document.getElementById("closeCopySheet");
    const copyOverlay = document.querySelector(".copy-overlay");
    const copyLicence = document.getElementById("copyLicence");
    const copyCard = document.getElementById("copyCard");


    /*=========================================================
      REFRESH TIME
    =========================================================*/

    function updateTime(){

        const months = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const now = new Date();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2,"0");
        const ampm = hours >= 12 ? "pm" : "am";

        hours = hours % 12 || 12;

        refreshTime.textContent =
            `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${hours}:${minutes}${ampm}`;

    }

    updateTime();


    /*=========================================================
      PULL TO REFRESH
    =========================================================*/

    let startY = 0;
    let pulling = false;

    document.addEventListener("touchstart", e => {

        if(window.scrollY !== 0) return;

        startY = e.touches[0].clientY;
        pulling = true;

    });

    document.addEventListener("touchmove", e => {

        if(!pulling) return;

        const distance = e.touches[0].clientY - startY;

        if(distance > 70){
            pullRefresh.classList.add("show");
        }

    });

    document.addEventListener("touchend", () => {

        if(!pullRefresh.classList.contains("show")){
            pulling = false;
            return;
        }

        refreshInfo.classList.add("hide");
        refreshStatus.classList.add("show");
        pullRefresh.classList.add("spin");

        setTimeout(() => {

            updateTime();

            refreshStatus.classList.remove("show");
            refreshInfo.classList.remove("hide");

            pullRefresh.classList.remove("show","spin");

        },800);

        pulling = false;

    });


    /*=========================================================
      SIGNATURE POPUP
    =========================================================*/

    function showSignature(){
        signaturePopup.classList.add("show");
    }

    function hideSignature(){
        signaturePopup.classList.remove("show");
    }

    document.querySelectorAll(".signature-trigger").forEach(item =>
        item.addEventListener("click", showSignature)
    );

    closePopup.addEventListener("click", hideSignature);

    signaturePopup.addEventListener("click", e => {
        if(e.target === signaturePopup) hideSignature();
    });


    /*=========================================================
      COPY SHEET
    =========================================================*/

    function showCopySheet(){
        copySheet.classList.add("show");
    }

    function hideCopySheet(){
        copySheet.classList.remove("show");
    }

    document.querySelectorAll(".card-trigger, .licence-trigger").forEach(item =>
        item.addEventListener("click", showCopySheet)
    );

    closeCopySheet.addEventListener("click", hideCopySheet);
    copyOverlay.addEventListener("click", hideCopySheet);


    /*=========================================================
      COPY TO CLIPBOARD
    =========================================================*/

    async function copyText(text){

        try{
            await navigator.clipboard.writeText(text);
        }catch(e){}

        hideCopySheet();

    }

    copyLicence.addEventListener("click", () => copyText("144848384"));
    copyCard.addEventListener("click", () => copyText("7F8D7D70C4"));

});