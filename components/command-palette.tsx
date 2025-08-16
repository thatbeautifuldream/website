'use client';

import { Command } from 'cmdk';
import { ExternalLinkIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  createCommandConfig,
  getAllActions,
  searchActions,
  type TCommandAction,
} from '@/lib/command-config';
import { cn } from '@/lib/utils';

type TCommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CommandPalette = ({
  open,
  onOpenChange,
}: TCommandPaletteProps) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const config = createCommandConfig(setTheme);
  const allActions = getAllActions(config);

  const filteredActions = search
    ? searchActions(allActions, search)
    : allActions;

  const executeAction = useCallback(
    async (action: TCommandAction) => {
      onOpenChange(false);

      try {
        if (action.href) {
          if (action.external) {
            window.open(action.href, '_blank', 'noopener,noreferrer');
          } else {
            router.push(action.href);
          }
        } else if (action.action) {
          await action.action();
          toast.success(`${action.label} executed successfully`);
        }
      } catch {
        toast.error('Failed to execute command');
      }
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }

      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      return () => clearTimeout(timer);
    }

    if (!open) {
      setSearch('');
    }
  }, [open]);

  const groupedActions = config.categories
    .map((category) => ({
      ...category,
      actions: category.actions.filter(
        (action) => !search || searchActions([action], search).length > 0
      ),
    }))
    .filter((category) => category.actions.length > 0);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-primary-foreground/50 backdrop-blur-lg">
      <div
        aria-label="Command palette"
        aria-modal="true"
        className="fixed top-[20%] left-[50%] w-full max-w-lg translate-x-[-50%]"
        role="dialog"
      >
        <Command className="mx-4 flex flex-col rounded-lg border bg-background shadow-lg">
          <div className="flex shrink-0 items-center border-b px-3">
            <SearchIcon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 opacity-50"
            />
            <Command.Input
              aria-label="Search commands"
              className="flex h-12 w-full rounded-md bg-transparent py-3 pl-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              ref={inputRef}
              value={search}
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100 sm:flex">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-muted-foreground text-sm">
              No commands found.
            </Command.Empty>

            {search ? (
              <Command.Group
                className="[&_[cmdk-group-heading]]:text-muted-foreground"
                heading="Search Results"
              >
                {filteredActions.slice(0, 10).map((action) => (
                  <CommandItem
                    action={action}
                    key={action.id}
                    onSelect={() => executeAction(action)}
                  />
                ))}
              </Command.Group>
            ) : (
              groupedActions.map((category) => (
                <Command.Group
                  className="[&_[cmdk-group-heading]]:text-muted-foreground"
                  heading={category.label}
                  key={category.id}
                >
                  {category.actions.map((action) => (
                    <CommandItem
                      action={action}
                      key={action.id}
                      onSelect={() => executeAction(action)}
                    />
                  ))}
                </Command.Group>
              ))
            )}
          </Command.List>

          <div className="flex shrink-0 items-center justify-between border-t p-2 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              Press
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[9px] text-muted-foreground opacity-100">
                ↵
              </kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[9px] text-muted-foreground opacity-100">
                ↑
              </kbd>
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[9px] text-muted-foreground opacity-100">
                ↓
              </kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[9px] text-muted-foreground opacity-100">
                ⌘ K
              </kbd>
              to open
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
};

type TCommandItemProps = {
  action: TCommandAction;
  onSelect: () => void;
};

const CommandItem = ({ action, onSelect }: TCommandItemProps) => {
  return (
    <Command.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground',
        'hover:bg-secondary/50 hover:text-secondary-foreground'
      )}
      key={action.id}
      onSelect={onSelect}
      value={action.label}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="truncate">{action.label}</span>
            {action.external && (
              <ExternalLinkIcon className="h-3 w-3 shrink-0 opacity-50" />
            )}
          </div>
          {action.description && (
            <span className="truncate text-muted-foreground text-xs">
              {action.description}
            </span>
          )}
        </div>
      </div>

      {action.shortcut && (
        <div className="ml-2 flex gap-1">
          {action.shortcut.map((key) => (
            <kbd
              className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-medium font-mono text-[9px] text-muted-foreground opacity-100"
              key={key}
            >
              {key}
            </kbd>
          ))}
        </div>
      )}
    </Command.Item>
  );
};
