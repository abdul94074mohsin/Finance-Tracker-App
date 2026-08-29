function QuickActionButton({ label, icon: Icon, onClick, bgColor, textColor }) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all shadow-md hover:shadow-lg`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

export default QuickActionButton;
