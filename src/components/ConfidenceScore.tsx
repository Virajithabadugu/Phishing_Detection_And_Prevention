import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceScoreProps {
  score: number;
}

const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Confidence Score</span>
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className={`h-3 rounded-full ${getBarColor(score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      
      <p className="text-xs text-gray-500">
        {score >= 80 ? 'High confidence in assessment' : 
         score >= 60 ? 'Medium confidence in assessment' : 
         'Low confidence - review manually'}
      </p>
    </div>
  );
};

export default ConfidenceScore;