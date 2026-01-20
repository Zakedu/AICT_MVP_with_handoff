interface EssentialBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  showLabel?: boolean;
  showDescription?: boolean;
}

export const EssentialBadge = ({
  size = 'medium',
  showLabel = true,
  showDescription = false
}: EssentialBadgeProps) => {
  // Normalize size aliases
  const normalizedSize = size === 'sm' ? 'small' : size === 'md' ? 'medium' : size === 'lg' ? 'large' : size;

  const sizeConfig = {
    small: {
      logo: 'text-lg',
      label: 'text-xs',
      description: 'text-xs',
      gap: 'gap-2'
    },
    medium: {
      logo: 'text-2xl',
      label: 'text-sm',
      description: 'text-xs',
      gap: 'gap-3'
    },
    large: {
      logo: 'text-4xl',
      label: 'text-lg',
      description: 'text-sm',
      gap: 'gap-4'
    }
  };

  const config = sizeConfig[normalizedSize as 'small' | 'medium' | 'large'] || sizeConfig.medium;

  return (
    <div className={`flex items-center ${config.gap}`}>
      {/* AICT Text Logo */}
      <div className="flex items-baseline">
        <span
          className={`${config.logo} font-bold tracking-tight`}
          style={{ color: '#1E3A5F' }}
        >
          AICT
        </span>
        <span
          className={`${config.label} font-medium ml-1`}
          style={{ color: '#C9A227' }}
        >
          ®
        </span>
      </div>

      {/* Label and Description */}
      {showLabel && (
        <div className="flex flex-col border-l-2 pl-3" style={{ borderColor: '#C9A227' }}>
          <div
            className={`${config.label} font-semibold tracking-wide`}
            style={{ color: '#1E3A5F' }}
          >
            Essential
          </div>
          {showDescription && (
            <div
              className={`${config.description} tracking-wide`}
              style={{ color: '#64748B' }}
            >
              AI 활용 기본 역량 인증
            </div>
          )}
        </div>
      )}
    </div>
  );
};
