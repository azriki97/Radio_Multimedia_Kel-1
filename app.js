const stationsData = [
    {
      id: 1,
      name: 'Capital FM',
      url : 'https://icecast2.getstreamhosting.com:8050/stream.mp3',
      logo: 'https://seeklogo.com/images/C/capital-fm-kenya-logo-B96EC76277-seeklogo.com.png'
    },
  
    {
      id: 2,
      name: 'Kiss 100',
      url : 'http://streamingv2.shoutcast.com/kiss100',
      logo: 'https://www.kenyans.co.ke/files/styles/article_style/public/images/media/Kiss%20fm.jpg'
    },
  
    {
      id: 3,
      name: 'Gheto FM',
      url : 'https://node-18.zeno.fm/t2wky7h647zuv?rj-ttl=5&rj-tok=AAABeukC3m4ArY80_tysT_zfAg',
      logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/ghetto.png'
    },
  
    {
      id: 4,
      name: 'Classic 105',
      url : 'https://streamingv2.shoutcast.com/classic105fm',
      logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/classic-105.png'
    },
  
    {
      id: 5,
      name: 'Xfm',
      url : 'https://streamingv2.shoutcast.com/smooth-1055',
      logo: 'https://liveonlineradio.net/wp-content/uploads/2016/09/105.5-XFM-220x108.jpg'
    },
  
    {
      id: 6,
      name: 'Home Boys Radio',
      url : 'https://node-15.zeno.fm/hhkd1ubrb2zuv.aac?rj-ttl=5&rj-tok=AAABeujbwB0ATMeEBYG45Z7fFQ',
      logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/hbr.png'
    },
  
    {
      id: 7,
      name: 'NRG',
      url : 'http://main.smanelcast.com:8000/radio.mp3',
      logo: 'https://cdn.onlineradiobox.com/img/l/9/77349.v5.png'
    },

    {
        id: 8,
        name: 'Pantai ITTS',
        url : 'Shiawase VIP - suisIF4hwyw-192k-1691641469.mp3',
        logo: 'channelkita.jpeg'
    },
  
  ];

  // Volume control buttons
  const volumeUpButton = document.querySelector('.volume-up-button');
  const volumeDownButton = document.querySelector('.volume-down-button');

  // Event listeners for volume control
  volumeUpButton.addEventListener('click', increaseVolume);
  volumeDownButton.addEventListener('click', decreaseVolume);

  // Function to increase volume
  function increaseVolume() {
    if (player.volume < 1.0) {
      player.volume += 0.1; // You can adjust the step size as needed
    }
  }

// Function to decrease volume
function decreaseVolume() {
  if (player.volume > 0.0) {
    player.volume -= 0.1; // You can adjust the step size as needed
  }
}
  
  //DOM CONSTANTS
  const stationsList = document.querySelector('.stations-list');
  
  const player = document.querySelector('.audio-player');
  
  const controlButton = document.querySelector('.playBtn');
  
  const currentChannel = document.querySelector('.current-channel');
  
  const popupMessage = document.querySelector('.popup-message');
  
  
  //EVENT LISTENERS
  //DOM Event listner
  document.addEventListener('DOMContentLoaded', ()=>{
    let listHTML = '';
  
    stationsData.forEach(listItem =>{
      listHTML += `
      <div class="station-list-item" id="${listItem.id}">
        <img src="${listItem.logo}">
        <label>${listItem.name}</label>
      </div>
      `;
    });
  
    stationsList.innerHTML = listHTML;
  
    console.log(controlButton);
  
  });
  
  //Offline Event listener
  window.addEventListener('offline', event => {
  setTimeout(displayPopupMessage, 3000, 'It appears you lost connection');
    });
  
  //Check Offline status
  window.addEventListener('online', e => {
    setTimeout(removePopupMessage, 3000);
  });
  
  //Stations List event Listner
  stationsList.addEventListener('click',e=>{
    stationListItemCLicked(e);
  });
  //For smart phones
  stationsList.addEventListener('touchstart',e=>{
    stationListItemCLicked(e);
  });
  
  //Control Button EventListener
  controlButton.addEventListener('click', e =>{
    controlBtnCLicked(e);
  });
  //For smart phones
  controlButton.addEventListener('touchstart', e =>{
    controlBtnCLicked(e);
  });
  
  //FUNCTIONS
  //Station ListItem function (inatiate playing of the radio stream)
  function stationListItemCLicked(e){
    if(e.target.classList.contains('station-list-item')){
      const id = e.target.id-1;
      player.setAttribute('autoplay', 'true');
      player.src = stationsData[id].url;
      setCurrentChannelLabel(id);
      playStream();
    }
  }
  
  //Control Button Function (Pause or play)
  function controlBtnCLicked(e){
    if(e.target.classList.contains('fa-play')){
      playStream();
    } else if(e.target.classList.contains('fa-pause')) {
      pauseStream();
    }
    e.preventDefault();  
  }
  
  //play stream
  function playStream() {
  player.play()
    .catch(error => {
      displayPopupMessage('-- Mohon bersabar --');
      setTimeout(() => {
        removePopupMessage();
      }, 15000); // 15 detik
      console.log(error);
    });
  controlButton.classList.remove('fa-play');
  controlButton.classList.add('fa-pause');
}

  
  //pause stream
  function pauseStream(){
    player.pause();
    controlButton.classList.add('fa-play');
    controlButton.classList.remove('fa-pause');
  }
  
  //change player channel name
  function setCurrentChannelLabel(id){
    currentChannel.textContent = stationsData[id].name;
  }
  
  function displayPopupMessage(msg){
    popupMessage.innerHTML = msg;
    if(!popupMessage.classList.contains('popup-message-show')){
      popupMessage.classList.add('popup-message-show');
    }
  
  }
  
  let currentStationIndex = 0;
  
  const nextButton = document.querySelector('.next-button');
  nextButton.addEventListener('click', playNextChannel);
  
  const previousButton = document.querySelector('.previous-button');
  previousButton.addEventListener('click', playPreviousChannel);
  
  function playNextChannel() {
    pauseStream();
    
    currentStationIndex = (currentStationIndex + 1) % stationsData.length;
    const nextStation = stationsData[currentStationIndex];
    
    setCurrentChannelLabel(currentStationIndex);
    
    player.src = nextStation.url;
    
    playStream();
  }
  
  function playPreviousChannel() {
    pauseStream();
  
    currentStationIndex = (currentStationIndex - 1 + stationsData.length) % stationsData.length;
    const previousStation = stationsData[currentStationIndex];
  
    setCurrentChannelLabel(currentStationIndex);
  
    player.src = previousStation.url;
  
    playStream();
  }
  
  previousButton.addEventListener('click', playPreviousChannel);