const cols = document.querySelectorAll(".col")

// Listening for Space button
document.addEventListener("keydown", event => {
    event.preventDefault()
    console.log(event.target)
    if (event.code.toLowerCase() === "space" || event.target.classList.contains('random-colors-button')) {
        getRandomColors()
    }
})

document.addEventListener("click", event => {
    event.preventDefault()
    const classes = event.target.classList
    if (classes.contains('random-colors-button') || classes.contains('fa-rotate-right')) {
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

        // Switching lock icons
        node.classList.toggle("fa-lock-open")
        node.classList.toggle("fa-lock")
    } else if (type === "copy") {
        // Tooltip show
        event.target.parentElement.querySelector(".tooltiptext").style.visibility =
            "visible"

        // Tooltip hidden
        setTimeout(() => {
            event.target.parentElement.querySelector(
                ".tooltiptext"
            ).style.visibility = "hidden"
        }, 1500)

        // Copying to clipboard
        copyToClipboard(event.target.textContent)
    }
})

// Function sets random color to the column
function getRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromUrlHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock")
        const text = col.querySelector("h3")

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColor()
            : generateRandomColor()


        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color
    })

    updateColorsCodesInUrlHash(colors)
}


// This function copies color code to clipboard
function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
}

// Generates random color
function generateRandomColor() {
    // rgb
    // #0000FF
    // 0 -> F

    const hexCodes = "0123456789ABCDEF"
    let color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return `#${color}`
}


function updateColorsCodesInUrlHash(colors = []) {
    document.location.hash = colors
        .map(color => color.toString().substring(1))
        .join('-')
}

function getColorsFromUrlHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }

    return []
}

getRandomColors(true)
