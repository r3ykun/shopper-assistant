//shopper-assistant\src\screens\Stores\StoresScreen.tsx
import React, {
  useEffect,
  useState,
} from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  STORE_LOGOS,
} from "../../constants/storeLogos";
import AppHeader from "../../components/layout/AppHeader";
import Screen from "../../components/layout/Screen";
import AppTextInput from "../../components/forms/AppTextInput";
import { Store } from "../../database/entities/Store";
import { database } from "../../database/database";
import {
  Colors,
  Spacing,
  Typography,
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
import{
	useStoreStore,
}from"../../stores";

export default function StoresScreen() {

  const{
    selectedStore,
    setSelectedStore,
  }=useStoreStore();

    type StoresNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "MainDrawer"
    >;

    const navigation =
    useNavigation<
        StoresNavigationProp
    >();

  const [stores, setStores] =
    useState<Store[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadStores();
  }, []);

  function loadStores() {
    const storedStores =
      database.getAllSync<Store>(`
        SELECT *
        FROM Stores
        ORDER BY name;
      `);

    setStores(storedStores);
  }

  const filteredStores =
    stores.filter(store => {
      const keyword =
        search.trim().toLowerCase();

      if (!keyword) {
        return true;
      }

      return (
        store.name
          .toLowerCase()
          .includes(keyword) ||
        (store.shortName ?? "")
          .toLowerCase()
          .includes(keyword) ||
        (store.category ?? "")
          .toLowerCase()
          .includes(keyword)
      );
    });

    function handleStorePress(
    store: Store
    ) {
    navigation.navigate(
        "StoreDetails",
        {
        storeId: store.id,
        }
    );
    }

  return (
    <Screen>
      <AppHeader
        showMenu
        title="Stores"
      />

      <View style={styles.container}>
        <Text style={styles.description}>
          Browse supported stores, view their
          details, or change the active store.
        </Text>

        <AppTextInput
          value={search}
          placeholder="Search stores..."
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredStores}
          keyExtractor={item =>
            item.id.toString()
          }
          numColumns={3}
          columnWrapperStyle={
            styles.columnWrapper
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredStores.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                No stores found
              </Text>

              <Text style={styles.emptyMessage}>
                No stores match “{search}”.
              </Text>
            </View>
          }
          renderItem={({item})=>{
            const isActive=
              selectedStore?.id===item.id;

            return(
              <View
                style={[
                  styles.storeCard,
                  isActive&&
                    styles.activeStoreCard,
                ]}
              >
                <TouchableOpacity
                  style={styles.storeDetailsButton}
                  activeOpacity={.75}
                  onPress={()=>
                    handleStorePress(item)
                  }
                >
                  <View style={styles.logoContainer}>
                    {STORE_LOGOS[
                      item.shortName??
                      item.name
                    ]?(
                      <Image
                        source={
                          STORE_LOGOS[
                            item.shortName??
                            item.name
                          ]
                        }
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    ):(
                      <Text style={styles.logoPlaceholder}>
                        🏪
                      </Text>
                    )}
                  </View>

                  <Text
                    style={styles.storeName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  {item.category?(
                    <Text
                      style={styles.category}
                      numberOfLines={1}
                    >
                      {item.category}
                    </Text>
                  ):null}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.selectStoreButton,
                    isActive&&
                      styles.activeStoreButton,
                  ]}
                  disabled={isActive}
                  onPress={()=>
                    setSelectedStore(item)
                  }
                >
                  <Text
                    style={[
                      styles.selectStoreText,
                      isActive&&
                        styles.activeStoreText,
                    ]}
                  >
                    {isActive
                      ?"Active"
                      :"Select"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
                  />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },

  description: {
    marginBottom: Spacing.md,
    fontSize: Typography.body,
    lineHeight: 20,
    color: Colors.textLight,
  },

  list: {
    paddingBottom: Spacing.xl,
  },

  columnWrapper: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  storeCard:{
    flex:1,
    minHeight:178,
    alignItems:"center",
    padding:Spacing.sm,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:14,
    backgroundColor:Colors.surface,
    elevation:2,
  },

  logoContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
    borderRadius: 32,
    backgroundColor: Colors.background,
  },

  logoPlaceholder: {
    fontSize: 30,
  },

  storeName: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },

  category: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 11,
    color: Colors.textLight,
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
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  emptyMessage: {
    marginTop: Spacing.sm,
    color: Colors.textLight,
  },

  logo: {
  width: "82%",
  height: "82%",
  },
  activeStoreCard:{
    borderColor:Colors.primary,
    borderWidth:2,
  },
  storeDetailsButton:{
    flex:1,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
  },
  selectStoreButton:{
    width:"100%",
    minHeight:34,
    justifyContent:"center",
    alignItems:"center",
    marginTop:Spacing.sm,
    borderWidth:1,
    borderColor:Colors.primary,
    borderRadius:9,
    backgroundColor:Colors.surface,
  },
  activeStoreButton:{
    backgroundColor:Colors.primary,
  },
  selectStoreText:{
    fontSize:11,
    fontWeight:"700",
    color:Colors.primary,
  },
  activeStoreText:{
    color:"#fff",
  },
});