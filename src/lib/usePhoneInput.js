export function usePhoneInput(phoneRef, maxLength = 15) {
  function onPhoneInput(event) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, maxLength)
    phoneRef.value = digits
  }

  return {
    onPhoneInput,
  }
}
