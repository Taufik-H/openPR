function findMovies(favoriteGenre) {
  const movies = [
    {
      id: 1,
      name: "Avengers end game",
      genre: "Action",
      soldTicket: 149,
      capacity: 150,
    },
    {
      id: 2,
      name: "La la Land",
      genre: "Romance",
      soldTicket: 20,
      capacity: 75,
    },
    {
      id: 3,
      name: "Beauty and the Beast",
      genre: "Romance",
      soldTicket: 50,
      capacity: 50,
    },
    {
      id: 4,
      name: "Superman vs Batman",
      genre: "Action",
      soldTicket: 150,
      capacity: 250,
    },
    {
      id: 5,
      name: "Transformer",
      genre: "Action",
      soldTicket: 90,
      capacity: 90,
    },
    {
      id: 6,
      name: "5 feet apart",
      genre: "Romance",
      soldTicket: 25,
      capacity: 45,
    },
    {
      id: 7,
      name: "Hamilton",
      genre: "Musical",
      soldTicket: 295,
      capacity: 300,
    },
    {
      id: 8,
      name: "Dear Evan Hansen",
      genre: "Musical",
      soldTicket: 150,
      capacity: 200,
    },
    {
      id: 9,
      name: "Conjuring",
      genre: "Horror",
      soldTicket: 30,
      capacity: 100,
    },
    {
      id: 10,
      name: "Annabelle",
      genre: "Horror",
      soldTicket: 10,
      capacity: 30,
    },
    {
      id: 11,
      name: "Fast and Furios",
      genre: "Action",
      soldTicket: 25,
      capacity: 40,
    },
    {
      id: 12,
      name: "Romeo and Julet",
      genre: "Romance",
      soldTicket: 15,
      capacity: 15,
    },
    {
      id: 13,
      name: "Wicked",
      genre: "Musical",
      soldTicket: 75,
      capacity: 75,
    },
  ];
  let arrResult = [];
  for (let i = 0; i < favoriteGenre.length; i++) {
    let newGenre = favoriteGenre[i];
    for (let j = 0; j < movies.length; j++) {
      if (newGenre === movies[j].genre) {
        arrResult.push(movies[j]);
      }
    }
  }
  return arrResult;
}

function findTicketAvailability(movie, user) {
  let arrResult = [];
  for (let j = 0; j < user.favoriteGenre.length; j++) {
    let checkFav = user.favoriteGenre[j];
    if (Array.isArray(movie)) {
      for (let i = 0; i < movie.length; i++) {
        let checkTiket = movie[i].capacity - movie[i].soldTicket;

        if (movie[i].genre === checkFav && checkTiket >= user.ticket) {
          return true;
        } else if (movie[i].genre === checkFav && checkTiket < user.ticket) {
          return false;
        }
      }
    } else {
      let checkTiket = movie.capacity - movie.soldTicket;
      if (movie.genre === checkFav && checkTiket >= user.ticket) {
        return true;
      } else if (movie.genre === checkFav && checkTiket < user.ticket) {
        return false;
      }
    }
  }
}

function findRecommendation(user) {
  let arrRecomen = [];

  let sendFavMovie = user.favoriteGenre;
  let findFilm = findMovies(sendFavMovie);

  for (let j = 0; j < user.favoriteGenre.length; j++) {
    let checkFav = user.favoriteGenre[j];
    for (let i = 0; i < findFilm.length; i++) {
      let checkTiket = findFilm[i].capacity - findFilm[i].soldTicket;

      if (findFilm[i].genre === checkFav && checkTiket >= user.ticket) {
        arrRecomen.push(findFilm[i]);
      } else if (findFilm[i].genre === checkFav && checkTiket < user.ticket) {
        continue;
      }
    }
  }
  return arrRecomen;
}

function generateRecommendation(user) {
  let getRecomend = findRecommendation(user);
  if (getRecomend.length === 0) {
    return `Tidak ada film yang sesuai kriteria`;
  } else {
    for (let i = 0; i < getRecomend.length; i++) {
      delete getRecomend[i].capacity;
      delete getRecomend[i].soldTicket;
      if (getRecomend[i].genre === "Action") {
        let lastPrice = user.ticket * 100000;

        getRecomend[i].totalPrice = lastPrice;
      } else if (getRecomend[i].genre === "Musical") {
        let lastPrice = user.ticket * 80000;

        getRecomend[i].totalPrice = lastPrice;
      } else if (getRecomend[i].genre === "Romance") {
        let lastPrice = user.ticket * 40000;

        getRecomend[i].totalPrice = lastPrice;
      } else if (getRecomend[i].genre === "Horror") {
        let lastPrice = user.ticket * 75000;

        getRecomend[i].totalPrice = lastPrice;
      }
    }
  }

  return getRecomend;
}

let user1 = {
  name: "Djalal",
  ticket: 20,
  favoriteGenre: ["Musical", "Romance"],
};

let user2 = {
  name: "Djarot",
  ticket: 10,
  favoriteGenre: ["Action", "Musical"],
};

let user3 = {
  name: "Afis",
  ticket: 1,
  favoriteGenre: ["Sci Fi", "Documentary", "Thriller"],
};
let movie = {
  id: 7,
  name: "Dear Evan Hansen",
  genre: "Musical",
  soldTicket: 150,
  capacity: 200,
};
let result1 = [
  {
    id: 8,
    name: "Dear Evan Hansen",
    genre: "Musical",
    soldTicket: 150,
    capacity: 200,
  },
  {
    id: 2,
    name: "La la Land",
    genre: "Romance",
    soldTicket: 20,
    capacity: 75,
  },
  {
    id: 6,
    name: "5 feet apart",
    genre: "Romance",
    soldTicket: 25,
    capacity: 45,
  },
];

// console.log(generateRecommendation(user1));
// console.log(generateRecommendation(user2));
// console.log(generateRecommendation(user3));
// console.log(findMovies(["Action", "Musical"]));
// console.log(findMovies(["Action", "Musical", "Romance", "Horror"]));
console.log(findTicketAvailability(result1, user1));
console.log(findTicketAvailability(movie, user2));
// console.log(findRecommendation(user1));
// console.log(findRecommendation(user2));
module.exports = {
  findMovies,
  findTicketAvailability,
  findRecommendation,
  generateRecommendation,
};
