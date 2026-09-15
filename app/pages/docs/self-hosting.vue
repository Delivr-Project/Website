<script setup lang="ts">
usePageSeo({
	title: "Self-Hosting — Delivr Docs",
	description:
		"Step-by-step guide to self-hosting Delivr: install the API, configure your database, run the web client, and go to production.",
	canonical: "https://www.delivr.email/docs/self-hosting",
});
</script>

<template>
	<DocsPage>
		<h1>Self-Hosting Delivr</h1>
		<p class="lead">
			Delivr is designed to be self-hosted in minutes. This guide covers the API backend, the web
			client, database setup, and a few production notes.
		</p>

		<h2>Prerequisites</h2>
		<ul>
			<li><a href="https://bun.sh">Bun 1.x</a> installed on the server.</li>
			<li>An email account or server reachable over IMAP (read) and SMTP (send).</li>
			<li>A public domain and reverse proxy if you want HTTPS in production.</li>
		</ul>

		<h2>1. Delivr API</h2>
		<p>Clone the repository, install dependencies, configure the environment, and run migrations.</p>
		<pre class="not-prose"><code class="language-bash">git clone https://github.com/Delivr-Project/Delivr-API.git
cd Delivr-API
cp example.env .env
bun install
bun run db:sqlite:migrate
bun run dev
</code></pre>

		<h3>Required environment variables</h3>
		<ul>
			<li>
				<code>DLA_ENCRYPTION_KEY</code> — a 32-character key used to encrypt mail-server
				credentials. Keep it secret and back it up; losing it means losing access to stored mail
				account credentials.
			</li>
			<li>
				<code>DLA_APP_URL</code> — the public URL of your Delivr Web client, e.g.
				<code>https://app.delivr.email</code>.
			</li>
		</ul>

		<h3>Database options</h3>
		<p>
			SQLite is the default and works out of the box. For heavier deployments you can use PostgreSQL or
			MySQL:
		</p>
		<ul>
			<li>SQLite: set <code>DLA_DB_CONNECTION_URL=./data/db.sqlite</code>.</li>
			<li>PostgreSQL/MySQL: update <code>DLA_DB_CONNECTION_URL</code> and run the matching migration commands.</li>
		</ul>

		<h3>API ports and docs</h3>
		<p>
			By default the API listens on port <strong>14123</strong>. The interactive
			<a href="https://scalar.com">Scalar</a> OpenAPI reference is available at
			<code>/docs/v1</code>, and the raw spec at <code>/docs/v1/openapi</code>.
		</p>

		<h2>2. Delivr Web</h2>
		<p>
			The web client is a Nuxt 4 app that talks to the API. Point it at the running API, install
			dependencies, and start it.
		</p>
		<pre class="not-prose"><code class="language-bash">git clone https://github.com/Delivr-Project/Delivr-Web.git
cd Delivr-Web
cp example.env .env
# Edit .env and set DELIVR_API_URL=https://api.example.com/v1
# and DELIVR_APP_URL=https://app.example.com
bun install
bun run dev
</code></pre>

		<p>The web client runs on port <strong>14128</strong> by default.</p>

		<h3>Regenerating the API client</h3>
		<p>
			Delivr Web uses a generated type-safe client from the API's OpenAPI spec. When the API changes,
			keep the client up to date:
		</p>
		<pre class="not-prose"><code class="language-bash"># Start the API first, then:
bun run api-client:generate
</code></pre>
		<p>Never hand-edit the generated <code>*.gen.ts</code> files.</p>

		<h2>3. Production checklist</h2>
		<ul class="checklist">
			<li>Run the API behind an HTTPS reverse proxy.</li>
			<li>Set <code>DLA_APP_URL</code> and <code>DELIVR_APP_URL</code> to your public HTTPS URLs.</li>
			<li>Keep <code>DLA_ENCRYPTION_KEY</code> safe; it is needed to decrypt stored credentials.</li>
			<li>Back up the database directory and the API's <code>data/</code> folder.</li>
			<li>
				Configure outbound SMTP (<code>DLA_SMTP_*</code>) if you want password-reset and other
				system emails.
			</li>
			<li>Build the static docs site with <code>bun run generate</code> if you also deploy this website.</li>
		</ul>
	</DocsPage>
</template>
