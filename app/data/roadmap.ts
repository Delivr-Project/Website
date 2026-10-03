/**
 * Public roadmap — sourced from the GitHub project boards
 * (https://github.com/orgs/Delivr-Project/projects/1 and /2) plus longer-term ideas
 * that are not on a board yet. Keep `issues` links in sync when items move.
 */

export type RoadmapStatus = "planned" | "exploring";

export interface RoadmapIssue {
	label: string;
	to: string;
}

export interface RoadmapItem {
	title: string;
	summary: string;
	icon: string;
	status: RoadmapStatus;
	areas: ("Web" | "API")[];
	issues: RoadmapIssue[];
	/** Shown in the roadmap teaser on the landing page. */
	highlight?: boolean;
}

export interface ShippedGroup {
	title: string;
	icon: string;
	items: string[];
}

const webIssue = (n: number): RoadmapIssue => ({
	label: `Web #${n}`,
	to: `https://github.com/Delivr-Project/Delivr-Web/issues/${n}`,
});

const apiIssue = (n: number): RoadmapIssue => ({
	label: `API #${n}`,
	to: `https://github.com/Delivr-Project/Delivr-API/issues/${n}`,
});

export const roadmapStatuses: Record<
	RoadmapStatus,
	{ label: string; description: string; icon: string }
> = {
	planned: {
		label: "Planned",
		description: "On the public project boards and scheduled for the 1.1 milestone.",
		icon: "i-lucide-calendar-check",
	},
	exploring: {
		label: "Exploring",
		description: "Bigger ideas we are designing and discussing. Not committed to a release yet.",
		icon: "i-lucide-telescope",
	},
};

export const roadmapItems: RoadmapItem[] = [
	{
		title: "Shared team inboxes",
		summary:
			"Share a mailbox like support@ or hello@ with your team, so everyone works from the same inbox without sharing a password.",
		icon: "i-lucide-users",
		status: "planned",
		areas: ["Web", "API"],
		issues: [apiIssue(35), webIssue(18)],
		highlight: true,
	},
	{
		title: "Offline-first PWA",
		summary:
			"Keep recent mail in a local cache on your device, search it offline, and queue messages written offline until you're back online.",
		icon: "i-lucide-wifi-off",
		status: "planned",
		areas: ["Web", "API"],
		issues: [webIssue(63), webIssue(1), webIssue(2), webIssue(64), webIssue(66), apiIssue(9)],
		highlight: true,
	},
	{
		title: "Push notifications",
		summary: "Get notified about new mail from the installed app on desktop and mobile.",
		icon: "i-lucide-bell-ring",
		status: "planned",
		areas: ["Web"],
		issues: [webIssue(58)],
	},
	{
		title: "Teams & organizations",
		summary: "Group users into teams and organizations and manage their access from one place.",
		icon: "i-lucide-building-2",
		status: "planned",
		areas: ["Web", "API"],
		issues: [webIssue(9)],
	},
	{
		title: "Organization mail server lock",
		summary:
			"Pin an instance to your company's mail server, so users sign in with their work mailbox and nothing else.",
		icon: "i-lucide-lock-keyhole",
		status: "planned",
		areas: ["API"],
		issues: [apiIssue(33)],
	},
	{
		title: "End-to-end encryption",
		summary:
			"OpenPGP in the browser, with Mailvelope support and your own keys, so only the recipient can read a message.",
		icon: "i-lucide-key-square",
		status: "planned",
		areas: ["Web"],
		issues: [webIssue(92)],
		highlight: true,
	},
	{
		title: "Account recovery",
		summary:
			"A recovery email address and one-time backup codes, so a lost password never means a lost account.",
		icon: "i-lucide-life-buoy",
		status: "planned",
		areas: ["Web", "API"],
		issues: [apiIssue(50), webIssue(42)],
	},
	{
		title: "Gmail sign-in with OAuth2",
		summary:
			"Connect Gmail with a Google sign-in instead of an app password, with IMAP passwords remaining the default.",
		icon: "i-lucide-key-round",
		status: "planned",
		areas: ["Web"],
		issues: [webIssue(13)],
	},
	{
		title: "Remote image proxy",
		summary:
			"Optionally load remote images through your own instance, so senders never see your IP address.",
		icon: "i-lucide-image",
		status: "planned",
		areas: ["API"],
		issues: [apiIssue(46)],
	},
	{
		title: "Mail security score",
		summary:
			"A per-message risk score that flags dangerous content, like forbidden HTML, before you open it.",
		icon: "i-lucide-shield-alert",
		status: "planned",
		areas: ["API"],
		issues: [apiIssue(34)],
	},
	{
		title: "Translations",
		summary:
			"A German translation first, plus custom language files so the community can add their own.",
		icon: "i-lucide-languages",
		status: "planned",
		areas: ["Web"],
		issues: [webIssue(91)],
	},
	{
		title: "PostgreSQL & MySQL",
		summary:
			"Run the API on PostgreSQL or MySQL in addition to SQLite, for larger and highly available setups.",
		icon: "i-lucide-database",
		status: "planned",
		areas: ["API"],
		issues: [apiIssue(10)],
	},
	{
		title: "Reading-view refinements",
		summary: "A resizable split-view divider and the ability to mark and highlight important emails.",
		icon: "i-lucide-columns-2",
		status: "planned",
		areas: ["Web"],
		issues: [webIssue(57), webIssue(61)],
	},
	{
		title: "Enterprise single sign-on",
		summary:
			"Sign in to Delivr with your identity provider over OpenID Connect or SAML — Keycloak, Authentik, Entra ID, Okta and more.",
		icon: "i-lucide-fingerprint",
		status: "exploring",
		areas: ["Web", "API"],
		issues: [],
		highlight: true,
	},
	{
		title: "Local AI spam & phishing detection",
		summary:
			"Classify spam and phishing with small open models that run on your own hardware. No mail ever leaves your server.",
		icon: "i-lucide-brain-circuit",
		status: "exploring",
		areas: ["API"],
		issues: [],
		highlight: true,
	},
	{
		title: "Calendars & contacts",
		summary:
			"CalDAV and CardDAV integration for calendars, invitations, and address books — the full groupware experience in one app.",
		icon: "i-lucide-calendar-days",
		status: "exploring",
		areas: ["Web", "API"],
		issues: [],
		highlight: true,
	},
	{
		title: "Collaborative inbox tools",
		summary:
			"Assign conversations, leave internal notes, and see when a teammate is already replying — built on shared inboxes.",
		icon: "i-lucide-messages-square",
		status: "exploring",
		areas: ["Web", "API"],
		issues: [],
	},
	{
		title: "Smart & unified folders",
		summary:
			"Saved searches in the sidebar and virtual folders that merge several folders or accounts, clearly marked as virtual.",
		icon: "i-lucide-folder-search",
		status: "exploring",
		areas: ["Web"],
		issues: [webIssue(12), webIssue(11)],
	},
	{
		title: "Server-side filter rules",
		summary:
			"Create and manage Sieve filter rules from Delivr, so your mail is sorted before any client opens it.",
		icon: "i-lucide-filter",
		status: "exploring",
		areas: ["Web", "API"],
		issues: [],
	},
];

export const roadmapHighlights = roadmapItems.filter((item) => item.highlight);

export const shippedInV1: ShippedGroup[] = [
	{
		title: "Reading",
		icon: "i-lucide-mail-open",
		items: [
			"Multi-account inbox over IMAP/SMTP",
			"Attachments with an inline PDF and image viewer",
			"BIMI brand logos with Gravatar fallback",
			"Remote-content policy per sender and domain",
			"Split and list views with optional hover actions",
		],
	},
	{
		title: "Organizing",
		icon: "i-lucide-folder-tree",
		items: [
			"Create, rename, move, and delete folders",
			"Drag & drop with keyboard modifiers",
			"Bulk archive, move, delete, and mark as read",
			"Special-folder detection with per-account mapping",
			"Right-click menu and Shift/Ctrl multi-select",
		],
	},
	{
		title: "Search",
		icon: "i-lucide-search",
		items: [
			"Cross-folder search with operators",
			"Search bar that stays with you across pages",
			"Recent searches",
		],
	},
	{
		title: "Composing",
		icon: "i-lucide-pen-line",
		items: [
			"Rich-text editor",
			"Attachments, priorities, Cc and Bcc",
			"Draft autosave to your IMAP Drafts folder",
			"Sender identities with HTML signatures",
		],
	},
	{
		title: "Accounts & onboarding",
		icon: "i-lucide-user-round-check",
		items: [
			"Guided onboarding for new users and mail accounts",
			"Preferences synced to your account",
			"Password reset via email",
			"Admin user management and API keys",
		],
	},
	{
		title: "Platform",
		icon: "i-lucide-server-cog",
		items: [
			"Versioned REST API with OpenAPI and Scalar docs",
			"AES-256-GCM encrypted mail credentials",
			"Argon2id-hashed sessions and API keys",
			"Docker images for the API and the web client",
		],
	},
];
