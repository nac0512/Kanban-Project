class Main {
    constructor() {
        this.url = "https://steep-shell-shape.glitch.me/api"
        this.accessToken = "?accessToken=5b1064585f4ab8706d275f90"

       Utilities.FetchData(this.url, this.accessToken);

        const add = new NewTask(this.url, this.accessToken);
        const edit = new EditTask(this.url, this.accessToken);
        const remove = new DeleteTask(this.url, this.accessToken);
    }

    static getInstance() {
        if(!Main._instance) {
            Main._instance = new Main();
            return Main._instance;
        }
        else {
            throw "Main has already been instantiated";
        }
    }
}

(() => {
    const main = Main.getInstance();
})();