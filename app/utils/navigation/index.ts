import {createRef} from 'react';
import {
  CommonActions,
  type ParamListBase,
  type NavigationContainerRef,
  type NavigationProp,
} from '@react-navigation/native';

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

export function navigateAndSimpleReset<P extends ParamListBase, RouteName extends string>(
  name: string,
  navigation?: NavigationProp<P, RouteName>,
) {
  const dispatch = navigation
    ? navigation.dispatch
    : navigationReadyRef.current && navigationRef.current
    ? navigationRef.current.dispatch
    : undefined;

  if (dispatch) {
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name}],
      }),
    );
  } else {
    console.error('Unable to dispatch navigation action: No navigation reference available');
  }
}

export function navigateBack(): void {
  if (navigationReadyRef.current && navigationRef.current) {
    navigationRef.current?.goBack();
  }
}
