const ALL_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

fetch(ALL_BREEDS_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const breedsArray = Object.keys(data.message);
        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i];
            select.appendChild(option);
        }
    })

select.addEventListener("change", function (event) {
    let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    fetchDogs(url);
})

function fetchDogs(url) {
    spinner.classList.add("show");
    img.classList.remove("show")
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            img.src = data.message;
        })
}

img.addEventListener("load", () => {
    spinner.classList.remove("show");
    img.classList.add("show");
})