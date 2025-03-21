// Function to play the video in the popup
function playVideo(videoId) {
    var videoPopup = document.getElementById('videoPopup');
    var popupIframe = document.getElementById('popupIframe');
    
    // Set the video URL with autoplay and make the popup visible
    popupIframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    videoPopup.style.display = 'flex'; // Show the popup
  }
  
  // Function to close the popup and stop the video
  document.getElementById('closeBtn').addEventListener('click', function() {
    var videoPopup = document.getElementById('videoPopup');
    var popupIframe = document.getElementById('popupIframe');
    
    // Stop the video by resetting the iframe src
    popupIframe.src = "";
    videoPopup.style.display = 'none'; // Hide the popup
  });
  