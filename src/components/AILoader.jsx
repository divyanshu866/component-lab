import React, { useEffect, useRef } from "react";

/**
 * ComponentLabLoader React Component
 * Displays a full-screen overlay loader with pulsing auras and text animation.
 * Controls visibility and ARIA attributes via props.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isVisible - Controls the visibility of the loader.
 */
const AILoader = ({ isVisible = true }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loaderRef.current) {
      // Update aria-busy based on visibility for screen readers
      loaderRef.current.setAttribute("aria-busy", isVisible ? "true" : "false");
    }
  }, [isVisible]);

  return (
    <div
      ref={loaderRef}
      className={`component-lab-loader-overlay ${
        isVisible ? "is-loading" : ""
      }`}
      aria-live="assertive"
      role="status"
      // The overlay is initially hidden by opacity 0 and pointer-events: none.
      // The 'is-loading' class makes it visible and interactive.
    >
      <div className="loader-aura loader-aura-1"></div>
      <div className="loader-aura loader-aura-2"></div>
      <p className="loader-text">
        AI is thinking
        <span className="dot-animation">.</span>
        <span className="dot-animation">.</span>
        <span className="dot-animation">.</span>
      </p>
    </div>
  );
};

export default AILoader;

/*
How to use this ComponentLabLoader in a React application:

1. Import the component:
   import ComponentLabLoader from './ComponentLabLoader'; // Adjust path as needed

2. Use it in your parent component, controlling its visibility with state:

   import React, { useState } from 'react';
   import ComponentLabLoader from './ComponentLabLoader';

   function App() {
     const [isLoading, setIsLoading] = useState(false);

     const handleToggleLoader = () => {
       setIsLoading(!isLoading);
     };

     return (
       <div>
         <h1>My Application Content</h1>
         <button onClick={handleToggleLoader} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1001, padding: '10px 20px', backgroundColor: '#8A2BE2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
           {isLoading ? 'Hide Loader' : 'Show Loader'}
         </button>

         <ComponentLabLoader isVisible={isLoading} />
       </div>
     );
   }

   export default App;
*/
