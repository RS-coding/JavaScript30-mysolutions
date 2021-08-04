//!Get our Elements

const  player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progess = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const ranges = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('[data-skip]')
const fullScreenBtn = player.querySelector('.fullscreen__button')

//!Build our functions


function togglePlay(){
   if(video.paused){
        video.play()
    } else{
        video.pause()
    }  
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚'
    toggle.textContent = icon
   
}

function skip(){
    console.log(this.dataset.skip)
    //parseFloat because the value is a string and we want to be a number
    video.currentTime += parseFloat(this.dataset.skip)
}


function handleRangeUpdate(){
    console.log(this.value)
    //name is the attribute in the input range. one for volume and other for playbackrange
    console.log(this.name)
    video[this.name] = this.value
}

//progressBar fullfill by playing the video
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis =`${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progess.offsetWidth) * video.duration
    video.currentTime = scrubTime;
    console.log(e)
}


function fullScreen(){
    if(video.requestFullscreen){
        video.requestFullscreen()
    }
}

//!Hook up the event listeners

//fullscreen
fullScreenBtn.addEventListener('click', fullScreen)


//click above video image
video.addEventListener('click', togglePlay)
//when its playing update the button  (play ,pause)
video.addEventListener('play',updateButton)
video.addEventListener('pause', updateButton)
//click the play button
toggle.addEventListener('click',togglePlay)
//click on buttons that hata data-skip back and forward
skipButtons.forEach( button => button.addEventListener('click', skip))

//update the range inputs volume and speed 
ranges.forEach( range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach( range => range.addEventListener('mousemove',handleRangeUpdate))

//progressBar fullfill by playing the video
video.addEventListener('timeupdate', handleProgress)


let mousedown = false

progess.addEventListener('click', scrub)
                                            // if mousedown is true then scrub(e)
// progess.addEventListener('mousemove', (e) => mousedown && scrub(e) )
progess.addEventListener('mousemove', (e) =>{
    if(mousedown){
        scrub(e);
    }
})
progressBar.addEventListener('mousedown', () =>  mousedown = true)
progressBar.addEventListener('mouseup', () =>  mousedown = false)