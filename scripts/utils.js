class Utilities {
    constructor() {

    }

    static FetchData(url, access) {
        fetch(`${url}/lists${access}`, {method: "GET"})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(responseAsJson => {
            console.log('All Data Fetched:', responseAsJson);
            for (let i = 0; i < responseAsJson.length; i++) {
                const section = document.createElement("section");
                section.setAttribute("id", `${responseAsJson[i].id}`);
                section.innerHTML = `<h2>${responseAsJson[i].title}</h2>`;

                if(document.body.contains(document.querySelector(`section:nth-of-type(${i+1})`))) {
                    document.querySelector(`section:nth-of-type(${i+1})`).replaceWith(section);
                }
                else {
                    document.querySelector("main").appendChild(section);
                }

                for (let j = 0; j < responseAsJson[i].items.length; j++) {
                    const template = document.querySelector("#articleTemplate");
                    const clone = document.importNode(template.content, true);
                    clone.querySelector("article").setAttribute("id", responseAsJson[i].items[j].id);
                    clone.querySelector("h3").innerHTML = responseAsJson[i].items[j].title;
                    clone.querySelector("p").innerHTML = responseAsJson[i].items[j].description;
                    clone.querySelector("time").innerHTML = responseAsJson[i].items[j].dueDate;
                    document.querySelector(`section:nth-of-type(${i+1})`).appendChild(clone);
                } 
            }
        })
        .then(() => {
            const edit = new EditTask(url, access);
            const remove = new DeleteTask(url, access);
        })
        .catch((error) => {
            console.error('Error Fetching Data:', error);
        });
    }

    static createForm() {
        document.querySelectorAll("section").forEach(e => {
            const option = document.createElement("option");
            option.value = e.getAttribute("id");
            option.text = e.firstChild.textContent;
            document.querySelector("select").appendChild(option);
        });

        document.querySelector("#container").style.filter= "blur(10px)";
        document.querySelector("form").style.display= "block";
    }
}