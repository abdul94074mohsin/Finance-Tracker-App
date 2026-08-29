export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  isAmount = false,
  as = 'input'
}) {
  const Component = as;

  const baseClasses = "w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2";
  const normalClasses = "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20";
  const amountClasses = "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
  const textareaClasses = as === 'textarea' ? 'resize-none' : '';

  let inputClasses = `${baseClasses} ${textareaClasses}`;

  if (error) {
    inputClasses += ` ${errorClasses}`;
  } else if (isAmount) {
    inputClasses += ` ${amountClasses}`;
  } else {
    inputClasses += ` ${normalClasses}`;
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Component
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        rows={as === 'textarea' ? 4 : undefined}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
