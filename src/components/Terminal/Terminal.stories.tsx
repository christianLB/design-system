import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Terminal, TerminalCommand } from './Terminal';

const meta: Meta<typeof Terminal> = {
  title: 'Core Components/Specialized/Terminal',
  component: Terminal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Terminal Component

A cyberpunk-themed terminal component with typewriter effects, command history, and various visual enhancements.

## Features

- **Typewriter Effect**: Realistic typing animation for command output
- **Command History**: Navigate through previous commands with arrow keys
- **Multiple Variants**: Matrix, DOOM, Swordfish, and Neon themes
- **Visual Effects**: Scanlines, matrix rain, and glow effects
- **Accessibility**: Screen reader support and reduced motion preferences
- **Responsive**: Works on all screen sizes

## Keyboard Shortcuts

- **Enter**: Execute command
- **↑/↓**: Navigate command history
- **Tab**: Auto-complete (integration point)
- **Escape**: Clear current input

## Sound Effects Integration

The component provides integration points for sound effects when commands are executed.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['matrix', 'doom', 'swordfish', 'neon'],
      description: 'Visual theme variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Terminal size',
    },
    title: {
      control: 'text',
      description: 'Terminal window title',
    },
    showHeader: {
      control: 'boolean',
      description: 'Show terminal header bar',
    },
    showControls: {
      control: 'boolean',
      description: 'Show window control buttons',
    },
    enableInput: {
      control: 'boolean',
      description: 'Enable command input',
    },
    enableTypewriter: {
      control: 'boolean',
      description: 'Enable typewriter effect',
    },
    autoScroll: {
      control: 'boolean',
      description: 'Auto-scroll to bottom',
    },
    enableScanlines: {
      control: 'boolean',
      description: 'Enable CRT scanlines effect',
    },
    enableMatrixRain: {
      control: 'boolean',
      description: 'Enable matrix rain background',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    prompt: {
      control: 'text',
      description: 'Command prompt text',
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value)',
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Terminal>;

// Sample commands for stories
const sampleCommands: TerminalCommand[] = [
  {
    id: '1',
    command: 'ls -la',
    output: `total 24
drwxr-xr-x  6 user  staff   192 Oct 24 14:30 .
drwxr-xr-x  5 user  staff   160 Oct 24 14:25 ..
-rw-r--r--  1 user  staff  1024 Oct 24 14:28 README.md
-rw-r--r--  1 user  staff  2048 Oct 24 14:30 package.json
drwxr-xr-x  3 user  staff    96 Oct 24 14:29 src/`,
    timestamp: new Date(Date.now() - 5000),
    status: 'success',
  },
  {
    id: '2',
    command: 'cat package.json',
    output: `{
  "name": "@cyberpunk/terminal",
  "version": "3.5.0",
  "description": "Cyberpunk terminal component",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "vite",
    "test": "jest"
  }
}`,
    timestamp: new Date(Date.now() - 3000),
    status: 'success',
  },
  {
    id: '3',
    command: 'npm test',
    output: 'Error: No test files found',
    timestamp: new Date(Date.now() - 1000),
    status: 'error',
  },
];

const hackingCommands: TerminalCommand[] = [
  {
    id: '1',
    command: 'nmap -sS 192.168.1.0/24',
    output: `Starting Nmap scan...
Host 192.168.1.1 is up (0.0012s latency)
Host 192.168.1.15 is up (0.0023s latency)
Host 192.168.1.100 is up (0.0045s latency)`,
    timestamp: new Date(Date.now() - 8000),
    status: 'success',
  },
  {
    id: '2',
    command: 'ssh admin@192.168.1.100',
    output: 'Connection established... Bypassing authentication...',
    timestamp: new Date(Date.now() - 6000),
    status: 'warning',
  },
  {
    id: '3',
    command: 'sudo cat /etc/shadow',
    output: `root:$6$salt$encrypted_password_hash:18562:0:99999:7:::
admin:$6$salt$another_encrypted_hash:18562:0:99999:7:::
user:$6$salt$yet_another_hash:18562:0:99999:7:::`,
    timestamp: new Date(Date.now() - 4000),
    status: 'success',
  },
  {
    id: '4',
    command: 'john --wordlist=/usr/share/wordlists/rockyou.txt shadow.txt',
    output: 'Cracking passwords... [BREACH DETECTED]',
    timestamp: new Date(Date.now() - 2000),
    status: 'error',
  },
];

// Basic Terminal Story
export const Default: Story = {
  args: {
    variant: 'matrix',
    size: 'md',
    title: 'Terminal v3.5.0',
    showHeader: true,
    showControls: true,
    enableInput: true,
    enableTypewriter: true,
    autoScroll: true,
    enableScanlines: true,
    enableMatrixRain: false,
    showLineNumbers: false,
    prompt: '$ ',
    initialCommands: sampleCommands,
  },
};

// Matrix Variant
export const MatrixVariant: Story = {
  args: {
    ...Default.args,
    variant: 'matrix',
    title: 'MATRIX TERMINAL',
    enableMatrixRain: true,
    enableScanlines: true,
    initialCommands: [
      {
        id: '1',
        command: 'wake up neo...',
        output: 'The Matrix has you...',
        timestamp: new Date(Date.now() - 3000),
        status: 'success',
      },
      {
        id: '2',
        command: 'follow the white rabbit',
        output: 'Knock, knock, Neo.',
        timestamp: new Date(Date.now() - 1000),
        status: 'warning',
      },
    ],
  },
};

// DOOM Variant
export const DoomVariant: Story = {
  args: {
    ...Default.args,
    variant: 'doom',
    title: 'DOOM TERMINAL',
    prompt: 'DOOM> ',
    enableScanlines: true,
    initialCommands: [
      {
        id: '1',
        command: 'rip and tear',
        output: 'BFG-9000 loaded and ready...',
        timestamp: new Date(Date.now() - 2000),
        status: 'success',
      },
      {
        id: '2',
        command: 'kill -9 demons',
        output: 'Demons eliminated. Hell secured.',
        timestamp: new Date(Date.now() - 500),
        status: 'success',
      },
    ],
  },
};

// Swordfish Variant
export const SwordfishVariant: Story = {
  args: {
    ...Default.args,
    variant: 'swordfish',
    title: 'SWORDFISH TERMINAL',
    prompt: 'sf> ',
    enableScanlines: true,
    initialCommands: hackingCommands,
  },
};

// Neon Variant
export const NeonVariant: Story = {
  args: {
    ...Default.args,
    variant: 'neon',
    title: 'NEON TERMINAL',
    prompt: '◉ ',
    enableScanlines: true,
    enableMatrixRain: false,
    initialCommands: [
      {
        id: '1',
        command: 'echo "Welcome to Night City"',
        output: 'Welcome to Night City',
        timestamp: new Date(Date.now() - 2000),
        status: 'success',
      },
      {
        id: '2',
        command: 'jack-in --location=cyberspace',
        output: 'Neural interface established... Diving deep...',
        timestamp: new Date(Date.now() - 500),
        status: 'warning',
      },
    ],
  },
};

// Different Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small Terminal</h3>
        <Terminal {...args} size="sm" height="250px" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium Terminal</h3>
        <Terminal {...args} size="md" height="300px" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large Terminal</h3>
        <Terminal {...args} size="lg" height="400px" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Extra Large Terminal</h3>
        <Terminal {...args} size="xl" height="500px" />
      </div>
    </div>
  ),
  args: {
    variant: 'matrix',
    title: 'Size Comparison',
    showHeader: true,
    enableInput: false,
    initialCommands: [
      {
        id: '1',
        command: 'echo "Terminal size demonstration"',
        output: 'Different terminal sizes for various use cases',
        timestamp: new Date(),
        status: 'success',
      },
    ],
  },
};

// Interactive Terminal
export const Interactive: Story = {
  render: (args) => {
    const [commands, setCommands] = useState<TerminalCommand[]>(args.initialCommands || []);

    const handleCommandExecute = (command: string) => {
      // Simulate command processing
      const newCommand: TerminalCommand = {
        id: Date.now().toString(),
        command,
        timestamp: new Date(),
        status: 'success',
      };

      // Add mock responses for common commands
      if (command.toLowerCase().includes('help')) {
        newCommand.output = `Available commands:
  help     - Show this help message
  ls       - List directory contents
  clear    - Clear terminal
  date     - Show current date
  whoami   - Show current user
  echo     - Echo text`;
      } else if (command.toLowerCase().includes('ls')) {
        newCommand.output = `total 8
drwxr-xr-x  2 user  staff   64 Oct 24 14:30 documents/
drwxr-xr-x  2 user  staff   64 Oct 24 14:30 downloads/
-rw-r--r--  1 user  staff 1024 Oct 24 14:30 readme.txt`;
      } else if (command.toLowerCase().includes('date')) {
        newCommand.output = new Date().toString();
      } else if (command.toLowerCase().includes('whoami')) {
        newCommand.output = 'cyberpunk_user';
      } else if (command.toLowerCase().startsWith('echo ')) {
        newCommand.output = command.substring(5);
      } else if (command.toLowerCase().includes('clear')) {
        setCommands([]);
        return;
      } else {
        newCommand.output = `Command not found: ${command}. Type 'help' for available commands.`;
        newCommand.status = 'error';
      }

      setCommands((prev) => [...prev, newCommand]);
    };

    const handleClear = () => {
      setCommands([]);
    };

    return (
      <Terminal
        {...args}
        initialCommands={commands}
        onCommandExecute={handleCommandExecute}
        onClear={handleClear}
      />
    );
  },
  args: {
    variant: 'matrix',
    title: 'Interactive Terminal',
    showHeader: true,
    showControls: true,
    enableInput: true,
    enableTypewriter: true,
    autoScroll: true,
    enableScanlines: true,
    prompt: '$ ',
    initialCommands: [
      {
        id: 'welcome',
        command: 'welcome',
        output: 'Welcome to the Interactive Terminal! Type "help" for available commands.',
        timestamp: new Date(),
        status: 'success',
      },
    ],
  },
};

// Typewriter Effect Demo
export const TypewriterEffect: Story = {
  render: (args) => {
    const [commands, setCommands] = useState<TerminalCommand[]>([]);

    useEffect(() => {
      const longOutput = `Initializing neural interface...
Connecting to mainframe...
Bypassing security protocols...
Access granted.

Welcome to the Cyberpunk Terminal System v3.5.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

System Status: ONLINE
Security Level: MAXIMUM
User Clearance: ALPHA

Available modules:
  - Data Mining Interface
  - Network Infiltration Tools  
  - Encryption/Decryption Suite
  - Real-time Monitoring System

Ready for commands...`;

      const newCommand: TerminalCommand = {
        id: 'typewriter-demo',
        command: 'initialize --cyberpunk-mode',
        output: longOutput,
        timestamp: new Date(),
        status: 'success',
      };

      setCommands([newCommand]);
    }, []);

    return (
      <Terminal
        {...args}
        initialCommands={commands}
        enableTypewriter={true}
        typewriterConfig={{
          speed: 30,
          randomDelay: true,
          minDelay: 10,
          maxDelay: 80,
          enableCursor: true,
          pauseOnComplete: 1000,
        }}
      />
    );
  },
  args: {
    variant: 'matrix',
    title: 'Typewriter Effect Demo',
    enableInput: false,
    enableScanlines: true,
    height: '500px',
  },
};

// No Header Terminal
export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false,
    title: '',
    enableScanlines: true,
    height: '300px',
  },
};

// With Line Numbers
export const WithLineNumbers: Story = {
  args: {
    ...Default.args,
    showLineNumbers: true,
    initialCommands: sampleCommands,
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    width: '600px',
    height: '350px',
    className: 'shadow-2xl border-4 border-cyan-400',
    variant: 'swordfish',
    title: 'Custom Styled Terminal',
  },
};

// All Variants Comparison
export const AllVariants: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-400">Matrix</h3>
        <Terminal
          {...args}
          variant="matrix"
          title="MATRIX TERMINAL"
          height="250px"
          enableMatrixRain={true}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-red-400">DOOM</h3>
        <Terminal {...args} variant="doom" title="DOOM TERMINAL" height="250px" prompt="DOOM> " />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">Swordfish</h3>
        <Terminal
          {...args}
          variant="swordfish"
          title="SWORDFISH TERMINAL"
          height="250px"
          prompt="sf> "
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-pink-400">Neon</h3>
        <Terminal {...args} variant="neon" title="NEON TERMINAL" height="250px" prompt="◉ " />
      </div>
    </div>
  ),
  args: {
    enableInput: false,
    enableScanlines: true,
    initialCommands: [
      {
        id: '1',
        command: 'echo "Cyberpunk Theme Variant"',
        output: 'Each variant has unique styling and colors',
        timestamp: new Date(),
        status: 'success',
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
};
