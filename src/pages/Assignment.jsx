import {
  CalendarDays,
  Users,
  Clock,
  FolderKanban,
  BookOpen,
  Brain,
  FlaskConical,
  Code2,
  PenTool,
  Lightbulb,
  Timer,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

const statusIcons = {
  "In Queue": <Timer size={18} className="text-green-400" />,
  "On Progress": <Loader2 size={18} className="text-yellow-400 animate-spin" />,
  "Testing": <FlaskConical size={18} className="text-blue-400" />,
  "Completed": <CheckCircle2 size={18} className="text-emerald-400" />,
};

const assignments = {
  "In Queue": [
    {
      title: "UI Prototyping",
      course: "UI/UX Design",
      icon: <PenTool className="text-pink-500" size={18} />,
      due: "05 April 2024",
      status: "Normal",
      submitted: 12,
      pending: 3,
    },
    {
      title: "Intro to Java",
      course: "Computer Science",
      icon: <Code2 className="text-green-400" size={18} />,
      due: "08 April 2024",
      status: "High",
      submitted: 20,
      pending: 5,
    },
    {
      title: "AI Research",
      course: "Artificial Intelligence",
      icon: <Brain className="text-orange-500" size={18} />,
      due: "10 April 2024",
      status: "High",
      submitted: 18,
      pending: 6,
    },
  ],
  "On Progress": [
    {
      title: "Icon Design",
      course: "Graphic Design",
      icon: <BookOpen className="text-purple-500" size={18} />,
      due: "15 March 2024",
      status: "High",
      submitted: 10,
      pending: 6,
    },
    {
      title: "DBMS Queries",
      course: "Database Systems",
      icon: <FolderKanban className="text-yellow-500" size={18} />,
      due: "18 March 2024",
      status: "Medium",
      submitted: 8,
      pending: 4,
    },
  ],
  "Testing": [
    {
      title: "Settings Page",
      course: "Web Development",
      icon: <Code2 className="text-blue-400" size={18} />,
      due: "04 March 2024",
      status: "Low",
      submitted: 14,
      pending: 2,
    },
    {
      title: "AI Concepts",
      course: "Artificial Intelligence",
      icon: <Brain className="text-orange-400" size={18} />,
      due: "06 March 2024",
      status: "Medium",
      submitted: 9,
      pending: 7,
    },
    {
      title: "Lab Simulation",
      course: "Physics Lab",
      icon: <FlaskConical className="text-red-400" size={18} />,
      due: "06 March 2024",
      status: "High",
      submitted: 6,
      pending: 4,
    },
  ],
  "Completed": [
    {
      title: "UI Wireframing",
      course: "UI/UX Design",
      icon: <PenTool className="text-pink-500" size={18} />,
      due: "01 March 2024",
      status: "Normal",
      submitted: 25,
      pending: 0,
    },
    {
      title: "Portfolio Page",
      course: "Web Development",
      icon: <Lightbulb className="text-indigo-400" size={18} />,
      due: "12 March 2024",
      status: "Normal",
      submitted: 21,
      pending: 0,
    },
  ],
};

export default function AssignmentBoard() {
  return (
    <div className="min-h-screen bg-background dark:bg-background text-foreground dark:text-foreground p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        📋 <span className="text-foreground dark:text-foreground">Assignment Board</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(assignments).map(([status, cards]) => (
          <div
            key={status}
            className="bg-background dark:bg-background  rounded-xl shadow-lg p-4 border  dark:border-accent transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              {statusIcons[status]}
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <h3 className="text-lg font-bold">{status}</h3>
            </div>

            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-background dark:bg-background rounded-lg p-4 mb-4 hover:bg-gray-100 transition-all border dark:border-accent "
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-md">{card.title}</div>
                  {card.icon}
                </div>
                <p className="text-sm text-gray-700 dark:text-foreground mt-1">{card.course}</p>
                <div className="flex items-center text-xs gap-2 mt-2  text-foreground dark:text-foreground">
                  <CalendarDays size={14} />
                  <span>{card.due}</span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{card.submitted} submitted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{card.pending} left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
