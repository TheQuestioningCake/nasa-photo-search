//set up the APIKEY and URL
const apiKey = 'B8gfURjqdbbSuW06cilKknOrOiO1hCCIDbcq1jRS';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
// Function to fetch the photo of the day and display it in the HTML image tag
async function fetchPhotoOfTheDayAndDisplay() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            // Check if the media type is an image
            if (data.media_type === 'image') {
                const imageUrl = data.url;
                console.log("Image URL:", imageUrl);
                // Set the src attribute of the image element to the fetched image URL
                document.getElementById('nasaImg').src = imageUrl;
                document.getElementById('picTitle').textContent = data.title;
                
            } else {
                console.log("Today's media is not an image.");   // return a not image
            }
        } else {
            console.log("Failed to fetch data:", response.status);  // if the failed to fetch the picture
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Call the function to fetch the photo of the day and display it
fetchPhotoOfTheDayAndDisplay();

// SEARCH PICTURES 
const searchBtn = document.getElementById('searchBtn');
// Add event listener to the button
searchBtn.addEventListener('click', function() {
    // Get the input element
    const searchInput = document.getElementById('Search');
    // Get the value from the input field
    const searchTerm = searchInput.value;
    // Log the search term to the console
    const searchApiUrl = `https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image`;

fetch(searchApiUrl)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Extract the images from the response
    const images = data.collection.items.slice(0, 6); // Fetch only the first 6 images
    console.log(data)
    // Assuming 'images' is an array of image objects obtained from the API
    images.forEach((image, index) => {
    // Get the URL of the image
    const imageUrl = image.links[0].href;

    // Target each <img> tag within the <a> tags using its index
    const imgElement = document.querySelectorAll('.grid a img')[index];
    
    // Set the 'src' attribute of the <img> element
    imgElement.src = imageUrl;
});

  })
  .catch(error => {
    console.error('There was a problem fetching the images:', error);
  });
});




