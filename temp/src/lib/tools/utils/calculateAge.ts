export function CalculateAge(birthday: Date): number {
  const now = new Date();
  const birthDate = new Date(birthday);

  const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const utcBirthDate = Date.UTC(
    birthDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  const ageDifMs = utcNow - utcBirthDate;

  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}
