import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  className = '',
  fullScreen = false,
  text,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeClasses[size]} border-3 border-brand-primary border-t-transparent rounded-full animate-spin ${className}`}
        role="status"
        aria-label="Cargando"
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

interface LoaderOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
}

export const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  isLoading,
  children,
  text,
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <Loader size="lg" text={text} />
        </div>
      )}
    </div>
  );
};

export const SpinnerIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
