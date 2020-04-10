import React, { useState } from 'react';
import './App.css';
import ColorPalette, { sumHSL, getHSLLabel } from './Palette';
import Color from './Color';
import Chart from './Chart';


function App() {
  const [srcColor, setSrcColor] = useState({
    hue: 0,
    saturation: 100,
    lightness: 50,
  });
  const [comulative, setComulative] = useState([
    { hue: -20, saturation: 10, lightness: -10},
    { hue: -20, saturation: 10, lightness: -10},
    { hue: -20, saturation: 10, lightness: -5},
    { hue: -20, saturation: 10, lightness: -5},
    { hue: 0, saturation: 0, lightness: 0},
    { hue: 20, saturation: -10, lightness: 15},
    { hue: 20, saturation: -10, lightness: 15},
    { hue: 20, saturation: -10, lightness: 10},
    { hue: 20, saturation: -10, lightness: 10},
  ]);
  const hComulative = comulative.map(hsl => hsl.hue);
  const sComulative = comulative.map(hsl => hsl.saturation);
  const lComulative = comulative.map(hsl => hsl.lightness);

  const rightSide = comulative
    .slice(5, comulative.length)
    .reduce((acc, hsl, index) => {
      if (index > 0) {
        return [...acc, {
          hue: acc[index - 1].hue + hsl.hue,
          saturation: acc[index - 1].saturation + hsl.saturation,
          lightness: acc[index - 1].lightness + hsl.lightness,
        }];
      }
      return [hsl];
    }, []);
    const leftSide = comulative
      .slice(0, 4)
      .reduceRight((acc, hsl, index) => {
        if (index < 3) {
          return [{
            hue: acc[0].hue + hsl.hue,
            saturation: acc[0].saturation + hsl.saturation,
            lightness: acc[0].lightness + hsl.lightness,
          }, ...acc];
        }
        return [hsl];
      }, []);

  const comulativeValues = [...leftSide, comulative[4], ...rightSide];

  const dest = comulativeValues.map(hsl => sumHSL(srcColor, hsl));
  const hDest = comulative.map(hsl => hsl.hue);
  const sDest = comulative.map(hsl => hsl.saturation);
  const lDest = comulative.map(hsl => hsl.lightness);

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'fixed',
      width: '100%',
      height: '100%',
    }}>
      <aside style={{
        boxSizing: 'border-box',
        width: '35%',
        overflowY: 'scroll',
        padding: 50,
      }}>
        <Color
          color={srcColor}
          setSrcColor={setSrcColor}
          style={{
            marginBottom: 25,
          }}
        />

        <div style={{
        }}>
          <h3>Comulative Hue</h3>
          <div>
            {hComulative.map((h, index) => (
              <input
                disabled={index === 4}
                style={{
                  width: 40,
                  textAlign: 'center',
                  color: index === 4 && getHSLLabel(srcColor),
                }}
                type="number"
                value={h}
                onChange={hValue => setComulative(
                  comulative.map((hsl, i) => {
                    return index === i ? { ...hsl, hue: Number(hValue.target.value) } : hsl
                  })
                )}
              />
            ))}
          </div>
          <Chart
            data={hComulative}
            onDrag={(e, datasetIndex, index, value) => {
              setComulative(oldComulatice =>
                oldComulatice.map((hsl, i) => {
                  return index === i ? { ...hsl, hue: Math.round(Number(value)) } : hsl
                })
              );
            }}
          />

          <h3>Comulative Saturation</h3>
          <div>
            {sComulative.map((s, index) => (
              <input
                disabled={index === 4}
                style={{
                  width: 40,
                  textAlign: 'center',
                  color: index === 4 && getHSLLabel(srcColor),
                }}
                type="number"
                value={s}
                onChange={sValue => setComulative(
                  comulative.map((hsl, i) =>
                    index === i ? { ...hsl, saturation: Number(sValue.target.value) } : hsl
                  )
                )}
              />
            ))}
          </div>
          <Chart
            data={sComulative}
            onDrag={(e, datasetIndex, index, value) => {
              setComulative(oldComulatice =>
                oldComulatice.map((hsl, i) => {
                  return index === i ? { ...hsl, saturation: Math.round(Number(value)) } : hsl
                })
              );
            }}
          />

          <h3>Comulative Lightness</h3>
          <div>
            {lComulative.map((b, index) => (
              <input
                disabled={index === 4}
                style={{
                  width: 40,
                  textAlign: 'center',
                  color: index === 4 && getHSLLabel(srcColor),
                }}
                type="number"
                value={b}
                onChange={lValue => setComulative(
                  comulative.map((hsl, i) =>
                    index === i ? { ...hsl, lightness: Number(lValue.target.value) } : hsl
                  )
                )}
              />
            ))}
          </div>
          <Chart
            data={lComulative}
            onDrag={(e, datasetIndex, index, value) => {
              setComulative(oldComulatice =>
                oldComulatice.map((hsl, i) => {
                  return index === i ? { ...hsl, lightness: Math.round(Number(value)) } : hsl
                })
              );
            }}
          />
        </div>
      </aside>
      <section style={{
        width: '65%',
        height: '100%',
      }}>
        <ColorPalette
          colorRamp={dest}
          steps={[45, 45, 45, 45, 45, 45, 45, 45]}
        />
      </section>
    </div>
  );
}

export default App;
