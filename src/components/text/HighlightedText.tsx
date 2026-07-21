import React from "react";

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

import {
  Colors,
} from "../../theme";

type Props = {
  text: string;
  query: string;
  style?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

function escapeRegExp(value: string) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

export default function HighlightedText({
  text,
  query,
  style,
  highlightStyle,
  numberOfLines,
}: Props) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return (
      <Text
        style={style}
        numberOfLines={numberOfLines}
      >
        {text}
      </Text>
    );
  }

  const escapedQuery =
    escapeRegExp(trimmedQuery);

  const expression = new RegExp(
    `(${escapedQuery})`,
    "gi"
  );

  const exactMatch = new RegExp(
    `^${escapedQuery}$`,
    "i"
  );

  const parts = text.split(expression);

  return (
    <Text
      style={style}
      numberOfLines={numberOfLines}
    >
      {parts.map((part, index) => {
        const highlighted =
          exactMatch.test(part);

        return (
          <Text
            key={`${part}-${index}`}
            style={
              highlighted
                ? [
                    styles.highlight,
                    highlightStyle,
                  ]
                : undefined
            }
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "800",
    color: Colors.primary,
    backgroundColor: "#FFF3CD",
  },
});