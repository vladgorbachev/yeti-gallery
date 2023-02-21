import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import serve from 'rollup-plugin-serve';
import fs from 'fs'

const config = {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },
    plugins: [
        typescript({
            exclude: ['node_modules/**'],
            useTsconfigDeclarationDir: true
        }),
        commonjs(),
        nodeResolve(),
        scss({ 
            output: 'bundle.css',
            output: function (styles) {
                fs.writeFileSync('dist/bundle.css', styles)
            },
        }),
        serve({
            contentBase: 'dist',
            historyApiFallback: true,
            livereload: true
        })
    ]
};

export default config