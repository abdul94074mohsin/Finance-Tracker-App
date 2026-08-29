import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 🟢 1. getIncome ko import karo
import { addIncomes, getIncome } from "../../feature/income/incomSlice";
import LoadingScreen from "../LoadingScreen";

export default function AddIncome({ handleQuickAction, isIncome }) {
  const { isIncomeError, isIncomeLoading, isIncomeErrorMessage, isIcomeSuccess } =
    useSelector((state) => state.income);
  const dispatch = useDispatch();

  const handleIncome = () => {
    handleQuickAction("income");
  };

  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🟢 2. handleSubmit ko async bana kar await dispatch karo
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API Call complete hone ka wait karein
    await dispatch(addIncomes(formData));

    // Instant data refetch karein (bina page reload ke screen update ho jayegi)
    dispatch(getIncome());

    // Modal close karein
    handleQuickAction("income");

    setFormData({
      source: "",
      amount: "",
      date: "",
    });
  };

  const { source, amount, date } = formData;

  if (isIncomeLoading) {
    return <LoadingScreen loadingMessage="Data adding..." />;
  }

  return (
    <div className="min-h-screen z-2 w-[80%] absolute top-20 left-90 right-5 bg-gradient-to-br p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Income
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SOURCE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income Source
            </label>
            <select
              name="source"
              value={source}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Source</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              name="amount"
              value={amount}
              onChange={handleChange}
              type="number"
              placeholder="₹ 0.00"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              name="date"
              value={date}
              onChange={handleChange}
              type="date"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Income
          </button>
        </form>

        <button
          onClick={handleIncome}
          className="w-full bg-red-600 mt-4 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}