/**
 * Tree Component
 *
 * A hierarchical tree view component for displaying nested data
 * with expand/collapse, selection, and drag-drop support.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from 'lucide-react';
import { cn } from '../../utils/cn';

const treeVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg p-2',
      flush: '',
    },
    size: {
      sm: 'text-sm',
      md: '',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const treeNodeVariants = cva('flex items-center gap-2 rounded-md transition-colors', {
  variants: {
    size: {
      sm: 'px-2 py-1',
      md: 'px-2 py-1.5',
      lg: 'px-3 py-2',
    },
    selected: {
      true: 'bg-primary/10 text-primary',
      false: 'hover:bg-muted/50',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    size: 'md',
    selected: false,
    disabled: false,
  },
});

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: unknown;
}

export interface TreeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof treeVariants> {
  /** Tree data */
  nodes: TreeNode[];
  /** Selected node IDs */
  selected?: string[];
  /** Expanded node IDs */
  expanded?: string[];
  /** Selection mode */
  selectionMode?: 'none' | 'single' | 'multiple';
  /** Selection change handler */
  onSelect?: (nodeIds: string[], nodes: TreeNode[]) => void;
  /** Expansion change handler */
  onExpand?: (nodeIds: string[]) => void;
  /** Node click handler */
  onNodeClick?: (node: TreeNode) => void;
  /** Show default icons for folders/files */
  showIcons?: boolean;
  /** Show lines connecting nodes */
  showLines?: boolean;
  /** Initial expanded state */
  defaultExpanded?: 'all' | 'none' | string[];
  /** Animate expand/collapse */
  animated?: boolean;
  /** Indent size in pixels */
  indentSize?: number;
  /** Custom node renderer */
  renderNode?: (node: TreeNode, depth: number) => React.ReactNode;
  /** Expandable indicator position */
  expanderPosition?: 'start' | 'end';
}

// Helper to collect all node IDs
function collectAllNodeIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  const traverse = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) traverse(node.children);
    }
  };
  traverse(nodes);
  return ids;
}

// Helper to find a node by ID
function findNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  size: 'sm' | 'md' | 'lg';
  selected: string[];
  expanded: string[];
  selectionMode: 'none' | 'single' | 'multiple';
  showIcons: boolean;
  showLines: boolean;
  animated: boolean;
  indentSize: number;
  expanderPosition: 'start' | 'end';
  onToggleExpand: (nodeId: string) => void;
  onSelect: (node: TreeNode) => void;
  renderNode?: (node: TreeNode, depth: number) => React.ReactNode;
}

function TreeNodeItem({
  node,
  depth,
  size,
  selected,
  expanded,
  selectionMode,
  showIcons,
  showLines,
  animated,
  indentSize,
  expanderPosition,
  onToggleExpand,
  onSelect,
  renderNode,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected.includes(node.id);

  const handleClick = () => {
    if (node.disabled) return;
    onSelect(node);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  const defaultIcon = hasChildren ? (
    isExpanded ? (
      <FolderOpen className="h-4 w-4 text-primary" />
    ) : (
      <Folder className="h-4 w-4 text-muted-foreground" />
    )
  ) : (
    <File className="h-4 w-4 text-muted-foreground" />
  );

  const expandIcon = hasChildren && (
    <button
      type="button"
      onClick={handleExpandClick}
      className="p-0.5 rounded hover:bg-muted"
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
    >
      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  );

  const content = renderNode ? (
    renderNode(node, depth)
  ) : (
    <>
      {expanderPosition === 'start' && (hasChildren ? expandIcon : <span className="w-5" />)}
      {showIcons && (node.icon || defaultIcon)}
      <span className="flex-1 truncate">{node.label}</span>
      {expanderPosition === 'end' && hasChildren && expandIcon}
    </>
  );

  const animation = animated
    ? {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={cn(
          treeNodeVariants({ size, selected: isSelected, disabled: node.disabled }),
          showLines && depth > 0 && 'relative',
        )}
        style={{ paddingLeft: `${depth * indentSize + 8}px` }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
          if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
            onToggleExpand(node.id);
          }
          if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
            onToggleExpand(node.id);
          }
        }}
        tabIndex={node.disabled ? -1 : 0}
        aria-selected={selectionMode !== 'none' ? isSelected : undefined}
        aria-disabled={node.disabled}
      >
        {/* Connection line */}
        {showLines && depth > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 border-l border-border"
            style={{ left: `${(depth - 1) * indentSize + 16}px` }}
          />
        )}
        {content}
      </div>

      {/* Children */}
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div role="group" {...animation}>
              {node.children!.map((child) => (
                <TreeNodeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  size={size}
                  selected={selected}
                  expanded={expanded}
                  selectionMode={selectionMode}
                  showIcons={showIcons}
                  showLines={showLines}
                  animated={animated}
                  indentSize={indentSize}
                  expanderPosition={expanderPosition}
                  onToggleExpand={onToggleExpand}
                  onSelect={onSelect}
                  renderNode={renderNode}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      nodes,
      variant,
      size = 'md',
      selected: controlledSelected,
      expanded: controlledExpanded,
      selectionMode = 'single',
      onSelect,
      onExpand,
      onNodeClick,
      showIcons = true,
      showLines = false,
      defaultExpanded = 'none',
      animated = true,
      indentSize = 20,
      renderNode,
      expanderPosition = 'start',
      className,
      ...props
    },
    ref,
  ) => {
    // Initialize expanded state
    const getInitialExpanded = () => {
      if (Array.isArray(defaultExpanded)) return defaultExpanded;
      if (defaultExpanded === 'all') return collectAllNodeIds(nodes);
      return [];
    };

    const [internalSelected, setInternalSelected] = React.useState<string[]>([]);
    const [internalExpanded, setInternalExpanded] = React.useState<string[]>(getInitialExpanded);

    const selected = controlledSelected ?? internalSelected;
    const expanded = controlledExpanded ?? internalExpanded;

    const handleToggleExpand = (nodeId: string) => {
      const newExpanded = expanded.includes(nodeId)
        ? expanded.filter((id) => id !== nodeId)
        : [...expanded, nodeId];

      if (!controlledExpanded) {
        setInternalExpanded(newExpanded);
      }
      onExpand?.(newExpanded);
    };

    const handleSelect = (node: TreeNode) => {
      onNodeClick?.(node);

      if (selectionMode === 'none') return;

      let newSelected: string[];
      if (selectionMode === 'single') {
        newSelected = [node.id];
      } else {
        newSelected = selected.includes(node.id)
          ? selected.filter((id) => id !== node.id)
          : [...selected, node.id];
      }

      if (!controlledSelected) {
        setInternalSelected(newSelected);
      }

      const selectedNodes = newSelected
        .map((id) => findNode(nodes, id))
        .filter(Boolean) as TreeNode[];
      onSelect?.(newSelected, selectedNodes);
    };

    return (
      <div
        ref={ref}
        role="tree"
        aria-multiselectable={selectionMode === 'multiple'}
        className={cn(treeVariants({ variant, size }), className)}
        {...props}
      >
        {nodes.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            depth={0}
            size={size || 'md'}
            selected={selected}
            expanded={expanded}
            selectionMode={selectionMode}
            showIcons={showIcons}
            showLines={showLines}
            animated={animated}
            indentSize={indentSize}
            expanderPosition={expanderPosition}
            onToggleExpand={handleToggleExpand}
            onSelect={handleSelect}
            renderNode={renderNode}
          />
        ))}
      </div>
    );
  },
);

Tree.displayName = 'Tree';

export { treeVariants, treeNodeVariants };
export default Tree;
