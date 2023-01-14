//Making this global to the site will ease state maintenance a bit.
let vizCards = new Set()
let invizCards = new Set()

let footer = document.getElementsByClassName("footer")[0]
footer.style.display = 'none'

let splitDivsByTag = (tagName) => {
    let cards = document.getElementsByClassName("card")
    
    for (let card of cards) {
        if (card.classList.contains(tagName)) {
            vizCards.add(card)
        } 
        else {
            card.style.display = 'none'
            invizCards.add(card)
            footer.style.display = 'block'
        }
    }
}

//Add event listeners for filters
let tagBtns = document.getElementsByClassName("tag-button")
for (let tagBtn of tagBtns) {
    tagBtn.addEventListener("click",function() {
        splitDivsByTag(tagBtn.innerHTML)
    })   
}

let clearBtn = document.getElementsByClassName("clear-tags")[0]
clearBtn.addEventListener("click", function() {
    for (let card of invizCards) {
        card.style.display = 'block'
    }
    vizCards = invizCards = new Set()
    footer.style.display = 'none'
})

let toggleMenu = () => {
    let recipeLinks = document.getElementById("recipe-links");
    if (recipeLinks.style.display === "block") {
        recipeLinks.style.display = "none"
    }
    else {
        recipeLinks.style.display = "block" 
    }
}