// import React, { useState, useEffect } from 'react';

// // This component displays a random todo from the list of todos, once per day
// function DailyTodo({ todos }) {
//   const [index, setIndex] = useState(0);

//   // // This effect runs once per day only if there is at least one todo

//   useEffect(() => {
//     // Get the current day of the year (between 1 and 365)
//     const dayOfYear = Math.floor(
//       (Date.now() - new Date().setFullYear(new Date().getFullYear(), 0, 0)) /
//         86400000,
//     );

//     // Set the index to a random number based on the current day of the year
//     const newIndex =
//       (Math.floor(Math.random() * todos.length) + dayOfYear) % todos.length;

//     setIndex(newIndex);
//   }, [todos]);

//   return (
//     // if there are no todos, say "Add a todo in the Input page
//     <div>
//       {todos && todos.length === 0
//         ? 'Add a todo in the Input page'
//         : todos[index]}
//     </div>
//   );
// }

// export default DailyTodo;
