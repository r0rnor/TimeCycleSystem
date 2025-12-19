import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"header-max-length": [RuleConfigSeverity.Error, "always", 72],
		"scope-enum": [RuleConfigSeverity.Error, "always", ["core", "deps", "dev", "lint", "ui", "audio", "assets", "mtx", "obx"]],
	},
} satisfies UserConfig;

// FORMAT
// <type>(<scope>): <subject>
//
// --EXAMPLE: feat(ui): add new button component

// TYPES OF COMMITS
// feat - new feature
// fix - bug fix
// docs - documentation only changes
// refactor - code structure change without changing behavior
// test - adding or updating tests
// chore - tooling: configs, scripts, CI, versions, formatting, etc
// perf - performance improvements without changing behavior
// build - tsconfig, roblox-ts config

// SCOPES
// core - anything related to the core game systems and mechanics
// deps - adding, removing, or updating dependencies
// dev - development tools and scripts
// lint - linting and formatting changes
// ui - ui
// audio - sound effects and music
// assets - game assets like models, textures, animations
// mtx - gamepasses, products
// obx - objects