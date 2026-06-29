document.addEventListener("DOMContentLoaded", () => {

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

    setInterval(updateTime,60000);

});

