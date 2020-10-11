document.addEventListener('DOMContentLoaded', () => {

  const url = "http://localhost:3000/pups/"


  const clickHandler = () => {
    const dogSection = document.querySelector('#dog-bar')
    dogSection.addEventListener('click', e => {
      const clickTarget = e.target
      dogId = clickTarget.dataset.dogId
      renderDogInfo(dogId)
    })

    const dogInfoSection = document.querySelector('#dog-info')
    dogInfoSection.addEventListener('click', e => {
      const button = e.target
      const dogId = e.target.dataset.dogId
      renderButton(button,dogId)
    })



    const filterButton = document.querySelector('#good-dog-filter')
    filterButton.addEventListener('click', e=>{
      const button = e.target
      if (button.textContent == "Filter good dogs: OFF"){
        button.textContent = "Filter good dogs: ON"
        document.querySelector('#dog-bar').innerHTML = ""
        getData()
      }else if (button.textContent == "Filter good dogs: ON"){
        button.textContent = "Filter good dogs: OFF"
        document.querySelector('#dog-bar').innerHTML = ""
        onlyGoodDog()
      }
    })

  }







  const renderButton = (button,dogId) =>{
    let status = ""
    if(button.textContent == "Good Dog!"){
      button.textContent = "Bad Dog!"
      status = false
    }else if(button.textContent == "Bad Dog!"){
      button.textContent = "Good Dog!"
      status = true
    }

    options = {
      method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ isGoodDog: status })
    }

    fetch(url + dogId, options)
    .then(res => res)
  }





  const renderDogInfo = (dogId) => {
    const dogInfo = document.querySelector('#dog-info')
    fetch(url)
      .then(res => res.json())
      .then(dogs => {
        for (const dog of dogs) {
          let button = ""
          if (dog.isGoodDog) {
            button = "Good Dog!"
          } else {
            button = "Bad Dog!"
          }
          if (dog.id == dogId) {
            dogInfo.innerHTML = `
            <img src="${dog.image}">
            <h2>${dog.name}</h2>
            <button data-dog-id="${dog.id}">${button}</button>
            `
          }
        }
      })
  }





  const renderData = (dog) => {
    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.textContent = dog.name
    dogSpan.setAttribute("data-dog-id", `${dog.id}`)
    dogBar.append(dogSpan)
  }

  const getData = () => {
    fetch(url)
      .then(res => res.json())
      .then(dogs => {
        for (const dog of dogs) {
          renderData(dog)
        }
      })
  }


  const onlyGoodDog = () =>{
    fetch(url)
      .then(res => res.json())
      .then(dogs => {
        for (const dog of dogs) {
          if(dog.isGoodDog == true){
            renderData(dog)
          }
        }
      })
  }

  /*----------------- Section ----------------*/

  getData()
  clickHandler()
})
