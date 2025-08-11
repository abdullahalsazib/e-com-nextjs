export default function hasRole(
  userRoles: { slug: string }[] | undefined,
  role: string
) {
  return userRoles?.some((r) => r.slug === role);
}
