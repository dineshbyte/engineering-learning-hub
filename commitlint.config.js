/**
 * Commit-message linting — enforces Conventional Commits on every local commit
 * via the .husky/commit-msg hook. The repo already follows this convention
 * (feat / fix / chore / refactor / style / docs, with optional (scope) and a
 * trailing ! for breaking changes); this just makes it non-optional.
 *
 * config-conventional's defaults fit as-is: header ≤ 100 chars, a known type,
 * a non-empty lower-case-ish subject. No custom scope-enum — scopes stay free
 * (astro, design, hub, mdx, …) so the convention helps without nagging.
 */
export default {
    extends: ['@commitlint/config-conventional'],
};
