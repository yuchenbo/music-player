/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config) => {
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === "object")
            .oneOf.filter((rule) => Array.isArray(rule.use));

        rules.forEach((rule) => {
            rule.use.forEach((moduleLoader) => {
                if (
                    moduleLoader.loader.includes("css-loader") &&
                    typeof moduleLoader.options.modules === "object"
                ) {
                    moduleLoader.options = {
                        ...moduleLoader.options,
                        modules: {
                            ...moduleLoader.options.modules,
                            exportLocalsConvention: "camelCase", // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
                        },
                    };
                }
            });
        });

        return config;
    },
};

export default nextConfig;
