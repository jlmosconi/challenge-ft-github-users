import {ScrollView, View, type ViewStyle} from 'react-native';
import type {PropsWithChildren} from 'react';

const ROOT: ViewStyle = {flex: 1};

export function Story({children}: PropsWithChildren) {
  return (
    <View style={ROOT}>
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </View>
  );
}
