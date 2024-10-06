// scroll function

document.getElementById('view-more-btn').addEventListener('click', function () {
    document.getElementById('scroll-target').scrollIntoView({
        behavior: 'smooth'
    })

})

const catagoriesLoader = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => showCatagories(data.categories))
        .catch(error => console.log(error))
}

const showCatagories = (catagories) => {
    const catagoryContainer = document.getElementById('catagory-container')
    catagories.forEach(catagory => {
        const button = document.createElement('button')
        button.classList = ('btn btn-outline border-emerald-500 m-4 px-10  text-black font-bold text-2xl')
        button.innerHTML = `<img src="${catagory.category_icon}" alt=" " class="inline-block w-8 h-8 mr-2">
    ${catagory.category}`
        catagoryContainer.append(button)
    })

}

catagoriesLoader();



const loadPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => showPets(data.pets))
        .catch(error => console.log(error))
}

const showPets = (pets) => {
    const petContainer = document.getElementById('pet-container');
    pets.forEach(pet => {
        const div = document.createElement('div')
        div.classList = ('grid grid')
        div.innerHTML = ` <div class="card border-2 border-[5A5A5A] ">
                        <figure class="p-3 ">
                            <img class="rounded-lg"
                                src="${pet.image}"
                                alt="" />
                        </figure>
                        <div class="p-3">
                            <h2 class="card-title">${pet.pet_name}</h2>
                            <p> <i class="fa-solid fa-paw"></i> Breed: ${pet.breed}</p>
                            <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth}</p>
                            <p> <i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                            <p> <i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price}$</p>
                            <hr class="my-2">
                            <div class="flex justify-between align-middle">
                                <button class="btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">
                                    <i class="fa-regular fa-thumbs-up text-xl px-3"></i>
                                </button>
                                <button
                                    class="btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">Adopt
                                </button>
                                <button
                                    class="btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">Details
                                </button>
                            </div>
                        </div>
                    </div>`
        petContainer.append(div)
    })
}

loadPets();








// {
//     "petId": 2,
//     "breed": "Siamese",
//     "category": "Cat",
//     "date_of_birth": "2022-09-05",
//     "price": 800,
//     "image": "https://i.ibb.co.com/3Wzz41D/pet-2.jpg",
//     "gender": "Female",
//     "pet_details": "This affectionate female Siamese cat is known for her vocal nature and love for attention. Born on September 5, 2022, she enjoys interactive play and snuggles. Fully vaccinated and priced at $800, she's the perfect fit for cat lovers who appreciate an intelligent, engaging, and sociable feline companion.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Mia"
// }