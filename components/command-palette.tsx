'use client';

import { ExternalLinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Section } from '@/components/section';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import {
  createCommandConfig,
  getAllActions,
  searchActions,
  type TCommandAction,
} from '@/lib/command-config';

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

  let delayCounter = 0.01;
  const getNextDelay = () => {
    delayCounter += 0.01;
    return delayCounter;
  };

  return (
    <Section delay={getNextDelay()}>
      <CommandDialog
        anchorTop={true}
        className="max-w-lg"
        description="Search for a command to run..."
        onOpenChange={onOpenChange}
        open={open}
        showCloseButton={false}
        title="Command Palette"
      >
        <Section delay={getNextDelay()}>
          <CommandInput
            onValueChange={setSearch}
            placeholder="Type a command or search..."
            value={search}
          />
        </Section>

        <Section delay={getNextDelay()}>
          <CommandList className="max-h-[400px]">
            <CommandEmpty>No commands found.</CommandEmpty>

            {search ? (
              <Section delay={getNextDelay()}>
                <CommandGroup heading="Search Results">
                  {filteredActions.slice(0, 10).map((action) => (
                    <Section delay={getNextDelay()} key={action.id}>
                      <CommandPaletteItem
                        action={action}
                        onSelect={() => executeAction(action)}
                      />
                    </Section>
                  ))}
                </CommandGroup>
              </Section>
            ) : (
              groupedActions.map((category) => (
                <Section delay={getNextDelay()} key={category.id}>
                  <CommandGroup heading={category.label}>
                    {category.actions.map((action) => (
                      <Section delay={getNextDelay()} key={action.id}>
                        <CommandPaletteItem
                          action={action}
                          onSelect={() => executeAction(action)}
                        />
                      </Section>
                    ))}
                  </CommandGroup>
                </Section>
              ))
            )}
          </CommandList>
        </Section>
      </CommandDialog>
    </Section>
  );
};

type TCommandPaletteItemProps = {
  action: TCommandAction;
  onSelect: () => void;
};

const CommandPaletteItem = ({ action, onSelect }: TCommandPaletteItemProps) => {
  return (
    <CommandItem
      className="flex items-center gap-2"
      onSelect={onSelect}
      value={action.label}
    >
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

      {action.shortcut && (
        <div className="ml-auto flex gap-1">
          {action.shortcut.map((key) => (
            <CommandShortcut key={key}>{key}</CommandShortcut>
          ))}
        </div>
      )}
    </CommandItem>
  );
};
