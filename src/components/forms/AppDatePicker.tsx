import React,{
	useState,
}from"react";
import{
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    ViewStyle,
}from"react-native";
import DateTimePicker,{
	DateTimePickerAndroid,
	DateTimePickerEvent,
}from"@react-native-community/datetimepicker";
import{
	Colors,
	Spacing,
	Typography,
}from"../../theme";

type Props={
	label:string;
	value:string;
	onChange:(value:string)=>void;
	minimumDate?:Date;
	maximumDate?:Date;
	style?:ViewStyle;
};

function parseDate(value:string){
	if(!value){
		return new Date();
	}

	const parts=value.split("-").map(Number);

	if(
		parts.length!==3||
		parts.some(part=>!Number.isFinite(part))
	){
		return new Date();
	}

	return new Date(
		parts[0],
		parts[1]-1,
		parts[2]
	);
}

function formatValue(date:Date){
	const year=date.getFullYear();
	const month=String(
		date.getMonth()+1
	).padStart(2,"0");
	const day=String(
		date.getDate()
	).padStart(2,"0");

	return`${year}-${month}-${day}`;
}

function formatLabel(value:string){
	if(!value)return"Select date";

	const date=parseDate(value);

	return date.toLocaleDateString(
		"en-PH",
		{
			year:"numeric",
			month:"short",
			day:"numeric",
		}
	);
}

export default function AppDatePicker({
	label,
	value,
	onChange,
	minimumDate,
	maximumDate,
	style,
}:Props){
	const[
		iosVisible,
		setIosVisible,
	]=useState(false);

	const[selectedDate,setSelectedDate]=
		useState(parseDate(value));

	function handleChange(
		event:DateTimePickerEvent,
		date?:Date
	){
		if(
			event.type==="dismissed"||
			!date
		){
			return;
		}

		setSelectedDate(date);
		onChange(formatValue(date));
	}

	function openPicker(){
		const currentDate=parseDate(value);

		setSelectedDate(currentDate);

		if(Platform.OS==="android"){
			DateTimePickerAndroid.open({
				value:currentDate,
				mode:"date",
				display:"calendar",
				minimumDate,
				maximumDate,
				onChange:handleChange,
			});

			return;
		}

		setIosVisible(true);
	}

	return(
        <View
            style={[
                styles.container,
                style,
            ]}
        >
			<Text style={styles.label}>
				{label}
			</Text>

			<TouchableOpacity
				style={styles.field}
				activeOpacity={.75}
				onPress={openPicker}
			>
				<Text
					style={[
						styles.value,
						!value&&styles.placeholder,
					]}
				>
					{formatLabel(value)}
				</Text>

				<Text style={styles.calendarIcon}>
					▣
				</Text>
			</TouchableOpacity>

			{value?(
				<Pressable
					style={styles.clearButton}
					onPress={()=>
						onChange("")
					}
				>
					<Text style={styles.clearText}>
						Clear date
					</Text>
				</Pressable>
			):null}

			{Platform.OS==="ios"&&(
				<Modal
					visible={iosVisible}
					transparent
					animationType="fade"
					onRequestClose={()=>
						setIosVisible(false)
					}
				>
					<Pressable
						style={styles.backdrop}
						onPress={()=>
							setIosVisible(false)
						}
					>
						<Pressable
							style={styles.pickerModal}
							onPress={event=>
								event.stopPropagation()
							}
						>
							<Text style={styles.modalTitle}>
								{label}
							</Text>

							<DateTimePicker
								value={selectedDate}
								mode="date"
								display="inline"
								minimumDate={minimumDate}
								maximumDate={maximumDate}
								onChange={(
									event,
									date
								)=>{
									if(
										event.type!=="set"||
										!date
									){
										return;
									}

									setSelectedDate(date);
								}}
							/>

							<View style={styles.modalActions}>
								<TouchableOpacity
									style={styles.cancelButton}
									onPress={()=>
										setIosVisible(false)
									}
								>
									<Text style={styles.cancelText}>
										Cancel
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.confirmButton}
									onPress={()=>{
										onChange(
											formatValue(
												selectedDate
											)
										);
										setIosVisible(false);
									}}
								>
									<Text style={styles.confirmText}>
										Select
									</Text>
								</TouchableOpacity>
							</View>
						</Pressable>
					</Pressable>
				</Modal>
			)}
		</View>
	);
}

const styles=StyleSheet.create({
	container:{
		marginBottom:Spacing.md,
	},
	label:{
		marginBottom:Spacing.sm,
		fontSize:Typography.body,
		fontWeight:"600",
		color:Colors.text,
	},
	field:{
		minHeight:54,
		flexDirection:"row",
		alignItems:"center",
		paddingHorizontal:Spacing.md,
		borderWidth:1,
		borderColor:Colors.border,
		borderRadius:12,
		backgroundColor:Colors.surface,
	},
	value:{
		flex:1,
		fontSize:Typography.body,
		color:Colors.text,
	},
	placeholder:{
		color:Colors.textLight,
	},
	calendarIcon:{
		marginLeft:Spacing.sm,
		fontSize:18,
		color:Colors.primary,
	},
	clearButton:{
		alignSelf:"flex-start",
		marginTop:5,
	},
	clearText:{
		fontSize:12,
		color:Colors.primary,
	},
	backdrop:{
		flex:1,
		justifyContent:"center",
		padding:Spacing.lg,
		backgroundColor:"rgba(0,0,0,.45)",
	},
	pickerModal:{
		padding:Spacing.lg,
		borderRadius:18,
		backgroundColor:Colors.surface,
	},
	modalTitle:{
		marginBottom:Spacing.md,
		fontSize:18,
		fontWeight:"700",
		color:Colors.text,
	},
	modalActions:{
		flexDirection:"row",
		gap:Spacing.sm,
		marginTop:Spacing.md,
	},
	cancelButton:{
		flex:1,
		minHeight:46,
		justifyContent:"center",
		alignItems:"center",
		borderWidth:1,
		borderColor:Colors.primary,
		borderRadius:12,
	},
	cancelText:{
		fontWeight:"700",
		color:Colors.primary,
	},
	confirmButton:{
		flex:1,
		minHeight:46,
		justifyContent:"center",
		alignItems:"center",
		borderRadius:12,
		backgroundColor:Colors.primary,
	},
	confirmText:{
		fontWeight:"700",
		color:"#fff",
	},
});