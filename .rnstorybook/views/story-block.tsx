import type {FC, PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View, type ViewStyle} from 'react-native';

interface StoryBlockProps extends PropsWithChildren {
  noPadding?: boolean;
  style?: ViewStyle;
}

export const StoryBlock: FC<StoryBlockProps> = ({children, noPadding = false, style}) => {
  return (
    <View style={[styles.root, !noPadding && styles.padded, style]}>
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  padded: {
    padding: 16,
  },
});
