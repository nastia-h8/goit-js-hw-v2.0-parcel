const BASE_URL = 'http://localhost:4040/'

async function addCar(newCar) {
  const options = {
  method: "POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(newCar)
}
    const response = await fetch(`${BASE_URL}cars/`, options)
    
    return await response.json();
}


async function fetchCars() {
    const response = await fetch(`${BASE_URL}cars`);
    return await response.json();
}