const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node', // Add this line
  loader: {
    '.html': 'text',  // This tells esbuild to treat HTML files as text files
  },
  external: ['mock-aws-s3', 'aws-sdk', 'nock'],
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
