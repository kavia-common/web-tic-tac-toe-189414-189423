import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button variants and sizes enums exported for reuse across the app.
 */
// PUBLIC_INTERFACE
export const ButtonVariants = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
});

// PUBLIC_INTERFACE
export const ButtonSizes = Object.freeze({
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
});

/**
 * Inline styles computed per props to keep this component framework-agnostic and
 * aligned with the provided light theme:
 * - primary:  #3b82f6
 * - secondary:#64748b
 * - success:  #06b6d4
 * - danger:   #EF4444
 * - background:#f9fafb
 * - surface:  #ffffff
 * - text:     #111827
 *
 * Hover/focus and disabled states included.
 */

// PUBLIC_INTERFACE
function Button({
  variant,
  size,
  disabled,
  onClick,
  type,
  fullWidth,
  className,
  children,
  ...rest
}) {
  const palette = {
    primary: { base: '#3b82f6', hover: '#2563eb', contrast: '#ffffff', focus: '#93c5fd' },
    secondary: { base: '#64748b', hover: '#475569', contrast: '#ffffff', focus: '#cbd5e1' },
    success: { base: '#06b6d4', hover: '#0891b2', contrast: '#ffffff', focus: '#67e8f9' },
    danger: { base: '#EF4444', hover: '#DC2626', contrast: '#ffffff', focus: '#fecaca' },
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: 14, radius: 8 },
    md: { padding: '10px 16px', fontSize: 16, radius: 10 },
    lg: { padding: '12px 20px', fontSize: 18, radius: 12 },
  };

  const v = palette[variant] || palette.primary;
  const s = sizes[size] || sizes.md;

  // Base style
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: v.base,
    color: v.contrast,
    border: '1px solid transparent',
    borderRadius: s.radius,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 600,
    lineHeight: 1.2,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.02s ease',
    boxShadow: disabled ? 'none' : '0 1px 2px rgba(17,24,39,0.06), 0 1px 1px rgba(17,24,39,0.04)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  // We apply interactive state styles via event handlers for hover/focus for inline styles.
  const [isHover, setIsHover] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const interactiveStyle = {
    ...(isHover && !disabled ? { backgroundColor: v.hover } : null),
    ...(isFocus && !disabled
      ? {
          outline: 'none',
          boxShadow: `0 0 0 3px ${v.focus}`,
        }
      : null),
    ...(isActive && !disabled ? { transform: 'translateY(0.5px)' } : null),
  };

  const combinedStyle = { ...baseStyle, ...interactiveStyle };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      aria-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      style={combinedStyle}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(ButtonVariants)),
  size: PropTypes.oneOf(Object.values(ButtonSizes)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.MD,
  disabled: false,
  onClick: undefined,
  type: 'button',
  fullWidth: false,
  className: '',
  children: null,
};

export default Button;
