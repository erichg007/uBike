// 程式碼寫這裡
//刪除前次查詢的列表
function oldListDelete() {
  const oldList = document.querySelector(".siteList")
  oldList.remove()
  const newList = document.createElement("ul")
  newList.className = "siteList list-group"
  const main = document.querySelector(".container")
  main.insertAdjacentElement("beforeend", newList)
}
//下載youbike資料，將會用到的站點、數量和地址整理成一個陣列,並建立一個新的列表將被keyword搜尋的資料填入
async function ubikeData() {
  const API =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  const rawData = await fetch(API)
  const transData = await rawData.json()
  const accList = []
  transData.forEach((x, i) => {
    let tempList = [x.sna.split("_")[1], x.tot, x.ar]
    accList[i] = tempList.join("|")
  })
  const inputValue = document.querySelector("#searchKeyword").value
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
    const newList = document.querySelector(".siteList")
    newList.insertAdjacentElement("beforeend", newLi)
  })
}

//監聽表單產生"submit"事件，即執行刪除前次列表，並載入搜尋資料
const form = document.querySelector("#searchForm")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  oldListDelete()
  ubikeData()
})
