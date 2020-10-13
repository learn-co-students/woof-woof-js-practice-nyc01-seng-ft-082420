document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
    selectionHandler()
    toggleButton()
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
    dogDiv.dataset.isGoodDog = pup.isGoodDog
    dogDiv.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    `
    dogDiv.dataset.id = pup.id
    const btn = document.createElement("button")
    if (pup.isGoodDog === "true") {
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
                if (dog.dataset.id === e.target.dataset.id) {
                    dog.hidden = false
                } else {
                    dog.hidden = true
                }
            }
        }
    })
}

    
function toggleButton() {
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.addEventListener("click", e => {
        if (e.target.matches("button")) {
            const dogId = e.target.parentElement.dataset.id
            let patch
            if (e.target.parentElement.dataset.isGoodDog === "true") {
                patch = "false"
            } else {
                patch = "true"
            }
            console.log(e.target.parentElement.dataset.isGoodDog)
            console.log(patch)
            const configObj = {
                method : "PATCH",
                headers : {
                    "content-type" : "application/json",
                    accept : "application/json"
                },
                body : JSON.stringify({
                    isGoodDog : patch
                })
            }
            fetch(`http://localhost:3000/pups/${dogId}`, configObj)
            .then(res => res.json())
            .then(obj => {
                if (patch === "true") {
                    e.target.textContent = "Good Dog"
                    e.target.parentElement.dataset.isGoodDog = "true"
                } else {
                    e.target.textContent = "Bad Dog"
                    e.target.parentElement.dataset.isGoodDog = "false"
                }
            })
        }
    })
}