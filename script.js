const refreshButton = document.querySelector(".pull-refresh");
const refreshTime = document.getElementById("refresh-time");

function updateRefreshTime(){

    const months=[
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const now=new Date();

    let hours=now.getHours();
    const minutes=String(now.getMinutes()).padStart(2,"0");
    const ampm=hours>=12?"pm":"am";

    hours=hours%12;
    if(hours===0) hours=12;

    refreshTime.textContent=
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${hours}:${minutes}${ampm}`;
}

updateRefreshTime();

let startY=0;
let refreshing=false;

window.addEventListener("touchstart",e=>{
    if(window.scrollY===0){
        startY=e.touches[0].clientY;
    }
});

window.addEventListener("touchmove",e=>{

    if(refreshing) return;

    const distance=e.touches[0].clientY-startY;

    if(window.scrollY===0 && distance>90){

        refreshing=true;

        refreshButton.classList.add("show");
        refreshButton.classList.add("spin");

        setTimeout(()=>{

            updateRefreshTime();

            refreshButton.classList.remove("show");
            refreshButton.classList.remove("spin");

            refreshing=false;

        },900);

    }

});