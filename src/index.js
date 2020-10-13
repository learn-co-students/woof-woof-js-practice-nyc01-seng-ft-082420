document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
    selectionHandler()
})

function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then( res => res.json())
    .then( pups => {
        const dogBar = document.querySelector("#dog-bar")
        const dogInfo = document.querySelector("#dog-info")
        for (pup of pups) {
            renderPup(pup)
        }
    })
}

function renderPup() {
    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")
    const dog = document.createElement("span")
    dog.dataset.id = pup.id
    dog.textContent = pup.name
    dog.classList.add("dog")
    dogBar.append(dog)

    const dogDiv = document.createElement("div")
    dogDiv.classList.add("dog-div")
    dogDiv.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    `
    dogDiv.dataset.id = pup.id
    const btn = document.createElement("button")
    if (pup.isGoodDog) {
        btn.textContent = "Good Dog"
    } else {
        btn.textContent = "Bad Dog"
    }
    dogDiv.append(btn)
    dogDiv.hidden = true
    dogInfo.append(dogDiv)
}

function selectionHandler() {
    const dogInfo = document.querySelector("#dog-info")
    const dogBar = document.querySelector("#dog-bar")
    dogBar.addEventListener("click", e => {
        if (e.target.matches(".dog")) {
            const allDogs = document.querySelectorAll(".dog-div")
            
            for (dog of allDogs) {
                console.log(dog.id)
                console.log(e.target.dataset.id)
                if (dog.dataset.id === e.target.dataset.id) {
                    dog.hidden = false
                } else {
                    dog.hidden = true
                }
            }
        }
    })
}

    
