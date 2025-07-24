import type {FC, PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export const StoryBlock: FC<PropsWithChildren> = ({children}) => {
  return (
    <View style={styles.root}>
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
