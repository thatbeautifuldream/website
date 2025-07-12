'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type TGuestbookEntry = {
    id: number;
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

export function Guestbook() {
    const [entries, setEntries] = useState<TGuestbookEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    // Fetch guestbook entries
    const fetchEntries = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/guestbook');
            const data: TGuestbookResponse = await response.json();

            if (data.success) {
                setEntries(data.data);
            } else {
                setError('Failed to load guestbook entries');
            }
        } catch {
            setError('Error loading guestbook entries');
        } finally {
            setLoading(false);
        }
    }, []);

    // Submit new entry
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!(name.trim() && message.trim())) {
            setError('Please fill in both name and message');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    message: message.trim(),
                }),
            });

            const data: TCreateEntryResponse = await response.json();

            if (data.success && data.data) {
                setEntries([data.data, ...entries]);
                setName('');
                setMessage('');
                setShowForm(false);
            } else {
                setError(data.error || 'Failed to create entry');
            }
        } catch {
            setError('Error submitting entry');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className='h-8 w-8 animate-spin rounded-full border-gray-900 border-b-2' />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Add entry section */}
            <div className='rounded-lg border bg-card p-6'>
                {showForm ? (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <h2 className='mb-4 font-semibold text-xl'>Sign the Guestbook</h2>

                        {error && (
                            <div className='rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700'>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className='mb-2 block font-medium text-sm' htmlFor="name">
                                Name
                            </label>
                            <input
                                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                                className='mb-2 block font-medium text-sm'
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                className='w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                                id="message"
                                maxLength={1000}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Leave your message here..."
                                required
                                rows={4}
                                value={message}
                            />
                            <p className='mt-1 text-gray-500 text-sm'>
                                {message.length}/1000 characters
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                className="flex-1 sm:flex-none"
                                disabled={submitting}
                                type="submit"
                            >
                                {submitting ? 'Signing...' : 'Sign Guestbook'}
                            </Button>
                            <Button
                                className="flex-1 sm:flex-none"
                                onClick={() => {
                                    setShowForm(false);
                                    setName('');
                                    setMessage('');
                                    setError(null);
                                }}
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className='mb-4 font-semibold text-xl'>Sign the Guestbook</h2>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() => setShowForm(true)}
                        >
                            Add Your Entry
                        </Button>
                    </div>
                )}
            </div>

            {/* Entries list */}
            <div className="space-y-4">
                <h2 className='font-semibold text-xl'>Messages ({entries.length})</h2>

                {entries.length === 0 ? (
                    <div className='py-8 text-center text-gray-500'>
                        <p>No entries yet. Be the first to sign the guestbook!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {entries.map((entry) => (
                            <GuestbookEntry entry={entry} key={entry.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function GuestbookEntry({ entry }: { entry: TGuestbookEntry }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className='rounded-lg border bg-card p-4'>
            <div className='mb-3 flex items-start justify-between'>
                <h3 className="font-semibold text-lg">{entry.name}</h3>
                <time className='text-gray-500 text-sm'>
                    {formatDate(entry.createdAt)}
                </time>
            </div>
            <p className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                {entry.message}
            </p>
        </div>
    );
}
