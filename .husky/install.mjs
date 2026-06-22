// Husky installer guard — git hooks are a LOCAL dev aid only.
//
// `prepare` runs on every `pnpm install`, including in CI. The pre-commit
// Prettier hook is meaningless there (CI never commits, and formatting is a
// local concern — CI validates the built site, it doesn't format source), so
// we skip the install entirely when CI is set.
//
// GitHub Actions (and virtually every CI provider) export CI=true, so this
// needs no workflow change: `pnpm install --frozen-lockfile` simply no-ops the
// hook setup. Locally, CI is unset, so hooks install as normal.
if (process.env.CI) {
    process.exit(0);
}

const husky = (await import('husky')).default;
husky();
