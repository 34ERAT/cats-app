import axios from "axios";

const getFactsBtn = document.getElementById("getFactsBtn");
const getPicsBtn = document.getElementById("getpicsBtn");
const factsNum = document.getElementById("factsNum");
const picsNum = document.getElementById("picsNum");
const resultbox = document.getElementById("resultbox");

async function getFacts(num) {
  const response = await axios.get(
    `https://meowfacts.herokuapp.com/?count=${num}`,
  );
  return response.data;
}

async function getImages(num) {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/search?limit=${num}`,
  );
  return response.data;
}

getFactsBtn.addEventListener("click", async (e) => {
  resultbox.innerHTML = "";
  let num = factsNum.value;
  if (num === "") {
    resultbox.innerText = "can not be empty";
    return;
  }
  getFactsBtn.innerText = " wait";
  const list = document.createElement("ol");
  list.classList.add("result-list");
  const { data } = await getFacts(num);

  data.forEach((element) => {
    console.log(element);
    const listitem = document.createElement("li");
    listitem.innerText = element;
    list.append(listitem);
  });
  resultbox.appendChild(list);
  getFactsBtn.innerText = " submit";
});

getPicsBtn.addEventListener("click", async (e) => {
  resultbox.innerHTML = "";
  let num = picsNum.value;
  if (num === "") {
    resultbox.innerText = "con not be empty";
  }
  getPicsBtn.innerText = "wait";
  const data = await getImages(num);
  const div = document.createElement("div");
  div.classList.add("result-image-list");
  data.forEach((element) => {
    let imagecontainer = document.createElement("div");
    imagecontainer.classList.add("result-image-list-containter");
    let image = document.createElement("img");
    console.log(element);
    image.setAttribute("src", element.url);
    imagecontainer.append(image);
    div.append(imagecontainer);
  });

  resultbox.appendChild(div);
  getPicsBtn.innerText = "submit";
});
