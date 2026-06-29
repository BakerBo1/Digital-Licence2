document.addEventListener("DOMContentLoaded", () => {

    // --------------------------
    // Refresh Time
    // --------------------------

    const refreshTime = document.getElementById("refresh-time");

    function updateTime(){

        const months = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const now = new Date();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2,"0");

        const ampm = hours >= 12 ? "pm" : "am";

        hours = hours % 12;
        if(hours === 0) hours = 12;

        refreshTime.textContent =
            `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${hours}:${minutes}${ampm}`;

    }

    updateTime();



    // --------------------------
    // Pull to Refresh
    // --------------------------

    const pullRefresh = document.querySelector(".pull-refresh");

    let startY = 0;
    let pulling = false;

    document.addEventListener("touchstart", e => {

        if(window.scrollY === 0){
            startY = e.touches[0].clientY;
            pulling = true;
        }

    });

    document.addEventListener("touchmove", e => {

        if(!pulling) return;

        const distance = e.touches[0].clientY - startY;

        if(distance > 70){
            pullRefresh.classList.add("show");
        }

    });

    document.addEventListener("touchend", () => {

        if(pullRefresh.classList.contains("show")){

            updateTime();

            pullRefresh.classList.add("spin");

            setTimeout(() => {

                pullRefresh.classList.remove("show");
                pullRefresh.classList.remove("spin");

            },800);

        }

        pulling = false;

    });



    // --------------------------
    // Signature Popup
    // --------------------------

    const popup = document.getElementById("signaturePopup");
    const closePopup = document.getElementById("closePopup");

    document.querySelectorAll(".signature-trigger").forEach(item => {

        item.addEventListener("click", () => {

            popup.classList.add("show");

        });

    });

    closePopup.addEventListener("click", () => {

        popup.classList.remove("show");

    });

    popup.addEventListener("click", e => {

        if(e.target === popup){

            popup.classList.remove("show");

        }

    });



    // --------------------------
    // Copy Action Sheet
    // --------------------------

    const copySheet = document.getElementById("copySheet");
    const closeCopySheet = document.getElementById("closeCopySheet");
    const copyOverlay = document.querySelector(".copy-overlay");
    const copyLicence = document.getElementById("copyLicence");
    const copyCard = document.getElementById("copyCard");

    document.querySelectorAll(".card-trigger").forEach(item => {

        item.addEventListener("click", () => {

            copySheet.classList.add("show");

        });

    });

    closeCopySheet.addEventListener("click", () => {

        copySheet.classList.remove("show");

    });

    copyOverlay.addEventListener("click", () => {

        copySheet.classList.remove("show");

    });

    copyLicence.addEventListener("click", async () => {

        try{
            await navigator.clipboard.writeText("144848384");
        }catch(e){}

        copySheet.classList.remove("show");

    });

    copyCard.addEventListener("click", async () => {

        try{
            await navigator.clipboard.writeText("7F8D7D70C4");
        }catch(e){}

        copySheet.classList.remove("show");

    });

});