let container = document.createElement("div");
container.className = "container";
let row = document.createElement("div");
row.className = "row";
container.appendChild(row);
let box = document.createElement("div");
box.classList.add("box", "col-md-6", "col-sm-6");
row.appendChild(box);
document.body.appendChild(container);
let input = document.createElement("input");
input.setAttribute("id", "input");
input.setAttribute("placeholder", "Enter the word");
let search = document.createElement("button");
search.classList.add("search", "btn", "btn-primary");
search.innerHTML = "Search ";
search.addEventListener("click", dic);
let si = document.createElement("i");
si.classList.add("fa", "fa-search");
search.appendChild(si);
let dis = document.createElement("div");
dis.className = "dis";
let mic = document.createElement("button");
mic.classList.add("mic", "btn", "btn-primary");
mic.innerHTML = "Pronounce ";
mic.addEventListener("click", sound);
let au = document.createElement("i");
au.classList.add("fa", "fa-volume-up");
mic.appendChild(au);
let h1 = document.createElement("h1");
h1.innerHTML = "Dictionary";
h1.className = "h1";
let btncon = document.createElement("div");
btncon.append(search, mic);
box.append(h1, input, btncon, dis);

async function dic() {
  dis.style.display = "none";
  try {
    let word = document.getElementById("input").value;
    if (word) {
      let api = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      let res = await api.json();
      let syn = res[0].meanings[0].definitions[0].definition;
      dis.innerHTML = `<b>Definition</b>:  ${syn}<br><br>`;
      dis.style.display = "block";
    }
  } catch (err) {
    dis.innerHTML = "Please Enter a valid word";
    let wordone = document.getElementById("input");
    wordone.value = "";
    dis.style.display = "block";
    console.log(err);
  }
}

async function sound() {
  try {
    let word = document.getElementById("input").value;
    let api = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let res = await api.json();
    let audio = document.createElement("audio");
    audio.src = `${res[0].phonetics[0].audio}`;
    audio.type = "audio/mp3";
    audio.play();
  } catch {
    dis.innerHTML = "Please Enter a valid word";
  }
}
