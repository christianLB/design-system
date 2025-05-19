import React, { useState } from 'react';
import { Tooltip } from '../../components/Tooltip';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';
import { Check, Info, AlertTriangle, HelpCircle, ExternalLink } from 'lucide-react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
type TooltipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

const positions: { value: TooltipPosition; label: string }[] = [
  { value: 'top', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
];

const variants: { value: TooltipVariant; label: string; icon: React.ReactNode }[] = [
  { value: 'default', label: 'Default', icon: <Info className="w-4 h-4" /> },
  { value: 'primary', label: 'Primary', icon: <Info className="w-4 h-4" /> },
  { value: 'success', label: 'Success', icon: <Check className="w-4 h-4" /> },
  { value: 'warning', label: 'Warning', icon: <AlertTriangle className="w-4 h-4" /> },
  { value: 'danger', label: 'Danger', icon: <AlertTriangle className="w-4 h-4" /> },
];

export function TooltipDemo() {
  const [position, setPosition] = useState<TooltipPosition>('top');
  const [variant, setVariant] = useState<TooltipVariant>('default');
  const [delay, setDelay] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isControlled, setIsControlled] = useState<boolean>(false);

  const getVariantClasses = (variant: TooltipVariant) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'danger':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-popover text-popover-foreground';
    }
  };

  const CustomTooltip = ({ 
    children, 
    content,
    position = 'top',
    variant = 'default',
    delay = 0,
    isOpen: controlledOpen,
  }: {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: TooltipPosition;
    variant?: TooltipVariant;
    delay?: number;
    isOpen?: boolean;
  }) => {
    const [isHovering, setIsHovering] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const show = isControlled ? controlledOpen : isHovering;

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    };

    const arrowClasses = {
      top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
      right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45',
      bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
      left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 -rotate-45',
    };

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => !isControlled && setIsHovering(true)}
          onMouseLeave={() => !isControlled && setIsHovering(false)}
          onClick={() => !isControlled && setIsHovering(!isHovering)}
          className="inline-block"
        >
          {children}
        </div>
        
        {show && (
          <div 
            className={`absolute z-50 min-w-[120px] max-w-[240px] rounded-md px-3 py-2 text-sm shadow-md ${getVariantClasses(variant)} ${positionClasses[position]}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            {content}
            <div 
              className={`absolute w-2 h-2 ${getVariantClasses(variant)} ${arrowClasses[position]}`}
              style={{
                width: '8px',
                height: '8px',
                transform: `${arrowClasses[position].includes('-translate-') ? '' : 'rotate(45deg)'}`,
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <ComponentShowcase 
      title="Tooltip" 
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    >
      <ComponentVariant title="Basic Usage">
        <div className="flex flex-wrap items-center gap-6 p-4">
          <CustomTooltip content="This is a tooltip">
            <Button variant="outline">Hover me</Button>
          </CustomTooltip>
          
          <CustomTooltip content="This is a tooltip with a link">
            <Button variant="ghost">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </CustomTooltip>
          
          <CustomTooltip content={
            <div className="space-y-1">
              <p className="font-medium">Did you know?</p>
              <p className="text-xs">This is a more detailed tooltip with HTML content.</p>
            </div>
          }>
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-1" />
              Info
            </Button>
          </CustomTooltip>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Positions">
        <div className="space-y-8">
          <div className="flex justify-center">
            <CustomTooltip content="Top tooltip" position="top">
              <Button>Top</Button>
            </CustomTooltip>
          </div>
          
          <div className="flex justify-between items-center">
            <CustomTooltip content="Left tooltip" position="left">
              <Button>Left</Button>
            </CustomTooltip>
            
            <CustomTooltip content="Right tooltip" position="right">
              <Button>Right</Button>
            </CustomTooltip>
          </div>
          
          <div className="flex justify-center">
            <CustomTooltip content="Bottom tooltip" position="bottom">
              <Button>Bottom</Button>
            </CustomTooltip>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Variants">
        <div className="flex flex-wrap items-center gap-4">
          {variants.map(({ value, label, icon }) => (
            <CustomTooltip 
              key={value}
              content={`This is a ${label.toLowerCase()} tooltip`}
              variant={value}
            >
              <Button variant={value === 'default' ? 'outline' : 'default'}>
                {icon}
                <span className="ml-2">{label}</span>
              </Button>
            </CustomTooltip>
          ))}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Delay">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <CustomTooltip content="Appears immediately" delay={0}>
              <Button variant="outline">No delay</Button>
            </CustomTooltip>
            
            <CustomTooltip content="Appears after 500ms" delay={500}>
              <Button variant="outline">500ms delay</Button>
            </CustomTooltip>
            
            <CustomTooltip content="Appears after 1000ms" delay={1000}>
              <Button variant="outline">1000ms delay</Button>
            </CustomTooltip>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Hover over the buttons to see the delay effect.</p>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Controlled">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <CustomTooltip 
              content="This is a controlled tooltip"
              isOpen={isControlled ? isOpen : undefined}
            >
              <Button 
                onClick={() => {
                  setIsControlled(true);
                  setIsOpen(!isOpen);
                }}
              >
                {isControlled && isOpen ? 'Hide Tooltip' : 'Show Tooltip'}
              </Button>
            </CustomTooltip>
            
            <Button 
              variant="outline" 
              onClick={() => setIsControlled(!isControlled)}
            >
              {isControlled ? 'Switch to Hover' : 'Switch to Controlled'}
            </Button>
          </div>
          
          {isControlled && (
            <div className="text-sm text-muted-foreground">
              <p>Tooltip is {isOpen ? 'visible' : 'hidden'}. Click the button to toggle.</p>
            </div>
          )}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Rich Content">
        <div className="flex flex-wrap items-center gap-6">
          <CustomTooltip 
            content={
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <h4 className="font-medium">Information</h4>
                </div>
                <p className="text-xs">This tooltip contains rich content including a list of features.</p>
                <ul className="text-xs space-y-1 mt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Feature one</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Feature two</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Feature three</span>
                  </li>
                </ul>
              </div>
            }
          >
            <Button variant="outline" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Rich Content
            </Button>
          </CustomTooltip>
          
          <CustomTooltip 
            content={
              <div className="space-y-2 w-[240px]">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium">Documentation</h4>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Learn more about our design system and how to use these components effectively.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 text-xs"
                  onClick={() => window.open('https://example.com/docs', '_blank')}
                >
                  View Documentation
                </Button>
              </div>
            }
          >
            <Button variant="ghost" size="sm">
              <HelpCircle className="w-4 h-4 mr-1" />
              Help & Docs
            </Button>
          </CustomTooltip>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
