import { nanoid } from "nanoid";

  export const mockMovieList = {
    status: 0,
    payload: {
      movieDetails: [
        {
          id: nanoid(),
          title: "Inception",
          description: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
          availableSeats: 50,
          bookedSeats: 0,
          showtime: "1 April 2025, 2:50 PM"
        },
        {
          id: nanoid(),
          title: "Captain America: Brave New World",
          description: "After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.",
          availableSeats: 30,
          bookedSeats: 0,
          showtime: "1 April 2025, 5:00 PM"
        },
        {
          id: nanoid(),
          title: "Moana 2",
          description: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
          availableSeats: 45,
          bookedSeats: 0,
          showtime: "7 April 2025, 1:00 PM"
        },
        {
          id: nanoid(),
          title: "The Monkey",
          description: "When twin brothers find a mysterious wind-up monkey, a series of outrageous deaths tear their family apart. Twenty-five years later, the monkey begins a new killing spree forcing the estranged brothers to confront the cursed toy.",
          availableSeats: 50,
          bookedSeats: 0,
          showtime: "1 April 2025, 1:00 PM"
        },
        {
          id: nanoid(),
          title: "Sonic the Hedgehog 3",
          description: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
          availableSeats: 30,
          bookedSeats: 0,
          showtime: "1 April 2025, 4:30 PM"
        },
      ],
      error: null,
    },
    errorMsg: null,
  };