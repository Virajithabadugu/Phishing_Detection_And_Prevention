import React from 'react';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SafetyBadgeProps {
  rating: 'Safe' | 'Suspicious' | 'Dangerous';
  size?: 'sm' | 'md' | 'lg';
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ rating, size = 'md' }) => {
  const configs = {
    Safe: {
      icon: Shield,
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    Suspicious: {
      icon: AlertTriangle,
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    Dangerous: {
      icon: XCircle,
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    }
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const config = configs[rating];
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center space-x-2 rounded-full border font-semibold ${config.color} ${config.bgColor} ${config.borderColor} ${sizeClasses[size]}`}
    >
      <Icon className={iconSizes[size]} />
      <span>{rating}</span>
    </motion.div>
  );
};

export default SafetyBadge;