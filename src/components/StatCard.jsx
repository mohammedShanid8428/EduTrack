export default function StatCard({ label, value = '--', onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 min-w-[140px] bg-white rounded-2xl shadow-sm px-3 py-6 text-center hover:shadow-md transition"
    >
      <p className="text-lg  mb-2  text-gray-500  font-semibold">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </button>
  );
}
