import request from "@/utils/request";

interface Iaddress {
    adcode: string
}

async function getAddress() {
    const address: Iaddress = await request.get(`https://restapi.amap.com/v3/ip?key=1487b4a88590a64de684333776633332`);
    return address
}

export default getAddress