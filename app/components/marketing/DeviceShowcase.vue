<script setup lang="ts">
/**
 * Laptop + phone mockup for the landing-page hero. Shows the given screenshots,
 * or a wireframe of the mail UI while a screenshot's `src` is still `null`.
 * Sizes are relative (%, cqw) so the composition scales with its container.
 */
import type { Screenshot } from "~/data/showcase";

const { desktop, mobile } = defineProps<{
	desktop: Screenshot;
	mobile: Screenshot;
}>();

const folders = [
	{ icon: "i-lucide-inbox", active: true },
	{ icon: "i-lucide-star", active: false },
	{ icon: "i-lucide-send", active: false },
	{ icon: "i-lucide-file-pen", active: false },
	{ icon: "i-lucide-archive", active: false },
	{ icon: "i-lucide-trash-2", active: false },
];

const rows = [
	{ avatar: "bg-sky-500/50", name: "w-2/5", line: "w-4/5", unread: true, selected: true },
	{ avatar: "bg-violet-500/50", name: "w-1/3", line: "w-3/5", unread: true, selected: false },
	{ avatar: "bg-emerald-500/50", name: "w-1/2", line: "w-2/3", unread: false, selected: false },
	{ avatar: "bg-amber-500/50", name: "w-2/5", line: "w-3/4", unread: false, selected: false },
	{ avatar: "bg-rose-500/50", name: "w-1/3", line: "w-1/2", unread: false, selected: false },
	{ avatar: "bg-slate-500/50", name: "w-1/2", line: "w-3/5", unread: false, selected: false },
	{ avatar: "bg-sky-500/50", name: "w-2/5", line: "w-2/3", unread: false, selected: false },
];

const paragraph = ["w-full", "w-11/12", "w-full", "w-4/5", "w-0", "w-full", "w-5/6", "w-2/3"];
</script>

<template>
	<div class="relative mx-auto w-full max-w-5xl pr-[2%] pb-[5%]">
		<div
			class="pointer-events-none absolute inset-x-[8%] top-[8%] bottom-0 rounded-full bg-sky-500/20 blur-3xl"
			aria-hidden="true"
		></div>

		<!-- Laptop -->
		<div class="relative w-[88%]">
			<div
				class="rounded-t-[1.1rem] border border-slate-700/80 bg-slate-900 p-[1.6%] pb-[2%] shadow-2xl shadow-sky-950/60"
			>
				<div class="@container relative aspect-[16/10] overflow-hidden rounded-[0.3rem] bg-black ring-1 ring-slate-800">
					<img
						v-if="desktop.src"
						:src="desktop.src"
						:alt="desktop.alt"
						class="h-full w-full object-cover object-top"
						loading="eager"
						fetchpriority="high"
					/>
					<div v-else role="img" :aria-label="desktop.alt" class="flex h-full flex-col text-[1.4cqw]">
						<!-- Top bar -->
						<div class="flex h-[8%] items-center gap-[2%] border-b border-slate-800 px-[2%]">
							<div class="h-[45%] w-[9%] rounded-full bg-sky-300/70"></div>
							<div class="mx-auto flex h-[55%] w-[34%] items-center gap-[3%] rounded-md bg-slate-900 px-[2%]">
								<UIcon name="i-lucide-search" class="size-[1em] text-slate-600" />
								<div class="h-[30%] w-1/3 rounded-full bg-slate-800"></div>
							</div>
							<div class="aspect-square h-[55%] rounded-full bg-violet-500/50"></div>
						</div>

						<div class="flex min-h-0 flex-1">
							<!-- Sidebar -->
							<div class="flex w-[18%] flex-col gap-[1.2cqw] border-r border-slate-800 p-[1.2cqw]">
								<div class="flex h-[2.6cqw] items-center justify-center gap-[0.6cqw] rounded-md bg-sky-500">
									<UIcon name="i-lucide-pen-line" class="size-[1em] text-black" />
									<div class="h-[0.5cqw] w-2/5 rounded-full bg-black/60"></div>
								</div>
								<div
									v-for="(folder, index) in folders"
									:key="folder.icon"
									class="flex items-center gap-[0.8cqw] rounded-md px-[0.8cqw] py-[0.6cqw]"
									:class="folder.active ? 'bg-sky-500/15' : ''"
								>
									<UIcon
										:name="folder.icon"
										class="size-[1em] shrink-0"
										:class="folder.active ? 'text-sky-400' : 'text-slate-500'"
									/>
									<div
										class="h-[0.5cqw] rounded-full"
										:class="[folder.active ? 'bg-sky-300/70' : 'bg-slate-700', index % 2 ? 'w-1/2' : 'w-3/5']"
									></div>
								</div>
							</div>

							<!-- Message list -->
							<div class="flex w-[32%] flex-col border-r border-slate-800">
								<div
									v-for="(row, index) in rows"
									:key="index"
									class="flex items-center gap-[0.9cqw] border-b border-slate-900 px-[1.2cqw] py-[1cqw]"
									:class="row.selected ? 'bg-slate-900' : ''"
								>
									<div class="aspect-square w-[2.4cqw] shrink-0 rounded-full" :class="row.avatar"></div>
									<div class="flex min-w-0 flex-1 flex-col gap-[0.5cqw]">
										<div class="flex items-center gap-[0.6cqw]">
											<div
												class="h-[0.55cqw] rounded-full"
												:class="[row.name, row.unread ? 'bg-slate-200' : 'bg-slate-500']"
											></div>
											<div class="ml-auto h-[0.4cqw] w-[12%] rounded-full bg-slate-700"></div>
										</div>
										<div class="h-[0.45cqw] rounded-full bg-slate-700" :class="row.line"></div>
									</div>
									<div v-if="row.unread" class="aspect-square w-[0.6cqw] rounded-full bg-sky-400"></div>
								</div>
							</div>

							<!-- Reading pane -->
							<div class="flex flex-1 flex-col gap-[1.4cqw] p-[2cqw]">
								<div class="h-[1cqw] w-3/5 rounded-full bg-slate-200"></div>
								<div class="flex items-center gap-[1cqw]">
									<div class="aspect-square w-[3cqw] rounded-full bg-sky-500/50"></div>
									<div class="flex flex-1 flex-col gap-[0.5cqw]">
										<div class="h-[0.55cqw] w-1/3 rounded-full bg-slate-400"></div>
										<div class="h-[0.45cqw] w-1/2 rounded-full bg-slate-700"></div>
									</div>
									<div class="flex gap-[0.6cqw] text-slate-600">
										<UIcon name="i-lucide-reply" class="size-[1em]" />
										<UIcon name="i-lucide-forward" class="size-[1em]" />
										<UIcon name="i-lucide-archive" class="size-[1em]" />
									</div>
								</div>
								<div class="mt-[0.6cqw] flex flex-col gap-[0.8cqw]">
									<div
										v-for="(width, index) in paragraph"
										:key="index"
										class="h-[0.5cqw] rounded-full bg-slate-800"
										:class="width"
									></div>
								</div>
								<div class="mt-auto flex gap-[1cqw]">
									<div
										class="flex items-center gap-[0.6cqw] rounded-md border border-slate-800 px-[1cqw] py-[0.7cqw]"
									>
										<UIcon name="i-lucide-paperclip" class="size-[1em] text-slate-500" />
										<div class="h-[0.45cqw] w-[6cqw] rounded-full bg-slate-700"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Base -->
			<div
				class="relative -mx-[6%] h-[0.7rem] rounded-b-[1.2rem] border-t border-slate-500/60 bg-linear-to-b from-slate-600 to-slate-800 shadow-xl sm:h-4"
				aria-hidden="true"
			>
				<div class="absolute top-0 left-1/2 h-1/2 w-[14%] -translate-x-1/2 rounded-b-md bg-slate-900/70"></div>
			</div>
		</div>

		<!-- Phone -->
		<div class="@container absolute right-0 bottom-0 w-[23%] max-w-60">
			<div class="rounded-[16cqw] border border-slate-600 bg-slate-950 p-[4cqw] shadow-2xl shadow-black ring-4 ring-black">
				<div class="@container relative aspect-[9/19.5] overflow-hidden rounded-[12cqw] bg-black">
					<div
						class="absolute top-[2%] left-1/2 z-10 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-slate-900"
						aria-hidden="true"
					></div>
					<img
						v-if="mobile.src"
						:src="mobile.src"
						:alt="mobile.alt"
						class="h-full w-full object-cover object-top"
						loading="eager"
					/>
					<div v-else role="img" :aria-label="mobile.alt" class="flex h-full flex-col pt-[18cqw] text-[6cqw]">
						<div class="flex items-center gap-[4cqw] px-[6cqw]">
							<UIcon name="i-lucide-menu" class="size-[1em] text-slate-500" />
							<div class="h-[2.6cqw] w-1/3 rounded-full bg-slate-200"></div>
							<div class="ml-auto aspect-square w-[7cqw] rounded-full bg-violet-500/50"></div>
						</div>
						<div class="mx-[6cqw] mt-[5cqw] flex h-[9cqw] items-center gap-[3cqw] rounded-full bg-slate-900 px-[4cqw]">
							<UIcon name="i-lucide-search" class="size-[0.8em] text-slate-600" />
							<div class="h-[2cqw] w-2/5 rounded-full bg-slate-800"></div>
						</div>
						<div class="mt-[4cqw] flex flex-col">
							<div
								v-for="(row, index) in rows"
								:key="index"
								class="flex items-center gap-[3.5cqw] border-b border-slate-900 px-[6cqw] py-[3.6cqw]"
							>
								<div class="aspect-square w-[10cqw] shrink-0 rounded-full" :class="row.avatar"></div>
								<div class="flex min-w-0 flex-1 flex-col gap-[2cqw]">
									<div
										class="h-[2.2cqw] rounded-full"
										:class="[row.name, row.unread ? 'bg-slate-200' : 'bg-slate-500']"
									></div>
									<div class="h-[1.8cqw] rounded-full bg-slate-700" :class="row.line"></div>
								</div>
								<div v-if="row.unread" class="aspect-square w-[2.4cqw] rounded-full bg-sky-400"></div>
							</div>
						</div>
						<div
							class="absolute right-[6cqw] bottom-[8cqw] flex aspect-square w-[14cqw] items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/30"
						>
							<UIcon name="i-lucide-pen-line" class="size-[1em] text-black" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
