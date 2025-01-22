const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node', // Add this line
  plugins: [
    {
      name: 'alias',
      setup(build) {
        build.onResolve({ filter: /^@src\// }, (args) => ({
          path: require('path').join(__dirname, 'src', args.path.slice(5)),
        }));
      },
    },
  ],
}).catch(() => process.exit(1));
