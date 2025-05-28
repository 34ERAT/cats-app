import axios from "axios";

const getFactsBtn = document.getElementById("getFactsBtn");
const getPicsBtn = document.getElementById("getpicsBtn");
const factsNum = document.getElementById("factsNum");
const picsNum = document.getElementById("picsNum");
const resultbox = document.getElementById("resultbox");
const spinnner = document.getElementById("spinnner");

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
function startSpin() {
  resultbox.innerHTML = `<div id="spinnner" class="spinner"></div>`;
}
function stopSpin() {
  resultbox.innerHTML = "";
}

getFactsBtn.addEventListener("click", async (e) => {
  startSpin();
  let num = factsNum.value;
  if (num === "") {
    resultbox.innerHTML = "<h2>can not be empty</h2>";
    return;
  }
  getFactsBtn.setAttribute("disabled", true);
  try {
    const list = document.createElement("ol");
    list.classList.add("result-list");
    const { data } = await getFacts(num);

    data.forEach((element) => {
      console.log(element);
      const listitem = document.createElement("li");
      listitem.innerText = element;
      list.append(listitem);
    });
    stopSpin();
    resultbox.appendChild(list);
  } catch (error) {
    resultbox.innerHTML = "<h2>something went wrong</h2>";
  } finally {
    getFactsBtn.removeAttribute("disabled");
  }
});

getPicsBtn.addEventListener("click", async (e) => {
  startSpin();
  let num = picsNum.value;
  if (num === "") {
    resultbox.innerText = "con not be empty";
  }
  getPicsBtn.setAttribute("disabled", true);
  try {
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
    stopSpin();
    resultbox.appendChild(div);
  } catch (error) {
    resultbox.innerHTML = "<h2>something went wrong</h2>";
  } finally {
    getPicsBtn.removeAttribute("disabled");
  }
});
