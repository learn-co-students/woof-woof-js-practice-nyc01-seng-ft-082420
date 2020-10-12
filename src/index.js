document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()
})

function fetchDogs() {
    fetch('http://localhost:3000/pups')
    .then( res => res.json())
    .then( pups => {
        const dogBar = document.querySelector("#dog-bar")
        for (pup of pups) {
            const dog = document.createElement("span")
            dog.textContent = pup.name
            dogBar.append(dog)
        }
    })
}