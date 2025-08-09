let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn = document.getElementById("searchButton");
let input = document.getElementById("searchInput");

btn.addEventListener("click", async () => {
    let word = input.value.trim();
    if (!word) {
        alert("Please enter a word!");
        return;
    }

    let defArr = await searchWord(word);
    if (defArr) {
        displayData(defArr, word);
    }
    input.value = "";
});

async function searchWord(word) {
    try {
        let response = await axios.get(url + word);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Word not found! Please try again.");
        return null;
    }
}

function displayData(defArr, word) {
    let ul = document.querySelector("#def");
    let pofs = document.querySelector("#partsofspeech");
    let wordTitle = document.querySelector("#wordTitle");
    let resultDiv = document.querySelector("#result");

    resultDiv.classList.remove("d-none");

    wordTitle.textContent = word;
    pofs.textContent = defArr[0].meanings[0].partOfSpeech;

    ul.innerHTML = "";

    defArr[0].meanings[0].definitions.forEach((def, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${index + 1}.</strong> ${def.definition}`;
        ul.appendChild(li);
    });
}
