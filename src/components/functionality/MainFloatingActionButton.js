import React from 'react'
import { FAB } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';
const [hiddenFabs, setHiddenFabs] = useState(false);

export function withFAB(WrappedComponent) {
  return (props) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
      <FloatingActionButton />
    </View>
  );
}

export function FloatingActionButton() {
  return (
    <FAB
      style={{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }}
      icon="plus"
      onPress={() => {
        setHiddenFabs(!hiddenFabs);
      }}
    />
  )
}

const FABS = () => {
    if (!hiddenFabs) {
      return (
        <FAB.Group
          open={hiddenFabs}
          icon={hiddenFabs ? 'close' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
            { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
            { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
          ]}
          onStateChange={({ open }) => setHiddenFabs(open)}
          onPress={() => {
            if (hiddenFabs) {

            }
          }}
        />
      );
    }
}
