const tsAutoMockTransformer = require('ts-auto-mock/transformer').default;

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.webpack.json',
                    getCustomTransformers: program => ({
                        before: [
                            tsAutoMockTransformer(program, {
                                features: ['random'],
                                cacheBetweenTests: false
                            })
                        ]
                    })
                }
            }
        ]
    }
};