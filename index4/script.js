const destination = document.querySelector(".destinations")
const info = document.querySelector(".header")
const ship = document.querySelector(".ship")
const reference = document.querySelector(".reference")
const nav = document.querySelector('nav')

function showScroll(){
    let scrollTop = document.documentElement.scrollTop;
    let topDestination = destination.offsetTop;

    if (scrollTop + 800 > topDestination){
        destination.classList.add('toUp')
    }
    else{
        destination.classList.remove('toUp')
    }

    let topShip = ship.offsetTop;
    if (scrollTop + 800 > topShip){
        ship.classList.add('toUp')
    }
    else{
        ship.classList.remove('toUp')
    }

    let topReference = reference.offsetTop;
    if (scrollTop + 800 > topReference){
        reference.classList.add('toUp')
    }
    else{
        reference.classList.remove('toUp')
    }
}

function smooth() {
    nav.classList.add('opacity')
    info.classList.add('toUp')
}

window.addEventListener('load',smooth)
window.addEventListener('scroll',showScroll)