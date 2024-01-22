export interface HospitalParam {
    hoscode?: string;
    hosname?: string;
    hostype?: string;
    provinceCode?: string;
    cityCode?: string;
    districtCode?: string;
    status?: number
}

interface BookingRule {
    cycle: number;
    quitDay: number;
    quitTime: string;
    releaseTime: string;
    rule: Array<string>;
    stopTime: string;
}

interface Hospital {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
        hostypeString: string;
        fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: string;
    route: string;
    status: number;
    bookingRule: null;
}

export interface HospitalDetail {
    bookingRule: BookingRule;
    hospital: Hospital;
}