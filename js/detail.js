let data = []
let currentDate = "";

const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"

async function detailsCard() {

  try {
      const response = await fetch(API_URL);
      const eventsToCatch = await response.json();

      for (const event of eventsToCatch.events) {
          data.push(event)
      }

let query = location.search
let params = new URLSearchParams(query)
let idParams = params.get("id")

let details = data.find(info => info._id == idParams)

console.log(details)
console.log(data)
console.log(idParams)

let container = document.getElementById("container-detail")

container.innerHTML += `
          <div class="row row-cols-2">
          <div class="col-6">
            <img src="${data[idParams-1].image}" class="img-fluid container-sm" >
          </div>
          <div class="col-lg-6">
            <h1>${data[idParams-1].name}</h1>
            <h3>${data[idParams-1].category}</h3>
            <p> ${data[idParams-1].description}</p>
            <p> <span class="text-muted">Price: ${data[idParams-1].price}.</span></p>
            <p> <span class="text-muted">Capacity: ${data[idParams-1].capacity}.</span></p>
            <p> <span class="text-muted">Place: ${data[idParams-1].place}.</span></p>   
         </div>
        </div>
`
} catch (error) {
  console.log(error)
}
}
detailsCard()