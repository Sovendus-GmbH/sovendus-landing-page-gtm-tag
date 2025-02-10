interface SovendusPageConfig {
  settings: SovendusAppSettings;
  integrationType: string;
}

interface SovPageStatus {
  loadedOptimize: boolean;
  loadedVoucherNetworkSwitzerland: boolean;
  loadedVoucherNetworkVoucherCode: boolean;
  executedCheckoutProducts: boolean;
  missingSovReqTokenOrProductId: boolean;
  sovPageConfigFound: boolean;
}

interface SovendusAppSettings {
  voucherNetwork: VoucherNetworkSettings;
  optimize: OptimizeSettings;
  checkoutProducts: boolean;
}

interface OptimizeSettings {
  useGlobalId: boolean;
  globalId: string | null;
  globalEnabled: boolean;
}

interface VoucherNetworkSettings {
  trafficSourceNumber: string | undefined;
  trafficMediumNumber: string | undefined;
  iframeContainerId: string | undefined;
}

declare const data: {
  voucherNetwork: boolean;
  optimizeId: string;
  checkoutProducts: boolean;
  gtmOnSuccess: () => void;
  gtmOnFailure: () => void;
};

declare const require: (name: string) => any;

// copy from here










/**
 * @name log
 * @type {(message: string)=>void}
 */
const log = require("logToConsole");
log("Sovendus Page Tag - start");
/**
 * @name sovPageStatus
 * @type {SovPageStatus}
 *  */
const sovPageStatus = {
  loadedOptimize: false,
  loadedVoucherNetworkSwitzerland: false,
  loadedVoucherNetworkVoucherCode: false,
  executedCheckoutProducts: false,
  missingSovReqTokenOrProductId: false,
  sovPageConfigFound: false,
};
const setInWindow = require("setInWindow");
setInWindow("sovPageStatus", sovPageStatus);
const injectScript = require("injectScript");
const queryPermission = require("queryPermission");
const setCookie = require("setCookie");
const getUrl = require("getUrl");
const parseUrl = require("parseUrl");
const makeString = require("makeString");

const optimizeId = data.optimizeId;

/**
 * @name sovPageConfig
 * @type {SovendusPageConfig}
 *  */
const sovPageConfig = {
  settings: {
    voucherNetworkEnabled: data.voucherNetwork,
    optimize: {
      useGlobalId: true,
      globalId: optimizeId,
      globalEnabled: !!data.optimizeId,
    },
    checkoutProducts: data.checkoutProducts,
  },
  integrationType: "gtm-page-1.0.0",
};
setInWindow("sovPageConfig", sovPageConfig);
sovPageStatus.sovPageConfigFound = true;


const sovCouponCodeCookieName = "sovCouponCode";
const sovReqTokenCookieName = "sovReqToken";
const sovReqProductIdCookieName = "sovReqProductId";
const cookieAddOptions = {
  path: "/",
  "max-age": 60 * 60 * 24 * 31,
  secure: true,
};
const urlObject = getUrlObject();

if (checkPermissions()) {
  log("Sovendus Page Tag - checked permissions");
  if (sovPageConfig.settings.checkoutProducts) {
    checkoutProducts();
  }
  if (sovPageConfig.settings.voucherNetworkEnabled) {
    voucherNetwork();
  }
} else {
  log("No permission to get/set sovReqCookie or read url path");
}

function voucherNetwork() {
  const sovCouponCode = urlObject[sovCouponCodeCookieName];
  if (sovCouponCode) {
    setCookie(sovCouponCodeCookieName, sovCouponCode, cookieAddOptions);
    log("Sovendus Page Tag - success sovCouponCode =", sovCouponCode);
    sovPageStatus.loadedVoucherNetworkVoucherCode = true;
  }
  sovPageStatus.loadedVoucherNetworkSwitzerland = true;
  const sovLandingScript = "https://api.sovendus.com/js/landing.js";
  injectScript(
    sovLandingScript,
    data.gtmOnSuccess,
    data.gtmOnFailure,
    "use-chache"
  );
}

function checkoutProducts() {
  const sovReqToken = urlObject[sovReqTokenCookieName];
  const sovReqProductId = urlObject[sovReqProductIdCookieName];
  if (sovReqToken || sovReqProductId) {
    if (!sovReqToken || !sovReqProductId) {
      log(
        "Sovendus Page Tag - sovReqToken or sovReqProductId is missing in url"
      );
      sovPageStatus.missingSovReqTokenOrProductId = true;
    } else {
      setCookie(sovReqTokenCookieName, sovReqToken, cookieAddOptions);
      setCookie(sovReqProductIdCookieName, sovReqProductId, cookieAddOptions);
      log(
        "Sovendus Page Tag - success sovReqToken =",
        sovReqToken,
        "sovReqProductId =",
        sovReqProductId
      );
      sovPageStatus.executedCheckoutProducts = true;
    }
  }
}

function getUrlObject() {
  const urlObject = parseUrl(getUrl());
  return urlObject.searchParams;
}

function checkPermissions() {
  return (
    queryPermission("set_cookies", sovReqTokenCookieName, cookieAddOptions) &&
    queryPermission("set_cookies", sovCouponCodeCookieName, cookieAddOptions) &&
    queryPermission(
      "set_cookies",
      sovReqProductIdCookieName,
      cookieAddOptions
    ) &&
    queryPermission("get_url", "query", sovReqTokenCookieName) &&
    queryPermission("get_url", "query", sovCouponCodeCookieName) &&
    queryPermission("get_url", "query", sovReqProductIdCookieName)
  );
}

setInWindow("sovPageStatus", sovPageStatus);
log("Sovendus Page Tag - end");
data.gtmOnSuccess();
