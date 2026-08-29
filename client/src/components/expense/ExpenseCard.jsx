import { ShoppingBag, Utensils, Plane, FileText, Pill, MoreVertical } from 'lucide-react';

const categoryIcons = {
  food: Utensils,
  travel: Plane,
  shopping: ShoppingBag,
  bills: FileText,
  medicine: Pill,
  other: MoreVertical
};

export default function ExpenseCard({ expense }) {
  const IconComponent = categoryIcons[expense.category] || MoreVertical;

  const categoryColors = {
    food: 'from-orange-400 to-orange-600',
    travel: 'from-blue-400 to-blue-600',
    shopping: 'from-pink-400 to-pink-600',
    bills: 'from-yellow-400 to-yellow-600',
    medicine: 'from-red-400 to-red-600',
    other: 'from-gray-400 to-gray-600'
  };

  const categoryTextColors = {
    food: 'text-orange-500',
    travel: 'text-blue-500',
    shopping: 'text-pink-500',
    bills: 'text-yellow-500',
    medicine: 'text-red-500',
    other: 'text-gray-500'
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-gradient-to-br ${categoryColors[expense.category] || categoryColors.other} group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white capitalize">{expense.category}</h3>
            <p className="text-2xl font-semibold text-red-500">₹{expense.amount.toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{new Date(expense.date).toISOString().split("T")[0]}</span>
            {expense.note && (
              <span className={`text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30`}>
                {expense.note}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
