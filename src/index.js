
document.addEventListener('DOMContentLoaded', () => {

  const baseUrl = 'http://localhost:3000/pups/'
  let filterOn = false

  const getDogs = () => {
    if(filterOn) {
      fetch(baseUrl)
      .then(response => response.json())
      .then(dogs => {
        dogs.filter( dog => dog.isGoodDog ).forEach(renderDogSpan)
      })
    } else {
      fetch(baseUrl)
      .then(response => response.json())
      .then(dogs => {
        for(const dog of dogs) {
          renderDogSpan(dog)
        }
      })
    }
  }

  const renderDogSpan = dogObj => {
    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')

    dogSpan.textContent = dogObj.name
    dogSpan.dataset.dogId = dogObj.id
    dogBar.append(dogSpan)
  }


  const getDogDetail = dogId => {
    fetch(baseUrl + dogId)
      .then(response => response.json())
      .then(dog => renderDogDetail(dog))
  }

  const dogClickListener = () => {
    document.addEventListener('click', e => {
      const dogBar = document.querySelector('#dog-bar')
      if(e.target.dataset.dogId) {
        const dogSpan = e.target
        const dogId = dogSpan.dataset.dogId

        getDogDetail(dogId)
      } else if(e.target.id === 'good-dog') {
        const dogId = e.target.parentElement.dataset.dogId

        dogBar.innerHTML = ''
        isGoodDog(dogId, 'good')
        getDogs()
      } else if(e.target.id === 'bad-dog') {
        const dogId = e.target.parentElement.dataset.dogId

        dogBar.innerHTML = ''
        isGoodDog(dogId, 'bad')
        getDogs()
      } else if(e.target.textContent === 'Filter good dogs: OFF') {
        const filterBtn = document.querySelector('#good-dog-filter')

        dogBar.innerHTML = ''
        filterOn = true
        filterBtn.textContent = "Filter good dogs: ON"

        getDogs()
      } else if(e.target.textContent === 'Filter good dogs: ON') {
        const filterBtn = document.querySelector('#good-dog-filter')
        

        dogBar.innerHTML = ''
        filterOn = false
        filterBtn.textContent = "Filter good dogs: OFF"
        getDogs()
      }
    })
  }

  const renderDogDetail = dogObj => {
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.dataset.dogId = dogObj.id
    dogInfo.innerHTML = `
    <img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>
    <button id='good-dog'>Good Dog!</button>
    `
    if(!dogObj.isGoodDog) {
      const isGoodDogBtn = dogInfo.querySelector('button')
      isGoodDogBtn.textContent = 'Bad Dog!'
      isGoodDogBtn.id = 'bad-dog'
    }
  }

  const isGoodDog = (dogId, goodOrBad) => {
    // checking current state of isGoodDog and then flipping it to pass into our PATCH request
    let isGoodDog = goodOrBad === 'good' ? false : true

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({isGoodDog: isGoodDog})
    }

    fetch(baseUrl + dogId, options)
      .then(response => response.json())
      .then(dog => renderDogDetail(dog))
  }

  getDogs()
  dogClickListener()
})