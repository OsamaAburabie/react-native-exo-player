import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativeExoPlayer from 'react-native-exo-player';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativeExoPlayer.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
