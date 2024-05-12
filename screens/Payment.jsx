import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';


const TripPaymentPage = ({cid}) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [tripDuration, setTripDuration] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMethodsList] = useState([
    'Card',
    'PayPal',
    'InstaPay',
    'Cash'
  ]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisibility] = useState(false);
  const route = useRoute();
  const { flightRate = 0, hotelRate = 0 } = route.params || {};

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const durationInDays =
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24);
      setTripDuration(durationInDays);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const flightPayment = tripDuration * flightRate;
    const hotelPayment = tripDuration * hotelRate;
    setTotalPayment(flightPayment + hotelPayment);
  }, [tripDuration, flightRate, hotelRate]);

  const handleCheckInDateConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setCheckInDate(formattedDate);
    setDatePickerVisibility(false); 
  };

  const handleCheckOutDateConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setCheckOutDate(formattedDate);
    setCheckOutDatePickerVisibility(false); 
  };

    
  const handlePayment = () => {
   
    console.log('Payment processed:', {
      paymentMethod,
      totalPayment,
      checkInDate,
      checkOutDate
    });
    // Reset form fields
    setCheckInDate('');
    setCheckOutDate('');
    setTripDuration(0);
    setPaymentMethod('');
  };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setCheckInDate(formattedDate);
    hideDatePicker();
  };

  const renderPaymentMethodDetails = () => {
    switch (paymentMethod) {
      case 'Card':
        return (
          <View>
            <TextInput style={styles.input} placeholder="Card Number" />
            <TextInput style={styles.input} placeholder="Card Holder" />
            <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" />
            <TextInput style={styles.input} placeholder="CVV" />
          </View>
        );
      case 'PayPal':
        return (
          <View>
            <TextInput style={styles.input} placeholder="PayPal Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          </View>
        );
      case 'InstaPay':
        return (
          <View>
            <TextInput style={styles.input} placeholder="InstaPay Username" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          </View>
        );
      case 'Cash':
        return (
          <View>
            <Text style={styles.cashPaymentText}>
              Please pay by cash on arrival.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };
  const router = useRouter(); 
  return (
    <SafeAreaView style={styles.container}>
             <View >
            <Pressable style={styles.backButton} onPress={()=> router.replace(`/Chose/${cid}`)}>
                    <FontAwesome name='chevron-circle-left' size={35} color={'#127ac1'}/>
                    {/* <Text style={styles.backButtonText}> </Text> */}
                   
            </Pressable>
            </View>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.row}>
        <View style={styles.paymentRow}>
        <FontAwesome name="calendar" size={30} color="black" />
        <Text>    </Text>

        <TextInput
          style={styles.input}
          placeholder="Check-in DateYYYY/M/D"
          value={checkInDate}
          onChangeText={text => setCheckInDate(text)}
        />
        </View>
        <View style={styles.paymentRow}>
        <FontAwesome name="calendar" size={30} color="black" />
        <Text>    </Text>
        <TextInput
          style={styles.input}
          placeholder="Check-out DateYYYY/M/D"
          value={checkOutDate}
          onChangeText={text => setCheckOutDate(text)}
        />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleCheckInDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isCheckOutDatePickerVisible}
        mode="date"
        onConfirm={handleCheckOutDateConfirm}
        onCancel={() => setCheckOutDatePickerVisibility(false)}
      />


      <Text style={styles.durationText}>
        Trip Duration: {tripDuration} days
      </Text>

      <View style={styles.paymentRow}>
        <FontAwesome name="plane" size={35} color="black" />
        <Text style={styles.paymentRowText}>  Flight Rate: {flightRate}</Text>
      </View>

      <View style={styles.paymentRow}>
        <FontAwesome name="hotel" size={30} color="black" />
        <Text style={styles.paymentRowText}>  Hotel Rate: {hotelRate}</Text>
      </View>

      <Text style={styles.paymentText}>Total Payment: {totalPayment}</Text>

      <Text style={styles.paymentMethodText}>Payment Method:</Text>
      <Picker
        selectedValue={paymentMethod}
        style={styles.paymentMethodPicker}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
      >
        {paymentMethodsList.map((method) => (
          <Picker.Item key={method} label={method} value={method} />
        ))}
      </Picker>

      {renderPaymentMethodDetails()}

      <Pressable style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Make Payment</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginLeft: 100,
  },
  durationText: {
    fontSize: 20,
    marginBottom: 10,
  },
  paymentRowText: {
    marginLeft: 8,
    fontSize:17,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodPicker: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  cashPaymentText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  paymentButton: {
    backgroundColor: '#127ac1',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backcButton:{
    color:'#127ac1',
    borderStartWidth:30,
   alignContent:'space-around',
   paddingBottom:50,
  }
  ,
  backButtonText:{
    color:'#127ac1',
    alignContent:'space-around',
    fontSize:20,
    paddingBottom:20,
  },
});

export default TripPaymentPage;