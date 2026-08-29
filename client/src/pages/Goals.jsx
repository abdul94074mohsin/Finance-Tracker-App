// import { useState, useEffect } from 'react';
// import { PlusIcon } from '@heroicons/react/24/outline';
// import GoalCard from '../components/goals/GoalCard';
// import AddGoalModal from '../components/goals/AddGoalModal';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGoal } from '../feature/goal/goalSlice';

// function Goals() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch();

//   const { goals, isGoalsLoading, isGoalsError, goalsMessage } = useSelector(
//     (state) => state.goal
//   );

//   // CALL API ONLY ONCE
//   useEffect(() => {
//     dispatch(getGoal());
//   }, [dispatch]);

//   if (isGoalsLoading) return <p>Loading goals...</p>;
//   if (isGoalsError) return <p className="text-red-600">{goalsMessage}</p>;

//   // FILTER GOALS
//   const activeGoals = goals.filter((goal) => goal.status !== "completed");
//   const completedGoals = goals.filter((goal) => goal.status === "completed");

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Financial Goals
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Track and achieve your financial targets
//           </p>
//         </div>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
//         >
//           <PlusIcon className="h-5 w-5" />
//           Add Goal
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Total Goals
//             </p>
//             <p className="text-3xl font-bold text-gray-900 dark:text-white">
//               {goals.length}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Active Goals
//             </p>
//             <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
//               {activeGoals.length}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//               Completed
//             </p>
//             <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
//               {completedGoals.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ACTIVE GOALS LIST */}
//       {activeGoals.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//             Active Goals
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {activeGoals.map((goal) => (
//               <GoalCard key={goal._id} goal={goal} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* COMPLETED GOALS LIST */}
//       {completedGoals.length > 0 && (
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//             Completed Goals
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {completedGoals.map((goal) => (
//               <GoalCard key={goal._id} goal={goal} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ADD GOAL MODAL */}
//       <AddGoalModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// }

// export default Goals;


import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import GoalCard from '../components/goals/GoalCard';
import AddGoalModal from '../components/goals/AddGoalModal';

import { useDispatch, useSelector } from 'react-redux';
import { getGoal } from '../feature/goal/goalSlice';
import AddAmountModal from '../components/goals/AddAmountModel';
import LoadingScreen from '../components/LoadingScreen';

function Goals() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  const dispatch = useDispatch();

  const { goals, isGoalsLoading, isGoalsError, goalsMessage } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    dispatch(getGoal());
  }, [dispatch]);

  if (isGoalsLoading){
    return(
      <LoadingScreen loadingMessage={'Loading....'}/>
    )
  }
  if (isGoalsError) return <p className="text-red-600">{goalsMessage}</p>;

  const activeGoals = goals.filter((goal) => goal.status !== "completed");
  const completedGoals = goals.filter((goal) => goal.status === "completed");

  // 🟦 CARD CLICK → OPEN AMOUNT MODAL
  const handleCardClick = (goal) => {
    setSelectedGoal(goal);
    setIsAmountModalOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial Goals
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and achieve your financial targets
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
        >
          <PlusIcon className="h-5 w-5" />
          Add Goal
        </button>
      </div>

      {/* ACTIVE GOALS */}
      {activeGoals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Active Goals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGoals.map((goal) => (
              <GoalCard key={goal._id} goal={goal} onClick={() => handleCardClick(goal)} />
            ))}
          </div>
        </div>
      )}

      {/* COMPLETED GOALS */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Completed Goals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedGoals.map((goal) => (
              <GoalCard key={goal._id} goal={goal} onClick={() => handleCardClick(goal)} />
            ))}
          </div>
        </div>
      )}

      {/* ADD NEW GOAL MODAL */}
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* AMOUNT ADD MODAL */}
      <AddAmountModal
        isOpen={isAmountModalOpen}
        onClose={() => setIsAmountModalOpen(false)}
        goal={selectedGoal}
      />
    </div>
  );
}

export default Goals;

