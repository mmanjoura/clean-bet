// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const ControlPanel = () => {
//     const [rangeValue, setRangeValue] = useState(50); 

//     const handleInput = (e) => {
//         setRangeValue(e.target.value);
//     };

//     return (
//         <>
//             <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//                 {/* Optimal Parameter */}
//                 <div className="flex flex-col gap-9">
//                     {/* <!-- Contact Form --> */}
//                     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                         <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex items-center">
//                             {/* Checkbox */}
//                             <input
//                                 type="checkbox"
//                                 id="optimal-parameters-checkbox"
//                                 className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:focus:ring-offset-darkmode dark:border-form-strokedark mr-3"
//                             />
//                             <label
//                                 htmlFor="optimal-parameters-checkbox"
//                                 className="font-medium text-black dark:text-white"
//                             >
//                                 Optimal Parameters
//                             </label>
//                         </div>
//                         <form action="#">
//                             <div className="p-6.5">
//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     {/* Optimal Number of Runs */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             No Runs
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>

//                                     {/* Optimal Number of Years Competing */}
//                                     <div className="w-full xl:w-2/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             No Years Competing
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>

//                                     {/* Optimal Number of Wins */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             No Wins
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>

//                                     {/* Optimal Rating */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Rating
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>

//                                     {/* Optimal Position */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Position
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>

//                                     {/* Optimal Distance */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Distance
//                                         </label>
//                                         <input
//                                             type="text"
//                                             placeholder=""
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Slider */}
//                                 <div className="mt-6">
//                                     <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                         Adjust Range
//                                     </label>
//                                     <input
//                                         type="range"
//                                         min="0"
//                                         max="100"
//                                         className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//                                         style={{
//                                             backgroundImage: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 var(--value), #e5e7eb var(--value), #e5e7eb 100%)'
//                                         }}
//                                         onInput={(e) => {
//                                             e.target.style.setProperty('--value', `${e.target.value}%`);
//                                         }}
//                                     />
//                                 </div>

//                             </div>
//                         </form>
//                     </div>
//                 </div>

//                 {/* Race Type and Distance */}
//                 <div className="flex flex-col gap-9">
//                     {/* Race Type & Distance Form */}
//                     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                         <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex items-center">
//                             {/* Label */}
//                             <label
//                                 htmlFor="race-type-distance"
//                                 className="font-medium text-black dark:text-white flex-grow"
//                             >
//                                 Race Type & Distance
//                             </label>

//                         </div>

//                         <form action="#">
//                             <div className="p-6.5">
//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     {/* Dropdown for Race Type */}
//                                     <div className="w-full xl:w-2/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Race Type
//                                         </label>
//                                         <select
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         >
//                                             <option value="1">FLAT</option>
//                                             <option value="2">CHASE</option>
//                                             <option value="3">HURDLE</option>
//                                         </select>
//                                     </div>

//                                     {/* Dropdown for Miles */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Miles
//                                         </label>
//                                         <select
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         >
//                                             <option value="A">A</option>
//                                             <option value="B">B</option>
//                                             <option value="C">C</option>
//                                             <option value="D">D</option>
//                                         </select>
//                                     </div>

//                                     {/* Dropdown for Furlongs */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Furlongs
//                                         </label>
//                                         <select
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         >
//                                             <option value="1">1st</option>
//                                             <option value="2">2nd</option>
//                                             <option value="3">3rd</option>
//                                             <option value="4">4th</option>
//                                             <option value="5">5th</option>
//                                         </select>
//                                     </div>

//                                     {/* Dropdown for Yards */}
//                                     <div className="w-full xl:w-1/5">
//                                         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                                             Yards
//                                         </label>
//                                         <select
//                                             className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                                         >
//                                             <option value="100m">100m</option>
//                                             <option value="200m">200m</option>
//                                             <option value="400m">400m</option>
//                                             <option value="800m">800m</option>
//                                             <option value="1500m">1500m</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                    {/* PICK Button */}
//                     <Link
//                         href="#"
//                         className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-24"
//                     >
//                         Pick
//                     </Link>
//                             </div>
                            
//                         </form>
                        
//                     </div>
                 
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ControlPanel;
