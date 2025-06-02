// StatCard.jsx
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, icon: Icon, labelColor = "text-gray-600" }) => {
  return (
    <Link to={`/${label.toLowerCase()}`}>
      <div className="flex-1 min-w-[140px] bg-secondary dark:bg-secondary text-foreground dark:text-foreground rounded-2xl shadow-md px-4 py-6 text-center hover:shadow-lg transition">
        {Icon && (
          <div className="flex justify-center mb-1 text-primary dark:text-white">
            <Icon className="h-7 w-8" />
          </div>
        )}
        <h3 className={`text-md mb-1 font-semibold ${labelColor}`}>
          {label}
        </h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Link>
  );
};

export default StatCard;
