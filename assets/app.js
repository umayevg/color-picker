const cols = document.querySelectorAll(".col")

// Listening for Space button
document.addEventListener("keydown", event => {
  event.preventDefault()
  if (event.code.toLowerCase() === "space") {
    getRandomColors()
  }
})

document.addEventListener("click", event => {
  const type = event.target.dataset.type
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0]

    node.classList.toggle("fa-lock-open")
    node.classList.toggle("fa-lock")
  } else if (type === "copy") {
    event.target.parentElement.querySelector(
        ".tooltiptext"
      ).style.visibility = "visible"
    setTimeout(() => {
      event.target.parentElement.querySelector(
        ".tooltiptext"
      ).style.visibility = "hidden"
    }, 2000)
    copyToClipboard(event.target.textContent)
  }
})

// Function sets random color to the column
function getRandomColors() {
  cols.forEach(col => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock")
    const text = col.querySelector("h3")
    const color = generateRandomColor()

    if (isLocked) {
      return
    }
    col.style.background = color
    text.innerText = color
  })
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

// Genrates random color
function generateRandomColor() {
  // rgb
  // #0000FF
  // 0 -> F

  const hexCodes = "0123456789ABCDEF"
  let color = ""
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }

  return "#" + color
}

getRandomColors()
