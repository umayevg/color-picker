const cols = document.querySelectorAll(".col")

// Listening for Space button
document.addEventListener("keydown", event => {
  if (event.code.toLowerCase() === "space") {
    getRandomColors()
  }
})

document.addEventListener("click", event => {
  const type = event.target.dataset.type
  if (type === "lock") {
  }
})

// Function sets random color to the column
function getRandomColors() {
  cols.forEach(col => {
    const text = col.querySelector("h2")
    const color = generateRandomColor()
    col.style.background = color
    text.innerText = color
  })
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
