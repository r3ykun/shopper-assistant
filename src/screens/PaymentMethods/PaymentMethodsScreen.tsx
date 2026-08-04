import React,{
	useCallback,
	useState,
}from"react";
import{
	Alert,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}from"react-native";
import{
	useFocusEffect,
}from"@react-navigation/native";
import AppHeader from "../../components/layout/AppHeader";
import Screen from "../../components/layout/Screen";
import AppDropdown from "../../components/forms/AppDropdown";
import AppTextInput from "../../components/forms/AppTextInput";
import{
	PaymentMethod,
}from"../../database/entities/PaymentMethod";
import{
	PaymentMethodService,
}from"../../services";
import{
	Colors,
	Spacing,
}from"../../theme";

const typeItems=[
	{label:"Cash",value:"cash"},
	{label:"Card",value:"card"},
	{label:"E-Wallet",value:"e-wallet"},
	{label:"Bank Transfer",value:"bank"},
	{label:"Other",value:"other"},
];

export default function PaymentMethodsScreen(){
	const[
		paymentMethods,
		setPaymentMethods,
	]=useState<PaymentMethod[]>([]);

	const[
		editorVisible,
		setEditorVisible,
	]=useState(false);

	const[
		selectedMethod,
		setSelectedMethod,
	]=useState<PaymentMethod|null>(null);

	const[name,setName]=useState("");
	const[type,setType]=useState("cash");

	const loadPaymentMethods=
		useCallback(()=>{
			setPaymentMethods(
				PaymentMethodService.getAll()
			);
		},[]);

	useFocusEffect(
		useCallback(()=>{
			loadPaymentMethods();
		},[
			loadPaymentMethods,
		])
	);

	function openCreate(){
		setSelectedMethod(null);
		setName("");
		setType("cash");
		setEditorVisible(true);
	}

	function openEdit(
		method:PaymentMethod
	){
		setSelectedMethod(method);
		setName(method.name);
		setType(method.type);
		setEditorVisible(true);
	}

	function closeEditor(){
		setEditorVisible(false);
		setSelectedMethod(null);
		setName("");
		setType("cash");
	}

	function saveMethod(){
		try{
			if(selectedMethod){
				PaymentMethodService.update(
					selectedMethod.id,
					name,
					type
				);
			}else{
				PaymentMethodService.create(
					name,
					type
				);
			}

			closeEditor();
			loadPaymentMethods();
		}catch(error){
			Alert.alert(
				"Payment Method",
				error instanceof Error
					?error.message
					:"Unable to save payment method."
			);
		}
	}

	function deleteMethod(
		method:PaymentMethod
	){
		Alert.alert(
			"Delete Payment Method",
			`Delete "${method.name}"?`,
			[
				{
					text:"Cancel",
					style:"cancel",
				},
				{
					text:"Delete",
					style:"destructive",
					onPress:()=>{
						PaymentMethodService.delete(
							method.id
						);
						loadPaymentMethods();
					},
				},
			]
		);
	}

	return(
		<Screen>
			<AppHeader
				showMenu
				title="Modes of Payment"
			/>

			<View style={styles.container}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={openCreate}
				>
					<Text style={styles.addButtonText}>
						Add Payment Method
					</Text>
				</TouchableOpacity>

				<FlatList
					data={paymentMethods}
					keyExtractor={item=>
						item.id.toString()
					}
					contentContainerStyle={
						paymentMethods.length===0
							?styles.emptyList
							:styles.list
					}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyTitle}>
								No payment methods
							</Text>
						</View>
					}
					renderItem={({item})=>(
						<View style={styles.methodCard}>
							<TouchableOpacity
								style={styles.methodInfo}
								onPress={()=>
									openEdit(item)
								}
							>
								<Text style={styles.methodName}>
									{item.name}
								</Text>

								<Text style={styles.methodType}>
									{typeItems.find(
										typeItem=>
											typeItem.value===
											item.type
									)?.label??item.type}
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.statusButton,
									item.enabled===1
										?styles.enabledButton
										:styles.disabledButton,
								]}
								onPress={()=>{
									PaymentMethodService
										.setEnabled(
											item.id,
											item.enabled!==1
										);
									loadPaymentMethods();
								}}
							>
								<Text style={styles.statusText}>
									{item.enabled===1
										?"Enabled"
										:"Disabled"}
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.deleteButton}
								onPress={()=>
									deleteMethod(item)
								}
							>
								<Text style={styles.deleteText}>
									Delete
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>

			<Modal
				visible={editorVisible}
				transparent
				animationType="fade"
				statusBarTranslucent
				onRequestClose={closeEditor}
			>
				<Pressable
					style={styles.backdrop}
					onPress={closeEditor}
				>
					<Pressable
						style={styles.editor}
						onPress={event=>
							event.stopPropagation()
						}
					>
						<Text style={styles.editorTitle}>
							{selectedMethod
								?"Edit Payment Method"
								:"Add Payment Method"}
						</Text>

						<AppTextInput
							label="Name"
							value={name}
							placeholder="Payment method name"
							onChangeText={setName}
						/>

						<AppDropdown
							label="Type"
							selectedValue={type}
							items={typeItems}
							onValueChange={setType}
						/>

						<View style={styles.editorActions}>
							<TouchableOpacity
								style={styles.cancelEditorButton}
								onPress={closeEditor}
							>
								<Text style={styles.cancelEditorText}>
									Cancel
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.saveButton}
								onPress={saveMethod}
							>
								<Text style={styles.saveText}>
									Save
								</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</Pressable>
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
	addButton:{
		minHeight:50,
		justifyContent:"center",
		alignItems:"center",
		marginBottom:Spacing.lg,
		borderRadius:12,
		backgroundColor:Colors.primary,
	},
	addButtonText:{
		fontWeight:"700",
		color:"#fff",
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
		fontSize:18,
		fontWeight:"700",
		color:Colors.textLight,
	},
	methodCard:{
		flexDirection:"row",
		alignItems:"center",
		marginBottom:Spacing.md,
		padding:Spacing.md,
		borderWidth:1,
		borderColor:Colors.border,
		borderRadius:14,
		backgroundColor:Colors.surface,
	},
	methodInfo:{
		flex:1,
	},
	methodName:{
		fontSize:16,
		fontWeight:"700",
		color:Colors.text,
	},
	methodType:{
		marginTop:3,
		fontSize:12,
		color:Colors.textLight,
	},
	statusButton:{
		marginLeft:Spacing.sm,
		paddingHorizontal:10,
		paddingVertical:7,
		borderRadius:10,
	},
	enabledButton:{
		backgroundColor:Colors.primary,
	},
	disabledButton:{
		backgroundColor:Colors.border,
	},
	statusText:{
		fontSize:10,
		fontWeight:"700",
		color:"#fff",
	},
	deleteButton:{
		marginLeft:Spacing.sm,
	},
	deleteText:{
		fontSize:12,
		fontWeight:"700",
		color:"#D32F2F",
	},
	backdrop:{
		flex:1,
		justifyContent:"center",
		padding:Spacing.lg,
		backgroundColor:"rgba(0,0,0,.45)",
	},
	editor:{
		padding:Spacing.lg,
		borderRadius:18,
		backgroundColor:Colors.surface,
	},
	editorTitle:{
		marginBottom:Spacing.lg,
		fontSize:19,
		fontWeight:"700",
		color:Colors.text,
	},
	editorActions:{
		flexDirection:"row",
		gap:Spacing.sm,
	},
	cancelEditorButton:{
		flex:1,
		minHeight:48,
		justifyContent:"center",
		alignItems:"center",
		borderWidth:1,
		borderColor:Colors.primary,
		borderRadius:12,
	},
	cancelEditorText:{
		fontWeight:"700",
		color:Colors.primary,
	},
	saveButton:{
		flex:1,
		minHeight:48,
		justifyContent:"center",
		alignItems:"center",
		borderRadius:12,
		backgroundColor:Colors.primary,
	},
	saveText:{
		fontWeight:"700",
		color:"#fff",
	},
});