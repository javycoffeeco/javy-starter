function setProfile(form, profile) {
  form.find('.rtc-increase-quantity').attr('data-item-profile', profile);
}
$("input[type='radio']").change(function (e) {
  profile = $(this).val();
  console.log(profile);
  setProfile($(this).parents('.frequency-container'), profile);
});
