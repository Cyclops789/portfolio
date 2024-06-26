import { create } from 'zustand'

export interface ICommandsStore {
    commandPlaceHolder: string | null;
    commands: string[] | null;

    setCommandPlaceHolder: (commandPlaceHolder: string) => void;
    setCommands: (command: string[]) => void;
    addCommand: (command: string) => void;
}

export const useCommandsStore = create<ICommandsStore>((set) => ({
    commandPlaceHolder: null,
    commands: null,

    setCommandPlaceHolder: (commandPlaceHolder) => set(() => ({ commandPlaceHolder })),
    setCommands: (commands) => set(() => ({ commands })),
    addCommand: (command) => set(({ commands }) => ({ commands: [...commands || [], command] })),
}));