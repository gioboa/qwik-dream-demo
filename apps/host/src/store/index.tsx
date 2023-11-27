import { createContextId } from '@builder.io/qwik';

export interface AppState {
	showSeams: boolean;
	user: string;
}

export const GlobalAppState = createContextId<AppState>('AppState');
