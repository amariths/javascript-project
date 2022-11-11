

//table lista
let tabledata = document.querySelector("#table_body")

//länk till produkter
let url = 'https://fakestoreapi.com/products/'

//knappen till sök kategori
let button = document.querySelector(".btn btn-primary")

// kategori select
let selectElement = document.querySelector('#Select')

//länk för städer
let url2 = 'https://avancera.app/cities/'

//skriva staden i input för att lägga till
let addcity = document.querySelector("#addcity")

//skriva inevånare i andra input för attt lägga till
let addpopulation = document.querySelector("#addpopulation")

// välja id till det man vill ändra 
let IDselect = document.querySelector("#idselect")

// skriv nya stadens namn i put
let putcity = document.querySelector("#putcity")

//skriv nya inevånare i put
let putpopulation = document.querySelector("#putpopulation")


// första forms variabler för att lagra data och hälsa på användaren
const firstname = document.querySelector("#FirstName")
const lastname = document.querySelector("#LastName")
const btn = document.querySelector("#btn")
const form2 = document.querySelector("#divform2")


// inte ladda om hemsidan
form2.addEventListener('submit', E)



//lagra nya namn om man klickar på knappen
btn.addEventListener("click", () => {

    localStorage.setItem("firstname", firstname.value)
    localStorage.setItem("lastname", lastname.value)
    

    let element = document.querySelector("h1")

    element.innerHTML = "Välkommen " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname") + "!"

      
})

// lagt till en till av element variabel och innerhtml så att datan hälsar på användaren även om man lämnar hemsidan och kommer tillbaka
let element = document.querySelector("h1")

element.innerHTML = "Välkommen " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname") + "!"







function E (event) {
    event.preventDefault()
}

// inte ladda om hemsidan när man söker kategori
form.addEventListener('submit', E)


//console log till det kategori man väljer
selectElement.addEventListener("input", (e) => {
    let value = e.target.value
    console.log(value)
})





// funktionen att visa alla produkter när sidan laddas som default
function defaultload() {
fetch(url)

.then(response => response.json())

.then((data) => {
  console.log(data);

  data.forEach((shop) => {
    tabledata.innerHTML += `
    <tr>
    <td>${shop.title}</td>
    <td>${shop.description}</td>
    <td>${shop.price}</td>
    <td><img src="${shop.image}"/></td>
  </tr>
    `    
  });

});
}




//när man klickar på knappen till det kategori man valde så aktiverar funktionen
function product() {
    tabledata.innerHTML = ""
    let selectElement = document.querySelector('#Select')
    let kategori = selectElement.value;
    let dataUrl = 'https://fakestoreapi.com/products/category/' + kategori;




fetch(dataUrl)

.then(response => response.json())

.then((data) => {
  console.log(data);

  data.forEach((shop) => {
    tabledata.innerHTML += `
    <tr>
    <td>${shop.title}</td>
    <td>${shop.description}</td>
    <td>${shop.price}</td>
    <td><img src="${shop.image}"/></td>
  </tr>
    `    

  });

});

}

// ladda om hemsidan om man vill söka för nytt
function refresh() {
    location.reload()
}


//visa alla städer när sidan laddas
function defaultload2() {
    fetch('https://avancera.app/cities')
    
    .then(response => response.json())
    
    .then((data) => {
      console.log(data);
    
      data.forEach((shop) => {
        IDselect.innerHTML += `
        <option>${shop.id}</option>
        `
        selectElement.innerHTML += `
        <option>${shop.id}</option>
        `
        tabledata.innerHTML += `
        <tr>
        <td>${shop.id}</td>
        <td>${shop.name}</td>
        <td>${shop.population}</td>
      </tr>
        `    
      });
    
    });
    }






    //lägga till stad funktionen
function citiespost() {
    tabledata.innerHTML = ""


fetch('https://avancera.app/cities/', {
    body: '{ "name":"' + addcity.value + '",   "population":' + Number(addpopulation.value) + ' }',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

.then(response => response.json())

.then((data) => {
  console.log(data);

  data.forEach((shop) => {
    IDselect.innerHTML += `
        <option>${shop.id}</option>
        `
    selectElement.innerHTML += `
    <option>${shop.id}</option>
    `
    tabledata.innerHTML += `
    <tr>
    <td>${shop.id}</td>
    <td>${shop.name}</td>
    <td>${shop.population}</td>
  </tr>
    `    
  });

});


}





//funktionen att ändra staden

function citiesput() {
    tabledata = ""
    let IDselect = document.querySelector("#idselect")
    let putcity = document.querySelector("#putcity")
    let putpopulation = document.querySelector("#putpopulation")

    

fetch('https://avancera.app/cities/' + IDselect.value, {
    body: JSON.stringify({ id: IDselect.value, name: putcity.value, population: Number(putpopulation.value)}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT' 
  })



.then((data) => {
    console.log(data);
  
    data.forEach((shop) => {
        IDselect.innerHTML += `
        <option>${shop.id}</option>
        `
      selectElement.innerHTML += `
      <option>${shop.id}</option>
      `
      tabledata.innerHTML += `
      <tr>
      <td>${shop.id}</td>
      <td>${shop.name}</td>
      <td>${shop.population}</td>
    </tr>
      `    
    });
  
  });


}



//funktionen att ta bort staden
function citiesdelete() {
    
fetch('https://avancera.app/cities/' + selectElement.value, {
    method: 'DELETE'
  }) 

}


//datavisualisering för produkter av hur många har rankat produkter och vilken rank folk har rankat
fetch('https://fakestoreapi.com/products')

  .then((response) => response.json())

  .then((result) => {

    const ctx = document.getElementById('myChart').getContext('2d')


    const data = [],
    label = []

    for(let n = 0; n < result.length; n++){
        const city = result[n]

        data.push(city.rating.count)
        label.push(city.rating.rate)

    }

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: label,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

  })





  