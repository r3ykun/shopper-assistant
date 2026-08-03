//shopper-assistant\src\screens\Analytics\AnalyticsScreen.tsx
import React, {
	useCallback,
  useEffect,
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppHeader from "../../components/layout/AppHeader";
import Screen from "../../components/layout/Screen";
import AppDropdown from "../../components/forms/AppDropdown";
import { Store } from "../../database/entities/Store";
import { database } from "../../database/database";
import{
	StorePriceService,
	TransactionService,
}from"../../services";
import {
  useCartStore,
  useStoreStore,
} from "../../stores";
import {
  Colors,
  Spacing,
  Typography,
} from "../../theme";
import{useFocusEffect}from"@react-navigation/native";
import{
	PurchaseStatistics,
}from"../../database/repositories/TransactionRepository";

function formatPurchaseDate(
	value:string|null
){
	if(!value)return"No purchases yet";

	const date=new Date(value);

	if(Number.isNaN(date.getTime())){
		return value;
	}

	return date.toLocaleString(
		"en-PH",
		{
			year:"numeric",
			month:"short",
			day:"numeric",
			hour:"numeric",
			minute:"2-digit",
		}
	);
}

export default function AnalyticsScreen() {
  const { selectedStore } =
    useStoreStore();

  const[
    purchaseStatistics,
    setPurchaseStatistics,
  ]=useState<PurchaseStatistics>({
    totalTransactions:0,
    totalSpent:0,
    averageTransaction:0,
    totalItemsPurchased:0,
    uniqueProductsPurchased:0,
    firstPurchaseAt:null,
    lastPurchaseAt:null,
  });

  const loadPurchaseStatistics=
    useCallback(()=>{
      setPurchaseStatistics(
        TransactionService
          .getPurchaseStatistics()
      );
    },[]);

  useFocusEffect(
    useCallback(()=>{
      loadPurchaseStatistics();
    },[
      loadPurchaseStatistics,
    ])
  );

  const [stores, setStores] =
    useState<Store[]>([]);

  const [
    comparisonStoreId,
    setComparisonStoreId,
  ] = useState<number | null>(null);

  const items = useCartStore(
    state => state.items
  );

  const totalItems = useCartStore(
    state => state.totalItems
  );

  const totalPrice = useCartStore(
    state => state.totalPrice
  );

  const itemCount =
    totalItems();

  const cartTotal =
    totalPrice();

  useEffect(() => {
    const storedStores =
      database.getAllSync<Store>(`
        SELECT *
        FROM Stores
        ORDER BY name;
      `);

    setStores(storedStores);
  }, []);

  const comparisonStores =
    stores.filter(
      store =>
        store.id !== selectedStore?.id
    );

  useEffect(() => {
    if (comparisonStores.length === 0) {
      setComparisonStoreId(null);
      return;
    }

    const currentStillExists =
      comparisonStores.some(
        store =>
          store.id === comparisonStoreId
      );

    if (!currentStillExists) {
      setComparisonStoreId(
        comparisonStores[0].id
      );
    }
  }, [
    comparisonStores,
    comparisonStoreId,
  ]);

  const comparisonStore =
    comparisonStores.find(
      store =>
        store.id === comparisonStoreId
    ) ?? null;

  const comparisonStoreOptions =
    comparisonStores.map(
      store => store.name
    );

  function handleComparisonStoreChange(
    storeName: string
  ) {
    const matchedStore =
      comparisonStores.find(
        store =>
          store.name === storeName
      );

    setComparisonStoreId(
      matchedStore?.id ?? null
    );
  }

  const selectedComparisonStoreName =
    comparisonStore?.name ?? "";

  const averagePerItem =
    itemCount > 0
      ? cartTotal / itemCount
      : 0;

  const productsWithPrices =
    items.filter(
      item => item.price > 0
    ).length;

  const productsWithoutPrices =
    items.filter(
      item => item.price <= 0
    ).length;

  const categoryTotals =
    items.reduce(
      (
        result,
        item
      ) => {
        const category =
          item.category ||
          "Uncategorized";

        result[category] =
          (result[category] ?? 0) +
          item.subtotal;

        return result;
      },
      {} as Record<
        string,
        number
      >
    );

  const categoryList =
    Object.entries(
      categoryTotals
    ).sort(
      (
        a,
        b
      ) => b[1] - a[1]
    );

  const expensiveItems =
    [...items]
      .sort(
        (a, b) =>
          b.subtotal - a.subtotal
      )
      .slice(0, 5);

  const potentialSavingsItems =
    comparisonStore &&
    selectedStore
      ? items
          .map(item => {
            const selectedPrice =
              StorePriceService.getPrice(
                selectedStore.id,
                item.productId
              );

            const comparisonPrice =
              StorePriceService.getPrice(
                comparisonStore.id,
                item.productId
              );

            if (
              selectedPrice === null ||
              comparisonPrice === null
            ) {
              return null;
            }

            const unitSavings =
              selectedPrice -
              comparisonPrice;

            const totalSavings =
              unitSavings *
              item.quantity;

            if (totalSavings <= 0) {
              return null;
            }

            return {
              productId:
                item.productId,

              name:
                item.name,

              quantity:
                item.quantity,

              selectedPrice,

              comparisonPrice,

              unitSavings,

              totalSavings,
            };
          })
          .filter(
            (
              item
            ): item is NonNullable<
              typeof item
            > => item !== null
          )
          .sort(
            (a, b) =>
              b.totalSavings -
              a.totalSavings
          )
          .slice(0, 5)
      : [];

  const storeRanking =
    stores
      .filter(
        store => store.id !== selectedStore?.id
      )
      .map(store => {
        let total = 0;
        let missing = 0;

        items.forEach(item => {
          const price =
            StorePriceService.getPrice(
              store.id,
              item.productId
            );

          if (price === null) {
            missing++;
            return;
          }

          total +=
            price * item.quantity;
        });

        return {
          store,
          total,
          missing,
        };
      })
      .filter(
        ranking =>
          ranking.missing === 0
      )
      .sort(
        (a, b) =>
          a.total - b.total
      );

  const selectedStoreCartData =
    selectedStore
      ? items.reduce(
          (
            result,
            item
          ) => {
            const price =
              StorePriceService.getPrice(
                selectedStore.id,
                item.productId
              );

            if (price === null) {
              result.missing++;
              return result;
            }

            result.total +=
              price * item.quantity;

            return result;
          },
          {
            total: 0,
            missing: 0,
          }
        )
      : {
          total: 0,
          missing: items.length,
        };

  const selectedStoreRanking =
    selectedStore
      ? {
          store: selectedStore,
          total:
            selectedStoreCartData.total,
          missing:
            selectedStoreCartData.missing,
        }
      : null;

  const allStoreRankings = [
    ...(selectedStoreRanking
      ? [selectedStoreRanking]
      : []),

    ...stores
      .filter(
        store =>
          store.id !==
          selectedStore?.id
      )
      .map(store => {
        let total = 0;
        let missing = 0;

        items.forEach(item => {
          const price =
            StorePriceService.getPrice(
              store.id,
              item.productId
            );

          if (price === null) {
            missing++;
            return;
          }

          total +=
            price * item.quantity;
        });

        return {
          store,
          total,
          missing,
        };
      }),
  ];

  const completeStoreRankings =
    allStoreRankings
      .filter(
        ranking =>
          ranking.missing === 0
      )
      .sort(
        (a, b) =>
          a.total - b.total
      );

  const incompleteStoreRankings =
    allStoreRankings
      .filter(
        ranking =>
          ranking.missing > 0
      )
      .sort(
        (a, b) =>
          a.missing - b.missing
      );

  const highestStoreTotal =
    completeStoreRankings.length > 0
      ? Math.max(
          ...completeStoreRankings.map(
            ranking => ranking.total
          )
        )
      : 1;
      
  const bestStore =
    storeRanking.length > 0
      ? storeRanking[0]
      : null;

  const highestCategoryTotal =
    categoryList.length > 0
      ? categoryList[0][1]
      : 1;

  const priceCoverage =
    items.length > 0
      ? Math.round(
          (
            productsWithPrices /
            items.length
          ) * 100
        )
      : 0;

  const currentStoreTotal =
    selectedStoreCartData.total;

  const bestStoreSavings =
    bestStore
      ? currentStoreTotal -
        bestStore.total
      : 0;

  const comparisonStoreCartData =
    comparisonStore
      ? items.reduce(
          (
            result,
            item
          ) => {
            const price =
              StorePriceService.getPrice(
                comparisonStore.id,
                item.productId
              );

            if (price === null) {
              result.missing++;
              return result;
            }

            result.total +=
              price * item.quantity;

            return result;
          },
          {
            total: 0,
            missing: 0,
          }
        )
      : {
          total: 0,
          missing: items.length,
        };

  const canCompareSavings =
    items.length > 0 &&
    selectedStore !== null &&
    comparisonStore !== null &&
    selectedStoreCartData.missing === 0 &&
    comparisonStoreCartData.missing === 0;

  const savingsDifference =
    canCompareSavings
      ? selectedStoreCartData.total -
        comparisonStoreCartData.total
      : null;

  return (
    <Screen>
      <AppHeader
        showMenu
        title="Analytics"
      />

      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View style={styles.storeCard}>
          <Text style={styles.sectionLabel}>
            Current Store
          </Text>

          <Text style={styles.storeName}>
            {selectedStore?.name ??
              "No store selected"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Purchase Statistics
        </Text>

        <View style={styles.purchaseStatisticsGrid}>
          <View style={styles.purchaseStatisticCard}>
            <Text style={styles.purchaseStatisticValue}>
              {purchaseStatistics.totalTransactions}
            </Text>

            <Text style={styles.purchaseStatisticLabel}>
              Transactions
            </Text>
          </View>

          <View style={styles.purchaseStatisticCard}>
            <Text style={styles.purchaseStatisticValue}>
              ₱{Number(
                purchaseStatistics.totalSpent
              ).toFixed(2)}
            </Text>

            <Text style={styles.purchaseStatisticLabel}>
              Total Spent
            </Text>
          </View>

          <View style={styles.purchaseStatisticCard}>
            <Text style={styles.purchaseStatisticValue}>
              ₱{Number(
                purchaseStatistics.averageTransaction
              ).toFixed(2)}
            </Text>

            <Text style={styles.purchaseStatisticLabel}>
              Average Purchase
            </Text>
          </View>

          <View style={styles.purchaseStatisticCard}>
            <Text style={styles.purchaseStatisticValue}>
              {purchaseStatistics.totalItemsPurchased}
            </Text>

            <Text style={styles.purchaseStatisticLabel}>
              Items Purchased
            </Text>
          </View>

          <View style={styles.purchaseStatisticCard}>
            <Text style={styles.purchaseStatisticValue}>
              {purchaseStatistics.uniqueProductsPurchased}
            </Text>

            <Text style={styles.purchaseStatisticLabel}>
              Unique Products
            </Text>
          </View>
        </View>

        <View style={styles.purchaseDateCard}>
          <View style={styles.purchaseDateRow}>
            <Text style={styles.purchaseDateLabel}>
              First Purchase
            </Text>

            <Text style={styles.purchaseDateValue}>
              {formatPurchaseDate(
                purchaseStatistics.firstPurchaseAt
              )}
            </Text>
          </View>

          <View style={styles.purchaseDateDivider}/>

          <View style={styles.purchaseDateRow}>
            <Text style={styles.purchaseDateLabel}>
              Latest Purchase
            </Text>

            <Text style={styles.purchaseDateValue}>
              {formatPurchaseDate(
                purchaseStatistics.lastPurchaseAt
              )}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Shopping Summary
        </Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {itemCount}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Items
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              ₱{cartTotal.toFixed(2)}
            </Text>

            <Text style={styles.summaryLabel}>
              Cart Total
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              ₱{averagePerItem.toFixed(2)}
            </Text>

            <Text style={styles.summaryLabel}>
              Average per Item
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {items.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Unique Products
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Price Coverage
        </Text>

        <View style={styles.coverageCard}>
          <View style={styles.coverageTopRow}>
            <Text style={styles.coverageLabel}>
              Products with prices
            </Text>

            <Text style={styles.coverageValue}>
              {productsWithPrices} /{" "}
              {items.length}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${priceCoverage}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.coveragePercent}>
            {priceCoverage}%
          </Text>
        </View>

        <View style={styles.priceStatusRow}>
          <View style={styles.priceStatusCard}>
            <Text style={styles.knownPrice}>
              {productsWithPrices}
            </Text>

            <Text style={styles.priceStatusLabel}>
              Known Prices
            </Text>
          </View>

          <View style={styles.priceStatusCard}>
            <Text style={styles.missingPrice}>
              {productsWithoutPrices}
            </Text>

            <Text style={styles.priceStatusLabel}>
              Missing Prices
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Savings Analysis
        </Text>

        <View style={styles.savingsCard}>
          {comparisonStores.length === 0 ? (
            <Text style={styles.savingsPlaceholder}>
              No other stores are available for
              comparison.
            </Text>
          ) : (
            <>
              <AppDropdown
                label="Compare With"
                selectedValue={
                  selectedComparisonStoreName
                }
                items={comparisonStoreOptions}
                onValueChange={
                  handleComparisonStoreChange
                }
              />

              <View style={styles.storeTotalsTable}>
                <View style={styles.storeTotalsHeader}>
                  <View style={styles.storeTotalCell}>
                    <Text style={styles.storeHeaderText}>
                      {selectedStore?.shortName ??
                        selectedStore?.name ??
                        "Selected Store"}
                    </Text>
                  </View>

                  <View style={styles.storeTotalCell}>
                    <Text style={styles.storeHeaderText}>
                      {comparisonStore?.shortName ??
                        comparisonStore?.name ??
                        "Comparison Store"}
                    </Text>
                  </View>
                </View>

                <View style={styles.storeTotalsRow}>
                  <View style={styles.storeTotalCell}>
                    <Text style={styles.storeTotalValue}>
                      ₱
                      {selectedStoreCartData.total.toFixed(
                        2
                      )}
                    </Text>

                    {selectedStoreCartData.missing > 0 ? (
                      <Text style={styles.missingText}>
                        {
                          selectedStoreCartData.missing
                        }{" "}
                        price(s) unavailable
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.storeTotalCell}>
                    <Text style={styles.storeTotalValue}>
                      ₱
                      {comparisonStoreCartData.total.toFixed(
                        2
                      )}
                    </Text>

                    {comparisonStoreCartData.missing > 0 ? (
                      <Text style={styles.missingText}>
                        {
                          comparisonStoreCartData.missing
                        }{" "}
                        price(s) unavailable
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>

              {items.length === 0 ? (
                <Text style={styles.savingsPlaceholder}>
                  Add products to the cart to compare
                  store totals.
                </Text>
              ) : !canCompareSavings ? (
                <Text style={styles.incompleteSavings}>
                  Complete prices are required for all
                  cart products in both stores.
                </Text>
              ) : (
                <View style={styles.savingsResult}>
                  <Text
                    style={[
                      styles.savingsResultText,
                      savingsDifference !== null &&
                      savingsDifference > 0
                        ? styles.positiveSavings
                        : savingsDifference !== null &&
                            savingsDifference < 0
                          ? styles.negativeSavings
                          : styles.equalSavings,
                    ]}
                  >
                    {savingsDifference !== null &&
                    savingsDifference > 0
                      ? `You could save ₱${savingsDifference.toFixed(
                          2
                        )} at ${
                          comparisonStore?.name ??
                          "the comparison store"
                        }.`
                      : savingsDifference !== null &&
                          savingsDifference < 0
                        ? `${
                            selectedStore?.name ??
                            "The selected store"
                          } is cheaper by ₱${Math.abs(
                            savingsDifference
                          ).toFixed(2)}.`
                        : "Both stores have the same cart total."}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Most Expensive Items
        </Text>

        <View style={styles.expensiveCard}>
          {expensiveItems.length === 0 ? (
            <Text style={styles.noData}>
              No products in the cart.
            </Text>
          ) : (
            expensiveItems.map(
              (item, index) => (
                <View
                  key={item.productId}
                  style={styles.expensiveRow}
                >
                  <Text
                    style={styles.rank}
                  >
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `${index + 1}.`}
                  </Text>

                  <View
                    style={
                      styles.expensiveInfo
                    }
                  >
                    <Text
                      style={
                        styles.expensiveBrand
                      }
                    >
                      {(item as any).brand ?? ""}
                    </Text>

                    <Text
                      style={
                        styles.expensiveName
                      }
                    >
                      {item.name}
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.expensivePrice
                    }
                  >
                    ₱
                    {item.subtotal.toFixed(
                      2
                    )}
                  </Text>
                </View>
              )
            )
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Top Potential Savings
        </Text>

        <View style={styles.potentialSavingsCard}>
          {!comparisonStore ? (
            <Text style={styles.noData}>
              Select a comparison store to view
              product savings.
            </Text>
          ) : items.length === 0 ? (
            <Text style={styles.noData}>
              Add products to the cart to view
              potential savings.
            </Text>
          ) : potentialSavingsItems.length === 0 ? (
            <Text style={styles.noData}>
              No cheaper matching products were found
              at {comparisonStore.name}.
            </Text>
          ) : (
          potentialSavingsItems.map(
            (item, index) => {
              const isLast =
                index ===
                potentialSavingsItems.length - 1;

              return (
                <View
                  key={item.productId}
                  style={[
                    styles.savingsItemRow,
                    isLast
                      ? styles.lastSavingsItemRow
                      : null,
                  ]}
                >
                  <View style={styles.savingsRank}>
                    <Text style={styles.savingsRankText}>
                      {index + 1}
                    </Text>
                  </View>

                  <View style={styles.savingsItemInfo}>
                    <Text
                      style={styles.savingsItemName}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>

                    <View style={styles.priceDetailsRow}>
                      <Text style={styles.currentPriceText}>
                        {selectedStore?.shortName ??
                          selectedStore?.name ??
                          "Current"}
                        : ₱
                        {item.selectedPrice.toFixed(2)}
                      </Text>

                      <Text style={styles.comparisonPriceText}>
                        {comparisonStore.shortName ??
                          comparisonStore.name}
                        : ₱
                        {item.comparisonPrice.toFixed(2)}
                      </Text>
                    </View>

                    <Text style={styles.quantitySavingsText}>
                      Save ₱
                      {item.totalSavings.toFixed(2)}
                      {" "}for quantity {item.quantity}
                    </Text>
                  </View>
                </View>
              );
            }
          )
        )}
        </View>

        <Text style={styles.sectionTitle}>
          Best Store Recommendation
        </Text>

        <View style={styles.bestStoreCard}>
          {items.length === 0 ? (
            <Text style={styles.noData}>
              Add products to your cart first.
            </Text>
          ) : !bestStore ? (
            <Text style={styles.noData}>
              No store has complete pricing yet.
            </Text>
          ) : (
            <>
              <Text style={styles.bestStoreTitle}>
                🥇 {bestStore.store.name}
              </Text>

              <Text style={styles.bestStoreTotal}>
                ₱
                {bestStore.total.toFixed(2)}
              </Text>

              <Text style={styles.bestStoreLabel}>
                Estimated Cart Total
              </Text>

              <View style={styles.bestStoreDivider} />

              <Text style={styles.bestStoreSavings}>
                {bestStoreSavings > 0
                  ? `Save ₱${bestStoreSavings.toFixed(
                      2
                    )}`
                  : "Current store is already the cheapest"}
              </Text>

              {bestStoreSavings > 0 ? (
                <Text style={styles.bestStoreSubtext}>
                  Compared with{" "}
                  {selectedStore?.name}
                </Text>
              ) : null}
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Store Total Comparison
        </Text>

        <View style={styles.storeChartCard}>
          {items.length === 0 ? (
            <Text style={styles.noData}>
              Add products to the cart to compare
              store totals.
            </Text>
          ) : completeStoreRankings.length === 0 ? (
            <Text style={styles.noData}>
              No store has complete pricing for the
              current cart.
            </Text>
          ) : (
            <>
              {completeStoreRankings.map(
                ranking => {
                  const barWidth =
                    highestStoreTotal > 0
                      ? (
                          ranking.total /
                          highestStoreTotal
                        ) * 100
                      : 0;

                  const isCurrentStore =
                    ranking.store.id ===
                    selectedStore?.id;

                  return (
                    <View
                      key={ranking.store.id}
                      style={styles.storeChartRow}
                    >
                      <View
                        style={
                          styles.storeChartHeader
                        }
                      >
                        <View
                          style={
                            styles.storeChartNameArea
                          }
                        >
                          <Text
                            style={
                              styles.storeChartName
                            }
                            numberOfLines={1}
                          >
                            {ranking.store.name}
                          </Text>

                          {isCurrentStore ? (
                            <Text
                              style={
                                styles.currentStoreBadge
                              }
                            >
                              Current
                            </Text>
                          ) : null}
                        </View>

                        <Text
                          style={
                            styles.storeChartTotal
                          }
                        >
                          ₱{ranking.total.toFixed(2)}
                        </Text>
                      </View>

                      <View
                        style={
                          styles.storeChartTrack
                        }
                      >
                        <View
                          style={[
                            styles.storeChartFill,
                            {
                              width:
                                `${barWidth}%`,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  );
                }
              )}

              {incompleteStoreRankings.length >
              0 ? (
                <View
                  style={
                    styles.incompleteStoresSection
                  }
                >
                  <Text
                    style={
                      styles.incompleteStoresTitle
                    }
                  >
                    Incomplete comparisons
                  </Text>

                  {incompleteStoreRankings.map(
                    ranking => (
                      <View
                        key={ranking.store.id}
                        style={
                          styles.incompleteStoreRow
                        }
                      >
                        <Text
                          style={
                            styles.incompleteStoreName
                          }
                          numberOfLines={1}
                        >
                          {ranking.store.name}
                        </Text>

                        <Text
                          style={
                            styles.incompleteStoreCount
                          }
                        >
                          {ranking.missing}{" "}
                          price
                          {ranking.missing === 1
                            ? ""
                            : "s"}{" "}
                          unavailable
                        </Text>
                      </View>
                    )
                  )}
                </View>
              ) : null}
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Category Spending
        </Text>

        <View style={styles.categoryCard}>
          {categoryList.length === 0 ? (
            <Text style={styles.noData}>
              No category data yet.
            </Text>
          ) : (
            categoryList.map(
              ([category, total]) => {
                const width =
                  (
                    total /
                    highestCategoryTotal
                  ) * 100;

                return (
                  <View
                    key={category}
                    style={
                      styles.categoryRow
                    }
                  >
                    <View
                      style={
                        styles.categoryHeader
                      }
                    >
                      <Text
                        style={
                          styles.categoryName
                        }
                      >
                        {category}
                      </Text>

                      <Text
                        style={
                          styles.categoryAmount
                        }
                      >
                        ₱
                        {total.toFixed(
                          2
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.categoryTrack
                      }
                    >
                      <View
                        style={[
                          styles.categoryFill,
                          {
                            width: `${width}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              }
            )
          )}
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No shopping data yet
            </Text>

            <Text style={styles.emptyMessage}>
              Add products to the cart to see
              analytics.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },

  storeCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },

  sectionLabel: {
    fontSize: Typography.caption,
    color: Colors.textLight,
  },

  storeName: {
    marginTop: 4,
    fontSize: Typography.heading,
    fontWeight: "700",
    color: Colors.text,
  },

  sectionTitle: {
    marginBottom: Spacing.md,
    fontSize: Typography.heading,
    fontWeight: "700",
    color: Colors.text,
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  summaryCard: {
    width: "47%",
    minHeight: 110,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  summaryValue: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: Colors.primary,
  },

  summaryLabel: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 12,
    color: Colors.textLight,
  },

  coverageCard: {
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  coverageTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  coverageLabel: {
    fontSize: 13,
    color: Colors.text,
  },

  coverageValue: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },

  progressTrack: {
    height: 12,
    marginTop: Spacing.md,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: Colors.border,
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },

  coveragePercent: {
    marginTop: Spacing.sm,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },

  priceStatusRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },

  priceStatusCard: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  knownPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2E7D32",
  },

  missingPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: "#C62828",
  },

  priceStatusLabel: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    color: Colors.textLight,
  },

  emptyCard: {
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  emptyTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  emptyMessage: {
    marginTop: Spacing.sm,
    textAlign: "center",
    color: Colors.textLight,
  },

  categoryCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  categoryRow: {
    marginBottom: Spacing.md,
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },

  categoryAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },

  categoryTrack: {
    height: 10,
    marginTop: 6,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: Colors.border,
  },

  categoryFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },

  noData: {
    textAlign: "center",
    color: Colors.textLight,
  },

  savingsCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  storeTotalsTable: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
  },

  storeTotalsHeader: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
  },

  storeTotalsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
  },

  storeTotalCell: {
    flex: 1,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.sm,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },

  storeHeaderText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },

  storeTotalValue: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
  },

  missingText: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 10,
    color: "#C62828",
  },

  savingsResult: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },

  savingsResultText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },

  positiveSavings: {
    color: "#2E7D32",
  },

  negativeSavings: {
    color: "#C62828",
  },

  equalSavings: {
    color: Colors.text,
  },

  savingsPlaceholder: {
    paddingVertical: Spacing.md,
    textAlign: "center",
    color: Colors.textLight,
  },

  incompleteSavings: {
    marginTop: Spacing.md,
    textAlign: "center",
    fontSize: 12,
    color: Colors.textLight,
  },

  expensiveCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  expensiveRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  rank: {
    width: 36,
    textAlign: "center",
    fontSize: 18,
  },

  expensiveInfo: {
    flex: 1,
  },

  expensiveBrand: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },

  expensiveName: {
    fontSize: 12,
    color: Colors.primary,
  },

  expensivePrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },

  potentialSavingsCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  savingsItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  savingsRank: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    borderRadius: 16,
    backgroundColor: Colors.primary,
  },

  savingsRankText: {
    fontSize: 13,
    fontWeight: "800",
    color: "white",
  },

  savingsItemInfo: {
    flex: 1,
  },

  savingsItemName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  priceDetailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
  },

  currentPriceText: {
    fontSize: 11,
    color: Colors.textLight,
  },

  comparisonPriceText: {
    fontSize: 11,
    color: Colors.primary,
  },

  quantitySavingsText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  lastSavingsItemRow: {
    borderBottomWidth: 0,
  },

  bestStoreCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: Colors.surface,
  },

  bestStoreTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.primary,
  },

  bestStoreTotal: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
  },

  bestStoreLabel: {
    marginTop: 4,
    color: Colors.textLight,
  },

  bestStoreDivider: {
    width: "80%",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  bestStoreSavings: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
  },

  bestStoreSubtext: {
    marginTop: 6,
    textAlign: "center",
    color: Colors.textLight,
  },

  storeChartCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
  },

  storeChartRow: {
    marginBottom: Spacing.lg,
  },

  storeChartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },

  storeChartNameArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.md,
  },

  storeChartName: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },

  currentStoreBadge: {
    marginLeft: 7,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: Colors.background,
    fontSize: 9,
    fontWeight: "700",
    color: Colors.primary,
  },

  storeChartTotal: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },

  storeChartTrack: {
    height: 12,
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: Colors.border,
  },

  storeChartFill: {
    height: "100%",
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },

  incompleteStoresSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  incompleteStoresTitle: {
    marginBottom: Spacing.sm,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textLight,
  },

  incompleteStoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },

  incompleteStoreName: {
    flex: 1,
    marginRight: Spacing.md,
    fontSize: 11,
    color: Colors.text,
  },

  incompleteStoreCount: {
    fontSize: 10,
    color: "#C62828",
  },

  purchaseStatisticsGrid:{
	flexDirection:"row",
	flexWrap:"wrap",
	gap:Spacing.md,
	marginBottom:Spacing.md,
  },
  purchaseStatisticCard:{
    width:"47%",
    minHeight:100,
    justifyContent:"center",
    alignItems:"center",
    padding:Spacing.md,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:14,
    backgroundColor:Colors.surface,
  },
  purchaseStatisticValue:{
    textAlign:"center",
    fontSize:21,
    fontWeight:"800",
    color:Colors.primary,
  },
  purchaseStatisticLabel:{
    marginTop:6,
    textAlign:"center",
    fontSize:12,
    color:Colors.textLight,
  },
  purchaseDateCard:{
    marginBottom:Spacing.xl,
    padding:Spacing.lg,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:14,
    backgroundColor:Colors.surface,
  },
  purchaseDateRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  purchaseDateLabel:{
    fontSize:12,
    fontWeight:"700",
    color:Colors.text,
  },
  purchaseDateValue:{
    flex:1,
    marginLeft:Spacing.md,
    textAlign:"right",
    fontSize:11,
    color:Colors.textLight,
  },
  purchaseDateDivider:{
    height:1,
    marginVertical:Spacing.md,
    backgroundColor:Colors.border,
  },
});