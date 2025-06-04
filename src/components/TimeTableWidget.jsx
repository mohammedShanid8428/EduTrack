export default function TimeTableWidget() {
  const schedule = {
    Monday: {
      morning: "To campus",
      afternoon: "Math + notes review",
      evening: "Ballet class",
    },
    Tuesday: {
      morning: "Physics + homework review",
      afternoon: "To campus",
      evening: "English",
    },
    Wednesday: {
      morning: "To campus",
      afternoon: "Physics",
      evening: "Movie night with friends",
    },
    Thursday: {
      morning: "Math",
      afternoon: "To campus",
      evening: "Physics (prepare for lab class)",
    },
    Friday: {
      morning: "To campus",
      afternoon: "English",
      evening: "Doctor's appointment",
    },
  };

  const times = ["morning", "afternoon", "evening"];
  const days = Object.keys(schedule);

  // Subject color mapping
  const subjectColors = {
    "To campus": "bg-blue-100 text-blue-800",
    "Math": "bg-purple-100 text-purple-800",
    "Math + notes review": "bg-purple-100 text-purple-800",
    "Physics": "bg-green-100 text-green-800",
    "Physics + homework review": "bg-green-100 text-green-800",
    "Physics (prepare for lab class)": "bg-green-100 text-green-800",
    "English": "bg-yellow-100 text-yellow-800",
    "Ballet class": "bg-pink-100 text-pink-800",
    "Movie night with friends": "bg-indigo-100 text-indigo-800",
    "Country trip": "bg-teal-100 text-teal-800",
    "Doctor's appointment": "bg-red-100 text-red-800",
  };

  const getSubjectClass = (content) => {
    const clean = content.split(" (")[0]; // clean for matching key
    return `
    inline-flex items-center justify-center 
    min-w-[100px] min-h-[60px]
    text-center px-2 py-1 rounded-md 
    text-sm font-semibold shadow 
    ${subjectColors[clean] || "bg-gray-200 text-gray-800"}
  `;
  };


  return (
    <div className="bg-background dark:bg-background rounded-2xl p-3 shadow-sm overflow-x-auto border border-accent ">
      <h3 className="text-xl font-semibold mb-6 mt-4 text-foreground dark:text-foreground ">
        Weekly Timetable
      </h3>
      <table className="table-fixed w-full border-collapse my-auto">
        <thead>
          <tr>
            <th className="p-1 text-left text-foreground dark:text-foreground w-24 ">Time</th>
            {days.map((day, index) => (
              <th
                key={day}
                className={`p-1 text-left text-white dark:text-black ${index % 2 === 0 ? "bg-primary" : "bg-accent"}`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="p-1 font-medium text-foreground dark:text-foreground capitalize">
                {time}
              </td>
              {days.map((day) => {
                const content = schedule[day][time] || "-";
                return (
                  <td key={`${day}-${time}`} className="p-2">
                    <div className="flex items-center justify-center">
                      {content !== "-" ? (
                        <span className={getSubjectClass(content)}>{content}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>

                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
