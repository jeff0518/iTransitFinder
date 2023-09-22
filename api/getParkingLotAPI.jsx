import axios from "axios";

const taipeiParkingLotInfo =
  "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json";

const taipeiParkingAvailability =
  "https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json";

export const getTaipeiParkingLotInfoData = async () => {
  try {
    const { data } = await axios.get(taipeiParkingLotInfo);
    return data.data.park;
  } catch (error) {
    console.log(error);
  }
};

export const getTaipeiParkingAvailabilityData = async () => {
  try {
    const { data } = await axios.get(taipeiParkingAvailability);
    return data.data.park;
  } catch (error) {
    console.log(error);
  }
};
