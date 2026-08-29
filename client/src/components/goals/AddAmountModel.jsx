import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal, getGoal } from "../../feature/goal/goalSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AddAmountModal({ isOpen, onClose, goal }) {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  if (!isOpen || !goal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateGoal({ id: goal._id, amount: Number(amount) }));
    dispatch(getGoal());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="
        relative 
        bg-white/90 dark:bg-gray-900/90 
        backdrop-blur-xl 
        rounded-2xl 
        shadow-[0_8px_30px_rgba(0,0,0,0.2)]
        p-6 
        w-full max-w-sm
        animate-scaleUp
      ">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Add Amount
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Goal: <span className="font-semibold">{goal.title}</span>
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
              Enter Amount
            </label>
            <input
              type="number"
              placeholder="₹ Amount"
              className="
                w-full 
                p-3 
                rounded-xl 
                bg-gray-100 dark:bg-gray-800 
                text-gray-900 dark:text-white 
                border border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500
                transition-all
              "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full py-3 
              rounded-xl 
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white 
              font-semibold 
              shadow-lg shadow-blue-300/30 
              hover:opacity-90 
              transition-all
            "
          >
            Add Amount
          </button>
        </form>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="
            mt-4 w-full py-2 
            rounded-xl 
            border border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 
            hover:bg-gray-200 dark:hover:bg-gray-700 
            transition
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddAmountModal;
