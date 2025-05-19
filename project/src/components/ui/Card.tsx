import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle,
  icon, 
  children, 
  className = '', 
  actions 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden ${className}`}>
      {(title || subtitle || icon || actions) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && <div className="text-primary-600 dark:text-primary-400">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;