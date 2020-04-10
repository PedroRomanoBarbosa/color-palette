import React, { FormEvent } from 'react';
import { HSL, getHSLLabel } from './Palette';

export interface SliderProps extends React.HTMLAttributes<any> {
  label: string
  min: number
  max: number
  value: number
}

function Slider(props: SliderProps) {
  const {
    label,
  } = props;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <label style={{
        fontSize: 20,
        fontFamily: 'monospace',
        marginRight: 5,
      }}>{label}</label>
      <input
        className="slider"
        type="range"
        {...props}
      />
      <input
        type="number"
        {...props}
      />
    </div>
  );
}

const getLabel = (index: number) => {
  if (index === 0) return "H ";
  else if (index === 1) return "S ";
  else return "L ";
}

const getBounds = (index: number) => {
  if (index === 0) return [0, 360];
  else if (index === 1) return [0, 100];
  else return [0, 100];
}

const hslArrayToObject = (values: number[]): HSL => {
  return {
    hue: values[0],
    saturation: values[1],
    lightness: values[2],
  }
}

export interface ColorProps {
  color: HSL
  setSrcColor: (color: HSL) => any
  style: any
}

const Color = (props: ColorProps) => {
  const {
    color,
    setSrcColor,
    style,
  } = props;
  const values = Object.values(color) as number[];
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <h2 style={{
        fontWeight: 'bold',
        textAlign: 'right',
      }}>
        Source Color
      </h2>
      <div
        style={{
          marginLeft: 25,
        }}
      >
        {values.map((component, index) => {
          const bounds = getBounds(index);
          return (
            <Slider
              label={getLabel(index)}
              min={bounds[0]}
              max={bounds[1]}
              value={component as unknown as number}
              onChange={(e: FormEvent<EventTarget>) => {
                let target = e.target as HTMLInputElement;
                let newValues = values.map((v, i) => index === i ? Number(target.value) : v);
                setSrcColor(hslArrayToObject(newValues));
              }}
            />
          );
        })}
      </div>
      <div style={{
        marginLeft: 25,
        minWidth: 70,
        maxWidth: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: getHSLLabel(color),
      }}/>
    </div>
  );
}

export default Color;
