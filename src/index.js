document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
    selectionHandler()
    buttonHandler()
})

function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then( res => res.json())
    .then( pups => {
        const dogBar = document.querySelector("#dog-bar")
        for (pup of pups) {
            const dog = document.createElement("span")
            dog.classList.add("dog")
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
        if (e.target.matches(".dog")) {
            dogInfo.innerHTML = `
            <img src=${e.target.dataset.pic}>
            <h2>${e.target.textContent}</h2>
            `
            const btn = document.createElement("button")
            btn.dataset.id = e.target.dataset.id
            btn.dataset.isGoodDog = e.target.dataset.isGoodDog
            if (e.target.dataset.isGoodDog === "true") {
                btn.textContent = "Good Dog!"
            } else {
                btn.textContent = "Bad Dog!"
            }
            dogInfo.append(btn)
            
        }
    })
}

function buttonHandler() {
    const btn = document.querySelector("#dog-summary-container")
    btn.addEventListener("click", e => {
        console.log(e.target.dataset.isGoodDog)
        if (e.target.matches("button")) {
        let patch;
        console.log(e.target.dataset.id)
        if (e.target.dataset.isGoodDog === "true") {
            patch = {
                isGoodDog: "false"
            }
        } else {
            patch = {
                isGoodDog: "true"
            }
        }
        console.log(patch)
        const configObj = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(patch)
        }
        fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, configObj)
        .then( res => res.json() )
        .then( obj => {
            console.log(obj)
            if (obj.isGoodDog === "true") {
                e.target.dataset = "true"
                textContent = "Good Dog!"
            } else {
                e.target.dataset = "false"
                e.target.textContent = "Bad Dog!"
            }
            console.log(e.target.dataset.isGoodDog)
        })
    }
        
    })
    
    
    
}