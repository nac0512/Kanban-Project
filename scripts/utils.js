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
            console.log('Success:', responseAsJson);
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
                    const article = document.createElement("article");
                    article.setAttribute("id", `${responseAsJson[i].items[j].id}`);
                    article.setAttribute("listID", `${responseAsJson[i].items[j].listId}`);
                    article.innerHTML = `<h3>${responseAsJson[i].items[j].title}</h3><p>${responseAsJson[i].items[j].description}</p><time>${responseAsJson[i].items[j].dueDate}</time><div class="edits"><button class="icon-edit">Edit</button><button class="icon-delete">Delete</button></div>`;
                    document.querySelector(`section:nth-of-type(${i+1})`).appendChild(article);
                } 
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}