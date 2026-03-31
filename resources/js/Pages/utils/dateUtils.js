export function calculateAge(dob, testDate) {
  if (!dob || !testDate) {
    return { years: "", months: "" };
  }

  const birth = new Date(dob);
  const test = new Date(testDate);

  if (Number.isNaN(birth.getTime()) || Number.isNaN(test.getTime())) {
    return { years: "", months: "" };
  }

  if (test < birth) {
    return { years: "", months: "" };
  }

  let years = test.getFullYear() - birth.getFullYear();
  let months = test.getMonth() - birth.getMonth();
  const days = test.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}