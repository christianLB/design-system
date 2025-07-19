import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Types
export type TerminalVariant = 'matrix' | 'doom' | 'swordfish' | 'neon';
export type TerminalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TerminalCommand {
  id: string;
  command: string;
  output?: string;
  timestamp: Date;
  status?: 'success' | 'error' | 'warning';
}

export interface TypewriterConfig {
  speed: number;
  randomDelay: boolean;
  minDelay: number;
  maxDelay: number;
  enableCursor: boolean;
  pauseOnComplete: number;
}

export interface TerminalProps {
  /** Visual variant of the terminal */
  variant?: TerminalVariant;
  /** Size of the terminal */
  size?: TerminalSize;
  /** Terminal title displayed in header */
  title?: string;
  /** Whether to show the terminal header */
  showHeader?: boolean;
  /** Whether to show control buttons (minimize, maximize, close) */
  showControls?: boolean;
  /** Initial commands to display */
  initialCommands?: TerminalCommand[];
  /** Command history */
  commandHistory?: string[];
  /** Whether to enable command input */
  enableInput?: boolean;
  /** Placeholder text for input */
  inputPlaceholder?: string;
  /** Whether to enable typewriter effect */
  enableTypewriter?: boolean;
  /** Typewriter configuration */
  typewriterConfig?: Partial<TypewriterConfig>;
  /** Whether to enable auto-scroll */
  autoScroll?: boolean;
  /** Whether to enable scanlines effect */
  enableScanlines?: boolean;
  /** Whether to enable matrix rain background */
  enableMatrixRain?: boolean;
  /** Whether to enable sound effects integration points */
  enableSoundEffects?: boolean;
  /** Maximum number of commands to keep in history */
  maxHistoryLength?: number;
  /** Custom CSS classes */
  className?: string;
  /** Callback when command is executed */
  onCommandExecute?: (command: string) => void;
  /** Callback when command is cleared */
  onClear?: () => void;
  /** Custom prompt text */
  prompt?: string;
  /** Whether terminal is focused */
  focused?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Custom height */
  height?: string;
  /** Custom width */
  width?: string;
}

const defaultTypewriterConfig: TypewriterConfig = {
  speed: 50,
  randomDelay: true,
  minDelay: 20,
  maxDelay: 100,
  enableCursor: true,
  pauseOnComplete: 500,
};

const Terminal: React.FC<TerminalProps> = ({
  variant = 'matrix',
  size = 'md',
  title = 'Terminal',
  showHeader = true,
  showControls = true,
  initialCommands = [],
  commandHistory = [],
  enableInput = true,
  inputPlaceholder = 'Enter command...',
  enableTypewriter = true,
  typewriterConfig = {},
  autoScroll = true,
  enableScanlines = true,
  enableMatrixRain = false,
  enableSoundEffects = false,
  maxHistoryLength = 100,
  className,
  onCommandExecute,
  onClear,
  prompt = '$ ',
  focused = false,
  showLineNumbers = false,
  height,
  width,
}) => {
  // State
  const [commands, setCommands] = useState<TerminalCommand[]>(initialCommands);
  const [currentInput, setCurrentInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>(commandHistory);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isFocused, setIsFocused] = useState(focused);

  // Refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Merged typewriter config
  const mergedTypewriterConfig = { ...defaultTypewriterConfig, ...typewriterConfig };

  // Auto-scroll effect
  useEffect(() => {
    if (autoScroll && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [commands, autoScroll]);

  // Focus management
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Typewriter effect
  const typewriterEffect = useCallback((text: string, callback?: () => void) => {
    if (!enableTypewriter) {
      setTypewriterText(text);
      callback?.();
      return;
    }

    setIsTyping(true);
    setTypewriterText('');
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setTypewriterText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        const delay = mergedTypewriterConfig.randomDelay
          ? Math.random() * (mergedTypewriterConfig.maxDelay - mergedTypewriterConfig.minDelay) + mergedTypewriterConfig.minDelay
          : mergedTypewriterConfig.speed;

        setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          callback?.();
        }, mergedTypewriterConfig.pauseOnComplete);
      }
    };

    typeChar();
  }, [enableTypewriter, mergedTypewriterConfig]);

  // Cursor blink effect
  useEffect(() => {
    if (mergedTypewriterConfig.enableCursor) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [mergedTypewriterConfig.enableCursor]);

  // Handle command execution
  const executeCommand = useCallback((command: string) => {
    if (!command.trim()) return;

    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      command: command.trim(),
      timestamp: new Date(),
      status: 'success',
    };

    // Add to command history
    setCommands(prev => {
      const updated = [...prev, newCommand];
      return updated.length > maxHistoryLength
        ? updated.slice(-maxHistoryLength)
        : updated;
    });

    // Update input history
    setInputHistory(prev => {
      const updated = [...prev, command.trim()];
      return updated.length > maxHistoryLength
        ? updated.slice(-maxHistoryLength)
        : updated;
    });

    // Clear input
    setCurrentInput('');
    setHistoryIndex(-1);

    // Sound effect integration point
    if (enableSoundEffects) {
      // Integration point for sound effects
      console.log('🔊 Sound effect: command executed');
    }

    // Execute callback
    onCommandExecute?.(command.trim());
  }, [maxHistoryLength, enableSoundEffects, onCommandExecute]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        executeCommand(currentInput);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (inputHistory.length > 0) {
          const newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput('');
        }
        break;
      case 'Tab':
        e.preventDefault();
        // Auto-complete integration point
        break;
      case 'Escape':
        setCurrentInput('');
        setHistoryIndex(-1);
        break;
    }
  };

  // Handle clear command
  const handleClear = () => {
    setCommands([]);
    setCurrentInput('');
    setHistoryIndex(-1);
    onClear?.();
  };

  // Handle terminal click to focus
  const handleTerminalClick = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Build CSS classes
  const terminalClasses = clsx(
    'cyber-terminal',
    'terminal',
    `terminal--${variant}`,
    `terminal--${size}`,
    {
      'terminal--focused': isFocused,
      'terminal--scanlines': enableScanlines,
      'terminal--matrix-rain': enableMatrixRain,
      'terminal--with-header': showHeader,
      'terminal--line-numbers': showLineNumbers,
    },
    className
  );

  const contentClasses = clsx(
    'terminal-content',
    'font-mono',
    'text-sm',
    'leading-relaxed',
    'p-4',
    'overflow-y-auto',
    'flex-1',
    'bg-black/80',
    'backdrop-blur-sm'
  );

  return (
    <div
      ref={terminalRef}
      className={terminalClasses}
      onClick={handleTerminalClick}
      style={{
        height: height || '400px',
        width: width || '100%',
      }}
    >
      {/* Matrix Rain Background */}
      {enableMatrixRain && (
        <div className="terminal-matrix-rain">
          <div className="matrix-rain-overlay" />
        </div>
      )}

      {/* Scanlines Overlay */}
      {enableScanlines && (
        <div className="terminal-scanlines">
          <div className="scanlines-overlay" />
        </div>
      )}

      {/* Header */}
      {showHeader && (
        <TerminalHeader
          title={title}
          showControls={showControls}
          variant={variant}
          onClear={handleClear}
        />
      )}

      {/* Content */}
      <div ref={contentRef} className={contentClasses}>
        {/* Command History */}
        <AnimatePresence>
          {commands.map((command, index) => (
            <TerminalLine
              key={command.id}
              command={command}
              lineNumber={showLineNumbers ? index + 1 : undefined}
              variant={variant}
              enableTypewriter={enableTypewriter}
              typewriterConfig={mergedTypewriterConfig}
            />
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        {enableInput && (
          <TerminalInput
            ref={inputRef}
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            prompt={prompt}
            variant={variant}
            focused={isFocused}
            showCursor={showCursor && mergedTypewriterConfig.enableCursor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      </div>
    </div>
  );
};

// Terminal Header Component
interface TerminalHeaderProps {
  title: string;
  showControls: boolean;
  variant: TerminalVariant;
  onClear: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  title,
  showControls,
  variant,
  onClear,
}) => {
  return (
    <div className={clsx('terminal-header', `terminal-header--${variant}`)}>
      <div className="terminal-header-content">
        <div className="terminal-header-title">
          <span className="terminal-header-icon">▲</span>
          <span className="terminal-header-text">{title}</span>
        </div>
        {showControls && (
          <div className="terminal-header-controls">
            <button
              className="terminal-control terminal-control--minimize"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Minimize clicked');
              }}
            >
              −
            </button>
            <button
              className="terminal-control terminal-control--maximize"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Maximize clicked');
              }}
            >
              □
            </button>
            <button
              className="terminal-control terminal-control--close"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Terminal Line Component
interface TerminalLineProps {
  command: TerminalCommand;
  lineNumber?: number;
  variant: TerminalVariant;
  enableTypewriter: boolean;
  typewriterConfig: TypewriterConfig;
}

const TerminalLine: React.FC<TerminalLineProps> = ({
  command,
  lineNumber,
  variant,
  enableTypewriter,
  typewriterConfig,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(!enableTypewriter);

  // Typewriter effect for command output
  useEffect(() => {
    if (enableTypewriter && command.output) {
      let currentIndex = 0;
      const text = command.output;
      setDisplayText('');

      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          
          const delay = typewriterConfig.randomDelay
            ? Math.random() * (typewriterConfig.maxDelay - typewriterConfig.minDelay) + typewriterConfig.minDelay
            : typewriterConfig.speed;

          setTimeout(typeChar, delay);
        } else {
          setIsTypingComplete(true);
        }
      };

      typeChar();
    } else {
      setDisplayText(command.output || '');
      setIsTypingComplete(true);
    }
  }, [command.output, enableTypewriter, typewriterConfig]);

  const statusClasses = clsx(
    'terminal-line-status',
    command.status && `terminal-line-status--${command.status}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={clsx('terminal-line', `terminal-line--${variant}`)}
    >
      <div className="terminal-line-content">
        {lineNumber && (
          <span className="terminal-line-number">{lineNumber.toString().padStart(3, '0')}</span>
        )}
        <span className="terminal-line-prompt">$ </span>
        <span className="terminal-line-command">{command.command}</span>
        {command.status && <span className={statusClasses}>●</span>}
      </div>
      {command.output && (
        <div className="terminal-line-output">
          {displayText}
          {!isTypingComplete && typewriterConfig.enableCursor && (
            <span className="terminal-cursor animate-terminal-cursor">|</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Terminal Input Component
interface TerminalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  prompt: string;
  variant: TerminalVariant;
  focused: boolean;
  showCursor: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ value, onChange, onKeyDown, placeholder, prompt, variant, focused, showCursor, onFocus, onBlur }, ref) => {
    return (
      <div className={clsx('terminal-input-line', `terminal-input-line--${variant}`)}>
        <span className="terminal-input-prompt">{prompt}</span>
        <div className="terminal-input-wrapper">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            className={clsx('terminal-input', `terminal-input--${variant}`, {
              'terminal-input--focused': focused,
            })}
            spellCheck={false}
            autoComplete="off"
          />
          {showCursor && (
            <span className="terminal-cursor animate-terminal-cursor">|</span>
          )}
        </div>
      </div>
    );
  }
);

TerminalInput.displayName = 'TerminalInput';

export default Terminal;
export { Terminal, TerminalHeader, TerminalLine, TerminalInput };