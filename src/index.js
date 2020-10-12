document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
    selectionHandler()
})

function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then( res => res.json())
    .then( pups => {
        const dogBar = document.querySelector("#dog-bar")
        for (pup of pups) {
            const dog = document.createElement("span")
            dog.textContent = pup.name
            dog.dataset.id = pup.id
            dog.dataset.pic = pup.image
            dog.dataset.isGoodDog = pup.isGoodDog

            dogBar.append(dog)
        }
    })
}

function selectionHandler() {
    const dogInfo = document.querySelector("#dog-info")
    const dogBar = document.querySelector("#dog-bar")
    dogBar.addEventListener("click", e => {
        dogInfo.innerHTML = `
        <img src=${e.target.dataset.pic}>
        <h2>${e.target.textContent}</h2>
        `
        const btn = document.createElement("button")
        if (e.target.dataset.isGoodDog) {
            btn.textContent = "Good Dog!"
        } else {
            btn.textContent = "Bad Dog!"
        }
        dogInfo.append(btn)
    })
}