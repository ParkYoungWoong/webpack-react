import type { FC, PropsWithChildren } from 'react';

/** @description Fix the problem that "children" is removed from React.FC */
export type RFC<T = unknown> = FC<PropsWithChildren<T>>;
