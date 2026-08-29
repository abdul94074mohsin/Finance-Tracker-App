import { Delete, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../feature/expense/expenseSlice';
import { toast } from 'react-toastify';
import LoadingScreen from '../LoadingScreen';

export default function AddExpense({ handleQuickAction }) {

  const dispatch = useDispatch()
  const {  isExpenseError, isExpenseErrorMessage, isExpenseSuccess, isExpenseLoading } = useSelector(state => state.expense)
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: ""
  })

  const { amount, category, date, note } = formData

  const handleExpens = () => {
    handleQuickAction("expense")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
    dispatch(addExpense(formData))
    setFormData({
      amount: "",
      category: "",
      date: "",
      note: ""
    })
    handleExpens()
    
  };

  // useEffect(() => {
  //   if(isExpenseError && isExpenseErrorMessage)
  //     toast.error(isExpenseErrorMessage, {position: "top-center"})
  // }, [isExpenseError, isExpenseErrorMessage])

  if(isExpenseLoading){
    return(
      <LoadingScreen loadingMessage='Data Adding...'/>
    )
  }

  return (
    <div className={` "min-h-screen z-2 w-[80%] absolute top-20 right-30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6" }`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add Expense</h1>
          <p className="text-gray-400 mb-8">Record a new expense entry</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">Amount</label>
                <input
                  name='amount'
                  value={amount}
                  onChange={handleChange}
                  type="number"
                  placeholder="₹ 0.00"
                  className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Source (according to income model enum) */}


            <div>
              <label className="block text-sm font-medium text-white mb-3">Category</label>
              <select name='category' value={category} onChange={handleChange} className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                <option >Select Category</option>
                <option value={"food"}>Food</option>
                <option value={"travel"}>Travel</option>
                <option value={"shopping"}>Shopping</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* ["food", "rent", "emi", "shopping", "travel", "other"] */}


            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">Date</label>
              <input
                name='date'
                value={date}
                onChange={handleChange}
                type="date"
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">Note (Optional)</label>
              <textarea
                name='note'
                value={note}
                onChange={handleChange}
                placeholder="Add any additional details..."
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none h-24"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Add Expense
                </>
              )}
            </button>
          
          </form>
           <button
            onClick={handleExpens}
              disabled={isSubmitting}
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Canceling...
                </>
              ) : (
                <>
                  <Delete className="w-5 h-5" />
                  Cancel
                </>
              )}
            </button>

        </div>
      </div>
    </div>
  );
}
