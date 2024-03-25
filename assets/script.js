//set up the APIKEY and URL
const apiKey = 'B8gfURjqdbbSuW06cilKknOrOiO1hCCIDbcq1jRS';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
// Function to fetch the photo of the day and display it in the HTML image tag

// If fetched image is not in local storage run the following function below then if it is display the image in the #nasaImg
async function fetchPhotoOfTheDayAndDisplay() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            // Check if the media type is an image
            if (data.media_type === 'image') {
                const imageUrl = data.url;
                console.log("Image URL:", imageUrl);
                
                document.getElementById('picTitle').textContent = data.title;
                
                // Check if the fetched image URL is in local storage
                const storedImageUrl = localStorage.getItem('nasaImageUrl');
                if (storedImageUrl === null || storedImageUrl !== imageUrl) {
                    //if the image is not in the local storage run fetch photo function 
                    fetchPhotoOfTheDayAndDisplay()
                    
                } else {
                    // Image already in local storage, display it
                    document.getElementById('nasaImg').src = imageUrl;
                }

                // Save the fetched image URL to localStorage
                localStorage.setItem('nasaImageUrl', imageUrl);
              
            } else {
                console.log(data)
                console.log("Video URL " + data.url)
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
// Add event listener to the button
var homePageSearchBtn = document.getElementById('searchButton');
homePageSearchBtn.addEventListener("click", function() {
    // Load another HTML file
    window.location.href = "search-result.html";
});