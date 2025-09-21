export const subjects = [
  { id: 'dsa', name: 'DSA', color: 'bg-pink-100 text-pink-700' },
  { id: 'dbms', name: 'DBMS', color: 'bg-blue-100 text-blue-700' },
  { id: 'os', name: 'OS', color: 'bg-green-100 text-green-700' },
  { id: 'cn', name: 'CN', color: 'bg-purple-100 text-purple-700' },
  { id: 'aiml', name: 'AI/ML', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'maths', name: 'Maths', color: 'bg-indigo-100 text-indigo-700' }
];

export const sampleNotes = [
  {
    id: 1,
    title: "Binary Search Trees",
    description: "Complete guide to BST operations and implementations",
    subject: "dsa",
    
    downloadCount: 234,
    type: 'pdf',
  },
  {
    id: 2,
    title: "Database Normalization",
    description: "1NF, 2NF, 3NF and BCNF with examples",
    subject: "dbms",
    
    downloadCount: 189,
    type: 'text',
  },
  // ... other notes
];

export const sampleProjects = [
  {
    id: 1,
    title: "Smart Library Management System",
    description: "A web-based library management system with features like book tracking, student records, and automated fine calculation.",
    tags: ["Full Stack", "Database", "Web Dev"],
    author: "Anonymous Student",
    difficulty: "Intermediate"
  },
  // ... other projects
];

export const sampleFlashcards = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    answer: "O(log n) - Binary search eliminates half of the search space in each iteration."
  },
  {
    id: 2,
    question: "What does ACID stand for in database systems?",
    answer: "Atomicity, Consistency, Isolation, Durability - These are the four properties that guarantee database transactions are processed reliably."
  },
  // ... other flashcards
];