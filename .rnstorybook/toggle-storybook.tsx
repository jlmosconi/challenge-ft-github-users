import {useState, useEffect, useCallback, type ReactNode, type PropsWithChildren} from 'react';
import {DevSettings} from 'react-native';

/**
 * ToggleStorybook
 *
 * Displays Storybook when triggered from the development menu.
 * Only works in __DEV__ mode.
 */
export function ToggleStorybook({children}: PropsWithChildren) {
  const [showStorybook, setShowStorybook] = useState(false);
  const [StorybookUI, setStorybookUI] = useState<ReactNode | null>(null);

  const toggleStorybook = useCallback(() => {
    setShowStorybook(prev => !prev);
  }, []);

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', toggleStorybook);

      // Lazy-load storybook only when in dev mode
      const {default: Storybook} = require('./index');
      setStorybookUI(<Storybook />);
    }
  }, [toggleStorybook]);

  if (__DEV__ && showStorybook && StorybookUI) {
    return <>{StorybookUI}</>;
  }

  return <>{children}</>;
}
