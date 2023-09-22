import axios from "axios";

const taipeiMRT =
  "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Station/TRTC?%24top=1000&%24format=JSON";

export const getTaipeiMRTStationData = async () => {
  try {
    const { data } = await axios.get(taipeiMRT);
    return data;
  } catch (error) {
    console.log(error);
  }
};
