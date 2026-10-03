/**
 * Screenshots for the landing-page device showcase (laptop + phone).
 *
 * While `src` is `null`, the showcase renders a wireframe placeholder of the mail UI.
 * To use real screenshots, drop the images into `public/static/screenshots/` and set
 * `src` to their public path, e.g. `/static/screenshots/desktop.webp`.
 *
 * Recommended sizes: desktop 2880×1800 (16:10), mobile 1170×2532 (9:19.5).
 */

export interface Screenshot {
	src: string | null;
	alt: string;
}

export const heroScreenshots: { desktop: Screenshot; mobile: Screenshot } = {
	desktop: {
		src: null,
		alt: "Delivr Web on a laptop, showing the folder sidebar, the message list, and an open email",
	},
	mobile: {
		src: null,
		alt: "Delivr installed as an app on a phone, showing the inbox",
	},
};
