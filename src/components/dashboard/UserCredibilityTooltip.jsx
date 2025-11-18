import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const UserCredibilityTooltip = ({ credibilityScore, visible, position }) => {
  // Determine credibility level based on score (0-100)
  const getCredibilityLevel = (score) => {
    if (score >= 75) return 'truthful';
    if (score >= 40) return 'mixed';
    return 'unreliable';
  };

  const level = getCredibilityLevel(credibilityScore);

  const levelConfig = {
    truthful: {
      color: 'bg-green-500',
      borderColor: 'border-green-500',
      icon: CheckCircle,
      label: 'Highly Credible',
      description: 'This user consistently posts accurate information.',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50'
    },
    mixed: {
      color: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      icon: AlertTriangle,
      label: 'Mixed Credibility',
      description: 'This user sometimes posts misleading content.',
      textColor: 'text-yellow-700',
      bgLight: 'bg-yellow-50'
    },
    unreliable: {
      color: 'bg-red-500',
      borderColor: 'border-red-500',
      icon: XCircle,
      label: 'Low Credibility',
      description: 'This user frequently posts false or misleading information.',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50'
    }
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  if (!visible) return null;

  return (
    <div
      className="absolute z-50 animate-fade-in"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translateX(-100%) translateX(-12px)'
      }}
    >
      <div className={`w-72 rounded-2xl shadow-2xl border-2 ${config.borderColor} ${config.bgLight} overflow-hidden`}>
        {/* Header with color bar */}
        <div className={`${config.color} p-3 flex items-center gap-3`}>
          <Icon className="w-6 h-6 text-white" />
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">User Credibility</h4>
            <p className="text-white/90 text-xs">{config.label}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white font-bold text-lg">{credibilityScore}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className={`text-sm ${config.textColor} leading-relaxed`}>
            {config.description}
          </p>

          {/* Credibility Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-600">
              <span>Credibility Score</span>
              <span>{credibilityScore}/100</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${config.color} transition-all duration-500`}
                style={{ width: `${credibilityScore}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">Verified</p>
              <p className="text-sm font-bold text-green-600">
                {Math.round(credibilityScore * 0.8)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Flagged</p>
              <p className="text-sm font-bold text-red-600">
                {Math.round((100 - credibilityScore) * 0.5)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Total Posts</p>
              <p className="text-sm font-bold text-gray-700">
                {Math.round(Math.random() * 100 + 50)}
              </p>
            </div>
          </div>
        </div>

        {/* Arrow pointing right */}
        <div
          className={`absolute top-6 -right-2 w-4 h-4 ${config.bgLight} border-r-2 border-t-2 ${config.borderColor} transform rotate-45`}
        />
      </div>
    </div>
  );
};

export default UserCredibilityTooltip;