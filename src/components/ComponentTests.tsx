import React from 'react';
import { Button } from './Button/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card/Card';
import { Table } from './Table/Table';
import { Input } from './Input/Input';
import { Badge } from './Badge/Badge';
import { Alert } from './Alert/Alert';
import { Avatar } from './Avatar/Avatar';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb/Breadcrumb';
import { Carousel } from './Carousel/Carousel';
import { Checkbox } from './Checkbox/Checkbox';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './Dialog/Dialog';
import { ConfirmDialog } from './ConfirmDialog/ConfirmDialog';
import { DatePicker } from './DatePicker/DatePicker';
import { FileUpload } from './FileUpload/FileUpload';
import { Label } from './Label/Label';
import { Loader, PageLoader } from './Loader/Loader';
import { MultiSelect, MultiSelectOption } from './MultiSelect/MultiSelect';
import { Pagination } from './Pagination/Pagination';
import { Popover } from './Popover/Popover';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { RadioGroup } from './RadioGroup/RadioGroup';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion/Accordion';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select/Select';
import { Switch } from './Switch/Switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs/Tabs';
import { Textarea } from './Textarea/Textarea';
import { Tooltip } from './Tooltip/Tooltip';
import { DarkThemeToggle } from './DarkThemeToggle/DarkThemeToggle';

const ComponentTests = () => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isConfirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [showPageLoader, setShowPageLoader] = React.useState(false);
  const multiSelectOptions: MultiSelectOption[] = [
    { id: '1', label: 'Vanilla' },
    { id: '2', label: 'Chocolate' },
    { id: '3', label: 'Strawberry', disabled: true },
    { id: '4', label: 'Mint Chip' },
    { id: '5', label: 'Cookie Dough' },
  ];
  const [selectedFlavors, setSelectedFlavors] = React.useState<Array<string | number>>(['1', '4']);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [radioValue, setRadioValue] = React.useState('option2');
  const [selectValue, setSelectValue] = React.useState('apple');
  const [isSwitchOn, setSwitchOn] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const totalItems = 100;
  const itemsPerPage = 10;
  const tableColumns: { accessorKey: 'id' | 'name'; header: string }[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
  ];
  const tableData = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
  ];

  // Define a type for our accordion item data
  type AccordionItemData = {
    title: string;
    content: string;
    disabled?: boolean;
  };

  const accordionItems: AccordionItemData[] = [
    {
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that matches the other components.',
    },
    {
      title: 'Is it animated?',
      content: "Yes. It&apos;s animated by default, but you can disable it if you prefer.",
      disabled: true,
    },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Laptops', href: '#' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Component Test Suite</h1>
        <DarkThemeToggle />
      </div>
      <p>If you can see this page without errors in the console, all components have rendered successfully.</p>
      
      <hr style={{ margin: '2rem 0' }} />

      <h2>Button</h2>
      <Button>Test Button</Button>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Card</h2>
      <Card>
        <CardHeader><CardTitle>Test Card</CardTitle></CardHeader>
        <CardContent><p>Card Content</p></CardContent>
        <CardFooter><p>Card Footer</p></CardFooter>
      </Card>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Table</h2>
      <Table columns={tableColumns} data={tableData} />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Input</h2>
      <Input
        id="test-input"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Test Input"
      />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Badge</h2>
      <Badge>Test Badge</Badge>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Accordion</h2>
      <Accordion type="single" defaultValue="item-1">
        {accordionItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} disabled={item.disabled}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Alert</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Alert variant="default" title="Default Alert">This is a default alert.</Alert>
        <Alert variant="destructive" title="Destructive Alert">This is a destructive alert.</Alert>
        <Alert variant="success" title="Success Alert">This is a success alert.</Alert>
        <Alert variant="warning" title="Warning Alert">This is a warning alert.</Alert>
        <Alert variant="info" title="Info Alert">This is an info alert.</Alert>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Avatar</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" size="sm" />
        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" size="md" />
        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" size="lg" />
        <Avatar src="https://github.com/shadcn.png" alt="@shadcn" size="xl" shape="square" />
        <Avatar alt="Fallback" size="lg" />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Breadcrumb</h2>
      <Breadcrumb items={breadcrumbItems} />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Carousel</h2>
      <Carousel
        items={[
          <div key={1} style={{ padding: '2rem', background: 'var(--muted)', textAlign: 'center' }}>Slide 1</div>,
          <div key={2} style={{ padding: '2rem', background: 'var(--muted)', textAlign: 'center' }}>Slide 2</div>,
          <div key={3} style={{ padding: '2rem', background: 'var(--muted)', textAlign: 'center' }}>Slide 3</div>,
          <div key={4} style={{ padding: '2rem', background: 'var(--muted)', textAlign: 'center' }}>Slide 4</div>,
          <div key={5} style={{ padding: '2rem', background: 'var(--muted)', textAlign: 'center' }}>Slide 5</div>,
        ]}
        itemsToShow={2}
      />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Checkbox</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Checkbox label="Accept terms" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Disabled" disabled />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Dialog</h2>
      <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a simple dialog. You can close it by clicking the overlay, the close button, or pressing Escape.
          </DialogDescription>
        </DialogHeader>
        <p>Some content here.</p>
        <DialogFooter>
          <Button className="btn-outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Confirm Dialog</h2>
      <Button onClick={() => setConfirmOpen(true)}>Open Confirm Dialog</Button>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!');
          setConfirmOpen(false);
        }}
        title="Are you sure?"
        description="This action cannot be undone."
      />

      <hr style={{ margin: '2rem 0' }} />

      <h2>DatePicker</h2>
      <DatePicker 
        value={selectedDate}
        onDateChange={setSelectedDate} 
      />
      <p style={{ marginTop: '0.5rem' }}>Selected date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>FileUpload</h2>
      <FileUpload files={uploadedFiles} onFileChange={setUploadedFiles} />
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Uploaded files:</strong>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
            ))}
          </ul>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>Label</h2>
      <div>
        <Label htmlFor="name-input">Name</Label>
        <Input
          type="text"
          id="name-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Label htmlFor="email-input" required>Email</Label>
        <Input
          type="email"
          id="email-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Label htmlFor="disabled-input" disabled>Disabled Field</Label>
        <Input
          type="text"
          id="disabled-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Cannot edit"
          disabled
        />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Loader</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Loader size="sm" />
        <Loader size="md" variant="secondary" />
        <Loader size="lg" variant="success" />
        <Loader size="xl" variant="destructive" />
        <Loader size="md" variant="warning" />
        <Loader size="lg" variant="info" />
      </div>
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', width: '200px', height: '100px', position: 'relative' }}>
        <Loader center size="md" /> 
        <span style={{fontSize: '0.8rem', color: '#777'}}> (centered in container)</span>
      </div>
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
        <Loader fullWidth size="sm" />
        <span style={{fontSize: '0.8rem', color: '#777'}}> (full width container)</span>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>PageLoader</h2>
      <Button onClick={() => setShowPageLoader(true)}>Show Page Loader (3s)</Button>
      {showPageLoader && (
        <PageLoader text="Loading application data..." />
      )}
      {/* Automatically hide PageLoader after 3 seconds for demo */} 
      {showPageLoader && setTimeout(() => setShowPageLoader(false), 3000) && null}

      <hr style={{ margin: '2rem 0' }} />

      <h2>MultiSelect (Checkbox Group)</h2>
      <MultiSelect
        label="Favorite Ice Cream Flavors"
        options={multiSelectOptions}
        selectedIds={selectedFlavors}
        onChange={setSelectedFlavors}
      />
      <p style={{ marginTop: '0.5rem' }}>Selected: {selectedFlavors.join(', ')}</p>

      <div style={{ marginTop: '1rem' }}>
        <MultiSelect
          label="Toppings (all disabled)"
          options={[
            { id: 'sprinkles', label: 'Sprinkles' },
            { id: 'fudge', label: 'Hot Fudge' },
            { id: 'cherry', label: 'Cherry' },
          ]}
          selectedIds={[]}
          onChange={() => {}}
          disabled // Disable the whole group
        />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Pagination</h2>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
      </p>

      <div style={{marginTop: '1rem'}}>
        <Pagination
          totalItems={30} // Fewer pages
          itemsPerPage={10}
          currentPage={1} // Example with a different current page if needed for testing
          onPageChange={(page) => console.log('Small pagination changed to:', page)}
          showPageNumbers={true}
          maxPageButtons={3} // Fewer buttons
        />
      </div>
      <div style={{marginTop: '1rem'}}>
        <Pagination
          totalItems={20} // Fewer pages
          itemsPerPage={10}
          currentPage={2} // Example with a different current page if needed for testing
          onPageChange={(page) => console.log('No page numbers pagination changed to:', page)}
          showPageNumbers={false} // No page numbers
        />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <hr style={{ margin: '2rem 0' }} />

      <h2>ProgressBar</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }}>
        <ProgressBar value={25} />
        <ProgressBar value={50} variant="success" size="sm" />
        <ProgressBar value={75} variant="warning" size="lg" />
        <ProgressBar isIndeterminate variant="info" />
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Popover</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Popover
          trigger={<Button>Open Popover (Center)</Button>}
          align="center"
        >
          <div style={{ padding: '0.5rem' }}>
            <h4 style={{ fontWeight: '500', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>Popover Title</h4>
            <p>This is the popover content. It can contain any elements.</p>
          </div>
        </Popover>

        <Popover
          trigger={<Button className="btn--secondary">Open Popover (Right)</Button>}
          align="right"
        >
          <div style={{ padding: '0.5rem' }}>
            <p>Aligned to the right.</p>
          </div>
        </Popover>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>RadioGroup</h2>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <div>
          <RadioGroup
            legend="Vertical Group"
            name="vertical-group"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3 (Disabled)', disabled: true },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>
        <div>
          <RadioGroup
            legend="Horizontal Group"
            name="horizontal-group"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>
        <div>
          <RadioGroup
            legend="Disabled Group"
            name="disabled-group"
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
        </div>
      </div>
      <p>Selected Value: {radioValue}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Accordion</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3>Single Type (Default)</h3>
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components and can be customized.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" disabled>
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Multiple Type</h3>
          <Accordion type="multiple" defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is this for?</AccordionTrigger>
              <AccordionContent>
                This is a demo of an accordion that allows multiple items to be open at once.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I open this too?</AccordionTrigger>
              <AccordionContent>
                Yes, you can. That&apos;s the point of this example.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>And this one?</AccordionTrigger>
              <AccordionContent>
                You bet!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Select</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div>
          <h3>Controlled</h3>
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectContent>
          </Select>
          <p className="mt-2">Selected: {selectValue}</p>
        </div>
        <div>
          <h3>Uncontrolled (Default Value)</h3>
          <Select defaultValue="dog">
            <SelectTrigger>
              <SelectValue placeholder="Select an animal..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="elephant">Elephant</SelectItem>
              <SelectItem value="lion">Lion</SelectItem>
              <SelectItem value="tiger" disabled>Tiger (disabled)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Switch</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div>
          <p>Uncontrolled</p>
          <Switch defaultChecked={false} />
        </div>
        <div>
          <p>Controlled ({isSwitchOn ? 'On' : 'Off'})</p>
          <Switch checked={isSwitchOn} onCheckedChange={setSwitchOn} />
        </div>
        <div>
          <p>Disabled (Off)</p>
          <Switch disabled />
        </div>
        <div>
          <p>Disabled (On)</p>
          <Switch disabled checked />
        </div>
      </div>

      <hr style={{ margin: '2rem 0' }} />

            <hr style={{ margin: '2rem 0' }} />

      <h2>Tabs</h2>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p>This is the account tab.</p>
        </TabsContent>
        <TabsContent value="password">
          <p>This is the password tab.</p>
        </TabsContent>
        <TabsContent value="notifications">
          <p>This is the notifications tab.</p>
        </TabsContent>
      </Tabs>

      <hr style={{ margin: '2rem 0' }} />

            <hr style={{ margin: '2rem 0' }} />

      <h2>Textarea</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Textarea placeholder="This is a default textarea." />
        <Textarea placeholder="This is a disabled textarea." disabled />
        <Textarea placeholder="This is an invalid textarea." aria-invalid={true} />
      </div>

      <hr style={{ margin: '2rem 0' }} />

            <hr style={{ margin: '2rem 0' }} />

      <h2>Tooltip</h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '2rem' }}>
        <Tooltip content="I am a tooltip (top)">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="I am a tooltip (right)" position="right">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip content="I am a tooltip (bottom)" position="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="I am a tooltip (left)" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Primary tooltip" variant="primary">
          <Button>Primary</Button>
        </Tooltip>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h2 style={{ color: 'green' }}>All tests passed!</h2>
    </div>
  );
};

export default ComponentTests;
