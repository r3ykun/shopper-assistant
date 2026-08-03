//shopper-assistant/src/screens/History/HistoryScreen.tsx
import React,{
	useCallback,
	useMemo,
	useState,
}from"react";
import{
	FlatList,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}from"react-native";
import{
	useFocusEffect,
}from"@react-navigation/native";
import Screen from "../../components/layout/Screen";
import AppHeader from "../../components/layout/AppHeader";
import SearchBar from "../../components/inputs/SearchBar";
import{
	TransactionService,
}from"../../services";
import{
	TransactionSummary,
}from"../../database/repositories/TransactionRepository";
import{
	StoreRepository,
}from"../../database/repositories/StoreRepository";
import{
	Colors,
	Spacing,
}from"../../theme";
import{normalize}from"../../utils/normalize";
import{Store}from"../../database/entities/Store";
import AppDropdown from "../../components/forms/AppDropdown";
import AppTextInput from "../../components/forms/AppTextInput";
import type{
	TransactionSort,
}from"../../database/repositories/TransactionRepository";
import AppDatePicker from "../../components/forms/AppDatePicker";

type ReceiptItem={
	id:number;
	productId:number;
	productName:string|null;
	brand:string|null;
	barcode:string|null;
	quantity:number;
	price:number;
	subtotal:number;
};

function formatDate(value?:string|null){
	if(!value)return"";

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

export default function HistoryScreen(){
	const[
		transactions,
		setTransactions,
	]=useState<TransactionSummary[]>([]);

	const[search,setSearch]=useState("");

	const[
		storeFilter,
		setStoreFilter,
	]=useState<number|null>(null);

  const[startDate,setStartDate]=useState("");
  const[endDate,setEndDate]=useState("");
  const[minTotal,setMinTotal]=useState("");
  const[maxTotal,setMaxTotal]=useState("");
  const[sort,setSort]=
    useState<TransactionSort>("date-desc");
  const[
    filterModalVisible,
    setFilterModalVisible,
  ]=useState(false);

  const[
    sortModalVisible,
    setSortModalVisible,
  ]=useState(false);

	const[
		selectedTransaction,
		setSelectedTransaction,
	]=useState<TransactionSummary|null>(null);

	const[
		transactionItems,
		setTransactionItems,
	]=useState<ReceiptItem[]>([]);

  const stores=useMemo<Store[]>(
    ()=>StoreRepository.getAll(),
    []
  );

  const loadTransactions=useCallback(()=>{
    const parsedMinTotal=
      minTotal.trim()===""
        ?undefined
        :Number(minTotal);

    const parsedMaxTotal=
      maxTotal.trim()===""
        ?undefined
        :Number(maxTotal);

    setTransactions(
      TransactionService.getAll({
        storeId:
          storeFilter??undefined,
        startDate:
          startDate||undefined,
        endDate:
          endDate||undefined,
        minTotal:
          Number.isFinite(parsedMinTotal)
            ?parsedMinTotal
            :undefined,
        maxTotal:
          Number.isFinite(parsedMaxTotal)
            ?parsedMaxTotal
            :undefined,
        sort,
      })
    );
  },[
    storeFilter,
    startDate,
    endDate,
    minTotal,
    maxTotal,
    sort,
  ]);

	useFocusEffect(
		useCallback(()=>{
			loadTransactions();
		},[
			loadTransactions,
		])
	);

	const filteredTransactions=useMemo(()=>{
		const keyword=normalize(search);

		if(!keyword){
			return transactions;
		}

		return transactions.filter(transaction=>{
			const storeName=normalize(
				transaction.storeName??""
			);

			const paymentMethod=normalize(
				transaction.paymentMethod??""
			);

			const createdAt=normalize(
				formatDate(
					transaction.createdAt
				)
			);

			const transactionId=
				transaction.id?.toString()??"";

			return(
				storeName.includes(keyword)||
				transactionId.includes(keyword)||
				paymentMethod.includes(keyword)||
				createdAt.includes(keyword)
			);
		});
	},[
		search,
		transactions,
	]);

	function openTransaction(
		transaction:TransactionSummary
	){
		setSelectedTransaction(transaction);

		setTransactionItems(
			TransactionService.getItems(
				transaction.id
			)as ReceiptItem[]
		);
	}

	function closeTransaction(){
		setSelectedTransaction(null);
		setTransactionItems([]);
	}

  const storeItems=[
    {
      label:"All Stores",
      value:"all",
    },
    ...stores.map(store=>({
      label:
        store.shortName??
        store.name,
      value:String(store.id),
    })),
  ];

  const selectedStoreLabel=
	storeFilter===null
		?"All Stores"
		:stores.find(
			store=>store.id===storeFilter
		)?.shortName??
		stores.find(
			store=>store.id===storeFilter
		)?.name??
		"All Stores";

  const sortItems=[
    {
      label:"Newest First",
      value:"date-desc",
    },
    {
      label:"Oldest First",
      value:"date-asc",
    },
    {
      label:"Most Expensive",
      value:"total-desc",
    },
    {
      label:"Cheapest First",
      value:"total-asc",
    },
  ];

  function sanitizePrice(value:string){
    return value
      .replace(/[^0-9.]/g,"")
      .replace(/(\..*)\./g,"$1");
  }

  function resetFilters(){
    setStoreFilter(null);
    setStartDate("");
    setEndDate("");
    setMinTotal("");
    setMaxTotal("");
  }

  const activeFilterCount=[
    storeFilter!==null,
    startDate.trim()!=="",
    endDate.trim()!=="",
    minTotal.trim()!=="",
    maxTotal.trim()!=="",
  ].filter(Boolean).length;

  const selectedSortLabel=
    sortItems.find(
      item=>item.value===sort
    )?.label??"Newest First";

	return(
		<Screen>
			<AppHeader
				showMenu
				title="Purchase History"
			/>

			<View style={styles.container}>
				<SearchBar
					value={search}
					placeholder="Search transactions"
					onChangeText={setSearch}
				/>

      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[
            styles.toolButton,
            activeFilterCount>0&&
              styles.activeToolButton,
          ]}
          activeOpacity={.75}
          onPress={()=>
            setFilterModalVisible(true)
          }
        >
          <Image
            source={require("../../assets/icons/filter.png")}
            style={[
              styles.toolIcon,
              activeFilterCount>0&&
                styles.activeToolIcon,
            ]}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.toolButtonText,
              activeFilterCount>0&&
                styles.activeToolButtonText,
            ]}
          >
            Filter
          </Text>

          {activeFilterCount>0&&(
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {selectedStoreLabel}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toolButton,
            sort!=="date-desc"&&
              styles.activeToolButton,
          ]}
          activeOpacity={.75}
          onPress={()=>
            setSortModalVisible(true)
          }
        >
          <Image
            source={require("../../assets/icons/sort.png")}
            style={[
              styles.toolIcon,
              sort!=="date-desc"&&
                styles.activeToolIcon,
            ]}
            resizeMode="contain"
          />

          <View style={styles.toolTextContainer}>
            <Text
              style={[
                styles.toolButtonText,
                sort!=="date-desc"&&
                  styles.activeToolButtonText,
              ]}
            >
              Sort
            </Text>

            <Text
              numberOfLines={1}
              style={styles.toolSelectionText}
            >
              {selectedSortLabel}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

        <Text style={styles.resultCount}>
          {`${filteredTransactions.length} transaction${
            filteredTransactions.length===1
              ?""
              :"s"
          }`}
        </Text>

				<FlatList
					data={filteredTransactions}
					keyExtractor={item=>
						item.id.toString()
					}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={
						filteredTransactions.length===0
							?styles.emptyList
							:styles.list
					}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyTitle}>
								{transactions.length===0
									?"No purchase history"
									:"No matching transactions"}
							</Text>

							<Text style={styles.emptyMessage}>
								{transactions.length===0
									?"Completed purchases will appear here."
									:`No results for "${search}".`}
							</Text>
						</View>
					}
					renderItem={({item})=>(
						<TouchableOpacity
							style={styles.transactionCard}
							activeOpacity={.75}
							onPress={()=>
								openTransaction(item)
							}
						>
							<View style={styles.cardHeader}>
								<View style={styles.transactionInfo}>
									<Text style={styles.transactionId}>
										Transaction #{item.id}
									</Text>

									<Text style={styles.storeName}>
										{item.storeName??"Unknown Store"}
									</Text>
								</View>

								<Text style={styles.total}>
									₱{Number(
										item.total??0
									).toFixed(2)}
								</Text>
							</View>

							<View style={styles.divider}/>

							<View style={styles.metadataRow}>
								<Text style={styles.metadata}>
									{item.totalItems??0}{" "}
									{item.totalItems===1
										?"item"
										:"items"}
								</Text>

								<Text style={styles.metadata}>
									{item.uniqueProducts??0}{" "}
									{item.uniqueProducts===1
										?"product"
										:"products"}
								</Text>
							</View>

							<View style={styles.footer}>
								<Text style={styles.date}>
									{formatDate(
										item.createdAt
									)}
								</Text>

								{item.paymentMethod?(
									<Text style={styles.paymentMethod}>
										{item.paymentMethod}
									</Text>
								):null}
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>

      <Modal
        visible={filterModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={()=>
          setFilterModalVisible(false)
        }
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={()=>
            setFilterModalVisible(false)
          }
        >
          <Pressable
            style={styles.popupContainer}
            onPress={event=>
              event.stopPropagation()
            }
          >
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>
                Filter Transactions
              </Text>

              <Pressable
                hitSlop={10}
                onPress={()=>
                  setFilterModalVisible(false)
                }
              >
                <Text style={styles.popupClose}>
                  ×
                </Text>
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={
                styles.popupContent
              }
            >
              <AppDropdown
                label="Store"
                selectedValue={
                  storeFilter===null
                    ?"all"
                    :String(storeFilter)
                }
                items={storeItems}
                onValueChange={value=>
                  setStoreFilter(
                    value==="all"
                      ?null
                      :Number(value)
                  )
                }
                searchable
                searchPlaceholder="Search stores"
              />

              <View style={styles.filterRow}>
                <AppDatePicker
                  style={styles.filterField}
                  label="Start Date"
                  value={startDate}
                  maximumDate={
                    endDate
                      ?new Date(`${endDate}T00:00:00`)
                      :new Date()
                  }
                  onChange={setStartDate}
                />

                <AppDatePicker
                  style={styles.filterField}
                  label="End Date"
                  value={endDate}
                  minimumDate={
                    startDate
                      ?new Date(`${startDate}T00:00:00`)
                      :undefined
                  }
                  maximumDate={new Date()}
                  onChange={setEndDate}
                />
              </View>
            </ScrollView>

            <View style={styles.popupActions}>
              <TouchableOpacity
                style={styles.popupResetButton}
                onPress={resetFilters}
              >
                <Text style={styles.popupResetText}>
                  Reset
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.popupApplyButton}
                onPress={()=>
                  setFilterModalVisible(false)
                }
              >
                <Text style={styles.popupApplyText}>
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={()=>
          setSortModalVisible(false)
        }
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={()=>
            setSortModalVisible(false)
          }
        >
          <Pressable
            style={styles.sortPopupContainer}
            onPress={event=>
              event.stopPropagation()
            }
          >
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>
                Sort Transactions
              </Text>

              <Pressable
                hitSlop={10}
                onPress={()=>
                  setSortModalVisible(false)
                }
              >
                <Text style={styles.popupClose}>
                  ×
                </Text>
              </Pressable>
            </View>

            {sortItems.map(item=>{
              const selected=
                item.value===sort;

              return(
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.sortOption,
                    selected&&
                      styles.selectedSortOption,
                  ]}
                  onPress={()=>{
                    setSort(
                      item.value as TransactionSort
                    );
                    setSortModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      selected&&
                        styles.selectedSortOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>

                  {selected&&(
                    <Text style={styles.sortCheck}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>

			<Modal
				visible={selectedTransaction!==null}
				animationType="slide"
				onRequestClose={closeTransaction}
			>
				<Screen>
					<AppHeader
						showBack
						title="Receipt"
						onBackPress={closeTransaction}
					/>

					<ScrollView
						contentContainerStyle={
							styles.receiptContainer
						}
					>
						<Text style={styles.receiptTitle}>
							Transaction #{selectedTransaction?.id}
						</Text>

						<Text style={styles.receiptDate}>
							{formatDate(
								selectedTransaction?.createdAt
							)}
						</Text>

						<Text style={styles.receiptStore}>
							{selectedTransaction?.storeName??
								"Unknown Store"}
						</Text>

						<View style={styles.receiptDivider}/>

						{transactionItems.length===0?(
							<Text style={styles.emptyReceipt}>
								No transaction items found.
							</Text>
						):(
							transactionItems.map(item=>(
								<View
									key={item.id}
									style={styles.receiptItem}
								>
									<View style={styles.receiptItemInfo}>
										<Text style={styles.receiptProduct}>
											{item.productName??
												"Unknown Product"}
										</Text>

										{item.brand?(
											<Text style={styles.receiptBrand}>
												{item.brand}
											</Text>
										):null}

										<Text style={styles.receiptPrice}>
											₱{Number(
												item.price??0
											).toFixed(2)} each
										</Text>
									</View>

									<View style={styles.receiptItemTotal}>
										<Text style={styles.receiptQty}>
											×{item.quantity}
										</Text>

										<Text style={styles.receiptSubtotal}>
											₱{Number(
												item.subtotal??0
											).toFixed(2)}
										</Text>
									</View>
								</View>
							))
						)}

						<View style={styles.receiptDivider}/>

						<Text style={styles.receiptTotal}>
							Total
						</Text>

						<Text style={styles.receiptGrandTotal}>
							₱{Number(
								selectedTransaction?.total??0
							).toFixed(2)}
						</Text>

						<Pressable
							style={styles.closeButton}
							onPress={closeTransaction}
						>
							<Text style={styles.closeButtonText}>
								Close
							</Text>
						</Pressable>
					</ScrollView>
				</Screen>
			</Modal>
		</Screen>
	);
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		padding:Spacing.lg,
		backgroundColor:Colors.background,
	},
	resultCount:{
		marginBottom:Spacing.md,
		textAlign:"center",
		fontSize:12,
		color:Colors.textLight,
	},
	list:{
		paddingBottom:Spacing.xl,
	},
	emptyList:{
		flexGrow:1,
	},
	emptyContainer:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
	},
	emptyTitle:{
		fontSize:19,
		fontWeight:"700",
		color:Colors.text,
	},
	emptyMessage:{
		marginTop:Spacing.sm,
		textAlign:"center",
		color:Colors.textLight,
	},
	transactionCard:{
		marginBottom:Spacing.md,
		padding:Spacing.lg,
		borderWidth:1,
		borderColor:Colors.border,
		borderRadius:14,
		backgroundColor:Colors.surface,
		elevation:2,
	},
	cardHeader:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"flex-start",
	},
	transactionInfo:{
		flex:1,
		paddingRight:Spacing.md,
	},
	transactionId:{
		fontSize:12,
		fontWeight:"700",
		color:Colors.primary,
	},
	storeName:{
		marginTop:4,
		fontSize:17,
		fontWeight:"700",
		color:Colors.text,
	},
	total:{
		fontSize:18,
		fontWeight:"800",
		color:Colors.primary,
	},
	divider:{
		height:1,
		marginVertical:Spacing.md,
		backgroundColor:Colors.border,
	},
	metadataRow:{
		flexDirection:"row",
		gap:Spacing.lg,
	},
	metadata:{
		fontSize:12,
		fontWeight:"600",
		color:Colors.text,
	},
	footer:{
		flexDirection:"row",
		justifyContent:"space-between",
		alignItems:"center",
		marginTop:Spacing.md,
	},
	date:{
		flex:1,
		fontSize:11,
		color:Colors.textLight,
	},
	paymentMethod:{
		marginLeft:Spacing.sm,
		fontSize:11,
		fontWeight:"700",
		color:Colors.primary,
	},
	receiptContainer:{
		padding:Spacing.lg,
	},
	receiptTitle:{
		fontSize:22,
		fontWeight:"700",
		color:Colors.text,
	},
	receiptDate:{
		marginTop:4,
		color:Colors.textLight,
	},
	receiptStore:{
		marginTop:4,
		fontWeight:"600",
		color:Colors.primary,
	},
	receiptDivider:{
		height:1,
		marginVertical:Spacing.lg,
		backgroundColor:Colors.border,
	},
	receiptItem:{
		flexDirection:"row",
		justifyContent:"space-between",
		marginBottom:Spacing.md,
	},
	receiptItemInfo:{
		flex:1,
		paddingRight:Spacing.md,
	},
	receiptItemTotal:{
		alignItems:"flex-end",
	},
	receiptProduct:{
		fontWeight:"700",
		color:Colors.text,
	},
	receiptBrand:{
		marginTop:2,
		fontSize:12,
		color:Colors.textLight,
	},
	receiptPrice:{
		marginTop:3,
		fontSize:11,
		color:Colors.textLight,
	},
	receiptQty:{
		textAlign:"right",
		fontWeight:"600",
		color:Colors.text,
	},
	receiptSubtotal:{
		marginTop:4,
		fontWeight:"700",
		color:Colors.primary,
	},
	emptyReceipt:{
		textAlign:"center",
		color:Colors.textLight,
	},
	receiptTotal:{
		fontSize:16,
		fontWeight:"700",
		color:Colors.text,
	},
	receiptGrandTotal:{
		marginTop:6,
		fontSize:24,
		fontWeight:"800",
		color:Colors.primary,
	},
	closeButton:{
		marginTop:Spacing.xl,
		paddingVertical:14,
		borderRadius:10,
		backgroundColor:Colors.primary,
	},
	closeButtonText:{
		textAlign:"center",
		fontWeight:"700",
		color:"#fff",
	},
  filterRow:{
    flexDirection:"row",
    gap:Spacing.sm,
    alignItems:"flex-start",
  },
  filterField:{
    flex:1,
  },
  toolbar:{
    flexDirection:"row",
    gap:Spacing.sm,
    marginBottom:Spacing.md,
  },
  toolButton:{
    position:"relative",
    flex:1,
    minHeight:54,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:Spacing.md,
    borderWidth:1,
    borderColor:Colors.border,
    borderRadius:12,
    backgroundColor:Colors.surface,
  },
  activeToolButton:{
    borderColor:Colors.primary,
    backgroundColor:Colors.background,
  },
  toolIcon:{
    width:22,
    height:22,
    marginRight:Spacing.sm,
    tintColor:Colors.text,
  },
  activeToolIcon:{
    tintColor:Colors.primary,
  },
  toolTextContainer:{
    alignItems:"flex-start",
  },
  toolButtonText:{
    fontSize:14,
    fontWeight:"700",
    color:Colors.text,
  },
  activeToolButtonText:{
    color:Colors.primary,
  },
  toolSelectionText:{
    marginTop:2,
    fontSize:9,
    color:Colors.textLight,
    alignSelf:"center",
  },
  filterBadge:{
    position:"absolute",
    top:-7,
    right:-5,
    minWidth:20,
    height:20,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:5,
    borderRadius:10,
    backgroundColor:Colors.primary,
  },
  filterBadgeText:{
    fontSize:10,
    fontWeight:"700",
    color:"#fff",
  },
  modalBackdrop:{
    flex:1,
    justifyContent:"center",
    padding:Spacing.lg,
    backgroundColor:"rgba(0,0,0,.45)",
  },
  popupContainer:{
    maxHeight:"85%",
    borderRadius:18,
    backgroundColor:Colors.surface,
    overflow:"hidden",
  },
  sortPopupContainer:{
    borderRadius:18,
    backgroundColor:Colors.surface,
    overflow:"hidden",
  },
  popupHeader:{
    minHeight:58,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:Spacing.lg,
    borderBottomWidth:1,
    borderBottomColor:Colors.border,
  },
  popupTitle:{
    fontSize:18,
    fontWeight:"700",
    color:Colors.text,
  },
  popupClose:{
    fontSize:30,
    lineHeight:32,
    color:Colors.textLight,
  },
  popupContent:{
    padding:Spacing.lg,
    paddingBottom:Spacing.sm,
  },
  popupActions:{
    flexDirection:"row",
    gap:Spacing.sm,
    padding:Spacing.lg,
    borderTopWidth:1,
    borderTopColor:Colors.border,
  },
  popupResetButton:{
    minHeight:48,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:Spacing.lg,
    borderWidth:1,
    borderColor:Colors.primary,
    borderRadius:12,
    backgroundColor:Colors.surface,
  },
  popupResetText:{
    fontWeight:"700",
    color:Colors.primary,
  },
  popupApplyButton:{
    flex:1,
    minHeight:48,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:12,
    backgroundColor:Colors.primary,
  },
  popupApplyText:{
    fontWeight:"700",
    color:"#fff",
  },
  sortOption:{
    minHeight:56,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:Spacing.lg,
    borderBottomWidth:1,
    borderBottomColor:Colors.border,
    backgroundColor:Colors.surface,
  },
  selectedSortOption:{
    backgroundColor:Colors.background,
  },
  sortOptionText:{
    fontSize:15,
    color:Colors.text,
  },
  selectedSortOptionText:{
    fontWeight:"700",
    color:Colors.primary,
  },
  sortCheck:{
    fontSize:18,
    fontWeight:"700",
    color:Colors.primary,
  },
});