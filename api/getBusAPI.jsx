import axios from "axios";

const taipeiBus =
  "https://tdx.transportdata.tw/api/basic/v2/Bus/DisplayStopOfRoute/City/Taipei?%24top=300&%24format=JSON";

export const getTaipeiBusStationData = async () => {
  try {
    const { data } = await axios.get(taipeiBus);
    return data;
  } catch (error) {
    console.log(error);
  }
};
