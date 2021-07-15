import randomColor from 'randomcolor';

export function colorizeDatasets (datasets) {
  return datasets.map(d => {
    const base = randomColor({ seed: d.label });
    const backgroundColor = randomColor({ luminosity: 'dark', hue: base });
    const borderColor = randomColor({ luminosity: 'light', hue: base });
    return {
      ...d,
      backgroundColor,
      borderColor
    };
  });
}
