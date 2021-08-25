class Music {
    constructor() {
        if(localStorage.getItem("station")!= null) {
            let station = localStorage.getItem("station");
            Utilities.CreateStation(station);
        }
        document.querySelector("#musicBtn").addEventListener("click", e=>this.musicToggle(e));
    }

    musicToggle(e) {
        Utilities.Focus();
        if(!document.querySelector("form")) {
            const form = document.createElement("form");
            form.setAttribute("id", "musicForm");
            form.setAttribute("action", "#URL");
            form.setAttribute("method", "POST");
            form.setAttribute("aria-modal", "true");
            form.setAttribute("role", "dialog");
            form.setAttribute("aria-labelledby", "formName");
            form.innerHTML = `
            <h5 id="formName">Select A Station</h5>
            <div>
                <input type="radio" id="jazz" name="music" value="1">
                <label for="jazz">Smooth Jazz</label>
            </div>
            <div>
                <input type="radio" id="rock" name="music" value="2">
                <label for="rock">Classic Rock</label>
            </div>
            <div>
                <input type="radio" id="country" name="music" value="3">
                <label for="country">Country</label>
            </div>
            <div>
                <input type="radio" id="hip" name="music" value="4">
                <label for="hip">Hip Hop & R&B</label>
            </div>
            <div>
                <input type="radio" id="indie" name="music" value="5">
                <label for="indie">Indie</label>
            </div>
            <div>
                <input type="radio" id="none" name="music" value="6" checked>
                <label for="none">No Music</label>
            </div>
            <button id="selectButton" type="submit">Select</button>
            `;
            document.querySelector("footer").before(form);
            if(localStorage.getItem("prechecked")!= null) {
                let checked = localStorage.getItem("prechecked");
                document.querySelectorAll("input[name=music]").forEach(e =>{
                    if(e.value == checked){
                        e.checked = true;
                    }
                });
            }

            document.querySelector("input[name=music]:checked").focus();
            document.querySelector("#selectButton").addEventListener("click", (e) => {
                e.preventDefault();
                Utilities.Unfocus();
                let choice = document.querySelector("input[name=music]:checked").value;
                localStorage.setItem("checked", choice);
                let stations = {
                    1: "http://stream.revma.ihrhls.com/zc4242",
                    2: "http://stream.revma.ihrhls.com/zc4426",
                    3: "https://stream.revma.ihrhls.com/zc4418",
                    4: "http://stream.revma.ihrhls.com/zc4429",
                    5: "http://stream.revma.ihrhls.com/zc4982"
                };
                
                if(choice in stations) {
                    Utilities.CreateStation(stations[choice]);
                    localStorage.setItem("station", stations[choice]);
                    localStorage.setItem("prechecked", choice);
                }
                else {
                    if(document.querySelector("audio")) {
                        document.querySelector("audio").remove();
                        e.target.setAttribute("class", "icon-play");
                        e.target.setAttribute("aria-label", "Play Music");
                        localStorage.removeItem("station");
                        localStorage.removeItem("prechcked");
                    }
                }
                document.querySelector("form").remove();
                document.querySelector("#musicBtn").focus();
            });
        }
        else {
            document.querySelector("form").remove();
            document.querySelector("#musicBtn").focus();
            Utilities.Unfocus();
        }
    }
}