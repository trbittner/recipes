//Populate the recipe list on load
let recipeList = []
const domRecipeList = document.getElementsByClassName("recipe-name")

for (const li of domRecipeList) {
    recipeList.push(li.id)
}

console.log(recipeList)

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

let clearTags = () => {
    for (let card of invizCards) {
        card.style.display = 'block'
    }
    vizCards = invizCards = new Set()
    footer.style.display = 'none'    
}

//Add event listeners for filters
let tagBtns = document.getElementsByClassName("tag-button")
for (let tagBtn of tagBtns) {
    tagBtn.addEventListener("click",function() {
        splitDivsByTag(tagBtn.innerHTML)
    })   
}

let clearBtn = document.getElementsByClassName("clear-tags")[0]
clearBtn.addEventListener("click", function() {clearTags()})

let toggleMenu = () => {
    let recipeLinks = document.getElementById("recipe-links");
    if (recipeLinks.style.display === "block") {
        recipeLinks.style.display = "none"
    }
    else {
        recipeLinks.style.display = "block" 
    }
}

let selectMenuItem = (tagName) => {
    clearTags()
    splitDivsByTag(tagName)
    toggleMenu()
}

let autocompleteMatch = (input) => {
    if (input === '') {
        return []
    }
    
    let reg = RegExp(input)
    return recipe_list.filter(function(term) {
        if (term.match(reg)) {
            return term
        }
    })
}

let showRecipes = (val) => {
    result = document.getElementById("result")
    
    result.innerHTML = ''
    let list = ''
    let terms = autocompleteMatch(val)
    console.log(terms)
}
