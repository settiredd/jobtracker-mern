import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function Navbar({ onFilterChange }) {
 const [filterOptions, setFilterOptions] = useState([]);
 const [selectedFilter, setSelectedFilter] = useState("");


 // Fetch filter options dynamically
 useEffect(() => {
   fetch("http://localhost:5050/record/filters/position") // Fetch distinct positions or criteria for filtering
     .then((response) => response.json())
     .then((data) => setFilterOptions(data))
     .catch((error) => console.error("Error fetching filter options:", error));
 }, []);


 // Handle filter change
 const handleFilterChange = (event) => {
   const value = event.target.value;
   setSelectedFilter(value);
   onFilterChange(value); // Pass filter value to the parent component
 };


 return (
   <div>
     <nav className="flex justify-between items-center mb-6">
       <NavLink
         className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
         to="/create"
       >
         Input Application
       </NavLink>


       <div className="flex items-center">
         <label htmlFor="filter" className="mr-2 text-sm font-medium">
           Filter by Position:
         </label>
         <select
           id="filter"
           className="border border-input bg-background rounded-md h-9 px-2 text-sm"
           value={selectedFilter}
           onChange={handleFilterChange}
         >
           <option value="">All</option>
           {filterOptions.map((option) => (
             <option key={option} value={option}>
               {option}
             </option>
           ))}
         </select>
       </div>
     </nav>
   </div>
 );
}




/*
import { NavLink } from "react-router-dom";


export default function Navbar() {
 return (
   <div>
     <nav className="flex justify-between items-center mb-6">


       <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
         Input Application
       </NavLink>
     </nav>
   </div>
 );
}
 */

