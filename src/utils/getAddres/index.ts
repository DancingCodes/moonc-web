import request from "@/utils/request";

const getAddress = async () => {
    type addressType = {
        city: string,
        province: string,
        adcode: string
    }

    const address: addressType = await request.get(`https://restapi.amap.com/v3/ip?key=1487b4a88590a64de684333776633332`);
    return address
}

export const address = await getAddress()