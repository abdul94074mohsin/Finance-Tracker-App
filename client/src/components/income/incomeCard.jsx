import { TrendingUp } from 'lucide-react';

export default function IncomeCard({ item }) {
  if (!item) return null; // safety

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-center gap-4">
        
        {/* Icon */}
        <div className="p-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 group-hover:scale-110 transition-transform duration-300">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          
          {/* Title + Amount */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white">
              {item.source}
            </h3>

            <p className="text-2xl font-semibold text-emerald-500">
              ₹{item.amount?.toLocaleString() ?? 0}
            </p>
          </div>

          {/* Date + Category */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {new Date(item.date).toLocaleDateString()}
            </span>

            {item.category && (
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {item.category}
              </span>
            )}
          </div>

          {/* Note */}
          {item.note && (
            <p className="text-sm text-gray-500 mt-2">{item.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
