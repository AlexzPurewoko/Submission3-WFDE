const tsAutoMockTransformer = require('ts-auto-mock/transformer').default;

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
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