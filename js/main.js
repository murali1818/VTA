// Function to handle video fullscreen toggle
function handleVideoFullscreen(videoContainer) {
    const iframe = videoContainer.querySelector('.videoIframe');
    const trigger = videoContainer.querySelector('.videoTrigger');
  
    trigger.onclick = function () {
      // Toggle the fullscreen class
      iframe.classList.toggle("fullscreen");
  
      // If video is entering fullscreen, start playing with sound
      if (iframe.classList.contains("fullscreen")) {
        // Enable autoplay with sound
        const currentSrc = iframe.src;
        const newSrc = currentSrc.replace("mute=1", "mute=0").replace("autoplay=0", "autoplay=1");
        iframe.src = newSrc;
      } else {
        // If exiting fullscreen, mute and stop the video
        const currentSrc = iframe.src;
        const newSrc = currentSrc.replace("mute=0", "mute=1").replace("autoplay=1", "autoplay=0");
        iframe.src = newSrc;
      }
    }
  
    // Optionally, exit fullscreen on ESC key
    document.addEventListener('keydown', function (event) {
      if (event.key === "Escape" && iframe.classList.contains("fullscreen")) {
        iframe.classList.remove("fullscreen");
        // Mute and stop the video when exiting fullscreen
        const currentSrc = iframe.src;
        const newSrc = currentSrc.replace("mute=0", "mute=1").replace("autoplay=1", "autoplay=0");
        iframe.src = newSrc;
      }
    });
  }
  
  // Initialize the video functionality on all video containers
  function initVideoPlayers() {
    const videoContainers = document.querySelectorAll('.video_thumb');
    videoContainers.forEach(container => {
      handleVideoFullscreen(container);
    });
  }
  
  // Call the initialization function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initVideoPlayers);
  