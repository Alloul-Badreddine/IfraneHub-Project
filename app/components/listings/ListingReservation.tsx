import { useState } from "react";
import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: (phoneNumber: string) => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showPhoneNumberError, setShowPhoneNumberError] = useState<boolean>(false);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    // Hide the error message when the user starts typing in the phone number
    setShowPhoneNumberError(false);
  };

  const isPhoneNumberValid = phoneNumber.trim() !== "";

  const handleReserveClick = () => {
    if (isPhoneNumberValid) {
      onSubmit(phoneNumber);
    } else {
      // Show the error message if the phone number is not filled
      setShowPhoneNumberError(true);
    }
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">MAD {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="relative p-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className={`mt-1 p-2 w-full ${showPhoneNumberError ? 'border-red-500' : ''}`}
        />
        {showPhoneNumberError && (
          <div className="text-red-500 text-sm mt-1">Please fill in the phone number to reserve.</div>
        )}
      </div>
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled || !isPhoneNumberValid}
          label="Reserve"
          onClick={handleReserveClick}
        />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>MAD {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
