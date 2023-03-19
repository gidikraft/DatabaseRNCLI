import React, {useState, createRef} from 'react';
import {
SafeAreaView, 
StyleSheet, 
TouchableHighlight, 
TextInput, 
View, 
Image, 
Button, 
Text, 
KeyboardAvoidingView, 
Keyboard, 
TouchableOpacity, 
Dimensions, 
ScrollView,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];
const DEMO_OPTIONS_2 = [
  {"name": "Rex", "age": 30},
  {"name": "Mary", "age": 25},
  {"name": "John", "age": 41},
  {"name": "Jim", "age": 22},
  {"name": "Susan", "age": 52},
  {"name": "Brent", "age": 33},
  {"name": "Alex", "age": 16},
  {"name": "Ian", "age": 20},
  {"name": "Phil", "age": 24},
];

let data = [
  {
    value: 'Banana',
  }, 
  {
    value: 'Mango',
  }, 
  {
    value: 'Pear',
  }
];

const App = () => {
  const showDropdownValue = (idx, value) => setCity(value) // console.log(`idx=${idx}, value='${value}'`);
  
  const dropdown_2 = createRef();
  const [city, setCity] = useState('');
  
  const renderRow = (rowData, rowID, highlighted) => {

    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {backgroundColor: evenRow ? '#67656E' : 'white'}]}>
          
          <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
            {`${rowData.name} (${rowData.age})`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View>
            
              <Text style={{fontSize: 20, textAlign: 'center', margin: 10, color: '#9c062c',}}>
                Let's Book your Slot
              </Text>

              <ModalDropdown 
                defaultValue='Select city'
                style={styles.dropdown_1}
                dropdownStyle={{ width: '100%', }}
                options={['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9']}
                onSelect={(idx, value) => showDropdownValue(idx, value)}
              />

              <ModalDropdown 
                ref={dropdown_2}
                defaultValue='Select city'
                style={styles.dropdown_1}
                dropdownStyle={{ width: '100%', }}
                // renderRow={(rowData, rowID, highlighted)=> renderRow(rowData, rowID, highlighted)}
                options={DEMO_OPTIONS_2}
                onSelect={(idx, value) => showDropdownValue(idx, value)}
              />


              {/* <Dropdown
                label='Favorite Fruit'
                data={data}
              /> */}
              
          </View>
        </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#67656E',
  },
  dropdown_2_row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },

  dropdown_1: {
    color: 'white',
    top: 32,
    left: 8,
    marginVertical: 50,
    
  },
});
