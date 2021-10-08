// 1~12월
export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

// 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 2020~1900년까지
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));
