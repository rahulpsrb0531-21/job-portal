//

import CssBaseline from './CssBaseline';
import Card from './Card';
import Button from './Button';
import LinearProgress from './LinearProgress';
import Input from './Input';
import Table from './Table';
// import Radio from './Radio'


// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    CssBaseline(theme),
    Card(theme),
    Button(theme),
    LinearProgress(theme),
    Input(theme),
    Table(theme),
    // Radio(theme)
  );
}
