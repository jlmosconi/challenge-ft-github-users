import {createRef} from 'react';
import {type NavigationContainerRef} from '@react-navigation/native';

type Route = {
  name: string;
  params?: object;
};

type Ref<T> = React.RefObject<T | null>;

export const navigationRef: Ref<NavigationContainerRef<Route>> = createRef();
export const navigationReadyRef: Ref<boolean> = createRef();

export function navigate(name: string, params?: object): void {
  if (navigationReadyRef.current && navigationRef.current) {
    // @ts-ignore - TypeScript doesn't recognize the navigate method on the ref
    navigationRef.current?.navigate(name, params);
  }
}

export function navigateBack(): void {
  if (navigationReadyRef.current && navigationRef.current) {
    navigationRef.current?.goBack();
  }
}
