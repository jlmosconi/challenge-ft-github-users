import type {FC, PropsWithChildren} from 'react';
import {View, Text, StyleSheet, type ViewStyle} from 'react-native';

export interface UseCaseProps {
  /** The title. */
  text: string;
  /** When should we be using this? */
  usage?: string;
  /** A style override. Rarely used. */
  style?: ViewStyle;
  /** Don't use any padding because it's important to see the spacing. */
  noPad?: boolean;
  /** Don't use background color because it's important to see the color. */
  noBackground?: boolean;
}

export const UseCase: FC<PropsWithChildren<UseCaseProps>> = ({
  text,
  usage,
  style,
  noPad = false,
  noBackground = false,
  children,
}) => {
  const containerStyle: ViewStyle = {
    ...styles.component,
    padding: noPad ? 0 : 10,
    backgroundColor: noBackground ? 'transparent' : styles.component.backgroundColor,
    ...style,
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.useCaseWrapper}>
          <Text style={styles.useCase}>USE CASE</Text>
        </View>
        <Text style={styles.title}>{text}</Text>
        {usage && <Text style={styles.usage}>{usage}</Text>}
      </View>
      <View style={containerStyle}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  component: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FAFAFA',
  },
  useCaseWrapper: {
    marginBottom: 4,
  },
  useCase: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  usage: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
