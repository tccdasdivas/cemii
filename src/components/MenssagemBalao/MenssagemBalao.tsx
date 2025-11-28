import React from "react";
import { View, Text } from "react-native";

export function MenssagemBalao({ texto, isyou }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: isyou ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: isyou ? 'rgba(142, 196, 110,0.6)' : "rgba(127, 169, 199,0.6)",
          borderRadius: 15,
          paddingVertical: 8,
          paddingHorizontal: 12,
          maxWidth: "70%",
          borderColor: isyou ? 'rgba(40, 55, 32,0.6)' : "rgba(6, 2, 82,0.6)",
          borderWidth:1,
        }}
      >
        <Text style={{ color: "#5b3000", fontSize: 15, fontFamily: 'Quicksand-Bold' }}>{texto}</Text>
      </View>
    </View>
  );
}
