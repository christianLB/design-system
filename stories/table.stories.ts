import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../components/table";
import { ColumnDef } from "@tanstack/react-table";
import { fn } from "@storybook/test";
import React from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  country: string;
}

const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    country: "USA",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    age: 25,
    email: "jane.smith@example.com",
    country: "Canada",
  },
  {
    id: 3,
    firstName: "Peter",
    lastName: "Jones",
    age: 40,
    email: "peter.jones@example.com",
    country: "UK",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    age: 35,
    email: "alice.williams@example.com",
    country: "Australia",
  },
  {
    id: 5,
    firstName: "Bob",
    lastName: "Brown",
    age: 28,
    email: "bob.brown@example.com",
    country: "USA",
  },
  {
    id: 6,
    firstName: "Carol",
    lastName: "Davis",
    age: 32,
    email: "carol.davis@example.com",
    country: "Canada",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Wilson",
    age: 45,
    email: "david.wilson@example.com",
    country: "UK",
  },
  {
    id: 8,
    firstName: "Eve",
    lastName: "Martinez",
    age: 27,
    email: "eve.martinez@example.com",
    country: "Australia",
  },
  {
    id: 9,
    firstName: "Frank",
    lastName: "Garcia",
    age: 38,
    email: "frank.garcia@example.com",
    country: "USA",
  },
  {
    id: 10,
    firstName: "Grace",
    lastName: "Rodriguez",
    age: 31,
    email: "grace.rodriguez@example.com",
    country: "Canada",
  },
];

const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
];

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Components/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {  
  args: {
    onSelectionChange: fn()
  },
  render: (args) => (
    <Table data={users} columns={columns} onSelectionChange={args.onSelectionChange} />
  ),  
};