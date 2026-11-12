/* src/lib/scripts/navigation.ts
 * MIT — (c) Doughmination System®
 */

export const navLinks = [
	{
		href: '/',
		label: 'Home'
	},
	{
		href: '/characters',
		label: 'Characters'
	}
] as const;

// Home only matches exactly, the rest match their sub-pages too
export function isCurrentPath(href: string, pathname: string): boolean {
	return href === '/' ? pathname === '/' : pathname.startsWith(href);
}
