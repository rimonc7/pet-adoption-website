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
        const div = document.createElement('div');
        div.innerHTML = `<button id = "button-${catagory.category}" class ="all-pet-button btn btn-outline border-emerald-500 m-4 px-10   text-black font-bold text-2xl"> <img src="${catagory.category_icon}" alt=" " class="w-8 h-8 mr-2">
     ${catagory.category} </button>`
        catagoryContainer.append(div)

        // button clicked handler
        div.addEventListener('click', function () {
            const petName = `${catagory.category}`
            showSpinner()
            setTimeout(() => {
                FetchPetsbyCategory(petName)
            }, 2000);
        })
    })

}

// Spinner Function

const showSpinner = () => {
    const petContainer = document.getElementById('pet-container');
    petContainer.classList.remove('grid')
    petContainer.innerHTML = `<div class ="h-30 w-full flex justify-center p-5"> <span class="loading loading-spinner loading-xs"></span>
<span class="loading loading-spinner loading-sm"></span>
<span class="loading loading-spinner loading-md"></span>
<span class="loading loading-spinner loading-lg"></span></div>`
}


// Fetch Pets by Category Function

const FetchPetsbyCategory = (petCommonName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCommonName}`)
        .then(res => res.json())
        .then(data => {
            allPets = data.data;
            const petContainer = document.getElementById('pet-container');
            petContainer.innerHTML = '';
            petContainer.classList.add('grid')
            removeAllButtonStyle();
            const petButton = document.getElementById(`button-${petCommonName}`)
            petButton.classList.add('active-btn')
            data.data.length === 0 ? petContainer.innerHTML = ` 
        <div class = " w-full lg:w-[800px]">
            <div  class="max-w-3xl bg-slate-100 rounded-xl mb-4 text-center mx-auto">
            <img class="mx-auto pt-24" src="images/error.webp" alt="">
            <h2 class="text-black font-bold text-4xl py-3">No Information Available</h2>
            <p class="text-gray-600 pb-24 px-2">We couldn't find any pets in this category. Try selecting a different category or come back later.</p>
         </div>
            </div>`: showPets(data.data)
        })
        .catch(error => console.log(error))
}


// Catagory Button Style Change

const removeAllButtonStyle = () => {
    const allButton = document.getElementsByClassName('all-pet-button');
    for (let btn of allButton) {
        btn.classList.remove("active-btn")
    }
}


// All pets Load Function

let allPets = "";

const loadPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            allPets = data.pets;
            showPets(allPets)
        })
        .catch(error => console.log(error))
}

const showPets = (pets) => {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = ""
    pets.forEach(pet => {
        const div = document.createElement('div')
        div.classList = ('grid grid')
        div.innerHTML = ` <div class=" allPets card border-2 border-[5A5A5A] ">
                        <figure class="p-3 ">
                            <img class="rounded-lg"
                                src="${pet.image}"
                                alt="" />
                        </figure>
                        <div class="p-3">
                            <h2 class="card-title">${pet.pet_name}</h2>
                            <p> <i class="fa-solid fa-paw"></i> Breed: ${pet.breed ? pet.breed : "Update Soon"}</p>
                            <p><i class="fa-solid fa-calendar-days"></i> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Update Soon"}</p>
                            <p> <i class="fa-solid fa-mercury"></i> Gender: ${pet.gender ? pet.gender : "Update Soon"}</p>
                            <p> <i class="fa-solid fa-dollar-sign"></i> Price : ${pet.price ? pet.price + "$" : "Update Soon"} </p >
    <hr class="my-2">
        <div class="flex justify-between align-middle">
            <button class="thumb-up-btn btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">
                <i class="fa-regular fa-thumbs-up text-xl px-3"></i>
            </button>
            <button
                id="pet-${pet.petId}" class="adopted-button btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">Adopt
            </button>
            <button
                class="details-btn btn btn-outline text-[#0E7A81] border-[#5A5A5A] hover:border-[#5A5A5A]">Details
            </button>
        </div>
    </div>
                    </div > `
        petContainer.append(div)
        const thumbUpBtn = div.querySelector('.thumb-up-btn');
        thumbUpBtn.addEventListener('click', function () {
            const sideBar = document.getElementById("sidebar");
            const div = document.createElement('div');
            div.innerHTML = `<img class="rounded-lg" src = "${pet.image}" alt = "" />`
            sideBar.append(div)
        });

        const adoptedButton = div.querySelector('.adopted-button');
        adoptedButton.addEventListener('click', function () {
            countDown();
            setTimeout(() => {
                const adoptBtnById = document.getElementById(`pet-${pet.petId}`);
                adoptBtnById.innerHTML = "";
                adoptBtnById.innerHTML = `<button class="adopted-button text-[#0E7A81]">Adopted</button>`;
                adoptBtnById.classList.add('disabled')
                adoptBtnById.disabled = true;
            }, 4000);
        });

        const detailsButton = div.querySelector('.details-btn');
        detailsButton.addEventListener('click', function () {
            detailModal(pet.petId);
        })
    })
}

// details Show on Modal Function

const detailModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            const modalContainer = document.getElementById('my_modal_1')
            modalContainer.innerHTML = '';
            const div = document.createElement('div');
            div.innerHTML = `<div class="modal-box w-[90%] max-w-lg md:max-w-3xl mx-auto">
                    <div>
                    <img class="rounded-xl w-full h-full" src="${data.petData.image}" alt="">
                    </div>
                    <h3 class="text-lg font-bold pt-3">${data.petData.pet_name}</h3>
                    <div class="grid grid-cols-2 gap-1 mt-2">
                        <p> <i class="fa-solid fa-paw"></i> Breed: ${data.petData.breed} </p>
                        <p> <i class="fa-solid fa-mercury"></i> Gender:${data.petData.gender} </p>
                        <p> <i class="fa-solid fa-syringe"></i>Vaccinated status:${data.petData.vaccinated_status}</p>
                        <p><i class="fa-solid fa-calendar-days"></i> Birth:${data.petData.date_of_birth}</p>
                        <p> <i class="fa-solid fa-dollar-sign"></i> Price :${data.petData.price}$ </p>
                    </div>
                    <hr class="mt-2">
                    <div>
                        <h3 class="font-bold my-2">Details Information</h3>
                        <p>
                            ${data.petData.pet_details}
                        </p>
                    </div>
                    <div class="modal-action">
                        <form method="dialog" class="w-full">
                            <button class="btn w-full mx-auto">Cancel</button>
                        </form>
                    </div>
                </div>`
            modalContainer.append(div);
            my_modal_1.showModal()
        })
        .catch(error => console.log(error))
}

// Sorted By price function

const sortButton = document.getElementById('sort-btn');
sortButton.addEventListener('click', function () {
    const sortedPets = allPets.sort((a, b) => b.price - a.price);
    showSpinner()
    setTimeout(() => {
        const petContainer = document.getElementById('pet-container');
        petContainer.classList.add('grid')
        showPets(sortedPets);
    }, 2000);
})


// countdown function

const countDown = () => {
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        const modalContainer = document.getElementById('my_modal_1')
        modalContainer.innerHTML = '';
        const div = document.createElement('div');
        div.innerHTML = `<div class="modal-box">
                <div class = "text-center"> <i class="fa-regular fa-handshake text-5xl p-3 text-[#0E7A81]"></i>
                </div>
                <h1 class="text-3xl font-bold text-[#0E7A81] text-center mx-6 mb-4">Congratulations</h1>
                <p class="text-2xl font-bold text-[#0E7A81] text-center ">${countdown}</p>
            </div>`
        modalContainer.append(div);
        my_modal_1.showModal()
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            modalContainer.close()
        }
    }, 1000);

}

catagoriesLoader();
loadPets();





