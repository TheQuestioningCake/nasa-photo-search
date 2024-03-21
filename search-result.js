const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

// Define searchTerm outside the event listener so it can be accessed later
const searchInput = document.getElementById("Search");
let searchTerm = "";

// SEARCH PICTURES
function search(){
const searchBtn = document.getElementById("searchBtn");
// Add event listener to the button
searchBtn.addEventListener("click", function () {
  // Get the input element

  // Get the value from the input field
  searchTerm = searchInput.value.trim(); // Assign the value to searchTerm, and trim whitespace
  // Log the search term to the console
  const searchApiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`;

  function saveSearchInput(searchTerm) {
    // Retrieve previously saved search inputs from localStorage
    const savedSearches =
      JSON.parse(localStorage.getItem("searchedInputs")) || [];
    // Add the new search term to the array of saved searches if it's not already present
    if (!savedSearches.includes(searchTerm)) {
      savedSearches.push(searchTerm);
      // Save the updated array back to localStorage
      localStorage.setItem("searchedInputs", JSON.stringify(savedSearches));
    }
  }

  fetch(searchApiUrl)
    .then((response) => {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Extract the images from the response
      const images = data.collection.items.slice(0, 9); // Fetch only the first 6 images
      console.log(data);
      // Assuming 'images' is an array of image objects obtained from the API
      images.forEach((image, index) => {
        // Get the URL of the image
        const imageUrl = image.links[0].href;

        // Target each <img> tag within the <a> tags using its index
        const imgElement = document.querySelectorAll(".grid div img")[index];

        // Set the 'src' attribute of the <img> element
        imgElement.src = imageUrl;
      });
      // Save every searched input in the local storage
      saveSearchInput(searchTerm);
    })
    .catch((error) => {
      console.error("There was a problem fetching the images:", error);
    });
});
}

search()
// Display search terms in the modal when it opens
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");

  // Retrieve searched terms from localStorage
  const searchedTerm = localStorage.getItem("searchedInputs");
  const searchTermsArray = JSON.parse(searchedTerm);

  // Create a new ul element to display the search terms
  const searchedTermList = document.createElement("ul");

  // Append the ul element to the modal content
  const container = document.getElementById("modalSearchTerm");
  container.appendChild(searchedTermList);

  // Create a Set to keep track of unique search terms
  const uniqueSearchTerms = new Set();

  // If there are search terms, loop through them and create list items
  if (searchTermsArray !== null) {
    searchTermsArray.forEach((searchTerm) => {
      // Add search term to the set if it's unique
      uniqueSearchTerms.add(searchTerm);
    });
  } else {
    console.log("No search terms found in local storage");
  }

  // Convert Set back to array and create list items
  uniqueSearchTerms.forEach((searchTerm) => {
    const liElement = document.createElement("li");
    liElement.classList.add("modalLiEl");
    liElement.textContent = searchTerm;
    searchedTermList.appendChild(liElement);

    // Add click event listener to each list item
    liElement.addEventListener("click", function (event) {
      // Set the clicked search term into the search input field
      const clickedTerm = event.target.textContent;
      searchInput.value = clickedTerm;
      container.innerHTML = ""; // Remove all child elements
      modal.classList.add("hidden"); //hides the modal when the user click on a list
      searchTerm = searchInput.value.trim(); // Assign the value to searchTerm, and trim whitespace
      // Log the search term to the console
      const searchApiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`;
      fetch(searchApiUrl)
        .then((response) => {
          // Check if the request was successful (status code 200)
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Parse the JSON response
          return response.json();
        })
        .then((data) => {
          // Extract the images from the response
          const images = data.collection.items.slice(0, 9); // Fetch only the first 6 images
          console.log(data);
          // Assuming 'images' is an array of image objects obtained from the API
          images.forEach((image, index) => {
            // Get the URL of the image
            const imageUrl = image.links[0].href;

            // Target each <img> tag within the <a> tags using its index
            const imgElement =
              document.querySelectorAll(".grid div img")[index];

            // Set the 'src' attribute of the <img> element
            imgElement.src = imageUrl;
          });
          // Save every searched input in the local storage
          saveSearchInput(searchTerm);
        })
        .catch((error) => {
          console.error("There was a problem fetching the images:", error);
        });
    });
  });
});

// Hide the modal and clear its content when the close button is clicked
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  // Clear modal content
  const container = document.getElementById("modalSearchTerm");
  container.innerHTML = ""; // Remove all child elements
});

var backToHomePageBtn = document.getElementById("loadHomePage");
// Add event listener to the button
backToHomePageBtn.addEventListener("click", function () {
  // Load another HTML file
  window.location.href = "index.html";
});
