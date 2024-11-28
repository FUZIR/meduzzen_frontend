export function isCompanyMember(company, userId) {
  return company.members.some((member) => member.id === userId);
}