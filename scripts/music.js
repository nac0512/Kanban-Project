class Music {
    constructor() {
        if(localStorage.getItem("station")!= null) {
            let station = localStorage.getItem("station");
            Utilities.CreateStation(station);
        }
        document.querySelector("#musicBtn").addEventListener("click", e=>this.musicToggle(e));
    }

    musicToggle(e) {
        if(e.target.getAttribute("class") == "icon-play") {
            Utilities.CreateStation("http://stream.revma.ihrhls.com/zc4242");
            localStorage.setItem("station", "http://stream.revma.ihrhls.com/zc4242");
        }
        else {
            document.querySelector("audio").remove();
            e.target.setAttribute("class", "icon-play");
            e.target.setAttribute("aria-label", "Play Music");
            localStorage.removeItem("station");
        }
    }
}