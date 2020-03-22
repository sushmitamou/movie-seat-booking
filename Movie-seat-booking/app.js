const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value ;

populateUI();
//save selected movie index & price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice ', moviePrice);
}


//update total & count
function updateSelectedCount(){
    const  selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
    console.log(seatIndex);
  
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', function(e){
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
     
    updateSelectedCount()
});

container.addEventListener('click', function(e){
    if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    
        updateSelectedCount();
    }
})

//get data from localstorage & populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }


    //for total & count
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex
   }
}

//initial count and total set
updateSelectedCount();