document.addEventListener("DOMContentLoaded", () => {

    
    const baseUrl = "http://localhost:3000/pups"

    const getPups = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(pups => renderPups(pups)) 
    }

    const renderPups = (pups) => {
        const dogBar = document.getElementById('dog-bar')
        pups.forEach(pup => {
            const createPupSpan = document.createElement('span')
            createPupSpan.innerText = `${pup.name}`
            createPupSpan.dataset.id = pup.id
            createPupSpan.classList.add('pup-span')
            dogBar.append(createPupSpan)
        });

    


    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.pup-span')){
                
            }

        })
    }

    clickHandler()
    getPups()
})