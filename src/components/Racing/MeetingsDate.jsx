// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const MeetingsDate = ({ onDateChange, selectedDate }) => {
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

//   const toggleDatePicker = () => {
//     setIsDatePickerOpen(!isDatePickerOpen);
//   };

//   const handleDateChange = (date) => {
//     console.log('Selected Date:', date); // Log the selected date
//     onDateChange(date);
//     setIsDatePickerOpen(false);
//   };

//   return (
//     <>
//       <div>
//         <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//           Select Event Time
//         </label>
//         <button
//           onClick={toggleDatePicker}
//           className="relative w-full lg:w-auto flex justify-between items-center px-3 py-2 border border-stroke rounded-sm bg-transparent dark:bg-form-input dark:border-form-strokedark text-black dark:text-white"
//         >
//           {selectedDate ? selectedDate.toDateString() : 'Select Date'}
//           <span className="ml-2">&#9660;</span>
//         </button>

//         {isDatePickerOpen && (
//           <div className="absolute z-20 mt-0 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded-sm shadow-lg">
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange} // Use the new handler
//               inline
//               className="text-sm"
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MeetingsDate;
