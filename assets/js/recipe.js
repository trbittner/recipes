/*********************************************/
/* Populate the existing recipe list on load */
/*********************************************/
let recipeList = []
const domRecipeList = document.getElementsByClassName("recipe-name")

for (const li of domRecipeList) {
    recipeList.push(li.id)
}


/****************************/
/* Add filter functionality */
/****************************/
//Making this global to the site will ease state maintenance a bit.
let vizCards = new Set()
let invizCards = new Set()

let footer = document.getElementsByClassName("footer")[0]
footer.style.display = 'none'

let splitCardsByTag = (tagName) => {
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

let splitCardsById = (id) => {
    let cards = document.getElementsByClassName("card")
    
    for (let card of cards) {
        if (card.id === id) {
            vizCards.add(card)
        }
        else {
            card.style.display = 'none'
            invizCards.add(card)
            footer.style.display = 'block'
        }
    }
}

let clearFilters = () => {
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
        splitCaBrdsyTag(tagBtn.innerHTML)
    })   
}

let clearBtn = document.getElementsByClassName("clear-tags")[0]
clearBtn.addEventListener("click", function() {clearFilters()})

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
    clearFilters()
    splitCaBrdsyTag(tagName)
    toggleMenu()
}


/****************************/
/* Add search functionality */
/****************************/
let autocompleteMatch = (input) => {
    let result = document.getElementById("search-results")
    if (input === '') {
        result.style.display = 'none'
        return []
    }
    
    result.style.display="block"
    
    // "i" means ignore case here.
    let reg = RegExp(input,"i")
    return recipeList.filter(function(term) {
        if (term.match(reg)) {
            return term
        }
    })
}

let showRecipes = (val) => {
    let result = document.getElementById("search-results")
    
    result.innerHTML = ''
    let list = ''
    let terms = autocompleteMatch(val)
    for (let i=0; i < terms.length; i++) {
        list += '<li>' + terms[i] + '</li>'
    }

    result.innerHTML = '<ul id="search-result-lists">' + list + '</ul>'
    
    document.getElementById("search-result-lists").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "LI") {
            clearFilters()
            splitCardsById(e.target.innerHTML)
            let searchField = document.getElementById("search-field")
            searchField.value = ''
            result.style.display = 'none'
        }
    })
}
