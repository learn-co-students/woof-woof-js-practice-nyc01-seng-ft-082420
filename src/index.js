document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "http://localhost:3000/pups"

    const dogBar = document.querySelector("#dog-bar")

    const renderDogBar = dogs => {
        for(const dog of dogs){
            const dogSpan = document.createElement('span')
            dogSpan.dataset.dogId = dog.id
            dogBar.appendChild(dogSpan)
            dogSpan.innerText = `${dog.name}`
        }
    }

    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => {
            renderDogBar(dogs)
        })
    }

    const showDog = dog => {
        const dogInfo = document.querySelector("#dog-info")
        dogInfo.innerHTML = `<img src=${dog.image}>
        <h2>${dog.name}</h2>
        `
        const dogButton = document.createElement("button")
        dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
        dogButton.dataset.id = dog.id
        
    
        dogInfo.append(dogButton)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            const dogSpan = dogBar.querySelectorAll('span')
            if(e.target = dogSpan){
                let dogId = e.target.dataset.dogId
                showDog(getSingleDog(dogId))

            }
        })
    }

    const getSingleDog = (dogId) => {
        return fetch(baseUrl + `/${dogId}`)
            .then(r => r.json() )
            .then(dog => {
                showDog(dog)
        })
    }




    getDogs()
    clickHandler()
})