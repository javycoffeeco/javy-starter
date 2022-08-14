/* eslint-disable no-return-assign */
// ALL PAGES BEFORE </BODY>
let addonTitle = '';
let addonImage = '';
let addonType = 'bottles';

const swapMap = {
  6713818382403: {
    subProfile: 'vanillaSubscription',
    trialProfile: 'vanillaTrial',
  },
  6713818284099: {
    subProfile: 'originalSubscription',
    trialProfile: 'originalTrial',
  },
  6713818251331: {
    subProfile: 'caramelSubscription',
    trialProfile: 'caramelTrial',
  },
  6713818316867: {
    subProfile: 'mochaSubscription',
    trialProfile: 'mochaTrial',
  },
  6713818415171: {
    subProfile: 'decafSubscription',
    trialProfile: 'decafTrial',
  },
};

window.onRTCReady = window.onRTCReady || [];
window.onRTCRender = window.onRTCRender || [];

function renderLine(line) {
  return `
	<div class="rtc_line_item ${line.itemFrequency}">
	<div class="rtc_line_item-content">
		<div class="line_item-line">
			<div class="line_item-image-container">
				<div class="qty-item">
					<div class="line_item-qty">${line.quantity}</div>
				</div>
				<div class="club-item ${line.itemFrequency}">
					<div class="club-icon w-embed">
						<svg width="420" height="420" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11.9999 18.26L4.94691 22.208L6.52191 14.28L0.586914 8.792L8.61391 7.84L11.9999 0.5L15.3859 7.84L23.4129 8.792L17.4779 14.28L19.0529 22.208L11.9999 18.26Z" fill="currentColor"></path>
						</svg>
					</div>
				</div>
				<div class="line_item-container-img">
				
					<div class="line_item-image w-embed">${line.imageTag}</div>
				</div>
			</div>
			<div class="line_item-content">
				<div class="line_item-line justified">
				
					<div class="line_item-title">${line.productTitle}</div>
					<a data-line-id="${line.lineId}" rtc-cart-action="update" href="#" class="line_item-remove rtc-remove-item w-inline-block" rtc-cart="update">
				
						<div class="icon-5 w-embed">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" fill="currentColor"></path>
							</svg>
						</div>
					</a>
				</div>

				<!--
			<div class="line_item-line ${line.itemFrequency}_${line.itemTier}">
			
				<div class="line_item-text savings ${line.itemFrequency}_${line.itemTier}">2 Bottle Discount (26% Off)</div>
			</div>

			-->
				<div class="line_item-line">
				
					<div class="line_item-club ${line.itemFrequency}">Club</div>
					<div class="line_item-text renewal ${line.itemFrequency}">${line.sellingPlanName}</div>
				</div>
				<div class="line_item-line justified">
					<div rtc-cart-action="update" class="qty-selector-cart"> 
					<a data-line-id="${line.lineId}" href="#" class="qty-cart rtc-decrease-quantity" rtc-cart="update">-</a>
						<div data-line-id="${line.lineId}" class="qty-cart rtc-quantity">${line.quantity}</div> 
					<a data-line-id="${line.lineId}" href="#" class="qty-cart rtc-increase-quantity" rtc-cart="update">+</a> 
					
					</div>
					
					<div class="line_item-pricing">
						<div class="prices-divs">
						
							<div class="line_item-compare ${line.itemFrequency}_${line.quantity}">${line.comparePrice}</div>
						</div>
						<div class="prices-divs">
						
							<div class="line_item-sale">${line.volumeDiscount}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="rtc_swap" data-line-id="${line.productId}" data-line-qty="${line.quantity}" data-line-frequency="${line.itemFrequency}" rtc-cart="update" class="rtc_toggle-checkmark ${line.itemFrequency} w-form">
		
		<form id="wf-form-swap_form" name="wf-form-swap_form" data-name="swap_form" method="get" aria-label="swap_form">
				<label class="w-checkbox rtc_checkbox-container">
					<div class="w-checkbox-input w-checkbox-input--inputType-custom swap-input w--redirected-checked"></div>
					<input type="checkbox" name="${line.lineId}" id="${line.lineId}" data-name="${line.lineId}" checked="" style="opacity:0;position:absolute;z-index:-1"><span class="renewal-text w-form-label" for="${line.lineId}">Subscribe Monthly & Save 20%</span> </label>
			</form>
		</div>
	</div>
</div>
 `;
}
let totalSubBottles;
let totalTrialBottles;
onRTCRender.push((cartLines, cartTotals) => {
  let qty = 0;
  let cart_items = document.getElementById('cart-number');
  let cart_quantity = document.getElementById('cart-quantity');
  let cart_footer = document.getElementById('cart-footer');
  let cart_empty = document.getElementById('cart-empty');
  let cart_addons = document.getElementById('cart-addons');
  for (const line of cartLines) {
    qty += line.quantity;
  }
  if (qty > 0) {
    cart_items.classList.add('active');
    cart_quantity.classList.add('active');
    cart_items.innerHTML = `${qty}`;
    cart_quantity.innerHTML = `${qty}`;
    cart_footer.classList.add('active');
    cart_empty.classList.remove('active');
    cart_addons.classList.add('active');
  } else {
    cart_items.classList.remove('active');
    cart_quantity.classList.remove('active');
    cart_quantity.innerHTML = ``;
    cart_footer.classList.remove('active');
    cart_empty.classList.add('active');
    cart_addons.classList.remove('active');
  }
  let finalValue = 0;
  totalSubBottles = 0;
  totalTrialBottles = 0;
  let totalSubValue = 0;
  let totalAccValue = 0;
  let totalAccQty = 0;
  let totalTrialValue = 0;
  for (const line of cartLines) {
    if (swapMap[line.productId]) {
      if (line.sellingPlanName.match(/Ships/)) {
        totalSubBottles += line.quantity;
        totalSubValue += line.quantity * line.priceFloat;
        line.bottleType = 'sub';
      } else {
        totalTrialBottles += line.quantity;
        totalTrialValue += line.quantity * line.priceFloat;
        line.bottleType = 'trial';
      }
    } else {
      if (line.sellingPlanName.match(/Ships/)) {
        totalAccQty += line.quantity;
        totalAccValue += line.quantity * line.priceFloat;
        line.bottleType = 'sub';
      } else {
        totalAccQty += line.quantity;
        totalAccValue += line.quantity * line.priceFloat;
        line.bottleType = 'acc';
      }
    }
  }

  let subDiscountPerBottle = 0;
  let trialDiscountPerBottle = 0;
  let trialTier = 0;
  let subTier = 0;
  let bottle_num_subs = '';
  let bottle_num_trial = '';
  switch (totalSubBottles) {
    case 0:
    case 1:
      subDiscountPerBottle = 0;
      subTier = 0;
      bottle_num = '1';
      break;
    case 2:
      subDiscountPerBottle = 1;
      subTier = 2;
      bottle_num = '2';
      break;
    case 3:
      subDiscountPerBottle = 2;
      subTier = 3;
      bottle_num = '3';
      break;
    default:
      subDiscountPerBottle = 3;
      subTier = 4;
      bottle_num = '4+';
      break;
  }

  switch (totalTrialBottles) {
    case 0:
    case 1:
      trialDiscountPerBottle = 0;
      trialTier = 0;
      bottle_num = '1';
      break;
    case 2:
      trialDiscountPerBottle = 1;
      trialTier = 2;
      bottle_num = '2';
      break;
    case 3:
      trialDiscountPerBottle = 2;
      trialTier = 3;
      bottle_num = '3';
      break;
    default:
      trialDiscountPerBottle = 3;
      trialTier = 4;
      bottle_num = '4+';
      break;
  }

  let totalDiscountValue = 0;
  const renderData = cartLines.map((line) => {
    const currencyFormatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: line.currency,
    }).format;
    let volumeDiscount = '';
    let itemFrequency = '';
    let itemTier = '';

    if (line.bottleType === 'sub' && subDiscountPerBottle >= 0) {
      const discount = line.quantity * subDiscountPerBottle;
      const each_discounted = line.priceFloat - subDiscountPerBottle;
      bottle_num_subs = totalSubBottles;
      volumeDiscount = currencyFormatter(each_discounted);
      //console.log("VolumeDiscount:" + volumeDiscount);
      itemFrequency = 'subscription';

      totalDiscountValue += discount;
      selectAll('.cart-addons_bar').forEach((item) => item.classList.add('active'));
      if (bottle_num_subs === 1) {
        //console.log("it's 1 sub");
        itemTier = 1;
        addonDealPrice = currencyFormatter(18.95);
      }
      if (bottle_num_subs === 2) {
        //console.log("it's 2 subs");
        //$(".line_item-text.savings.subscription").text('2 Bottle Discount ("24% off")');
        itemTier = 2;
        addonDealPrice = currencyFormatter(17.95);
      }
      if (bottle_num_subs === 3) {
        //console.log("it's 3 subs");
        itemTier = 3;
      }
      if (bottle_num_subs >= 4) {
        //console.log("it's 4+ subs");
        itemTier = 4;
        addonDealPrice = currencyFormatter(16.95);
      }
    }

    if (line.bottleType === 'trial' && trialDiscountPerBottle >= 0) {
      const discount = line.quantity * trialDiscountPerBottle;
      const each_discounted = line.priceFloat - trialDiscountPerBottle;
      bottle_num_trial = totalTrialBottles;
      volumeDiscount = currencyFormatter(each_discounted);
      itemFrequency = 'trial';
      totalDiscountValue += discount;

      if (bottle_num_trial === 1) {
        //console.log("it's 1 trial");
        itemTier = 1;
        //$(".tier_bottle_num").text("2");
        //$(".tier_bottle_discount").text("8");
        addonDealPrice = currencyFormatter(22.95);
        console.log(addonDealPrice);
      }
      if (bottle_num_trial === 2) {
        itemTier = 2;
        console.log("it's 2 trial");
        //$(".tier_bottle_num").text("3");
        //$(".tier_bottle_discount").text("16");
        addonDealPrice = currencyFormatter(20.95);
      }
      if (bottle_num_trial === 3) {
        itemTier = 3;
        //console.log("it's 3 trial");
        //$(".tier_bottle_num").text("4+");
        //$(".tier_bottle_discount").text("20");
        addonDealPrice = currencyFormatter(18.95);
      }
      if (bottle_num_trial >= 4) {
        itemTier = 4;
        //console.log("it's 4+ trial");
      }

      //console.log(trialDiscountPerBottle);

      if (selectAll('.line_item-compare').length > 0 && line.trialDiscountPerBottle > 0)
        selectAll('.line_item-compare').forEach((item) => (item.style.display = ''));
    }

    if (line.bottleType === 'acc') {
      const discount = line.quantity * trialDiscountPerBottle;
      const each_discounted = line.priceFloat;
      acc_num = line.quantity;
      volumeDiscount = currencyFormatter(each_discounted);
      itemFrequency = 'acc';
      selectAll('.line_item-text.renewal.acc').forEach(
        (item) => (item.innerHTML = 'One-time Purchase')
      );
    }
    finalValueParse = totalSubValue + totalAccValue + totalTrialValue - totalDiscountValue;
    finalValue = currencyFormatter(
      totalSubValue + totalAccValue + totalTrialValue - totalDiscountValue
    );
    //console.log(finalValue);

    // Transform currency to numbers
    function curToNum(cur) {
      return Number(cur.replace(/[^0-9.-]+/g, ''));
    }
    // Show / Hide compare value
    if (curToNum(finalValue) === curToNum(line.comparePrice) * line.quantity)
      selectAll('.rtc-compare-total').forEach((item) => (item.style.display = 'none'));
    else selectAll('.rtc-compare-total').forEach((item) => (item.style.display = ''));
    return renderLine({
      volumeDiscount,
      itemTier,
      itemFrequency,
      ...line,
    });
  });

  // Total price
  document.querySelector('.rtc_total-price').textContent = finalValue;
  if (selectAll('.drawer_discounts').length > 0)
    selectAll('.drawer_discounts').textContent = totalDiscountValue;
  document.getElementById('lineItemRenderer').innerHTML = renderData.join('');

  // Trial checkmark
  selectAll('.rtc_toggle-checkmark.trial .swap-input').forEach((check) =>
    check.setAttribute('checked', false)
  );
  selectAll('.rtc_toggle-checkmark.trial .w-checkbox-input--inputType-custom.swap-input').forEach(
    (check) => check.classList.remove('w--redirected-checked')
  );
  // Subscription checkmark
  selectAll('.rtc_toggle-checkmark.subscription .swap-input').forEach((check) =>
    check.setAttribute('checked', true)
  );
  selectAll(
    '.rtc_toggle-checkmark.subscription .w-checkbox-input--inputType-custom.swap-input'
  ).forEach((check) => check.classList.add('w--redirected-checked'));
  // Line item type text
  if (selectAll('.line_item-text.renewal.subscription').length > 0)
    selectAll('.line_item-text.renewal.subscription').forEach(
      (item) => (item.innerHTML = '<p>Ships Every 30 Days</p>')
    );
  if (selectAll('.line_item-text.renewal.trial').length > 0)
    selectAll('.line_item-text.renewal.trial').forEach(
      (item) => (item.innerHTML = '<p>One-time Purchase</p>')
    );
  if (selectAll('.line_item-text.renewal.acc').length > 0)
    selectAll('.line_item-text.renewal.acc').forEach(
      (item) => (item.innerHTML = '<p>One-time Purchase</p>')
    );
  // Line item savings
  // Subscription
  selectAll('.line_item-line.subscription_1').forEach((item) => item.remove());
  if (selectAll('.line_item-text.savings.subscription_2').length > 0)
    selectAll('.line_item-text.savings.subscription_2').forEach(
      (item) => (item.textContent = '2 Bottle Discount (Save 24%)')
    );
  if (selectAll('.line_item-text.savings.subscription_3').length > 0)
    selectAll('.line_item-text.savings.subscription_3').forEach(
      (item) => (item.textContent = '3 Bottle Discount (Save 28%)')
    );
  if (selectAll('.line_item-text.savings.subscription_4').length > 0)
    selectAll('.line_item-text.savings.subscription_4').forEach(
      (item) => (item.textContent = '4+ Bottle Discount (Save 32%)')
    );
  // Trial
  selectAll('.line_item-line.trial_1').forEach((item) => item.remove());
  if (selectAll('.line_item-text.savings.trial_2').length > 0)
    selectAll('.line_item-text.savings.trial_2').forEach(
      (item) => (item.textContent = '2 Bottle Discount (Save 8%)')
    );
  if (selectAll('.line_item-text.savings.trial_3').length > 0)
    selectAll('.line_item-text.savings.trial_3').forEach(
      (item) => (item.textContent = '3 Bottle Discount (Save 16%)')
    );
  if (selectAll('.line_item-text.savings.trial_4').length > 0)
    selectAll('.line_item-text.savings.trial_4').forEach(
      (item) => (item.textContent = '4+ Bottle Discount (Save 24%)')
    );
  // Accessories
  selectAll('.line_item-line.acc_').forEach((item) => item.remove());

  // Checkmark click event
  selectAll('.rtc_toggle-checkmark').forEach((btn) =>
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      freqProdId = this.getAttribute('data-line-id');
      freqProdQty = this.getAttribute('data-line-qty');
      freqProdFreq = this.getAttribute('data-line-frequency');
      swapFrequency();
    })
  );

  /*
$(".btn-addon_add").click(function(e) {
	addonIndex = $(this).closest(".swiper-slide");
	newAddonIndex = addonIndex.attr("data-swiper-slide-index");
	console.log(newAddonIndex);
	setTimeout(() => {
		//rtcAddons.removeSlide(newAddonIndex);
		//rtcAddons.slideNext();
		//rtcAddons.updateSlides();
		//rtcAddons.update();
	}, 300);
	});
*/
});
// document.querySelectorAll function
function selectAll(item) {
  return document.querySelectorAll(item);
}

//////////////////////////////////////
//     SWAP FREQUENCY CHECKMARK     //
//////////////////////////////////////
const swapFrequency = async () => {
  if (swapMap[freqProdId]) {
    const data = swapMap[freqProdId];
    if (freqProdFreq === 'subscription') {
      await RTC.setItemQuantities([
        { itemProfile: data.subProfile, quantity: 0 },
        { itemProfile: data.trialProfile, quantity: freqProdQty },
      ]);
    } else {
      await RTC.setItemQuantities([
        { itemProfile: data.subProfile, quantity: freqProdQty },
        { itemProfile: data.trialProfile, quantity: 0 },
      ]);
    }
  }
};

//////////////////////////////////////
//       CLOSE CART FUNCTION        //
//////////////////////////////////////
const closeCart = (e) => {
  document.querySelector('.rtc-cart').classList.remove('active');
  document.querySelector('.backdrop').classList.remove('active');
};

//////////////////////////////////////
//         OPEN CART FUNCTION       //
//////////////////////////////////////

const openCart = (e) => {
  document.querySelector('.rtc-cart').classList.add('active');
  document.querySelector('.backdrop').classList.add('active');
};

const quickBuyOpen = (e) => {
  document.querySelector('.quick_buy-drawer').classList.add('active');
  document.querySelector('.backdrop').classList.add('active');
};

const quickBuyClose = (e) => {
  document.querySelector('.quick_buy-drawer').classList.remove('active');
  document.querySelector('.backdrop').classList.remove('active');
};

const addToCart = (e) => {
  //console.log();

  document.querySelector('.cart-loader').classList.add('active');
  onRTCRender.push(async () => {
    document.querySelector('.cart-loader').classList.remove('active');
  });
};

//////////////////////////////////////
//       CART - UPDATING STATE     //
//////////////////////////////////////
const updatingState = (e) => {
  document.querySelector('.cart-loader').classList.add('active');

  selectAll('.rtc_line_item').forEach((item) => item.classList.add('updating'));
  onRTCRender.push(async () => {
    document.querySelector('.cart-loader').classList.remove('active');

    selectAll('.rtc_line_item').forEach((item) => item.classList.remove('updating'));
  });
};

//////////////////////////////////////
//           RTC - RENDER           //
//////////////////////////////////////
const rtcRerenderer = (e) => {
  RTC.render();
};

//////////////////////////////////////
//       CHECKOUT LOADER FUNCT      //
//////////////////////////////////////
const checkoutLoader = (e) => {
  document.querySelector('.rtc-loader').style.display = 'flex';
  setTimeout(() => {
    document.querySelector('.rtc-loader').style.display = 'none';
  }, 6000);
};

//////////////////////////////////////
//       CREATE SLIDER ADDONS       //
//////////////////////////////////////
const rtcAddonWrapper = document.querySelector('.slider-rtc-addons .swiper-wrapper');

let rtcAddons;

function createRtcAddons(addonContainer, productProfile) {
  createDiv = document.createElement('DIV');
  createDiv.classList.add('swiper-slide');
  createDiv2 = document.createElement('DIV');
  createDiv2.classList.add('swiper-slide-container');
  createDiv2.innerHTML = `
  <div class="rtc-addon_item">
	<div class="rtc-addon_content">
		<div class="rtc-addon_line" data-item-profile="${productProfile}">
			<div class="rtc-addon-image-container"><div class="rtc-addon_image rtc-image" data-item-profile="${productProfile}"></div></div>
			<div class="rtc-addon_inner-content">
				<div class="rtc-addon_litem-line justified">
					<div class="line_item-title rtc-product-title" data-item-profile="${productProfile}"></div>
				</div>
				<div class="line_item-line justified">
				<div data-item-profile="${productProfile}" class="rtc-addon_price rtc-price"></div>
				</div>
				<div class="line_item-line justified">
					<div data-item-profile="${productProfile}" class="rtc-addon-button btn-addon_add rtc-increase-quantity">
						<div class="addon_cta-text" rtc-cart="update">+ ADD</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  `;
  createDiv.appendChild(createDiv2);
  addonContainer.appendChild(createDiv);
}

const rtcCreateAddons = async () => {
  var i;
  for (i = 0; i < newProfileIds.length; i++) {
    createRtcAddons(rtcAddonWrapper, newProfileIds[i]);
  }
  rtcAddons = new Swiper('.slider-rtc-addons', {
    //slidesPerView: 1,
    spaceBetween: 10,
    //allowTouchMove: true,
    navigation: {
      nextEl: '.rtc-addon-next',
      //prevEl: ".swiper-button-prev"
    },

    loop: true,
    breakpoints: {
      0: {
        /* when window >=0px - mobile landscape/portriat */
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },
      480: {
        /* when window >=0px - mobile landscape/portriat */
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },
      767: {
        /* when window >= 767px - tablet */
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },
      992: {
        /* when window >= 988px - desktop */
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        //loop: false,
        //allowTouchMove: false,
        centeredSlides: false,
      },
    },
  });
  rtcAddons.update();
  //$(".cart-addons_container").addClass("active");
};

function destroyAll() {
  if (rtcAddons) {
    rtcAddons.destroy(true, true);
  }
  document.querySelectorAll('.swiper-slide').forEach((el) => {
    el.remove();
  });
}

function reCreateAddons() {
  //addonChecker();
  destroyAll();
  rtcCreateAddons();
}

//////////////////////////////////////
//         RUN CART FUNCTIONS       //
//////////////////////////////////////
document.querySelector('.backdrop').style.cursor = 'default';
window.addEventListener('click', function (e) {
  const target =
    e.target.closest('.w-checkbox') ||
    e.target.closest('a') ||
    e.target.closest('.rtc-increase-quantity') ||
    e.target;
  if (target && target.getAttribute('rtc-cart') === 'close') closeCart();
  if (target && target.getAttribute('rtc-cart') === 'checkout') checkoutLoader();
  if (target && target.getAttribute('rtc-action') === 'add-to-cart') addToCart();
  if (target && target.getAttribute('rtc-cart') === 'open') openCart();
  if (target && target.getAttribute('quick-buy') === 'open') quickBuyOpen();
  if (target && target.getAttribute('quick-buy') === 'close') quickBuyClose();

  if (target && target.classList.contains('.rtc-rerenderer')) rtcRerenderer(target);
  if (target && target.getAttribute('rtc-cart') === 'update') updatingState();
  if (target && target.classList.contains('w-checkbox')) updatingState();
  else return;
});

// $(function () {
// 	$(document).on("click", "[rtc-cart=close]", closeCart);
// 	$(document).on("click", "[rtc-cart=open]", openCart);
// 	$(document).on("click", "[rtc-cart=checkout]", checkoutLoader);
// 	$(document).on("click", "[rtc-action=add-to-cart]", addToCart);
// 	$(document).on("click", ".rtc-rerenderer", rtcRerenderer);
// });

let newProfileIds = [];

let totalBottles;
window.beforeRTCRender = window.beforeRTCRender || [];
beforeRTCRender.push((cartLines, cartTotals) => {
  addonChecker();

  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
  }).format;

  const cartProductLines = RTC.getCartLines();
  const getBottleQty = (x) => Object.keys(x).length;
  const subConcentrates = cartProductLines.filter(
    (product) => product.sellingPlanName.match(/Ships/) && product.productTitle.match(/Coffee/)
  );
  const trialConcentrates = cartProductLines.filter(
    (product) => product.sellingPlanName === '' && product.productTitle.match(/Coffee/)
  );
  const trialAccessories = cartProductLines.filter(
    (product) => !product.productTitle.match(/Coffee/)
  );
  const subQty = getBottleQty(subConcentrates);
  //console.log(subQty + " subscription lineItems");
  const trialQty = getBottleQty(trialConcentrates);
  //console.log(trialQty + " trial lineItems");
  const accQty = getBottleQty(trialAccessories);
  //console.log(accQty + " accessories lineItems");
  const totalSubBottles = subConcentrates.reduce((acc, product) => acc + product.quantity, 0);
  //console.log("Total Sub: " + totalSubBottles);
  const totalTrialBottles = trialConcentrates.reduce((acc, product) => acc + product.quantity, 0);
  //console.log("Total Trial: " + totalTrialBottles);
  const totalAcc = trialAccessories.reduce((acc, product) => acc + product.quantity, 0);
  //console.log("Total Acc: " + totalAcc);
  totalBottles = totalSubBottles + totalTrialBottles;
  //console.log("Total Bottles: " + totalBottles);

  let reducedobj = JSON.parse(
    JSON.stringify(cartProductLines, ['productId', 'quantity', 'sellingPlanId'], 1)
  );
  //console.log(reducedobj);
  //console.log(reducedobj.productId); // John

  let javyObject = {};
  javyObject.cartQty = {};
  javyObject.lineItems = {};
  javyObject.cartQty.subscriptionBottles = totalSubBottles;
  javyObject.cartQty.trialBottles = totalTrialBottles;
  javyObject.cartQty.trialAccessories = totalAcc;
  javyObject.lineItems.subBottles = subConcentrates;
  javyObject.lineItems.trialBottles = trialConcentrates;
  javyObject.lineItems.accessories = trialAccessories;
  //console.log(javyObject);

  /*
		if (cartProductLines.filter(d => d.productId == '7353863078049').length > 0) {
  	console.log("found_vanilla");
		}
				// check if cart contains original
		if (cartProductLines.filter(d => d.productId == '7353862914209').length > 0) {
			console.log("found_original");
			}
	*/

  if (totalBottles >= 4) {
    //newProfileIds = ["milkFrother", "masonJar", "travelTumbler", "travelMug"];
    document.querySelector('.cart-addons_bar').classList.remove('active');
    //reCreateAddons();
  } else {
    //newProfileIds = ["originalSubscription", "vanillaSubscription", "mochaSubscription"];
    document.querySelector('.cart-addons_bar').classList.add('active');
    //reCreateAddons();
  }

  if (totalSubBottles > totalTrialBottles) {
    //newProfileIds = ["originalSubscription", "vanillaSubscription", "mochaSubscription"];
    // DO SUBSCRIPTION STUFF
    //console.log("subscription");
    if (totalSubBottles === 1) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '2'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = '20'));
      addonDealPrice = currencyFormatter(18.95);
    }
    if (totalSubBottles === 2) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '3'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = '24'));
      addonDealPrice = currencyFormatter(18.95);
    }
    if (totalSubBottles === 3) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '4+'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = '28'));
      addonDealPrice = currencyFormatter(16.95);
    }
    if (totalSubBottles >= 4) {
      //newProfileIds = ["milkFrother", "masonJar", "travelTumbler", "travelMug"];
    }
  } else {
    //newProfileIds = ["originalTrial", "vanillaTrial", "mochaTrial"];
    // DO TRIAL STUFF
    if (totalTrialBottles === 1) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '8'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = ''));
      addonDealPrice = currencyFormatter(22.95);
    }
    if (totalTrialBottles === 2) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '3'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = '16'));
      addonDealPrice = currencyFormatter(20.95);
    }
    if (totalTrialBottles === 3) {
      selectAll('.tier_bottle_num').forEach((item) => (item.textContent = '4+'));
      selectAll('.tier_bottle_discount').forEach((item) => (item.textContent = '2'));
      addonDealPrice = currencyFormatter(18.95);
    }
  }

  const profileIds = [
    {
      name: 'caramel',
      id: '6713818251331',
      order: function (x) {
        return [`caramel${x}`, `mocha${x}`, `vanilla${x}`, `original${x}`];
      },
    },
    {
      name: 'mocha',
      id: '6713818316867',
      order: function (x) {
        return [`mocha${x}`, `vanilla${x}`, `original${x}`, `caramel${x}`];
      },
    },
    {
      name: 'vanilla',
      id: '6713818382403',
      order: function (x) {
        return [`vanilla${x}`, `original${x}`, `caramel${x}`, `mocha${x}`];
      },
    },
    {
      name: 'original',
      id: '6713818284099',
      order: function (x) {
        return [`original${x}`, `caramel${x}`, `mocha${x}`, `vanilla${x}`];
      },
    },
  ];
  if (totalTrialBottles >= 1 && totalSubBottles === 0) {
    for (const product of profileIds) {
      if (cartLines[cartLines.length - 1].productId === product.id)
        newProfileIds = product.order('Trial');
    }
  } else if (totalSubBottles >= 1) {
    for (const product of profileIds) {
      if (cartLines[cartLines.length - 1].productId === product.id)
        newProfileIds = product.order('Subscription');
    }
  }
  //reCreateAddons();
});

//////////////////////////////////////
//          ACCORDION HANDLER       //
//////////////////////////////////////
const accordionTitle = document.querySelectorAll('.accordion__title'),
  accordionContent = document.querySelectorAll('.accordion__content');
if (accordionTitle.length > 0) {
  accordionTitle.forEach((title, i) => {
    title.addEventListener('click', () => {
      accordionContent[i].classList.toggle('active'), title.classList.toggle('active');
      for (let f = 0; f < accordionTitle.length; f++) {
        if (f !== i) {
          accordionTitle[f].classList.remove('active');
          accordionContent[f].classList.remove('active');
        }
      }
    });
  });
}

//////////////////////////////////////
//          ADDON RENDERER         //
/////////////////////////////////////

newProfileIds = [
  'caramelSubscription',
  'mochaSubscription',
  'vanillaSubscription',
  'originalSubscription',
];
//reCreateAddons();

const addonAdder = async (e) => {
  $(`.addon-wrapper[data-product="${flavorName}"]`).addClass('active');
  onRTCRender.push(async () => {
    $(`.addon-wrapper[data-product="${flavorName}"]`).removeClass('active');
  });
};

$('.rtc_addon-btn').click(function (e) {
  flavorName = $(this).attr('data-product');
  addonAdder();
});

const addonChecker = async () => {
  hasOriginalSubscription = await RTC.hasItemInCart({ itemProfile: 'originalSubscription' });
  hasVanillaSubscription = await RTC.hasItemInCart({ itemProfile: 'vanillaSubscription' });
  hasCaramelSubscription = await RTC.hasItemInCart({ itemProfile: 'caramelSubscription' });
  hasMochaSubscription = await RTC.hasItemInCart({ itemProfile: 'mochaSubscription' });
  hasOriginalTrial = await RTC.hasItemInCart({ itemProfile: 'originalTrial' });
  hasVanillaTrial = await RTC.hasItemInCart({ itemProfile: 'vanillaTrial' });
  hasCaramelTrial = await RTC.hasItemInCart({ itemProfile: 'caramelTrial' });
  hasMochaTrial = await RTC.hasItemInCart({ itemProfile: 'mochaTrial' });

  if (hasOriginalSubscription || hasOriginalTrial) {
    $('#addon_original').removeClass('active');
  } else {
    $('#addon_original').addClass('active');
  }
  if (hasVanillaSubscription || hasVanillaTrial) {
    $('#addon_vanilla').removeClass('active');
  } else {
    $('#addon_vanilla').addClass('active');
  }
  if (hasMochaTrial || hasMochaSubscription) {
    $('#addon_mocha').removeClass('active');
  } else {
    $('#addon_mocha').addClass('active');
  }

  if (hasCaramelSubscription || hasCaramelTrial) {
    $('#addon_caramel').removeClass('active');
  } else {
    $('#addon_caramel').addClass('active');
  }
};

(function () {
  function asyncLoad() {
    let urls = [
      '/js/pushowl.js',
      'https://cdn.attn.tv/javy/dtag.js',
      'https://cdn.attn.tv/javy/dtag.js',
      'https://hello.zonos.com/shop-duty-tax/hello.js?1654893705454\u0026shop=drink-javy.myshopify.com',
      'https://d3hw6dc1ow8pp2.cloudfront.net/reviewsWidget.min.js?shop=drink-javy.myshopify.com',
      'https://socialsnowball.io/js/referral.js?shop=drink-javy.myshopify.com',
      'https://d38xvr37kwwhcm.cloudfront.net/js/grin-sdk.js?shop=drink-javy.myshopify.com',
      'https://dynamic.criteo.com/js/ld/ld.js?a=92139\u0026shop=drink-javy.myshopify.com',
      'https://cdn.getcarro.com/script-tags/all/050820094100.js?shop=drink-javy.myshopify.com',
      'https://intg.snapchat.com/shopify/shopify-scevent-init.js?id=267ab415-a296-4ad6-a0e2-07f7008ca1bc\u0026shop=drink-javy.myshopify.com',
    ];
    for (let i = 0; i < urls.length; i++) {
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = urls[i];
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
  }
  if (window.attachEvent) {
    window.attachEvent('onload', asyncLoad);
  } else {
    window.addEventListener('load', asyncLoad, false);
  }
})();
