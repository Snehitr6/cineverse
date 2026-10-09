import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext(null);

const poster = (path) =>
  `https://image.tmdb.org/t/p/w500${path}`;

const backdrop = (path) =>
  `https://image.tmdb.org/t/p/original${path}`;

export const movies = [
  // FEATURED MOVIES
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    type: "Movie",
    year: 2024,
    rating: 8.5,
    match: 98,
    duration: "2h 46m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    poster: poster("/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"),
    backdrop: backdrop("/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"),
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    director: "Denis Villeneuve",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    type: "Movie",
    year: 2023,
    rating: 8.3,
    match: 96,
    duration: "3h 00m",
    genre: ["Drama", "History", "Thriller"],
    poster: poster("/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"),
    backdrop: backdrop("/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg"),
    description:
      "The story of J. Robert Oppenheimer and the scientific race that changed the world forever.",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    director: "Christopher Nolan",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    type: "Movie",
    year: 2014,
    rating: 8.7,
    match: 99,
    duration: "2h 49m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    poster: poster("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),
    backdrop: backdrop("/xJHokMbljvjADYdit5fK5VQsXEG.jpg"),
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
  },
  {
    id: "the-batman",
    title: "The Batman",
    type: "Movie",
    year: 2022,
    rating: 7.8,
    match: 94,
    duration: "2h 56m",
    genre: ["Action", "Crime", "Mystery"],
    poster: poster("/74xTEgt7R36Fpooo50r9T25onhq.jpg"),
    backdrop: backdrop("/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg"),
    description:
      "Batman investigates corruption in Gotham City while pursuing a mysterious killer targeting its elite.",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    director: "Matt Reeves",
  },
  {
    id: "spider-man-across",
    title: "Spider-Man: Across the Spider-Verse",
    type: "Movie",
    year: 2023,
    rating: 8.6,
    match: 98,
    duration: "2h 20m",
    genre: ["Animation", "Action", "Adventure"],
    poster: poster("/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"),
    backdrop: backdrop("/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg"),
    description:
      "Miles Morales journeys across the multiverse and meets a team of Spider-People protecting its existence.",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    director: "Joaquim Dos Santos",
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    type: "Movie",
    year: 2022,
    rating: 8.2,
    match: 95,
    duration: "2h 11m",
    genre: ["Action", "Drama"],
    poster: poster("/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"),
    backdrop: backdrop("/odJ4hx6g6vBt4lBW7lBqzq1F6M5.jpg"),
    description:
      "Maverick returns to train a new generation of elite pilots for an almost impossible mission.",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    director: "Joseph Kosinski",
  },
  {
    id: "guardians-galaxy-three",
    title: "Guardians of the Galaxy Vol. 3",
    type: "Movie",
    year: 2023,
    rating: 7.9,
    match: 93,
    duration: "2h 30m",
    genre: ["Sci-Fi", "Action", "Comedy"],
    poster: poster("/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"),
    backdrop: backdrop("/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg"),
    description:
      "The Guardians embark on a dangerous mission to protect one of their own and save their found family.",
    cast: ["Chris Pratt", "Zoe Saldaña", "Dave Bautista"],
    director: "James Gunn",
  },
  {
    id: "john-wick-four",
    title: "John Wick: Chapter 4",
    type: "Movie",
    year: 2023,
    rating: 7.7,
    match: 92,
    duration: "2h 49m",
    genre: ["Action", "Thriller", "Crime"],
    poster: poster("/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"),
    backdrop: backdrop("/h8gHn0OzBoaefsYseUByqsmEDMY.jpg"),
    description:
      "John Wick fights his way through a global network of assassins in search of a path to freedom.",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    director: "Chad Stahelski",
  },
  {
    id: "the-matrix",
    title: "The Matrix",
    type: "Movie",
    year: 1999,
    rating: 8.2,
    match: 97,
    duration: "2h 16m",
    genre: ["Sci-Fi", "Action"],
    poster: poster("/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"),
    backdrop: backdrop("/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg"),
    description:
      "A computer programmer discovers the shocking truth about reality and joins a rebellion against its controllers.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "Lana Wachowski",
  },
  {
    id: "the-martian",
    title: "The Martian",
    type: "Movie",
    year: 2015,
    rating: 8.0,
    match: 94,
    duration: "2h 21m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    poster: poster("/5aGhaIHYuQbqlHWvWYqMCnj40y2.jpg"),
    backdrop: backdrop("/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"),
    description:
      "An astronaut stranded on Mars uses science, ingenuity, and determination to survive until rescue.",
    cast: ["Matt Damon", "Jessica Chastain", "Chiwetel Ejiofor"],
    director: "Ridley Scott",
  },
  {
    id: "inception",
    title: "Inception",
    type: "Movie",
    year: 2010,
    rating: 8.4,
    match: 98,
    duration: "2h 28m",
    genre: ["Sci-Fi", "Action", "Thriller"],
    poster: poster("/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"),
    backdrop: backdrop("/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"),
    description:
      "A skilled thief who steals secrets from dreams is offered a chance to erase his past through one impossible job.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Christopher Nolan",
  },
  {
    id: "avatar-way-water",
    title: "Avatar: The Way of Water",
    type: "Movie",
    year: 2022,
    rating: 7.6,
    match: 91,
    duration: "3h 12m",
    genre: ["Sci-Fi", "Adventure", "Fantasy"],
    poster: poster("/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"),
    backdrop: backdrop("/8rpDcsfLJypbO6vREc0547VKqEv.jpg"),
    description:
      "Jake Sully and Neytiri protect their family as a new threat forces them to seek refuge among Pandora's ocean clans.",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver"],
    director: "James Cameron",
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    type: "Movie",
    year: 2024,
    rating: 7.5,
    match: 95,
    duration: "2h 08m",
    genre: ["Action", "Comedy", "Sci-Fi"],
    poster: poster("/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"),
    backdrop: backdrop("/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"),
    description:
      "Deadpool recruits a reluctant Wolverine for a chaotic multiverse adventure that could change everything.",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    director: "Shawn Levy",
  },
  {
    id: "inside-out-two",
    title: "Inside Out 2",
    type: "Movie",
    year: 2024,
    rating: 7.6,
    match: 93,
    duration: "1h 36m",
    genre: ["Animation", "Comedy", "Family"],
    poster: poster("/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg"),
    backdrop: backdrop("/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg"),
    description:
      "Riley enters her teenage years as new emotions arrive and turn her inner world upside down.",
    cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman"],
    director: "Kelsey Mann",
  },
  {
    id: "the-super-mario-bros",
    title: "The Super Mario Bros. Movie",
    type: "Movie",
    year: 2023,
    rating: 7.0,
    match: 90,
    duration: "1h 32m",
    genre: ["Animation", "Adventure", "Family"],
    poster: poster("/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"),
    backdrop: backdrop("/2klQ1z1fcHGgQPevbEQdkCnzyuS.jpg"),
    description:
      "Two plumber brothers are pulled into a colorful world where an unexpected adventure begins.",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Charlie Day"],
    director: "Aaron Horvath",
  },
  {
    id: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    type: "Movie",
    year: 1994,
    rating: 8.7,
    match: 99,
    duration: "2h 22m",
    genre: ["Drama"],
    poster: poster("/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"),
    backdrop: backdrop("/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg"),
    description:
      "An imprisoned banker forms an unlikely friendship and quietly holds on to hope over decades behind bars.",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    director: "Frank Darabont",
  },
  {
    id: "puss-in-boots-last-wish",
    title: "Puss in Boots: The Last Wish",
    type: "Movie",
    year: 2022,
    rating: 8.0,
    match: 94,
    duration: "1h 42m",
    genre: ["Animation", "Adventure", "Comedy"],
    poster: poster("/kuf6dutpsT0vSVehic3EZIqkOBt.jpg"),
    backdrop: backdrop("/v2LilmCylr3bL9TCZSj6syjowZh.jpg"),
    description:
      "Puss in Boots sets out on an adventure to find a mythical wish and restore his lost nine lives.",
    cast: ["Antonio Banderas", "Salma Hayek", "Harvey Guillén"],
    director: "Joel Crawford",
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    type: "Movie",
    year: 2022,
    rating: 7.7,
    match: 92,
    duration: "2h 19m",
    genre: ["Sci-Fi", "Adventure", "Comedy"],
    poster: poster("/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg"),
    backdrop: backdrop("/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg"),
    description:
      "An overwhelmed laundromat owner discovers she must connect with alternate versions of herself to save the multiverse.",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    director: "Daniel Kwan",
  },

  // SERIES
  {
    id: "stranger-things",
    title: "Stranger Things",
    type: "Series",
    year: 2016,
    rating: 8.6,
    match: 99,
    duration: "5 Seasons",
    genre: ["Sci-Fi", "Mystery", "Drama"],
    poster: poster("/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"),
    backdrop: backdrop("/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"),
    description:
      "A group of friends in a small town uncover supernatural mysteries, secret experiments, and a dangerous alternate dimension.",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
    director: "The Duffer Brothers",
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    type: "Series",
    year: 2008,
    rating: 9.5,
    match: 99,
    duration: "5 Seasons",
    genre: ["Crime", "Drama", "Thriller"],
    poster: poster("/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg"),
    backdrop: backdrop("/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg"),
    description:
      "A chemistry teacher facing a terminal diagnosis enters the criminal world and transforms into a dangerous drug kingpin.",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    director: "Vince Gilligan",
  },
  {
    id: "the-last-of-us",
    title: "The Last of Us",
    type: "Series",
    year: 2023,
    rating: 8.6,
    match: 97,
    duration: "2 Seasons",
    genre: ["Drama", "Action", "Sci-Fi"],
    poster: poster("/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg"),
    backdrop: backdrop("/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"),
    description:
      "A hardened survivor escorts a teenager across a dangerous post-apocalyptic world.",
    cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna"],
    director: "Craig Mazin",
  },
  {
    id: "the-mandalorian",
    title: "The Mandalorian",
    type: "Series",
    year: 2019,
    rating: 8.6,
    match: 96,
    duration: "3 Seasons",
    genre: ["Sci-Fi", "Action", "Adventure"],
    poster: poster("/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"),
    backdrop: backdrop("/9ijMGlJKqcslswWUzTEwScm82Gs.jpg"),
    description:
      "A lone bounty hunter travels the outer reaches of the galaxy and protects a mysterious young companion.",
    cast: ["Pedro Pascal", "Katee Sackhoff", "Carl Weathers"],
    director: "Jon Favreau",
  },
  {
    id: "the-boys",
    title: "The Boys",
    type: "Series",
    year: 2019,
    rating: 8.6,
    match: 95,
    duration: "4 Seasons",
    genre: ["Action", "Drama", "Comedy"],
    poster: poster("/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg"),
    backdrop: backdrop("/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg"),
    description:
      "A group of vigilantes takes on powerful superheroes who hide their corruption behind celebrity status.",
    cast: ["Karl Urban", "Jack Quaid", "Antony Starr"],
    director: "Eric Kripke",
  },
  {
    id: "the-witcher",
    title: "The Witcher",
    type: "Series",
    year: 2019,
    rating: 7.9,
    match: 93,
    duration: "3 Seasons",
    genre: ["Fantasy", "Adventure", "Drama"],
    poster: poster("/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg"),
    backdrop: backdrop("/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg"),
    description:
      "A solitary monster hunter navigates a dangerous world where people can prove more wicked than beasts.",
    cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
    director: "Lauren Schmidt Hissrich",
  },
  {
    id: "wednesday",
    title: "Wednesday",
    type: "Series",
    year: 2022,
    rating: 8.0,
    match: 95,
    duration: "2 Seasons",
    genre: ["Mystery", "Comedy", "Fantasy"],
    poster: poster("/9PFonBhy4cQy7Jz20NpMygczOkv.jpg"),
    backdrop: backdrop("/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg"),
    description:
      "Wednesday Addams investigates a string of mysteries at her new school while discovering her own unusual abilities.",
    cast: ["Jenna Ortega", "Emma Myers", "Catherine Zeta-Jones"],
    director: "Alfred Gough",
  },
  {
    id: "dark",
    title: "Dark",
    type: "Series",
    year: 2017,
    rating: 8.7,
    match: 97,
    duration: "3 Seasons",
    genre: ["Mystery", "Sci-Fi", "Thriller"],
    poster: poster("/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg"),
    backdrop: backdrop("/5LoHuHWA4H8jElFlZDvsmU2n63b.jpg"),
    description:
      "A child's disappearance exposes the tangled secrets of four families across generations in a small German town.",
    cast: ["Louis Hofmann", "Lisa Vicari", "Andreas Pietschmann"],
    director: "Baran bo Odar",
  },
  {
    id: "squid-game",
    title: "Squid Game",
    type: "Series",
    year: 2021,
    rating: 8.0,
    match: 96,
    duration: "3 Seasons",
    genre: ["Thriller", "Drama", "Mystery"],
    poster: poster("/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg"),
    backdrop: backdrop("/qw3J9cNeLioOLoR68WX7z79aCdK.jpg"),
    description:
      "People facing overwhelming debt compete in deadly versions of childhood games for an enormous cash prize.",
    cast: ["Lee Jung-jae", "Lee Byung-hun", "Wi Ha-jun"],
    director: "Hwang Dong-hyuk",
  },
  {
    id: "one-piece",
    title: "ONE PIECE",
    type: "Series",
    year: 2023,
    rating: 8.3,
    match: 94,
    duration: "2 Seasons",
    genre: ["Adventure", "Fantasy", "Action"],
    poster: poster("/rVX05xRKS5JhEYQFObCi4lAnZT4.jpg"),
    backdrop: backdrop("/zM5a8n4uU7J6k7s0x9xYJ3g8W8.jpg"),
    description:
      "A young pirate and his crew set sail in search of the legendary treasure that could make him the King of the Pirates.",
    cast: ["Iñaki Godoy", "Emily Rudd", "Mackenyu"],
    director: "Matt Owens",
  },
  {
    id: "the-office",
    title: "The Office",
    type: "Series",
    year: 2005,
    rating: 9.0,
    match: 97,
    duration: "9 Seasons",
    genre: ["Comedy"],
    poster: poster("/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg"),
    backdrop: backdrop("/7z7mt3Yf8k9X8dZ0v0g3z8V3z3.jpg"),
    description:
      "The everyday lives of office employees become a hilarious documentary about awkward bosses, friendships, and workplace chaos.",
    cast: ["Steve Carell", "John Krasinski", "Jenna Fischer"],
    director: "Greg Daniels",
  },
  {
    id: "peaky-blinders",
    title: "Peaky Blinders",
    type: "Series",
    year: 2013,
    rating: 8.7,
    match: 96,
    duration: "6 Seasons",
    genre: ["Crime", "Drama", "History"],
    poster: poster("/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg"),
    backdrop: backdrop("/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg"),
    description:
      "A ruthless gang leader expands his criminal empire in post-war Birmingham while facing dangerous rivals.",
    cast: ["Cillian Murphy", "Paul Anderson", "Helen McCrory"],
    director: "Steven Knight",
  },
  {
    id: "money-heist",
    title: "Money Heist",
    type: "Series",
    year: 2017,
    rating: 8.2,
    match: 95,
    duration: "5 Parts",
    genre: ["Crime", "Thriller", "Drama"],
    poster: poster("/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg"),
    backdrop: backdrop("/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg"),
    description:
      "A criminal mastermind recruits a team of specialists for carefully planned heists with enormous stakes.",
    cast: ["Úrsula Corberó", "Álvaro Morte", "Pedro Alonso"],
    director: "Álex Pina",
  },
];

export function AppProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("cineverse-theme") !== "light";
    } catch {
      return true;
    }
  });

  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cineverse-watchlist") || "[]");
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";

    try {
      localStorage.setItem("cineverse-theme", dark ? "dark" : "light");
    } catch {
      // Continue if browser storage is unavailable.
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem("cineverse-watchlist", JSON.stringify(watchlist));
    } catch {
      // Continue if browser storage is unavailable.
    }
  }, [watchlist]);

  function toggleWatchlist(id) {
    const key = String(id);

    setWatchlist((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  const value = {
    movies,
    dark,
    setDark,
    watchlist,
    toggleWatchlist,
    search,
    setSearch,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}