//shopper-assistant\src\screens\CheckoutSuccess\CheckoutSuccessScreen.tsx
import React from"react";
import{
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}from"react-native";
import{
	CommonActions,
	RouteProp,
	useNavigation,
	useRoute,
}from"@react-navigation/native";
import{
	RootStackParamList,
}from"../../navigation/RootStack";
import Screen from"../../components/layout/Screen";
import{
	Colors,
	Spacing,
}from"../../theme";

export default function CheckoutSuccessScreen(){
	const navigation=useNavigation<any>();

    const route=useRoute<
        RouteProp<
            RootStackParamList,
            "CheckoutSuccess"
        >
    >();

    const transactionId=
        route.params.transactionId;

	return(
		<Screen>
			<View style={styles.container}>
				<View style={styles.icon}>
					<Text style={styles.iconText}>
						✓
					</Text>
				</View>

				<Text style={styles.title}>
					Purchase Saved
				</Text>

                <Text style={styles.subtitle}>
                    Transaction #{transactionId}
                </Text>
                
				<Text style={styles.message}>
					You may safely exit the application or continue shopping.
				</Text>

				<TouchableOpacity
					style={styles.button}
					onPress={()=>
						navigation.dispatch(
							CommonActions.reset({
								index:0,
								routes:[
									{
										name:"MainDrawer",
										params:{
											screen:"Home",
										},
									},
								],
							})
						)
					}
				>
					<Text style={styles.buttonText}>
						Back to Home
					</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	);
}

const styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		padding:Spacing.xl,
		backgroundColor:Colors.background,
	},
	icon:{
		width:100,
		height:100,
		borderRadius:50,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:Colors.primary,
	},
	iconText:{
		fontSize:50,
		fontWeight:"700",
		color:"#fff",
	},
	title:{
		marginTop:Spacing.xl,
		fontSize:28,
		fontWeight:"800",
		color:Colors.text,
	},
	subtitle:{
		marginTop:Spacing.sm,
		fontSize:16,
		color:Colors.primary,
	},
	message:{
		marginTop:Spacing.lg,
		textAlign:"center",
		fontSize:15,
		color:Colors.textLight,
	},
	button:{
		marginTop:Spacing.xl,
		minWidth:220,
		paddingVertical:14,
		borderRadius:14,
		alignItems:"center",
		backgroundColor:Colors.primary,
	},
	buttonText:{
		fontWeight:"700",
		color:"#fff",
	},
});