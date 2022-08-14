let total_trial = '';
let total_sub = '';
let total_regular = '';
let savings_trial = '';
let savings_sub = '';
let bottle_num = '';
let each_trial = '';
let each_sub = '';
let sub_price = '';
let trial_price = '';
let free_items = '';
let discount_sub = '';
let discount_trial = '';
let total_discount_sub = '';
let total_discount_trial = '';
let bottle_qty = 3;

const updateDisplayQuantities = () => {
  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: cart_currency,
  }).format;
  let num_bottles = parseInt(ORDER_QTY);

  if (num_bottles <= 1) {
    discount_sub = 0;
    discount_trial = 0;
    bottle_num = '1 BOTTLE';
    //console.log("1bottle");
  }
  if (num_bottles === 2) {
    discount_sub = 1;
    discount_trial = 1;
    bottle_num = '2 BOTTLES';
    //console.log("2bottles");
  }
  if (num_bottles === 3) {
    discount_sub = 2;
    discount_trial = 2;
    bottle_num = '3 BOTTLES';
    //console.log("3bottles");
  }
  //console.log(num_bottles);
  let total_discount_sub = discount_sub * num_bottles;
  let total_discount_trial = discount_trial * num_bottles;
  //console.log("Discount Sub: " + total_discount_sub);
  //console.log("Discount Trial: " + total_discount_trial);
  total_trial = (trial_price * num_bottles - total_discount_trial).toFixed(2);
  total_sub = (sub_price * num_bottles - total_discount_sub).toFixed(2);
  total_regular = (trial_price * num_bottles).toFixed(2);
  savings_trial = Math.floor((1 - total_trial / total_regular) * 100);
  savings_sub = Math.floor((1 - total_sub / total_regular) * 100);
  each_trial = (total_trial / num_bottles).toFixed(2);
  each_sub = (total_sub / num_bottles).toFixed(2);
  //console.log("Total Trial: " + total_trial);
  //console.log("Total Sub: " + total_sub);
  //console.log("Total Regular: " + total_regular);
  $('.price_box-compare.sub').html(currencyFormatter(total_regular));
  $('.price_box-sale.sub').html(currencyFormatter(total_sub));
  $('.price_box-compare.trial').html(currencyFormatter(total_regular));
  $('.price_box-sale.trial').html(currencyFormatter(total_trial));
  $('.variant-qty').html(ORDER_QTY);
  $('.btn_atc').attr('data-quantity', ORDER_QTY);
  $('.btn_atc').attr('data-frequency', ORDER_TYPE);
  if (frequency == 'subscription') {
    $('.total_savings').html(savings_sub);
    $('.price_box-sale.selected').html(currencyFormatter(total_sub));
    $('.unit-price[rtc-data-qty=3]').html(currencyFormatter(sub_price - 2));
    //console.log(currencyFormatter(sub_price - 2));
    //console.log(currencyFormatter(sub_price - 1));
    //console.log(currencyFormatter(sub_price));
    $('.unit-price[rtc-data-qty=2]').html(currencyFormatter(sub_price - 1));
    $('.unit-price[rtc-data-qty=1]').html(currencyFormatter(sub_price));
    $('[data-frequency=subscription]').attr('data-item-profile', profileSubscription);
    $('.price_box-compare.selected').html(currencyFormatter(total_regular));
  } else {
    $('.unit-price[rtc-data-qty=3]').html(currencyFormatter(trial_price - 4));
    $('.unit-price[rtc-data-qty=2]').html(currencyFormatter(trial_price - 2));
    $('.unit-price[rtc-data-qty=1]').html(currencyFormatter(trial_price));
    $('[data-frequency=trial]').attr('data-item-profile', profileTrial);
    $('.price_box-sale.selected').html(currencyFormatter(total_trial));
    $('.price_box-compare.selected').html(currencyFormatter(total_regular));
    $('.total_savings').html(savings_trial);
  }
};
let ORDER_TYPE = $('.tab_frequency').attr('data-frequency');
let ORDER_QTY = 3;
let frequency = '';
$('[data-frequency=subscription]').attr('data-item-profile', profileSubscription);
$('.tab_frequency').click(function (e) {
  frequency = $(this).attr('data-frequency');
  ORDER_TYPE = frequency;
  //console.log(ORDER_TYPE);
  //console.log(ORDER_QTY);
  updateDisplayQuantities();
});
$('.qty-select').click(function (e) {
  bottle_qty = $(this).attr('data-qty');
  ORDER_QTY = bottle_qty;
  //console.log(ORDER_TYPE);
  //console.log(ORDER_QTY);
  updateDisplayQuantities();
});
$('.btn_atc').click(function () {
  bottle_qty = $(this).attr('data-quantity');
  frequency = $(this).attr('data-frequency');
  //console.log(frequency + ": " + bottle_qty);
  if (frequency == 'subscription') {
    // do subscription stuff
  } else {
    // do other stuff
  }
  $('.rtc-cart').addClass('active');
  $('.backdrop').addClass('active');
});

let structuredData = document.getElementById('structured-data');
let parsedSD = JSON.parse(structuredData.innerText);
let productUrl = window.location.href;

window.onRTCReady = window.onRTCReady || [];
onRTCReady.push(async () => {
  const trialPrice = await RTC.getItemData({ itemProfile: profileTrial });

  if (productCategory == 'concentrates' && isLimitedRelease == 'false') {
    ORDER_TYPE = 'subscription';
    frequency = 'subscription';
    const subPrice = await RTC.getItemData({ itemProfile: profileSubscription });

    sub_price = subPrice.priceFloat;
    trial_price = trialPrice.priceFloat;
    cart_currency = subPrice.currencyCode;
    updateDisplayQuantities();
    let productComparePrice = subPrice.comparePriceFloat;
    let productSalePrice = subPrice.priceFloat;
    let productVariantId = subPrice.variantId;
    let productSKU = subPrice.sku;
    let productTitle = subPrice.productTitle;
    //console.log(productTitle);
    let productImage = subPrice.imageSrc;
    let productCurrency = subPrice.currencyCode;

    parsedSD.name = productTitle;
    parsedSD.url = productUrl;

    parsedSD.image = productImage;
    parsedSD.description = seoDescription;
    parsedSD.sku = productSKU;
    parsedSD.mpn = productVariantId;
    parsedSD.offers.priceCurrency = productCurrency;
    parsedSD.offers.price = productSalePrice;
    parsedSD.offers.price = productSalePrice;
    parsedSD.offers.url = productUrl;

    structuredData.innerText = JSON.stringify(parsedSD);
  } else {
    ORDER_TYPE = 'trial';

    frequency = 'trial';
    trial_price = trialPrice.priceFloat;
    cart_currency = trialPrice.currencyCode;
    updateDisplayQuantities();

    //console.log("not_concentrates");
    let productComparePrice = trialPrice.comparePriceFloat;
    let productSalePrice = trialPrice.priceFloat;
    let productVariantId = trialPrice.variantId;
    let productSKU = trialPrice.sku;
    let productTitle = trialPrice.productTitle;
    let productImage = trialPrice.imageSrc;
    let productCurrency = trialPrice.currencyCode;

    parsedSD.name = productTitle;
    parsedSD.url = productUrl;

    parsedSD.image = productImage;
    parsedSD.description = seoDescription;
    parsedSD.sku = productSKU;
    parsedSD.mpn = productVariantId;
    parsedSD.offers.priceCurrency = productCurrency;
    parsedSD.offers.price = productSalePrice;
    parsedSD.offers.url = productUrl;
    structuredData.innerText = JSON.stringify(parsedSD);
  }

  //console.log(JSON.stringify(parsedSD));
});
