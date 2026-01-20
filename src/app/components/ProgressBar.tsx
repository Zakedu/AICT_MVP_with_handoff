interface ProgressBarProps {
  current: number;
  total: number;
  partName: string;
}

export const ProgressBar = ({ current, total, partName }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 whitespace-nowrap">{partName}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  );
};
