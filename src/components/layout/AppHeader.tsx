import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useStoreStore,
} from "../../stores";

import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onBackPress?: () => void;
};

export default function AppHeader({
  title,
  showBack = false,
  showMenu = false,
  onBackPress,
}: Props) {
  const navigation =
    useNavigation<any>();

  const { selectedStore } =
    useStoreStore();

    function handleLeftPress() {
    if (showBack) {
        if (onBackPress) {
        onBackPress();
        return;
        }

        if (navigation.canGoBack()) {
        navigation.goBack();
        return;
        }

        navigation.navigate("MainDrawer");
        return;
    }

    if (showMenu) {
        navigation.openDrawer();
    }
    }

  const leftIcon = showBack
    ? "‹"
    : showMenu
      ? "☰"
      : "";

  const headerTitle =
    title ??
    selectedStore?.name ??
    "Shopper Assistant";

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={handleLeftPress}
        disabled={!showBack && !showMenu}
      >
        <Text style={styles.leftIcon}>
          {leftIcon}
        </Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {headerTitle}
        </Text>
      </View>

      <View style={styles.rightSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
    elevation: 3,
  },

  leftButton: {
    width: 62,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  leftIcon: {
    fontSize: 32,
    color: Colors.text,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: "700",
    color: Colors.text,
  },

  rightSpace: {
    width: 62,
  },
});