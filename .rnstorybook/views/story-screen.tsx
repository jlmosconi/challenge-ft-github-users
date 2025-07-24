import type {PropsWithChildren, FC} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
export const StoryScreen: FC<PropsWithChildren> = ({children}) => (
  <KeyboardAvoidingView style={styles.root} behavior={behavior} keyboardVerticalOffset={50}>
    {children}
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
});
