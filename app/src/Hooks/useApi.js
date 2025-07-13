// import { useQueries, useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export default function useApi(endpoint) {
//   function getApi() {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}`);
//   }
//   let { data, isLoading, isError, error } = useQuery({
//     queryKey: ["endpoint"],
//     queryFn: getApi,
//     select: (data) => {
//       return data.data.data;
//     },
//   });
//   return { data, isLoading, isError, error };
// }

// Hooks/Useapi.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/";

const fetchData = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};

export default function useApi(endpointName) {
  let actualEndpoint = "";
  switch (endpointName) {
    case "products":
      actualEndpoint = "products";
      break;
    case "categories":
      actualEndpoint = "categories";
      break;
    case "brands":
      actualEndpoint = "brands";
      break;
    // Add other cases as needed
    default:
      throw new Error(`Unknown endpoint: ${endpointName}`);
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: [endpointName],
    queryFn: () => fetchData(actualEndpoint),
    select: (response) => response.data, // <--- ADD THIS LINE
  });
  return { data, isLoading, isError, error };
  // return useQuery({
  //   queryKey: [endpointName], // Query key should reflect the data type
  //   queryFn: () => fetchData(actualEndpoint),
  //   // You might also have a 'select' function here if the API response structure varies
  // });
}
