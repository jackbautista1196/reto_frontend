import axios from 'axios';
const BASE_URL = 'https://indra-a01eo.herokuapp.com/indra-recruitment/api';
export async function getInfoUser(request) {
    const response = await axios.get(`${BASE_URL}/accounts`, request, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}
export async function getDetail(request) {
    const response = await axios.get(`${BASE_URL}/account-detail?id=${request}`, request, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}