interface BookingRule {
    cycle: number;
    quitDay: number;
    quitTime: string;
    releaseTime: string;
    rule: Array<string>;
    stopTime: string
}

interface HospitalParam {
    fullAddress: string;
    hostypeString: string;
}

export interface HospitalDetail {
    id: string;
    hosname: string;
    bookingRule: BookingRule;
    param: HospitalParam;
    logoData: string;
    hostype: string;
    hoscode: string;
}

export interface HospitalType {
    id: number | string;
    name: string;
    value: string | undefined;
}