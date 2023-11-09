import { Signal, createContextId } from '@builder.io/qwik';

export interface AppState {
	showSeams: boolean;
	user: Readonly<Signal<string>>;
}

export const GlobalAppState = createContextId<AppState>('AppState');
