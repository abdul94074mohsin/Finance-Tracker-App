 function LoadingScreen({ loadingMessage = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-xl opacity-20 animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200" />
            <div
              className="absolute w-16 h-16 rounded-full border-2 border-transparent border-t-emerald-500 border-r-blue-500"
              style={{
                animation: 'spin 2s linear infinite',
              }}
            />
            <div
              className="absolute w-12 h-12 rounded-full border-2 border-transparent border-b-indigo-500 border-l-amber-500"
              style={{
                animation: 'spin 3s linear infinite reverse',
              }}
            />
          </div>

          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <div
            className="absolute -bottom-1 -right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: '0.3s' }}
          />
          <div
            className="absolute top-0 -right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"
            style={{ animationDelay: '0.6s' }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xl font-medium text-gray-800 tracking-tight">
            {loadingMessage}
          </p>
          <div className="flex gap-1">
            <div
              className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <div
              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen