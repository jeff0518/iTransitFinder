import axios from "axios";

const taipeiYouBike =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

export const getTaipeiYouBikeData = async () => {
  try {
    const { data } = await axios.get(taipeiYouBike);
    return data;
  } catch (error) {
    console.log(error);
  }
};
