import React, {
  useCallback,
  useState,
} from "react";

import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import AppHeader from "../../components/layout/AppHeader";
import Screen from "../../components/layout/Screen";
import AppTextInput from "../../components/forms/AppTextInput";

import {
  ShoppingListRecord,
  ShoppingListService,
} from "../../services";

import {
  Colors,
  Spacing,
} from "../../theme";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../../navigation/RootStack";

function formatDate(
  value: string
) {
  const parsedDate =
    new Date(value);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return value;
  }

  return parsedDate.toLocaleDateString(
    "en-PH",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

type ShoppingListNavigationProp =
  NativeStackNavigationProp<
    RootStackParamList
  >;

export default function ShoppingListScreen() {

  const navigation =
    useNavigation<
      ShoppingListNavigationProp
    >();

  const [lists, setLists] =
    useState<ShoppingListRecord[]>([]);

  const [search, setSearch] =
    useState("");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [listName, setListName] =
    useState("");

  const [nameError, setNameError] =
    useState("");

  const [
    editingList,
    setEditingList,
  ] = useState<
    ShoppingListRecord | null
  >(null);

  const loadLists =
    useCallback(() => {
      setLists(
        ShoppingListService.getAllLists()
      );
    }, []);

  useFocusEffect(
    useCallback(() => {
      loadLists();
    }, [loadLists])
  );

  const filteredLists =
    lists.filter(list => {
      const keyword =
        search.trim().toLowerCase();

      if (!keyword) {
        return true;
      }

      return list.name
        .toLowerCase()
        .includes(keyword);
    });

  function openCreateModal() {
    setEditingList(null);
    setListName("");
    setNameError("");
    setModalVisible(true);
  }

  function openRenameModal(
    list: ShoppingListRecord
  ) {
    setEditingList(list);
    setListName(list.name);
    setNameError("");
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditingList(null);
    setListName("");
    setNameError("");
  }

  function handleSaveList() {
    const cleanedName =
      listName.trim();

    if (!cleanedName) {
      setNameError(
        "List name is required."
      );

      return;
    }

    if (editingList) {
      ShoppingListService.renameList(
        editingList.id,
        cleanedName
      );
    } else {
      ShoppingListService.createList(
        cleanedName
      );
    }

    loadLists();
    closeModal();
  }

  function handleDelete(
    list: ShoppingListRecord
  ) {
    Alert.alert(
      "Delete Shopping List",
      `Delete "${list.name}" and all of its items?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            ShoppingListService.deleteList(
              list.id
            );

            loadLists();
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <AppHeader
        showMenu
        title="Shopping Lists"
      />

      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.searchArea}>
            <AppTextInput
              value={search}
              placeholder="Search shopping lists..."
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={openCreateModal}
          >
            <Text style={styles.addButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredLists}
          keyExtractor={item =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            filteredLists.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {lists.length === 0
                  ? "No shopping lists yet"
                  : "No matching lists"}
              </Text>

              <Text style={styles.emptyMessage}>
                {lists.length === 0
                  ? "Create your first shopping list."
                  : `No results for "${search}".`}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const itemCount =
              ShoppingListService.countItems(
                item.id
              );

            return (
              <TouchableOpacity
                style={styles.listCard}
                activeOpacity={0.75}
                onPress={() => {
                  navigation.navigate(
                    "ShoppingListDetails",
                    {
                      shoppingListId: item.id,
                    }
                  );
                }}
              >
                <View style={styles.listInfo}>
                  <Text style={styles.listName}>
                    {item.name}
                  </Text>

                  <Text style={styles.listMetadata}>
                    {itemCount}{" "}
                    {itemCount === 1
                      ? "item"
                      : "items"}
                    {" • "}
                    Created{" "}
                    {formatDate(
                      item.createdAt
                    )}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={event => {
                      event.stopPropagation();
                      openRenameModal(item);
                    }}
                  >
                    <Text style={styles.editActionText}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={event => {
                      event.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    <Text style={styles.deleteActionText}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingList
                ? "Rename Shopping List"
                : "Create Shopping List"}
            </Text>

            <TextInput
              style={[
                styles.modalInput,
                nameError
                  ? styles.modalInputError
                  : null,
              ]}
              value={listName}
              placeholder="List name"
              placeholderTextColor={
                Colors.textLight
              }
              autoFocus
              onChangeText={text => {
                setNameError("");
                setListName(text);
              }}
              onSubmitEditing={
                handleSaveList
              }
            />

            {nameError ? (
              <Text style={styles.nameError}>
                {nameError}
              </Text>
            ) : null}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.cancelModalButton,
                ]}
                onPress={closeModal}
              >
                <Text
                  style={
                    styles.cancelModalText
                  }
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.saveModalButton,
                ]}
                onPress={handleSaveList}
              >
                <Text
                  style={
                    styles.saveModalText
                  }
                >
                  {editingList
                    ? "Save"
                    : "Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },

  searchArea: {
    flex: 1,
  },

  addButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },

  addButtonText: {
    marginTop: -2,
    fontSize: 30,
    fontWeight: "400",
    color: "white",
  },

  list: {
    paddingBottom: Spacing.xl,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: Colors.text,
  },

  emptyMessage: {
    marginTop: Spacing.sm,
    textAlign: "center",
    color: Colors.textLight,
  },

  listCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    elevation: 2,
  },

  listInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  listName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  listMetadata: {
    marginTop: 5,
    fontSize: 11,
    color: Colors.textLight,
  },

  actions: {
    alignItems: "flex-end",
  },

  actionButton: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },

  editActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },

  deleteActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C62828",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor:
      "rgba(0, 0, 0, 0.45)",
  },

  modalCard: {
    padding: Spacing.lg,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },

  modalTitle: {
    marginBottom: Spacing.md,
    fontSize: 19,
    fontWeight: "700",
    color: Colors.text,
  },

  modalInput: {
    minHeight: 52,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.background,
  },

  modalInputError: {
    borderColor: "#C62828",
  },

  nameError: {
    marginTop: 5,
    fontSize: 12,
    color: "#C62828",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },

  modalButton: {
    minWidth: 90,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 10,
  },

  cancelModalButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  saveModalButton: {
    backgroundColor: Colors.primary,
  },

  cancelModalText: {
    fontWeight: "700",
    color: Colors.text,
  },

  saveModalText: {
    fontWeight: "700",
    color: "white",
  },
});