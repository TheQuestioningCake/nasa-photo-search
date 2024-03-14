
//set up the APIKEY and URL 
const apiKey = 'B8gfURjqdbbSuW06cilKknOrOiO1hCCIDbcq1jRS';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;


// Function to fetch the photo of the day and display it in the HTML image tag
async function fetchPhotoOfTheDayAndDisplay() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        console.log(data.title)

        if (response.ok) {
            // Check if the media type is an image
            if (data.media_type === 'image') {
                const imageUrl = data.url;
                console.log("Image URL:", imageUrl);
                // Set the src attribute of the image element to the fetched image URL
                document.getElementById('nasaImg').src = imageUrl;
                document.getElementById('picTitle').textContent = data.title
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


// API FOR SEARCH PICTURE 
 var searchAPI = "https://images-api.nasa.gov"
