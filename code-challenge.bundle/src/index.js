
document.addEventListener('DOMContentLoaded', () => {
    // Base URL for API
    const baseURL = 'http://localhost:3000';
  
    // Function to fetch movie details by ID
    const fetchMovieDetails = async (movieId) => {
      try {
        const response = await fetch(`${baseURL}/films/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const movieData = await response.json();
        return movieData;
      } catch (error) {
        console.error(error);
      }
    };function updateTicketCount() {
      document.getElementById('ticket-num').innerText = ticketCount;
    }
  
    // Function to handle buying tickets
    function buyTicket() {
      if (ticketCount > 0) {
        ticketCount--; 
        updateTicketCount();
      } else {
        console.log('sold out.'); 
      }}
    
  
    // Function to update movie details on the UI
    const updateMovieDetails = (movie) => {
      const poster = document.getElementById('poster');
      const title = document.getElementById('title');
      const runtime = document.getElementById('runtime');
      const filmInfo = document.getElementById('film-info');
      const showtime = document.getElementById('showtime');
      const ticketNum = document.getElementById('ticket-num');
      const availableTickets = document.getElementById('available-tickets');
  
      poster.src = movie.poster;
      title.textContent = movie.title;
      runtime.textContent = `${movie.runtime} minutes`;
      filmInfo.textContent = movie.description;
      showtime.textContent = movie.showtime;
      const remainingTickets = movie.capacity - movie.tickets_sold;
      ticketNum.textContent = `${remainingTickets} remaining tickets`;
      availableTickets.textContent = remainingTickets;
    };
  
    // Function to fetch movies and populate the menu
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${baseURL}/films`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const movies = await response.json();
        const filmsList = document.getElementById('films');
        filmsList.innerHTML = '';
        movies.forEach((movie) => {
          const filmItem = document.createElement('li');
          filmItem.classList.add('film', 'item');
          filmItem.textContent = movie.title;
          filmItem.addEventListener('click', async () => {
            const movieData = await fetchMovieDetails(movie.id);
            updateMovieDetails(movieData);
          });
          filmsList.appendChild(filmItem);
        });
        // Load details of the first movie by default
        if (movies.length > 0) {
          const firstMovie = movies[0];
          const movieData = await fetchMovieDetails(firstMovie.id);
          updateMovieDetails(movieData);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Initialize the application
    fetchMovies();
  });
  