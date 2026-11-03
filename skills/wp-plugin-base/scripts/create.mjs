#!/usr/bin/env node
/**
 * Creates a new plugin repository from quasipapa/wp-plugin-base and
 * initializes it. Thin wrapper around gh + the template's init script.
 *
 * Usage: node create.mjs --name "My Plugin" --slug my-plugin \
 *          --author <you> --repo <you>/my-plugin [--public] [--base v0.1.0]
 */
import { execFileSync } from 'node:child_process';

const args = process.argv.slice( 2 );
const arg = ( name ) => {
	const i = args.indexOf( `--${ name }` );
	return i === -1 ? undefined : args[ i + 1 ];
};

const name = arg( 'name' );
const slug = arg( 'slug' );
const author = arg( 'author' );
const repo = arg( 'repo' );
const visibility = args.includes( '--public' ) ? '--public' : '--private';
const base = arg( 'base' ) ?? 'v0.1.0';

if ( ! name || ! slug || ! author || ! repo ) {
	console.error(
		'Usage: node create.mjs --name "My Plugin" --slug my-plugin --author <you> --repo <you>/my-plugin [--public] [--base v0.1.0]'
	);
	process.exit( 1 );
}

const run = ( cmd, cmdArgs ) =>
	execFileSync( cmd, cmdArgs, { stdio: 'inherit' } );

run( 'gh', [
	'repo',
	'create',
	repo,
	`--template=quasipapa/wp-plugin-base@${ base }`,
	visibility,
] );
run( 'git', [ 'clone', `https://github.com/${ repo }.git` ] );
run( 'node', [
	'scripts/init-template.mjs',
	'--name',
	name,
	'--slug',
	slug,
	'--author',
	author,
	'--repo',
	repo,
	'--base-version',
	base,
], { cwd: slug } );
run( 'npm', [ 'install' ], { cwd: slug } );
console.log(
	`\nCreated ${ repo }. Next: cd ${ slug } && npm run env:start && npm run i18n:generate && npm run check`
);
