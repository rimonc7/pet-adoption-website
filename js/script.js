// scroll function

document.getElementById('view-more-btn').addEventListener('click', function () {
    document.getElementById('scroll-target').scrollIntoView({
        behavior: 'smooth'
    })

})

// catagory button function

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
        button.classList = (' btn btn-outline border-emerald-500 m-4 px-10  text-black font-bold text-2xl')
        button.innerHTML = `<img src="${catagory.category_icon}" alt=" " class="inline-block w-8 h-8 mr-2">
    ${catagory.category}`
        catagoryContainer.append(button)

        // button clicked handler
        button.addEventListener('click', function () {
            const petName = `${catagory.category}`
            FetchPetsbyCategory(petName)
        })
    })

}

// Fetch Pets by Category Function

const FetchPetsbyCategory = (petCommonName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCommonName}`)
        .then(res => res.json())
        .then(data => {
            const petContainer = document.getElementById('pet-container');
            petContainer.innerHTML = '';
            data.data.length === 0? petContainer.innerHTML = ` 
        <div class = "w-[1250px]">
            <div  class="max-w-3xl bg-slate-100 rounded-xl mb-4 text-center mx-auto">
            <img class="mx-auto pt-24" src="images/error.webp" alt="">
            <h2 class="text-black font-bold text-4xl py-3">No Information Available</h2>
            <p class="text-gray-600 pb-24">We couldn't find any pets in this category. Try selecting a different category or come back later.</p>
         </div>
            </div>`:showPets(data.data)
        })
        .catch(error => console.log(error))
}


// All pets Load Function

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
                                <button class="thumb-up-btn btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">
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
        const thumbUpBtn = div.querySelector('.thumb-up-btn');
        thumbUpBtn.addEventListener('click', function () {
            const sideBar = document.getElementById("sidebar");
            const div = document.createElement('div');
            div.innerHTML = `<img class="rounded-lg" src="${pet.image}" alt="" />`
            sideBar.append(div)
        });
    })
}





catagoriesLoader();
loadPets();
