import React from 'react';
import {Button} from '../components/Button';
import Card from '../components/Card';
import {Table} from '../components/Table';

export default function App() {
  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Design System Demo</h1>
      <section style={{ marginBottom: 40 }}>
        <h2>Button</h2>
        <Button>Demo Button</Button>
      </section>
      <section style={{ marginBottom: 40 }}>
        <h2>Card</h2>
        <Card title="Demo Card">
          <p>This is a card demo.</p>
        </Card>
      </section>
      <section>
        <h2>Table</h2>
          <Table data={[{ name: 'John', age: 30 }, { name: 'Jane', age: 28 }]} columns={[{ header: 'Name', accessorKey: 'name' }, { header: 'Age', accessorKey: 'age' }]} />
        </section>
      </div>
  );
}
