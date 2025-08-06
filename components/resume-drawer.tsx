'use client';

import { Drawer } from 'vaul';

type TResumeDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const ResumeDrawer = ({ isOpen, onClose }: TResumeDrawerProps) => {
    return (
        <Drawer.Root open={isOpen} onOpenChange={onClose}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-background h-[88vh] fixed bottom-0 left-0 right-0 outline-none flex flex-col">
                    <div className="flex justify-center pt-3 pb-2">
                        <div className="w-12 h-1 bg-border" />
                    </div>
                    <div className="flex-1">
                        <iframe
                            src="https://resume.milind.app/"
                            className="w-full h-full border-0 rounded-lg"
                            title="Milind Mishra's Resume"
                            loading="lazy"
                        />
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}; 