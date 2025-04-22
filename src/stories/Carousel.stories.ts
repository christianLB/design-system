import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '../../components/Carousel';
import Card from '../../components/Card';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    itemsToShow: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const images = [
  <img src="https://via.placeholder.com/150" alt="Placeholder 1" key="img1" />,
  <img src="https://via.placeholder.com/150" alt="Placeholder 2" key="img2" />,
  <img src="https://via.placeholder.com/150" alt="Placeholder 3" key="img3" />,
];

const cards = [
  <Card key="card1" title="Card 1">Content 1</Card>,
  <Card key="card2" title="Card 2">Content 2</Card>,
  <Card key="card3" title="Card 3">Content 3</Card>,
  <Card key="card4" title="Card 4">Content 4</Card>,
  <Card key="card5" title="Card 5">Content 5</Card>,
];

export const WithImages: Story = {
  args: {
    items: images,
    itemsToShow: 3,
  },
};

export const WithCards: Story = {
  args: {
    items: cards,
    itemsToShow: 3,
  },
};

export const ManageItemsToShow: Story = {
    args: {
        items: cards,
        itemsToShow: 1
    }
}