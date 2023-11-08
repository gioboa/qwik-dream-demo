import { createContextId } from '@builder.io/qwik';

export interface AppState {
	showSeams: boolean;
}

export const GlobalAppState = createContextId<AppState>('AppState');
