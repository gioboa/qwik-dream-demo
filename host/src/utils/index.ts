import { remotes } from '~/constants/remotes';

export const getTargetFromRemoteName = (name: keyof typeof remotes) =>
	remotes[name];
