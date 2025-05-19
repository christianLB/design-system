import React, { useState } from 'react';
import { Button } from '../components/Button';
import Card from '../components/Card';
import { Table } from '../components/Table';
import { Layout } from './components/Layout';
import { ComponentShowcase, ComponentVariant } from './components/ComponentShowcase';
import { AlertDemo } from './components/AlertDemo';
import { BadgeDemo } from './components/BadgeDemo';
import { TableDemo } from './components/TableDemo';
import { AccordionDemo } from './components/AccordionDemo';
import { BreadcrumbDemo } from './components/BreadcrumbDemo';
import { CarouselDemo } from './components/CarouselDemo';
import { DialogDemo } from './components/DialogDemo';
import { FileUploadDemo } from './components/FileUploadDemo';
import { MultiSelectDemo } from './components/MultiSelectDemo';
import { PaginationDemo } from './components/PaginationDemo';
import { PopoverDemo } from './components/PopoverDemo';
import { TabsDemo } from './components/TabsDemo';
import { AvatarDemo } from './components/AvatarDemo';
import { DatePickerDemo } from './components/DatePickerDemo';
import { InputDemo } from './components/InputDemo';
import { LoaderDemo } from './components/LoaderDemo';
import { ProgressBarDemo } from './components/ProgressBarDemo';
import { RadioGroupDemo } from './components/RadioGroupDemo';
import { SelectDemo } from './components/SelectDemo';
import { SwitchDemo } from './components/SwitchDemo';
import { TextareaDemo } from './components/TextareaDemo';
import { TooltipDemo } from './components/TooltipDemo';
import { CheckboxDemo } from './components/CheckboxDemo';

// Import other components as we add them
// import { Accordion } from '../components/Accordion';
// import { Alert } from '../components/Alert';
// ... other imports

export default function App() {
  const [activeSection, setActiveSection] = useState('interactive');

  const renderSection = () => {
    switch (activeSection) {
      case 'layout':
        return renderLayoutSection();
      case 'data':
        return renderDataSection();
      case 'interactive':
      default:
        return renderInteractiveSection();
    }
  };

  const renderInteractiveSection = () => (
    <>
      <ComponentShowcase title="Button" description="A button component with various styles and states.">
        <ComponentVariant title="Variants">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </ComponentVariant>
        <ComponentVariant title="Sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </ComponentVariant>
        <ComponentVariant title="States">
          <Button disabled>Disabled</Button>
          <Button disabled>Loading</Button>
        </ComponentVariant>
      </ComponentShowcase>

      <ComponentShowcase title="Card" description="A flexible card component for displaying content.">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Default Card">
            <p className="text-sm text-muted-foreground">
              This is a basic card with a title and content.
            </p>
          </Card>
          <Card title="With Footer" footer="Card Footer">
            <p className="text-sm text-muted-foreground">
              This card includes a footer section.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">Card without Title Prop</h3>
            <p className="text-sm text-muted-foreground">
              You can also add the title as a child.
            </p>
          </Card>
        </div>
      </ComponentShowcase>

      <PopoverDemo />
      <TabsDemo />
    </>
  );

  const renderDataSection = () => {
    return (
      <div className="space-y-8">
        <AlertDemo />
        <BadgeDemo />
        <AvatarDemo />
        <DatePickerDemo />
        <InputDemo />
        <LoaderDemo />
        <ProgressBarDemo />
        <RadioGroupDemo />
        <SelectDemo />
        <SwitchDemo />
        <TextareaDemo />
        <TooltipDemo />
        <CheckboxDemo />
        <TableDemo />
        <FileUploadDemo />
        <MultiSelectDemo />
        <PaginationDemo />
      </div>
    );
  };

  const renderLayoutSection = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Layout & Navigation</h2>
      <BreadcrumbDemo />
      <CarouselDemo />
      <AccordionDemo />
      <DialogDemo />
    </div>
  );

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}
