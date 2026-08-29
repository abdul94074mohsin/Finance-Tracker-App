import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addGoals } from '../../feature/goal/goalSlice';

function AddGoalModal({ isOpen, onClose, onAddGoal }) {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    deadlineMonths: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGoals(formData))

   console.log('submited', formData)
    setFormData({
      title: "",
      targetAmount: "",
      deadlineMonths: "",
    });

    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">

        {/* Background */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="
          relative 
          inline-block 
          w-full max-w-lg 
          p-6 my-8 
          overflow-hidden 
          text-left 
          align-middle 
          transition-all 
          transform 
          bg-white dark:bg-gray-900 
          shadow-2xl 
          rounded-2xl
          animate-scaleUp
        ">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Add New Goal
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 transition"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* GOAL TITLE */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
                Goal Title
              </label>
              <input
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 
                  rounded-xl 
                  bg-gray-100 dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition
                "
                placeholder="e.g. Buy iPhone"
              />
            </div>

            {/* TARGET AMOUNT */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
                Target Amount (₹)
              </label>
              <input
                name="targetAmount"
                type="number"
                required
                value={formData.targetAmount}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 
                  rounded-xl 
                  bg-gray-100 dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition
                "
                placeholder="70000"
              />
            </div>

            {/* DEADLINE MONTHS */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
                Deadline (Months)
              </label>
              <input
                name="deadlineMonths"
                type="number"
                required
                value={formData.deadlineMonths}
                onChange={handleChange}
                className="
                  w-full px-4 py-3 
                  rounded-xl 
                  bg-gray-100 dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500
                  transition
                "
                placeholder="12"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1 py-3 
                  rounded-xl 
                  border border-gray-300 dark:border-gray-700 
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-200 dark:hover:bg-gray-700 
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  flex-1 py-3 
                  rounded-xl 
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  text-white 
                  font-semibold 
                  shadow-lg shadow-blue-300/20 
                  hover:opacity-90 
                  transition
                "
              >
                Add Goal
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGoalModal;
