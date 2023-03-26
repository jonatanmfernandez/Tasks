let data = []
let currentDate = "";
let events = [];

const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
  
async function getEvents() {

  try {
    const response = await fetch(API_URL);
    const dataEvents = await response.json();

    for (const event of dataEvents.events) {
      data.push(event)
    }
    events = dataEvents.events;
    currentDate = dataEvents.currentDate;
    events = events.filter(event => event.date >= currentDate);


    let mapEvents = data.map(list => list.category);
    const dataA = new Set(mapEvents);
    let dataArrayFiltrado = [...dataA];

    Cards(events)
    printChecks('#table_checks', dataArrayFiltrado)
    
  }
  catch (error) {
    console.log(error.message)
  }
}

getEvents()


// function Allevents (data) {
// for (let i = 0; i < data.length; i++){
//   if (data[i].date >= FechaLimite) {
//     UpcomingEvents.push(data[i]);
//     } else {
//       PastEvent.push(data[i]);
//     }
//   }
// }

// Allevents(data);

// console.log(PastEvent);
// console.log(UpcomingEvents);


function Cards (data) {
  let NormalCard = ``
  let NewCard = document.getElementById("div-cardsupcoming")
  for (let i = 0; i < data.length; i++) {
    NormalCard +=` <div class="d-flex justify-content-center flex-wrap text-center">
       <div class="card m-2 shadow" style="width: 18rem">
        <img src= "${data[i].image}" class="card-img-top" alt="..." height="150">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].description}</p>
        </div>
        <div class="card-footer border-0">
        <p class="card-text"> Date ${data[i].date}</p>
        <p class="card-text"> Place: ${data[i].place}</p>
        <div class="d-flex justify-content-between"> <p> Price $ ${data[i].price}</p>
            <a href="./detail.html?id=${data[i]._id}" class="btn">See more...</a>
          </div>
        </div>
      </div>
    </div>`
  }
  NewCard.innerHTML = NormalCard; 
}

Cards (UpcomingEvents);

// let mapEvents = data.map(lista => lista.category);
// const dataA = new Set(mapEvents);
// let dataArrayFiltrado = [...dataA];


function printChecks(id_etiqueta, array_tipe) {
  let container = document.querySelector(id_etiqueta)
  array_tipe = array_tipe.map(each => {
    return `
    <div class="d-flex p-3 ms-5 gap-5"> 
    <fieldset>
    <input onclick="captureData()" class="form-check-input class_checks"  type="checkbox" id="${each}" role="switch" value="${each}">
    <label class="form-check-label" for="${each}">${each}</label>
    </fieldset>
    </div>
    `
  })

  array_tipe.push(`<div class="container-fluid justify-content-end">
    <input  oninput="captureData()" id="id_search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
   </div>
  `)
  container.innerHTML = array_tipe.join('')
}


printChecks('#table_checks', dataArrayFiltrado)


function captureData() {
  let text = document.getElementById('id_search').value.toLowerCase()
  let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value)
  let filter = events.filter(each => {
    return (
      each.name.toLowerCase().includes(text)
    ) && (
        (checks.length === 0 || checks.includes(each.category))
      )
  })
  if (filter.length > 0) {
    Cards(filter)
  }
  else {
    notFound()

  }
}

function notFound() {
  let notFoundCard = document.getElementById("div-cardsupcoming")
  notFoundCard.innerHTML = `
                    <div class="d-flex justify-content-center flex-wrap text-center">
                    <div class="card m-2 shadow" style="width: 30rem">
                    <div class="card-body ">
                      <h5 class="card-title"> Event not Found</h5>
                      <p class="card-text">Please try again</p>                
                  </div>                  
              </div>
          </div>
        `
}