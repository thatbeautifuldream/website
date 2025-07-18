import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { TodoList } from '@/components/todo-list';

const title = 'Todo List';
const description = `Milind's todo list to keep track of tasks and stay organized!`;

export const metadata: Metadata = createMetadata({
    title,
    description,
    ogText: `Milind's Todo List — Sign and leave a message!`,
});

export default function TodoListPage() {
    return (
        <>
            <Section className="gap-0">
                <h1>{title}</h1>
                <p className="text-foreground-lighter">
                    Track tasks, manage to-dos, and stay organized.
                </p>
            </Section>
            <Section delay={0.2}>
                <TodoList />
            </Section>
        </>
    );
}
