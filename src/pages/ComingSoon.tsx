const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-brand-primary/10 rounded-full">
          <svg 
            className="w-16 h-16 text-brand-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Próximamente</h2>
        <p className="text-gray-600 max-w-md">
          Esta sección está en desarrollo. Pronto estará disponible con nuevas funcionalidades.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
