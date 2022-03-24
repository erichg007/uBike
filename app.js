// 程式碼寫這裡
//刪除前次查詢的列表函數
function queryResultClear() {
  const oldList = document.querySelector(".siteList")
  oldList.remove()
  const newList = document.createElement("ul")
  newList.className = "siteList list-group"
  const main = document.querySelector(".container")
  main.insertAdjacentElement("beforeend", newList)
}
//建立DOM函數
function domCreation(tag, tagName, tagcontent) {
  const object = document.createElement(tag)
  object.className = tagName
  object.textContent = tagcontent
  return object
}
//搜尋結果載入函數
function loadQueryResult(filterResult) {
  const newLi = domCreation(
    "li",
    "list-group-item fs-5",
    filterResult.split("|")[0].concat("(", filterResult.split("|")[1], ")")
  )
  const newImage = domCreation("i", "fas fa-bicycle")
  newLi.insertAdjacentElement("afterbegin", newImage)
  const newBr = document.createElement("br")
  newLi.appendChild(newBr)
  const newSmall = domCreation(
    "small",
    "text-muted",
    filterResult.split("|")[2]
  )
  newLi.appendChild(newSmall)
  const newList = document.querySelector(".siteList")
  newList.insertAdjacentElement("beforeend", newLi)
}

//下載youbike資料，將會用到的站點、數量和地址整理成一個陣列,並建立一個新的列表將被keyword搜尋的資料填入
async function ubikeData(API, inputValue) {
  const rawData = await fetch(API)
  const transDataSet = await rawData.json()
  const accList = []
  transDataSet.forEach((transData, i) => {
    accList[i] = [
      transData.sna.split("_")[1],
      transData.tot,
      transData.ar,
    ].join("|")
  })

  const filterResults = accList.filter(function (filterResult) {
    return filterResult.split(inputValue).length > 1
  })
  filterResults.forEach((filterResult) => {
    loadQueryResult(filterResult)
  })
}

//監聽表單產生"submit"事件，即執行刪除前次列表，並載入搜尋資料
const form = document.querySelector("#searchForm")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  queryResultClear()
  const API =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  const inputValue = document.querySelector("#searchKeyword").value
  ubikeData(API, inputValue)
})
