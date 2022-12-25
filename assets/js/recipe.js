//Making this global to the site will ease state maintenance a bit.
let vizCards = new Set()
let invizCards = new Set()

let hasInvizCards = false

let splitDivsByTag = (tagName) => {
    let cards = document.getElementsByClassName("card")
    
    for (let card of cards) {
        if (card.classList.contains(tagName)) {
            vizCards.add(card)
        } 
        else {
            card.style.display = 'none'
            invizCards.add(card)
        }
    }
    
    if (invizCards.length !== 0) {
        hasInvizCards = true
    }
    else {
        hasInvizCards = false
    }
    
    console.log(vizCards)
    console.log(invizCards)
}

//Add event listeners for filters
let tagBtns = document.getElementsByClassName("tag-button")
for (let tagBtn of tagBtns) {
    tagBtn.addEventListener("click",function() {
        splitDivsByTag(tagBtn.innerHTML)
    })   
}

let clearBtn = document.getElementsByClassName("clear-tags")
clearBtn.addEventListener("click", function() {
    for (let card of invizCards) {
        card.style.display = 'block'
    }
    vizCards = invizCards = new Set()
    hasInvizCards = false
})

//element.style.visibility = 'hidden'
//element.style.visibility = 'visible'

// The above doesn't remove the element from the flow.
//element.style.display='none'
