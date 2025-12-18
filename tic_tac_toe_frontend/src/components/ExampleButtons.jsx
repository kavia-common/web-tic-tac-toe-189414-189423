import React, { useState } from 'react';
import Button, { ButtonVariants, ButtonSizes } from './button';

/**
 * ExampleButtons
 * Demonstrates the Button component variants, sizes, disabled state, fullWidth option,
 * and click interactions in a small, self-contained demo panel.
 */
function ExampleButtons() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (label) => {
    setClickCount((c) => c + 1);
    // eslint-disable-next-line no-console
    console.log(`Button clicked: ${label}`);
  };

  const sectionStyle = {
    marginTop: 24,
    padding: 16,
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    border: `1px solid var(--border-color)`,
    borderRadius: 12,
    width: 'min(960px, 90vw)',
    boxShadow: '0 2px 8px rgba(17,24,39,0.06)',
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: '0 0 12px 0',
    fontSize: 18,
    fontWeight: 700,
  };

  const subtitleStyle = {
    margin: '16px 0 8px 0',
    fontSize: 14,
    fontWeight: 600,
    opacity: 0.85,
  };

  const fullWidthContainer = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginTop: 8,
  };

  return (
    <div style={sectionStyle} aria-label="Button Examples">
      <h3 style={titleStyle}>Buttons Showcase</h3>
      <p style={{ marginTop: 0, marginBottom: 16, fontSize: 14, opacity: 0.8 }}>
        Click count: <strong>{clickCount}</strong>
      </p>

      <div>
        <div style={subtitleStyle}>Variants (md):</div>
        <div style={rowStyle}>
          <Button variant={ButtonVariants.PRIMARY} onClick={() => handleClick('Primary')}>
            Primary
          </Button>
          <Button variant={ButtonVariants.SECONDARY} onClick={() => handleClick('Secondary')}>
            Secondary
          </Button>
          <Button variant={ButtonVariants.SUCCESS} onClick={() => handleClick('Success')}>
            Success
          </Button>
          <Button variant={ButtonVariants.DANGER} onClick={() => handleClick('Danger')}>
            Danger
          </Button>
        </div>
      </div>

      <div>
        <div style={subtitleStyle}>Sizes (primary):</div>
        <div style={rowStyle}>
          <Button size={ButtonSizes.SM} onClick={() => handleClick('Small')}>
            Small
          </Button>
          <Button size={ButtonSizes.MD} onClick={() => handleClick('Medium')}>
            Medium
          </Button>
          <Button size={ButtonSizes.LG} onClick={() => handleClick('Large')}>
            Large
          </Button>
        </div>
      </div>

      <div>
        <div style={subtitleStyle}>Disabled state:</div>
        <div style={rowStyle}>
          <Button disabled onClick={() => handleClick('Disabled Primary')}>
            Disabled Primary
          </Button>
          <Button variant={ButtonVariants.SECONDARY} disabled onClick={() => handleClick('Disabled Secondary')}>
            Disabled Secondary
          </Button>
        </div>
      </div>

      <div>
        <div style={subtitleStyle}>Full width examples:</div>
        <div style={fullWidthContainer}>
          <Button fullWidth onClick={() => handleClick('Full Width Primary')}>
            Full Width Primary
          </Button>
          <Button variant={ButtonVariants.SECONDARY} fullWidth onClick={() => handleClick('Full Width Secondary')}>
            Full Width Secondary
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExampleButtons;
