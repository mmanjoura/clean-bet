import React from 'react';

const RunnerDetails = ({
    runner,
    isChecked,
    handleCheckboxChange,
    handleToggle,
    index,
    expandedRow,
    isHandicapRace,
    raceType,
    totalFurlongs
}) => {
    return (
        <div className={`flex flex-nowrap items-center`}>
            {runner?.win_lose?.position !== 0 && (
                <div
                    className={`flex items-center justify-left p-2.5 xl:p-5 flex-shrink-0 w-12 ${[1, 2, 3].includes(runner.win_lose.position) ? 'text-meta-7' : ''}`}
                >
                    <p className={`${['1', '2', '3'].includes(runner.win_lose.position) ? 'text-meta-3' : ''}`}>
                        {['1', '2', '3'].includes(runner.win_lose.position) ? runner.win_lose.position : ''}
                    </p>
                </div>
            )}
            <div className="flex items-center justify-left p-2.5 xl:p-5 flex-shrink-0 w-12">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(runner?.selection_name)}
                    className="mr-2"
                />

                <button onClick={() => handleToggle(index)}>
                    {expandedRow === index ? "-" : "+"}
                </button>
            </div>

            <div className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-50 ${isChecked ? "line-through text-red-500" : ""}`}>
     
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && parseInt(runner?.age) > 7
                            ? 'text-meta-1' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && parseInt(runner?.age) > 6
                                ? 'text-meta-1' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && parseInt(runner?.age) > 6
                                    ? 'text-meta-1' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && parseInt(runner?.age) >= 5
                                        ? 'text-meta-1' // Style for Condition 4
                                        : 'text-meta-3' // Default Style if no conditions match
                        }
                            `}
                >
                    {runner?.selection_name + " (" + runner?.age.split(" ")[0] + ")"}
                    </p>

            </div>

            <div className={`flex items-left justify-left p-2.5 xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && runner?.recovery_days > 24
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && runner?.recovery_days > 24
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && runner?.recovery_days > 20
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && runner?.recovery_days >= 15
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >
                    {runner?.recovery_days.toFixed(2)}
                </p>
            </div>

            <div className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && runner?.num_runs.toFixed(2) < 20
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && runner?.num_runs.toFixed(2) < 15
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && runner?.num_runs.toFixed(2) < 10
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && runner?.num_runs.toFixed(2) < 10
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >

                    {runner?.num_runs.toFixed(2)}

                </p>
            </div>
            <div className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && runner?.avg_position.toFixed(2) < 5.5
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && runner?.avg_position.toFixed(2) < 5.5
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && runner?.avg_position.toFixed(2) < 4.5
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && runner?.avg_position.toFixed(2) < 4.5
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >

                    {runner?.avg_position.toFixed(2)}

                </p>
            </div>
            <div className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && (runner?.avg_distance_furlongs.toFixed(2) % totalFurlongs) < 2
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && (runner?.avg_distance_furlongs.toFixed(2) % totalFurlongs) < 2
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && (runner?.avg_distance_furlongs.toFixed(2) % totalFurlongs) < 2
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && (runner?.avg_distance_furlongs.toFixed(2) % totalFurlongs) < 2
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >
                    {runner?.avg_distance_furlongs.toFixed(2)}
                </p>
            </div>
            <div className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && runner?.avg_rating.toFixed(2) > 50
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && runner?.avg_rating.toFixed(2) > 30
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && runner?.avg_rating.toFixed(2) > 40
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && runner?.avg_rating.toFixed(2) > 30
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >
                    {runner?.avg_rating.toFixed(2)}
                </p>
            </div>
            <div className={`hidden flex items-left justify-left p-2.5 sm:flex xl:p-5 flex-shrink-0 w-35 ${isChecked ? "line-through text-red-500" : ""}`}>
                <p
                    className={`
                                ${isHandicapRace && raceType === 'HURDLE' && runner?.avg_odds.toFixed(2) <= 25.5
                            ? 'text-meta-3' // Style for Condition 1
                            : isHandicapRace && raceType === 'FLAT' && runner?.avg_odds.toFixed(2) <= 25.5
                                ? 'text-meta-3' // Style for Condition 2
                                : !isHandicapRace && raceType === 'HURDLE' && runner?.avg_odds.toFixed(2) <= 25.5
                                    ? 'text-meta-3' // Style for Condition 3
                                    : !isHandicapRace && raceType === 'FLAT' && runner?.avg_odds.toFixed(2) <= 25.5
                                        ? 'text-meta-3' // Style for Condition 4
                                        : 'text-meta-7' // Default Style if no conditions match
                        }
                            `}
                >
                    {runner?.avg_odds.toFixed(2)}

                </p>
            </div>
        </div>
    );
};

export default RunnerDetails;
