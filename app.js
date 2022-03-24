// 程式碼寫這裡
const form = document.querySelector("#searchForm")
function searchUbike() {
  const inputValue = document.querySelector("#searchKeyword").value
  const API =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  const oldList = document.querySelector(".siteList")
  oldList.remove()
  const newList = document.createElement("ul")
  newList.className = "siteList list-group"
  const main = document.querySelector(".container")
  main.insertAdjacentElement("beforeend", newList)
  async function ubikeData() {
    const rawData = await fetch(API)
    const transData = await rawData.json()
    const accList = []
    transData.forEach((x, i) => {
      let tempList = [x.sna.split("_")[1], x.tot, x.ar]
      accList[i] = tempList.join("|")
    })
    const filterResult = accList.filter(function (x) {
      return x.split(inputValue).length > 1
    })
    filterResult.forEach((x) => {
      const newLi = document.createElement("li")
      newLi.className = "list-group-item fs-5"
      const newImage = document.createElement("i")
      newImage.className = "fas fa-bicycle"
      newLi.textContent = x.split("|")[0].concat("(", x.split("|")[1], ")")
      newLi.insertAdjacentElement("afterbegin", newImage)
      const newBr = document.createElement("br")
      newLi.appendChild(newBr)
      const newSmall = document.createElement("small")
      newSmall.className = "text-muted"
      newSmall.textContent = x.split("|")[2]
      newLi.appendChild(newSmall)
      newList.insertAdjacentElement("beforeend", newLi)
    })
  }
  ubikeData()
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  searchUbike()
})
