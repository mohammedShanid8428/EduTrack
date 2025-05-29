import { Link } from 'react-router-dom';

const StatCard = ({ label, value }) => {
  return (
    <Link to={`/${label.toLowerCase()}`}>
      <div className="flex-1 min-w-[140px] bg-white dark:bg-gray-700 text-black dark:text-white rounded-2xl shadow-sm px-3 py-6 text-center hover:shadow-md transition">
        <h3 className="text-lg  mb-2  text-gray-600 dark:text-gray-400 font-semibold">{label}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Link>
  );
};

export default StatCard;