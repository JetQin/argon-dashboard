

export class LicenseMetric {
  totalLicense: number;
  totalExpired: number;
  expiredItems: Record<string, number>;
  nonExpiredItems: Record<string, number>;
}

export class ContractMetric {
  totalContract: number;
  totalPrice: number;
  priceOfContract: Record<string, number>;
}

function Record() {
  return undefined;
}

export class Metric {
  licenseMetric: LicenseMetric = {
    totalLicense: 0,
    totalExpired: 0,
    expiredItems: Record(),
    nonExpiredItems: Record()
  };
  contractMetric: ContractMetric = {
    totalContract: 0,
    totalPrice: 0,
    priceOfContract: Record()
  };
}

