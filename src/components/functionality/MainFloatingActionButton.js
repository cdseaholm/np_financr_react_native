import React from 'react';
import { FAB } from 'react-native-paper';
import { View } from 'react-native';
import { HomeFABs } from "../../components/functionality/screenFABs/HomeFAB";
import { CalendarFABs } from "../../components/functionality/screenFABs/CalendarFAB";
import { GoalFABs } from "../../components/functionality/screenFABs/GoalFAB";
import { StatFABs } from "../../components/functionality/screenFABs/StatFAB";

export function withFAB(WrappedComponent) {
  let fabs = [];
  if (WrappedComponent.name === 'Home') {
    fabs = HomeFABs;
  } else if (WrappedComponent.name === 'Calendar') {
    fabs = CalendarFABs;
  } else if (WrappedComponent.name === 'Goals') {
    fabs = GoalFABs;
  } else if (WrappedComponent.name === 'Stats') {
    fabs = StatFABs;
  } else {
    fabs = [...HomeFABs, ...CalendarFABs, ...GoalFABs, ...StatFABs];
  }

  return (props) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
      <FloatingActionButton fabs={fabs} />
    </View>
  );
}

export function FloatingActionButton({ fabs }) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  return (
    <FAB.Group
      open={state.open}
      icon={state.open ? 'close' : 'plus'}
      actions={fabs}
      onStateChange={onStateChange}
      onPress={() => {
        if (state.open) {
          // do something if the FAB is open
        }
      }}
      style={{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }}
    />
  );
}