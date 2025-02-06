const blogPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/312578/pexels-photo-312578.jpeg",
    title: "Exploring the Serenity of Nature",
    description: "A journey into the heart of lush forests and tranquil landscapes.",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    title: "The Rise of Artificial Intelligence",
    description: "Understanding the impact of AI on our daily lives and future possibilities.",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/7919/pexels-photo.jpg",
    title: "Wanderlust Chronicles: Mountain Adventures",
    description: "Experience breathtaking views from the world's most beautiful peaks.",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    title: "A Culinary Journey Around the World",
    description: "Exploring diverse flavors and traditional dishes from different cultures.",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg",
    title: "The Ultimate Guide to Staying Fit",
    description: "Tips and tricks for maintaining a healthy lifestyle with balanced workouts.",
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/401799/pexels-photo-401799.jpeg",
    title: "Finding Peace by the Ocean",
    description: "How coastal landscapes inspire calmness and self-reflection.",
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg",
    title: "The Power of Reading: Books That Change Lives",
    description: "A collection of must-read books that inspire and educate.",
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg",
    title: "Mastering the Art of Photography",
    description: "Essential techniques to capture stunning photographs.",
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg",
    title: "Building a Startup from Scratch",
    description: "Key steps to launching your own successful business.",
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
    title: "The Science of Mindfulness",
    description: "How meditation and mindfulness improve mental well-being.",
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/2150/flight-sky-earth-space.jpg",
    title: "Exploring the Mysteries of the Universe",
    description: "A deep dive into space exploration and cosmic wonders.",
  },
  {
    id: 12,
    image: "https://images.pexels.com/photos/63329/pexels-photo-63329.jpeg",
    title: "Iconic Architectural Wonders of the World",
    description: "Discover the most stunning architectural masterpieces.",
  },
  {
    id: 13,
    image: "https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg",
    title: "The Evolution of Music Through the Ages",
    description: "Tracing the history and transformation of musical genres.",
  },
  {
    id: 14,
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    title: "The Future of Software Development",
    description: "Emerging trends in coding, programming, and technology.",
  },
  {
    id: 15,
    image: "https://images.pexels.com/photos/458799/pexels-photo-458799.jpeg",
    title: "Why Pets Are Good for Your Mental Health",
    description: "Exploring the emotional benefits of having a pet companion.",
  }
];

export const saveData = ()  => {
  localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
}

