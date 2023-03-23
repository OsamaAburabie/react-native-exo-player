import React, { memo } from "react";
import { View, Text } from "react-native";

import useActiveTrack from "../hooks/useActiveTrack";

const MetaData = () => {
  const track = useActiveTrack();

  console.log(track);

  return (
    <View>
      <Text>{track?.title}</Text>
      <Text>{track?.artist}</Text>
      <Text>{track?.title}</Text>
    </View>
  );
};

export default memo(MetaData);
