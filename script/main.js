const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then ( Response => Response.json())
    .then ( data => displayCategories(data.categories))
    .catch(error => console.log(error))
}

const loadPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then ( Response => Response.json())
    .then ( data => {
        petsData = data.pets;
        displayPets(petsData)
        console.log(petsData);
    })
    
    .catch(error => console.log(error))
};

const showSpinner = () => {
    const spinningElement = document.getElementById('loading-spinner');
    const mainSection = document.getElementById('pets');
    spinningElement.classList.remove('hidden');
    mainSection.classList.add('hidden');
    setTimeout(() => {
    spinningElement.classList.add('hidden');
    mainSection.classList.remove('hidden');
    },2000);

}
console.log(pets.category);

const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";

    if(pets.length == 0){
    petsContainer.innerHTML = `
        <div class="text-center bg-stone-200 rounded-lg p-16 md:m-36 col-span-3 md:col-span-3 lg:col-span-3 ">
        <div class="mx-auto flex justify-center">
        <img src="./images/error.webp" alt="">
        </div>
        <h1 class="text-2xl font-bold my-5">
        No Information Available
        </h1>
        <p class="" >
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
        </p>
        </div>
    `;
    return;
}

    else{
    petsContainer.classList.add('grid')
}

    pets.forEach( pet => {
    console.log(pet);
    const card = document.createElement('div');
    card.classList='card bg-base-100 border shadow-md   '
        card.innerHTML = `

        <div id="pet-card"></div>
        
        <figure>
    <div class="m-5 w-[600px]">
    <img  class="  rounded-xl   w-full  object-cover" src="${pet.image}"/>
    </div>
        </figure>

<div>

    ${pet.pet_name == null || undefined ? `<p class=" flex gap-2 mx-5 my-3 items-center font-bold text-xl  ">  Name : Not found </p>` : `<p class=" flex gap-2 mx-5 my-3 items-center font-bold text-xl   ">  Name : ${pet.pet_name} </p>`}
    
    <div class=" m-5 font-semibold ">
    
    ${pet.breed == null || undefined ? `<p class=" flex gap-2 my-2 items-center  "> <img class="  w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/6800/6800764.png" />  Breed : Not available </p>` : `<p class=" flex gap-2 my-2 items-center  "> <img class="  w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/6800/6800764.png" />  Breed : ${pet.breed} </p>`}

    ${pet.date_of_birth == null || undefined ? `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/3991/3991774.png'/>  Birth : Not found </p>` : `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/3991/3991774.png'/>  Birth : ${pet.date_of_birth} </p>`}

    ${pet.gender == null || undefined ? `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5" src='https://cdn-icons-png.flaticon.com/128/866/866954.png' /> Gender : Not found </p>` : `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5" src='https://cdn-icons-png.flaticon.com/128/866/866954.png' /> Gender : ${pet.gender} </p>`}

    ${pet.price == null || undefined ? `<p class=" flex gap-2 my-2 items-center  "> <img class=" w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/25/25228.png' /> Price : Not available</p>` : `<p class=" flex gap-2 my-2 items-center  "> <img class=" w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/25/25228.png' /> Price : ${pet.price}$</p>`}

    </div> 

    <div class=" border-t-2 " >  </div>

    <div class=" flex justify-evenly  items-center my-5 " >

        <button onclick="likedImages( '${pet.image}' ) " class="btn btn-ghost px-2 py-1  rounded-lg border-gray-400 bg-teal-00 border-2 text-white"> <img class=" h-6 w-6 " src="https://cdn-icons-png.flaticon.com/128/1062/1062675.png"  > </button>
        <button onclick="adopted()" class="btn btn-ghost px-3 py-1  rounded-lg border-2 border-gray-400 font-extrabold text-[#0E7A81]">Adopt </button>
        <button onclick="loadDetails(${pet.petId})" class="btn btn-ghost px-3 py-1 rounded-lg border-2 border-gray-400 font-extrabold text-[#0E7A81]"> Details </button>
    </div>

</div>
        
</div>
        </div>

    `  
    petsContainer.append(card)
    })
}

const sortByPrice = () => {

    const sortedPets = [...petsData];
    sortedPets.sort((a,b) =>
    (b.price ?? 0) - (a.price ?? 0) );
    displayPets(sortedPets);


}

const adopted = () => {
        const adoptContainer = document.getElementById('modal-content2')
        adoptContainer.innerHTML=`<h1>  </h1>  
        
        `;

        const adoptModal = document.getElementById('adoptModal');
        const countdownDisplay = document.getElementById('adoptCountdown');
        let countdown = 3; // three-second countdown
        
        // Set initial countdown
        countdownDisplay.innerHTML =
    `
        <div class=" grid justify-center text-center ">
            <img src="https://cdn-icons-png.flaticon.com/128/3790/3790110.png" class="w-14 h-14 mx-auto" />
            <h1 class=" my-2 text-3xl font-bold "> Congratulations </h1>
            <p class=" font-semibold text-lg "> Adoption Process is Started For You </p>
            <p class="my-2"> <span class="text-4xl text-extrabold text-teal-800" > ${countdown} </span></p>
        </div>
    `
    
        // Show the modal content
        adoptModal.showModal();
    
        // Start the countdown
        const interval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownDisplay.innerHTML = 
    `
        <div class=" grid justify-center text-center ">
            <img src="https://cdn-icons-png.flaticon.com/128/3790/3790110.png" class="w-14 h-14 mx-auto" />
            <h1 class=" my-2 text-3xl font-bold "> Congratulations </h1>
            <p class=" font-semibold text-lg "> Adoption Process is Started For You </p>
            <p class="my-2"> <span class="text-4xl text-extrabold text-teal-800" > ${countdown} </span> </p>
        </div>               
    `
            
            } else {
                adoptModal.close();
                clearInterval(interval);
            }
        }, 1000);
}

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then ( res => res.json())
    .then ( data => displayDetails(data.petData))
    .catch(error => console.log(error))
}

const displayDetails = (details) => {
const detailsContainer = document.getElementById('modal-content');
detailsContainer.innerHTML = `

<div>
        <figure >
            <div class="m-5 w-[300px] h-[200px] mx-auto">
            <img  class="  rounded-xl   w-full  object-cover" src="${details.image}" />
        </div>
        </figure>
    <div ">
    
    <div class=" m-5 font-semibold ">

    <div>
        ${details.pet_name == null || undefined ? `<p class=" font-bold text-xl pb-2 "> Name : Not found </p>` : `<p class=" font-bold text-xl pb-2 ">   ${details.pet_name} </p>`}
    </div>

<div class=" md:grid grid-cols-2">

    <div>
        ${details.breed == null || undefined ? `<p class=" flex gap-2 my-2 items-center  "> <img class="  w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/6800/6800764.png" />  Breed : Not available </p>` : `<p class=" flex gap-2 my-2 items-center  "> <img class="  w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/6800/6800764.png" />  Breed : ${details.breed} </p>`}
    </div>

    <div>
        ${details.date_of_birth == null || undefined ? `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/3991/3991774.png'/>  Birth : Not found </p>` : `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/3991/3991774.png'/>  Birth : ${details.date_of_birth} </p>`}
    </div>

    <div>
        ${details.gender == null || undefined ? `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5" src='https://cdn-icons-png.flaticon.com/128/866/866954.png' /> Gender : Not found </p>` : `<p class=" flex gap-2 my-2 items-center "> <img class="  w-5 h-5" src='https://cdn-icons-png.flaticon.com/128/866/866954.png' /> Gender : ${details.gender} </p>`}
    </div>

    <div>  
        ${details.price == null || undefined ? `<p class=" flex gap-2 my-2 items-center  "> <img class=" w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/25/25228.png' /> Price : Not available</p>` : `<p class=" flex gap-2 my-2 items-center  "> <img class=" w-5 h-5 " src='https://cdn-icons-png.flaticon.com/128/25/25228.png' /> Price : ${details.price}$</p>`}
    </div> 

</div>

    <hr>

    <div class=" py-3">
        ${details.pet_details == null || undefined ? `<p class="  ">details Information : Not found</p>` : `<p class="  ">  <span class="font-extrabold" >details Information : </span> ${details.pet_details}</p>`}
    </div>

    </div>

    `
    console.log(details)
    document.getElementById("showModalPetDetails").showModal();
} 


const likedImages = (pet) => {
    console.log(pet);
    const likedImageContainer = document.getElementById('liked-images');
    const div = document.createElement('div');
    div.classList="rounded-lg m-2";
    div.innerHTML = 
    `
        <img class =" rounded-lg w-full" src="${ pet }" />
    `
    likedImageContainer.appendChild(div);
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for ( let btn of buttons) {
    btn.classList.remove('active');
    }
}


const loadCategoryPet = (category) => {
    console.log(category);
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then ( res => res.json())
    .then ( data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add('active')
        displayPets(data.data)
    } )
    .catch(error => console.log(error))
}


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')
    categories.forEach((item) => {

        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML= 
    `     
        <button id="btn-${item.category}" onclick="loadCategoryPet('${item.category}'),showSpinner()" class= "flex items-center justify-center gap-2 font-bold h-18 py-2 px-10/ w-full md:w-[140px] mx-auto rounded-md border border-gray-400 category-btn">
        <img src=${item.category_icon} class="w-6 h-6"> ${item.category}
        </button>
    `
        categoryContainer.appendChild(buttonDiv);
    } );
}
loadPets()
loadCategories();