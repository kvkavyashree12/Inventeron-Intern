const loader = document.getElementById("loader");
const userData = document.getElementById("userData");

async function fetchUserData() {
    try {
       
        loader.style.display = "block";

       
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();

       
        loader.style.display = "none";

        
        userData.classList.remove("hidden");

       
        document.getElementById("name").innerText = data.name;
        document.getElementById("email").innerText = data.email;
        document.getElementById("phone").innerText = data.phone;

    } catch (error) {
        loader.innerText = "Failed to load data";
        console.error(error);
    }
}

fetchUserData();
