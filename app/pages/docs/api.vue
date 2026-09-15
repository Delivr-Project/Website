<script setup lang="ts">
usePageSeo({
	title: "API Overview — Delivr Docs",
	description:
		"Delivr exposes a first-class REST API. Learn about authentication, API keys, the OpenAPI spec, and the generated type-safe client.",
	canonical: "https://www.delivr.email/docs/api",
});
</script>

<template>
	<DocsPage>
		<h1>API Overview</h1>
		<p class="lead">
			Delivr API is the heart of the project: a Bun + Hono backend that talks to your mail server, serves
			a first-class OpenAPI spec, and powers the Delivr Web client.
		</p>

		<h2>Base URL and versioning</h2>
		<p>
			All API routes are prefixed with <code>/v1</code>. A local dev instance is available at
			<code>http://localhost:14123/v1</code>.
		</p>
		<pre class="not-prose"><code class="language-http">GET /v1/health
GET /v1/auth/me
GET /v1/mail-accounts
GET /v1/mail-accounts/{id}/mailboxes
...
</code></pre>

		<h2>OpenAPI reference</h2>
		<p>
			Every route is documented with <a href="https://github.com/honojs/middleware/tree/main/packages/hono-openapi">hono-openapi</a> and
			browsable through an embedded <a href="https://scalar.com">Scalar</a> reference. Start the
			API and visit:
		</p>
		<ul>
			<li>Interactive docs: <code>https://api.example.com/docs/v1</code></li>
			<li>Raw OpenAPI spec: <code>https://api.example.com/docs/v1/openapi</code></li>
		</ul>

		<h2>Authentication</h2>
		<p>Delivr supports two ways to authenticate:</p>
		<ul>
			<li>
				<strong>JWT sessions</strong> — users sign in through <code>POST /v1/auth/login</code> and
				receive a session token. The web client stores this in an HTTP-only cookie.
			</li>
			<li>
				<strong>API keys</strong> — scoped tokens issued from the web UI and used for
				programmatic access (e.g. scripts, integrations).
			</li>
		</ul>
		<p>
			For API-key requests, send the token in the <code>Authorization: Bearer &lt;token&gt;</code>
			header.
		</p>

		<h2>Response envelope</h2>
		<p>API responses follow a consistent envelope shape:</p>
		<pre class="not-prose"><code class="language-json">{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": { ... }
}
</code></pre>

		<h2>Generated client</h2>
		<p>
			Delivr Web uses <a href="https://github.com/hey-api/openapi-ts">@hey-api/openapi-ts</a> to
			generate a type-safe TypeScript client from the live OpenAPI spec. Keep the client in sync:
		</p>
		<pre class="not-prose"><code class="language-bash"># Start the Delivr API first
bun run api-client:generate
</code></pre>
		<p>The generated files in <code>app/api-client/</code> are committed but never edited by hand.</p>

		<h2>Mail-server credentials</h2>
		<p>
			When a user adds a mail account, Delivr encrypts the IMAP/SMTP credentials with
			<strong>ECC cryptography</strong> using the <code>DLA_ENCRYPTION_KEY</code>. The plaintext
			credentials are never written to disk.
		</p>

		<h2>Explore the API</h2>
		<div class="not-prose flex flex-col gap-4 sm:flex-row">
			<UButton
				to="https://github.com/Delivr-Project/Delivr-API"
				target="_blank"
				color="primary"
				class="w-fit"
			>
				<template #leading>
					<UIcon name="i-lucide-github" />
				</template>
				Delivr API on GitHub
			</UButton>
			<UButton
				to="/docs/self-hosting"
				color="neutral"
				variant="outline"
				class="w-fit"
			>
				<template #leading>
					<UIcon name="i-lucide-server" />
				</template>
				Self-Hosting Guide
			</UButton>
		</div>
	</DocsPage>
</template>
