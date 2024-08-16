// TimeSelection.jsx
import React from 'react';

export default function TimeSelection({ selectedTime, selectedMeetingTime, handleTimeClick }) {
  return (

    <table className="flex flex-col">
      <tbody>
        <tr className="flex flex-col md:flex-row md:items-center">
          {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
            <td key={index} className="px-2 py-1">
              <a
                href="#"
                className={`block px-2 py-1 rounded ${time === selectedTime
                    ? 'bg-[#2b96f0] text-white' // Use the custom blue color when selected
                    : 'bg-blue-100 text-[#2b96f0] hover:bg-blue-200' // Use the custom blue color for text and maintain hover effect
                  }`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </a>
            </td>

          ))}
        </tr>
      </tbody>
    </table>

  );
}
