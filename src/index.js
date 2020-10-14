document.addEventListener('DOMContentLoaded', e => {
  const baseUrl = 'http://localhost:3000/pups/'
  const dogBar = document.getElementById('dog-bar')

  const getDogs = url => {
    fetch(url)
    .then(response => response.json())
    .then(dogsObject => {
      for (dog of dogsObject){
        const spaniel = document.createElement('span')
        spaniel.textContent = dog.name
        spaniel.dataset.dogId = dog.id
        dogBar.append(spaniel)
      }
    })
  }

  const createDogDiv = (image, name, status) => {
    const container = document.getElementById('dog-summary-container')
    container.innerHTML = ""
    const dogDiv = document.createElement('div')

    dogDiv.innerHTML = `
      <img src = ${image} width="500" height="600">
      <h2> ${name} </h2>
      <button data-good-dog = ${status}> Good Dog </button>
    `
    container.append(dogDiv)

  }

  const renderDog = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('[data-dog-id]')) {
        const dogId = e.target.dataset.dogId
        fetch(baseUrl + dogId)
        .then(response => response.json())
        .then(dogData => {
          createDogDiv(dogData.image, dogData.name, dogData.isGoodDog)
        })
      } else if (e.target.matches('[data-good-dog]')) {
          if (e.target.textContent === 'Good Dog') {e.target.textContent = 'Bad Dog'}
          else {e.target.textContent = 'Good Dog'}
      }
    })
  }





  getDogs('http://localhost:3000/pups')
  renderDog()
})
