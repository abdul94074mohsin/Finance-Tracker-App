export default function ExpenseSummaryCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
