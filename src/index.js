
document.addEventListener("DOMContentLoaded", function() {
    // function pageLoad() {
    //     console.log('page is loaded')
    // }
    // pageLoad()

    DOG_URL = 'http://localhost:3000/pups/'

    function getDogData(dogFunction){
        fetch(DOG_URL).then(function(response) {
            return response.json()
        }).then(function(json) {
            dogFunction(json)
        })
    }
    
    
    function showDogs(obj) {
        // const dogContainer = document.getElementById('dog-bar')
        for (const dog of obj) {
            showDogBar(dog)
        }
    }

    function showDogBar(obj, container=document.getElementById('dog-bar')) {
        dogSpan = document.createElement('span')
        container.append(dogSpan)
        dogSpan.innerHTML = `${obj.name}`
        dogSpan.dataset.identification = `${obj.id}`
        dogSpan.classList.add('dog-span')
    }
    
    

    function clickHub(){
        document.addEventListener("click", function(e) {
            const dogPageContainer = document.getElementById('dog-info')
            if (e.target.matches(".dog-span")) {
                const span = e.target
                span.classList.add('clicked')
                span.classList.remove('dog-span')
                const dogId = span.dataset.identification
                fetch(DOG_URL + dogId).then(function(response){
                    return response.json()
                }).then(function(json) {
                    dogPage(json)
                })
            }  else if (e.target.matches('.clicked')) {
                const dogPage = document.getElementById('dog-render-data')
                dogPageContainer.removeChild(dogPage)
                const span = e.target
                span.classList.remove('clicked')
                span.classList.add('dog-span')
            } else if (e.target.matches('.good')) {
                const button = e.target
                const dog = button.dataset.dogid
                toggleGoodness(dog, false)
            } else if (e.target.matches('.bad')) {
                const button = e.target
                const dog = button.dataset.dogid
                toggleGoodness(dog, true)
            } else if (e.target.matches("#good-dog-filter")) {
                const button = e.target
                if (button.textContent.includes('OFF')) {
                    button.removeAttribute('id')
                    button.classList.add('on')
                    button.textContent = "Filter good dogs:ON"
                    filterGoodness()
                }
            } else if (e.target.matches(".on")) {
                const button = e.target
                const dogSpanBar = document.getElementById('dog-bar')
                dogSpanBar.innerHTML = ''
                button.setAttribute('id', 'good-dog-filter')
                button.classList.remove('on')
                button.textContent = "Filter good dogs:OFF"
                getDogData(showDogs)

            }


        })
    }

   

    function dogPage(obj, container=document.getElementById('dog-info')) {
        const dogDiv = document.createElement('div')
        dogDiv.id = "dog-render-data"
        container.append(dogDiv)
        if (obj.isGoodDog === true) {
                dogDiv.innerHTML= `<img src=${obj.image}>
                             <h2>${obj.name}</h2>
                            <button class="good" data-dogid = ${obj.id}>Good Dog!</button>`
            } else if (obj.isGoodDog === false) {
                dogDiv.innerHTML= `<img src=${obj.image}>
                             <h2>${obj.name}</h2>
                            <button class="bad" data-dogid = ${obj.id}>Bad Dog!</button>`
            }
        }
        
    
    
    function toggleGoodness(id, boolValue) {
        const options = {
            "method":"PATCH",
            "headers": {
                "content-type":"application/json",
                "accept":"application/json"
            },
            "body": JSON.stringify({"isGoodDog" : boolValue}) 
        } 
        fetch(DOG_URL + id, options).then(function(response) {
            return response.json()
        }).then(function(json) {
            const button = document.querySelector(`[data-dogid="${id}"]`)

            
                if (json.isGoodDog === true) {
                    button.classList.remove('bad')
                    button.classList.add('good')
                    button.textContent = "Good Dog!"
                } else if (json.isGoodDog === false) {
                    button.classList.remove('good')
                    button.classList.add('bad')
                    button.textContent = "Bad Dog!"
                }
        })

    }
    

        function filterGoodness(){
            const dogSpanBar = document.getElementById('dog-bar')
            dogSpanBar.innerHTML = ''
            getDogData(filterJSON)
            // fetch(DOG_URL).then(function(response) {
            //     return response.json()
            // }).then(filterJSON(json))
                    
                // for (const element of json) {
                //     if (element.isGoodDog === true) {
                //         showDogBar(element)
                //     } else {
                //         console.log("did nothing")
                //     }
                // }
            
        }

        function filterJSON(obj) {
            return obj.filter(function(x) {
                if (x.isGoodDog === true) {
                    return showDogBar(x)
                }
            })
        }

        //RUNNING FUNCTIONS
        clickHub()
        getDogData(showDogs)
    
    
    
    
    
    
    
    
    
    
    





})














