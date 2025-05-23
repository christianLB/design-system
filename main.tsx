import React from 'react';
import ReactDOM from 'react-dom/client';
import { DesignSystemProvider, Button, Card, CardHeader, CardTitle, CardContent, CardFooter, Table } from './src'; // Assuming src/index.ts exports these
import './dist/design-system.css'; // Import the compiled CSS

const App = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'value', header: 'Value' },
  ];

  const data = [
    { id: 1, name: 'Item A', value: 100 },
    { id: 2, name: 'Item B', value: 200 },
    { id: 3, name: 'Item C', value: 300 },
  ];

  return (
    <DesignSystemProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <h1>Design System Local Test</h1>
        <Button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
          Toggle Theme (Current: {theme})
        </Button>

        <h2>Card Component</h2>
        <Card style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <CardHeader>
            <CardTitle>Test Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the content of the card. It should adapt to the selected theme.</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <h2>Table Component</h2>
        <Table columns={columns} data={data} />

        <div style={{ marginTop: '40px', padding: '20px', border: '1px solid var(--app-border-color)', borderRadius: 'var(--app-border-radius)'}}>
          <h3 style={{color: 'var(--text-color)'}}>Raw Themed Div</h3>
          <p style={{color: 'var(--text-muted-color)'}}>This div uses CSS variables directly for text and border.</p>
          <p>Background should be --app-content-bg or --app-bg.</p>
        </div>

      </div>
    </DesignSystemProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
