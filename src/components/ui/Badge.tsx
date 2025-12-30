import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
  dot = false,
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-medium rounded-full';

  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-100 text-gray-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const dotColorClasses = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-500',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColorClasses[variant]}`}
        />
      )}
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  active,
  activeText = 'Activo',
  inactiveText = 'Inactivo',
  className = '',
}) => {
  return (
    <Badge
      variant={active ? 'success' : 'error'}
      size="sm"
      dot
      className={className}
    >
      {active ? activeText : inactiveText}
    </Badge>
  );
};
