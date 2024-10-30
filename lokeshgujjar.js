window.onload = function() {
  Parse.initialize('VgVPYNChzcv6NOP8hEDIymif8aEahJKJiuX7o1be', 'vJtJVCmRCKszpSdnaqbxbjx6ixU8mRJxs1EpcIeE');

  // Headers
  var onMouseOver = function(event) {
    var id = event.target.id;
    var headers = document.getElementsByClassName('header');
    [].forEach.call(headers, function(element) {
      element.style.display = element.classList.contains(id) ? 'block' : 'none';
    });
  }

  var ids = ['email', 'twitter', 'github', 'instagram'];
  ids.forEach(function(id) {
    document.getElementById(id).addEventListener('mouseover', onMouseOver);
  });

  // Instagram
  var query = new Parse.Query('Media');
  query.equalTo('type', 'image');
  query.notEqualTo('location', null);
  query.descending('created_time');
  query.find().then(function(results) {
    results = results.filter(function(result) {
      var image = result.get('images').standard_resolution;
      return result.get('users_in_photo').length == 0;
    });
    var result = results[Math.floor(Math.random(0) * results.length)];

    var imageUrl = result.get('images').standard_resolution.url;
    var locationName = result.get('location').name;
    var link = result.get('link');

    document.getElementById('image').style.backgroundImage = "url('" + imageUrl + "')";
    document.getElementById('instagram').innerHTML = locationName;
    document.getElementById('instagram').href = link;
  }, function(error) {
    console.log(error);
  });
}
window.onload = function() {
  
  // Audio setup
  const bullaAudio = new Audio('./music/Bulla Ki Jana - Rabbi Shergill.mp3');
  const doobaAudio = new Audio('./music/Dooba Dooba - Silk Route.mp3');
  const channaAudio = new Audio('./music/Chanaa Ve - Kunal Ganjawala.mp3');
  const saathAudio = new Audio('./music/Tere Mere Saath - Lucky Ali.mp3');
  const shaamAudio = new Audio('./music/Shaam Tanha - Agnee.mp3');

  const songs = [
    { ele: bullaAudio, audioName: 'Bulla Ki Jana - Rabbi Shergill' },
    { ele: doobaAudio, audioName: 'Dooba Dooba - Silk Route' },
    { ele: channaAudio, audioName: 'Chanaa Ve - Kunal Ganjawala' },
    { ele: saathAudio, audioName: 'Tere Mere Saath - Lucky Ali ' },
    { ele: shaamAudio, audioName: 'Shaam Tanha - Agnee' },
  ];

  let current = 0;
  let currentSong = songs[current].ele;
  const songName = document.querySelector('.song-name');
  songName.textContent = songs[current].audioName;

  // Play/Pause functionality
  const playBtn = document.querySelector('.play-pause');
  playBtn.addEventListener('click', () => {
    if (currentSong.paused) {
      currentSong.play();
      playBtn.innerHTML = '<i class="ph ph-pause"></i>'; // Change icon to pause
    } else {
      currentSong.pause();
      playBtn.innerHTML = '<i class="ph ph-play"></i>'; // Change icon to play
    }
  });

  // Previous song functionality
  const prevBtn = document.querySelector('.previous');
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + songs.length) % songs.length; // Loop to last song
    updateSong();
  });

  // Next song functionality
  const nextBtn = document.querySelector('.next');
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % songs.length; // Loop to first song
    updateSong();
  });

  // Function to update the song
  function updateSong() {
    currentSong.pause(); // Pause current song
    currentSong = songs[current].ele; // Get new song
    songName.textContent = songs[current].audioName; // Update song name
    currentSong.play(); // Play new song
    playBtn.innerHTML = '<i class="ph ph-pause"></i>'; // Update button icon
  }
}