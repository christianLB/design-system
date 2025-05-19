import React from 'react';
import Carousel from '../../components/Carousel';
import Card from '../../components/Card';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

const carouselItems = [
  {
    title: 'First Item',
    description: 'This is the first item in the carousel',
    color: 'bg-blue-100',
  },
  {
    title: 'Second Item',
    description: 'This is the second item in the carousel',
    color: 'bg-green-100',
  },
  {
    title: 'Third Item',
    description: 'This is the third item in the carousel',
    color: 'bg-yellow-100',
  },
  {
    title: 'Fourth Item',
    description: 'This is the fourth item in the carousel',
    color: 'bg-red-100',
  },
  {
    title: 'Fifth Item',
    description: 'This is the fifth item in the carousel',
    color: 'bg-purple-100',
  },
];

const carouselCard = (item: typeof carouselItems[0]) => (
  <div className="p-4 h-full">
    <Card className={`h-full ${item.color} p-6 flex flex-col`}>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="mb-4 flex-grow">{item.description}</p>
      <div>
        <Button variant="outline">Learn More</Button>
      </div>
    </Card>
  </div>
);

export function CarouselDemo() {
  return (
    <ComponentShowcase
      title="Carousel"
      description="A carousel component that displays a set of items in a horizontal scrollable container."
    >
      <ComponentVariant title="Basic Carousel (3 items visible)">
        <div className="relative">
          <Carousel 
            items={carouselItems.map(item => carouselCard(item))} 
            itemsToShow={3} 
          />
        </div>
      </ComponentVariant>

      <ComponentVariant title="Single Item Carousel">
        <div className="relative">
          <Carousel 
            items={carouselItems.map(item => (
              <div key={item.title} className="p-4">
                <div className={`${item.color} p-8 rounded-lg text-center`}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))} 
            itemsToShow={1} 
          />
        </div>
      </ComponentVariant>

      <ComponentVariant title="Custom Content">
        <div className="relative">
          <Carousel 
            items={[
              <div key="image1" className="p-2">
                <img 
                  src="https://source.unsplash.com/random/800x400/?nature,1" 
                  alt="Nature" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>,
              <div key="image2" className="p-2">
                <img 
                  src="https://source.unsplash.com/random/800x400/?city,1" 
                  alt="City" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>,
              <div key="image3" className="p-2">
                <img 
                  src="https://source.unsplash.com/random/800x400/?technology,1" 
                  alt="Technology" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>,
              <div key="image4" className="p-2">
                <img 
                  src="https://source.unsplash.com/random/800x400/?abstract,1" 
                  alt="Abstract" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>,
            ]} 
            itemsToShow={2} 
          />
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
