import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#1b1b1b] z-50 flex items-center justify-center">
      <div className="text-[#e0e0e0] flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;