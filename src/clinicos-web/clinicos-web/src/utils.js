export const digitsOnly = (value) => value.replace(/\D/g, '');
export const formatPhone = (code, number) => `${code} ${number.trim()}`;
