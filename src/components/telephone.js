import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function Telephone() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (value, country) => {
    // Handle phone number change here
    setPhoneNumber(value);
  };

  return (
    <div>
      <PhoneInput
        inputStyle={{ width: '250px' }} // Set width as desired
        country={'et'} // Default country
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
    </div>
  );
}

export default Telephone;
