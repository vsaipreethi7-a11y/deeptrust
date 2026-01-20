import { useEffect } from 'react';

/**
 * ContentProtection Component
 * 
 * Implements basic content protection measures:
 * - Disables right-click context menu
 * - Prevents text selection
 * - Blocks common keyboard shortcuts (Ctrl+C, Ctrl+A, Ctrl+U, etc.)
 * - Disables drag-and-drop
 * - Prevents image dragging
 * 
 * Note: These measures deter casual copying but can be bypassed by determined users.
 * For truly sensitive content, use authentication and server-side protection.
 */
export const ContentProtection = () => {
    useEffect(() => {
        // Disable right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable text selection via mouse
        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // Disable keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable Ctrl+C (Copy)
            if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+A (Select All)
            if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+P (Print)
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                return false;
            }
            // Disable F12 (Developer Tools)
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                return false;
            }
            // Disable Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }
        };

        // Disable drag and drop
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable copy event
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable cut event
        const handleCut = (e: ClipboardEvent) => {
            e.preventDefault();
            return false;
        };

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('selectstart', handleSelectStart);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCut);

        // Add CSS to prevent text selection
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-touch-callout: none;
            }
            
            /* Allow selection in input fields for usability */
            input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            /* Prevent image dragging */
            img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
                pointer-events: none;
            }
            
            /* Re-enable pointer events for interactive elements */
            a, button, input, textarea, select {
                pointer-events: auto !important;
            }
        `;
        document.head.appendChild(style);

        // Cleanup function
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('selectstart', handleSelectStart);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCut);
            document.head.removeChild(style);
        };
    }, []);

    // This component doesn't render anything visible
    return null;
};
