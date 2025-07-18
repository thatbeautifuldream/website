'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, Trash2, Pencil } from 'lucide-react';

// Types
export type TTodoListEntry = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export type TTodoListResponse = {
    success: boolean;
    data: TTodoListEntry[];
    pagination?: {
        limit: number;
        offset: number;
        total: number;
    };
};

export type TCreateTodoResponse = {
    success: boolean;
    data?: TTodoListEntry;
    message?: string;
    error?: string;
};

export type TUpdateTodoResponse = TCreateTodoResponse;
export type TDeleteTodoResponse = TCreateTodoResponse;

const QUERY_KEYS = {
    todoList: ['todoList'] as const,
} as const;

// API functions
const fetchTodoListEntries = async (): Promise<TTodoListEntry[]> => {
    const response = await fetch('/api/todo-list');
    const data: TTodoListResponse = await response.json();
    if (!data.success) {
        throw new Error('Failed to load todo list entries');
    }
    return data.data;
};

const createTodoListEntry = async (entry: {
    title: string;
    description: string;
}): Promise<TTodoListEntry> => {
    const response = await fetch('/api/todo-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
    });
    const data: TCreateTodoResponse = await response.json();
    if (!(data.success && data.data)) {
        throw new Error(data.error || 'Failed to create todo');
    }
    return data.data;
};

const updateTodoListEntry = async (id: string, entry: {
    title: string;
    description: string;
}): Promise<TTodoListEntry> => {
    const response = await fetch(`/api/todo-list/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...entry }),
    });
    const data: TUpdateTodoResponse = await response.json();
    if (!(data.success && data.data)) {
        throw new Error(data.error || 'Failed to update todo');
    }
    return data.data;
};

const deleteTodoListEntry = async (id: string): Promise<TTodoListEntry> => {
    const response = await fetch(`/api/todo-list/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });
    const data: TDeleteTodoResponse = await response.json();
    if (!(data.success && data.data)) {
        throw new Error(data.error || 'Failed to delete todo');
    }
    return data.data;
};

export function TodoList() {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    const shouldReduceMotion = useReducedMotion();

    // Fetch todo list entries
    const {
        data: entries = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.todoList,
        queryFn: fetchTodoListEntries,
    });

    // Create entry mutation
    const createEntryMutation = useMutation({
        mutationFn: createTodoListEntry,
        onSuccess: (newEntry) => {
            queryClient.setQueryData<TTodoListEntry[]>(
                QUERY_KEYS.todoList,
                (oldData) => oldData ? [newEntry, ...oldData] : [newEntry]
            );
            setTitle('');
            setDescription('');
            setShowForm(false);
        },
    });

    // Update entry mutation
    const updateEntryMutation = useMutation({
        mutationFn: ({ id, entry }: { id: string; entry: { title: string; description: string } }) => updateTodoListEntry(id, entry),
        onSuccess: (updatedEntry) => {
            queryClient.setQueryData<TTodoListEntry[]>(
                QUERY_KEYS.todoList,
                (oldData) => oldData ? oldData.map(e => e.id === updatedEntry.id ? updatedEntry : e) : [updatedEntry]
            );
            setEditId(null);
            setTitle('');
            setDescription('');
            setShowForm(false);
        },
    });

    // Delete entry mutation
    const deleteEntryMutation = useMutation({
        mutationFn: deleteTodoListEntry,
        onSuccess: (deletedEntry) => {
            queryClient.setQueryData<TTodoListEntry[]>(
                QUERY_KEYS.todoList,
                (oldData) => oldData ? oldData.filter(e => e.id !== deletedEntry.id) : []
            );
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!(title.trim() && description.trim())) return;
        if (editId) {
            updateEntryMutation.mutate({ id: editId, entry: { title: title.trim(), description: description.trim() } });
        } else {
            createEntryMutation.mutate({ title: title.trim(), description: description.trim() });
        }
    };

    if (isLoading) {
        return (
            <Section className="gap-2">
                <div className="animate-pulse text-foreground-lighter text-sm">
                    Loading up the todo list...
                </div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section>
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
                    <p className="text-destructive">
                        Todo list is shy right now, try reloading?
                    </p>
                </div>
            </Section>
        );
    }

    return (
        <div className="space-y-8">
            {/* Add/Edit entry section */}
            <Section className="gap-0">
                <h1>{editId ? 'Edit Todo' : 'Add to Todo List'}</h1>
                <p className="text-foreground-lighter text-sm">
                    {editId ? 'Update your todo item.' : 'Add a new task to your todo list.'}
                </p>
            </Section>

            <Section delay={0.2}>
                <motion.div
                    className="rounded-lg border border-border/50 bg-card p-6"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {showForm || editId ? (
                            <motion.form
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                key="todo-form"
                                onSubmit={handleSubmit}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.2,
                                    ease: 'easeInOut',
                                }}
                            >
                                {(createEntryMutation.error || updateEntryMutation.error) && (
                                    <div className="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive text-sm">
                                        {createEntryMutation.error?.message || updateEntryMutation.error?.message}
                                    </div>
                                )}
                                <div>
                                    <label className="mb-2 block font-medium text-sm" htmlFor="title">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        maxLength={100}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Todo title"
                                        required
                                        type="text"
                                        value={title}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block font-medium text-sm" htmlFor="description">
                                        Description
                                    </label>
                                    <Textarea
                                        className="resize-none"
                                        id="description"
                                        maxLength={1000}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your task..."
                                        required
                                        rows={4}
                                        value={description}
                                    />
                                    <p className="mt-1 text-foreground-lighter text-xs">
                                        {description.length}/1000 characters
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 sm:flex-none"
                                        disabled={createEntryMutation.isPending || updateEntryMutation.isPending}
                                        type="submit"
                                    >
                                        {editId
                                            ? updateEntryMutation.isPending
                                                ? 'Updating...'
                                                : 'Update Todo'
                                            : createEntryMutation.isPending
                                                ? 'Adding...'
                                                : 'Add Todo'}
                                    </Button>
                                    <Button
                                        className="flex-1 sm:flex-none"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditId(null);
                                            setTitle('');
                                            setDescription('');
                                        }}
                                        type="button"
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                animate={{ opacity: 1 }}
                                className="text-center"
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                key="add-todo-button"
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.2,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => setShowForm(true)}
                                >
                                    Add Todo
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Section>

            {/* Todo List Entries */}
            {entries.length > 0 && (
                <Section delay={0.4}>
                    <div className="space-y-4">
                        <h2 className="font-normal text-foreground-lighter text-sm">
                            Todos ({entries.length})
                        </h2>
                        <div className="space-y-4">
                            {entries.map((entry, index) => (
                                <TodoListEntry
                                    key={entry.id}
                                    entry={entry}
                                    delay={0.6 + index * 0.1}
                                    onEdit={() => {
                                        setEditId(entry.id);
                                        setTitle(entry.title);
                                        setDescription(entry.description);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => deleteEntryMutation.mutate(entry.id)}
                                    isDeleting={deleteEntryMutation.isPending}
                                />
                            ))}
                        </div>
                    </div>
                </Section>
            )}
        </div>
    );
}

function TodoListEntry({
    entry,
    delay = 0,
    onEdit,
    onDelete,
    isDeleting,
}: {
    entry: TTodoListEntry;
    delay?: number;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };
    return (
        <Section className="gap-0" delay={delay}>
            <div className="group flex flex-col gap-1 border-none text-sm">
                <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold">{entry.title}</p>
                    <span className="h-px grow bg-border" />
                    <time className="text-foreground-lighter transition-colors">
                        {formatDate(entry.createdAt)}
                    </time>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="ml-2"
                        onClick={onEdit}
                        title="Edit"
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="ml-1"
                        onClick={onDelete}
                        disabled={isDeleting}
                        title="Delete"
                    >
                        {isDeleting ? <Loader2Icon size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </Button>
                </div>
                <blockquote className="mt-2 border-border border-l-2 pl-4 text-foreground-lighter text-sm italic leading-relaxed">
                    {entry.description}
                </blockquote>
            </div>
        </Section>
    );
}
