import React, { useState } from 'react';


export const getHSLLabel = (hsl: HSL) => {
  return `hsl(${hsl.hue.toFixed(0)}, ${hsl.saturation}%, ${hsl.lightness}%)`;
}

export const sumHSL = (hsl1: HSL, hsl2: HSL): HSL => ({
  hue: hsl1.hue + hsl2.hue,
  saturation: hsl1.saturation + hsl2.saturation,
  lightness: hsl1.lightness + hsl2.lightness,
});

export interface HSL {
  hue: number
  saturation: number
  lightness: number
}

export interface ColorSquareProps {
  colorLabel: string
}

export function ColorSquare(props: ColorSquareProps) {
  const { colorLabel } = props;
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: colorLabel,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div style={{
          flex: 1,
          backgroundColor: 'rgb(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'monospace',
        }}>
          {colorLabel}
        </div>
        )}
    </div>
  );
}

export interface ColorPaletteProps {
  colorRamp: HSL[]
  steps: number[]
}

export default function ColorPalette(props: ColorPaletteProps) {
  const {
    colorRamp,
    steps,
  } = props;
  return (
    <div style={{
      width: '100%',
      height: '100%',
    }}>
      {steps.map((step, index) => {
        return (
          <div style={{
            width: '100%',
            height: `${100 / steps.length}%`,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {colorRamp.map((hsl) => (
              <ColorSquare
                colorLabel={getHSLLabel({ ...hsl, hue: hsl.hue + step * index })}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
