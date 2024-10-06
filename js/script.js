
document.getElementById('view-more-btn').addEventListener('click',function(){
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


