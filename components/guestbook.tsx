'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, TrendingUp } from 'lucide-react';

type TGuestbookEntry = {
    id: string;
    name: string;
    message: string;
    createdAt: string;
    updatedAt: string;
};

type TGuestbookResponse = {
    success: boolean;
    data: TGuestbookEntry[];
    pagination?: {
        limit: number;
        offset: number;
        total: number;
    };
};

type TCreateEntryResponse = {
    success: boolean;
    data?: TGuestbookEntry;
    message?: string;
    error?: string;
};

// Query keys
const QUERY_KEYS = {
    guestbook: ['guestbook'] as const,
} as const;

// API functions
const fetchGuestbookEntries = async (): Promise<TGuestbookEntry[]> => {
    const response = await fetch('/api/guestbook');
    const data: TGuestbookResponse = await response.json();

    if (!data.success) {
        throw new Error('Failed to load guestbook entries');
    }

    return data.data;
};

const createGuestbookEntry = async (entry: {
    name: string;
    message: string;
}): Promise<TGuestbookEntry> => {
    const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });

    const data: TCreateEntryResponse = await response.json();

    if (!(data.success && data.data)) {
        throw new Error(data.error || 'Failed to create entry');
    }

    return data.data;
};

export function Guestbook() {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const shouldReduceMotion = useReducedMotion();

    // Fetch guestbook entries
    const {
        data: entries = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: QUERY_KEYS.guestbook,
        queryFn: fetchGuestbookEntries,
    });

    // Create entry mutation
    const createEntryMutation = useMutation({
        mutationFn: createGuestbookEntry,
        onSuccess: (newEntry) => {
            // Optimistically update the cache
            queryClient.setQueryData<TGuestbookEntry[]>(
                QUERY_KEYS.guestbook,
                (oldData) => {
                    return oldData ? [newEntry, ...oldData] : [newEntry];
                }
            );

            // Reset form
            setName('');
            setMessage('');
            setShowForm(false);
        },
        onError: () => {
            // Error is handled by the mutation error state
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!(name.trim() && message.trim())) {
            return;
        }

        createEntryMutation.mutate({
            name: name.trim(),
            message: message.trim(),
        });
    };

    if (isLoading) {
        return (
            <Section className="gap-2">
                <div className="animate-pulse text-foreground-lighter text-sm">
                    Loading up the guestbook...
                </div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section>
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
                    <p className="text-destructive">
                        Guestbook is shy right now, try reloading?
                    </p>
                </div>
            </Section>
        );
    }

    return (
        <div className="space-y-8">
            {/* Add entry section */}
            <Section className="gap-0">
                <h1>Sign the Guestbook</h1>
                <p className="text-foreground-lighter text-sm">
                    Leave your message and be part of the conversation.
                </p>
            </Section>

            <Section delay={0.2}>
                <motion.div
                    className="rounded-lg border border-border/50 bg-card p-6"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {showForm ? (
                            <motion.form
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                key="guestbook-form"
                                onSubmit={handleSubmit}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.2,
                                    ease: 'easeInOut',
                                }}
                            >
                                {createEntryMutation.error && (
                                    <div className="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive text-sm">
                                        {createEntryMutation.error.message}
                                    </div>
                                )}

                                <div>
                                    <label
                                        className="mb-2 block font-medium text-sm"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        maxLength={100}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        required
                                        type="text"
                                        value={name}
                                    />
                                </div>

                                <div>
                                    <label
                                        className="mb-2 block font-medium text-sm"
                                        htmlFor="message"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        className="resize-none"
                                        id="message"
                                        maxLength={1000}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Leave your message here..."
                                        required
                                        rows={4}
                                        value={message}
                                    />
                                    <p className="mt-1 text-foreground-lighter text-xs">
                                        {message.length}/1000 characters
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 sm:flex-none"
                                        disabled={createEntryMutation.isPending}
                                        type="submit"
                                    >
                                        {createEntryMutation.isPending
                                            ? 'Signing...'
                                            : 'Sign Guestbook'}
                                    </Button>
                                    <Button
                                        className="flex-1 sm:flex-none"
                                        onClick={() => {
                                            setShowForm(false);
                                            setName('');
                                            setMessage('');
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
                                key="add-entry-button"
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.2,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Button
                                    className="w-full sm:w-auto"
                                    onClick={() => setShowForm(true)}
                                >
                                    Add Your Entry
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Section>

            {/* Guestbook Entries */}
            {entries.length > 0 && (
                <Section delay={0.4}>
                    <div className="space-y-4">
                        <h2 className="font-normal text-foreground-lighter text-sm">
                            Messages ({entries.length})
                        </h2>

                        <div className="space-y-4">
                            {entries.map((entry, index) => (
                                <GuestbookEntry
                                    delay={0.6 + index * 0.1}
                                    entry={entry}
                                    key={entry.id}
                                />
                            ))}
                        </div>
                    </div>
                </Section>
            )}
        </div>
    );
}

function GuestbookEntry({
    entry,
    delay = 0,
}: {
    entry: TGuestbookEntry;
    delay?: number;
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
                    <p className="text-foreground">{entry.name}</p>
                    <span className="h-px grow bg-border" />
                    <time className="text-foreground-lighter transition-colors">
                        {formatDate(entry.createdAt)}
                    </time>
                </div>
                <blockquote className="mt-2 border-border border-l-2 pl-4 text-foreground-lighter text-sm italic leading-relaxed">
                    {entry.message}
                </blockquote>
            </div>
        </Section>
    );
}
