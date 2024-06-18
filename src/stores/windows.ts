import { create } from 'zustand'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Terminal from "@/components/Desktop/Window/Content/Terminal";
import Projects from "@/components/Desktop/Window/Content/Projects";
import { faTerminal, faDiagramProject } from '@fortawesome/free-solid-svg-icons';

export type AvailableWindows = 'terminal' | 'portfolio' | 'projects' | 'socials';
export type WindowSize = { width: number, height: number };
export type WindowPos = { x: number, y: number };
export type WindowContainer = { name: AvailableWindows, size?: WindowSize, pos?: WindowPos, open: boolean, minimize: boolean, fullscreen: boolean };

export interface IAvailableWindows {
    window: WindowContainer,
    windowChildren: () => React.JSX.Element,
    desktop: {
        className?: string,
        child: {
            icon: IconDefinition,
            css?: string,
        },
    }
}

export interface IGeneralStore {
    windows: IAvailableWindows[];
    activeWindow: AvailableWindows | undefined;

    updateActiveWindow: (activeWindow: AvailableWindows | undefined) => void;
    updateWindowSize: (windowName: AvailableWindows, size: WindowSize) => void;
    updateWindowPos: (windowName: AvailableWindows, pos: WindowPos) => void;

    toggleWindow: (windowName: AvailableWindows, action: boolean) => void;
    toggleWindowMinimize: (windowName: AvailableWindows, action: boolean) => void;
    toggleWindowFullScreen: (windowName: AvailableWindows, action: boolean) => void;
}

export const useWindowsStore = create<IGeneralStore>((set) => ({
    windows: [
        {
            window: {
                name: 'projects',
                open: false,
                minimize: false,
                fullscreen: false,
            },
            windowChildren: Projects,
            desktop: {
                className: '',
                child: {
                    icon: faDiagramProject,
                    css: 'font-size:40px;',
                },
            }
        },
        {
            window: {
                name: 'terminal',
                open: false,
                minimize: false,
                fullscreen: false,
            },
            windowChildren: Terminal,
            desktop: {
                className: 'h-[65px] w-[65px]',
                child: {
                    icon: faTerminal,
                    css: 'font-size:40px;',
                },
            }
        },
    ],
    activeWindow: undefined,

    updateActiveWindow: (activeWindow) => set(() => ({ activeWindow })),
    updateWindowSize: (windowName, data) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, size: data } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    updateWindowPos: (windowName, data) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, pos: data } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindow: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, open: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowMinimize: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, minimize: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowFullScreen: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, fullscreen: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
}));